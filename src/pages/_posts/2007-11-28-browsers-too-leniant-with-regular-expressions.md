---
title: Browsers too leniant with regular expressions
author: Nicholas C. Zakas
permalink: /blog/2007/11/28/browsers-too-leniant-with-regular-expressions/
categories:
  - Web Development
tags:
  - Browsers
  - JavaScript
  - Regular Expressions
  - Rhino
  - YUI Compressor
---
Just had an interesting issue pop up that I thought I&#8217;d share. We should all know by now that sometimes browsers are way too forgiving about the bad code we write. They insert HTML elements when tags aren&#8217;t closed properly and generally try to &#8220;help&#8221; developers as much as possible. This behavior also invades the JavaScript space where automatic semicolon insertion reigns supreme. Last night I discovered another one of these strange issues. Consider the following regular expression:

` `

var re = /blah[/]blah/;

Now, to most people who&#8217;ve written regular expressions before, you know that `[/]` is invalid because the forward slash is a metacharacter which must be escaped for use in a regular expression. This should cause a syntax error, however, every browser allows this an interprets it as if the code where `[/]`.

I discovered this last night when running some code through the <a title="YUI Compressor" rel="external" href="http://developer.yahoo.com/yui/compressor/">YUI Compressor</a>, which uses <a title="Rhino - JavaScript for Java" rel="external" href="http://www.mozilla.org/rhino">Rhino</a> to parse the code before outputting a compressed version. This resulted in a syntax error that stopped the compression process. After some searching, I figured out this was the problem.

In my opinion, it&#8217;s browser behavior like this that makes for crappy web development practices. The more the browsers &#8220;forgive&#8221; developer mistakes, the less important it is to write good code. If there&#8217;s no benefit to writing good code, people won&#8217;t do it.
