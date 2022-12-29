---
title: Timer resolution in browsers
author: Nicholas C. Zakas
permalink: /blog/2011/12/14/timer-resolution-in-browsers/
categories:
  - Personal
tags:
  - JavaScript
  - Performance
  - Timer
---
Timer resolution refers to how frequently a clock is updated. For most of their history, web browsers used the default system timer for functionality such as `setTimeout() `and `setInterval()`. This meant browsers could only schedule code to run as frequently as the system timer would fire. Internet Explorer also used the system clock for seeding values in `Date` object, so dates could only be created with differences equivalent to the timer resolution.

## A brief history

Windows machines have a timer resolution of 10-15.6ms by default (most at 15.6ms), which meant that browsers using the system timer were stuck to this resolution. Of course, 10-15.6ms is a lifetime when you have a CPU running as fast as today&#8217;s processors do. It probably doesn&#8217;t surprise you that Internet Explorer through version 8 exclusively used system timers and so led to John Resig writing about how timer resolution affects benchmarks<sup>[1]</sup>. On OS X, browser timers were much more accurate than on Windows.

Until recently, the other browsers on Window also used the system timer and so were all stuck at 15.6ms timer resolution. This was true for Firefox, Safari, and Opera. Chrome may have been the first Windows browser to switch to a higher-resolution timer<sup>[2]</sup>, and their experiments led to some interesting results.

The original idea was for Chrome to have sub-millisecond timers, but this was abandoned in favor of a one millisecond timer resolution. They decided to use the Windows multimedia timer API, which allows you to specify a timer with a resolution as small a one millisecond and use that instead of the system timer. This is the same timer used by plugins such as Flash and Quicktime.

Chrome 1.0 beta had a one millisecond timer resolution. That seemed okay, but then the team started having bug reports. It turns out that timers cause the CPU to spin, and when the CPU is spinning, more power is being consumed because it can&#8217;t go into sleep (low power) mode.<sup>[3]</sup> That caused Chrome to push its timer resolution to 4ms.

The 4ms delay was codified in HTML5 as part of the Timer section<sup>[4]</sup>, where it states that the minimum resolution for `setTimeout()` should be 4ms. The minimum resolution for `setInterval()` is specified as 10ms.

## Timer resolution today

Internet Explorer 9, Firefox 5, Safari 5.1, and Opera 11 all feature a 4ms timer resolution, following Chrome&#8217;s lead. Prior to that, Firefox 4 and earlier and Safari 5 and earlier had a timer resolution of 10ms (apparently, this was hardcoded in WebKit). Mobile Safari on iOS 5 also has a 4ms timer resolution. Silk on the Kindle Fire has a 10ms timer resolution, potentially indicating it was built off an older version of WebKit. However, just because today&#8217;s browsers have a timer resolution of 4ms, it doesn&#8217;t mean that&#8217;s the resolution you&#8217;ll be getting.

Most browsers also do some sort of timer throttling based on different conditions. The intent is to save battery at opportune times &#8211; times when, theoretically, you either won&#8217;t notice the difference or would gladly trade for improved battery life on a laptop or mobile device. Here are some circumstances where timer resolution changes:

  * Chrome and Internet Explorer 9+ switch back to the system timer when a laptop is running on battery power. When plugged in, the browser switches back to the 4ms timer resolution.
  * Firefox 5+, Chrome 11+, and Internet Explorer 10+ change timer resolution in inactive tabs to 1000 milliseconds.<sup>[5]</sup>
  * Mobile Safari on iOS5 and Silk on the Kindle Fire freeze the timer completely when you switch to a different app. The timer restarts when you switch back to the browser.

Browsers will likely continue to make adjustments to timer resolution as it pertains to power consumption on battery-powered devices. The HTML5 spec leaves room for browser vendors to make such changes.

&nbsp;

## Conclusion

There has been a silent timer resolution evolution going on as browsers have developed over the past few years. Timer resolution isn&#8217;t one of those topics that gets discussed frequently, but if you&#8217;re using `setTimeout()` and `setInterval()`, it pays to have a deeper understanding of the functionality. We&#8217;re getting closer to the point of having per-millisecond control of the browser. When someone figures out how to manage timers without CPU interrupts, we&#8217;re likely to see timer resolution drop again. Until then, keep 4ms in mind, but remember that you still won&#8217;t always get that.

**Update (15 Dec 2011):** Updated with information about `Date` object.

## References

  1. [Accuracy of JavaScript Time][1] by John Resig
  2. [Chrome: Cranking up the clock][2] by Mike Belshe
  3. [CPU Power Utilization on Intel® Architectures][3] by Karthik Krishnan
  4. [Timers][4] in HTML5
  5. [Clamp setTimeout/setInterval to something higher than 10ms in inactive tabs][5]
  6. [Timer Resolution Test][6] by Ryan Grove

 [1]: http://ejohn.org/blog/accuracy-of-javascript-time/
 [2]: http://www.belshe.com/2010/06/04/chrome-cranking-up-the-clock/
 [3]: http://software.intel.com/en-us/articles/cpu-power-utilization-on-intel-architectures/
 [4]: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#timers
 [5]: https://bugzilla.mozilla.org/show_bug.cgi?id=633421
 [6]: http://jsfiddle.net/rgrove/rQtUU/embedded/result/
