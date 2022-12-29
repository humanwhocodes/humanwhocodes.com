---
title: 'ECMAScript 6 collections, Part 2: Maps'
author: Nicholas C. Zakas
permalink: /blog/2012/10/09/ecmascript-6-collections-part-2-maps/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - Maps
---
Maps<sup>[1]</sup>, like [sets][1], are also a familiar topic for those coming from other languages. The basic idea is to map a value to a unique key in such a way that you can retrieve that value at any point in time by using the key. In JavaScript, developers have traditionally used regular objects as maps. In fact, JSON is based on the premise that objects represent key-value pairs. However, the same limitation that affects objects used as sets also affects objects used as maps: the inability to have non-string keys.

Prior to ECMAScript 6, you might have seen code that looked like this:

    var map = {};
    
    // later
    if (!map[key]) {
        map[key] = value;
    }

This code uses a regular object to act like a map, checking to see if a given key exists. The biggest limitation here is that `key` will always be converted into a string. That&#8217;s not a big deal until you want to use a non-string value as a key. For example, maybe you want to store some data that relates to particular DOM element. You could try to do this:

    // element gets converted to a string
    var data = {},
        element = document.getElementById("my-div");
    
    data[element] = metadata;

Unfortunately, `element` will be converted into the string `"[Object HTMLDivElement]"` or something similar (the exact values may be different depending on the browser). That&#8217;s problematic because every `<div>` element gets converted into the same string, meaning you will constantly be overwriting the same key even though you&#8217;re technically using different elements. For this reason, the `Map` type is a welcome addition to JavaScript.

The ECMAScript 6 `Map` type is an ordered list of key-value pairs where both the key and the value can be of any type. A key of `5` is different than a key of `"5"`, and keys are determined to be the same using the same rules as values for a set: `NaN` is consider the same as `NaN`, `-0` is different from `+0`, and otherwise the `===` applies. You can store and retrieve data from a map using the `set()` and `get()` methods, respectively:

    var map = new Map();
    map.set("name", "Nicholas");
    map.set(document.getElementById("my-div"), { flagged: false });
    
    // later
    var name = map.get("name"),
        meta = map.get(document.getElementById("my-div"));

In this example, two key-value pairs are stored. The key `"name"` stores a string while the key `document.getElementById("my-div")` is used to associate meta data with a DOM element. If the key doesn&#8217;t exist in the map, then the special value `undefined` is returned when calling `get()`.

Maps shared a couple of methods with sets, such as `has()` for determining if a key exists in the map and `delete()` for removing a key-value pair from the map. You can also use `size` to determine how many items are in the map:

    var map = new Map();
    map.set("name", "Nicholas");
    
    console.log(map.has("name"));   // true
    console.log(map.get("name"));   // "Nicholas"
    console.log(map.size);        // 1
    
    map.delete("name");
    console.log(map.has("name"));   // false
    console.log(map.get("name"));   // undefined
    console.log(map.size);        // 0

If you want to remove all items from the map, then you can use the `clear()` method:

    var map = new Map();
    map.set("name", "Nicholas");
    
    console.log(map.has("name"));   // true
    console.log(map.get("name"));   // "Nicholas"
    console.log(map.size);        // 1
    
    map.clear();
    console.log(map.has("name"));   // false
    console.log(map.get("name"));   // undefined
    console.log(map.size);        // 0

In order to make it easier to add large amounts of data into a map, you can pass an array of arrays to the `Map` constructor. Internally, each key-value pair is stored as an array with two items, the first being the key and the second being the value. The entire map, therefore, is an array of these two-item arrays and so maps can be initialized using that format:

    var map = new Map([ ["name", "Nicholas"], ["title", "Author"]]);
    
    console.log(map.has("name"));   // true
    console.log(map.get("name"));   // "Nicholas"
    console.log(map.has("title"));  // true
    console.log(map.get("title"));  // "Author"
    console.log(map.size);        // 2

