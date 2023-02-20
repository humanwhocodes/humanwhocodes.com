---
title: JavaScript variable scoping trickery
author: Nicholas C. Zakas
permalink: /blog/2007/11/19/javascript-variable-scoping-trickery/
categories:
  - Web Development
tags:
  - JavaScript
  - Scope
  - Variables
---
I almost fell victim to this over the weekend, so thought I'd share a common JavaScript gotcha. What does the following line do?

<code class="block"> </code>

<pre>var start = stop = null;</pre>

Most people will respond, &#8220;define a variable called `start` and a variable called `stop` and then set them both to `null`.&#8221; That is generally correct, but not specific enough. What actually happens is that a *local* variable called `start` is defined and a *global* variable named `stop` is defined; both are then set to `null`. The `var` operator applies to `start`, not to `stop` because `stop` is part of the initialization (to the right of the equals sign). This code can be rewritten to create two local variables like this:

<code class="block"> </code>

<pre>var start = null, stop = null;</pre>

Now, the `var` operator applies to both `start` and `stop`, creating two local variables (the comma indicates another variable being defined). It's little things like this that make me love JavaScript.
