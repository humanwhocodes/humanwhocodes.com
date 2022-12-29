---
title: Interesting JavaScript string capability
author: Nicholas C. Zakas
permalink: /blog/2006/12/26/interesting-javascript-string-capability/
categories:
  - Web Development
tags:
  - JavaScript
  - Strings
---
Reading through <a title="Standard ECMA-262" rel="external" href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">ECMA-262</a> and taking a look at <a title="Rhino: JavaScript for Java" rel="external" href="http://www.mozilla.org/rhino/">Rhino</a>&#8216;s source code, I came across something interesting. Apparently, it is possible to have a JavaScript string begin on one line of code and end on another line of code. For example:

<pre class="code">var s /*:String*/ = "Test \
multi \
line.";
alert(s);</pre>

This is perfectly valid; the interpreter just ignores the slash and the line break. The output from this code snippet is &#8220;Test multi line.&#8221; Just goes to show, you can write books on a topic and still not know everything about it.
