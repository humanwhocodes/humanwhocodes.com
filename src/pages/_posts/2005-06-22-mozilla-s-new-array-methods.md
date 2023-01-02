---
title: "Mozilla's new Array methods"
author: Nicholas C. Zakas
permalink: /blog/2005/06/22/mozilla-s-new-array-methods/
categories:
  - Web Development
tags:
  - Arrays
  - JavaScript
  - Mozilla
---
Just caught <a title="Array Extras" rel="external" href="http://erik.eae.net/archives/2005/06/05/17.53.19/">this post</a> over at Erik's regarding the new additions to the `Array` object available in Firefox 1.1. The Mozilla <a title="Core JavaScript 1.5 Reference:Objects:Array:Methods" rel="external" href="http://developer-test.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array#Method_list">documentation</a> explains the new methods which many developers have probably been coding themselves for many years. At risk of repeating Erik, the new methods are:

  * `indexOf()` &#8211; bought freakin' time. I've been coding this thing for years now. As you may have guessed, it returns the first index of the object in the array or -1 if not found.
  * `lastIndexOf()` &#8211; same as above except returns the last index of the object in the array.
  * `every()` &#8211; takes in a function and runs it on every value in the array. If the function returns true for all values, then it returns true, otherwise it returns false (think of it like an AND operation).
  * `some()` &#8211; takes in a function and runs it on every value in the array. If the function returns true for *any* value, then it returns true, otherwise it returns false (think of it like an OR operation).
  * `filter()` &#8211; takes in a function and returns a new array containing all items that cause the function to return a value of true.
  * `forEach()` &#8211; takes in a function and runs it on every item in the array (i.e., no more `for` loops needed).
  * `map()` &#8211; takes in a function, runs it on each item in the array, and returns an array with the results.

As you can tell, most of these have to do with applying a function to every item in the array to some end. This is really a popular technique in the &#8220;real world,&#8221; and I'm surprised it took people so long to make it native. Can't wait to see what other goodies Firefox 1.1 will bring.
