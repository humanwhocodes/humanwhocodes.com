---
title: Browser detection versus feature detection
author: Nicholas C. Zakas
permalink: /blog/2006/11/16/browser-detection-versus-feature-detection/
categories:
  - Web Development
tags:
  - Browser Detection
  - Feature Detection
  - JavaScript
---
One of the more controversial chapters in <a title="Professional JavaScript for Web Developers" rel="external" href="http://www.amazon.com/exec/obidos/redirect?link_code=ur2&tag=nczonline-20&camp=1789&creative=9325&path=http%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F0764579088%2F">my first book</a> was the chapter on browser detection. I got flaming emails, blog comments, and reviews about the user-agent string detecting method, telling me that I was falsely promoting an outdated methodology for dealing with browser differences. Feature detection is the ideal, they all said, and that is the only thing you should be teaching. But alas, life is not so easy.

In an ideal world, feature detection would work perfectly. I'd just see if an element supported `addEventListener` before using it. No need for knowing what specific browser you're using. For a decent amount of JavaScript code, this technique works perfectly. However, there are times when it is absolutely necessary to know the browser being used because of the biggest problem in the browser space today: incorrect implementations.

Using feature detection for a method or property is great when all browsers implement them the same way. However, there are cases when browsers implement them differently or implement only stubs. Take the `min-height` <acronym title="Cascading Style Sheets">CSS</acronym> property, which wasn't supported in Internet Explorer prior to version 7.0. One would think that `style.minHeight` would be undefined, so using feature detection would be easy. However, version 6.0 reports this value as a string, and it can be set and read as if it's actually implemented; the only problem, of course, is that it's not. So in this case, feature detection doesn't help the cause&#8230;you need to know that the browser is Internet Explorer version 6.0 and, in that case, `style.minHeight` doesn't work.

This is just one example of feature detection falling on its face. Another was the `getElementsByTagName("*")` debacle. Internet Explorer prior to 6.0 supported `getElementsByTagName()`, but not when passing in an asterisk to get all elements. Yet another is the table-specific <acronym title="Document Object Model">DOM</acronym> methods that were implemented as stubs in Internet Explorer 5 for the Mac (they existed, they just didn't do anything). Further, both Firefox and Opera implemented `document.all` so that web sites designed for Internet Explorer wouldn't break; so much for that feature detection classic.

My point here is that user-agent string detection is still the most accurate way to determine what browser is being used, and this can, in some cases, be more valuable than using feature detection. Feature detection is a good practice and should always be used first, but if there are implementation differences that are bogging you down, don't hesitate to look to the user-agent string for help in determining what to do.
