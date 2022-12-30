---
title: 'Answering Baranovskiy's JavaScript quiz'
author: Nicholas C. Zakas
permalink: /blog/2010/01/26/answering-baranovskiys-javascript-quiz/
categories:
  - Web Development
tags:
  - Hoisting
  - JavaScript
---
Last week, I [tweeted][1] about a JavaScript quiz I came across on Dmitry Baranovskiyâ€™s blog entitled, [So you think you know JavaScript?][2] As with other quizzes of this type, there is only one question to answer for five different pieces of example code: what is the result? The example code tests some of the quirkier attributes of JavaScript engine behavior. I've seen similar quizzes in the past, sometimes by people saying that they use it as a test during job interviews. I think doing so is both disrespectful to the candidate as well as generally useless. You don't encounter this type of quirk every day, so making that the minimum to get a job is about as useful as asking flight attendant candidate to explain jet propulsion.

Still, I liked some of the example code in this post because it can be used to explain some interesting things about JavaScript as a language. The following is an in-depth explanation of what is happening in each of those examples.

## Example #1

    if (!("a" in window)) {
        var a = 1;
    }
    alert(a);

This strange looking piece of code seems to say, &#8220;if window doesn't have a property &#8216;a', define a variable &#8216;a' and assign it the value of 1.&#8221; You would then expect the alert to display the number 1. In reality, the alert displays &#8220;undefined&#8221;. To understand why this happens, you need to know three things about JavaScript.

First, all global variables are properties of `window`. Writing `var a = 1` is functionally equivalent to writing `window.a = 1`. You can check to see if a global variable is declared, therefore, by using the following:

    "variable-name" in window

Second, all variable declarations are *hoisted* to the top of the containing scope. Consider this simpler example:

    alert("a" in window);
    var a;

The alert in this case outputs &#8220;true&#8221; even though the variable declaration comes after the test. This is because the JavaScript engine first scans for variable declarations and moves them to the top. The engine ends up executing the code like this:

    var a;
    alert("a" in window);
    

Reading this code, it makes far more sense as to why the alert would display &#8220;true&#8221;.

The third thing you need to understand to make sense of this example is that while variable *declarations* are hoisted, variable *initializations* are not. This line is both a declaration and an initialization:

    var a = 1;

You can separate out the declaration and the initialization like this:

    var a;    //declaration
    a = 1;    //initialization

When the JavaScript engines comes across a combination of declaration and initialization, it does this split automatically so that the declaration can be hoisted. Why isn't the initialization hoisted? Because that could affect the value of the variable during code execution and lead to unexpected results.

So, knowing these three aspects of JavaScript, re-examine the original code. The code actually gets executed as if it were the following:

    var a;
    if (!("a" in window)) {
        a = 1;
    }
    alert(a);

Looking at this code should make the solution obvious. The variable `a` is declared first, and then the `if` statement says, &#8220;if `a` isn't declared, then initialize `a` to have a value of 1.&#8221; Of course, this condition can never be true and so the variable a remains with its default value, `undefined`.

## Example #2

    var a = 1,
        b = function a(x) {
            x && a(--x);
        };
    alert(a);
    

This code looks far more complex than it actually is. The result is that the alert displays the number 1, the value to which a was initialized. But why is that? Once again, this example relies on knowledge of three key aspects of JavaScript.

The first concept is that of variable declaration hoisting, which example #1 also relied upon. The second concept is that of *function* declaration hoisting. All function declarations are hoisted to the top of the containing scope along with variable declarations. Just to be clear, a function declaration looks like this:

    function functionName(arg1, arg2){
        //function body
    }

This is opposed to a function expression, which is a variable assignment:

    var functionName = function(arg1, arg2){
        //function body
    };

To be clear, function expressions *are not* hoisted. This should make sense to you now, as just with variable initialization, moving the assignment of a value from one spot in code to another can alter the execution significantly.

The third concept that you must know to both understand and get confused by this example is that function declarations override variable declarations but not variable initializations. To understand this, consider the following

    function value(){
        return 1;
    }
    var value;
    alert(typeof value);    //"function"

The variable `value` ends up as a function even though the variable declaration appears after the function declaration. The function declaration is given priority in this situation. However, throw in variable initialization and you get a different result:

    function value(){
        return 1;
    }
    var value = 1;
    alert(typeof value);    //"number"

Now the variable `value` is set to 1. The variable initialization overrides the function declaration.

Back to the example code, the function is actually a function expression despite the name. Named function expressions are not considered function declarations and therefore don't get overridden by variable declarations. However, you'll note that the variable containing the function expression is `b` while the function expression's name is `a`. Browsers handle that a differently. Internet Explorer treats it as a function declaration, so it gets overridden by the variable initialization, meaning that the call to `a(--x)` causes an error. All other browsers allow the call to `a(--x)` inside of the function while a is still a number outside of the function. Basically, calling `b(2)` in Internet Explorer throws a JavaScript error but returns `undefined` in others.

All of that being said, a more correct and easier to understand version of the code would be:

    var a = 1,
        b = function(x) {
            x && b(--x);
        };
    alert(a);

Looking at this code, it should be clear that `a` will always be 1.

## Example #3

    function a(x) {
        return x * 2;
    }
    var a;
    alert(a);
    

If you were able to understand the previous example, then this one should be pretty simple. The only thing you need to understand is that function declarations trump variable declarations unless there's an initialization. There's no initialization here, so the alert displays the source code of the function.

## Example #4

    function b(x, y, a) {
        arguments[2] = 10;
        alert(a);
    }
    b(1, 2, 3);

This code is a bit easier to understand as the only real question you must answer is whether the alert displays 3 or 10. The answer is 10 in all browsers. There's only one concept you need to know to figure out this code. ECMA-262, 3rd Edition, section 10.1.8 says about an `arguments` object:

> For each non-negative integer, `arg`, less than the value of the `length` property, a property is created with name `ToString(arg)` and property attributes `{ DontEnum }`. The initial value of this property is the value of the corresponding actual parameter supplied by the caller. The first actual parameter value corresponds to `arg` = 0, the second to `arg` = 1, and so on. In the case when `arg` is less than the number of formal parameters for the `Function` object, this property shares its value with the corresponding property of the activation object. *This means that changing this property changes the corresponding property of the activation object and vice versa.*

In short, each entry in the `arguments` object is a duplicate of each named argument. Note that the values are shared, but not the memory space. The two memory spaces are kept synchronized by the JavaScript engine, which means that both `arguments[2]` and `a` contain the same value at all times. That value ends up being 10.

## Example #5

    function a() {
        alert(this);
    }
    a.call(null);
    

I actually considered this to be the easiest of the five examples in this quiz. It relies on understanding two JavaScript concepts.

First, you must understand how the value of the `this` object is determined. When a method is called on an object, `this` points to the object on which the method resides. Example:

    var object = {
        method: function() {
            alert(this === object);    //true
        }
    }
    object.method(); 

In this code, `this` ends up pointing to `object` when `object.method()` is called. In the global scope, `this` is equivalent to `window` (in browsers, in non-browser environments it's the `global` object equivalent), so `this` is also equal to `window` inside of a function that isn't an object property. Example:

    function method() {
        alert(this === window);    //true
    }
    method(); 

Here, `this` ends up pointing to the global object, `window`.

Armed with this knowledge, you can now tackle the second important concept: what `call()` does. The `call()` method executes a function as if it were a method of another object. The first argument becomes `this` inside the method, and each subsequent argument is passed as an argument to the function. Consider the following:

    function method() {
        alert(this === window);
    }
    method();    //true
    method.call(document);   //false

Here, the `method()` function is called such that `this` will be `document`. Therefore, the alert displays &#8220;false&#8221;.

An interesting part of ECMA-262, 3rd edition describes what should happen when `null` is passed in as the first argument to `call()`:

> If `thisArg` is `null` or `undefined`, *the called function is passed the global object as the this value*. Otherwise, the called function is passed `ToObject(thisArg)` as the this value.

So whenever `null` is passed to `call()` (or its sibling, `apply()`), it defaults to the global object, which is `window`. Given that, the example code can be rewritten in a more understandable way as:

    function a() {
        alert(this);
    }
    a.call(window);

This code makes it obvious that the alert will be displaying the string equivalent of the `window` object.

## Conclusion

Dmitry put together an interesting quiz from which you can actually learn some of the strange quirks of JavaScript. I hope that this writeup has helped everyone understand the details necessary to figure out what each piece of code is doing, and more importantly, why it's doing so. Again, I caution against using these sort of quizzes for job interviews as I don't think they serve any practical use in that realm (if you'd like to know my take on interviewing front-end engineers, see my [previous post][3]).

 [1]: http://twitter.com/slicknet/status/8057003813
 [2]: http://dmitry.baranovskiy.com/post/91403200
 [3]: {{site.url}}/blog/2010/01/05/interviewing-the-front-end-engineer/
