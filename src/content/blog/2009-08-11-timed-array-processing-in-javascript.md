---
title: Timed array processing in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2009/08/11/timed-array-processing-in-javascript/
categories:
  - Web Development
tags:
  - JavaScript
  - Performance
---
Not too long ago, I [blogged][1] about a way to asynchronously process JavaScript arrays to avoid locking up the browser (and further, to avoid displaying the [long-running script dialog][2]). The `chunk()` function referenced in that original blog post is as follows:

    function chunk(array, process, context){
        var items = array.concat();   //clone the array
        setTimeout(function(){
            var item = items.shift();
            process.call(context, item);
    
            if (items.length > 0){
                setTimeout(arguments.callee, 100);
            }
        }, 100);
    }

This method was an example implementation and has a couple of performance issues. First, the size of the delay is too long for large arrays. Using a 100 millisecond delay on an array of 100 items means that processing takes at least 10,000 milliseconds or 10 seconds. The delay should really be decreased to 25 milliseconds. This is the minimum delay that I recommend to avoid browser timer resolution issues. Internet Explorer's timer resolution is 15 milliseconds, so specifying 15 milliseconds will be either 0 or 15, depending on when the system time was set last. You really don't want 0 because this doesn't given enough time for UI updates before the next batch of JavaScript code begins processing. Specifying a delay of 25 milliseconds gives you a guarantee of at least a 15 millisecond delay and a maximum of 30.

Still, with a delay of 25 milliseconds, processing of an array with 100 items will take at least 2,500 milliseconds or 2.5 seconds, still pretty long. In reality, the whole point of `chunk()` is to ensure that you don't hit the long-running script limit. The problem is that the long-running script limit kicks in well after the point at which the user has experienced the UI as frozen.

## Room for improvement

Jakob Nielsen stated in his paper, [<cite>Response Times: The Three Important Limits</cite>][3], that 0.1 seconds (100 milliseconds) is &#8220;is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.&#8221; Since the UI cannot be updated while JavaScript is executing, that means your JavaScript code should never take more than 100 milliseconds to execute continuously. This limit is much smaller than the long-running script limit in web browsers.

I'd actually take this one step further and say that no script should run continuously for more than 50 milliseconds. Above that, you're trending close to the limit and could inadvertently affect the user experience. I've found 50 milliseconds to be enough time for most JavaScript operations and a good cut-off point when code is taking too long to execute.

Using this knowledge, you can create a better version of the `chunk()` function:

    //Copyright 2009 Nicholas C. Zakas. All rights reserved.
    //MIT Licensed
    function timedChunk(items, process, context, callback){
        var todo = items.concat();   //create a clone of the original
    
        setTimeout(function(){
    
            var start = +new Date();
    
            do {
                 process.call(context, todo.shift());
            } while (todo.length > 0 && (+new Date() - start < 50));
    
            if (todo.length > 0){
                setTimeout(arguments.callee, 25);
            } else {
                callback(items);
            }
        }, 25);
    }

This new version of the function inserts a `do-while` loop that will continuously process items until there are no further items to process or until the code has been executing for 50 milliseconds. Once that loop is complete, the logic is exactly the same: create a new timer if there's more items to process. The addition of a callback function allows notification when all items have been processed.

I set up a test to compare these two methods as they processed an array with 500 items and the results are overwhelming: `timedChunk()` frequently takes less than 10% of the time of `chunk()` to completely process all of the items. [Try it][4] for yourself. Note that neither process causes the browser to appear frozen or locked up.

## Conclusion

Even though the original `chunk()` method was useful for processing small arrays, it has a performance impact when dealing with large arrays due to the extraordinary amount of time it takes to completely process the array. The new `timedChunk()` method is better suited for processing large arrays in the smallest amount of time without affecting the user experience.

 [1]: https://humanwhocodes.com/blog/2009/01/13/speed-up-your-javascript-part-1/
 [2]: https://humanwhocodes.com/blog/2009/01/05/what-determines-that-a-script-is-long-running/
 [3]: http://www.useit.com/papers/responsetime.html
 [4]: https://humanwhocodes.com/experiments/javascript/performance/array-processing/
