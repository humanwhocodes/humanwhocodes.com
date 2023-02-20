---
title: "Don't forget navigator.platform"
author: Nicholas C. Zakas
permalink: /blog/2007/12/17/don-t-forget-navigator-platform/
categories:
  - Web Development
tags:
  - JavaScript
  - navigator
  - User Agent String
---
When discussions about JavaScript browser detection pop up, it usually is based around the user-agent string and accessing it via `navigator.userAgent`. However, there are a number of properties on `navigator` that are useful. One of the most useful is `navigator.platform`.

`navigator.platform` returns a string representing the platform on which the browser is running. The platform is not the operating system per se, but rather the machine architecture. For Windows systems, the value is typically &#8220;Win32&#8243; (I'd expect it to be &#8220;Win64&#8243; for 64-bit systems, but I don't have one to test on; it used to be &#8220;Win16&#8243; on pre-Windows 95 systems); for Mac systems, it's either &#8220;MacPPC&#8221; or &#8220;MacIntel&#8221; for Unix systems it's typically &#8220;X11&#8243; although Linux systems may have &#8220;Linux i686&#8243;. This information is useful in determining whether a browser is being used on a computer or a device.

On a hunch, I asked my co-worker Steve to hit a test page using his iPhone. As it turns out, `navigator.platform` is &#8220;iPhone&#8221; (I'd expect it to be &#8220;iPod&#8221; for the iPod Touch). So that's a very simple way, without user-agent string parsing, to determine that the browser is being used on the iPhone. I suspect (or rather hope) that devices such as the Wii and Playstation also change `navigator.platform` to something logical. If anyone knows offhand, please let me know.

Another great thing about `navigator.platform` is that it's not spoofed, so its value can be relied upon. It can't tell you explicitly about what browser is being used, but knowing the platform can be useful when cross-platform browser issues arise or for tracking purposes.
