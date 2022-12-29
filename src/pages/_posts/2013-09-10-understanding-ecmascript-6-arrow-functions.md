---
title: Understanding ECMAScript 6 arrow functions
author: Nicholas C. Zakas
permalink: /blog/2013/09/10/understanding-ecmascript-6-arrow-functions/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - Functions
  - JavaScript
---
One of the most interesting new parts of ECMAScript 6 are arrow functions. Arrow functions are, as the name suggests, functions defined with a new syntax that uses an "arrow" (`=>`) as part of the syntax. However, arrow functions behave differently than traditional JavaScript functions in a number of important ways:

  * **Lexical `this` binding** &#8211; The value of `this` inside of the function is determined by where the arrow function is defined not where it is used.
  * **Not `new`able** &#8211; Arrow functions cannot be used as constructors and will throw an error when used with `new`.
  * **Can&#8217;t change `this`** &#8211; The value of `this` inside of the function can&#8217;t be changed, it remains the same value throughout the entire lifecycle of the function.
  * <del><strong>No <code>arguments</code> object</strong> &#8211; You can&#8217;t access arguments through the <code>arguments</code> object, you must use named arguments or other ES6 features such as rest arguments.</del>

There are a few reasons why these differences exist. First and foremost, `this` binding is a common source of error in JavaScript. It&#8217;s very easy to lose track of the `this` value inside of a function and can easily result in unintended consequences. Second, by limiting arrow functions to simply executing code with a single `this` value, JavaScript engines can more easily optimize these operations (as opposed to regular functions, which might be used as a constructor or otherwise modified).

## Syntax {#syntax}

The syntax for arrow functions comes in many flavors depending upon what you are trying to accomplish. All variations begin with function arguments, followed by the arrow, followed by the body of the function. Both the arguments and the body can take different forms depending on usage. For example, the following arrow function takes a single argument and simply returns it:

    var reflect = value => value;
    
    // effectively equivalent to:
    
    var reflect = function(value) {
        return value;
    };

When there is only one argument for an arrow function, that one argument can be used directly without any further syntax. The arrow comes next and the expression to the right of the arrow is evaluated and returned. Even though there is no explicit `return` statement, this arrow function will return the first argument that is passed in.

If you are passing in more than one argument, then you must include parentheses around those arguments. For example:

    var sum = (num1, num2) => num1 + num2;
    
    // effectively equivalent to:
    
    var sum = function(num1, num2) {
        return num1 + num2;
    };

The `sum()` function simply adds two arguments together and returns the result. The only difference is that the arguments are enclosed in parentheses with a comma separating them (same as traditional functions). Similarly, a function without any named arguments must use empty parentheses to start the arrow function declaration:

    var sum = () => 1 + 2;
    
    // effectively equivalent to:
    
    var sum = function() {
        return 1 + 2;
    };

When you want to provide a more traditional function body, perhaps consisting of more than one expression, then you need to wrap the function body in braces and explicitly define a return value, such as:

    var sum = (num1, num2) => { return num1 + num2; }
    
    // effectively equivalent to:
    
    var sum = function(num1, num2) {
        return num1 + num2;
    };

You can more or less treat the inside of the curly braces as the same as in a traditional function with the exception that `arguments` is not available.

Because curly braces are used to denote the function&#8217;s body, an arrow function that wants to return an object literal outside of a function body must wrap the literal in parentheses. For example:

    var getTempItem = id => ({ id: id, name: "Temp" });
    
    // effectively equivalent to:
    
    var getTempItem = function(id) {
    
        return {
            id: id,
            name: "Temp"
        };
    };

Wrapping the object literal in parentheses signals that the braces are an object literal instead of the function body.

## Usage {#usage}

One of the most common areas of error in JavaScript is the binding of `this` inside of functions. Since the value of `this` can change inside of a single function depending on the context in which it&#8217;s called, it&#8217;s possible to mistakenly affect one object when you meant to affect another. Consider the following example:

    var PageHandler = {
    
        id: "123456",
    
        init: function() {
            document.addEventListener("click", function(event) {
                this.doSomething(event.type);     // error
            }, false);
        },
    
        doSomething: function(type) {
            console.log("Handling " + type  + " for " + this.id);
        }
    };

In this code, the object `PageHandler` Is designed to handle interactions on the page. The `init()` method is called to set up the interactions and that method in turn assigns an event handler to call `this.doSomething()`. However, this code doesn&#8217;t work as intended. The reference to `this.doSomething()` is broken because `this` points to a global object inside of the event handler instead of being bound to `PageHandler`. If you tried to run this code, you will get an error when the event handler fires because `this.doSomething()` doesn&#8217;t exist on the global object.

You can bind the value of `this` to `PageHandler` explicitly using the `bind()` method on the function:

    var PageHandler = {
    
        id: "123456",
    
        init: function() {
            document.addEventListener("click", (function(event) {
                this.doSomething(event.type);     // error
            }).bind(this), false);
        },
    
        doSomething: function(type) {
            console.log("Handling " + type  + " for " + this.id);
        }
    };

Now the code works as expected, but may look a little bit strange. By calling `bind(this)`, you&#8217;re actually creating a new function whose `this` is bound to the current `this`, which is `PageHandler`. The code now works as you would expect even though you had to create an extra function to get the job done.

Since arrow function have lexical `this` binding, the value of `this` remains the same as the context in which the arrow function is defined. For example:

    var PageHandler = {
    
        id: "123456",
    
        init: function() {
            document.addEventListener("click",
                    event => this.doSomething(event.type), false);
        },
    
        doSomething: function(type) {
            console.log("Handling " + type  + " for " + this.id);
        }
    };

The event handler in this example is an arrow function that calls `this.doSomething()`. The value of `this` is the same as it is within `init()`, so this version of the example works similarly to the one using `bind()`. Even though the `doSomething()` method doesn&#8217;t return a value, it is still the only statement executed necessary for the function body and so there is no need to include braces.

The concise syntax for arrow functions also makes them ideal as arguments to other functions. For example, if you want to sort an array using a custom comparator in ES5, you typically write something like this:

    var result = values.sort(function(a, b) {
        return a - b;
    });

That&#8217;s a lot of syntax for a very simple procedure. Compare that to the more terse arrow function version:

    var result = values.sort((a, b) => a - b);

The array methods that accept callback functions such as `sort()`, `map()`, and `reduce()` all can benefit from simpler syntax with arrow functions to change what would appear to be more complex processes into simpler code.

## Other things to know {#other-things-to-know}

Arrow functions are different than traditional functions but do share some common characteristics. For example:

  * The `typeof` operator returns "function" for arrow functions.
  * Arrow functions are still instances of `Function`, so `instanceof` works the same way.
  * The methods `call()`, `apply()`, and `bind()` are still usable with arrow functions, though they do not augment the value of `this`.

The biggest difference is that arrow functions can&#8217;t be used with `new`, attempting to do results in an error being thrown.

## Conclusion {#conclusion}

Arrow functions are an interesting new feature in ECMAScript 6, and one of the features that is pretty solidified at this point in time. As passing functions as arguments has become more popular, having a concise syntax for defining these functions is a welcome change to the way we&#8217;ve been doing this forever. The lexical `this` binding solves a major painpoint for developers and has the added bonus of improving performance through JavaScript engine optimizations. If you want to try out arrow functions, just fire up the latest version of Firefox, which is the first browser to ship an implementation in their official release.
