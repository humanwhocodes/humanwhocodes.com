---
title: My first YUI release
author: Nicholas C. Zakas
permalink: /blog/2007/07/31/my-first-yui-release/
categories:
  - Web Development
tags:
  - JavaScript
  - YUI
  - YUI Test
---
There&#8217;s a common misconception out there that I&#8217;m part of the <a title="Yahoo! User Interface Library" rel="external" href="http://developer.yahoo.com/yui">YUI</a> team. Well, I&#8217;m not (I work on <a title="My Yahoo!" rel="external" href="http://my.yahoo.com">My Yahoo!</a>), but that didn&#8217;t stop me from submitting some code to be included in the 2.3.0 release (<a title="YUI 2.3.0 released" rel="external" href="http://yuiblog.com/blog/2007/07/31/yui-2-3-0-released/">details</a>). I&#8217;ve been secretly working on this little creation for the past few months and now that the release is here, I can finally talk about it.

The 2.3.0 release of <acronym title="Yahoo! User Interface">YUI</acronym> is the first to include my unit testing framework, unimaginatively named <a title="YUI Test Utility" rel="external" href="http://developer.yahoo.com/yui/yuitest/">YUI Test</a>. The basic idea was to create a super simple way to write unit tests for JavaScript. I really like unit testing, but found most of the JavaScript options to take too much time to get up and running. With YUI Test, you can include a couple of files and quickly write and run a test case. There&#8217;s tons of assertions geared towards common JavaScript data types and the default failure messages are helpful enough such that you don&#8217;t really need to provide custom ones (though that is an option).

I&#8217;ll be talking more about YUI Test in the coming weeks and months, but for now, check out the <a title="YUI Test Utility" rel="external" href="http://developer.yahoo.com/yui/yuitest/">documentation</a> and I hope you enjoy the wonderful world of unit testing.
