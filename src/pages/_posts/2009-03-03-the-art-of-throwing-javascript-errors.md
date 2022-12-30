---
title: The art of throwing JavaScript errors
author: Nicholas C. Zakas
permalink: /blog/2009/03/03/the-art-of-throwing-javascript-errors/
categories:
  - Web Development
tags:
  - Errors
  - JavaScript
---
When I was younger, the most befuddling part of programming languages was the ability to create errors. My first reaction to the `throw` operator in Java was, &#8220;well that's stupid, why would you ever want to *cause* an error?&#8221; Errors were the enemy to me, something I sought to avoid, so the ability to cause an error seemed like a useless and dangerous aspect of the language. I thought it was dumb to include the same operator in JavaScript, a language that people just didn't understand in the first place. Now with a great deal of experience under my belt, I'm a big fan of throwing my own errors. Doing so can lead to easier debugging and code maintenance when done properly.

When programming, an error occurs when something unexpected happens. Maybe the incorrect value was passed into a function or a mathematical operation had an invalid operand. Programming languages define a base set of rules that, when deviated from, result in errors so that the developer can fix the code. Debugging would be nearly impossible if errors weren't thrown and reported back to you. If everything failed silently, it would take you a long time to notice that there was an issue in the first place, let alone isolate and fix it. Errors are the friends of developers, not enemies.

The problem with errors is that they tend to pop up in unexpected places and at unexpected times. To make matters worse, the default error messages are usually too terse to really explain what went wrong. JavaScript error messages are notoriously uninformative and cryptic (especially in Internet Explorer), which only compounds the problem. Imagine if an error popped up with a message that said, &#8220;this function failed because this happened.&#8221; Instantly, your debugging task becomes easier. This is the advantage of throwing your own errors.

It helps to think of errors as built-in failure cases. It's always easier to plan for a failure at a particular point in code than it is to anticipate failure everywhere. This is a very common practice in product design, not just in code. Cars are built with crumple zones, areas of the frame that are designed to collapse in a predictable way when impacted. Knowing how the frame will react in a crash, which parts will fail, allow the manufacturers to ensure passenger safety. Your code can be constructed in the same way.

Even though JavaScript has come a long way in the past few years, JavaScript developers still have far less tools to aid in debugging than developers of other languages. Throwing errors in your JavaScript is arguably more valuable than in any other language due to the difficulties around debugging. You can throw an by using the `throw` operator and providing an object to throw. Any type of object can be thrown, however, an `Error` object is the most typical to use:

    throw new Error("Something bad happened.")

When you throw an error in this way, and the error isn't caught via a `try-catch` statement, the browser will display the error text in the browser's typical way. For Internet Explorer, this means a little icon in the lower-left corner of the browser is displayed and a dialog with the error text is displayed when that icon is double clicked; Firefox with Firebug installed will show the error in the console; Safari and Chrome output the error onto the Web Inspector; Opera shows the error in the Error Console. In other words, it's treated the same way as an error that you didn't throw.

The difference is that you get to provide the exact text to be displayed by the browser. Instead of just line and column numbers, you can include any information that you'll need to successfully debug the issue. I typically recommend that you always include the function name in the error message as well as the reason why the function failed. Consider the following function:

    function addClass(element, className){
        element.className += " " + className;
    }

This function's purpose is to add a new CSS class to the given element (a very common method in JavaScript libraries). But what happens if `element` is `null`? You'll get a cryptic error message such as, &#8220;object expected.&#8221; Then, you'll need to look at the execution stack (if your browser supports it) to actually locate the source of the problem. Debugging becomes much easier by throwing an error:

    function addClass(element, className){
        if (element != null && typeof element.className == "string"){
            element.className += " " + className;
        } else {
            throw new Error("addClass(): First arg must be a DOM element.");
        }
    }

Discussions about accurately detecting whether an object is a DOM element or not aside, this method now provides better messaging when it fails due to an invalid `element` argument. Seeing such a verbose message in your error console immediately leads you to the source of the problem. I like to think of throwing errors as leaving post-it notes for myself as to why something failed.

Understanding how to throw errors is just one part of the equation; understanding *when* to throw errors is the other. Since JavaScript doesn't have type- or argument-checking, a lot of developers incorrectly assume that they should implement that for every function. Doing so is impractical and can adversely affect the overall script's performance. The key is to identify parts of the code that are likely to fail in a particular way and only throw errors there. In short, only throw errors where errors will already occur.

If a function is only ever going to be called by known entities, error checking is probably not necessary (this is the case with private functions); if you cannot identify all the places where a function will be called ahead of time, then you'll likely need some error checking and will even more likely benefit from throwing your own errors. The best place for throwing errors is in utility functions, those functions that are a general part of the scripting environment and may be used in any number of places. This is precisely the case with JavaScript libraries.

All JavaScript libraries should throw errors from their public interfaces for known error conditions. [YUI][1]/[jQuery][2]/[Dojo][3]/etc. can't possibly anticipate when and where you'll be calling their functions. It's their job to tell you when you're doing stupid things. Why? Because you shouldn't have to debug into their code to figure out what went wrong. The call stack for an error should terminate in the library's interface, no deeper. There's nothing worse than seeing an error that's 12 functions deep into a library; library developers have a responsibility to prevent this from happening.

This also goes for private JavaScript libraries. Many web applications have their own proprietary JavaScript libraries either built with or in lieu of the well-known public options. The goal of libraries is to make developers' lives easier, and this is done by providing an abstraction away from the dirty implementation details. Throwing errors helps to keep those dirty implementation details hidden safely away from developers.

JavaScript also provides a `try-catch` statement that is capable of intercepting thrown errors before they are handled by the browser. Typically, developers have trouble discerning whether it's appropriate to throw an error or catch one using `try-catch`. Errors should only be thrown in the deepest part of the application stack which, as discussed previously, typically means JavaScript libraries. Any code that handles application-specific logic should have error handling capabilities and should therefore be catching errors thrown from the lower-level components.

Application logic always knows why it was calling a particular function and so is best suited for handling the error. It's important to mention that you should never have a `try-catch` statement with an empty `catch` clause; you should always be handling errors in some way. This may be different in development versus production, but it must be done. If an error happens, the answer should never be to simply wrap it in a `try-catch` and let it be &#8211; this masks an error rather than dealing with it.

Throwing errors in JavaScript is an art. It takes time to feel out where the appropriate parts of your code should throw errors. Once you figure this out, however, you'll find that your debugging time will decrease and your satisfaction with the code will increase.

 [1]: http://developer.yahoo.com/yui/
 [2]: http://www.jquery.com/
 [3]: http://www.dojotoolkit.org/
