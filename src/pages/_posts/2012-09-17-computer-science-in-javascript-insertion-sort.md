---
title: 'Computer science in JavaScript: Insertion sort'
author: Nicholas C. Zakas
permalink: /blog/2012/09/17/computer-science-in-javascript-insertion-sort/
categories:
  - Software Development
tags:
  - Algorithms
  - Computer Science
  - JavaScript
  - Sorting
---
Insertion sort is typically the third sorting algorithm taught in computer science programs, after bubble sort<sup>[1]</sup> and selection sort<sup>[2]</sup>. Insertion sort has a best-case complexity of O(n), which is less complex than bubble and selection sort at O(n<sup>2</sup>). This is also the first stable sort algorithm taught.

Stable sort algorithms are sorts that don't change the order of equivalent items in the list. In bubble and selection sort, it's possible that equivalent items may end up in a different order than they are in the original list. You may be wondering why this matters if the items are equivalent. When sorting simple values, like numbers or strings, it is of no consequence. If you are sorting objects by a particular property, for example sorting `person` objects on an `age` property, there may be other associated data that should be in a particular order. 

Sorting algorithms that perform swaps are inherently unstable. Items are always moving around and so you can't guarantee any previous ordering will be maintained. Insertion sort doesn't perform swaps. Instead, it picks out individual items and inserts them into the correct spot in an array.

An insertion sort works by separating an array into two sections, a sorted section and an unsorted section. Initially, of course, the entire array is unsorted. The sorted section is then considered to be empty. The first step is to add a value to the sorted section, so the first item in the array is used (a list of one item is always sorted). Then at each item in the unsorted section:

  1. If the item value goes after the last item in the sorted section, then do nothing. 
  2. If the item value goes before the last item in the sorted section, remove the item value from the array and shift the last sorted item into the now-vacant spot.
  3. Compare the item value to the previous value (second to last) in the sorted section.
  4. If the item value goes after the previous value and before the last value, then place the item into the open spot between them, otherwise, continue this process until the start of the array is reached.

Insertion sort is a little bit difficult to explain in words. It's a bit easier to explain using an example. Suppose you have the following array:

    var items = [5, 2, 6, 1, 3, 9];

To start, the 5 is placed into the sorted section. The 2 then becomes the value to place. Since 5 is greater than 2, the 5 shifts over to the right one spot, overwriting the 2. This frees up a new spot at the beginning of the sorted section into which the 2 can be placed. See the figure below for a visualization of this process (boxes in yellow are part of the sorted section, boxes in white are unsorted).

<div style="text-align:center">
  <a href="/images/wp-content/uploads/2012/09/insertionsort.png"><img src="{{site.url}}/blog/wp-content/uploads/2012/09/insertionsort.png" alt="Insertion sort of an array" width="600" height="485" /></a>
</div>

The process then continues with 6. Each subsequent value in the unsorted section goes through the same process until the entire array is in the correct order. This process can be represented fairly succinctly in JavaScript as follows:

    function insertionSort(items) {
    
        var len     = items.length,     // number of items in the array
            value,                      // the value currently being compared
            i,                          // index into unsorted section
            j;                          // index into sorted section
        
        for (i=0; i < len; i++) {
        
            // store the current value because it may shift later
            value = items[i];
            
            /*
             * Whenever the value in the sorted section is greater than the value
             * in the unsorted section, shift all items in the sorted section over
             * by one. This creates space in which to insert the value.
             */
            for (j=i-1; j > -1 &#038;&#038; items[j] > value; j--) {
                items[j+1] = items[j];
            }
    
            items[j+1] = value;
        }
        
        return items;
    }

The outer `for` loop moves from the front of the array towards the back while the inner loop moves from the back of the sorted section towards the front. The inner loop is also responsible for shifting items as comparisons happen. You can download the source code from my GitHub project, [Computer Science in JavaScript][1].

Insertion sort isn't terribly efficient with an average complexity of O(n<sup>2</sup>). That puts it on par with selection sort and bubble sort in terms of performance. These three sorting algorithms typically begin a discussion about sorting algorithms even though you would never use them in real life. If you need to sort items in JavaScript, you are best off starting with the built-in `Array.prototype.sort()` method before trying other algorithms. V8, the JavaScript engine in Chrome, actually uses insertion sort for sorting items with 10 or fewer items using `Array.prototype.sort()`.


  1. [Computer science in JavaScript: Bubble sort][2]
  2. [Computer science in JavaScript: Selection sort][3]

 [1]: http://github.com/nzakas/computer-science-in-javascript/
 [2]: {{site.url}}/blog/2009/05/26/computer-science-in-javascript-bubble-sort/
 [3]: {{site.url}}/blog/2009/09/08/computer-science-in-javascript-selection-sort/
