---
title: CSS media queries in JavaScript, Part 1
author: Nicholas C. Zakas
permalink: /blog/2012/01/03/css-media-queries-in-javascript-part-1/
categories:
  - Web Development
tags:
  - CSS
  - JavaScript
  - Media Query
---
Early in 2011, I was working on a project where I was doing some feature detection in JavaScript. Some tinkering led to the thought that using a CSS media query would work much better and so I spent some time coming up with a function to use CSS media queries in JavaScript. My thought process was simple: if I'm only applying certain CSS based on a media query, I also only want to run certain JavaScript based on a media query. The result was the following function, which I first published as a Gist<sup>[1]</sup> last March:

    var isMedia = (function(){
    
        var div;
    
        return function(query){
    
            //if the <div> doesn't exist, create it and make sure it's hidden
            if (!div){
                div = document.createElement("div");
                div.id = "ncz1";
                div.style.cssText = "position:absolute;top:-1000px";
                document.body.insertBefore(div, document.body.firstChild);            
            }
    
            div.innerHTML = "_<style media=\"" + query + "\"> #ncz1 { width: 1px; }</style>";
            div.removeChild(div.firstChild);
            return div.offsetWidth == 1;    
        };
    })();

The idea behind this function is pretty simple. I create a `<style>` node with a `media` attribute equal to the one I'm testing. Inside, there's a CSS rule applied to a `<div>` and all I have to do is check to see if the style has been applied. I wanted to avoid browser detection, so instead of using `currentStyle` and `getComputedStyle()`, I decided to just change the `width` of an element and check it using `offsetWidth`.

Very quickly, I had a version of this function that worked in almost all browsers. The exceptions, as you may have guessed, were Internet Explorer 6 and 7. In those browsers, the `<style>` element is considered a NoScope element<sup>[2]</sup>. NoScope elements were a horrid exception to what happens when HTML is injected into a page using `innerHTML` or any other means. All NoScope elements are effectively dropped if they are the first element added as an HTML string. In order to use a NoScope element, you must be sure that it's not the first part of an HTML string. Thus, I put the underscore in before the `<style>` element and then remove it &#8211; tricking Internet Explorer 6 and 7 into applying the element as it should. Other browsers don't have this NoScope element issue, but using this technique doesn't negatively effect them (as I said before, I was trying to avoid browser detection).

In the end, you can use the function like this:

    if (isMedia("screen and (max-width:800px)"){
        //do something for the screen
    }
    
    if (isMedia("all and (orientation:portrait)")){
        //react to portrait mode
    }

The `isMedia()` worked great in all browsers I tested (back to Internet Explorer 6) in that it accurately detects whether the browser thinks the media query is valid. So passing in an unsupported query to any browser always returns false. Internet Explorer 6, for instance, returns true if you use &#8220;screen&#8221;, but anything more complex and it returns false. I thought this was acceptable because any CSS in other media queries wouldn't be applied in that browser anyway.

## CSSOM View

The CSS Object Model (CSSOM) Views specification<sup>[3]</sup> adds native support for CSS media queries in JavaScript by adding a method, `matchMedia()`, to the `window` object. You pass in a CSS media query and receive back a `MediaQueryList` object. The object contains two properties: `matches`, which is a boolean value indicating if the CSS media query matches the current view state, and `media`, which is the same string that was passed in. For example:

    var match = window.matchMedia("screen and (max-width:800px)");
    console.log(match.media);     //"screen and (max-width:800px)"
    console.log(match.matches);   //true or false

So far, this API doesn't provide much more than my Gist. You may be wondering, though, why does `matchMedia()` return an object? After all, if the media doesn't match, of what use is it? The answer is in two methods: `addListener()` and `removeListener()`.

These two methods allow you to interact with view state changes based on CSS media queries. For instance, maybe you want to be alerted when a tablet is switched to portrait mode. You could do something like this:

    var match = window.matchMedia("(orientation:portrait)");
    match.addListener(function(match){
        if (match.media == "(orientation:portrait)") {
            //do something
        }
    });

This code adds a listener for a media query. When the query becomes true for the current view state, the listener is executed and the corresponding `MediaQueryList` object is passed in. In this way, you can have your JavaScript be just as responsive as your layout without polling. So unlike my Gist, this API allows you to monitor the changing view state and adapt the interface behavior accordingly.

The `matchMedia()` method is available in Chrome, Safari 5.1+, Firefox 9+, and Safari for iOS 5+. These represent the browsers that I have access to and can verify. Internet Explorer and Opera still don't support `matchMedia()` as of their latest versions.

**Note:** The WebKit implementation is a bit buggy, so `matches` doesn't update after the `MediaQueryList` object is created and query listeners don't fire. Hopefully this will be fixed soon.

## Conclusion

CSS media queries bring a simple feature detection syntax to both CSS and JavaScript. I expect that media queries will become a big part of JavaScript coding in the future, alerting developers as to when significant interface changes occur. There is no reason that the behavior of a web application shouldn't be just as responsive as the layout, and CSS media queries give us that power today. 

## References

  1. [A function for detecting if the browser is in a given media mode][1]
  2. [MSDN: innerHTML Property][2]
  3. [CSS Object Model View][3]
  4. [matchMedia() MediaQueryList is not updating][4]

 [1]: https://gist.github.com/08602e7d2ee448be834c
 [2]: http://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
 [3]: http://www.w3.org/TR/cssom-view/
 [4]: https://bugs.webkit.org/show_bug.cgi?id=75903
