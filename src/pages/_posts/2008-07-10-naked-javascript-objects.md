---
title: Naked JavaScript objects
author: Nicholas C. Zakas
permalink: /blog/2008/07/10/naked-javascript-objects/
categories:
  - Uncategorized
tags:
  - JavaScript
  - Objects
---
I was looking through one of the source files of <a title="Source of Narcissus" rel="external" href="http://lxr.mozilla.org/mozilla/source/js/narcissus/">Narcissus</a>, the JavaScript interpreter written in JavaScript, when I came across a line that I probably missed before:

`var keywords = {__proto__: null};`

The `__proto__` property is only accessible in Firefox, Safari, Rhino, and ActionScript and is the property that ties an object instance to its prototype. A little-known fact about JavaScript is that object instances have no relationship to their constructors, only to their prototypes. The `__proto__` property exposes this relationship.

As with most properties, `__proto__` can be overwritten. Doing so changes the prototype chain of the object. The code from Narcisuss effectively creates a JavaScript object that has no prototype chain and therefore none of the methods that all objects inherit from `Object`. The result? A truly naked base object that has no properties. Cutting off the prototype chain also ensures that changes to `Object.prototype` won&#8217;t effect the use of `for-in`. This is really interesting:

`var o = { __proto__: null };<br />
alert(o.toString); //undefined`

Interestingly, this seems to be the only way to create a naked object. You can define a constructor whose prototype is set to `null`, but creating an instance using that constructor automatically resets the prototype to `Object`. Example:

`function MyObject(){}<br />
MyObject.prototype = null;<br />
var o = new MyObject();<br />
alert(o.toString); //function`

I don&#8217;t know that this information is useful in any way, but it certainly is interesting.
