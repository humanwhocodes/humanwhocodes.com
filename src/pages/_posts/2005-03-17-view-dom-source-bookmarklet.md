---
title: View DOM Source Bookmarklet
author: Nicholas C. Zakas
permalink: /blog/2005/03/17/view-dom-source-bookmarklet/
categories:
  - Web Development
tags:
  - Bookmarklet
  - DOM
  - JavaScript
---
There aren&#8217;t many things I don&#8217;t like about <a title="Mozilla Firefox" rel="external" href="http://www.mozilla.org/projects/firefox">Firefox</a>, but there is one that constantly drives me nuts: that the View Source command actually goes back to the server to get the source of the page you&#8217;re currently viewing. Why doesn&#8217;t it just display the source from cache?

I&#8217;m sure they figure it&#8217;s the same thing, but sometimes it&#8217;s not. Take the Google X debacle. I had it still up on my screen but was unable to see the source code for the page. So I quickly wrote a little bookmarklet that would do the deed for me.

You can bookmark it directly here: <a title="View DOM Source" rel="bookmarklet" href="javascript:var o=new XMLSerializer();w=window.open();d=w.document;d.open();d.write(o.serializeToString(document.documentElement).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&quot;/g,'&quot;'));d.close();">View DOM Source</a>. Remember, this only works in Firefox (or other Mozilla-based browsers).

Essentially, this bookmarklet uses the `XMLSerializer` object to serialize the page&#8217;s <acronym title="Document Object Model">DOM</acronym> representation. If the page uses little or no JavaScript, this will be essentially equal to the source. If the page&#8217;s code is modified by JavaScript, it will display the code *with* the modifications. Hope you all find this as helpful as I have!
