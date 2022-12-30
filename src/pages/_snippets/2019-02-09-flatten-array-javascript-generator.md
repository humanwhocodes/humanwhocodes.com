---
title: "Flattening a JavaScript array with a generator"
author: Nicholas C. Zakas
teaser: "Generators make traversing multidimensional arrays easy."
date: 2019-02-09
categories:
  - JavaScript
tags:
  - JavaScript
  - Generators
  - Arrays
---

ECMAScript 2019 will introduce the `Array.prototype.flat()` method to aid in flattening out multidimensional arrays in JavaScript. However, flattening arrays has been easy in JavaScript every since ECMAScript 6 (2015) introduced generators. Because generators can `yield` values in any order, not just linearly, it's possible to use a recursive generator to easily flatten an array. Here's the code:

```js
function* traverse(array) {
    for (const item of array) {
        if (Array.isArray(item)) {
            yield* traverse(item);
        } else {
            yield item;
        }
    }
}

const data = [
    1, 2,
    [
        3, 4,
        [5, 6]    
    ],
    7, 8
];

const flattened = [...traverse(data)];
console.log(flattened);         // 1,2,3,4,5,6,7,8
```

The generator just checks each item to see if it's an array, and if it is, then it delegates the `yield` operation to a recursive `traverse()` call. In the simple case, when the array item isn't an array, the item is `yield`ed. This ouputs each item linearly, which means using a spread operator with the returned iterator results in a flattened array.
