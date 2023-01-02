---
title: "Book review: Learning jQuery 1.3"
author: Nicholas C. Zakas
permalink: /blog/2009/05/31/book-review-learning-jquery-13/
categories:
  - Book Reviews
tags:
  - Book Reviews
  - jQuery
---
[<img src="/images/wp-content/uploads/2009/05/learningjquery-243x300.jpg" alt="Learning jQuery 1.3" width="243" height="300" align="right" />][1]Apparently I didn't scare away the good folks at [Packt Publishing][2] with my last couple of book reviews, so they asked me to take a look at a couple more. Both of the books are on jQuery and the first that I picked up was <cite><a href="http://www.packtpub.com/learning-jquery-1.3/book">Learning jQuery 1.3</a></cite> (on [Amazon][1]). Once again, I considered myself to be a good reviewer for this type of book because I don't have a lot of jQuery experience. After thumbing through the book, though, it was clear that this book is more intended for those who are new to JavaScript and to jQuery rather than those experienced with JavaScript and looking to learn jQuery. As such, I found the pace of the book to be, for me, pretty slow even though I can imagine it being just the right pace for the target audience.

The book is generally well-structured, with chapter topics that logically follow one another and decent narrative explanations of why jQuery is better than using the normal browser interfaces for achieving various goals. Though the text is focused on jQuery, beginners should also pick up a decent understanding of JavaScript concepts as they related to the library. For instance, I found the brief section explaining event bubbling and capturing to be a particularly good, concise, practical explanation that would be easy to digest even for beginners.

My only real complaint about the book is that some of the technical details are not quite accurate. For example, Chapter 4 makes extensive use of `parseFloat()`, but the author incorrectly indicates that you should use 10 as the second argument to ensure the value is parsed as base-10. The `parseFloat()` function doesn't actually have a second argument, so it leaves me wondering if he meant to use `parseInt()` or was just confused about proper use of `parseFloat()`. Also, the description of Ajax in chapter 6 was a little too simplistic for my tastes, introducing XML as a necessary component and XMLHttpRequest as the necessary transport mechanism. The lines between JSON and object/array literals were a bit to blurry as well.

After the first few chapters, the book focuses on creating cool and useful effects on HTML pages. This, of course, is the area in which jQuery excels. All of the most common effects are included: form validation, animation, autocomplete, and Ajax interactions. This is, I believe, exactly what the target audience for this book would be interested in: quick solutions to create compelling user interactions for simple web sites or prototypes.

Overall, I think <cite><a href="http://www.amazon.com/gp/product/1847196705?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1847196705">Learning jQuery 1.3</a></cite> would be an excellent introduction to those with little to no JavaScript knowledge. I can see it being particularly useful for web designers looking to add basic effects to their pages. These readers will also likely pick up some decent core JavaScript knowledge along the way. More experienced developers will likely find the pace to be slow and won't find solutions to more advanced problems.

 [1]: http://www.amazon.com/gp/product/1847196705?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1847196705
 [2]: http://www.packtpub.com
