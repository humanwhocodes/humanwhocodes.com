---
title: Are your mixins ECMAScript 5 compatible?
author: Nicholas C. Zakas
permalink: /blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
categories:
  - Web Development
tags:
  - ECMAScript 5
  - JavaScript
---
I was working with a client recently on a project that could make full use of ECMAScript 5 when I came across an interesting problem. The issue stemmed from the use of mixins, a very common pattern in JavaScript where one object is assigned properties (including methods) from another. Most mixin functions look something like this:

    function mixin(receiver, supplier) {
        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
    }

Inside of the `mixin()` function, a `for` loop iterates over all own properties of the supplier and assigns the value to the property of the same name on the receiver. Almost every JavaScript library has some form of this function, allowing you to write code like this:

    mixin(object, {
    
        name: "Nicholas",
    
        sayName: function() {
            console.log(this.name);
        }
    
    });
    
    object.sayName();       // outputs "Nicholas"

In this example, `object` receives both the property `name` and the method `sayName()`. This was fine in ECMAScript 3 but doesn&#8217;t cover all the bases in ECMAScript 5.

The problem I ran into was with this pattern:

    (function() {
    
        // to be filled in later
        var name;
    
        mixin(object, {
    
            get name() {
                return name;
            }
    
        });
    
        // let&#39;s just say this is later
        name = "Nicholas";
    
    }());
    
    console.log(object.name);       // undefined

This example looks a little bit contrived, but is an accurate depiction of the problem. The properties to be mixed in include an ECMAScript 5 accessor property with only a getter. That getter references a local variable called `name` that isn&#8217;t initialized to a variable and so receives the value of `undefined`. Later on, `name` is assigned a value so that the accessor can return a valid value. Unfortunately, `object.name` (the mixed-in property) always returns `undefined`. What&#8217;s going on here?

Look closer at the `mixin()` function. The loop is not, in fact, reassign properties from one object to another. It&#8217;s actually creating a data property with a given name and assigning it the returned by accessing that property on the supplier. For this example, `mixin()` effectively does this:

    receiver.name = supplier.name;

The data property `receiver.name` is created and assigned the value of `supplier.name`. Of course, `supplier.name` has a getter that returns the value of the local `name` variable. At that point in time, `name` has a value of `undefined`, so that is the value stored in `receiver.name`. No getter is every created for `receiver.name` so the value never changes.

To fix this problem, you need to use property descriptors to properly mix properties from one object onto another. A pure ECMAScript 5 version of `mixin()` would be:

    function mixin(receiver, supplier) {
    
        Object.keys(supplier).forEach(function(property) {
            Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
        });
    }

In this new version of the function, `Object.keys()` is used to retrieve an array of all enumerable properties on `supplier`. Then, the `forEach()` method is used to iterate over those properties. The call to `Object.getOwnPropertyDescriptor()` retrieves the descriptor for each property of `supplier`. Since the descriptor contains all of the relevant information about the property, including getters and setters, that descriptor can be passed directly into `Object.defineProperty()` to create the same property on `receiver`. Using this new version of `mixin()`, the problematic pattern from earlier in this post works as you would expect. The getter is correctly being transferred to `receiver` from `supplier`.

Of course, if you still need to support older browsers then you&#8217;ll need a function that falls back to the ECMAScript 3 way:

    function mixin(receiver, supplier) {
        if (Object.keys) {
            Object.keys(supplier).forEach(function(property) {
                Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
            });
        } else {
            for (var property in supplier) {
                if (supplier.hasOwnProperty(property)) {
                    receiver[property] = supplier[property];
                }
            }
        }
    }

If you&#8217;re using a `mixin()` function, be sure to double check that it works with ECMAScript 5, and specifically with getters and setters. Otherwise, you could find yourself running into errors like I did.

**Update (12-December-2012)**: Fixed coding error.
