---
title: 'Don't allow overriden methods'
author: Nicholas C. Zakas
permalink: /blog/2006/09/06/don-t-allow-overriden-methods/
categories:
  - Web Development
tags:
  - JavaScript
  - Objects
---
This is a little technique I've been working on for ensuring that objects don't get used with overridden methods that shouldn't be. To put it bluntly: if you've ever worried about someone overriding one of your methods through inheritance in JavaScript, here's the solution.

Basically, the idea is very simple. In the object constructor, just loop through the properties and ensure that the methods you want are, in fact, the methods you want. Consider you have this object:

<pre>function MyObject() {
    for (sProp in this) {
        if (sProp.indexOf("_") === 0) {
            if (this[sProp] != arguments.callee.prototype[sProp]) {
                throw new Error("Illegal override of method " + sProp + "().");
            }
        }
    }
}

MyObject.prototype._sayHi = function () {
    alert("hi");
};</pre>

I'm using the underscore before the method name to indicate that this method must always be the original one (the one defined on the prototype). Now suppose someone comes along and wants to inherit from this object using the combination hybrid constructor/prototype approach discussed in <a title="Professional JavaScript" rel="external" href="http://www.amazon.com/exec/obidos/redirect?link_code=ur2&tag=nczonline-20&camp=1789&creative=9325&path=http%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F0764579088%2F">my book</a> (p. 110), such as:

<pre>function MySubObject() {
    MyObject.apply(this);
}

MySubObject.prototype = new MyObject();
MySubObject.prototype._sayHi = function () {
    alert("hola");
};</pre>

When someone comes along and tries to create a new instance of `MySubObject`, they are met with an error stating they've illegally overridden a method. Granted, this assumes that you're using the hybrid inheritance approach (which I still believe is the best approach around), but that's why coding standards are so important in an organization. If you can assume that subclassing is always done this way, you can also assume a measure of control over methods that should not be overridden.
