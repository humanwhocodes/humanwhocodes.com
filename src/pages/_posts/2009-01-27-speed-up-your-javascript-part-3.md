---
title: Speed up your JavaScript, Part 3
author: Nicholas C. Zakas
permalink: /blog/2009/01/27/speed-up-your-javascript-part-3/
categories:
  - Web Development
tags:
  - Iteration
  - JavaScript
  - Memoization
  - Performance
  - Recursion
---
Recursion is the enemy of fast-running scripts. Too much recursion can cause the browser to grind to a halt or quit unexpectedly, and so must be addressed a serious performance problem in JavaScript. In [part 2][1] of this series, I wrote briefly about handling too much recursion in a function through memoization. Memoization is a technique for caching previously calculated values so that they need not be recalculated; when a recursive function is doing such a calculation, memoization is incredibly useful. The memoizer I presented was Crockford&#8217;s, and is useful primarily for recursive functions that return integers. All recursive functions, of course, don&#8217;t return integers. A more generic `memoizer()` function can be created to deal with any type of recursive function:

    function memoizer(fundamental, cache){
        cache = cache || {}
        var shell = function(arg){
            if (!cache.hasOwnProperty(arg)){
                cache[arg] = fundamental(shell, arg)
            }
            return cache[arg];
        };
        return shell;
    }
    

This version of the function is a bit different than Crockford&#8217;s. First, the order of arguments has been reversed with the original function as the first argument and an optional `cache` object as the second argument. Not all recursive functions are seeded with initial information, so making that argument optional makes sense. Inside, I&#8217;ve changed the caching data type from an array to an object, which makes this version applicable to recursive functions that return non-integer results. Inside the `shell` function, I&#8217;m using the `hasOwnProperty()` method to see if the argument already has a `cache` entry. This is safer than testing if the type of value isn&#8217;t `undefined` since `undefined` is a valid return value. Example usage with the previous Fibonacci example:

    var fibonacci =
        memoizer(function (recur, n) {
           return recur(n - 1) + recur(n - 2);
        }, {"0":0, "1":1});
    

Once again, a call to `fibonacci(40)` results in only 40 calls of the original function instead of 331,160,280. Memoization works great for recursive algorithms with a strictly defined result set. There are, however, other recursive algorithms that don&#8217;t lend themselves to optimization through memoization.

One of my professors in college insisted that anything written using recursion could also be written using iteration if necessary. Indeed, recursion and iteration are often considered remedies for one another when one is seen as a problem. The techniques for converting a recursive algorithm into an iterative algorithm are the same regardless of the programming language; the importance in JavaScript is greater, though, because the resources of the execution environment are so restrictive. Consider a typical recursive algorithm such as a merge sort. In JavaScript, it may be written like this:

    function merge(left, right){
        var result = [];
    
        while (left.length > 0 && right.length > 0){
            if (left[0] < right[0]){
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
    
        return result.concat(left).concat(right);
    }
    
    //recursive merge sort algorithm
    function mergeSort(items){
    
        if (items.length == 1) {
            return items;
        }
    
        var middle = Math.floor(items.length / 2),
            left    = items.slice(0, middle),
            right   = items.slice(middle);
    
        return merge(mergeSort(left), mergeSort(right));
    }

Calling the `mergeSort()` function on an array returns an array of the items sorted in correct order. Note that for each call to `mergeSort()` there are two recursive calls. This algorithm won&#8217;t benefit from memoization because each result is only calculated once and, therefore, caching the results doesn&#8217;t help. If you were to call `mergeSort()` on an array with 100 items, there would be 199 calls total; a 1,000 item array would result in 1,999 calls. The solution in this case is to convert the recursive algorithm into an iterative one, which means introducing some loops (algorithm credit: [List Processing: Sort Again, Naturally][2]):

    //iterative merge sort algorithm
    function mergeSort(items){
        if (items.length == 1) {
            return items;
        }
    
        var work = [];
        for (var i=0, len=items.length; i < len; i++){
            work.push([items[i]]);
        }
        work.push([]);  //in case of odd number of items
    
        for (var lim=len; lim > 1; lim = Math.floor((lim+1)/2)){
            for (var j=0,k=0; k < lim; j++, k+=2){
                work[j] = merge(work[k], work[k+1]);
            }
            work[j] = [];  //in case of odd number of items
        }
    
        return work[0];
    }

This implementation of the merge sort algorithm uses a series of loops instead of recursion to sort the array. Since merge sort works by first breaking down an array into several one-item arrays, this method does that explicitly instead of implicitly via recursive calls. The `work` array is initially an array of one-item arrays. The loops enable the merging of two arrays at a time, placing the result back into the `work` array. When the function has done its job, the result is stored in the first position of `work` and is returned. In this version of merge sort, there is no recursion. It does, however, introduce a large number of loops based on the number of items in the array, so it may be worth revisiting the techniques discussed in [part 2][1] to handle the extra overhead.

The bottom line: always be on the look out for recursion in your JavaScript. Memoization and iteration are two ways to avoid excessive recursion and the [long-running script dialog][3].

## Translations

  * [Chinese (Simplified)][4][  
    ][4]

 [1]: {{site.url}}/blog/2009/01/20/speed-up-your-javascript-part-2/
 [2]: http://penguin.ewu.edu/~trolfe/NaturalMerge/NatMerge.html
 [3]: {{site.url}}/blog/2009/01/05/what-determines-that-a-script-is-long-running/ "What determines that a script is long running?"
 [4]: http://cuimingda.com/2009/02/speed-up-your-javascript-part-3.html
