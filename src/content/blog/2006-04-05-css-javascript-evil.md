---
title: CSS + JavaScript = Evil
author: Nicholas C. Zakas
permalink: /blog/2006/04/05/css-javascript-evil/
categories:
  - Web Development
tags:
  - CSS
  - CSS Expressions
  - JavaScript
---
I've never been a big fan of using the Internet Explorer <acronym title="Cascading Style Sheet">CSS</acronym> expressions, under the belief that you can use regular JavaScript to do the same thing whenever you want. However, recently I fell victim to the belief expressions may be useful and decided to give it a try. Then proceeded to spend three days tracking down a JavaScript bug that was related directly to the expression I forgot I used. Here's what happened.

I had two elements on the page, and the expression used these two elements to create a measurement of width for a third. I removed one of the two elements without remembering I had used it in an expression. When I loaded up the page in <acronym title="Internet Explorer">IE</acronym>, I got a JavaScript error, one of the very useful, &#8220;&#8216;variableName' is undefined.&#8221; It gave line 1 and character 1 as the offending code. Naturally, I went into all the JavaScript files and looked&#8230;no mention of that variable. Stepped into the debugger at the time the error occurred, the debugger said there was no source available for this location. Lot of help that was. I systematically went through adding and removing elements on the page before I finally called over another set of eyes. Yep, it was the expression that I forgot I had used making a reference to the element I had removed.

So, if you ever run into a problem where you get a JavaScript error that you can't step into a debugger to see and the offending code is said to be on line 1 and character 1 in <acronym title="Internet Explorer">IE</acronym>, check your <acronym title="Cascading Style Sheet">CSS</acronym> for expressions. It could save you a lot of time and effort.
