---
title: 'It's time to start using JavaScript strict mode'
author: Nicholas C. Zakas
permalink: /blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/
categories:
  - Web Development
tags:
  - JavaScript
  - Strict Mode
---
ECMAScript 5 introduced strict mode to JavaScript. The intent is to allow developers to opt-in to a &#8220;better&#8221; version of JavaScript, where some of the most common and egregious errors are handled differently. For a while, I was skeptical, especially with only one browser (Firefox) initially supporting strict mode. Fast forward to today, every major browser supports strict mode in their latest version, including Internet Explorer 10 and Opera 12. It's time to start using strict mode.

## What does it do?

Strict mode makes a lot of changes to how JavaScript runs, and I group these into two categories: obvious and subtle. The subtle changes aim to fix subtle problems, and I'm not going to delve into those here; if you're interested in those details, please see Dmitry Soshnikov's excellent, <cite>ECMA-262-5 in Detail. Chapter 2. Strict Mode</cite><sup>[1]</sup>. I'm far more interested in talking about the obvious changes: the ones you should know about before using strict mode, and the ones that will most likely help you the most.

Before getting into specific features, keep in mind that one of the goals of strict mode is to allow for faster debugging of issues. The best way to help developers debug is to throw errors when certain patterns occur, rather than silently failing or behaving strangely (which JavaScript does today outside of strict mode). Strict mode code throws far more errors, and that's a good thing, because it quickly calls to attention things that should be fixed immediately.

### Eliminates with

To begin, strict mode eliminates the `with` statement. It is now considered invalid JavaScript syntax and will throw a syntax error when it appears in strict mode code. So first step to using strict mode: make sure you're not using `with`.

    // Causes a syntax error in strict mode
    with (location) {
        alert(href);
    }

### Prevents accidental globals

Next, variables must be declared before they can be assigned to. Without strict mode, assigning a value to an undeclared variable automatically creates a global variable with that name. This is one of the most common errors in JavaScript. In strict mode, attempting to do so throws an error.

    // Throws an error in strict mode
    (function() {
    
        someUndeclaredVar = "foo";
    
    }());
    

### Eliminates this coercion

Another important change is a `this`-value of `null` or `undefined` is no longer coerced to the global. Instead, `this` remains its original value, and so may cause some code depending on the coercion to break. For example:

    window.color = "red";
    function sayColor() {
        alert(this.color);
    }
    
    // Throws an error in strict mode, "red" otherwise
    sayColor();
    
    // Throws an error in strict mode, "red" otherwise
    sayColor.call(null);
    

Basically, the `this`-value must be assigned a value or else it remains `undefined`. That means constructors accidentally called without `new` are also affected:

    function Person(name) {
        this.name = name;
    }
    
    // Error in strict mode
    var me = Person("Nicholas");
    

In this code, `this` is `undefined` when the `Person` constructor is called without `new`. Since you can't assign a property to `undefined`, this code throws an error. In non-strict mode, `this` would be coerced to the global and so `name` would be assigned as a global variable.

### No duplicates

It can be quite easy to duplicate properties in objects or named arguments in functions if you've been doing a lot of coding. Strict mode throws an error when it comes across either pattern:

    // Error in strict mode - duplicate arguments
    function doSomething(value1, value2, value1) {
        //code
    }
    
    // Error in strict mode - duplicate properties
    var object = {
        foo: "bar",
        foo: "baz"
    };
    

These are both syntax errors and so the error is thrown before the code is executed.

### Safer eval()

Even though `eval()` wasn't removed, it has undergone some changes in strict mode. The biggest change is that variables and functions declared inside of an `eval()` statement are no longer created in the containing scope. For example:

    (function() {
    
        eval("var x = 10;");
    
        // Non-strict mode, alerts 10
        // Strict mode, throws an error because x is undeclared
        alert(x);
    
    }());
    

Any variables or functions created inside of `eval()` stay inside of `eval()`. You can, however, return a value from `eval()` if you wish to pass a value back out:

    (function() {
    
        var result = eval("var x = 10, y = 20; x + y");
    
        // Works in strict and non-strict mode (30)
        alert(result);
    
    }());
    

### Errors for immutables

ECMAScript 5 also introduced the ability to modify property attributes, such as setting a property as read only or freezing an entire object's structure. In non-strict mode, attempting to modify an immutable property fails silently. You've probably run into this issue with some native APIs. Strict mode ensures that an error is thrown whenever you try to modify an object or object property in a way that isn't allowed.

    var person = {};
    Object.defineProperty(person, "name", {
        writable: false,
        value: "Nicholas"
    });
    
    // Fails silently in non-strict mode, throws error in strict mode
    person.name = "John";
    

In this example, the `name` property is set to read only. In non-strict mode, assigning to `name` fails silently; in strict mode, an error is thrown.

**Note:** I very strongly encourage you to use strict mode if you're using any of the ECMAScript attribute capabilities. If you're changing the mutability of objects, you'll run into a lot of errors that will fail silently in non-strict mode.

## How do you use it?

Strict mode is very easily enabled in modern browsers using the following pragma:

    "use strict";

Even though this looks like a string that isn't assigned to a variable, it actually instructs conforming JavaScript engines to switch into strict mode (browsers that don't support strict mode simply read this as an unassigned string and continue to work as usual). You can use it either globally or within a function. That being said, *you should never use it globally*. Using the pragma globally means that any code within the same file also runs in strict mode.

    // Don't do this
    "use strict";
    
    function doSomething() {
        // this runs in strict mode
    }
    
    function doSomethingElse() {
        // so does this
    }

This may not seem like a big deal, however, it can cause big problems in our world of aggressive script concatenation. All it takes is one script to include the pragma globally for every script its concatenated with to be switch into strict mode (potentially revealing errors you never would have anticipated).

For that reason, it's best to only use strict mode inside of functions, such as:

    function doSomething() {
        "use strict";
        // this runs in strict mode
    }
    
    function doSomethingElse() {
        // this doesn't run in strict mode
    }

If you want strict mode to apply to more than one function, use an immediately-invoked function expression (IIFE):

    (function() {
    
        "use strict";
    
        function doSomething() {
            // this runs in strict mode
        }
    
        function doSomethingElse() {
            // so does this
        }
    }());

## Conclusion

I strongly recommend everyone start using strict mode now. There are enough browsers supporting it that strict mode will legitimately help save you from errors you didn't even know where in your code. Make sure you don't include the pragma globally, but use IIFEs as frequently as you like to apply strict mode to as much code as possible. Initially, there will be errors you've never encountered before &#8211; this is normal. Make sure you do a fair amount of testing after switching to strict mode to make sure you've caught everything. Definitely don't just throw `"use strict"` in your code and assume there are no errors. The bottom line is that it's time to start using this incredibly useful language feature to write better code.

**Update (14-Mar-2012):** Added note about using strict mode pragma with non-conforming JavaScript engines.  
**Update (21-Mar-2012):** Fixed typo.


  1. [ECMA-262-5 in Detail. Chapter 2. Strict Mode][1] by Dmitry Soshnikov

 [1]: http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/
