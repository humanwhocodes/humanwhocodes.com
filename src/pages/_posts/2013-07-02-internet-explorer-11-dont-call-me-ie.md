---
title: 'Internet Explorer 11: &#8220;Don't call me IE&#8221;'
author: Nicholas C. Zakas
permalink: /blog/2013/07/02/internet-explorer-11-dont-call-me-ie/
categories:
  - Web Development
tags:
  - Internet Explorer
  - JavaScript
  - navigator
  - User Agent String
---
This past week, Microsoft officially unveiled the first preview of Internet Explorer 11 for Windows 8.1<sup>[1]</sup>. Doing so put to rest a whirlwind of rumors based on leaked versions of the much-maligned web browser. We now know some very important details about Internet Explorer 11, including its support for WebGL, prefetch, prerender, flexbox, mutation observers, and other web standards. Perhaps more interestingly, though, is what is *not* in Internet Explorer 11.

For the first time in a long time, Microsoft has actually removed features from Internet Explorer. The user-agent string has also changed. It seems that Microsoft has gone out of their way to ensure that all existing `isIE()` code branches, whether in JavaScript or on the server, will return `false` for Internet Explorer 11. The optimistic view of this change is that Internet Explorer 11 finally supports enough web standards such that existing IE-specific behavior is no longer needed.

## User-agent changes

The user-agent string for Internet Explorer 11 is shorter than previous versions and has some interesting changes:

    Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv 11.0) like Gecko

Compare this to the Internet Explorer 10 user-agent string (on Windows 7):

    Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)

The most glaring difference is the removal of the &#8220;MSIE&#8221; token, which has been part of the Internet Explorer user-agent from the beginning. Also noticeable is the addition of &#8220;like Gecko&#8221; at the end. This suggests that Internet Explorer would prefer to be identified as a Gecko-type browser if it's not identified as itself. Safari was the first browser to add &#8220;like Gecko&#8221; so that anyone sniffing for &#8220;Gecko&#8221; in the user-agent string would allow the browser through.

Any sniffing code that looks for &#8220;MSIE&#8221; now will not work with the new user-agent string. You can still search for &#8220;Trident&#8221; to identify that it's Internet Explorer (the &#8220;Trident&#8221; token was introduced with Internet Explorer 9). The true Internet Explorer version now comes via the &#8220;rv&#8221; token.

Additionally, there are changes to the `navigator` object that also obscure which browser is being used:

  * `navigator.appName` is now set to &#8220;Netscape&#8221;
  * `navigator.product` is now set to &#8220;Gecko&#8221;

This may seem like a sneaky attempt to trick developers, but this behavior is actually specified in HTML5<sup>[2]</sup>. The `navigator.product` property must be &#8220;Gecko&#8221; and `navigator.appName` should be either &#8220;Netscape&#8221; or something more specific. Strange recommendations, but Internet Explorer 11 follows them.

The side effect of these `navigator` changes is that JavaScript-based logic for browser detection may end up using these and will end up identifying Internet Explorer 11 as a Gecko-based browser.

## document.all and friends

Since Internet Explorer 4, `document.all` has been an omnipresent force in Internet Explorer. Prior to the implementation of `document.getElementById()`, `document.all` was the &#8220;IE way&#8221; of getting an element reference. Despite Internet Explorer 5&#8242;s DOM support, `document.all` has remained in Internet Explorer through version 10. As of 11, this vestige of a bygone era has now been made falsy, meaning that any code branches based on the presence of `document.all` will fail for Internet Explorer 11 even though code that actually uses `document.all` will work.<sup>[3]</sup>

Another holdover is the `attachEvent()` method for adding event handlers. This method, as well as `detachEvent()`, have now been removed from Internet Explorer 11. Removing these methods is a means to short-circuit logic such as:

    function addEvent(element, type, handler) {
        if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
    }

Of course, it's recommended that you always test for the standards-based version first, in which case the removal of `attachEvent()` would yield no different behavior. However, the Internet is littered with bad feature detection logic and removing `attachEvent()` ensures that any code written in the above manner will use the standard version instead of the IE-specific one.

Some of the other features that have been removed:

  * `window.execScript()` &#8211; IE's own version of `eval()`
  * `window.doScroll()` &#8211; IE's way of scrolling the window
  * `script.onreadystatechange` &#8211; IE's way of telling of listening for when a script was loaded
  * `script.readyState` &#8211; IE's way to test the load state of a script 
  * `document.selection` &#8211; IE's way of getting currently selected text
  * `document.createStyleSheet` &#8211; IE's way to create a style sheet
  * `style.styleSheet` &#8211; IE's way to reference a style sheet from a style object

All of these have standards-based equivalents that should be used instead of the old Internet Explorer way of doing things. As with removing the other features, removing these means that cross-browser code that does feature detection for standards-based features should continue working without change.

## Conclusion

It looks like Internet Explorer 11 could be the best Internet Explorer yet by a long shot. By finally removing the evidence of past mistakes, Microsoft is ready to take a place amongst the standards-based browsers of today. Removing old features and adjusting the user-agent string to not be identified as Internet Explorer is a rather unique move to ensure that all sites that work today continue to work. If web applications are using feature detection instead of browser sniffing, then the code should just work with Internet Explorer 11. For servers that are sniffing the user-agent, users should still get a fully functional site because of Internet Explorer 11&#8242;s excellent standards support. 

A future without IE-specific code branches is near, and I for one am happy to welcome it.

**Update (02-July-2013):** Revised to mention that `document.all` is not actually removed, rather has been changed to be falsy.


  1. [Internet Explorer 11 preview guide for developers][1] (MSDN)
  2. [Navigator Object &#8211; Client Identification][2] (HTML5)
  3. [Obsolete &#8211; Behavior of document.all][3] (HTML5)

 [1]: http://msdn.microsoft.com/library/ie/bg182636(v=vs.85).aspx
 [2]: http://www.w3.org/html/wg/drafts/html/master/webappapis.html#client-identification
 [3]: http://www.whatwg.org/specs/web-apps/current-work/multipage/obsolete.html#dom-document-all
