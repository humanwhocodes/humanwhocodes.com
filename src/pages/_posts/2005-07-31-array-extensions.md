---
title: Array extensions
author: Nicholas C. Zakas
permalink: /blog/2005/07/31/array-extensions/
categories:
  - Web Development
tags:
  - Arrays
  - JavaScript
  - zArray
---
Way back when, I wrote a library to extend the `Array` object to use with Internet Explorer 5.0, which still didn't include the ECMAScript 3rd edition methods. I had also defined several other functions I found useful. Recently, I found this file and decided to update it with the new <a title="Core JavaScript 1.5 Reference:Objects:Array" rel="external" href="http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array">Mozilla methods</a>. So, if you're so inclined, take a look at the [zArray][1] library.

**Update: ** I really wish I had noticed that <a title="erik's weblog" rel="external" href="http://erik.eae.net">Erik</a> had already done <a title="Erik's Array Extras" rel="external" href="http://erik.eae.net/playground/arrayextras/">something similar</a>&#8230;really could've saved me the time. Oh well.

**Update 2: ** <a title="erik's weblog" rel="external" href="http://erik.eae.net">Erik</a> correctly pointed out that my implementation of `every()` was faulty. I have fixed it and updated zArray to version 1.01.

 [1]: /downloads/zArray1.0.zip
