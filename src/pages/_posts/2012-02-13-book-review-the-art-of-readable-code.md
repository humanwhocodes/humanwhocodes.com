---
title: 'Book review: The Art of Readable Code'
author: Nicholas C. Zakas
permalink: /blog/2012/02/13/book-review-the-art-of-readable-code/
categories:
  - Book Reviews
tags:
  - Code
  - Maintainability
  - Readability
---
[<img src="/images/wp-content/uploads/2012/02/artof.jpg" alt="The Art of Readable Code Book Cover" align="right" width="318" height="417" />][1]When I first proposed my upcoming book, <cite>Maintainable JavaScript</cite>, I was offered the chance to review a book on a similar topic. <cite><a href="http://www.amazon.com/Art-Readable-Code-Dustin-Boswell/dp/0596802293?tag=nczonline-20">The Art of Readable Code</a> by Dustin Boswell and Trevor Foucher is a book after my own heart. While not strictly about JavaScript, this book delves into the little explored region of code hygiene like no other. I&#8217;m a big believer in the value of readable, maintainable code, and this book presents some great techniques for overall code readability regardless of language.</p> 

<p>
  The book starts by talking about time until understanding, and how important that is for programmer productivity.Of course, you can&#8217;t even begin to start working with code until you understand it. The authors talk about just how important this is on a large development team where you have multiple people working on the same code at different times in the project. This is something I&#8217;ve been preaching for a while in my talks, and I&#8217;m glad that </cite><cite>The Art of Readable Code follows the same reasoning.</p> 
  
  <p>
    The first few chapters go into specifics of naming and how naming can really help in the understanding of code. Little tidbits about how naming affects our understanding are included, as well as some of the questions around naming such as how long the name should be. The difference between a naming variables, functions, and Constance is discussed, along with some great examples of how to naming should meet developer expectations. For example, a method beginning with the word &#8220;get&#8221; this often assumed to be a fast getter method that doesn&#8217;t do much processing. However, if such a method ends up doing expensive processing and taking a long time, this gets confusing for developers. I had never thought about method naming in this way, but it makes a lot of sense.
  </p>
  
  <p>
    The next few chapters focus on comments and when to use them. This is another topic that&#8217;s very close to my heart, as I generally feel like people don&#8217;t use comments enough. These chapters have some great examples of both bad and good comments. If we all just commented a little more, dealing with the world&#8217;s code would be much easier.
  </p>
  
  <p>
    Other topics in the book include how to properly structure flow control statements for best understanding, how to properly break down large chunks of code, and how to re-factor for better readability. Most of the topics are accompanied by small comics that help to get the point across and give some welcome levity to the discussion.
  </p>
  
  <p>
    If you care about writing maintainable code, whether it be in JavaScript or any other language, this book is a great read. Those who never stopped to consider how their coding style affects the maintainability of their code should definitely pick up this book to get a nice overview of the issues. Every reader will appreciate how the authors continually say that there is no one right way to do anything, it&#8217;s all based on the context of your code and your team. I found myself disagreeing with some of the approaches in the book, but with a complete understanding of why the authors would choose that particular approach. But that&#8217;s okay, as it shows an important concept in maintainable code: it&#8217;s much more important for everyone to be doing things one way than it is for everyone to be doing things your way.</cite>
  </p>

 [1]: http://www.amazon.com/Art-Readable-Code-Dustin-Boswell/dp/0596802293?tag=nczonline-20
