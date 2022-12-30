---
title: Safari Recreates Proprietary Extensions
author: Nicholas C. Zakas
permalink: /blog/2005/09/29/safari-recreates-proprietary-extensions/
categories:
  - Web Development
tags:
  - DOMParser
  - elementFromPoint
  - outerHTML
  - Safari
  - showModalDialog
  - WebKit
---
I was just reviewing the <a title="WebKit Fixes in Safari 2.0.1" rel="external" href="http://webkit.opendarwin.org/blog/?p=26">list of updates</a> made to Safari 2.0.1 and was shocked to see the amount of proprietary extensions that Safari has implemented. I'm a little mixed in my feelings about this. Afterall, if it weren't for recreating proprietary functionality, we wouldn't have the wonderful XMLHttp object in every browser. It also seems that copying proprietary Mozilla functionality is much more socially acceptable than copying IE functionality&#8230;well, Safari has done both. Check out this list of fixes and additions:

  * Implemented `showModalDialog()` from IE.
  * Implemented `document.elementFromPoint()` from IE.
  * Fixed `outerHTML` to work with `<img/>` (`outerHTML` is from IE).
  * Implemented `DOMParser` from Mozilla.

So what about it? Is it okay to recreate proprietary functionality and create a pseudo-standard in doing so?
