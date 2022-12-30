---
title: 'Book review: Eloquent JavaScript'
author: Nicholas C. Zakas
permalink: /blog/2011/06/19/book-review-eloquent-javascript/
categories:
  - Book Reviews
tags:
  - Book Reviews
  - JavaScript
---
[<img src="/images/wp-content/uploads/2011/06/eloquentjs.png" alt="Eloquent JavaScript Book Cover" width="300" height="403" align="right" />][1]I'd heard a lot about <cite><a href="http://www.amazon.com/gp/product/1593272820?tag=nczonline-20">Eloquent JavaScript</a></cite> by Marijn Haverbeke over the past few months, and so I was greatly interested when asked if I would do a book review. The first thing that struck me about the book was completely visual: the book doesn't look scary or overwhelming at all. Indeed, everything about the design says &#8220;eloquent&#8221;: the calming yellow, the simple bird, the length (less than 200 pages). Everything has been beautifully designed to get people over the hump of thinking the topic is unapproachable (I'll be the first to admit that some of my books look quite daunting on the shelf).

This a good approach because <cite>Eloquent JavaScript</cite> is written for a unique crowd: people who don't know JavaScript and also don't know programming. The first thing you need such readers to understand is that this isn't a scary topic, and in this the book succeeds beautifully.

One of the keys to a good technical book is understanding the audience. Generally speaking, <cite>Eloquent JavaScript</cite> does a good job of addressing the specific audience it's intended for. Descriptions are simple, effective,  and use plain language, though I'll admit the constant use of words like &#8220;things&#8221; and &#8220;stuff&#8221; make me cringe a bit. The discussions of concepts are generally correct though sometimes a bit more context would be helpful.

There are some subtle and not-so-subtle things that I would change about the book. First, the order of topics is sometimes confusing, especially given the intended audience. For example, I consider closures to be an advanced topic, but it's discussed in the book before the `arguments` object, the `Math` object, and recursion. Yes, closures are important in JavaScript, but introducing the topic before the reader has enough foundation to appreciate the complexity is setting them up for failure. This isn't to say the descriptions are wrong, just that I think the order is wrong.

The big thing I would change about this book are the examples. Coming up with relevant examples in technical books is extremely difficult, and something I struggle with all the time. The problem I have with the examples in `Eloquent JavaScript` is that they are so far away from what the beginner will be doing: tracking dead cats, creating a terrarium simulation, parsing a Windows INI file, etc. I prefer to teach people with examples that are at least in the vicinity of what they'll actually be doing. The first real mention of web programming doesn't even enter the conversation until Chapter 9.

To be fair, chapters 9-12 do a good job of discussing web programming and introducing some of the topics the reader would need to make use of their new-found knowledge. These chapters I enjoyed quite a bit and was disappointed that they were so short. The information was enough to get you started, but I felt like the author had more to say and just didn't have enough space to say it.

Overall, I think Eloquent JavaScript is a good book, suitable for those without experience in JavaScript and even those without programming experience. I wouldn't take this book on it's own, though, as I think it works best as a supplementary book to something like Jeremy Keith's iconic [DOM Scripting][2]. If you already know JavaScript, there isn't much new in this book for you.

&nbsp;

 [1]: http://www.amazon.com/gp/product/1593272820?tag=nczonline-20
 [2]: http://www.amazon.com/DOM-Scripting-Design-JavaScript-Document/dp/1430233893/?tag=nczonline-20
