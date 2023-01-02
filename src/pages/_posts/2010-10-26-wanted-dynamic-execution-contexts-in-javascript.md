---
title: "Wanted: Dynamic execution contexts in JavaScript"
author: Nicholas C. Zakas
permalink: /blog/2010/10/26/wanted-dynamic-execution-contexts-in-javascript/
categories:
  - Web Development
tags:
  - JavaScript
  - Security
  - XSS
---
One of the most common problems faced by web developers today is how to load third-party JavaScript onto a page without sacrificing the security and stability of the page. Certainly, it's been repeated enough time that most know blindly including a JavaScript file that you didn't write is a surefire path towards cross-site scripting (XSS) attacks, yet the popularity of mashups has made us re-solve this problem multiple times. To be sure, we need a safe way to load others' JavaScript onto a page with some reasonable amount of assurance that it won't negatively affect the containing page. Yet no one has come up with a lightweight way of doing this.

## Current solutions

This is not a new problem for the web, so there have been many attempts to solve this problem. All of the approaches involve creating a sandbox for JavaScript. The goal is to allow JavaScript to execute without access to all parts of the page. Some current approaches:

  * **IFrames **- The classic solution to this problem is to load the third-party JavaScript into the page via an iframe from a separate domain. The iframe then becomes the sandbox in which the JavaScript executes without being able to access the parent frame (due to the cross-origin restriction).
  * [**Facebook JavaScript (FBJS)**][1] &#8211; Facebook's JavaScript interface for application developers essentially consists of two parts. The first is script rewriting, where they process the third party JavaScript and modify the names of functions and variables to ensure your names won't overlap native or host objects (which would create security issues). The second step is locking down the JavaScript execution environment so that you can only access objects that the Facebook API exposes. This is done by shadowing global variables. This is a slippery security slope, as browsers continually add new objects, but it gets the job done.
  * [**Caja**][2] &#8211; Google's attempt at an object-capability security model for JavaScript. Caja works by rewriting the JavaScript such that it executes in a sandboxed environment. You can then decide which objects to expose to the executing code as a way of granting access to certain functionality. The resulting code is fairly locked-down, but is larger and slower to execute.

All of these approaches try to accomplish the exact same thing, which is to give some JavaScript code a sanitized environment in which to execute. Unfortunately, each comes with additional overhead of maintenance and performance issues.

## What we really need

The solutions we have today really are trying to create a new [execution context][3] in which certain objects aren't available. Execution contexts are created and destroyed in JavaScript all the time &#8211; when you call a function, for example. The problem, in the case of third parties, is that you don't necessarily want the entire [scope chain][4] in the execution context when this script is executing. This is difficult because you typically don't want the global object (`window`) but you do want the native types such as `Object`, `Array`, `String`, etc.. You want the local scope but not everything in between the global and the local. Cherry-picking from the scope chain is just not possible so instead the scope chain is neutered, leaving you only with the local scope, and then objects are passed down into that scope (the approach by both FBJS and Caja).

If you were to look at embedding V8, the JavaScript engine from Chrome, in your C++ application, you would do so by creating an execution context based on a global object and then execute some code with it (from the [Getting Started][5] guide):

    Â // Create a stack-allocated handle scope.
    HandleScope handle_scope;
    
    // Create a new context.
    Persistent<Context> context = Context::New();
    
    // Enter the created context for compiling and
    // running the hello world script.
    Context::Scope context_scope(context);
    
    // Create a string containing the JavaScript source code.
    Handle<String> source = String::New("'Hello' + ', World!'");
    
    // Compile the source code.
    Handle<Script> script = Script::Compile(source);
    
    // Run the script to get the result.
    Handle<Value> result = script->Run();
    
    // Dispose the persistent context.
    context.Dispose(); 

Without dissecting this code, it basically creates a new execution context (via `Context::New()`) and then compiles and executes the JavaScript within it. That's how you would do it in C++, which led me to a question&#8230;why can't we do something similar in JavaScript? Here's what I'm thinking:

    var context = new ExecutionContext(),
        result = context.eval("2 + 2");

So here, you create a new `ExecutionContext` object which represents an entirely new execution context with its own global object and native types, but nothing else. Perhaps you could specify a global object in the constructor:

    var myglobal = {
            add: function(num1, num2){
                return num1 + num2;
            }
        },
        context = new ExecutionContext(myglobal),
        result = context.eval("add(2, 2)");

In this case, `myglobal` becomes the global object in `context`. All of the native type constructors end up attached to `myglobal`, as do any global variables or functions. Additionally, `myglobal` publishes the `add()` function so it's accessible inside of `context`. And of course `eval()` just executes code.

## How does this help?

Picture a third party script that is intended to control just one element on a page. You want to allow that script certain access to the element, but don't want it to be able to interact with any other part of the page (this is typically what you'd want with ads). You could setup an execution context specifically for that purpose via:

    var element = new MyElementWrapper(document.getElementById("foo")),
        context = new ExecutionContext(),
        context.set("element", element),
        context.load("http://www.example.com/foo/bar.js");

Assume that `MyElementWrapper` is a constructor that creates a wrapper object around a DOM element such that the executing code has no access to the rest of the DOM tree. I use the `set()` method to define a new global variable named `element` that points to the wrapper. The third-party script is then downloaded and executed via `load()` within this context, where it has access to all of the native JavaScript types but none of the DOM or BOM globals.

This solution isn't perfect, as you would have to know what the script intended to do so you could provide the correct objects to complete execution. You could also mistakenly pass in an object that the execution context shouldn't have access to.

## Is this realistic?

I have no idea how feasible this idea truly is &#8211; it was just something that occurred to me one night while trying to think through the JavaScript sandbox problem. On its surface, this seems like something that would be easy to implement given the underlying JavaScript engine implementation. I'd love to hear feedback from folks who work on JavaScript engines as to whether or not this is implementable (and of course, whether or not you would choose to implement if you could).

 [1]: http://developers.facebook.com/docs/fbjs
 [2]: http://code.google.com/p/google-caja/
 [3]: http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/
 [4]: http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/
 [5]: http://code.google.com/apis/v8/get_started.html
