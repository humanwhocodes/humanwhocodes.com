---
title: The case for setImmediate()
author: Nicholas C. Zakas
permalink: /blog/2013/07/09/the-case-for-setimmediate/
categories:
  - Web Development
tags:
  - Performance
  - process.nextTick
  - setImmediate
  - setTimeout
---
One of my favorite new APIs that has been beaten about is `setImmediate()`. While I'll concede the naming is completely wrong, the functionality is completely awesome. The basic idea is to tell the browser that you want some JavaScript code executed after the last UI task in the event loop completes. To put it more simply, this is a much better implementation of `setTimeout(fm, 0)`. Since browsers clamp their timers to 4ms, it really doesn't matter if you say 0, 1, 2, 3, or 4. You aren't actually going to get exactly what you specified and so using `setTimeout(fn, 0)` introduces an observable delay as well as the overhead of using a timer when it's not needed (see more about this in my Velocity talk from last year<sup>[1]</sup>). The `setImmediate()` function was designed to do what `setTimeout(fn, 0)` *seems* like it should do. 

The `setImmediate()` method was first described in Efficient Script Yielding<sup>[2]</sup> and spearheaded by Microsoft. To date, Internet Explorer 10+ is the only browser to implement `setImmediate()`. For some reason both Mozilla and WebKit are against adding this method<sup>[3]</sup> despite what I consider to be a large amount of evidence that this would be a useful addition to the web platform. Here's why.

## Animations and requestAnimationFrame()

One of the primary arguments against including `setImmediate()` is that we already have `requestAnimationFrame()`, and that is actually what people mean to do when they use `setTimeout(fn, 0)`. If I were to make up statistics about the correctness of this assumption, I would say that this is probably the case 50% of the time. That is to say, I believe that half of the `setTimeout(fn, 0)` calls on the Internet are likely tied to animations in some way, and in that case `requestAnimationFrame()` is the correct answer.

However I have been a big proponent of using timers to break up large chunks of work that need to be done (see my post, Timed array processing in JavaScript<sup>[4]</sup>). In fact, my work was cited on Microsoft's demo page<sup>[5]</sup> as part of the reason for introducing `setImmediate()`. This particular use case is ill-suited to use `requestAnimationFrame()` because it doesn't necessarily require a UI update.

Keep in mind that `requestAnimationFrame()` schedules a new paint task in the event loop queue and allows the specified code to execute prior to that paint task occurring. This is in sharp contrast to `setImmediate()` where its JavaScript task is inserted after the last paint task already existing in the event loop queue. The implementation differences lend to the use case differences.

## process.nextTick() and callbacks

The assertion that `setTimeout(fn, 0)` is always used for animations also falls apart when you look at Node.js. Node.js has had a method called `process.nextTick()`<sup>[6]</sup> for a long time. This method is similar to `setImmediate()` in Node.js, it simply inserts a task at the end of the current event loop turn queue (whereas `setImmediate()` inserts a task at the beginning of the *next* event loop turn). If `setTimeout(fn, 0)` is mostly used for animations then why would Node.js, an environment devoid of graphics, find it necessary to add such a method? 

First and foremost, Node.js was designed to use asynchronous processing wherever possible. That means using callbacks to be notified when an operation is complete. The callbacks must always be executed asynchronously for consistency even when the result could be achieved synchronously. To illustrate this, consider a read-through cache of a remote data fetch, such as:

    
    var remote = require("./remote"),
        cache = {};
    
    function getValue(key, callback) {
    
        if (key in cache) {
            process.nextTick(function() {
                callback(key, cache[key]);
            });
        } else {
            remote.fetch(key, function(value) {
                cache[key] = value;
                callback(key, cache[key]);
            });
        }
    
    }

In this case, remote data is stored in a variable called `cache` whenever it is retrieved. Whenever `getValue()` is called, the cache is checked first to see if the data is there and otherwise makes the remote call. Here's the issue: the actual remote call will return asynchronously while reading from `cache` is executed synchronously. You wouldn't want `callback()` to be called synchronously in the cached situation and asynchronously in the non-cached situation as it would completely destroy the application flow. So `process.nextTick()` is used to ensure the same flow by deferring execution of the callback until the next time through the event loop.

When you want to do something like the previous example, using a timer is incredibly inefficient, which is why `process.nextTick()` was created (as mentioned in the Node.js documentation itself<sup>[7]</sup>). Node.js as of v0.9 also includes `setImmediate()`, which is equivalent to the browser version.

This asynchronous callback pattern isn't unique to Node.js, as more browser APIs moved to asynchronous models, the need to be able to defer code execution until the next time through the event loop is becoming more and more important. Read-through caches in the browser will only become more prominent, as I suspect will be the need to defer execution so that it doesn't block UI interaction (something that can sometimes, but not always, be done via web workers).

## Polyfills, etc.

In 2010, David Baron of Mozilla wrote was has become the definitive resource for creating truly zero-millisecond timeout calls entitled, setTimeout with a shorter delay<sup>[8]</sup>. David's post highlighted the desire for shorter timeout delays and introduced a method to achieve it using the `postMessage()` API.

The approach is a bit circuitous but nonetheless effective. The `onmessage` event handler is called asynchronously after a window receives a message, so the approach is to post a message to your own window and then use `onmessage` to execute what would otherwise be passed into `setTimeout()`. This approach works because the messaging mechanism is effectively using the same methodology as `setImmediate()` under the hood.

