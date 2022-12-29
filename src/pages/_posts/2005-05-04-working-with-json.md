---
title: Working With JSON
author: Nicholas C. Zakas
permalink: /blog/2005/05/04/working-with-json/
categories:
  - Web Development
tags:
  - eval
  - JavaScript
  - JSON
  - Objects
---
I&#8217;ve a big fan of <acronym title="JavaScript Object Notation">JSON</acronym> as an alternative to <acronym title="eXtensible Markup Language">XML</acronym> when doing client-server communication with JavaScript. For those unfamiliar with <acronym title="JavaScript Object Notation">JSON</acronym>, it&#8217;s essentially a way of representing data using JavaScript object and array literals (<a title="Introducing JSON" rel="external" href="http://www.json.org">full description</a>) first proposed by <a title="Douglas Crockford's Wrrrld Wide Web" rel="external" href="http://www.crockford.com">Douglas Crockford</a>. Now, it&#8217;s starting to gain some popularity.

The basic idea is that you can define data in <acronym title="JavaScript Object Notation">JSON</acronym> and just pass it into the `eval()` function in JavaScript to create the objects and arrays that are described in it. For example, a <acronym title="JavaScript Object Notation">JSON</acronym> array of colors is defined as:

<pre>["red", "blue", "black"]</pre>

You can then pass this directly into `eval()` to create the array:

<pre>var aColors = eval("["red", "blue", "black"]")</pre>

You can also represent objects in object literal notation:

<pre>{ name: "Nicholas C. Zakas", homepage: "{{site.url}}/"}</pre>

What I just discovered is that you can&#8217;t pass this directly into `eval()` like this:

<pre>var oPerson = eval("{ name: "Nicholas C. Zakas", homepage: "{{site.url}}/"}")</pre>

Try this yourself, you&#8217;ll get an error in any browser. The problem is that the `eval()` function is treating the curly braces as indicative of a code block instead of an object literal. At first, this really annoyed me, but I discovered that it&#8217;s actually pretty logical. The object literal notation takes affect only when the interpreter sees an *assignment*, otherwise it considers the curly braces to be a code block. The solution is to include the assignment in the text itself to force the interpreter to realize that it&#8217;s an object literal:

<pre>eval("var oPerson = { name: "Nicholas C. Zakas", homepage: "{{site.url}}/"}")</pre>

This works perfectly well in all browsers.
