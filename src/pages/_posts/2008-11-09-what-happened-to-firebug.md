---
title: What happened to Firebug?
author: Nicholas C. Zakas
permalink: /blog/2008/11/09/what-happened-to-firebug/
categories:
  - Web Development
tags:
  - Debugging
  - Firebug
  - Firefox
  - JavaScript
---
Just like any other web developer worth his salt, I use [Firebug][1] on an almost daily basis at work. I was excited to see the new features and performance improvements in version 1.2. After about a week of usage, however, I started uncovering some disturbing behavior. This version of Firebug seems to be very buggy. Here&#8217;s what I&#8217;ve seen to date:

  * The debugger freezes. I set a breakpoint, the breakpoint is hit but I can&#8217;t do anything. The only option is to reload the page to get everything working again.
  * Incorrect error locations are shown in the console. Sometimes the filename is completely wrong; sometimes the error occurred in a different tab.
  * The XHR inspector sometimes returns &#8220;null&#8221; even though a response was actually received.
  * Firebug seems to detach from the web page from time to time, so anything I enter in the console isn&#8217;t evaluated correctly.

Due to these and other errors, I recommend to the team that people stick with Firebug 1.0 for debugging. Unfortunately, 1.0 doesn&#8217;t work with FIrefox 3, so we&#8217;ve been systematically forced to upgrade so we can test on that browser. I still keep a computer with Firefox 2 and Firebug 1.0 installed in case I get into some hairy messes with Firefox 3 and Firebug 1.2.

I&#8217;m not sure how Firebug became so unstable, but I really hope these issues are addressed soon. I&#8217;d be willing to forego any new features to get the old ones working more reliably.

 [1]: http://www.getfirebug.com
