---
title: "ECMAScript 6 collections, Part 3: WeakMaps"
author: Nicholas C. Zakas
permalink: /blog/2012/11/06/ecmascript-6-collections-part-3-weakmaps/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - WeakMap
---
Weakmaps are similar to regular maps in that they map a value to a unique key. That key can later be used to retrieve the value it identifies. Weakmaps are different because the key must be an object and cannot be a primitive value. This may seem like a strange constraint but it's actually the core of what makes weakmaps different and useful.

A weakmap holds only a weak reference to a key, which means the reference inside of the weakmap doesn't prevent garbage collection of that object. When the object is destroyed by the garbage collector, the weakmap automatically removes the key-value pair identified by that object. The canonical example for using weakmaps is to create an object related to a particular DOM element. For example, jQuery maintains a cache of objects internally, one for each DOM element that has been referenced. Using a weakmap would allow jQuery to automatically free up memory associated with a DOM element when it is removed from the document.

The ECMAScript 6 `WeakMap` type is an unordered list of key-value pairs where the key must be a non-null object and the value can be of any type. The interface for `WeakMap` is very similar to that of `Map` in that `set()` and `get()` are used to add data and retrieve data, respectively:

    var map = new WeakMap(),
        element = document.querySelector(".element");
    
    map.set(element, "Original");
    
    // later
    var value = map.get(element);
    console.log(value);             // "Original"
    
    // later still - remove reference
    element.parentNode.removeChild(element);
    element = null;
    
    value = map.get(element);
    console.log(value);             // undefined

In this example, one key-value pair is stored. The key is a DOM element used to store a corresponding string value. That value was later retrieved by passing in the DOM element to `get()`. If the DOM element is then removed from the document and the variable referencing it is set to `null`, then the data is also removed from the weakmap and the next attempt to retrieve data associated with the DOM element fails.

This example is a little bit misleading because the second call to `map.get(element)` is using the value of `null` (which `element` was set to) rather than a reference to the DOM element. You can't use `null` as a key in weakmaps, so this code isn't really doing a valid lookup. Unfortunately, there is no part of the interface that allows you to query whether or not a reference has been cleared (because the reference no longer exists).

Note: The weakmap `set()` method will throw an error if you try to use a primitive value as a key. If you want to use a primitive value as a key, then it's best to use `Map` instead.

Weakmaps also have `has()` for determining if a key exists in the map and `delete()` for removing a key-value pair.

    var map = new WeakMap(),
        element = document.querySelector(".element");
    
    map.set(element, "Original");
    
    console.log(map.has(element));   // true
    console.log(map.get(element));   // "Original"
    
    map.delete(element);
    console.log(map.has(element));   // false
    console.log(map.get(element));   // undefined

Here, a DOM element is once again used as the key in a weakmap. The `has()` method is useful for checking to see if a reference is currently being used as a key in the weakmap. Keep in mind that this only works when you have a non-null reference to a key. The key is forcibly removed from the weakmap by using `delete()`, at which point `has()` returns `false` and `get()` returned `undefined`.

## Browser Support {#browser-support}

Both Firefox and Chrome have implemented `WeakMap`, however, in Chrome you need to manually enable ECMAScript 6 features: go to `chrome://flags` and enable "Experimental JavaScript Features". Both implementations are complete per the current strawman<sup>[1]</sup> specification (though the current ECMAScript 6 spec also defines a `clear()` method).

## Uses and Limitations {#uses-and-limitations}

Weakmaps have a very specific use case in mind, and that is mapping values to objects that might disappear in the future. The ability to free up memory related to these objects is useful for JavaScript libraries that wrap DOM elements with custom objects such as jQuery and YUI. There'll likely be more use cases discovered once implementations are complete and widespread, but in the short term, don't feel bad if you can't figure out a good spot for using weakmaps.

In many cases, a regular map is probably what you want to use. Weakmaps are limited in that they aren't enumerable and you can't keep track of how many items are contained within. There also isn't a way to retrieve a list of all keys. If you need this type of functionality, then you'll need to use a regular map. If you don't, and you only intend to use objects as keys, then a weakmap may be the right choice.


  1. [WeakMaps Strawman][1] (ECMA)

 [1]: http://wiki.ecmascript.org/doku.php?id=harmony:weak_maps
