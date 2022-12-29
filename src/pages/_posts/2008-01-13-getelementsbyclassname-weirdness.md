---
title: getElementsByClassName() weirdness
author: Nicholas C. Zakas
permalink: /blog/2008/01/13/getelementsbyclassname-weirdness/
categories:
  - Web Development
tags:
  - getElementsByClassName
  - HTML 5
  - JavaScript
---
As I&#8217;m working on the next edition of <a title="Professional JavaScript for Web Developers" rel="external" href="http://www.amazon.com/exec/obidos/redirect?link_code=ur2&tag=nczonline-20&camp=1789&creative=9325&path=http%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F0764579088%2F">Professional JavaScript</a>, I&#8217;ve been <del>updating</del> rewriting a large amount of it to include more of the vendor-specific JavaScript extensions. Today I took a look at `getElementsByClassName()`, which is implemented in Firefox 3 Beta 2 and the latest builds of WebKit.

This method is <a title="HTML 5 - getElementsByClassName()" rel="external" href="http://www.whatwg.org/specs/web-apps/current-work/#getelementsbyclassname">specified in HTML 5</a> as returning a `NodeList` of results. Ugh. Yet another performance cost to yet another DOM method. Groaning aside, it appears that the implementation in Firefox 3 Beta 2 actually returns an `Array` instead of a `NodeList`. I did some digging to figure out if maybe they had changed `NodeList` so that it inherited from `Array`, but this is not the case. WebKit, on the other hand, does return a `NodeList` of results.

And just so everyone knows, it looks like Opera 9.5 is also supporting `getElementsByClassName()`. It also correctly returns a `NodeList`. Looks Firefox is the only one behind the times on this one, but it is still in beta so hopefully it will be fixed.
