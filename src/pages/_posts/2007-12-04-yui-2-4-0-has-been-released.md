---
title: YUI 2.4.0 has been released
author: Nicholas C. Zakas
permalink: /blog/2007/12/04/yui-2-4-0-has-been-released/
categories:
  - Web Development
tags:
  - JavaScript
  - Profiler
  - YUI
  - YUI Test
---
As announced earlier today, <a title="YUI 2.4.0 Released" rel="external" href="http://yuiblog.com/blog/2007/12/04/yuii-240/">YUI 2.4.0 has been released</a>. I've contributed this time around in two areas.

First, I did a major overhaul of <a title="YUI Test" rel="external" href="http://developer.yahoo.com/yui/yuitest/">YUI Test</a> to allow for asynchronous tests. All tests now run asynchronously, which eliminates long-running script errors that may occur with large test suites. This asynchronous behavior also allows for tests to wait before continuing, which means you can wait for an event to occur, wait for data to be returned from the server, or wait a predefined amount of time before continuing the test. You can check out the <a title="YUI Test Examples" rel="external" href="http://developer.yahoo.com/yui/examples/yuitest/">examples</a> and documentation for information on how to get that working.

My second contribution to YUI this release is in the new <a title="Profiler" rel="external" href="http://developer.yahoo.com/yui/profiler/">profiler</a>. The profiler allows you to specify particular functions for measurement, collecting information about the number of calls as well as average, min, and maximum execution time. There is no user interface for the profiler, but it can be really useful in doing performance testing on top of YUI Test. There are plans for a user interface in a later release.

This release was a lot of work for myself and the other YUI authors, but I think you'll be very pleased with the results.
