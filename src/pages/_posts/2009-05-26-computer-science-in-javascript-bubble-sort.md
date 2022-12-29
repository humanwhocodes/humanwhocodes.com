---
title: 'Computer science in JavaScript: Bubble sort'
author: Nicholas C. Zakas
permalink: /blog/2009/05/26/computer-science-in-javascript-bubble-sort/
categories:
  - Web Development
tags:
  - Algorithms
  - Computer Science
  - JavaScript
  - Sorting
---
Sorting algorithms are one of the cornerstones of computer science education. The purpose isn&#8217;t to teach you a dozens different ways to sort data when you&#8217;ll never need to implement them by hand in your professional life. Instead, they are used as a tool to teach algorithm theory, to show you that there are multiple ways to solve a single problem. And so I begin doing the same with JavaScript and bubble sort.

Bubble sort is usually the first sorting algorithm taught because it is one of the least efficient and yet easiest to conceptually understand. The basic idea is to compare items, two at a time, and make sure that they are in the correct order before moving on to other items. At the end of each pass, a value &#8220;bubbles&#8221; into the correct position, ultimately leaving only the other items to sort. The basic algorithm is as follows:

  1. Compare the first item to the second item.
  2. If the first item should be after the second item, swap them.
  3. Compare the second item to the third item.
  4. If the second item should be after the third item, swap them.
  5. Continue until the end of the data set is reached.

This process is then repeated a number of times until the data set is completely sorted. With each pass, fewer items need to be evaluated because each pass leaves at least one item in the correct final position. To better illustrate the algorithm, consider an array `[3, 2, 4, 5, 1]`.

If this array were to be sorted into ascending order, the first step would be to compare 3 and 2. Since 3 should be after 2, the items are swapped, resulting in `[2, 3, 4, 5, 1]`. Next, 3 is compared with 4. Since there are already arranged appropriately, no change is made. Then, 4 is compared with 5 and once again no action is taken. The last step is to compare 5 with 1, and since they are out of order, swap them. This results in `[2, 3, 4, 1, 5]`. This completes the first pass and the last item in the array is now in the correct permanent spot, so the next pass can leave out that last item.

And so we begin again, comparing 2 and 3 (no swap), 3 and 4 (no swap), and 4 and 1 (out of order so swap them) with the result being `[2, 3, 1, 4, 5]`. This completes the second pass and now the last two items are in proper order. The third pass just does two comparisons, 2 and 3 (no swap) and then 3 and 1 (swap), resulting in `[2, 1, 3, 4, 5]`. Now, the last three items are in the correct order. The last pass simply compares 2 and 1 (swap), ultimately ending up with a result of `[1, 2, 3, 4, 5]`. You can also check out [this video][1] for a nice graphical depiction of how the algorithm works.

The first step in implementing bubble sort is to create a method to swap two items in an array. This method is common to a lot of the less-efficient sorting algorithms. A simple JavaScript implementation is:

    function swap(items, firstIndex, secondIndex){
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }

As mentioned before, this algorithm is incredibly inefficient because it requires so many interactions with the data: for every *n* items in the array, there must be *n<sup>2</sup> * operations to implement the algorithm. This is pretty straightforward to implement in code by having a loop inside of another loop:

    function bubbleSort(items){
    
        var len = items.length,
            i, j, stop;
    
        for (i=0; i < len; i++){
            for (j=0, stop=len-i; j < stop; j++){
                if (items[j] > items[j+1]){
                    swap(items, j, j+1);
                }
            }
        }
    
        return items;
    }

The outer loop controls how many passes are made over the array while the inner loop actually performs comparison of array items. The inner loop determines at which item to stop the comparisons by using the outer loop count and subtracting it from the total number of items in the array. While there are ways to slightly boost the performance of bubble sort, such as keeping track of whether or not any swapping has occurred, this is the simplest implementation of the algorithm.

An alternative form of bubble sort can be accomplished by going through the array in the reverse order, so the items at the front of the array are placed in order first. To do so, simply reverse the loops:

    function bubbleSort(items){
        var len = items.length,
            i, j;
    
        for (i=len-1; i >= 0; i--){
            for (j=len-i; j >= 0; j--){
                if (items[j] < items[j-1]){
                    swap(items, j, j-1);
                }
            }
        }
    
        return items;
    }

Both versions are available on my GitHub project, [Computer Science in JavaScript][2].

Once again, bubble sort isn&#8217;t something you&#8217;re likely to use during the course of your professional career. It is simply a tool to gain a greater understanding of algorithms and a foundation on which to build further knowledge. The built-in `Array.prototype.sort()` method should be used in almost all cases, as it performs the job quickly efficiently.

 [1]: http://www.youtube.com/watch?v=ddWtW1ceHDQ&NR=1
 [2]: http://github.com/nzakas/computer-science-in-javascript/
