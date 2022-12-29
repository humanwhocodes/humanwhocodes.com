---
title: 'Book Review: Pro JavaScript Design Patterns'
author: Nicholas C. Zakas
permalink: /blog/2008/02/24/book-review-pro-javascript-design-patterns/
categories:
  - Web Development
tags:
  - Books
  - Design Patterns
  - Dustin Diaz
  - JavaScript
  - Review
  - Ross Harmes
---
Fellow Yahoo <a title="Ross Harmes" rel="external" href="http://www.rossharmes.net">Ross Harmes</a> and former Yahoo <a title="With Imagination" rel="external" href="http://www.dustindiaz.com">Dustin Diaz</a> recently released their first book, <a title="Pro JavaScript Design Patterns" rel="external" href="http://www.amazon.com/gp/redirect.html?ie=UTF8&location=http%3A%2F%2Fwww.amazon.com%2FJavaScript-Design-Patterns-Ross-Harmes%2Fdp%2F159059908X%2F&tag=nczonline-20&linkCode=ur2&camp=1789&creative=9325">Pro JavaScript Design Patterns</a>. Since they were kind enough to drop a copy by my cube, complete with autographs, I feel like I need to at least mention the book here. So I figured I might as well give an honest-to-goodness review with no punches pulled.

The focus of the book is on implementing design patterns in JavaScript. In the professionalization of JavaScript, design patterns is a topic that has only recently been discussed, which makes this book timely. Ross and Dustin discuss most of the traditional design patterns including facade, command, decorator, adapter, observer, and many more.

The book is full of code samples that borrow heavily from <a title="Yahoo! User Interface Library" rel="exernal" href="http://developer.yahoo.com/yui/">YUI</a> both in concept and source code, though I wish the attribution was a little more transparent in some places. Still, it shows just how design-pattern centric YUI and other libraries are, which is an important point to make.

One of the things I didn&#8217;t like about the book was the attempt to force the interface pattern into JavaScript. JavaScript is, by its nature, interface-less. The approach taken is unique though I feel like it&#8217;s a bit forced to make the point. Interfaces in JavaScript can never be strictly enforced and I don&#8217;t see much benefit to making the attempt. Capability detection, checking to see if a function exists before using it, is about as close to the interface pattern as JavaScript gets and probably about as close as it needs to be.

This book also suffers from a common problem among design pattern books: sometimes two patterns are so similar that it&#8217;s hard to determine when to use one over the other. Is it a facade or an adapter? The line is incredibly thin between the two. I would have liked to have seen a final summation chapter that listed each pattern including indications, contraindications, and related patterns. Ross and Dustin do make some attempts at comparing certain patterns in the book, I just would have liked to see such comparisons called out more strongly.

Don&#8217;t get me wrong, I think <cite>Pro JavaScript Design Patterns</cite> makes a good addition to your JavaScript book library. It presumes that you already have some JavaScript knowledge, so it&#8217;s not really a book for absolute beginners. You&#8217;d be well-served to pick up a book on the basics first (I can suggest <a title="Professional JavaScript" rel="external" href="http://www.amazon.com/exec/obidos/redirect?link_code=ur2&tag=nczonline-20&camp=1789&creative=9325&path=http%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F0764579088%2F">a good one</a>&#8230;hehe) and then move onto this one. I like <cite>Pro JavaScript Design Patterns</cite> because it picks up where most JavaScript books leave off. This is your first step in moving from coding JavaScript solutions to designing them. Moving forward, being able to architect a front end solution is something that will be in more demand, and this book will help you think about making your code extensible, reusable, and maintainable.
