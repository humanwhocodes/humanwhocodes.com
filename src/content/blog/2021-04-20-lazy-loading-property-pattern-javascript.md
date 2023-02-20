---
title: "The lazy-loading property pattern in JavaScript"
teaser: "You can defer computationally-expensive operations until needed using an accessor property."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - Design Patterns
---

Traditionally, developers have created properties inside of JavaScript classes for any data that might be needed within an instance. This isn't a problem for small pieces of data that are readily available inside of the constructor. However, if some data needs to be calculated before becoming available in the instance, you may not want to pay that cost upfront. For example, consider this class:

```js
class MyClass {
    constructor() {
        this.data = someExpensiveComputation();
    }
}
```

Here, the `data` property is created as the result of performing some expensive computation. It may not be efficient to perform that calculation upfront if you aren't sure the property will be used. Fortunately, there are several ways to defer these operations until later.

## The on-demand property pattern

The easiest way to optimize performing an expensive operation is to wait until the data is  needed before doing the computation. For example, you could use an accessor property with a getter to do the computation on demand, like this:


```js
class MyClass {
    get data() {
        return someExpensiveComputation();
    }
}
```

In this case, your expensive computation isn't happening until the first time someone reads the `data` property, which is an improvement. However, that same expensive computation is performed every time the `data` property is read, which is worse than previous example where at least the computation was performed just once. This isn't a good solution, but you can build upon it to create a better one.

## The messy lazy-loading property pattern

Only performing the computation when the property is accessed is a good start. What you really need is to cache the information after that point and just use the cached version. But where do you cache that information for easy access? The easiest approach is to define a property with the same name and set its value to the computed data, like this:

```js
class MyClass {
    get data() {
        const actualData = someExpensiveComputation();

        Object.defineProperty(this, "data", {
            value: actualData,
            writable: false,
            configurable: false,
            enumerable: false
        });

        return actualData;
    }
}
```

Here, the `data` property is once again defined as a getter on the class, but this time it caches the result. The call to `Object.defineProperty()` creates a new property called `data` that has a fixed value of `actualData`, and is set to not be writable, configurable, and enumerable (to match the getter). After that, the value itself is returned. The next time the `data` property is accessed, it will be reading from the newly created property rather than calling the getter:

```js
const object = new MyClass();

// calls the getter
const data1 = object.data;

// reads from the data property
const data2 = object.data;
```

Effectively, all of the computation is done only the first time the `data` property is read. Each subsequent read of the `data` property is returning the cached the version.

The one downside to this pattern is that the `data` property starts out as a non-enumerable prototype property and ends up as a non-enumerable own property:

```js
const object = new MyClass();
console.log(object.hasOwnProperty("data"));     // false

const data = object.data;
console.log(object.hasOwnProperty("data"));     // true
```

While this distinction isn't important in many cases, it is an important thing to understand about this pattern as it can cause subtle issues when the object is passed around. Fortunately, it's easy to address this with an updated pattern.

## The only-own lazy-loading property pattern for classes

If you have a use case where it's important for the lazy-loaded property to always exist on the instance, then you can using `Object.defineProperty()` to create the property inside of the class constructor. It's a little bit messier than the previous example, but it will ensure that the property only ever exists on the instance. Here's an example:

```js
class MyClass {
    constructor() {

        Object.defineProperty(this, "data", {
            get() {
                const actualData = someExpensiveComputation();

                Object.defineProperty(this, "data", {
                    value: actualData,
                    writable: false,
                    configurable: false
                });

                return actualData;
            },
            configurable: true,
            enumerable: true
        });

    }
}
```

Here, the constructor creates the `data` accessor property using `Object.defineProperty()`. The property is created on the instance (by using `this`) and defines a getter as well as specifying the property to be enumerable and configurable (typical of own properties). It's particularly important to set the `data` property as configurable so you can call `Object.defineProperty()` on it again.

The getter function then does the computation and calls `Object.defineProperty()` a second time. The `data` property is now redefined as a data property with a specific value and is made non-writable and non-configurable to protect the final data. Then, the computed data is returned from the getter. The next time the `data` property is read, it will read from the stored value. As a bonus, the `data` property now only ever exists as an own property and acts the same both before and after the first read:

```js
const object = new MyClass();
console.log(object.hasOwnProperty("data"));     // true

const data = object.data;
console.log(object.hasOwnProperty("data"));     // true
```

For classes, this is most likely the pattern you want to use; object literals, on the other hand, can use a simpler approach.

## The lazy-loading property pattern for object literals

If you are using an object literal instead of a class, the process is much simpler because getters defined on object literals are defined as enumerable own properties (not prototype properties) just like data properties. That means you can use the messy lazy-loading property pattern for classes without being messy:

```js
const object = {
    get data() {
        const actualData = someExpensiveComputation();

        Object.defineProperty(this, "data", {
            value: actualData,
            writable: false,
            configurable: false,
            enumerable: false
        });

        return actualData;
    }
};

console.log(object.hasOwnProperty("data"));     // true

const data = object.data;
console.log(object.hasOwnProperty("data"));     // true
```

## Conclusion

The ability to redefine object properties in JavaScript allows a unique opportunity to cache information that may be expensive to compute. By starting out with an accessor property that is redefined as a data property, you can defer computation until the first time a property is read and then cache the result for later use. This approach works both for classes and for object literals, and is a bit simpler in object literals because you don't have to worry about your getter ending up on the prototype.

One of the best ways to improve performance is to avoid doing the same work twice, so any time you can cache a result for use later, you'll speed up your program. Techniques like the lazy-loading property pattern allow any property to become a caching layer to improve performance.
