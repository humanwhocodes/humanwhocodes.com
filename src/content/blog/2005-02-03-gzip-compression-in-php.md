---
title: Gzip Compression In PHP
author: Nicholas C. Zakas
permalink: /blog/2005/02/03/gzip-compression-in-php/
categories:
  - Web Development
tags:
  - GZip
  - PHP
---
As I was surfing through the blogosphere today, I came across <a title="Gzipping your CSS with PHP" rel="external" href="http://www.fiftyfoureleven.com/sandbox/2004/feb/gzipping-your-css-with-php/">an article</a> about using gzip to compress <acronym title="Cascading Style Sheets">CSS</acronym> files on <acronym title="PHP: Hypertext Preprocessor">PHP</acronym> servers. It got me to thinking: why not just compress everything?

I have implemented the compression scheme on the main page here to test it. Initially, it appears to be a success, cutting down the page size from roughly 22,500 bytes to 8,570 bytes, over a 50% savings. I had to put in a browser detect for Netscape 4, because the post describes how that particular browser seems to have trouble dealing with compressed files. Looking at my logs, it seems like some people are still using Netscape 4&#8230;and I always try to make as many people happy as possible.
