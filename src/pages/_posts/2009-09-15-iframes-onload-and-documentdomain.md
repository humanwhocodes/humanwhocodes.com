---
title: Iframes, onload, and document.domain
author: Nicholas C. Zakas
permalink: /blog/2009/09/15/iframes-onload-and-documentdomain/
categories:
  - Web Development
tags:
  - iframe
  - JavaScript
  - onload
---
In this new Web 2.0, mashup world that the Internet has become, a lot of focus has been placed on the use of iframes for embedding third-party content onto a page. Iframes provide a level of security since JavaScript access it limited by domain name, so an iframe containing content from another site cannot access JavaScript on the containing page. This cross-domain restriction goes both ways as the containing page also has no programmatic access to the iframe. In all ways, the containing page and the iframed page are cut off from communication (which has led to the [cross-document messaging API in HTML5][1]). The missing piece of intrigue in most discussions surrounding iframes is JavaScript object ownership.

## Iframes and ownership

The iframe element itself, `<iframe>`, is owned by the containing page, and so you may work on it as an element (getting/setting attributes, manipulating its style, moving it around in the DOM, etc.). The `window` object representing the iframe content is the property of the page that was loaded into the iframe. In order for the containing page to access the iframe's window object in any meaningful way, the domain of the containing page and the iframe page need to be the same ([details][2]).

When the domains match, the containing page can access the `window` object for the iframe. The iframe element object has a property called `contentDocument` that contains the iframe's `document` object, so you can use the `parentWindow` property to retrieve the `window` object. This is the standard way to retrieve the iframe's `window` object and is supported by most browsers. Internet Explorer prior to version 8 didn't support this property and so you had to use the proprietary `contentWindow` property. Example:

    function getIframeWindow(iframeElement){
        return iframeElement.contentWindow || iframeElement.contentDocument.parentWindow;
    }

Additionally, the containing page's window object can be retrieved from the iframe using the `window.parent` property. The iframe page can also retrieve a reference to the iframe element in which it resides by using the `window.frameElement` property. This crosses the ownership boundary since the iframe is owned by the containing page but is directly accessible off the iframe's `window` object.

## Using the iframe element's onload

Trying to determine when an iframe is loaded is an [interesting task][3] due the ownership issues surrounding iframes. Browsers that aren't Internet Explorer do something very useful: they expose a `load` event for the *iframe element* so that it's possible for you to be aware when an iframe has loaded, regardless of the content. Since the iframe element is owned by the containing page, you never need to worry about cross-domain restrictions. An iframe loading local content can be monitored just as well as an iframe loading foreign content ([experiment][4]). Example code:

    var iframe = document.createElement("iframe");
    iframe.src = "simpleinner.htm";
    iframe.onload = function(){
        alert("Iframe is now loaded.");
    };
    document.body.appendChild(iframe);

This works in all browsers except Internet Explorer (even version 8!). <del>I had hoped that perhaps using the <code>attachEvent()</code> method would work, but alas, Internet Explorer just doesn't support the <code>load</code> event on an iframe element.</del> Pretty disappointing.

## Using the iframe window's onload

It seemed that Internet Explorer was going to foil my day&#8230;again. Then, I remembered that I'm not worried about foreign content in an iframe. In my specific case, I was dealing with content from the same domain. Since the cross-domain restriction didn't apply, I could access the iframe's `window` object directly and assign an `onload` event handler. Example:

    var iframe = document.createElement("iframe"),
        iframeWindow;
    iframe.src = "simpleinner.htm";
    document.body.appendChild(iframe);
    iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow;
    iframeWindow.onload = function(){
        alert("Local iframe is now loaded.");
    };

The interesting part of this approach is that you have to assign the event handler *after* the iframe element has been added to the page. Prior to that, the iframe's `window` object doesn't exist and so you can't assign the event handler. This approach works in Internet Explorer and Firefox for same-domain pages only. Other browsers haven't yet created the `window` object and so throw an error ([experiment][5]).

## Enter document.domain

I had resigned myself to using one method of detecting an iframe loading for Internet Explorer and another for every other browser, so I continued on my task. Next, I had to set `document.domain` on the containing page because I had a couple of different subdomains from which I needed to load iframes. When using different subdomains, setting `document.domain` to the root of the hostname allows iframes to communicate with their parent and each other. For example, if I had to load an iframe page from `www2.nczonline.net`, that is technically considered a different domain and would not be allowed. However, if I set `document.domain` to &#8220;nczonline.net&#8221; in both the containing page and the iframe page, the two are allowed to communicate. A single line of code, ideally placed at the top of the page, is all it takes:

    document.domain = "nczonline.net";

This equalizes the domain difference and allows everything to work as if both pages were from the same domain. Or so I thought.

The problem with this approach is that prior to the iframe being loaded, it's still considered to be owned by the domain as specific in its `src` attribute. A relative path automatically prepends the domain on which the containing page was loaded from (`www.nczonline.net`) versus the one assigned to `document.domain`. That means a comparison of `wnczonline.net` to `www.nczonline.net` fails the same-domain check and causes a JavaScript error when you try to access the iframe's `window `object ([experiment][6]). The iframe page won't have its associated domain changed until it's loaded and the JavaScript command to change the domain has been executed. Once the iframe page has been loaded, however, everything works fine. But how do you know once the iframe page has been loaded?

## Reversing the process

