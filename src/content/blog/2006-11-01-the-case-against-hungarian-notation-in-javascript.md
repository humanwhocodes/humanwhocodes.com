---
title: The case against Hungarian notation in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2006/11/01/the-case-against-hungarian-notation-in-javascript/
categories:
  - Web Development
tags:
  - Hungarian Notation
  - JavaScript
---
For years, I've used <a title="Hungarian Notation" rel="external" href="http://en.wikipedia.org/wiki/Hungarian_notation">Hungarian Notation</a> when programming in JavaScript. Both of my books use Hungarian notation for all code examples and recommend that others do the same. Now, I've been aware of the arguments against using Hungarian notation for a while as well, but most just said, &#8220;don't use it&#8221; without offering much in the way of an alternative. For a while, I feverishly pushed forth Hungarian notation as the most appropriate way to write JavaScript code. Recently, however, I've had a change of heart.

Truth be told, I've found more issues in enterprise applications with JavaScript using Hungarian notation. My list of complaints are as follows:

  * **No consistency** &#8211; If you go to one company and look at their code, then go to another company and look at theirs, the Hungarian notation may not line up. In one company, a prefix of &#8220;d&#8221; might denote a double while another may use it to denote a <acronym title="Document Object Model">DOM</acronym> element and another may use it to denote a `Date` object. So Hungarian notation isn't portable, you can't take it with you from company to company. This lack of consistency introduces the possibility of errors as developers try to adapt to new environments and coding systems. This is bad.
  * **Functions become ugly** &#8211; in true Hungarian notation, function names should also be prefixed. The problem is that JavaScript functions are actually objects, so do you prefix it with the object type (a function, perhaps &#8220;fn&#8221;) or the return type (maybe &#8220;i&#8221; in the case of a function that returns the type)? Code becomes less readable when functions are prefixed, so often they're left off. Now you have inconsistency and no way to figure out what the function is returning without examining the source code.
  * **Doesn't work with <acronym title="Object Oriented Programming">OOP</acronym>** &#8211; confusion sets in when talking about properties and methods of objects. Should properties be prefixed as well? If you do, then you end up with code looking like `oCar.iYear = 2005`, which is hard to read. So, most developers don't prefix properties or methods, which is once again inconsistent. It's just as important, if not more so, to know the data type of the properties on an object. Very bad.
  * **Too many exceptions** &#8211; the previous points are all about exceptions to Hungarian notation. There are other exceptions, such as iteration variable (think `i` in `for` loops). Too many exceptions negate a rule.

After thinking about these problems for a while, I decided that Hungarian notation is just not the way to go for JavaScript. There are too many problems to overcome. So I started from scratch, and after looking over some the ECMAscript 4 spec, I've come up with what I believe is a better, more flexible, and more readable way of expressing the data type of variables, properties, and functions. Here's the format I've been using lately:

<pre>variable_name /*:data_type*/ = value;</pre>

So what's going on here? Basically, the data type is expressed in a special inline comment that begins with a colon (:), inspired by the syntax for ECMAScript 4. Unlike Hungarian notation, this is a full description of the data type (`String`, `Number`, etc.) instead of just a prefix, so there can be no confusion as to the intended data type of the variable. What's more, this can be used with functions for both arguments and return values:

<pre>function add(value1 /*:int*/, value2 /*:int*/) /*:int*/ {
    return value1 + value2;
}</pre>

Here, each argument gets its own comment indicating the data type (`int`). The function also gets its own comment after the parentheses to indicate the return value of the function (also `int`). What's more, this works perfectly well for object properties too:

<pre>function MyObject() {
    this.age /*:int*/ = 28;
    this.name /*:String*/ = "Nicholas";
}</pre>

There are many reasons I like this syntax as an alternative to Hungarian notation:

  * **It's verbose** &#8211; there can be no confusion as to what data type was intended. Even if one developer uses `int` and another uses `Number`, it's still clear what the intended data type is.
  * **It's a syntax hook** &#8211; this technique makes it very obvious as to the type of data a variable will contain. This gives editors, documentation tools, etc., a standard syntax hook to grasp onto. Editors can use this for help with autocomplete, for example.
  * **Better readability** &#8211; scanning the code, it's much easier to tell what's going on . The code &#8220;reads&#8221; clearer, such as, &#8220;define name as a string.&#8221;
  * **Easily removed** &#8211; since this technique involves using comments, code crunchers or minifiers won't be affected. These comments will be stripped out just like all the others. No change to your build process is necessary.

The bottom line is that I consider these data type comments to be a better way of writing self-documenting JavaScript code. I've tried training myself towards using data type comments and away from Hungarian notation, and it's now become just as comfortable for me. I highly recommend sticking to the known JavaScript data types and those that will be in ECMAScript 4: `Array`, `Boolean`, `byte`, `char`, `Date`, `decimal`, `double`, `Error`, `float`, `Function`, `int`, `long`, `Number`, `Object`, `RegExp`, `sbyte`, `short`, `String`, `uint`, `ulong`, `ushort`, and `Void`. `Void` should be used for any functions that don't return a value; `Object` should be used for any variable or argument that can be any type (use similar to its use Java or C#). By sticking to these, you can guarantee forward compatibility with ECMAScript 4, minimizing any code changes in the future (should anyone besides Firefox decide to implement it, of course).

I'm sure this post won't go over well with many JavaScript developers, but I just ask that you have an open mind and give this a shot.
