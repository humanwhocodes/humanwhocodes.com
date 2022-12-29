---
title: 'Tabbed Browsing &#8211; Security Risk'
author: Nicholas C. Zakas
permalink: /blog/2004/10/20/tabbed-browser-security-risk/
categories:
  - Web Development
tags:
  - Firefox
  - Internet
  - Security
  - Tabs
---
One of the newest and most popular additions to Web browers has been the onset of tabbed browsing, allowing multiple Web sites to be open in one browser window. It turns out that all browsers with this feature overlooked some key security concerns.

In <a title="Major browsers bitten by security bugs" rel="external" href="http://news.com.com/Major+browsers+bitten+by+security+bugs/2100-1002_3-5419714.html">this article at News.com</a>, security company <a title="Secunia" rel="external" href="http://secunia.com/">Secunia</a> released <a title="Multiple Browsers Tabbed Browsing Vulnerabilities" rel="external" href="http://secunia.com/secunia_research/2004-10/advisory/">this security advisory</a> regarding the behavior of tabbed browsers, specifically Mozilla (including Firefox), Konqueror, and Opera. Though Safari wasn&#8217;t mentioned specifically, since it is based on Konqueror&#8217;s KHTML engine, the problem is likely present in Safari as well. Only Internet Explorer plugins supporting tabbed browsing are affected.

This security flaw allows a Web site in one tab to access information on a Web site in another tab, also allowing a site to pop up a dialog that appears to originate from a different tab. The latest version of Konqueror, released yesterday, fixes the problem. The Mozilla Foundation has promised that this flaw will be fixed before the final 1.0 release of Firefox. There is no news on when this flaw will be fixed in Opera.
