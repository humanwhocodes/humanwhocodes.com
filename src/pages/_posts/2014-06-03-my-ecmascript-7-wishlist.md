---
title: My ECMAScript 7 wishlist
author: Nicholas C. Zakas
permalink: /blog/2014/06/03/my-ecmascript-7-wishlist/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - ECMAScript 7
  - JavaScript
---
With ECMAScript 6 now feature complete, any further changes to the core of JavaScript will happen in ECMAScript 7. I'm pretty excited about the changes coming in ECMAScript 6 and there are already some great ECMAScript 7 features such as `Object.observe()` and asynchronous functions. While the development of ECMAScript 7 continues, I just wanted to share my personal wishlist of things that would make writing JavaScript even better and are (seemingly) within the scope of consideration for ECMAScript 7.

Some notes about the wishlist items:

  * I haven't found a good source of already-scheduled ECMAScript 7 features, so I don't know if any of these are already on the roadmap or not. 
  * I don't actually care what the names of things are, I just care about the functionality.
  * I'm no expert in syntax. It's entirely possible I suggested something here that isn't feasible. 

## Arrays

I recently came to realize that I spend an inordinate amount of time working with arrays in JavaScript, moreso than anything else. I've had a growing list of annoying things about working with arrays that have been partially solved in ECMAScript 5 and 6. However, there still seems to be some low-handing fruit.

## Array.prototype.last(), Array.prototype.first()

The number of times I write something like `items[items.length - 1]` each week drives me crazy. I just want a `last()` method that does it for me. The native equivalent of this:

    Array.prototype.last = function() {
        return this[this.length - 1];
    };

While I check the last item of arrays frequently, I also check the first item frequently. So I'd love to have `first()` as well:

    Array.prototype.first = function() {
        return this[0];
    };

With these two methods, a lot of my code would look cleaner:

    //before 
    if (items[0] === "(" &#038;&#038; items[items.length - 1] === ")") {
        // do something
    }
    
    // after
    if (items.first() === "(" &#038;&#038; items.last() === ")") {
        // do something
    }

### Array.prototype.isEmpty()

Another thing I do with arrays a lot is check to see if it's empty by comparing the length to zero. I'd much rather have a method to improve readability. Something like this:

    Array.prototype.isEmpty = function() {
        return this.length === 0;
    }

## Function.empty

I find myself using empty functions frequently, especially in tests and callback-oriented functions where I don't actually care to wait for the results. That means I usually write things like:

    someAsyncMethod(function() {
        // noop
    });

