---
title: Speed up your JavaScript, Part 1
author: Nicholas C. Zakas
permalink: /blog/2009/01/13/speed-up-your-javascript-part-1/
categories:
  - Uncategorized
tags:
  - Arrays
  - JavaScript
  - Long-Running Script
  - Performance
---
In my [last post][1], I talked about the conditions under which the dreaded long-running script dialog is displayed in browsers. Browsers will stop executing script either when they've executed too many statements (Internet Explorer) or when the JavaScript engine has been running for a specific amount of time (others). The problem, of course, isn't the way that the browser is detecting long-running scripts, it's that the script is taking too long to execute.

There are four main reasons why a script can take too long to execute:

  1. Too much happening in a loop.
  2. Too much happening in a function.
  3. Too much recursion.
  4. Too much DOM interaction.

In this post, I'm going to focus on the first issue: too much happening in a loop. Loop iterations happen synchronously, so the amount of time it takes to fully execute the loop is directly related to the number of iterations. There are, therefore, two situations that cause loops to run too long and lock up the browser. The first is that the loop body is doing too much for each iteration and the second is that the loop is running too many times. These can cause the browser to lock up and display the long-running script warning.

The secret to unraveling this problem is to evaluate the loop to answer two questions:

  1. Does the loop have to execute synchronously?
  2. Does the order in which the loop's data is processed matter?

If the answer to both of these questions is &#8220;no,&#8221; then you have some options for splitting up the work done in the loop. The key is to examine the code closely to answer these questions. A typical loop looks like this:

    for(var i=0; i < items.length; i++){
        process(items[i]);
    }

This doesn't look too bad though may take very long depending on the amount of time necessary to run the `process()` function. If there's no code immediately after the loop that depends on the results of the loop executing, then the answer to the first question is &#8220;no.&#8221; You can clearly see that each iteration through the loop isn't dependent on the previous iteration because it's just dealing with one value at a time, so the answer to the second question is &#8220;no.&#8221; That means the loop can be split in a way that can free up the browser and avoid long-running script warnings.

In [Professional JavaScript, Second Edition][2], I introduce the following function as a way to deal with loops that may take a significant amount of time to execute:

    function chunk(array, process, context){
        setTimeout(function(){
            var item = array.shift();
            process.call(context, item);
    
            if (array.length > 0){
                setTimeout(arguments.callee, 100);
            }
        }, 100);
    }

The `chunk()` function is designed to process an array in small chunks (hence the name), and accepts three arguments: a &#8220;to do&#8221; list of items, the function to process each item, and an optional context variable for setting the value of `this` within the `process()` function. A timer is used to delay the processing of each item (100ms in this case, but feel free to alter for your specific use). Each time through, the first item in the array is removed and passed to the `process()` function. If there's still items left to process, another timer is used to repeat the process. The loop described earlier can be rewritten to use this function:

    chunk(items, process);

Note that the array is used as a queue and so is changed each time through the loop. If you want to maintain the array's original state, there are two options. First, you can use the `concat()` method to clone the array before passing it into the function:

    chunk(items.concat(), process);

The second option is to change the `chunk()` function to do this automatically:

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

Note that this approach is safer than just saving an index and moving through the exist array, since the contents of the array that was passed in may change before the next timer is run.

The `chunk()` method presented here is just a starting point for how to deal with loop performance. You can certainly change it to provide more features, for instance, a callback method to execute when all items have been processed. Regardless of the changes you may or may not need to make to the function, it is a general pattern that can help optimize array processing to avoid long-running script warnings.

## Translations

  * [Chinese (Simplified)][3][  
    ][3]

 [1]: https://humanwhocodes.com/blog/2009/01/05/what-determines-that-a-script-is-long-running/ "What determines that a script is long running?"
 [2]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
 [3]: http://cuimingda.com/2009/01/speed-up-your-javascript-part-1.html
