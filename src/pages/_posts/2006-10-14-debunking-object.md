---
title: Debunking object()
author: Nicholas C. Zakas
permalink: /blog/2006/10/14/debunking-object/
categories:
  - Web Development
tags:
  - Inheritance
  - JavaScript
  - Objects
---
One of Crockford&#8217;s latest creations is the `object()` function, which he puts forth as a <a title="Prototypical Inheritance in JavaScript" rel="external" href="http://javascript.crockford.com/prototypal.html">better way</a> of doing prototypical inheritance in JavaScript. The function is as follows:

<pre>function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}</pre>

The basic idea is sound: you assign an object to be the prototype of a function, then instantiate that object, effectively creating a new object with the same properties and methods. Where the idea falls apart is when you consider creating multiple instances of an &#8220;inherited&#8221; object, for example:

<pre>var o = { colors : ['red', 'blue'] };
var o2 = object(o);
var o3 = object(o);

o2.colors.push('black');
alert(o2.colors);
alert(o3.colors);</pre>

If you run this example, you&#8217;ll see that the `colors` property actually uses the same array for both object instances, thus adding &#8220;black&#8221; to the array on `o2` is reflected in `o3.colors` as well&#8230;they both point to the same array. It is a very rare case when you want object instances to have instance properties pointing to the same object.

But all is not lost, the basic principle of this function is useful if augmented slightly. Using this same pattern, you can avoid calling a superclass constructor when assigning the prototype. For instance, doing this:

<pre>Subclass.prototype = new Superclass();</pre>

This code ends up calling the constructor for `Superclass` just to get the prototype for inheritance of methods. But you can just grab a duplicate of the prototype instead using a function such as:

<pre>function inherit(subclass, superclass) {
    function F() {};
    F.prototype = superclass.prototype;
    subclass.prototype = new F();
}</pre>

Use this function only to inherit prototypes, such as:

<pre>inherit(Subclass, Superclass);</pre>

You&#8217;ll still need to inherit properties via object masquerading in the `Subclass` constructor, but at least you won&#8217;t be executing the `Superclass` constructor twice anymore. What&#8217;s more, this function preserves the functionality of `instanceof`.

So, Crockford&#8217;s `object()` function is really nothing more than a function that clones another object. However, the technique can be used to ease prototypical inheritance in JavaScript as illustrated above.
