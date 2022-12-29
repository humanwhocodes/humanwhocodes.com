---
title: ActiveX Armageddon
author: Nicholas C. Zakas
permalink: /blog/2006/03/29/activex-armageddon/
categories:
  - Web Development
tags:
  - ActiveX
  - Internet Explorer
  - Microsoft
---
A lot of people probably forgot, but a while back Microsoft <a title="Microsoft Bows to Eolas, Revamps IE's Multimedia Handling" rel="external" href="http://www.eweek.com/article2/0,1895,1895907,00.asp">lost a patent infringement suit</a> to Eolas Technologies who had some patent governing the inclusion of multimedia assets in web pages. As a result of the suit, Microsoft has to change the way Internet Explorer handles multimedia content embedded in the page using `<embed/>`, `<applet/>`, and `<object/>`. The change would require users to first &#8220;activate&#8221; a control on the page before using it, requiring an extra click.

Microsoft has a published a <a rel="external" href="http://msdn.microsoft.com/library/?url=/workshop/author/dhtml/overview/activating_activex.asp">whitepaper</a> detailing the changes that developers should look out for. Apparently, only user interaction is affected. If, for example, you are using a Flash XMLSocket via JavaScript, this won&#8217;t be interrupted. But if you were loading a Quicktime movie, the user will first have to click on the control to activate before he or she can use the play, stop, rewind, and other buttons.

This update to Internet Explorer is supposed to roll out early in April, so when you start seeing your multimedia content behaving strangely, this is why!
