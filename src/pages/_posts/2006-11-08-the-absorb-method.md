---
title: The absorb() method
author: Nicholas C. Zakas
permalink: /blog/2006/11/08/the-absorb-method/
categories:
  - Web Development
tags:
  - JavaScript
  - Objects
---
After reviewing the comments from everyone on the <a title="The absorb() function" rel="internal" href="{{site.url}}/archive/2006/11/388">previous post</a>, I&#8217;ve come up with the next generation of the `absorb()` function: the `absorb()` method. It occurred to me that this function really was begging to be a method of `Object`. So, without further adieu:

<pre>Object.absorb = function (destination /*:Object*/, source /*:Object*/, overwrite /*:Boolean*/) /*:Object*/ {
    for (var key in source) {
        if (overwrite || typeof destination[key] == "undefined"){
            destination[key] = source[key];
        }
    }

    return destination;
}

Object.prototype.absorb = function (source /*:Object*/, overwrite /*:Boolean*/) /*:Object*/ {
    return Object.absorb(this, source, overwrite);
}</pre>

Yes, there are two versions. The first is a generic that I&#8217;ve placed as a method of `Object` in order to avoid polluting the global scope. This can be used just like the `absorb()` function I originally wrote about, such as:

<pre>Object.absorb(Array.prototype, {
    forEach: function () { ... }
});</pre>

The second method is inherited by other others (of course, not <acronym title="Document Object Model">DOM</acronym> objects in Internet Explorer), but it allows easier access to the method:

<pre>Array.prototype.absorb({
    forEach: function () { ... }
});</pre>

Also, thanks to the comment from Les, each method now returns the destination object, so calls can be chained together like this:

<pre>Array.prototype.absorb({
    forEach: function () { ... }
}).absorb({
map : function () { ... }
})</pre>

Of course, if you want to ignore the native or already existing methods, just pass in `true` as the second argument; this causes `absorb()` to overwrite any existing methods of the same name:

<pre>Array.prototype.absorb({
    forEach: function () { ... }
}, true);</pre>

And that&#8217;s about it. Thanks to everyone who contributed comments on the last post. I feel like this function has evolved into a much more useful and usable form.
