---
title: "Computer science in JavaScript: Binary search"
author: Nicholas C. Zakas
permalink: /blog/2009/09/01/computer-science-in-javascript-binary-search/
categories:
  - Web Development
tags:
  - Algorithms
  - Binary Search
  - Computer Science
  - JavaScript
---
Not too long ago, I posted about creating a binary search tree in JavaScript ([part 1][1], [part 2][2]). A binary search tree is a great place to store data in an ordered way to allow for an easy search for specific information. However, a binary search tree isn't the only place that a binary search can be useful. You can use a binary search with any ordered set of data to perform a more efficient search of the data.

## Binary search algorithm

As a quick re-introduction, a binary search algorithm works by evaluating a value in a set and determining if it is equal to, less than, or greater than the value for which you're searching. If the value to find is less than the value being checked, then the search must continue in all values less than the current one. Likewise, if the value to find is greater than the checked value, the search must continue in all values greater than the current one. And of course, if the value matches the one for which you're searching, then the search ends. The basic algorithm, then, can be described as:

  1. If currentValue equals value, you're done.
  2. If value is less than currentValue, go left. Go to step 1.
  3. If value is greater than currentValue, go right. Go to step 1.

This may be an over-simplification, but the basics are all there. You are constantly limiting the search area when the specified value isn't found. Instead of searching in all locations, you're narrowing down the possibilities based on knowing that the data is ordered.

## Searching an array

Since a binary search can be performed on any ordered set of data, it makes sense that one can be performed on an array in which the items are sorted. To do this, you essentially treat the array as if it were a binary search tree, separating each step of the process into a current value, a path to the left, and a path to the right.

The search area of an array is defined by two values, a starting index and a stopping index (sometimes called a min and a max). These represent the furthest left path and the furthest right path, respectively. The starting and stopping indices are used to calculate the middle index, which is equidistant between the two extremes. At each step of the algorithm, the value in the middle index of the array is evaluated to determine what to do next. If the specified value is less than the current value, the stopping index is adjusted down to the middle minus one; if the specified value is greater than the current value, the starting index is adjusted up to be the middle plus one. The search then continues by calculating a new middle and repeating the process.

To make this more concrete, consider an array with ten letters, the numbers &#8220;a&#8221; to &#8220;j&#8221;, and you want to find the letter &#8220;i&#8221;. In the beginning, the starting index is 0, the stopping index is 9, and so the middle is 4 (obtained by adding the starting index and the stopping index, then dividing by two and eliminating the decimal remainder). The first array item that is checked is the item in index 4, which contains the letter &#8220;d&#8221;. Since &#8220;i&#8221; comes after &#8220;d&#8221;, the starting index is set to 5 (one more than the middle) and the new middle index becomes 7 (again, stopping index plus starting index divided by two). Now, the value in index 7 is checked, which is the letter &#8220;h&#8221;. Once more, the search needs to go right so the starting index is set to 8 and the new middle is also 8 (since 8+9/2 is 8.5, you eliminate the decimal). The item in index 8 is, in fact, the letter &#8220;i&#8221; and so the search stops.

The problem is that sometimes the item you're searching for doesn't exist, and in that case you need to know when to stop. You stop when the starting index and the stopping index are the same, therefore making the middle the same value as each. At that point, if the value at the middle index isn't the value you're searching for, then the item doesn't exist. In the previous example, searching for &#8220;z&#8221; would ultimately result in all three indices being 9.

## The code

With all of that explanation out of the way, the actual code for a binary search of an array is pretty straightforward:

    //Copyright 2009 Nicholas C. Zakas. All rights reserved.
    //MIT-Licensed, see source file
    function binarySearch(items, value){
    
        var startIndex  = 0,
            stopIndex   = items.length - 1,
            middle      = Math.floor((stopIndex + startIndex)/2);
    
        while(items[middle] != value && startIndex < stopIndex){
    
            //adjust search area
            if (value < items[middle]){
                stopIndex = middle - 1;
            } else if (value > items[middle]){
                startIndex = middle + 1;
            }
    
            //recalculate middle
            middle = Math.floor((stopIndex + startIndex)/2);
        }
    
        //make sure it's the right value
        return (items[middle] != value) ? -1 : middle;
    }

Each of the indices is calculated up front, then adjusted each time through the loop. The control condition on the loop ensures that the loop is exited if either the value is found or the starting and stopping indices have become equal. The `return` statement needs to check to see if the value was actually found or not in order to return the correct location (a missing value should return -1, as per array searching conventions). Example usage:

    var items = ["a","b","c","d","e","f","g","h","i","j"];
    alert(binarySearch(items, "i"));    //8
    alert(binarySearch(items, "b"));   //1

## Conclusion

Doing a binary search on a sorted array is, on average, more efficient than a linear search (traditional `indexOf()` implementation) because the maximum number of comparisons is kept small. A binary search has an efficiency of O(log n) while a linear search has an efficiency of O(n). As a point of comparison, a binary search on an array of 100,000 items performs a maximum of 16 comparisons while a linear search within the same array performs a maximum of 100,000 comparisons.

The complete source code for this is available via my GitHub project, [Computer Science in JavaScript][3].

 [1]: {{site.url}}/blog/2009/06/09/computer-science-in-javascript-binary-search-tree-part-1/
 [2]: {{site.url}}/blog/2009/06/16/computer-science-in-javascript-binary-search-tree-part-2/
 [3]: http://github.com/nzakas/computer-science-in-javascript
