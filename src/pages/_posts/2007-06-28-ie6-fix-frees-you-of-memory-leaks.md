---
title: IE6 fix frees you of memory leaks
author: Nicholas C. Zakas
permalink: /blog/2007/06/28/ie6-fix-frees-you-of-memory-leaks/
categories:
  - Web Development
tags:
  - Internet Explorer
  - JavaScript
  - Memory
  - Memory Leaks
---
Just wanted to post a quick note that Microsoft released a patch for Internet Explorer 6 on Windows XP that fixes many memory leaks caused by circular references (<a title="A memory leak occurs in Internet Explorer 6 when you view a Web page that uses JScript scripting on a Windows XP-based computer" rel="external" href="http://support.microsoft.com/kb/929874/">details</a>). This is good news, but it only affects those using Windows XP. It&#8217;s still best practice to avoid circular references in general, however, this makes the ones you miss a little less troublesome for your users on Windows XP.
