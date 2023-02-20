---
title: The Death of IE CSS Hacks
author: Nicholas C. Zakas
permalink: /blog/2005/10/17/the-death-of-ie-css-hacks/
categories:
  - Web Development
tags:
  - CSS
  - Hacks
  - Internet Explorer
---
I've always believed that you should never write production code that is based on an incorrect implementation of something. Yet, tons of developers rushed to use Internet Explorer-specific <acronym title="Cascading Style Sheets">CSS</acronym> hacks to make their pages look consistent across multiple browsers. For a complete list of <acronym title="Cascading Style Sheets">CSS</acronym> hacks, check out <a title="CSS Filters - CSS Only Hacks" rel="external" href="http://www.dithered.com/css_filters/css_only/index.php">CSS Filters &#8211; CSS Only Hacks</a>.

Now comes the news everyone feared: IE7 <a title="Call to action: The demise of CSS hacks and broken pages" rel="external" href="http://blogs.msdn.com/ie/archive/2005/10/12/480242.aspx">parses <acronym title="Cascading Style Sheets">CSS</acronym> correctly</a>, which means an end to the hacks that some developers have come to depend on. This means that many, many sites out there will begin to break in IE7.

This is the time when all the standards-supporters say &#8220;ha!&#8221; They then proceed to point and laugh and say, &#8220;I told you so.&#8221; And for once, they are right. Relying on hacks for production code is never a good idea. Maybe this will force developers to clean up their act.
