---
title: 'Maintainable Node.js JavaScript: Avoid process.exit()'
author: Nicholas C. Zakas
permalink: /blog/2014/02/04/maintainable-node-js-javascript-avoid-process-exit/
categories:
  - Web Development
tags:
  - JavaScript
  - Maintainable
  - Node.js
---
I&#8217;ve spent the last few months digging into Node.js, and as usual, I&#8217;ve been keeping tabs on patterns and problems that I&#8217;ve come across. One problematic pattern that recently came up in a code review was the use of `process.exit()`. I&#8217;ve ended up finding several examples of this, and I&#8217;m prepared to go so far as to say there are very few places where calling `process.exit()` makes sense.

## What it does

When you call `process.exit()` (and optionally pass in an exit code), you cause processing to stop. The `exit` event is fired, which is the last opportunity for any code to run, and the event loop is stopped. Shortly thereafter Node.js actually stops completely and returns the specified exit code. So `process.exit()` stops Node.js from doing anything tangible after that point and the application stops.

## The problem

In and of itself, the ability to exit with a specified exit code isn&#8217;t a horrible thing. Many programming languages offer this capability and it&#8217;s relied upon for all kinds of processing, not the least of which are build tools. The real problem is that `process.exit()` can be called by any part of the application at any time. There is nothing preventing a parser from calling it:

    exports.parse = function(text) {
    
        if (canParse(text)) {
            return doTheParse(text);
        } else {
            console.error("Can't parse the text.");
            process.exit(1);
        }
    
    };

So if the text can be parsed then it is, but otherwise an error is output to the console and `process.exit(1)` is called. That&#8217;s an awful lot of responsibility for a lowly parser. I&#8217;m sure other parsers are jealous that this one gets to tell the entire consuming application to shut down.

Since any module can call `process.exit()`, that means any function call gone awry could decide to shut down the application. That&#8217;s not a good state to be in. There should be one area of an application that decides when and if to call `process.exit()` and what the exit code should be (that&#8217;s usually the application controller). Utilities and such should never use `process.exit()`, it&#8217;s way out of their realm of responsibility.

## What to do instead

Anytime you&#8217;re thinking about using `process.exit()`, consider throw an error instead:

    exports.parse = function(text) {
    
        if (canParse(text)) {
            return doTheParse(text);
        } else {
            throw new Error("Can't parse the text.");
        }
    
    };

Throwing an error has a similar effect as calling `process.exit()` in that code execution in this function stops immediately. However, calling functions have the opportunity to catch the error and respond to it in a graceful manner. If there is no intervention up the call stack, then the `uncaughtException` event is fired on `process`. If there are no event handlers, then Node.js will fire the `exit` event and exit with a non-zero exit code just like when `process.exit()` is called; if there are event handlers, then it is up to you to manually call `process.exit()` to specify the exit code to use.

The key is that throwing an error gives the application an opportunity to catch the error and recover from it, which is almost always the desired case when dealing with module code.

## Conclusion

In your entire application there is likely only ever the need for one call to `process.exit()`, and that should be in the application controller. All other code, especially code in modules, should throw errors instead of using `process.exit()`. This gives the application an opportunity to recover from the error and do something appropriate rather than die in the middle of an operation. Calling `process.exit()` is the same as saying, &#8220;this is a fatal error.&#8221; Make sure the severity is appropriate for the situation at hand, and when in doubt, just throw an error.
