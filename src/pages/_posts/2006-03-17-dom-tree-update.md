---
title: DOM Tree Update
author: Nicholas C. Zakas
permalink: /blog/2006/03/17/dom-tree-update/
categories:
  - Web Development
tags:
  - DOM
  - JavaScript
---
About four years ago, I wrote an article for WebReference entitled, <a title="Creating a Cross-Browser (DOM) Expandable Tree" rel="external" href="http://www.webreference.com/programming/javascript/trees/">Creating a Cross-Browser (<acronym title="Document Object Model">DOM</acronym>) Expandable Tree</a>. At the time, the <acronym title="Document Object Model">DOM</acronym> was still fairly new and Netscape Navigator 4.7 was still in use by many people, so I got a lot of questions such as, &#8220;how can I make this work in Netscape?&#8221; My answer was that you couldn&#8217;t, and I refused to figure out a way to do it because I believed that the <acronym title="Document Object Model">DOM</acronym> was the future. This was a fairly popular article at the time.

Recently, I received an email from someone pointing out that the tree didn&#8217;t work in the latest version of Opera. Having not looked at this code in about three years, I decided it would be fun to revisit it. I was able to figure out the problem (Opera didn&#8217;t like `setAttribute()` to set an element&#8217;s ID), and low and behold, this four-year-old code still works in *all* <acronym title="Document Object Model">DOM</acronym>-compliant browsers! I&#8217;ve updated the code and it can be downloaded in the <a title="Downloads" rel="internal" href="/downloads/">Downloads</a> section.
