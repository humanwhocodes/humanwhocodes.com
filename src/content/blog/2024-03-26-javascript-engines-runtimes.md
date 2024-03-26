---
title: "What's the difference between JavaScript engines and JavaScript runtimes?"
teaser: "Runtimes and engines are often incorrectly referred to as the same thing."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - ECMAScript
  - APIs
---

You have probably heard the terms “JavaScript engine” and “JavaScript runtime” used interchangeably to mean “a program that runs JavaScript.” These are often intermixed by referencing V8, Node.js, or some other combination of related programs. However, there is a significant difference between a JavaScript engine and a JavaScript runtime in terms of scope and functionality. Understanding this difference is key to a good understanding of the JavaScript language as a whole.

Before discussing what an engine is vs. a runtime, though, it helps to define a couple of terms that are often used in conjunction with both engine and runtime: ECMAScript and JavaScript.

## What is ECMAScript?

In 1996, Netscape and Sun Microsystems approached Ecma International, a nonprofit standards organization, about standardizing JavaScript. The result of that effort, released in 1997, was ECMA-262, the specification that defines how a JavaScript implementation should work. With Sun unwilling to donate the JavaScript trademark,[^1] the specification had to have a different name, and so ECMA-262 was titled, “ECMAScript Language Specification.” ECMAScript, therefore, is the name of the language specified in ECMA-262. 

ECMAScript defines the core functionality of JavaScript that must be implemented by conforming implementations regardless of where they are embedded (a program that embeds an implementation is called a host). Even at this early stage, Netscape intended to use JavaScript not just in the browser, but also on the server, and ECMAScript was to serve as the core for both implementations. As such, ECMAScript does not contain any web-related functionality nor any way to input or output data (such functionality must be provided by the host). That means ECMAScript contains, for example, standard global classes such as `Object`, `Array`, and `Promise`, but does not contain `HTMLElement`, `setTimeout`, or `fetch()`.

## What is JavaScript?

The term “JavaScript” has no formal definition but it’s widely understood to be a superset of the ECMAScript language. That means JavaScript implements ECMAScript in addition to other specifications and other functionality. In its early form, JavaScript was considered to be ECMAScript plus the web-based APIs like the Document Object Model (DOM) and browser-based APIs like the History API. Today, JavaScript is considered to be any combination of ECMAScript plus any other host-provided APIs. This includes web-specific API for browsers and server-specific APIs for hosts like Node.js.

## What is a JavaScript engine?

What are commonly referred to as JavaScript engines could more accurately be called ECMAScript engines, because they implement ECMA-262 without any (or much) additional functionality. A JavaScript engine is meant to be embedded in a host, which in turn defines additional functionality for input and output. The best known JavaScript engines are:

* V8[^2] - Created as the JavaScript engine for the Chromium project and is now also used in Node.js and Deno. Because Edge and Opera are based on Chromium, V8 is the most frequently used JavaScript engine.
* SpiderMonkey[^3] - The JavaScript engine for Firefox.
* JavaScriptCore[^4] - Created as the JavaScript engine for Safari, both on MacOS and in iOS, and is also used in Bun.

Because JavaScript engines only implement ECMAScript and are meant to be extended by a host, they can be used in a variety of different runtime environments.

## What is a JavaScript runtime?

A JavaScript runtime is an ECMAScript host, meaning that it is a program that embeds a JavaScript engine. Chrome, Firefox, Edge, Safari, Node.js, Deno, and Bun are all JavaScript runtimes because they embed a JavaScript engine and define additional functionality that is accessible through JavaScript. The web browsers implement the DOM and other web APIs while the server-side runtimes implement file system access.

There are no rules as to what additional functionality a JavaScript runtime may add; the runtime developers can decide for themselves. That’s why Node.js, Deno, and Bun all implement file systems in different ways and why Deno decided to favor web APIs such as `fetch()` while Node.js initially decided to implement their own HTTP client (Node.js has since also adopted `fetch()`). But it’s not just JavaScript APIs that make JavaScript runtimes unique. It’s also the way in which they use the JavaScript engine.

The event loop, the process that allows a runtime to switch between running JavaScript and performing other tasks, for example, is not defined in ECMA-262 and therefore is not implemented in any JavaScript engine. It’s up to each JavaScript runtime to implement its own event loop. Web browsers have their version of the event loop defined in the HTML specification[^5] but server-side runtimes such as Node.js define their own.[^6] An event loop is not required for a JavaScript runtime but is found in general-purpose JavaScript runtimes.

## Summary

JavaScript engines and JavaScript runtimes are related but not the same. A JavaScript engine implements ECMAScript as defined by the ECMA-262 standard. ECMA-262 defines the core functionality of JavaScript without any affordances for input or output. A JavaScript runtime is an ECMAScript host that embeds a JavaScript engine and augments it with additional functionality for input and output, along with anything else the runtime needs. Additional functionality might include the DOM in web browsers or file system access in server-side runtimes. Runtimes are under no obligation to follow other standards and are able to define their own APIs as necessary, which is why Node.js, Deno, and Bun all have different file system APIs.

[^1]: [JavaScript creator ponders past, future](https://www.infoworld.com/article/2653798/javascript-creator-ponders-past-future.html)
[^2]: [V8 - Google's open source JavaScript engine](https://v8.dev/)
[^3]: [SpiderMonkey - The JavaScript engine for Firefox](https://spidermonkey.dev/)
[^4]: [JavaScriptCore - The JavaScript engine for Safari](https://docs.webkit.org/Deep%20Dive/JSC/JavaScriptCore.html)
[^5]: [HTML Living Standard - Event Loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
[^6]: [Node.js - Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#what-is-the-event-loop)