Since David's post, a number of polyfills, most notably the NobleJS version<sup>[9]</sup>, have been released. Such polyfills continue to get used despite the availability of `requestAnimationFrame()` due to the different use case.

## What's holding us back?

As mentioned previously, both Mozilla and WebKit have been against `setImmediate()` for some reason. The arguments seem to range from &#8220;you should just to use `requestAnimationFrame()`&#8221; to &#8220;it's easy enough to create a polyfill, just do that instead.&#8221; The first argument I hope has already dispelled in this argument, the second argument I find devoid of meaning as there are plenty of things that are easy to polyfill (note: `setImmediate()` is not actually one of them) and yet are still standardized. The `classList` property of DOM elements comes to mind.

What's most surprising has been the reaction of the Chrome team, a group who I've credited numerous times for pushing forward on incremental API changes that make the web platform better. In a ticket asking for support<sup>[10]</sup> there is a conversation that has gone nowhere, instead focusing on how polyfills could work (the bug is still open but hasn't been updated in a while). A more recent one looking at Chrome's poor performance on an IE11 demo<sup>[11]</sup> that uses `setImmediate()` has a rather disappointing sequence of comments:

> &#8230;Yup, it looks like a bug in their test. They're specifically using setTimeout() in the Chrome version which gets clamped to 5ms (as per the spec). If they used postMessage() instead then it would run fine in Chrome&#8230;
> 
> &#8230;To summarize my findings, this test is running intentionally slow JS in all browsers besides IE. This is because setTimeout(0) is incorrectly used as a polyfill for setImmediate()&#8230;
> 
> &#8230;Yes, that's due to a bug in the test, see comment #7. The test basically has a check for IE11 (more or less) and does something unnecessarily slow on all other browsers&#8230;

So basically, the commenters are saying that the IE demo was rigged to make IE look faster than the other browsers because it wasn't including the *correct hack to do something similar in Chrome*. Lest we ascribe evil to every single thing Microsoft does, I would suggest several alternative explanations:

  1. Many people are using `setTimeout(fn, 0)` when they would much rather use `setImmediate()`, so this is a reasonable, cross-browser fallback.
  2. The person writing the test likely didn't have the bandwidth to fully develop a polyfill for `setImmediate()`. The person's goal was to write a demo page, not write a library.
  3. Why would they include a `postMessage()`-based solution when the whole point of the demo was to show the utility of `setImmediate()`?
  4. This was an omission because the person writing the demo didn't have the knowledge about alternative polyfills.

I would comment on the bug itself, but comments have been locked-down for some reason.

The interesting thing is that with a `postMessage()` polyfill, the commenters claim that Chrome runs faster than IE11 in this demo. That's great, now why not just wrap that into a formal `setImmediate()` implementation and then brag about how you beat IE at their own API? I'd buy you a beer for that!

## Conclusion

I'm still not entirely sure why there's such an allergy to `setImmediate()` outside of Microsoft. It has demonstrated utility and some pretty clear use cases that are not adequately serviced by `requestAnimationFrame()` or any other means. Node.js recognized this from the start so we know for sure that there are non-UI-based reasons for using `setTimeout(fn, 0)`.

I can't draw any conclusions as to why this particular API, which pretty much just exposes something that's already in the browser, is being vilified. It seems like there's enough data at this point to say that `setImmediate()` is useful &#8211; the presence of polyfills alone is a strong indicator as are the continuing discussions around why `postMessage()` is faster than `setTimeout(fn, 0)`. I think it's time for the holdouts to listen to what developers are asking for and implement `setImmediate()`.

**Update (09-July-2013):** Updated description of `process.nextTick()` per Isaac's comments below.

## References

  1. <a href=""http://www.slideshare.net/nzakas/javascript-timers-power-consumption-and-performance">Timers, Power Consumptions, and Performance</a> by me (Slideshare)
  2. [Efficient Script Yielding][1] (W3C)
  3. [window.setImmediate][2] (MDN)
  4. [Timed array processing in JavaScript][3] by me (NCZOnline)
  5. [setImmediate API][4] (IE TestDrive)
  6. [Understanding process.nextTick()][5] by Kishore Nallan (How To Node)
  7. [process.nextTick()][6] (Nodejs.org)
  8. [setTimeout with a shorter delay][7] by David Baron (dbaron.org)
  9. [NobleJS &#8211; setImmediate polyfill][8] (GitHub) 
 10. [Implement setImmediate/clearImmediate][9] (Chromium)
 11. [Investigate poor performance on Lawn Mark][10] (Chromium)

 [1]: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
 [2]: https://developer.mozilla.org/en-US/docs/Web/API/window.setImmediate
 [3]: {{site.url}}/blog/2009/08/11/timed-array-processing-in-javascript/
 [4]: http://ie.microsoft.com/testdrive/Performance/setImmediateSorting/Default.html
 [5]: http://howtonode.org/understanding-process-next-tick
 [6]: http://nodejs.org/api/process.html#process_process_nexttick_callback
 [7]: http://dbaron.org/log/20100309-faster-timeouts
 [8]: https://github.com/NobleJS/setImmediate
 [9]: https://code.google.com/p/chromium/issues/detail?id=146172
 [10]: https://code.google.com/p/chromium/issues/detail?id=255074
