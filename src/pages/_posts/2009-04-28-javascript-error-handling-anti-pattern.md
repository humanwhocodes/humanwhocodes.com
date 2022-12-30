---
title: JavaScript error handling anti-pattern
author: Nicholas C. Zakas
permalink: /blog/2009/04/28/javascript-error-handling-anti-pattern/
categories:
  - Web Development
tags:
  - Debugging
  - Errors
  - JavaScript
---
One of the areas I feel lacks enough discussion is error handling in JavaScript. While a lot of thought typically goes into error handling in server software, complete with error logs and monitoring systems, there's very little emphasis on the same for JavaScript. I've tried to raise awareness of this with my Ajax Experience talk, [Enterprise JavaScript Error Handling][1], where I discussed error handling approaches as well as common error sources.

One of my suggestions in the talk was to provide a debug mode for your application. The idea is that production mode hides JavaScript errors from the user and handles them appropriately while debug mode allows errors to bubble up to the browser level and be reported as usual. The latter is important, of course, for debugging purposes. When the error is popped up in the browser, you have the option to debug with all of the surrounding context information. The pattern I suggested in my talk looks like this:

    function doSomething(value){
        try {
            process(value);
        } catch (ex){
            if (debugMode){
                throw ex;
            } else {
                log(1, "doSomething(): " + ex.message);
            }
        }
    }

The idea here is that the error is caught and, depending on the mode, does something appropriate. As often happens in development, I've now discovered that this isn't the best approach and actually introduces a painful consequence.

If an error occurs in `process()`, that error is trapped and thrown from `doSomething()`, which disrupts the call stack. The error is now too far away from the actual event to be useful for debugging. All of the context information that could lead to a solution is lost once execution exits `process()`. Imagine having your debugger set to break on all errors: using this code, the break would occur on the line containing `throw ex` when you really want it to break inside of `process()` because that's where the actual problem is.

I now consider this an error handling anti-pattern, a pattern that prevents useful debugging rather than enabling it. The pattern I now recommend is to completely remove the `try-catch` statement when in debug mode. This allows for normal code execution and will result in the correct call stack placement when an error occurs. There are a couple of ways to accomplish this pattern, the first is a rather ugly-looking conditional statement:

    function doSomething(value){
        if (debugMode){
            process(value);
        } else {
            try {
                process(value);
            } catch (ex){
                log(1, "doSomething(): " + ex.message);
            }
        }
    }

The second, arguably more elegant approach is to simply replace the entire function based on the execution mode:

    var doSomething = debugMode ?
        function(value){
            process(value);
        } :
        function(value){
            try {
                process(value);
            } catch (ex){
                log(1, "doSomething(): " + ex.message);
            }
        };

This is my preferred approach because it eliminates checking `debugMode` each time the function is executed. Also, this approach is easy to automate. Suppose you have one or more objects and you want all of their methods to have a wrapper in production to trap errors. The following code accomplishes this quite easily:

    //by Nicholas C. Zakas (MIT Licensed)
    function productionize(object){
    
        var name,
            method;
    
        for (name in object){
            method = object[name];
            if (typeof method == "function"){
                object[name] = function(name, method){
                    return function(){
                        try {
                            return method.apply(this, arguments);
                        } catch (ex) {
                            log(1, name + "(): " + ex.message);
                        }
                    };
    
                }(name, method);
            }
        }
    }

This code iterates over an object's properties and replaces each function with another function containing the appropriate error handling mechanism. You can use the function like this:

    var system = {
        fail: function(){
            throw new Error("Oops!");
        }
    };
    
    function log(severity, message){
        alert(severity + ":" + message);
    }
    
    if (!debugMode){
        productionize(system);
    }
    
    system.fail();   //error is trapped!

This pattern of error trapping will serve you well in complex environments where errors can be difficult to track down. Making sure that the error is thrown from the right place is the first step in debugging the problem.

 [1]: http://www.slideshare.net/nzakas/enterprise-javascript-error-handling-presentation
