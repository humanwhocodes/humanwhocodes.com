---
title: Minimizing closure usage
author: Nicholas C. Zakas
permalink: /blog/2006/11/15/minimizing-closure-usage/
categories:
  - Web Development
tags:
  - Closures
  - JavaScript
---
Been meaning to blog about this for a while, but just kept forgetting. Over at the <a title="Atlas and more" rel="external" href="http://weblogs.asp.net/bleroy/default.aspx">Atlas and More Blog</a>, Bertrand Le Roy has posted <a title="From closures to prototypes, part 1" rel="external" href="http://weblogs.asp.net/bleroy/archive/2006/10/11/From-closures-to-prototypes_2C00_-part-1.aspx">two</a> <a title="From closures to prototypes, part 2" rel="external" href="http://weblogs.asp.net/bleroy/archive/2006/10/14/From-closures-to-prototypes_2C00_-part-2.aspx">articles</a> on converting object definitions from using closures to using prototypes. Though the postings are mostly about using the latest version of Atlas, there is some good discussion of why private members aren&#8217;t necessary or efficient for use in JavaScript. You&#8217;ll remember I blogged about <a title="Closures considered harmful" rel="internal" href="/archive/2006/9/375">avoiding closures</a> recently, and these articles follow along in the same vein.
