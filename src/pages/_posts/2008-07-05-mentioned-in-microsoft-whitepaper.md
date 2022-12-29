---
title: Mentioned in Microsoft whitepaper
author: Nicholas C. Zakas
permalink: /blog/2008/07/05/mentioned-in-microsoft-whitepaper/
categories:
  - Web Development
tags:
  - Cross Domain
  - JavaScript
  - Microsoft
  - Personal
  - Whitepaper
  - XDR
  - XHR
---
I was over my buddy <a title="Adam Platti's blog" rel="external" href="http:/www.adamplatti.net">Adam</a>&#8216;s place for a fourth of July barbecue yesterday when he mentioned having read a Microsoft <a title="Client Side Cross-Domain Security" rel="external" href="http://code.msdn.microsoft.com/xdsecuritywp">whitepaper on cross-domain security</a>. This had come up after we had started talking about Internet Explorer 8 and if there&#8217;s anything new and cool in it. He then mentioned offhand that they quoted me in the whitepaper. Sure enough, I got home and looked up the whitepaper to find that he was right. The quote was from <a title="Cross-domain XHR removed from Firefox 3" rel="internal" href="{{site.url}}/blog/2008/4/27/cross_domain_xhr_removed_from_firefox_3">my post on cross-domain XHR</a> a little while back:

> I was never a huge fan of overloading the XHR object to do this because it seems like there are just too many differences and security issues you&#8217;d have to lock down. IE&#8217;s approach, making a completely different object, makes a lot of sense to me and quite logically locks down functionality that otherwise would be part of an if statement in the XHR code.

I always find this sort of thing cool. As an author, my name tends to float around a lot, but I always like seeing specific places where people mention me. It helps me explain to my parents why I live So Far Away to do my work. Plus, mom always loves seeing these.

For the record, I still much prefer Microsoft&#8217;s `XDomainRequest` object to cross-domain `XMLHttpRequest`.
