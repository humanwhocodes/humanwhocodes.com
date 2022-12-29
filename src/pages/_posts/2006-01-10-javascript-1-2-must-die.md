---
title: JavaScript 1.2 Must Die
author: Nicholas C. Zakas
permalink: /blog/2006/01/10/javascript-1-2-must-die/
categories:
  - Web Development
tags:
  - JavaScript
---
I&#8217;m kind of shocked nowadays when I see anyone using the `language="JavaScript"` attribute on `<script>` tags. But I&#8217;ve noticed a disturbing trend recently: the user of `language="JavaScript1.2"` seems to be everywhere.

For those who don&#8217;t remember, initially you specified the version of JavaScript in the `language` attribute. That was all fine and good, but the browser would default to the most recent version of JavaScript if a version wasn&#8217;t specified (browsers have the same behavior now). When you specify a version, it forces the browser to use it. So what&#8217;s the big deal? JavaScript 1.2 has some different behavior from the rest of JavaScript:

  * No support for Unicode characters.
  * Array initialization with a single number creates an array with the number as its sole item instead of using it as the array length.
  * The `splice()` method return an object if only one item is removed and an array if more than one item is removed instead of always returning an array.
  * Date behavior is platform-dependent instead of platform-independent.
  * Boolean objects with a value of false evaluate to false even though all objects should evaluate to true when converted to a Boolean value.
  * The == and != operators do not convert values for comparison, which is the default in JavaScript. They behave like === and !==.

These are important differences that can really make a difference in your code. Do yourself and the rest of us a favor, kill JavaScript 1.2 now! Figure out why you&#8217;re using it, make the code corrections, and make the web a better place.

**Note:** It appears that Firefox 1.5 will now <a title="JS1.2 must die" rel="external" href="https://bugzilla.mozilla.org/show_bug.cgi?id=255895">ignore the version</a> even if specified and always use the latest JavaScript engine.
