---
title: IE7 User-Agent String Revealed
author: Nicholas C. Zakas
permalink: /blog/2005/04/28/ie7-user-agent-string-revealed/
categories:
  - Web Development
tags:
  - Internet Explorer
  - User Agent String
---
In an <a title="Internet Explorer 7 User Agent String" rel="external" href="http://blogs.msdn.com/ie/archive/2005/04/27/412813.aspx">IEBlog posting</a>, Eric Lawrence introduces the new Internet Explorer 7 user-agent string. Assuming that the browser is running on Longhorn, the string would be: `Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)`. Not a big surprise that Microsoft kept with the traditional user-agent string format for Internet Explorer instead of going to a more application-specific (and more appropriate) one. Though some hardcore developers will balk at this, it really is the best way to ensure backwards compatibility with browser-sniffing applications. Could you image the upgrade nightmare that would ensue if the user-agent string was completely new?

Lawrence also noted that the &#8220;SV1&#8243; has been removed from the user-agent string in this example because Longhorn will have all of the security features of Windows XP Service Pack 2, making the identification of &#8220;Windows NT 6.0&#8243; and &#8220;SV1&#8243; redundant. <acronym title="Internet Explorer">IE</acronym>7 running on Windows XP Service Pack 2 will most likely still contain &#8220;SV1&#8243;.
