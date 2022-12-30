---
title: Google Maps
author: Nicholas C. Zakas
permalink: /blog/2005/02/08/google-maps/
categories:
  - Web Development
tags:
  - Google Maps
  - JavaScript
  - XML
  - XSLT
---
Well, <a title="Google" rel="external" href="http://www.google.com">Google</a> has done it again. The search engine giant has just released a beta version of a new service, <a title="Google Maps" rel="external" href="http://maps.google.com">Google Maps</a>. This is a new spin on the traditional &#8220;show me how to get there&#8221; online mapping sites in that the entire map is interactive. You can drag the image left and right to move around, use the zoom tool to zoom in and out, and click on designated points to get extra information inside of a little bubble&#8230;all without reloading the page.

A cursory examination of their JavaScript (and that's all I'm willing to do at this point) reveals an interesting architecture. The page relies on <acronym title="eXtensible Markup Language">XML</acronym> and <acronym title="eXtensible Style sheet Language Transformations">XSLT</acronym> working in conjunction with JavaScript to make the page work. It actually uses client-side XSLT processing, making use of the Mozilla `XSLTProcessor` in conjunction with our favorite object, `XMLHttpRequest`.

I'm sure someone will post an article soon explaining how they deconstructed the functionality. But for now, it's just another example of how innovative people can use JavaScript to do really cool things.
