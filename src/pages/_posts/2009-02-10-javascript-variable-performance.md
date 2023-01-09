---
title: JavaScript variable performance
author: Nicholas C. Zakas
permalink: /blog/2009/02/10/javascript-variable-performance/
categories:
  - Web Development
tags:
  - JavaScript
  - Performance
  - Variables
---
One of the most common pieces of advice regarding JavaScript performance is to favor local variables over global variables whenever possible. This advice has been around for at least as long as I've been working web development (nine years) and is never questioned. The basis for this theory is the way that JavaScript handles scoping and identifier resolution.

The first thing to remember is that functions are objects in JavaScript, so creating a function actually means creating an object to represent it. Each function object has an internal property called `[[Scope]]` that is initialized with information about the scope in which the function was created. The `[[Scope]]` property is actually a list of variable objects accessible from the function's containing scope. When you create a global function, it's `[[Scope]]` property has only the global object in the list; when a function is created inside of a global function, the global function's activation object is at the front of `[[Scope]]` and the global object is second.

When a function is executed, an activation object is created and then has a scope chain associated with it. The scope chain is used for identifier resolution and is created in two steps:

  1. The objects in the function object's `[[Scope]]` property are copied into the scope chain in the same order.
  2. A new activation object is created with variables for the executing function. This object contains the definitions for `this`, `arguments`, and local variables (including named arguments), and is pushed onto the front of the scope chain.

When an identifier is encountered, the execution context's scope chain is searched for an identifier with a matching name. The search begins at the first object in the scope chain, the function's activation object, and continues towards the global object until the variable is found (or ends in an error if the variable is never found). This is the way that [ECMA-262][1] describes the behavior of function execution and identifier resolution and, as it turns out, is the way that many JavaScript engines have implemented the language. Note that ECMA-262 does not mandate this structure, it is merely provided as a description of the appropriate functionality.

Given this description of identifier resolution, it makes sense that local variables should have faster identifier resolution than variables from other scopes because the search for a matching name is much shorter. But how much faster? In order to answer this question, I set up a series of tests using variables of different scope-depth.

My first tests involved writing a simple value to variables (literally, the value 1). The results were interesting.

<p style="text-align: center;">
  <a href="/images/posts/2009/02/variable_write_performance2.png"><img src="https://humanwhocodes.com/blog/wp-content/uploads/2009/02/variable_write_performance2.png" alt="JavaScript Variable Write Performance Graph" width="574" height="389" /></a>
</p>

From the results, it's clear that there is a performance penalty associated with deep searches for identifier resolution. Each increase in identifier depth shows an increase in execution. Internet Explorer, not surprisingly, is the worst of the class (although IE 8 does show some improvement). The notable exceptions in this case are Google Chrome and the latest nightly WebKit as their variable access times remain roughly constant even as identifier depth increases. This can be attributed to their next-generation JavaScript engines, V8 and SquirrelFish respectively. These engines perform optimizations to run code faster, and clearly, these optimizations make variable access much faster than others. Opera performed admirably, being faster than IE, Firefox, and current Safari versions but slower than the V8 and Squirrelfish-powered browsers. Firefox 3.1 Beta 2 was somewhat surprising as local variable writes were very fast but performance degraded significantly once the variable was out of the local scope. It's worth noting that I was using the default settings and therefore didn't have tracing turned on.

Those results were for variable writes, and I wondered if the performance for variable reads would be any different. Variable reads turned out to be somewhat faster than writes even though the same trends emerged.

[<img src="/images/posts/2009/02/variable_read_performance2.png" alt="JavaScript Variable Read Performance Graph" width="574" height="389" />][2]

Once again, Internet Explorer and Firefox are the slowest, with Opera showing respectable performance. And once again, Chrome and the latest WebKit nightly show flat performance based on identifier depth. Also notable is the same strange jump in Firefox 3.1 Beta 2&#8242;s variable access times once you're no longer dealing with local variables.

One interesting thing I found in my research is that Chrome has a performance penalty for accessing global variables. The access time for global variables remains constant regardless of identifier depth but that value is 50% higher than the amount of time it takes to access local variables with the same identifier depth.

What does all of this mean? It basically means that my research supports that advice that you should use local variables whenever possible. In almost all browsers, local variables are faster for both reading and writing than out-of-scope variables including globals. You can take advantage of this knowledge in several ways:

  * Watch the variables being used in a function. If you notice a function using an out-of-scope variable more than once, store it in a local variable and use that instead. You'll be reducing the number of out-of-scope identifier resolutions for that variable to one. This is especially important for global variables, which are always the last object in the scope chain.
  * Avoid using the `with` statement. It temporarily augments the execution context's scope chain by adding a new variable object to the front. This means that local variables actually move to an identifier depth of two during execution of the `with`, imposing a performance penalty.
  * Avoid using `try-catch` if you know an error will always occur. The catch clause augments the scope chain in the same manner as the `with` statement. There is no penalty for running code in the `try` portion of the code, so it is still advisable to use `try-catch` for dealing with unexpected errors.

If you'd like a bit more discussion around this topic, I gave a short talk at last month's [Mountain View JavaScript Meetup][3]. The [slides][4] are available on SlideShare and a [video][5] of the entire night is available on YouTube (I'm at about the 11 minute mark). The video is especially entertaining as my laptop was misbehaving the entire time.

## Translations

  * [Chinese (Simplified)][6]

 [1]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
 [2]: /images/posts/2009/02/variable_read_performance2.png
 [3]: http://javascript.meetup.com/9/
 [4]: http://www.slideshare.net/nzakas/java-script-variable-performance-presentation
 [5]: http://www.youtube.com/watch?v=MHBbK9dt0Kg
 [6]: http://cuimingda.com/2009/02/javascript-variable-performance.html
