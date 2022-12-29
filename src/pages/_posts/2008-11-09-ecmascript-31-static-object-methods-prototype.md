---
title: ECMAScript 3.1 static object methods prototype
author: Nicholas C. Zakas
permalink: /blog/2008/11/09/ecmascript-31-static-object-methods-prototype/
categories:
  - Uncategorized
tags:
  - ECMAScript
  - JavaScript
---
While writing the section on ECMAScript 3.1 for my upcoming book, [Professional JavaScript, 2nd Edition][1], I found it useful to create some of the static object methods to play around with. For those unaware, ECMAScript 3.1 defines several methods on Object designed to make it easier to manage object properties. These methods can be used to define new properties, including properties that are enumerable, read only, or otherwise different from standard developer-defined properties. From reading the specification, it&#8217;s a little bit difficult to determine how one would use the methods, so I figured I&#8217;d create as many as possible using existing ECMAScript 3.0 functionality to make sure I completely understood the functionality. The result is a small library that has basic versions of the following ECMAScript 3.1 static object methods:

  * `Object.create()` &#8211; basic functionality works in all browsers. Non-IE browsers allow defining getters and setters. No browsers can define `enumerable`, `flexible`, and `writable` on properties as this functionality isn&#8217;t available in today&#8217;s browsers.
  * `Object.clone()` &#8211; basic functionality works in all browsers.
  * `Object.defineProperty()` &#8211; same limitations as `Object.create()`.
  * `Object.defineProperties()` &#8211; same limitations as `Object.create()`.
  * `Object.getPrototypeOf()` &#8211; possibly inaccurate in IE due to lack of `__proto__` support.
  * `Object.getOwnPropertyNames()` &#8211; won&#8217;t return non-enumerable properties.
  * `Object.getOwnPropertyDescriptor()` &#8211; `enumerable`, `flexible`, and `writable` are always set to true. IE can&#8217;t retrieve getters and setters.
  * `Object.keys()` &#8211; works as expected.

Several of the static methods can&#8217;t be implemented using current technology, so I didn&#8217;t even bother trying. Therefore, the following six methods aren&#8217;t included:

  * `Object.freeze()`
  * `Object.preventExtensions()`
  * `Object.seal()`
  * `Object.isFrozen()`
  * `Object.isExtensible()`
  * `Object.isSealed()`

You can download the source of my static object library along with some examples of usage [here][2]. The library isn&#8217;t recommended for production usage but may be useful if you want to play with the functionality to see what&#8217;s coming down the road. If you&#8217;d like to learn more about the static object methods, please refer to this document: [Proposed ECMAScript 3.1 Static Object Functions: Use Cases and Rationale][3].

 [1]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
 [2]: {{site.url}}/downloads/es31object.zip
 [3]: http://wiki.ecmascript.org/lib/exe/fetch.php?id=es3.1%3Aes3.1_proposal_working_draft&cache=cache&media=es3.1:rationale_for_es3_1_static_object_methodsaug26.pdf
