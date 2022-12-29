---
title: 'Book review: The Tangled Web'
author: Nicholas C. Zakas
permalink: /blog/2012/01/17/book-review-the-tangled-web/
categories:
  - Book Reviews
tags:
  - Book Reviews
  - Security
---
[<img src="/images/wp-content/uploads/2012/01/tangledweb.png" alt="The Tangled Web" width="303" height="400" align="right" />][1]I&#8217;m not really sure what I was expecting from <cite>The Tangled Web: A Guide to Securing Modern Web Applications</cite>. Having learned more about web security in the past year, I suppose I was hoping for a more in-depth treatment of common web application security issues. In my mind, I pictured a chapter on Cross-Site Scripting attacks and mitigation steps, a chapter on Cross-Site Request Forgery and what to do about it, etc. Instead, the book tackles the security problem with an exhaustive and dry examination of all the technologies that make up the web. Though interesting technically, it&#8217;s very easy to get lost in these details and end up at the other end unsure of how the description relates to real-world security issues.

For instance, the author goes into how a URL is parsed and the differences between how different browsers parse URLs. That&#8217;s interesting information, but I&#8217;m still not sure what type of attacks I should look out due to these issues and how to address them if they do occur. The same treatments are given to HTTP itself, HTML, CSS, JavaScript, and other parts of web application stack. 

One of the most frustrating aspects of this book is how browser names are frequently thrown around without version numbers. Saying &#8220;Internet Explorer&#8221; does something leaves me wondering if that was one of the many issues fixed in Internet Explorer 9 and 10 or not. While it&#8217;s fine to leave off version numbers when discussing Chrome, Internet Explorer just has far too many differences to make this useful.

I found the code examples to be incredibly terse, and in some cases missing completely. Case in point, a discussion of the `sandbox` attribute for `<iframe>` doesn&#8217;t have a single code example showing its proper usage. Certainly property usage is part of ensuring security. Other sections of the book suffer from the same code-terseness to its detriment. A lot of the topics could stand more actual examples.

Which brings me to my overall issue with the book: it reads more like it was written by a researcher for a researcher. This really isn&#8217;t a book to help you solidify your web application security. In fact, I&#8217;m not sure I picked up any new techniques from reading the book at all. My head is now filled with trivia knowledge about web browsers that I&#8217;m unable to practically apply to my work, which is frustrating. The only attempt the author makes at giving actionable advice is on the &#8220;checklist&#8221; at the end of each chapter. The checklist contains way-too-terse descriptions of how to mitigate certain attacks&#8230;but without practical code examples, the bullet points are quite lost.

This book seems mostly targeted at amateur security professional who need a good brain dump on all the various flaws in internet protocols and technologies in order to get their feet wet. It&#8217;s definitely not for web developers looking to improve their web application security, making the subtitle, &#8220;A Guide to Securing Modern Web Applications&#8221;, a complete misnomer. If anything, it&#8217;s a guide through current web technologies showing you that the internet is a mess and leaving you to wonder how to fix it.

I really, really wanted to like this book, but unfortunately, I just didn&#8217;t find it practical enough to recommend it as guide for most web developers. If you don&#8217;t understand security issues at all, then this is probably a good book to pick up, but otherwise, you&#8217;ll need to go elsewhere to find practical advice.

 [1]: http://www.amazon.com/gp/product/1593273886/ref=s9_simh_gw_p14_d0_g14_i1?tag=nczonline-20
