---
title: Getting element dimensions
author: Nicholas C. Zakas
permalink: /blog/2008/02/03/getting-element-dimensions/
categories:
  - Web Development
tags:
  - DOM
  - Firefox
  - getBoundingClientRect
  - Internet Explorer
  - JavaScript
  - YUI
---
Figuring out exactly where an element is on the page can be confusing. There's all kinds of things to take into account, and the `offsetTop` and `offsetLeft` element properties require funky calculations to determine actual position as you step back up through the document hierarchy. The <a title="YUI DOM Utility" rel="external" href="http://developer.yahoo.com/yui/dom">YUI DOM utility</a> hides the ugliness from you by accounting for all kinds of browser quirks. But why isn't there just a function we can call to get the location for sure? Well, there sort of is.

Internet Explorer supports a method on each element called <a title="getBoundingClientRect method" rel="external" href="http://msdn2.microsoft.com/en-us/library/ms536433.aspx">getBoundingClientRect()</a> that returns a rectangle object indicating the left, top, right, and bottom of any element with respect to the viewport (not to the document). This is moderately useful once you add scrolling information to all of the dimensions, though there is an oddity: for some reason, this method believes that the starting coordinates of the page are at (2,2) instead of (0,0), meaning you need to subtract 2 from each dimension to get an accurate measurement. It's a little annoying, but then you have good information.

Firefox 3 decided to implement this method because it's so useful. Excellent! Except that it's not implemented the same way. The Firefox method realizes that the document begins at (0,0), so you don't need to subtract 2 from each dimension. Also, Firefox can return half-pixel increments&#8230;highly confusing.

I understand the thinking to implement a useful method that works a little funky, and I can even understand, in theory, wanting to fix the funky behavior in your own implementation. The problem with this approach is that capability detection can't be used with this method anymore. Simply checking to see if the method exists doesn't tell you enough to use it properly. You now need to check specifically for IE or Firefox, or you need to do a quick sanity check and called `getBoundingClientRect()` on `document.documentElement` to check the top and left values (these are always 2 and 2 in IE, 0 and 0 in Firefox).

While IE's implementation is funky, I believe that if you're going to copy functionality from another browser, you need to make it work the same way. Having a method that works &#8220;sort of&#8221; the same in browsers is quite annoying.
