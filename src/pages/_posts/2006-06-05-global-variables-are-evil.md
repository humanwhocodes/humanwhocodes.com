---
title: Global Variables Are Evil
author: Nicholas C. Zakas
permalink: /blog/2006/06/05/global-variables-are-evil/
categories:
  - Web Development
tags:
  - JavaScript
  - Variables
---
I have been known to tell people in an enterprise environment to avoid global functions and variables in JavaScript at all costs. My reasons are purely from a maintenance point of view: it&#8217;s easier to document variables attached to classes or namespaces and it&#8217;s easier to debug (because you know where to find the variable/function in question). Turns out that Douglas Crockford agrees with me in his latest post, <a title="Global Domination" rel="external" href="http://yuiblog.com/blog/2006/06/01/global-domination/">Global Domination</a>.

It&#8217;s so much easier to argue things successfully when you can find others to back up your point of view.
