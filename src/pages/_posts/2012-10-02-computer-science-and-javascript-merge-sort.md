---
title: "Computer science in JavaScript: Merge sort"
author: Nicholas C. Zakas
permalink: /blog/2012/10/02/computer-science-and-javascript-merge-sort/
categories:
  - Web Development
tags:
  - Algorithms
  - Computer Science
  - JavaScript
  - Merge Sort
  - Sorting
---
Merge sort is arguably the first useful sorting algorithm you learn in computer science. Merge sort has a complexity of O(n log n), making it one of the more efficient sorting algorithms available. Additionally, merge sort is a stable sort (just like insertion sort) so that the relative order of equivalent items remains the same before and after the sort. These advantages are why Firefox and Safari use merge sort for their implementation of `Array.prototype.sort()`.

The algorithm for merge sort is based on the idea that it's easier to merge two already sorted lists than it is to deal with a single unsorted list. To that end, merge sort starts by creating n number of one item lists where n is the total number of items in the original list to sort. Then, the algorithm proceeds to combine these one item lists back into a single sorted list.

The merging of two lists that are already sorted is a pretty straightforward algorithm. Assume you have two lists, list A and list B. You start from the front of each list and compare the two values. Whichever value is smaller is inserted into the results array. So suppose the smaller value is from list A; that value is placed into the results array. Next, the second value from list A is compared to the first value in list B. Once again, the smaller of the two values is placed into the results list. So if the smaller value is now from list B, then the next step is to compare the second item from list A to the second item in list B. The code for this is:

    function merge(left, right){
        var result  = [],
            il      = 0,
            ir      = 0;
    
        while (il < left.length &#038;&#038; ir < right.length){
            if (left[il] < right[ir]){
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
            }
        }
    
        return result.concat(left.slice(il)).concat(right.slice(ir));
    }</code>

This function merges two arrays, `left` and `right`. The `il` variable keeps track of the index to compare for `left` while `ir` does the same for `right`. Each time a value from one array is added, its corresponding index variable is incremented. As soon as one of the arrays has been exhausted, then the remaining values are added to the end of the result array using `concat()`.

The `merge()` function is pretty simple but now you need two sorted lists to combine. As mentioned before, this is done by splitting an array into numerous one-item lists and then combining those lists systematically. This is easily done using a recursive algorithm such as this:

    function mergeSort(items){
    
        // Terminal case: 0 or 1 item arrays don't need sorting
        if (items.length < 2) {
            return items;
        }
    
        var middle = Math.floor(items.length / 2),
            left    = items.slice(0, middle),
            right   = items.slice(middle);
    
        return merge(mergeSort(left), mergeSort(right));
    }</code>

The first thing to note is the terminal case of an array that contains zero or one items. These arrays don't need to be sorted and can be returned as is. For arrays with two or more values, the array is first split in half creating `left` and `right` arrays. Each of these arrays is then passed back into `mergeSort()` with the results passed into `merge()`. So the algorithm is first sorting the left half of the array, then sorting the right half of the array, then merging the results. Through this recursion, eventually you'll get to a point where two single-value arrays are merged.

This implementation of merge sort returns a different array than the one that was passed in (this is not an &#8220;in-place&#8221; sort). If you would like to create an in-place sort, then you can always empty the original array and refill it with the sorted items:

    function mergeSort(items){
    
        if (items.length < 2) {
            return items;
        }
    
        var middle = Math.floor(items.length / 2),
            left    = items.slice(0, middle),
            right   = items.slice(middle),
            params = merge(mergeSort(left), mergeSort(right));
        
        // Add the arguments to replace everything between 0 and last item in the array
        params.unshift(0, items.length);
        items.splice.apply(items, params);
        return items;
    }</code>

This version of the `mergeSort()` function stores the results of the sort in a variable called `params`. The best way to replace items in an array is using the `splice()` method, which accepts two or more arguments. The first argument is the index of the first value to replace and the second argument is the number of values to replace. Each subsequent argument is the value to be inserted in that position. Since there is no way to pass an array of values into `splice()`, you need to use `apply()` and pass in the first two arguments combined with the sorted array. So, `` and `items.length` are added to the front of the array using `unshift()` so that `apply()` can be used with `splice()`. Then, the original array is returned.

Merge sort may be the most useful sorting algorithm you will learn because of its good performance and easy implementation. As with the other sorting algorithms I've covered, it's still best to start with the native `Array.prototype.sort()` before attempting to implement an additional algorithm yourself. In most cases, the native method will do the right thing and provide the fastest possible implementation. Note, however, that not all implementations use a stable sorting algorithm. If using a stable sorting algorithm is important to you then you will need to implement one yourself.

You can get both versions of `mergeSort()` from my GitHub project, [Computer Science in JavaScript][1].

 [1]: http://github.com/nzakas/computer-science-in-javascript/
