---
title: The throttle() function
author: Nicholas C. Zakas
permalink: /blog/2007/11/30/the-throttle-function/
categories:
  - Web Development
tags:
  - JavaScript
  - onresize
  - Throttling
---
A little while ago, I blogged about <a title="Downshift your code" rel="external" href="http://yuiblog.com/blog/2007/07/09/downshift-your-code/">downshifting your code</a> over at the <a title="YUI Blog" rel="external" href="http://www.yuiblog.com">YUI Blog</a>. In that entry, I described a pattern for throttling code such that it won't be called as frequently. This technique proves to be invaluable when dealing with the `resize` event in Internet Explorer, which fires the event repeatedly as the browser is being resized (whereas other browsers wait until after the user has finished resizing the browser). Since then, I've been looking for a more compact, reusable solution to throttling function calls. Tonight, I finally figured out a simple function that can be dropped in anywhere:

<code class="block"> </code>

<pre>function throttle(method, scope) {
    clearTimeout(method._tId);
    method._tId= setTimeout(function(){
        method.call(scope);
    }, 100);
}</pre>

The `throttle()` function accepts two arguments: the method to call and the scope in which to call it (which may be `null`). A timeout ID is assigned onto the function (yes, I'm slightly modifying your function, but it's worth it). This timeout ID is used to manage timeouts for the function. Because of this, it's necessary to avoid using anonymous functions. For example, this won't work as expected:

<code class="block"> </code>

<pre>window.onresize = function(){
    throttle(function(){
        doSomething();
    }, window);
};</pre>

The problem here is that whenever the `resize` event fires, a new anonymous function is created so the timeout ID is lost. Instead, use a previously defined function:

<code class="block"> </code>

<pre>window.onresize = function(){
    throttle(doSomething, window);
};</pre>

Using `throttle()` in this way ensures that the code is appropriately throttled. It can be tweaked by changing the value of the timeout delay; if you need the function to execute more frequently, change 100 to a smaller number; if you need the function to execute less frequently, change 100 to a larger number.

I've ended up using this technique, and now this function, more frequently than I thought I would. I hope you find it as useful as I do.
