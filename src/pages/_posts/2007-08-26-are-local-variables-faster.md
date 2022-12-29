---
title: Are local variables faster?
author: Nicholas C. Zakas
permalink: /blog/2007/08/26/are-local-variables-faster/
categories:
  - Web Development
tags:
  - JavaScript
  - Variables
---
For years, I&#8217;ve heard that local variables in JavaScript are faster than global variables when used inside of functions. Logically, this always made sense to me: the longer the scope chain the longer it would take to look up the chain and find a particular variable. If the variable was local, however, the search would be very short. I accepted this to be true and preached it like everyone else. However, now I&#8217;m not so sure.

I wrote up a very quick <a title="Which is faster? Local or global?" rel="internal" href="{{site.url}}/experiments/javascript/local_vs_global.htm">experiment</a> to see if this were the case. I tested on Safari 3 (Windows), Opera 9.02, Internet Explorer 7, and Firefox 2.0.0.6. The results are interesting and I&#8217;m still trying to understand them:

  * In Safari 3 (Windows), using local variables typically takes longer than using globals. However, there is a decent amount of time when the two are exactly equal.
  * In Opera 9.02, using globals routinely show up as slower than locals. There are, though, some instances when the two are equal and, every so often, an instance when globals are faster than locals (though this is clearly the least likely to occur).
  * In Internet Explorer 7, the two end up equal most of the time. The second most common occurrence is globals being faster than locals. I have seen instances where locals are faster than globals, but it doesn&#8217;t happen very often.
  * In Firefox 2.0.0.6, global variables are much faster than locals by a factor of at least 3. This was the most surprising to me. Never did the two come close in timing.

So what does all of this mean? Should we start doing browser detects to determine whether to use global or local variables? Of course not, that would be insane. What it does mean is that perhaps the way we&#8217;ve thought about JavaScript scope chains isn&#8217;t entirely accurate.

I&#8217;m wondering if the creation and destruction of local variables contributes to the timing discrepancies in this experiment. Please take a look at the source code and let me know if you see anything that may be skewing these results. Please feel free to play with the experiment and a little bit and let me know what results you come up with.
