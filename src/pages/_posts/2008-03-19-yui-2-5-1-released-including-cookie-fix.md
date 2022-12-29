---
title: YUI 2.5.1 released, including cookie fix
author: Nicholas C. Zakas
permalink: /blog/2008/03/19/yui-2-5-1-released-including-cookie-fix/
categories:
  - Uncategorized
tags:
  - Cookies
  - YUI
  - YUI Test
---
YUI 2.5.1 has been <a title="YUI 2.5.1 Released: Improved AIR support, JSON security patch, YUI Configurator, and bug fixes" rel="external" href="http://yuiblog.com/blog/2008/03/19/yui-251/">released</a>. This includes a fix to the <a title="YUI Cookie Utility" rel="external" href="http://developer.yahoo.com/yui/cookie/">Cookie utility</a> for a <a title="YUI Subcookies" rel="external" href="http://terrychay.com/blog/article/subcookies.shtml">subcookie parsing issue</a> that was brought to my attention. Always a nice way to start the work day, I might add.

So I quickly created a new test case using <a title="YUI Test" rel="external" href="http://developer.yahoo.com/yui/yuitest/">YUI Test</a> and sure enough, it was broken. I then went through several iterations of changes, re-running the tests and finding that a minor change here affected a lot of functionality. Have I mentioned how much I love unit testing? After I finally got a fix and made sure all the tests passed, I knew the work was done and I felt assured that there were no regressions.

I&#8217;ve actually developed most of the Cookie utility using YUI Test and it has saved my butt on a number of occasions. I&#8217;m working on putting together a talk about JavaScript unit testing using YUI Test (still waiting to hear back from a certain conference&#8230;.nudge, nudge), and I&#8217;m so glad I&#8217;ll be able to give a concrete example of how it can be useful.
