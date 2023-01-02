---
title: "What's the deal with CSS query engines?"
author: Nicholas C. Zakas
permalink: /blog/2007/02/12/what-s-the-deal-with-css-query-engines/
categories:
  - Web Development
tags:
  - CSS Query
  - DOM
  - JavaScript
---
Lately, there seems to have been an explosion of client-side <acronym title="Cascading Style Sheets">CSS</acronym> query. The current offerings are:

  * <a title="jQuery" rel="external" href="http://jquery.com">jQuery</a>
  * <a title="MochiKit" rel="external" href="http://mochikit.com/">MochiKit</a>
  * <a rel="external" href="http://www.prototypejs.org/">Prototype</a>
  * <a title="Behaviour" rel="external" href="http://bennolan.com/behaviour/">Behaviour</a>
  * <a title="DomQuery" rel="external" href="http://www.jackslocum.com/blog/2007/01/11/domquery-css-selector-basic-xpath-implementation-with-benchmarks/">DomQuery</a>
  * <a rel="external" href="http://blog.dojotoolkit.org/2007/02/04/dojoquery-a-css-query-engine-for-dojo">dojo.query</a>

The free market tends to work in such a way as to saturate itself when consumer demand is high, but I really question the value of these engines. Was there really a demand for <acronym title="Cascading Style Sheets">CSS</acronym> querying of a document? Or was this some experiment that eventually led to a series of one-ups from developers looking for a challenge?

Don't get me wrong, I think the <acronym title="Document Object Model">DOM</acronym> is a crappy, inefficient <acronym title="Application Programming Interface">API</acronym>, but since it's part of a browser's underlying code, it will undoubtedly be much faster (depending on your use case) than any interpreted JavaScript syntax parser.

<acronym title="Cascading Style Sheets">CSS</acronym> queries also seem really inefficient and not very logical when compared to XPath queries, which is my favored <acronym title="Document Object Model">DOM</acronym> querying language (actually, I wish I could write style sheets to use XPath). In all my years as a frontend developer, I can't remember a time when using a combination of `getElementById()` and `getElementsByTagName()` didn't get my job done fairly quickly. I've never had any use for queries looking for elements with a given class name, or ones that want to find all descendant nodes of a given one, or any other thing that <acronym title="Cascading Style Sheets">CSS</acronym> querying claims to offer over using the provided <acronym title="Document Object Model">DOM</acronym> methods. If I need explicit access to an element, I give it an ID, or if I need to access a series of elements, I group them under a container and give that element an ID. Am I missing something?
