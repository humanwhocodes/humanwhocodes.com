---
title: Internet Explorer 8 user-agent
author: Nicholas C. Zakas
permalink: /blog/2007/12/18/internet-explorer-8-user-agent/
categories:
  - Web Development
tags:
  - Internet Explorer
  - User Agent String
---
I was playing around with <a title="Fiddler" rel="external" href="http://www.fiddlertool.com">Fiddler</a> today and found something interesting. Version 2.0 has a user-agent switch containing Internet Explorer 8. The user-agent string is as follows:

`Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64)`

For those of the non-user-agent-string-understanding tribe, it basically indicates Internet Explorer 8.0 (MSIE 8.0) running on Windows 2003 (Windows NT 5.2) 64-bit in 32-bit compatibility mode (WOW64). I don't know that this indicates anything other than IE8 must be on the way if it's already being spoofed in a Microsoft tool (insert joke here).
