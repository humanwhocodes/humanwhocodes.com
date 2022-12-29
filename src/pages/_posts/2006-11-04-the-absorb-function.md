---
title: The absorb() function
author: Nicholas C. Zakas
permalink: /blog/2006/11/04/the-absorb-function/
categories:
  - Web Development
tags:
  - JavaScript
  - Objects
---
From time to time I see people blogging about their most favorite or useful functions. Here&#8217;s a little function I wrote called `absorb()`. Its purpose is quite simple, to have one object &#8220;absorb&#8221; another, i.e., an object receives all of the properties and methods of another object. The difference from other similar functions is that this one allows you to specify not to overwrite existing properties/methods of the same name. Here&#8217;s the function:

<pre>function absorb(destination /*:Object*/, source /*:Object*/, dontOverwrite /*:Boolean*/) {
    for (var key in source) {
        if (!dontOverwrite || typeof destination[key] == "undefined"){
            destination[key] = source[key];
        }
    }
}</pre>

I&#8217;ve found this function useful in many cases, but the most useful is when implementing methods for native JavaScript objects that may exist only in certain browsers. Reading <a title="Sugar Arrays: Porting over JavaScript 1.6 Array methods" rel="external" href="http://www.dustindiaz.com/sugar-arrays/">this post</a> over at Dustin&#8217;s reminded me to post this. In the post, he talks about checking for the existence of the `foreEach()` method on `Array.prototype` before defining his own version. This is a perfect example of how to use `absorb()`:

<pre>absorb(Array.prototype, {
    forEach: function () { ... }
}, true);</pre>

By setting the last argument as `true`, `absorb()` won&#8217;t overwrite any existing implementation of `forEach()` (you can omit the last argument if you want it to overwrite existing methods). You can think of this function as a sort of smart extension mechanism: you can use it to copy properties/methods to an object&#8217;s `prototype` for easy subclassing or you can add properties/methods to an already instantiated object that doesn&#8217;t support inheritance (like <acronym title="Document Object Model">DOM</acronym> elements in Internet Explorer). There are plenty of uses for `absorb()`, have fun!

**Update:** After seeing the comments from JCurtis and <a title="Web Standards with Imagination" rel="external" href="http://www.dustindiaz.com/">Dustin</a>, both of whom pointed out that having a variable named `dontOverwrite` is a little confusing, I&#8217;ve changed the function from the above to this:

<pre>function absorb(destination /*:Object*/, source /*:Object*/, overwrite /*:Boolean*/) {
    for (var key in source) {
        if (overwrite || typeof destination[key] == "undefined"){
            destination[key] = source[key];
        }
    }
}</pre>

This does change the behavior so that the default is to *not* overwrite any existing properties/methods of the same name. Meaning that the previous example should now be:

<pre>absorb(Array.prototype, {
    forEach: function () { ... }
});</pre>

This is really the way it should work &#8211; you should never purposely overwrite existing methods. Thanks guys for the suggestions.
