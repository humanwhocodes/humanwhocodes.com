---
title: 'ECMAScript 6 collections, Part 1: Sets'
author: Nicholas C. Zakas
permalink: /blog/2012/09/25/ecmascript-6-collections-part-1-sets/
categories:
  - Web Development
tags:
  - Arrays
  - ECMAScript 6
  - JavaScript
  - Set
---
For most of JavaScript's history, there has been only one type of collection represented by the `Array` type. Arrays are used in JavaScript just like arrays and other languages but pull double and triple duty mimicking queues and stacks as well. Since arrays only use numeric indices, developers had to use objects whenever a non-numeric index was necessary. ECMAScript 6 introduces several new types of collections to allow better and more efficient storing of order data.

## Sets

Sets are nothing new if you come from languages such as Java, Ruby, or Python but have been missing from JavaScript. A set is in an ordered list of values that cannot contain duplicates. You typically don't access items in the set like you would items in an array, instead it's much more common to check the set to see if a value is present.

ECMAScript 6 introduces the `Set` type<sup>[1]</sup> as a set implementation for JavaScript. You can add values to a set by using the `add()` method and see how many items are in the set using `size`:

    var items = new Set();
    items.add(5);
    items.add("5");
    
    console.log(items.size);    // 2

ECMAScript 6 sets do not coerce values in determining whether or not to values are the same. So, a set can contain both the number `5` and the string `"5"` (internally, the comparison is done using `===`). If the `add()` method is called more than once with the same value, all calls after the first one are effectively ignored:

    var items = new Set();
    items.add(5);
    items.add("5");
    items.add(5);     // oops, duplicate - this is ignored
    
    console.log(items.size);    // 2

You can initialize the set using an array, and the `Set` constructor will ensure that only unique values are used:

    var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
    console.log(items.size);    // 5

In this example, an array with feed items is used to initialize the set. The number `5` Only appears once in the set even though it appears four times in the array. This functionality makes it easy to convert existing code or JSON structures to use sets.

You can test to see which items are in the set using the `has()` method:

    var items = new Set();
    items.add(5);
    items.add("5");
    
    console.log(items.has(5));    // true
    console.log(items.has(6));    // false

Last, you can remove an item from the set by using the `delete()` method:

    var items = new Set();
    items.add(5);
    items.add("5");
    
    console.log(items.has(5));    // true
    
    items.delete(5)
    
    console.log(items.has(5));    // false

Or, if you want to remove all items from the set, you can call `clear()`:

    var items = new Set();
    items.add(5);
    items.add("5");
    
    console.log(items.has(5));    // true
    
    items.clear()
    
    console.log(items.has(5));    // false

All of this amounts to a very easy mechanism for tracking unique unordered values.

## Iteration

Even though there is no random access to items in a set, it still possible to iterate over all of the sets values by using the new ECMAScript 6 `for-of` statement<sup>[2]</sup>. The `for-of` statement is a loop that iterates over values of a collection, including arrays and array-like structures. you can output values in a set like this:

    var items = new Set([1, 2, 3, 4, 5]);
    
    for (let num of items) {
        console.log(num);
    }

This code outputs each item in the set to the console in the order in which they were added to the set.

## Example

Currently, if you want to keep track of unique values, the most common approach is to use an object and assign the unique values as properties with some truthy value. For example, there is a CSS Lint<sup>[3]</sup> rule that looks for duplicate properties. Right now, an object is used to keep track of CSS properties such as this:

    var properties = {
        "width": 1,
        "height": 1
    };
    
    if (properties[someName]) {
        // do something
    }

Using an object for this purpose means always assigning a truthy value to a property so that the `if` statement works correctly (the other option is to use the `in` operator, but developers rarely do). This whole process can be made easier by using a set:

    var properties = new Set();
    properties.add("width");
    properties.add("height");
    
    if (properties.has(someName)) {
        // do something
    }

Since it only matters if the property was used before and not how many times it was used (there is no extra metadata associated), it actually makes more sense to use a set. 

Another downside of using object properties for this type of operation is that property names are always converted to strings. So you can't have an object with the property name of `5`, you can only have one with the property name of `"5"`. That also means you can't easily keep track of objects in the same manner because the objects get converted to strings when assigned as a property name. Sets, on the other hand, can contain any type of data without fear of conversion into another type.

## Browser Support

Both Firefox and Chrome have implemented `Set`, however, in Chrome you need to manually enable ECMAScript 6 features: go to `chrome://flags` and enable &#8220;Experimental JavaScript Features&#8221;. Both implementations are incomplete. Neither browser implements set iteration using `for-of`.

## Summary

ECMAScript 6 sets are a welcome addition to the language. They allow you to easily create a collection of unique values without worrying about type coercion. You can add and remove items very easily from a set even though there is no direct access to items in the set. It's still possible, if necessary, to iterate over items in the set by using the ECMAScript 6 `for-of` statement.

Since ECMAScript 6 is not yet complete, it's also possible that the implementation and specification might change before other browsers start to include `Set`. At this point in time, it is still considered experimental API and shouldn't be used in production code. This post, and other posts about ECMAScript 6, are only intended to be a preview of functionality that is to come.

## Updates

  * **05-Jan-2014** &#8211; changed reference to `size()` method to `size` property to reflect the change in spec.

## References

  1. [Simple Maps and Sets][1] (ES6 Wiki)
  2. [for&#8230;of][2] (MDN)
  3. [CSS Lint][3]
  4. [Set][4] (MDN)

 [1]: http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
 [2]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/for...of
 [3]: https://csslint.net
 [4]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Set
