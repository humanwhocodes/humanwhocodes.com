---
title: IE OnBeforeUnload Fun
author: Nicholas C. Zakas
permalink: /blog/2006/03/01/ie-onbeforeunload-fun/
categories:
  - Web Development
tags:
  - Events
  - Internet Explorer
  - JavaScript
  - onbeforeunload
---
Was debugging something today when I made a discovery. Using Internet Explorer&#8217;s `onbeforeunload` event handler, you can automatically pop up a confirmation window asking the user to continue navigating away or stay on the page with ever using `confirm()`. All you have to do is set your message in the `window.event.returnValue` property, and the browser handles it automatically. For instance:

<pre>window.onbeforeunload = function () {
    window.event.returnValue = "All your work will be lost.";
}</pre>

This results in a window being popped up that shows this text as well as, &#8220;Are you sure you want to navigate away from this page?&#8221; before it and &#8220;Press OK to continue or Cancel to stay on the current page.&#8221; Pretty cool undocumented feature.
