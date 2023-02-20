---
title: Adobe open sources Flash JavaScript engine
author: Nicholas C. Zakas
permalink: /blog/2006/11/09/adobe-open-sources-flash-javascript-engine/
categories:
  - Web Development
tags:
  - Adobe
  - Flash
  - JavaScript
  - Tamarin
---
The other day, it was <a title="Adobe and Mozilla Foundation to Open Source Flash Player Scripting Engine" rel="external" href="http://www.mozilla.com/en-US/press/mozilla-2006-11-07.html">announced</a> that Adobe would be submitting the source code of Tamarin, the JavaScript engine used in Flash, to Mozilla for open sourcing. In turn, Mozilla will be using it in future editions of Firefox. Why does this matter?

The most important thing is that Tamarin is a just-in-time JavaScript compiler, not an interpreter. That means it's producing machine byte code and then executing instead of interpreting a syntax tree at runtime. Compiling down to byte code means that JavaScript code execution will be significantly accelerated in future editions of Firefox. One may call this one of the most significant enhancements to JavaScript since it was created: transforming it from an interpreted language to a compiled one.

To make sure everyone understands, this doesn't mean you'll be compiling your JavaScript before deploying it. Everything will be the same except the client will run much faster (this should also help speed up the Firefox interface since a lot of it is written in JavaScript as well). It'll be interesting to see how other browser makers respond to this.
