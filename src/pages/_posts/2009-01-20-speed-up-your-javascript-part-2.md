---
title: Speed up your JavaScript, Part 2
author: Nicholas C. Zakas
permalink: /blog/2009/01/20/speed-up-your-javascript-part-2/
categories:
  - Web Development
tags:
  - JavaScript
  - Loops
  - Memoization
  - Performance
  - Recursion
---
Last week, I covered the first reason why JavaScript can take too long to execute: [too much happening in a loop][1]. There's a similar problem with functions in that sometimes they're just doing too much. Usually this means there's too many loops (as opposed to too much happening in a loop), too much recursion, or simply too many different operations being performed.

Too many loops are often caused by having loops inside of loops, locking up the JavaScript engine until all iterations are complete. The most glaring example of this is the bubble sort algorithm. Though there's no need to use this in JavaScript due to the native `sort()` method, it's good to understand how it can be problematic so that you can identify similar patterns. A typical implementation of a bubble sort in JavaScript looks like this:

    function bubbleSort(items){
        for (var i=items.length-1; i >= 0; i--){
            for (var j=items.length-i; j >= 0; j--){
                if (items[j] < items[j-1]){
                    var temp = items[j];
                    items[j] = items[j-1];
                    items[j-1] = temp;
                }
            }
        }
    }

Thinking back to your computer science days, you'll probably remember that bubble sort is one of the least efficient sorting algorithms. The problem is for every *n* items in the array, there must be *n<sup>2</sup> * loop iterations. This processing can take forever if there's a large amount of array items. The comparison and swap operation done during the inner loop is actually quite simple, it's just the number of times that it's repeated in sequence that causes the problem. This can cause the browser to grind to a halt and, potentially, result in the long-running script dialog.

A couple years ago, fellow Yahoo Julien Lecomte wrote a post entitled,  
[Running CPU Intensive JavaScript Computations in a Web Browser][2], in which he described how to break up large JavaScript operations into several parts. One of his clearest examples was refactoring a bubble sort into multiple steps, each of which executes a single trip through the array. I've augmented his code somewhat, but the approach remains the same:

    function bubbleSort(array, onComplete){
    
        var pos = 0;
    
        (function(){
            var j, value;
    
            for (j=array.length; j > pos; j--){
                if (array[j] < array[j-1]){
                    value = data[j];
                    data[j] = data[j-1];
                    data[j-1] = value;
                }
            }
    
            pos++;
    
            if (pos < array.length){
                setTimeout(arguments.callee,10);
            } else {
                onComplete();
            }
        })();
    }

This function performs a bubble sort in an asynchronous manner, stopping after each trip through the array before continuing on to the next leg. The `onComplete()` function is called when the array is completely sorted as notification that the data is ready. The `bubbleSort()` function uses the same basic technique as the `chunk()` function presented in my last post: use an anonymous function to wrap the behavior and then pass `arguments.callee` into `setTimeout()` to repeat the process until complete. This function is a good example of how you can split up embedded loops into a series of steps to free up the browser.

A similar problem is too much recursion. Each additional recursive call takes up memory, and eventually will slow down the browser. The annoying thing is that you may reach a memory limit before the long-running script dialog pops up and leave the browser in an unusable state. Crockford had a good discussion about this in his [latest talk][3]. The example he uses is a function that generates a Fibonacci sequence:

    function fibonacci (n) {
        return n < 2 ? n :
                fibonacci(n - 1) +
                fibonacci(n - 2);
    };

As Crockford points out, a call to `fibonacci(40)` results in 331,160,280 calls to itself. The solution to avoid too much recursion is to use [memoization][4], a technique for caching previously-calculated values. Crockford introduces the following memoization function that can be used to create memoized versions of functions dealing with numbers:

    function memoizer(memo, fundamental) {
        var shell = function (n) {
            var result = memo[n];
            if (typeof result !== 'number') {
                result = fundamental(shell, n);
                memo[n] = result;
            }
            return result;
        };
        return shell;
    };

He then applies this to the Fibonacci sequence generator:

    var fibonacci =
        memoizer([0, 1], function (recur, n) {
           return recur(n - 1) + recur(n - 2);
        });
    

Calling `fibonacci(40)` using this code results in only 40 calls to the function, a vast improvement over the original. The overall lesson from memoization is that you should never calculate the same result twice; if there's a value you'll need more than once, store it for later use rather than running the code to generate it again.

The final thing that causes functions to execute slowly is, as mentioned previously, that it's just doing too much. Usually it's because of a pattern such as this:

    function doAlot(){
        doSomething();
        doSomethingElse();
        doOneMoreThing();
    }

Here, there's three clearly distinct pieces of code that are being executed. The important thing to notice is that none of the functions rely on the other functions to complete their task; they are essentially independent of one another and just need to happen in sequence at a given point in time. In situations like this, you can use a variant of the `chunk()` method to execute a series of functions in a row without holding up the browser:

    
    function schedule(functions, context){
        setTimeout(function(){
            var process = functions.shift();
            process.call(context);
    
            if (functions.length > 0){
                setTimeout(arguments.callee, 100);
            }
        }, 100);
    }
    

The `schedule` function accepts two arguments, an array of functions to execute and a context object indicating the value of `this` inside of each function. The `functions` array acts as a queue, with the topmost function being removed and executed each time the timer is executed. This function can be used to execute a series of functions in a row like this:

    schedule([doSomething, doSomethingElse, doOneMoreThing], window);

I'm expecting that JavaScript libraries will soon start including more processing functions such as this. YUI has already added the [Queue][5] object in version 3.0 that helps to manage the running of several functions in a row using a timer.

Regardless of the tools available to help split up complex processes, it's still vital for developers to be able to understand and identify bottlenecks that will benefit from using this approach. Whether there be too many loops, too much recursion, or just plain too much going on, you now know how to deal with each. Remember, the techniques and functions presented here are just a starting point and not a golden bullet, you should (and will likely have to) modify the code presented so that it works for your specific usage.

**Update (1/20):** Fixed copy/paste error in `schedule()` function.

## Translations

  * [Chinese (Simplified)][6][  
    ][7]

 [1]: {{site.url}}/blog/2009/01/13/speed-up-your-javascript-part-1/ "Speed up your JavaScript, Part 1"
 [2]: http://www.julienlecomte.net/blog/2007/10/28/
 [3]: http://yuiblog.com/blog/2008/12/23/video-crockford-performance/ "JavaScript Performance"
 [4]: http://en.wikipedia.org/wiki/Memoization
 [5]: http://developer.yahoo.com/yui/3/queue/
 [6]: http://cuimingda.com/2009/01/speed-up-your-javascript-part-2.html
 [7]: {{site.url}}/blog/2009/01/20/speed-up-your-javascript-part-2/
