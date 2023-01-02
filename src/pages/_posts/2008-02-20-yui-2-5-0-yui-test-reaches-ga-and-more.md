---
title: "YUI 2.5.0: YUI Test reaches GA and more"
author: Nicholas C. Zakas
permalink: /blog/2008/02/20/yui-2-5-0-yui-test-reaches-ga-and-more/
categories:
  - Web Development
tags:
  - Cookies
  - JavaScript
  - Profiler
  - YUI
  - YUI Test
---
In case you missed the official announcement, today <a title="YUI 2.5.0 Released" rel="external" href="http://yuiblog.com/blog/2008/02/20/yui-250-released/">YUI 2.5.0 was released</a>. With this release, <a title="YUI Test" rel="external" href="http://developer.yahoo.com/yui/yuitest/">YUI Test</a> has been promoted out of the beta stage into general availability (GA). I'm really excited about this as YUI Test was my first contribution to YUI and I honestly believe it's probably one of the most useful pieces of code I've ever written.

I haven't spent much time talking about YUI Test, which I take full blame for due to a busy schedule. But it really is something that I hope more people take a look at in the future. I've received mostly positive feedback from folks around the Web, saying that it's easier to use than other JavaScript unit testing frameworks, which is great to hear since that's how I designed it. There a couple of things I really want to highlight about YUI Test.

First, YUI Test can be used to test `any` code. Your code doesn't need to be built on YUI at all to use YUI Test. I've used it for my own personal experiments (that's actually what led to its creation) and others have as well. If you have code using another library, or no library at all, you can still use YUI Test to ensure it works correctly.

Second, YUI Test includes a full event-simulation utility. You can simulate all basic mouse and keyboard events using the <a title="YAHOO.util.UserAction" rel="external" href="http://developer.yahoo.com/yui/docs/YAHOO.util.UserAction.html"><code>YAHOO.util.UserAction</code></a> object. This means that you can trigger your event handlers programmatically, all by writing some simple code. The result is the ability to unit test widgets and visual elements in pages, which YUI does. Event simulation works in all A-grade browsers, including Internet Explorer 6+, Firefox 1.5+, and Safari 2.x+ (though there is an issue with simulating the `keydown` event that causes Safari 2.x to crash; this is fixed in Safari 3.x).

I'm going to be working more to get the word out about YUI Test this year. In the meantime, my <a title="YUI Profiler" rel="external" href="http://developer.yahoo.com/yui/profiler/">Profiler</a> has been met with a warm welcome, allowing you to profile specific parts of JavaScript and access that information programmatically. When used with YUI Test, you can create performance tests to ensure that functions always run within a specific amount of time.

My latest addition to YUI, new to 2.5.0, is the <a title="Cookie Utility" rel="external" href="http://developer.yahoo.com/yui/cookie/">Cookie utility</a>, a very simple API for reading and writing cookies and subcookies. Not very sexy, but useful if you're dealing with cookies.