Having still not come across a cross-browser solution to determining when an iframe has loaded, I decided to reverse my thinking. Instead of the containing page asking when the iframe is loaded, what if the iframe told the containing page that it was loaded? If the iframe page listened for its own `load` event and then told the containing page when that occurred, that should solve the problem. I wanted this to be as simple as assigning an event handler, so I came up with the following idea: I'd assign a method onto the iframe element. Then, the iframe page will call that method when it has loaded. The method has to be assigned to the element rather than the iframe's `window` object because the latter doesn't exist in all browsers at an early enough moment in time. The result looked like this:

    var iframe = document.createElement("iframe");
    iframe.src = "simpleinner.htm";
    iframe._myMethod = function(){
        alert("Local iframe is now loaded.");
    };
    document.body.appendChild(iframe);

This code assigned a method called `_myMethod()` onto the iframe element. The page being loaded in the iframe then adds this code:

    window.onload = function(){
        window.frameElement._myMethod();
    }

Since this code is executed after the assignment to `document.domain`, there are no security restrictions to worry about. This works great for any resources that share the same root hostname ([experiment][7]). It works across all browsers, which is exactly what I was looking for,Â  but the problem of detecting when a foreign resource was loaded in an iframe was still annoying me.

## Using the iframe's onreadystatechange

I decided to look into Internet Explorer's iframe implementation a little bit more. It was clear that assigning something to the `onload` property didn't produce the desired effect, but I figured there must be something else similar. I tried to attach the event handler using `attachEvent()`, which also didn't work. Okay, clearly there was no support for the load event on the iframe. What about something else?

That's when I recalled IE's bizarre `readystatechange` event that it has on documents. This is, of course, completely different than the `readystatechange` event fired on `XMLHttpRequest` objects. I wondered if the iframe element might support this event as well, and as it turns out, [it does][8]. The iframe element supports the `readyState` property, which is changed to &#8220;interactive&#8221; and then &#8220;complete&#8221; when the contents of the iframe have been loaded. And because this is on the iframe element and not on the iframe `window` object, there is no concern about cross-domain restrictions ([experiment][9]). The final code I ended up with is along these lines:

    var iframe = document.createElement("iframe");
    iframe.src = "simpleinner.htm";
    
    if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera){
        iframe.onreadystatechange = function(){
            if (iframe.readyState == "complete"){
                alert("Local iframe is now loaded.");
            }
        };
    } else {
        iframe.onload = function(){
            alert("Local iframe is now loaded.");
        };
    }
    
    document.body.appendChild(iframe);

The check to determine if the browser is IE or not is a bit messy. I would have preferred to check for the existence of `iframe.readyState`, however, this throws an error when you try to access the property prior to adding the iframe into the document. I considered using the existence of `document.readyState` to determine whether to use `readystatechange`, however, most other browsers now support this property, so that's not a good enough determinant. With YUI, I'd just use `Y.UA.ie` to determine this (you can use whichever method suits you best).

## IE's hidden onload support

Shortly after posting this blog, [Christopher][10] commented that using `attachEvent`() on the iframe element works in IE. I could have sworn I tried this before but, due to his prompting, I whipped up another [experiment][11]. As it turns out, he's completely correct. I had to dig through the MSDN documentation to eventually find a roundabout reference, but sure enough, [it's there][12]. This led to a final code snippet of:

    var iframe = document.createElement("iframe");
    iframe.src = "simpleinner.htm";
    
    if (iframe.attachEvent){
        iframe.attachEvent("onload", function(){
            alert("Local iframe is now loaded.");
        });
    } else {
        iframe.onload = function(){
            alert("Local iframe is now loaded.");
        };
    }
    
    document.body.appendChild(iframe);

This code also works in all browsers and avoids any potential issues surrounding the timing of the `readystatechange `event versus the `load` event.

## Wrap-up

After quite a bit of investigation, it appears that it is possible to determine when an iframe has loaded across all browsers regardless of the iframe page's origin. This makes monitoring and error handling of iframed content a lot easier to manage. [I'm thankful][13] that all browser vendors saw the benefit of adding these events to the iframe element itself rather than relying on the iframe `window` object or expecting that we usually don't care whether an iframe has been loaded or not.

**Update (15 Sep 2009): **Added section about `attachEvent()` based on Christopher's comment.

 [1]: http://www.w3.org/TR/2009/WD-html5-20090212/comms.html#crossDocumentMessages
 [2]: http://msdn.microsoft.com/en-us/library/ms533028(VS.85).aspx
 [3]: http://twitter.com/slicknet/status/3900535188
 [4]: {{site.url}}/experiments/javascript/iframes/onload1.htm
 [5]: {{site.url}}/experiments/javascript/iframes/onload2.htm
 [6]: {{site.url}}/experiments/javascript/iframes/onload3.htm
 [7]: {{site.url}}/experiments/javascript/iframes/onload4.htm
 [8]: http://msdn.microsoft.com/en-us/library/ms536957(VS.85).aspx
 [9]: {{site.url}}/experiments/javascript/iframes/onload5.htm
 [10]: http://www.twitter.com/ChristopherBlum
 [11]: {{site.url}}/experiments/javascript/iframes/onload6.htm
 [12]: http://msdn.microsoft.com/en-us/library/cc197055(VS.85).aspx
 [13]: http://twitter.com/slicknet/status/3901078817