The `// noop` comment is there to make sure people understand I intentionally left this function empty. I'd much rather there be a predefined empty function that I can reuse whenever I want a throwaway function, such as:

    someAsyncMethod(Function.empty);
    
    // where...
    Object.defineProperty(Function, "empty", {
        value: () => {},
        writable: false,
        configurable: false,
        enumerable: true
    };

## Object.deepPreventExtensions(), Object.deepSeal(), Object.deepFreeze()

ECMAScript 5 added `Object.preventExtensions()`, `Object.seal()`, and `Object.freeze()`. These serve to protect objects from certain types of modification, which is fantastic, except that these are shallow operations. For instance:

    var data = {
        subdata: {
            type: "js"
        }
    };
    
    Object.freeze(data);
    
    data.subdata = {};   // fails silently in nonstrict mode
    
    data.subdata.type = "css";   // succeeds
    

This is working as intended, `data.subdata` cannot be overwritten but `data.subdata.type` can be since `Object.freeze()` only freezes the properties of the object that is passed. In most cases, that's okay, but I've found myself needing to apply object protection deeply, and it would be great to have official methods that did this.

My primary use case is in reading in a JSON configuration and wanting to protect it throughout the lifetime of the application. It's possible to implement this fairly easily in ECMAScript 6:

    Object.deepPreventExtensions = function(object) {
    
        // for avoiding circular references
        var handled = new WeakSet();
    
        // recursive function
        function deepPreventExtensions(object) {
    
            // handle first level
            Object.preventExtensions(object);
            handled.add(object);
    
            Object.keys(object).filter(function(key) {
                // get keys for objects not already handled
                return object[key] &#038;&#038; (typeof object[key] === 'object') &#038;&#038; !handled.has(object[key]);
            }).forEach(function(key) {
                Object.deepPreventExtensions(object[key]);
            });
        }
    
        deepPreventExtensions(object);
    };

The only tricky part is handling circular references, but that is made somewhat easier by using a `WeakSet` to track already-handled objects. The same basic pattern can be applied for `Object.deepSeal()` and `Object.deepFreeze()`.

## Defensive objects

I recently wrote a post about [defensive objects][1]. As a refresher, defensive objects are those that throw an error when you try to read a property that doesn't exist. This is the way objects work in type safe languages and is the last missing capability for accurately creating classes in JavaScript that behave as they would in other languages.

Today, you can get pretty close:

    class Person {
        
        constructor(name) {
            this.name = name;
            Object.seal(this);
        }
    }

Using the ECMAScript 6 class syntax plus `Object.seal()`, you're able to create an object that can't have its properties removed or new properties added. However, accessing a nonexistent property will still just return `undefined`:

    var me = new Person("Nicholas");
    console.log(me.nme);      // unfortunate typo, returns undefined
    

Because the property `nme` doesn't exist, it returns `undefined` when you try to access it. I recently spent a half hour tracking down a bug that was a typo of this nature and wished I had a way to prevent it from happening.

Adding this behavior would bring object properties inline with variables in terms of what will happen when you try to access something that doesn't exist. An error is thrown when you try to read an undeclared variable; I'd like that same behavior when you try to read an undeclared property.

I propose a method that is similar to `Object.preventExtensions()`, perhaps called `Object.preventUndeclaredGet()` (probably not the best name) that would set an internal property on an object changing the `[[Get]]` behavior to throw an error when the given property doesn't exist. For example:

    class Person {
        
        constructor(name) {
            this.name = name;
            Object.seal(this);
            Object.preventUndeclaredGet(this);
        }
    }
    
    var me = new Person("Nicholas");
    console.log(me.name);  // "Nicholas"
    console.log(me.nme);   // throws error
    

Adding this capability allows you to create classes that correctly mimic classes in other languages. Also, if you don't seal the object, you can add new properties whenever you want; as long as you set the property value before reading it, no error will occur.

## Custom descriptor attributes

Property descriptors seem like a great way to add meta information to properties except that you cannot add unknown properties. JavaScript always returns only the spec-defined attributes when you try to store a custom piece of information:

    var me = {};
    Object.defineProperty(me, "name", {
        value: "Nicholas"
        type: "string"
    });
    
    var descriptor = Object.getOwnPropertyDescriptor(me, "name");
    console.log(descriptor.value);    // "Nicholas"
    console.log(descriptor.type);     // "undefined"
    

To me, the property descriptor is a great possible location for storing information related to a particular property. Besides the implications for storing type hints, you could also store relevant information about validation, data bindings, or more. 

It wouldn't make sense to allow just any arbitrary attributes on the descriptor, as the language might need to add more in the future. However, adding a single property that is designed for custom information could work. For instance, what if the spec declared a property called `meta` to contain user-defined information. That `meta` would be stored and could later be retrieved exactly as-is, without the possibility of affecting the other property descriptor values or risk naming collisions with future property descriptor attributes. For example:

    var me = {};
    Object.defineProperty(me, "name", {
        value: "Nicholas"
        meta: {
            type: "string"
        }
    });
    
    var descriptor = Object.getOwnPropertyDescriptor(me, "name");
    console.log(descriptor.value);     // "Nicholas"
    console.log(descriptor.meta.type); // "string"
    

## Lightweight traits

In many ways, JavaScript has supported traits for a long time through the use of mixins. Traits are really the same thing: objects that provide a set of methods intended to be applied to another object. The `Object.assign()` method was added in ECMAScript 6 to aid in this endeavor. However, it can get quite messy to use this approach:

    var trait1 = {
        method1: function() {}
    };
    
    var trait2 = {
        method2: function() {}
    };
    
    function MyObject() {
        // ...
    }
    
    Object.assign(MyObject.prototype, trait1, trait2, {
        method3: function() {}
    });

There's no way to easily do the same thing with ECMAScript 6 classes, so you'd be stuck calling `Object.assign()` in the constructor and applying it to each instance.

What I'd like to propose is some syntactic sugar to make this easier using object literals and classes. For object literals, it would look like this:

    function MyObject() {
        // ...
    }
    
    // lightweight traits
    MyObject.prototype = {
    
        use trait1,
        use trait2,
    
        method3: function() {}
    };
    
    // desugars to
    MyObject.prototype = Object.assign({}, trait1, trait2, {
        method3: function() {}
    });
    

A similar syntax can be used in ECMAScript 6 classes to specify traits for the prototype:

    class MyObject {
        use trait1;
        use trait2;
    
        constructor() {}
    
        method3() {}
    }
    
    // desugars to
    
    function MyObject() {
        // ...
    }
    
    Object.assign(MyObject.prototype, trait1, trait2, {
        method3: function() {}
    });

It's entirely possible that `Object.assign()` should actually be something else, perhaps something that also calls `toMethod()` so the `super` binding is correct, but I think this example illustrates my point.

## Conclusion

I'm very excited to see where ECMAScript 7 is headed and hope that some of these ideas are worthwhile enough to pursue. Even if they aren't, ECMAScript 6 is such a superior upgrade from ECMAScript 5 that I'm sure ECMAScript 7 will be a really great set of changes as well.

 [1]: www.nczonline.net/blog/2014/04/22/creating-defensive-objects-with-es6-proxies/
