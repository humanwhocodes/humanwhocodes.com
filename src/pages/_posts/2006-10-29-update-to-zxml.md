---
title: Update to zXml
author: Nicholas C. Zakas
permalink: /blog/2006/10/29/update-to-zxml/
categories:
  - Web Development
tags:
  - JavaScript
  - Personal
  - zXml
---
The technical editor for <a title="Professional Ajax" rel="external" href="http://www.amazon.com/exec/obidos/redirect?link_code=ur2&tag=nczonline-20&camp=1789&creative=9325&path=http%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F0471777781%2F">Professional Ajax</a>, Alexei Gorkov, just pinged me with some information that was put online last week: <a title="Using the right version of MSXML in Internet Explorer" rel="external" href="http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx">Using the right version of MSXML</a>. Basically, the post says that we should all be using MSXML versions 6.0 or 3.0 as a fallback, but not 4.0 or 5.0. I did get an email from Mark this week saying he was having some issues with zXml in Internet Explorer 7 when using zXml because instantiating XMLHttp 5.0 caused an error.

Given all of this new information, I've updated zXml to use the appropriate progIDs for MSXML versions 6.0 and 3.0. It's now available in <a title="Downloads" rel="internal" href="/downloads/">Downloads</a>.
