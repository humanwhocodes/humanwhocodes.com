---
title: Script yielding with setImmediate
author: Nicholas C. Zakas
permalink: /blog/2011/09/19/script-yielding-with-setimmediate/
categories:
  - Personal
tags:
  - JavaScript
  - Performance
  - Timer
---
Those who have attended my talks on JavaScript performance are familiar with my propensity for using `setTimeout()` to break up long scripts into [smaller chunks][1]. When using `setTimeout()`, you're changing the time at which certain code is executed, effectively yielding the UI thread to perform the already-queued tasks. For example, you can instruct some code to be added to the UI thread queue after 50ms via:

    setTimeout(function(){
    
       //do  something
    
    }, 50)

So after 50ms, this function is added to the queue and it's executed as soon as its turn comes. A call to `setTimeout()` effectively allows the current JavaScript task to complete so the next UI update can occur.

## Problems

Even though I've been a big proponent of using `setTimeout()` in this way, there are a couple of problems with this technique. First and foremost, timer resolution across browsers varies. Internet Explorer 8 and earlier have a timer resolution of 15.6ms while Internet Explorer 9 and later as well as Chrome have a timer resolution of 4ms. All browsers enforce a minimum delay for `setTimeout()`, so `setTimeout(fn, 0)` actually execute after 0ms, it executes after the timer resolution.

Another problem is power usage. Managing timers drains laptop and mobile batteries. Chrome [experimented][2] with lowering the timer resolution to 1ms before finding that it was hurting battery life on laptops. Ultimately, the decision was made to move back to a 4ms timer resolution. Other browsers have since followed suit, though many throttle timer resolution to 1s for background tabs. Microsoft found that lowering the timer resolution to 1ms can [reduce battery run time][3] by 25%. Internet Explorer 9, in fact, keeps timer resolution at 15.6ms when a laptop is running on battery and only increases to 4ms when plugged in.

## The setImmediate() function

The [Efficient Script Yielding][4] specification from the W3C Web Performance Working Group defines a new function for achieving this breaking up of scripts called `setImmediate()`. The `setImmediate()` function accepts a single argument, which is a function to execute, and it inserts this function to be executed as soon as the UI thread is idle. Basic usage:

    var id = setImmediate(function(){
    
        //do something
    
    });

The `setImmediate()` function returns an ID that can be used to cancel the call via `clearImmediate()` if necessary.

It's also possible to pass arguments into the `setImmediate()` function argument by including them at the end:

    setImmediate(function(doc, win){
    
        //do something
    
    }, document, window);

Passing additional arguments in this way means that you needn't always use a closure with `setImmediate()` in order to have useful information available to the executing function.

## Advantages

What `setImmediate()` does is free the browser from needing to manage a timer for this process. Instead of waiting for a system interrupt, which uses more power, the browser can simply wait for the UI queue to empty and then insert the new JavaScript task. Node.js developers may recognize this functionality since `process.nextTick()` does the same thing in that environment.

Another advantage is that the specified function executes after a much smaller delay, without a need to wait for the next timer tick. That means the entire process completes much faster than with using `setTimeout(fn, 0)`.

## Browser support

Currently, only Internet Explorer 10 supports `setImmediate()`, and it does so through `msSetIntermediate()` since the specification is not yet finalized. The Internet Explorer 10 Test Drive site has a [`setImmediate()` example][5] that shows the improved performance using the new method. The example sorts values using a delay while the current state of the sort is displayed visually. This example requires Internet Explorer 10.

## The future

I'm very optimistic about the `setImmediate()` function and its value to web developers. Using timers for script yielding is a hack, for sure, and having an official way to yield scripts is a huge win for performance. I hope that other browsers quickly pick up on the implementation so we can start using this soon.

 [1]: https://humanwhocodes.com/blog/2009/08/11/timed-array-processing-in-javascript/
 [2]: http://www.belshe.com/2010/06/04/chrome-cranking-up-the-clock/
 [3]: http://msdn.microsoft.com/en-us/windows/hardware/gg463266
 [4]: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
 [5]: http://ie.microsoft.com/testdrive/Performance/setImmediateSorting/Default.html
