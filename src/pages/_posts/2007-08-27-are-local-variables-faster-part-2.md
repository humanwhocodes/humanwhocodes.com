---
title: Are local variables faster? Part 2
author: Nicholas C. Zakas
permalink: /blog/2007/08/27/are-local-variables-faster-part-2/
categories:
  - Web Development
tags:
  - JavaScript
  - Variables
---
As a follow-up to my <a title="Are local variables faster?" rel="internal" href="https://humanwhocodes.com/archive/2007/8/474">last post</a>, I've devised a <a title="Which is faster? Local or global? Part 2" rel="internal" href="https://humanwhocodes.com/experiments/javascript/local_vs_global_2.htm">new experiment</a> to test the relative speed of accessing global variables versus accessing local variables. Several commenters correctly pointed out that my <a title="Which is faster? Local or global?" rel="internal" href="https://humanwhocodes.com/experiments/javascript/local_vs_global.htm">first experiment</a> was flawed due to the repeated variable initialization in the local variable test case. I clearly forgot to take into account variable initialization time. Special thanks to Dmitry Monin and Matt Sweeney for devising different experiments that proved this flaw.

Still, with this new experiment, I'm not seeing the dramatic speed difference I expected. In most browsers, the results tend to favor local variables slightly:

  * Safari 3.0.3 (Windows) shows that roughly 10% of the time, global variables are either faster or equal to local variables.
  * Opera 9.02 shows a similar occurrence, with global variables appearing faster or equal to local variables at around 15% of the time.
  * Internet Explorer 7 shows global variables are faster than, or equal to, local variables about 10% of the time as well.
  * Firefox 2.0.0.6 is the most consistent browser, with local variables repeatedly beating up on global variables with only a small incidence of equality or the inverse relationship (less than 5%).

With this revised experiment, I feel comfortable saying that local variables are faster than global variables across the board&#8230;but not by much. Firefox shows the greatest variance between performance of globals and locals, but even so, the performance isn't all that bad. If you're counting every millisecond, it may make a difference, but chances are that you'll get more bang for your development buck by reducing DOM interactions and using event delegation rather than refactoring code to use local variables.
