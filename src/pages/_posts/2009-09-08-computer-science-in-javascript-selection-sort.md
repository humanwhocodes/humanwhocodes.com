---
title: 'Computer science in JavaScript: Selection sort'
author: Nicholas C. Zakas
permalink: /blog/2009/09/08/computer-science-in-javascript-selection-sort/
categories:
  - Web Development
tags:
  - Algorithms
  - Computer Science
  - JavaScript
  - Sorting
---
Not too long ago, I wrote about the [bubble sort][1] algorithm, which is typically the starting point for sorting algorithm instruction. Bubble sort is a pretty inefficient algorithm with O(n<sup>2</sup>) complexity and its algorithm calls for comparing each array item to its neighbor in order to &#8220;bubble&#8221; the smallest value to the top (front) of the array.

The selection sort algorithm, also with O(n<sup>2</sup>) complexity, augments that algorithm slightly. Instead of comparing each array item to its neighbor, the goal is to locate the smallest remaining value and drop it into the correct place in the array. The basic algorithm looks like this:

  1. Assume the first item is the smallest value.
  2. Compare this item to the second item.
  3. If the second item is smaller than the first, set the second item as the new minimum.
  4. Continue until the end of the data set is reached.
  5. If the minimum value is not the item you started with, swap them.

This process is repeated by moving to the second item, then the third, etc. until the entire array has been sorted. To better illustrate the algorithm, consider an array `["b", "a", "d", "c", "e"]`.

If this array were to be sorted into ascending order, the first step would be to set the minimum as index 0. Next, compare &#8220;b&#8221; to &#8220;a&#8221;. Since &#8220;a&#8221; comes before &#8220;b&#8221;, the minimum is set to index 1. The letter &#8220;a&#8221; is then compared to each item in the array, but since it is the smallest value, the minimum index remains at 1. Once this pass has been made, the minimum index of 1 is compared to the starting index of 0, and since they&#8217;re different, the values in these two positions are swapped, giving a result of `["a", "b", "d", "c", "e"]`.

Next, the algorithm starts at the second position, &#8220;b&#8221;, and the minimum index is set to 1. The value is compared to each of the others and no change is made because &#8220;b&#8221; is already in the correct position. Since the starting index and the minimum index are both 1, no swap is made. The third pass starts at &#8220;d&#8221; and compares against &#8220;c&#8221;, changing the minimum to 3. At the end of the pass, 2 and 3 are swapped, resulting in `["a", "b", "c", "d", "e"]`. The last two passes result in no swaps because everything is in the correct location. To make it clearer,Â  check out [this video][2] for an example using playing cards.

The selection sort uses the same `swap()` function as the bubble sort:

    function swap(items, firstIndex, secondIndex){
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }

An implementation of selection sort is pretty easy. Similar to bubble sort, it uses two loops to accomplish the task (ultimately resulting in the O(n<sup>2</sup>) complexity):

    function selectionSort(items){
    
        var len = items.length,
            min;
    
        for (i=0; i < len; i++){
    
            //set minimum to this position
            min = i;
    
            //check the rest of the array to see if anything is smaller
            for (j=i+1; j < len; j++){
                if (items[j] < items[min]){
                    min = j;
                }
            }
    
            //if the minimum isn't in the position, swap it
            if (i != min){
                swap(items, i, min);
            }
        }
    
        return items;
    }

The outer loop controls the starting point for each pass, beginning at the first item in the array and making its way towards the last item. The inner loop controls which items are being compared. After each pass, the items at the beginning of the array are already in their correct spots and so there is no need to re-evaluate them.

You can download the source code from my GitHub project, [Computer Science in JavaScript][3].

As with bubble sort, selection sort isn&#8217;t something you&#8217;re likely to use in a real-world environment. This post is just a discussion of the algorithm for instructional purposes only. There is rarely a time when the built-in `Array.prototype.sort()` method isn&#8217;t suitable, so always use that first.

 [1]: {{site.url}}/blog/2009/05/26/computer-science-in-javascript-bubble-sort/
 [2]: http://www.youtube.com/watch?v=TW3_7cD9L1A
 [3]: http://github.com/nzakas/computer-science-in-javascript/
