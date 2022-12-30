---
title: Introduction to the Page Visibility API
author: Nicholas C. Zakas
permalink: /blog/2011/08/09/introduction-to-the-page-visibility-api/
categories:
  - Web Development
tags:
  - JavaScript
  - Page Visibility API
  - Performance
---
A major pain point for web developers is knowing when users are actually interacting with the page. If a page is minimized or hidden behind another tab, it may not make sense to continue functionality such as polling the server for updates or performing an animation. The [Page Visibility API][1] aims to give developers information about whether or not the page is visible to the user.

The API itself is very simple, consisting of three parts:

  * `document.hidden` – A boolean value indicating if the page is hidden from view. This may mean the page is in a background tab or that the browser is minimized.
  * `document.visibilityState` – A value indicating one of four states:
  1. The page is in a background tab or the browser is minimized.
  2. The page is in the foreground tab.
  3. The actual page is hidden but a preview of the page is visible (such as in Windows 7 when moving the mouse over an icon in the taskbar).
  4. The page is being prerendered off screen.

  * The `visibilitychange` event – This event fires when a document changes from hidden to visible or vice versa.

As of the time of this writing, only Internet Explorer 10 and Chrome (12+) have implemented the Page Visibility API. Internet Explorer has prefixed everything with &#8220;ms&#8221; while Chrome has prefixed everything with &#8220;webkit&#8221;. So `document.hidden` is implemented as `document.msHidden` in Internet Explorer and `document.webkitHidden` in Chrome. The best way to check for support is with this code:

    function isHiddenSupported(){
         return typeof (document.hidden || document.msHidden || document.webkitHidden) != "undefined";
     }

To check to see if the page is hidden, the following can be used:

    function isPageHidden(){
         return document.hidden || document.msHidden || document.webkitHidden;
     }

Note that this code will indicate that the page is not hidden in unsupporting browsers, which is the intentional behavior of the API for backwards compatibility.

To be notified when the page changes from visible to hidden or hidden to visible, you can listen for the visibilitychange event. In Internet Explorer, this event is called `msvisibilitychange` and in Chrome it's called `webkitvisibilitychange`. In order to work in both browsers, you need to assign the same event handler to each event, as in this example:

    function handleVisibilityChange(){
        var output = document.getElementById("output"),
            msg;
            
        if (document.hidden || document.msHidden || document.webkitHidden){
            msg = "Page is now hidden." + (new Date()) + "<br />"
        } else {
            msg = "Page is now visible." + (new Date()) + "<br />"
        }
        
        output.innerHTML += msg;
        
    }
    
    //need to add to both
    document.addEventListener("msvisibilitychange", handleVisibilityChange, false);
    document.addEventListener("webkitvisibilitychange", handleVisibilityChange, false);

This code works well in both Internet Explorer and Chrome. Further, this part of the API is relatively stable so it's safe to use the code in real web applications.

## Differences

The biggest difference between the implementations is with `document.visibilityState`. Internet Explorer 10 PR 2&#8242;s `document.msVisibilityState` is a numeric value representing one of four constants:

  1. `document.MS_PAGE_HIDDEN` (0)
  2. `document.MS_PAGE_VISIBLE` (1)
  3. `document.MS_PAGE_PREVIEW` (2)
  4. `document.MS_PAGE_PRERENDER` (3)

In Chrome, `document.webkitVisibilityState` is one of three possible string values:

  1. &#8220;hidden&#8221;
  2. &#8220;visible&#8221;
  3. &#8220;prerender&#8221;

Chrome does not feature constants for each state, though the final implementation will likely contain them.

Due to these differences, it's recommended not to rely on the vendor-prefixed version of `document.visibilityState` and instead stick to using `document.hidden`.

## Uses

The intended use of the Page Visibility API is to signal that to the page that the user isn't interacting with the page. You can use that information to, for example, stop polling for updates from the server or stop animations (though if you're using `requestAnimationFrame()`, that will happen automatically). 

After a little thought, I realized that the Page Visibility API is much more about the user than it is about the page, and so I added support to my [YUI 3 Idle Timer][2] component. The component now fires the `idle` event when the page becomes hidden and the `active` event when the page once again becomes visible. 

Whether using the Idle Timer, or the Page Visibility API on its own, this new functionality gives web developers a much-needed peek into what the browser is doing with our web application. I hope to see many more great advancements coming from the W3C Performance group.

 [1]: http://www.w3.org/TR/page-visibility/
 [2]: http://yuilibrary.com/gallery/show/idletimer
