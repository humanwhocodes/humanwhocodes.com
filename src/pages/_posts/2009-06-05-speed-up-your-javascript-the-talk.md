---
title: "Speed up your JavaScript: The talk"
author: Nicholas C. Zakas
permalink: /blog/2009/06/05/speed-up-your-javascript-the-talk/
categories:
  - Professional
tags:
  - JavaScript
  - Performance
  - Speaking
---
[Steve Souders][1] recently invited me to participate in his [Web E<sup>x</sup>ponents][2] speaker series at Google. Periodically, people come in to give hour-long tech talks about various topics. Since I had most recently worked with Steve on his new book, <cite><a href="http://www.amazon.com/gp/product/0596522304?ie=UTF8&tag=nczonline-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0596522304">Even Faster Web Sites</a></cite>. I wrote a chapter on JavaScript performance, and Steve asked if I would come and share some tips along those lines to the folks at Google. In following along my [series][3] [of][4] [blog][5] [posts][6] about JavaScript performance, I entitled this talk, <cite>Speed up your JavaScript</cite>.

The talk today went very well (aside from some humorous technical glitches). Attendance was good and there were a lot of good, insightful questions both during the presentation and afterwards. My [slides][7] are available now and there will be a video coming out possibly next week. Topics include how to optimize:

  * Scope management
  * Data access
  * Loops
  * DOM

After the talk, I went to lunch with Steve and Doug Crockford (who attended the talk as well) for a little more discussion about the state of web technology. Overall, a very fun experience.

One of the biggest points I want to make about this talk, both for those who were there and those who were not, is that I'm not saying to do things all the time. The techniques presented in the talk are intended as a guide for those who have noticed performance bottlenecks and need to know how to fix them. Optimization without measurement is fruitless, and I'd be doing everyone a great disservice by presenting these techniques as &#8220;must follow&#8221; under any and all circumstances. Always measure the performance of your code using a profiler (shameless plug: [YUI Profiler][8] is pretty sweet) and then determine what you should do to speed things up.

Doug pointed out to me afterwards that he thought a lot of the early topics in the talk generally don't provide a big performance gain. I think his statement has some validity, as everything is related to the code base in which you're developing. When I worked on [My Yahoo!][9], we had a lot of trouble with loop performance and did a lot of optimizations for it. Others might not have bottlenecks around their loops. All of the information in my talk is based on performance issues I've faced in my career, and though some may be obscure, I believe it's important to talk about those issues so they can be a guide for others who find bottlenecks in these areas. The worst thing we can do is avoid coming up with solutions for rare problems, because rare problems need solving too.

After the talk, we ran into Mark Miller, the research scientist at Google behind [Caja][10]. He hadn't seen the talk but word of its topics apparently traveled quickly to him. He mentioned that it seemed like my talk was geared at programming in poorly-performing browsers. That's entirely true, my talk is geared towards those poor souls (along with myself) who are stuck developing for Internet Explorer, Firefox, Safari, and Opera. Those with the luxury of only developing for Chrome or any other browser using a JIT JavaScript compiler don't need to worry about performance issues (so far). Mark seemed to be concerned about my recommendation to avoid using the native `forEach()` method (as defined in [ECMA-262, 5th Edition][11]). In my talk, I stated that this implementation is much slower than using a regular JavaScript loop, which is true (it's very much slower). This is true in Firefox and Chrome, both of which have implemented the method natively. Mark asserted that ECMAScript 5 won't be implemented in anything but the most performant JavaScript engines, which would use inlining to improve performance. Though good to hear, it made me realize that I should have explained more completely the purpose of this talk: to help developers who are dealing with crappy browser performance right now.

The experiments I ran for the talk (and mentioned in the video) are here:

  * [Identifier depth test][12]
  * [Data access test][13]
  * [Loop test][14] (via [Greg Reimer][15])

You may not use everything in this talk, and that's fine. I do hope you'll keep this information in the back of your mind and return to it should you notice performance issues in your JavaScript. I've been in situations where milliseconds were being counted under close scrutiny, and I hope that this information will help developers who are in a similiar situation.

 [1]: http://www.stevesouders.com
 [2]: http://google-code-updates.blogspot.com/2009/05/web-e-x-ponents.html
 [3]: {{site.url}}/blog/2009/01/13/speed-up-your-javascript-part-1/
 [4]: {{site.url}}/blog/2009/01/20/speed-up-your-javascript-part-2/
 [5]: {{site.url}}/blog/2009/01/27/speed-up-your-javascript-part-3/
 [6]: {{site.url}}/blog/2009/02/03/speed-up-your-javascript-part-4/
 [7]: http://www.slideshare.net/nzakas/speed-up-your-javascript
 [8]: http://developer.yahoo.com/yui/profiler/
 [9]: http://my.yahoo.com/
 [10]: http://code.google.com/p/google-caja/
 [11]: http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
 [12]: {{site.url}}/experiments/javascript/performance/identifier-depth/
 [13]: {{site.url}}/experiments/javascript/performance/data-access/
 [14]: http://blogs.sun.com/greimer/resource/loop-test.html
 [15]: http://blogs.sun.com/greimer/
