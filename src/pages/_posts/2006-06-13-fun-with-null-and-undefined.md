---
title: Fun With Null And Undefined
author: Nicholas C. Zakas
permalink: /blog/2006/06/13/fun-with-null-and-undefined/
categories:
  - Web Development
tags:
  - JavaScript
  - JavaScriptLint
  - 'null'
  - undefined
---
I&#8217;ve been using the great <a title="JavaScriptLint" rel="external" href="http://www.javascriptlint.com">JavaScriptLint</a> tool recently to go over my code. One of the errors that it typically flags is comparison with null, 0, or an empty string, which it says should not be done with == or != because of type coercion. So I dutifully went along and changed all `!=null` to `!==null`. The problem is that these don&#8217;t do the exact same thing.

Consider if you&#8217;re checking for the existence of a property on an object, such as:

<pre>if (o.prop != null){
    //do something with o.prop
}</pre>

The value of `o.prop` is actually the special value `undefined` (not `null`). However, since `null == undefined` returns true, this code will work as intended. The problem is that `null === undefined` is false, so if you change the code to use the `!==` instead, it won&#8217;t work as intended:

<pre>if (o.prop !== null){
    //do something with o.prop
}</pre>

Now this code won&#8217;t convert the value of `undefined` and so it&#8217;s not equal to `null`. You could change this to explicitly check for the right value:

<pre>if (o.prop !== undefined){
    //do something with o.prop
}</pre>

This works fine, unless your users may be using an older browser that doesn&#8217;t support ECMAScript 3 (which formally defined the `undefined` special value). The safest way to make the code have the intended effect is to use the `typeof` operator:

<pre>if (typeof o.prop != "undefined"){
    //do something with o.prop
}</pre>

Now, JavaScriptLint is happy, the code makes senese, and it&#8217;s backwards compatible. Phew.
