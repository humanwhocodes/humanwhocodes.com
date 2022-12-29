---
title: More On IE Memory Leaks
author: Nicholas C. Zakas
permalink: /blog/2005/02/10/more-on-ie-memory-leaks/
categories:
  - Web Development
tags:
  - Internet Explorer
  - Memory Leaks
---
I&#8217;ve been doing a little more homework on the memory problems in <acronym title="Internet Explorer">IE</acronym>. I found a nice summation of the problem at <a title="JavaScript Closures - The IE Memory Leak Problem" rel="external" href="http://jibbering.com/faq/faq_notes/closures.html#clMem">Jibbering</a>. It appears that the problem is through the use of closures that form circular references, meaning that one object is assigned a function that references that same object. This is especially problematic when using <acronym title="Document Object Model">DOM</acronym> nodes and ActiveX objects.

The problem is that the garbage collector doesn&#8217;t destroy objects unless all references to them are invalidated. The <acronym title="Internet Explorer">IE</acronym> garbage collector (and apparently Safari&#8217;s as well) considers a circular reference as a full-fledged reference to an object and doesn&#8217;t destroy the object, leading to high memory usage. Reloading/refreshing the page just compounds the problem.

I did find one other <a title="What are closures?" rel="external" href="http://weblogs.asp.net/ericlippert/archive/2003/09/17/53028.aspx">point of view</a>, that said this was not actually a memory leak. His words:

> &#8230;the browser does NOT tear down circular references in page elements until the page is navigated away. **Refreshing** the page does not count as navigating away! This means that if you have a page that refreshes itself and has a closure bound to an event, you almost certainly are leaking memory every time the page refreshes itself. That memory is not a &#8220;real&#8221; leak in that it will go away eventually, but not until the browser is navigated.

The hunt for the truth continues&#8230;
