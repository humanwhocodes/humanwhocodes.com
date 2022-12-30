---
title: Ajax Using a Style Sheet?
author: Nicholas C. Zakas
permalink: /blog/2005/09/30/ajax-using-a-style-sheet/
categories:
  - Web Development
tags:
  - Ajax
  - DOM
  - JavaScript
  - Style Sheet
---
Reading through <a title="ForgetFoo" rel="external" href="http://www.forgetfoo.com">Foo</a>&#8216;s postings, I came across this article entitled,<a title="AJAX using a stylesheet" rel="external" href="http://zingzoom.com/ajax/ajax_with_stylesheet.php">AJAX using a stylesheet</a>. The basic idea is that instead of using XMLHttp, hidden frames, or other such techniques, the author creates a dynamic style sheet that outputs information into the `background-image` property of a hidden `<div/>`. This information is then extracted using JavaScript and used for its intended purpose. Okay, so it's possible, but the question I have is this: why?

You could just as easily change an included JavaScript file using the <acronym title="Document Object Model">DOM</acronym>. This would allow you to return more than just simple strings, you could return any type of JavaScript object or value. This is a case where I admire the author's creativity, but I think the solution is better as a proof-of-concept than a practical implementation.
