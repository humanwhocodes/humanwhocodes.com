---
title: "IE8 passes Acid2: What does it mean?"
author: Nicholas C. Zakas
permalink: /blog/2007/12/23/ie8-passes-acid-test-what-does-it-mean/
categories:
  - Web Development
tags:
  - Acid2
  - Internet Explorer
---
So this past week we learned that <a title="Internet Explorer 8 and Acid2: A Milestone" rel="external" href="http://blogs.msdn.com/ie/archive/2007/12/19/internet-explorer-8-and-acid2-a-milestone.aspx">IE8 passes the Acid2 test</a>. But what exactly does this mean? For the uninitiated, the <a title="Acid2 Test" rel="external" href="http://www.webstandards.org/files/acid2/test.html">Acid2 test</a> was developed by the <a rel="external" href="http://www.webstandards.org/">Web Standards Project</a> to test browser support for specific CSS features. If a browser passes the test, it means that these CSS features are supported:

  * <a title="CSS 2.1 - Border Colors" rel="external" href="http://www.w3.org/TR/CSS21/box.html#border-color-properties">Transparent borders</a>
  * <a title="CSS 2.1 - Minimum and Maximum Widths" rel="external" href="http://www.w3.org/TR/CSS21/visudet.html#min-max-widths">Minimum and maximum widths</a>
  * <a title="CSS 2.1 - Adjacent Sibling Selectors" rel="external" href="http://www.w3.org/TR/CSS21/selector.html#adjacent-selectors">Adjacent sibling selectors</a>
  * <a title="CSS 2.1 - Matching Attributes and Attribute Values" rel="external" href="http://www.w3.org/TR/CSS21/selector.html#matching-attrs">Matching attribute selectors</a>
  * <a title="CSS 2.1 - Class Selectors" rel="external" href="http://www.w3.org/TR/CSS21/selector.html#class-html">Class subset selectors</a>
  * <a title="CSS 2.1 - Child Selectors" rel="external" href="http://www.w3.org/TR/CSS21/selector.html#child-selectors">Child selectors</a>
  * <a title="CSS 2.1 - The :before and :after pseudo-elements" rel="external" href="http://www.w3.org/TR/CSS21/selector.html#before-and-after">:before and :after pseudo-elements</a>
  * <a title="CSS 2.1 - The content property" rel="external" href="http://www.w3.org/TR/CSS21/generate.html#content">The <code>content</code> property</a>
  * <a title="CSS 2.1 - The CSS Table Model" rel="external" href="http://www.w3.org/TR/CSS21/tables.html#table-display">The CSS table model</a>

In addition to testing these specific features, the Acid2 test also intentionally includes syntax errors designed to point out parser errors in browsers. The rules with syntax errors should be ignored, and if they aren't, the test won't display correctly. With IE8 passing the Acid2 test, it means that not only have the previously mentioned features been implemented correctly, but also that the bugs in IE's CSS parser have been fixed. This is huge news.

It's worth noting that IE8 passes in the Acid2 test in standards mode, meaning that all of the web sites in the world that run in quirks mode will be unaffected.
