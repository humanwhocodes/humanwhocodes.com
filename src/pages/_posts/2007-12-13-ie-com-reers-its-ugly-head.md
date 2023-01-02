---
title: "IE: COM reers its ugly head"
author: Nicholas C. Zakas
permalink: /blog/2007/12/13/ie-com-reers-its-ugly-head/
categories:
  - Web Development
tags:
  - COM
  - Internet Explorer
  - JavaScript
  - JScript
---
Most web developers have heard by now about the quirky implementation of Internet Explorer that separates JavaScript into two camps: JScript and COM. JScript represents the code you write as well as the basic ECMAScript data types and structures. While other browsers also use ECMAScript to represent DOM, Internet Explorer does not. Instead, IE uses the old-fashioned COM object system to implement it, which results in things like memory leaks because JScript uses mark-and-sweep garbage collection while COM uses reference counting&#8230;and the two just don't mix well in IE. Everything in IE's DOM is a COM object, which is confusing to JScript in several ways.

When a COM object is accessed by JScript, it knows only that the object is an object, it knows nothing about its type or capabilities. As an example, the `arguments` object is a JScript object and is array-like in that it has numeric indices and a `length` property. Knowing that, you can quickly create an actual `Array` by using the `Array`&#8216;s `slice()` method and applying it to `arguments` like this:

<code class="block"> </code>

<pre>var values = Array.prototype.slice.call(arguments, 0);</pre>

This is a fairly well-known and quick method of creating an array from an `arguments` object (I don't claim to have invented it). It makes sense. You're calling `slice()` in the context of an array-like object, so it behaves appropriately. It seems like that should work for any array-like object, perhaps like the `HTMLCollection` returned from `getElementsByTagName()`? Try this out:

<code class="block"> </code>

<pre>var images = document.getElementsByTagName("img");
var values = Array.prototype.slice.call(images, 0);</pre>

This works fine in all browsers&#8230;except IE. In IE you get an error message saying, &#8220;JScript object expected.&#8221; At least IE is being honest. The problem is that the `HTMLCollection` object is a COM object, and JScript doesn't know anything about it other than it's an object. JScript has no idea that the object is array-like; the object is a mystery. So, it throws an error because it doesn't know what to do or how to handle the object that was passed in.

Another place where this issue occurs is in the DOM functions. Consider `document.getElementById()`, arguably the most often-used method in DOM. Now take a look at this code:

<code class="block"> </code>

<pre>if (typeof document.getElementById == "function"){
    return document.getElementById(id);
} else {
    //whatever
}</pre>

This code works as expected in all browsers&#8230;except IE. Since `document.getElementById()` is part of the DOM, it's represented by a COM object, which means `typeof` actually returns &#8220;object&#8221; instead of &#8220;function&#8221;. The `document.getElementById()` is *not* a JScript function at all. You can prove this in any number of ways:

<code class="block"> </code>

<pre>//should be true
alert(document.getElementById instanceof Function);

//should be "function"
alert(typeof document.getElementById.call);

//should be "function"
alert(typeof document.getElementById.propertyIsEnumerable);</pre>

This doesn't just go for `document.getElementById()`, but also for any other DOM methods. They are all COM objects and so can't be treated correctly by JScript. This is a major headache and one that I hope will be addressed in future versions of IE.
