---
title: Announcing High Performance JavaScript
author: Nicholas C. Zakas
permalink: /blog/2010/02/09/announcing-high-performance-javascript/
categories:
  - Web Development
tags:
  - Books
  - JavaScript
  - Performance
  - Writing
---
[<img style="padding:10px" src="http://i764.photobucket.com/albums/xx289/nzakas/nczonline/hpjs_big.png" alt="High Performance JavaScript Book Cover" width="180" height="236" align="right" />][1]Last year was one in which I did a lot of research on performance, resulting in the Speed Up Your JavaScript blog post series ([part 1][2], [part 2][3], [part 3][4], [part 4][5]) as well as several talks, namely [JavaScript Variable Performance][6] at the San Francisco JavaScript Meetup, [Speed Up Your JavaScript][7] at Google ([video][8]), and [Writing Efficient JavaScript][9] at Velocity. I was then asked my [Steve Souders][10] to contribute a chapter on JavaScript performance to his book, [Even Faster Web Sites][11]. While writing that chapter, I felt like I had far too little space to explore so wide of a topic.

Not long after that, I was approached by Havi Hoffman of the [Yahoo! Developer Network][12] to see if I would be interested in writing a book on JavaScript performance to be published by [Yahoo! Press][13]. You may be familiar with the first Yahoo! Press book, [JavaScript: The Good Parts][14] by Douglas Crockford, but there's also [Hadoop: The Definitive Guide][15] (Tom White) and [Designing Social Interfaces][16] (Christian Crumlish & Erin Malone). Each features invaluable knowledge from some of Yahoo!'s best and brightest. I have to admit that it was a dream of mine to write for Yahoo! since I first joined the company, and this was the perfect opportunity.

In March, [High Performance JavaScript][1] will officially hit the shelves (it's available for pre-order now on Amazon). My vision for this book was to expand upon the chapter I wrote in [Even Faster Web Sites][11] and wanted very much to keep the overall statistics-driven approach that Steve had employed. But in order to make this book the absolute best that it could be, I also borrowed Steve's idea and sought out some of the smartest engineers I know to contribute to the book. So this book features chapters written by the following:

  * [Ross Harmes][17], co-author of [Pro JavaScript Design Patterns][18] and front-end engineer for [Flickr][19]. Ross writes about Ajax performance with an eye on squeezing out the fastest client-server messaging possible.
  * [Julien Lecomte][20], creator of the YUI Compressor and front-end engineer on [Yahoo! Search][21]. Julien describes effectively deploying your JavaScript with performance in mind.
  * [Steven Levithan][22], co-author of the [Regular Expression Cookbook][23] and guru on all things related to strings and regular expressions. Steven explains the ins and outs of string and regular expression performance in JavaScript in a way that I believe has never been done before. He's also running a [contest][24] to win a free copy of the book.
  * Matt Sweeney, [YUI 3][25] architect. Matt focuses on currently available tools for measuring JavaScript performance.
  * [Stoyan Stefanov][26], author of [Object-Oriented JavaScript][27] and front-end engineer on [Yahoo! Search][21]. Stoyan investigates the performance of the DOM and how reflows and repaints affect JavaScript's perceived performance. This chapter, to me, will be the definitive print resource for reflow information.

Of course, there's also five chapters written by me, making this a ten-chapter intensive look at JavaScript performance in the browser. I tried to make sure we covered all angles of the JavaScript lifecycle, from getting the code onto the page, executing the code, and deploying into production. I'm very, very excited about this book and the positive impact it can have on JavaScript developers. Don't be fooled by faster JavaScript engines, JavaScript performance is going to continue to be important to understand for years to come. I hope you enjoy the book!

 [1]: http://www.amazon.com/gp/product/059680279X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=059680279X
 [2]: https://humanwhocodes.com/blog/2009/01/13/speed-up-your-javascript-part-1/
 [3]: https://humanwhocodes.com/blog/2009/01/20/speed-up-your-javascript-part-2/
 [4]: https://humanwhocodes.com/blog/2009/01/27/speed-up-your-javascript-part-3/
 [5]: https://humanwhocodes.com/blog/2009/02/03/speed-up-your-javascript-part-4/
 [6]: http://www.slideshare.net/nzakas/java-script-variable-performance-presentation
 [7]: http://www.slideshare.net/nzakas/speed-up-your-javascript
 [8]: http://www.youtube.com/watch?v=mHtdZgou0qU
 [9]: http://www.slideshare.net/nzakas/writing-efficient-javascript
 [10]: http://www.stevesouders.com
 [11]: http://www.amazon.com/gp/product/0596522304?ie=UTF8&tag=nczonline-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0596522304
 [12]: http://developer.yahoo.com
 [13]: http://developer.yahoo.com/yahoopress/
 [14]: http://www.amazon.com/gp/product/0596517742?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596517742
 [15]: http://www.amazon.com/gp/product/0596521979?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596521979
 [16]: http://www.amazon.com/gp/product/0596154925?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596154925
 [17]: http://techfoolery.com/
 [18]: http://www.amazon.com/gp/product/159059908X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=159059908X
 [19]: http://www.flickr.com
 [20]: http://www.julienlecomte.net/
 [21]: http://search.yahoo.com
 [22]: http://blog.stevenlevithan.com/
 [23]: http://www.amazon.com/gp/product/0596520689?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596520689
 [24]: http://blog.stevenlevithan.com/archives/high-performance-javascript
 [25]: http://developer.yahoo.com/yui/3/
 [26]: http://www.phpied.com
 [27]: http://www.amazon.com/gp/product/1847194141?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1847194141
