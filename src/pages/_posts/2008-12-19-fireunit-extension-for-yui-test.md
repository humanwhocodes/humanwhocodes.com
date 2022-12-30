---
title: FireUnit extension for YUI Test
author: Nicholas C. Zakas
permalink: /blog/2008/12/19/fireunit-extension-for-yui-test/
categories:
  - Professional
tags:
  - FireUnit
  - JavaScript
  - Unit Testing
  - YUI Test
---
I love unit testing, especially for JavaScript, which is why I wrote [YUI Test][1]. John Resig [just announced][2] another exciting tool for unit testing called [FireUnit][3]. FireUnit is an extension to Firebug (1.2+) and adds another tab to the Firebug console in which test results are output. Also included is a small JavaScript API for outputting results onto the Test tab.

When I wrote YUI Test, I made sure that the `TestRunner` object was completely event-driven so that test results could be output in any way that made sense. To prove how easy it is to create your own visualization for YUI Test results, I created a FireUnit extension for YUI Test. The extension is nothing exciting, just a simple JavaScript object that subscribes to the various `TestRunner` [events][4] and then marshals them to the appropriate FireUnit API calls. All you need to do is load the file and include the following line of code:

    YAHOO.tool.FireUnit.attach();

That's it! All the results will be output to the Test tab in Firebug. There are some limitations to FireUnit, such as its inability to group tests and a lack of anything but basic result formatting (so some of the failure messages YUI Test generates don't look all that pretty). Still, it's a step in the right direction and I'm sure John will be continuing to develop it. Feel free to download [FireUnit for YUI Test][5] and give it a whirl (BSD license).

 [1]: http://developer.yahoo.com/yui/yuitest/
 [2]: http://ejohn.org/blog/fireunit/
 [3]: http://www.fireunit.org
 [4]: http://developer.yahoo.com/yui/yuitest/#running-tests
 [5]: {{site.url}}/downloads/yuitest-fireunit.zip
