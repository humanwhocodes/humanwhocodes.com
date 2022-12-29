---
title: CSS media queries in JavaScript, Part 2
author: Nicholas C. Zakas
permalink: /blog/2012/01/19/css-media-queries-in-javascript-part-2/
categories:
  - Web Development
tags:
  - CSS
  - JavaScript
  - Media Query
---
In my previous post<sup>[1]</sup>, I introduced using CSS media queries in JavaScript both through a custom implementation and using the CSSOM Views `matchMedia()` method. Media queries are incredibly useful, both in CSS and JavaScript, and so I continued with my research to see how best to take advantage of this capability. As it turns out, the `matchMedia()` method has a few interesting quirks that I didn&#8217;t realize when I wrote the first part of this series.

## `matchMedia()` and its quirks

Recall that `matchMedia()` returns a `MediaQueryList` object that allows you to determine whether or not the given media type matches the current state of the browser. This is done using the `matches` property, which returns a boolean. As it turns out, `matches` is a getter, which requeries the state of the browser each time it&#8217;s called:

    var mql = window.matchMedia("screen and (max-width:600px)");
    console.log(mql.matches);
    
    //resize the browser
    
    console.log(mql.matches);  //requeries

This is actually really useful, because it allows you to keep a reference to a `MediaQueryList` object and repeatedly check the state of the query against the page. 

Chrome and Safari have a weird behavior, though. The initial value for `matches` is always correct but doesn&#8217;t get updated by default unless the page has a media block defined with the same query and at least one rule (hat tip: Rob Flaherty<sup>[2]</sup>. For instance, in order for a `MediaQueryList` representing &#8220;screen and (max-width:600px)&#8221; to update appropriately (including firing events), you must have something like this in your CSS:

    @media screen and (max-width:600px) {
        .foo { }
    }

There needs to be at least one rule in the media block, but it doesn&#8217;t matter if that rule is empty. As long as this exists on the page then the `MediaQueryList` will be updated appropriately and any listeners added via `addListener()` will fire when appropriate. Without this media block on the page, the `MediaQueryList` acts like a snapshot of the page state at its creation time.<sup>[3]</sup>

You can fix this by adding a new rule using JavaScript:

    var style = document.createElement("style");
    style.appendChild(document.createTextNode("@media screen and (max-width:600px) { .foo {} }"));
    document.head.appendChild(style);    //WebKit supports document.head
    

Of course, you would need to do that for every media query being accessed using `matchMedia()`, which is a bit of a pain.

There is also a strange quirk in Firefox&#8217;s implementation. In theory, you should be able to assign a handler for when the query state changes and not keep a reference to the `MediaQueryList` object, such as:

    //doesn't quite work in Firefox
    window.matchMedia("screen and (max-width:600px)").addListener(function(mql) {
         console.log("Changed!");
    });

When this pattern is used in Firefox, the listener may never actually be called even though the media query has become valid. In my tests, it would fire between 0 and 3 times, and then never again. The Firefox team has acknowledged this is a bug<sup>[4]</sup> and should hopefully be fixed soon. In the meantime, you need to keep the `MediaQueryList` reference around to ensure your listeners fire:

    //fix for Firefox
    var mql = window.matchMedia("screen and (max-width:600px)");
    mql.addListener(function(mql) {
         console.log("Changed!");
    });

The listener here will continue to be called as long as there is a reference to the `mql` object.

## More on listeners

My initial description of the media query listeners in my previous post was incomplete due to a misunderstanding on my part. The listeners are actually trigger in two instances:

  1. When the media query initially becomes valid. So in the previous example, when the screen becomes 600 pixels wide or less.
  2. When the media query initially becomes invalid. For example, when the screen becomes wider than 600 pixels.

This behavior is why the `MediaQueryList` object is passed into the listener, so you can check `matches` to determine if the media query just became valid or not. For example:

    mql.addListener(function(mql) {
        if (mql.matches) {
            console.log("Matches now!");
        } else { 
            console.log("Doesn't match now!");
        }
    });

Using code like this, you can monitor when a web application moves into and out of certain states, allowing you to alter the behavior accordingly.

## To polyfill or not?

When I first looked at `matchMedia()`, I did so with the intent of creating a polyfill. Paul Irish<sup>[5]</sup> implemented a polyfill using a technique similar to the one I described in my last post (and gave me credit for it, thanks Paul!). Paul Hayes then forked<sup>[6]</sup> his work to create a polyfill with rudimentary listener support based on a very ingenuous use of CSS transitions to detect changes. However, as it relies on CSS transitions, the listener support is limited to browsers with CSS transition support. That, coupled with the fact that calling `matches` doesn&#8217;t requery the browser state, and the bugs in both Firefox and WebKit, led me to believe that building a polyfill wasn&#8217;t the right approach. After all, how can you polyfill appropriately when there are such obvious bugs in the real implementations that need fixing?

My approach was to create a facade to wrap this behavior in an API where I could smooth out the issues. Of course, I chose to implement the API as a YUI Gallery module<sup>[7]</sup> called `gallery-media`. The API is very simple and consists of two methods. The first is `Y.Media.matches()`, which takes a media query string and returns true if the media matches and false if not. No need to keep track of any objects, just get the info:

    var matches = Y.Media.matches("screen and (max-width:600px)");

The second method is `Y.Media.on()`, which allows you to specify a media query and a listener to call when the media query becomes valid or invalid. The listener is passed an object with `matches` and `media` properties to give you information about the media query. For example:

    var handle = Y.Media.on("screen and (max-width:600px)", function(mq) {
        console.log(mq.media + ":" + mq.matches);
    });
    
    //detach later
    handle.detach();
    

Instead of using CSS transitions to monitor for changes, I use a simple `onresize` event handler. On the desktop, the size of the browser window is the main thing that will change (as opposed to mobile devices, where the orientation may also change), so I made this simplifying assumption for older browsers. The API uses the native `matchMedia()` functionality where available and patches up the differences in WebKit and Chrome so that you get consistent behavior.

## Conclusion

CSS media queries in JavaScript are a bit more complicated than I first expected, but still quite useful. I don&#8217;t think it&#8217;s appropriate to polyfill `matchMedia()` giving the strange bugs that are still abound, effectively preventing you from even using the native code the same way across browsers. A facade, on the other hand, insulates you from the bugs and changes that are likely to occur going forward. Now go forth and use CSS media queries to their potential&#8230;in JavaScript.

## References

  1. [CSS media queries in JavaScript, Part 1][1] by me
  2. [Rob Flaherty&#8217;s tweet][2] 
  3. [matchMedia() MediaQueryList not updating][3]
  4. [matchMedia() listeners lost][4]
  5. [matchMedia polyfill][5] by Paul Irish
  6. [matchMedia polyfill][6] by Paul Hayes
  7. [YUI 3 Gallery Media module][7] by me

 [1]: {{site.url}}/blog/2012/01/03/css-media-queries-in-javascript-part-1/
 [2]: https://twitter.com/#!/robflaherty/status/156581804046946304
 [3]: https://bugs.webkit.org/show_bug.cgi?id=75903
 [4]: https://bugzilla.mozilla.org/show_bug.cgi?id=716751
 [5]: https://github.com/paulirish/matchMedia.js
 [6]: https://github.com/fofr/matchMedia.js
 [7]: https://github.com/nzakas/yui3-gallery/tree/master/src/gallery-media
