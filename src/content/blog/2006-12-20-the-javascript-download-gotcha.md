---
title: The JavaScript download gotcha
author: Nicholas C. Zakas
permalink: /blog/2006/12/20/the-javascript-download-gotcha/
categories:
  - Web Development
tags:
  - Compression
  - JavaScript
  - Performance
---
Ajax solutions typically take into account that HTTP 1.1-compliant servers will allow only two connections to a single client at the same time. Or rather, two connections per domain name. There has been some mention of <a title="Circumventing browser connection limits for fun and profit" rel="external" href="http://www.ajaxperformance.com/?p=33">workaround techniques</a> to speed up communication. Using different domain names can allow up to six simultaneous connections, which is really cool, especially when your site uses lots of images. How about if it uses lots of JavaScript? Same trick should work right? Wrong.

JavaScript files are loaded synchronously and sequentially as they appear in the markup. This means that only one JavaScript file can be downloaded at a time, effectively throttling down the download performance of the page. Each JavaScript file must be completed downloaded and then interpreted before the next download can begin. It's this second step, the interpretation of the code, that is the major problem. Whereas images and <acronym title="Cascading Style Sheets">CSS</acronym> can be downloaded asynchronously and introduced into the page at any time, JavaScript doesn't have this luxury.

Internet Explorer solves this problem by implementing the `defer` attribute on the `<script/>`, which effectively tells the browser to download the code but not execute it until the page is finished loading. Unfortunately, no other browser supports this attribute, so it's not really practical to use.

The best way to improve the download performance of JavaScript is to combine as much code as possible into one file, compress it using gzip, and send it over the wire. Here's a <a title="Make your pages load faster by combining and compressing javascript and css files" rel="external" href="http://rakaz.nl/item/make_your_pages_load_faster_by_combining_and_compressing_javascript_and_css_files">good read</a> on the topic.