When you want to work with all of the data in the map, you have several options. There are actually three generator methods to choose from: `keys`, which iterates over the keys in the map, `values`, which iterates over the values in the map, and `items`, which iterates over key-value pairs by returning an array containing the key and the value (`items` is the default iterator for maps). The easiest way to make use of these is to use a `for-of` loop:

    for (let key of map.keys()) {
        console.log("Key: %s", key);
    }
    
    for (let value of map.values()) {
        console.log("Value: %s", value);
    }
    
    for (let item of map.items()) {
        console.log("Key: %s, Value: %s", item[0], item[1]);
    }
    
    // same as using map.items()
    for (let item of map) {
        console.log("Key: %s, Value: %s", item[0], item[1]);
    }

When iterating over keys or values, you receive a single value each time through the loop. When iterating over items, you receive an array whose first item is the key and the second item is the value.

Another way to iterate over items is to use the `forEach()` method. This method works in a similar manner to `forEach()` on arrays. You pass in a function that gets called with three arguments: the value, the key, and the map itself. For example:

    map.forEach(function(value, key, map)) {
        console.log("Key: %s, Value: %s", key, value);
    });

Also similar to the arrays version of `forEach()`, you can pass in an optional second argument to specify the `this` value to use inside the callback:

    var reporter = {
        report: function(key, value) {
            console.log("Key: %s, Value: %s", key, value);
        }
    };
    
    map.forEach(function(value, key, map) {
        this.report(key, value);
    }, reporter);

Here, the `this` value inside of the callback function is equal to `reporter`. That allows `this.report()` to work correctly.

Compare this to the clunky way of iterating over values and a regular object:

    for (let key in object) {
    
        // make sure it's not from the prototype!
        if (object.hasOwnProperty(key)) {
            console.log("Key: %s, Value: %s", key, object[key]);
        }
    
    }

When using objects as maps, it was always a concern that properties from the prototype might leak through in a \`for-in\` loop. You always need to use \`hasOwnProperty()\` to be certain that you are getting only the properties that you wanted. Of course, if there were methods on the object, you would also have to filter those:

    for (let key in object) {
    
        // make sure it's not from the prototype or a function!
        if (object.hasOwnProperty(key) &#038;&#038; typeof object[key] !== "function") {
            console.log("Key: %s, Value: %s", key, object[key]);
        }
    
    }

The iteration features of maps allow you to focus on just the data without worrying about extra pieces of information slipping into your code. This is another big benefit of maps over regular objects for storing key-value pairs.

## Browser Support {#browser-support}

Both Firefox and Chrome have implemented `Map`, however, in Chrome you need to manually enable ECMAScript 6 features: go to `chrome://flags` and enable "Experimental JavaScript Features". Both implementations are incomplete. Neither browser implements any of the generator method for use with `for-of` and Chrome&#8217;s implementation is missing the `size()` method (which is part of the ECMAScript 6 draft specification<sup>[2]</sup>) and the constructor doesn&#8217;t do initialization when passed an array of arrays.

## Summary

ECMAScript 6 maps bring a very important, and often used, feature to the language. Developers have long been wanting a reliable way to store key-value pairs and have relied on regular objects for far too long. Maps Provide all of the abilities that regular objects can&#8217;t, including easy ways to iterate over keys and values as well as removing concern over prototypes.

As with sets, maps are part of the ECMAScript 6 draft that is not yet complete. Because of that, maps are still considered an experimental API and may change before the specification is finalized. All posts about ECMAScript 6 should be considered previews of what&#8217;s coming, and not definitive references. The experimental APIs, although implemented in some browsers, are not yet ready to be used in production.

## Updates

  * **05-Jan-2014** &#8211; changed reference to `size()` method to `size` property to reflect changes in the spec.

## References

  1. [Simple Maps and Sets][2] (ES6 Wiki)
  2. [ECMAScript 6 Draft Specification][3] (ECMA)

 [1]: {{site.url}}/blog/2012/09/25/ecmascript-6-collections-part-1-sets/
 [2]: http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
 [3]: http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts
