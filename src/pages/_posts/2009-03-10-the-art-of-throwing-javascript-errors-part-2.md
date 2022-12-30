---
title: The art of throwing JavaScript errors, Part 2
author: Nicholas C. Zakas
permalink: /blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/
categories:
  - Web Development
tags:
  - Errors
  - JavaScript
---
In my [last post][1], I talked about how and when to throw JavaScript errors. I got a lot of responses and follow-up questions, so I thought I'd continue the discussion by explaining a little more about how to throw your own errors. To review, the basic syntax is:

    throw new Error("message");

This works in all browsers and will display the error information in the same way it would any unintentional JavaScript error. The &#8220;message&#8221; string is stored in the `message` property of the object (which is what the browser uses to display the message). Periodically, I see people throwing errors by just providing the string, such as this:

    throw "message";

Doing so will cause an error to be thrown, but not all browsers respond the way you'd expect. Firefox, Opera, and Chrome each display an &#8220;uncaught exception&#8221; message and then include the message string. Safari and Internet Explorer simply throw an &#8220;uncaught exception&#8221; error and don't provide the message string at all. Clearly, this is suboptimal from a debugging point of view.

Of course, you can throw any type of data that you'd like. There are no rules prohibiting specific data types:

    throw { name: "Nicholas" };
    throw true;
    throw 12345;
    throw new Date();
    

The only thing to remember is that throwing any value will result in an error if it's not caught via a `try-catch` statement. Firefox, Opera, and Chrome all call `String()` on the value that was thrown to display something logical as the error message; Safari and Internet Explorer do not. The only surefire way to have all browsers display your custom error message is to use an `Error` object.

ECMA-262, 3rd Edition actually specifies seven error object types. These are used by the JavaScript engine when various error conditions occur and can also be manually created:

  * `Error` &#8211; base type for all errors. Never actually thrown by the engine.
  * `EvalError` &#8211; thrown when an error occurs during execution of code via `eval()`
  * `RangeError` &#8211; thrown when a number is outside the bounds of its range. For example, trying to create an array with -20 items (`new Array(-20)`). These occur rarely during normal execution.
  * `ReferenceError` &#8211; thrown when an object is expected but not available, for instance, trying to call a method on a `null` reference.
  * `SyntaxError` &#8211; thrown when the code passed into `eval()` has a syntax error.
  * `TypeError` &#8211; thrown when a variable is of an unexpected type. For example, `new 10` or `"prop" in true`.
  * `URIError` &#8211; thrown when an incorrectly formatted URI string is passed into `encodeURI`, `encodeURIComponent`, `decodeURI`, or `decodeURIComponent`.

Understanding that there are different types of errors can make it easier to handle them. All error types inherit from `Error` so checking the type with `instanceof Error` doesn't give you any useful information. By checking for the more specific error types, you get more robust error handling:

    try {
        //something that causes an error
    } catch (ex){
        if (ex instanceof TypeError){
            //handle the error
        } else if (ex instanceof ReferenceError){
            //handle the error
        } else {
            //handle all others
        }
    }

If you're throwing your own errors, and you're throwing a data type that isn't an error, you can more easily tell the difference between your own errors and the ones that the browser throws. There are, however, several advantages to throwing actual `Error` objects instead of other object types.

First, as mentioned before, the error message will be displayed in the browser's normal error handling mechanism. Second, the browser attaches extra information to `Error` objects when they are thrown. These vary from browser to browser, but they provide contextual information for the error such as line number and column number and, in some browsers, stack and source information. Of course, you lose the ability to distinguish between your own errors and browser-thrown ones if you just use the `Error` constructor.

The solution is to create your own error type that inherits from `Error` . For example:

    function MyError(message){
        this.message = message;
    }
    
    MyError.prototype = new Error();
    

There are two important parts of this code: 1) the `message` property, which is necessary for browsers to know the actual error string and 2) setting the prototype to an instance of `Error`, which identifies the object as an error to the JavaScript engine. Now, you can throw an instance of `MyError` and have the browser respond as if it's a native error:

    throw new MyError("Hello world!");

The only caveat to this approach is that Internet Explorer prior to version 8 won't display the error message. Instead, you'll see the generic &#8220;exception thrown but not caught&#8221; error message. Throwing custom error objects allows you to test specifically for your own errors:

    try {
        //something that causes an error
    } catch (ex){
        if (ex instanceof MyError){
            //handle my own errors
        } else {
            //handle all others
        }
    }

If you're always catching any errors you throw, then IE's slight stupidity shouldn't matter all that much. The benefits from such an approach are huge in a system with proper error handling. This approach gives you much more flexibility and information for determining the correct course of action for a given error.

 [1]: {{site.url}}/blog/2009/03/03/the-art-of-throwing-javascript-errors/
