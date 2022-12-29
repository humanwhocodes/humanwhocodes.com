---
title: Closures considered harmful
author: Nicholas C. Zakas
permalink: /blog/2006/09/07/closures-considered-harmful/
categories:
  - Web Development
tags:
  - Closures
  - JavaScript
---
Before you start throwing things this way, hear me out. A few years ago, no one ever talked about closures in JavaScript. They were a footnote to JavaScript, mostly discussed by people like <a title="Douglas Crockford's Wrrrrld Wide Web" rel="external" href="http://www.crockford.com">Douglas Crockford</a> on the Web. Since <acronym title="Asynchronous JavaScript + XML">Ajax</acronym> has become the focus of everyone&#8217;s life, closures have been talked about more and more, leading to some very powerful JavaScript solutions. The problem here is maintainability.

The more closures you use in your code, the more difficult it becomes for other people to understand it, and the more memory you use (let&#8217;s not even talk about the infamous Internet Explorer memory leaks). Take a look at some <a title="Private Static Members in JavaScript" rel="external" href="http://www.litotes.demon.co.uk/js_info/private_static.html">hardcore closure examples</a> and see how long it takes for you to track down which variable is declared where and how it is used.

In my opinion, there&#8217;s only a handful of times when closures should be used. If you are using closures to hide variables or create &#8220;private&#8221; and &#8220;priveleged&#8221; methods, then you are writing unmaintainable code. The simple fact is that private variables are not a necessity in JavaScript. If you are building an <acronym title="Application Programming Interface">API</acronym>, your public methods are the ones you document; your private methods are the ones you don&#8217;t. Unlike compiled languages, anyone can go into your code at any time and figure out exactly what it&#8217;s doing, so why bother trying to hide properties and methods from other developers?

If you are writing JavaScript code for a company, you have a duty to make sure your code is maintainable and scalable long after you are gone. You do this by avoiding closures and making your objects and their relationships very clear. You may think you&#8217;re being smart using closures, but all you&#8217;re doing is making the code unnecessarily complicated and that much more difficult to understand. Closures are akin to misdirection in magic: you make people look in one direction while pulling a quarter from behind their ear. It&#8217;s cute, and sometimes brilliant, but there is no value when your main goal isn&#8217;t trickery.

So I implore all JavaScript developers working for various companies around the world, do yourself and your coworkers a favor: next time you think about using closures to alter scope or change the visibility of a property/method&#8230;don&#8217;t
