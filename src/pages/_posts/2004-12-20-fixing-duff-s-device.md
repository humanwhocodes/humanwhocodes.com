---
title: 'Fixing Duff's Device'
author: Nicholas C. Zakas
permalink: /blog/2004/12/20/fixing-duff-s-device/
categories:
  - Web Development
tags:
  - Algorithms
  - "Duff's Device"
  - JavaScript
  - Programming
---
While researching for my book, I came across <a title="Duff's Device" rel="external" href="http://home.earthlink.net/~kendrasg/info/js_opt/jsOptMain.html#duffsdevice">Jeff Greenburg's JavaScript port</a> of <a title="Tom Duff on Duff's Device" rel="external" href="http://www.lysator.liu.se/c/duffs-device.html">Duff's Device</a>, a generic way to unroll loops for optimization. Jeff's original algorithm looks like this:

<pre>var iLoopCount = iIterations / 8; 
var iTestValue = iIterations % 8; 
do { 
    switch (iTestValue) { 
        case 0: [execute statement]; 
        case 7: [execute statement]; 
        case 6: [execute statement]; 
        case 5: [execute statement]; 
        case 4: [execute statement]; 
        case 3: [execute statement]; 
        case 2: [execute statement]; 
        case 1: [execute statement]; 
    } 
    iTestValue = 0; 
} while (--iLoopCount &gt; 0);</pre>

This is, more or less, a direct port from the original C code. The problem is the value of `iLoopCount`, which will end up as a floating-point value in many situations. Operations involving floating-point numbers are more expensive than those using integers, so this isn't optimal. To fix this, you can use `Math.ceil()` to convert the result into an integer:

<pre>var iLoopCount = Math.ceil(iIterations / 8);</pre>

Remember, the purpose of Duff's Device is to speed up loop operations, so every little bit helps.
