---
title: Falling in love with the IE8 JavaScript debugger
author: Nicholas C. Zakas
permalink: /blog/2008/03/22/falling-in-love-with-the-ie8-javascript-debugger/
categories:
  - Web Development
tags:
  - Debugger
  - Internet Explorer
  - JavaScript
---
If there&#8217;s one thing Microsoft does really, really well, it making IDEs with great debugging capabilities. With the release of Internet Explorer 8, they took that experience and applied it towards JavaScript debugging. The result is nothing short of spectacular.

To be honest, I&#8217;ve never been a huge fan of Firebug&#8217;s JavaScript debugger. It sometimes loses track of the code that&#8217;s executing, it doesn&#8217;t block all script execution while at a breakpoint, and it&#8217;s impossible to debug crunched files that appear on a single line of code. The IE8 JavaScript debugger does everything right. Some are calling it a Firebug ripoff, but Firebug&#8217;s JavaScript debugger could learn some tricks from it.

First, the IE8 debugger allows statement-level debugging. It doesn&#8217;t matter how many statements are on the same line of code, it very clearly highlights in yellow the statement being executed. You want to set a breakpoint on the control condition of a `for` loop? No problem. Want to step through each variable initialized with a single `var`? It can do that too. If you&#8217;re debugging crunched JavaScript code in production, you can actually use the step over, step into, and step out functionality because you know exactly what code is executing at any given moment. Firebug can&#8217;t do that.

The breakpoints in the IE8 debugger are incredibly smart. It knows exactly where breakpoints are allowed and where they aren&#8217;t, correctly understanding anonymous functions and other strange JavaScript patterns. There&#8217;s no pause when a breakpoint is hit (a la Firebug) and breakpoints are incredibly simple to add and remove in a number of ways.

The Immediate Window is something that&#8217;s been a longtime coming. It&#8217;s not as pretty as Firebug&#8217;s, and not as functional, but it does enough to make simple code execution easy. I hope at some point they add a way to clear the console and some way to output messages to it. This is the one feature that needs a lot more love.

Want more? You can debug code that is interpreted by `eval()`. You can debug inline HTML event handlers. I&#8217;m not sure why this hasn&#8217;t been done before, but it&#8217;s huge not to mention impressive.

I&#8217;m really falling in love with the IE8 JavaScript debugger. It&#8217;s the best one I&#8217;ve used first discovering that Visual Studio 2003 could be used for JavaScript debugging. Firebug better get its game face on, the IE JavaScript developer is in it to win it.

**Note:** After my initial post, I downloaded Firebug 1.1 beta and see that they have implemented some of the features that the IE8 JavaScript debugger has. I hope this starts a JavaScript debugger war.
