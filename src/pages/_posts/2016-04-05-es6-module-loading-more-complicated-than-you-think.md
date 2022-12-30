---
title: "ES6 module loading: More complicated than you think"
teaser: Module JavaScript can be indistinguishable from non-module JavaScript.
date: 2016-04-05 00:00:00
categories:
- Programming
tags:
- JavaScript
- ECMAScript 6
- Modules
---

One of the most long-awaited features of ECMAScript 6 is the formal definition of modules as part of the language. For years, JavaScript developers have struggled with organizing their code and needing to decide between alternate ad-hoc module formats like RequireJS, AMD, and CommonJS. Formally defining modules as part of JavaScript will eliminate a lot of heartache in the future, but right now, there is still a lot of confusion about how modules work. The confusion exists partly because, as of my writing, there are no engines that can natively load ES6 modules. In the meantime, I'm hoping this post will clarify some of the confusion.

## What is a module?

To start, it's important to understand that the specification defines two different types of JavaScript programs: scripts (what we've all been using since JavaScript was created) and modules (newly defined in ES6). While scripts behave the way everyone is used to, modules behave somewhat differently. Specifically modules:

1. Are always in strict mode with no option to opt-out
1. Have a top-level scope that is not the global scope
1. May import bindings from other modules using `import`
1. May specify bindings that should be exported using `export`

These differences look subtle but in fact make modules different enough that parsing and loading needs to be done differently than with scripts.

## Parsing differences

One of the most frequent questions received on ESLint related to ES6 modules is this:

> Why do I need to specify that a file is a module before it's parsed? Can't you just look for `import` or `export`?

I've seen this question repeated all over the Internet as people struggle to understand why JavaScript engines and tools can't autodetect that a file represents a module rather than a script. At first glance, it seems like detecting the presence of `export` or `import` should be enough to determine that a file contains a module, but in reality, that's nowhere near enough.

Trying to guess user intent is a dangerous and imprecise game. If you guess correctly, the world applauds you whereas guessing incorrectly has the potential to cause a great deal of damage.

### Parsing challenges

In order to autodetect modules in JavaScript programs, you would first have to parse the entire file. Modules need not use `import`, and so the only positive signal that a file is a module might be the very last statement using an `export`. So, you cannot escape parsing the entire file in order to have a chance to determine whether or not it's a module.

However, modules are strict mode environments. Strict mode doesn't just have runtime requirements, it also defines the following as syntax errors:

1. The `with` statement
1. Duplicate named arguments for functions
1. Octal numeric literals (such as `010`)
1. Duplicate property names (in ES5 only, ES6 eliminates this error)
1. Use of `implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, and `yield` as identifiers.

All of these are not syntax errors when running in nonstrict mode. If the only signal you have is an `export` in the last statement of the file, then you would actually have to re-parse the entire file in strict mode to be sure to catch all of these syntax errors. The first parse would have been wasted by running nonstrict mode.

Of course, if you had to detect a module from file contents, you would be forced to always parse files as modules. Since module syntax is strict mode plus `import` and `export`, you'd need to default to that in order to allow for `import` and `export` to be used. If you were to parse in nonstrict mode, then `import` and `export` are a syntax error. You could alternately created a parsing mode that combined nonstrict mode with `import` and `export`, but that's an unnatural mode whose result couldn't be used, thus requiring a second pass once the correct mode was determined.

### When is a module a module?

The edge case that many miss in the discussion is that modules are not required to use `import` or `export` at all. You can have a module that doesn't import anything and doesn't export anything. It might, for example, just modify something in the global scope. For instance, maybe you want to output a message when `window.onload` fires in a browser and you define a module such as:

```js
// this is a valid module!

window.addEventListener("load", function() {
    console.log("Window is loaded");
});
```

This module can then be loaded by another module or on its own. From looking at the source, there is no way to know that it's a module.

To sum up: while the presence of `import` or `export` might indicate a module, the lack of `import` or `export` does not clearly indicate that the file is not a module. So there is no effective way to autodetect that a file is a module during parsing.

## Loading Differences

While the parsing differences are a bit subtle for modules, the loading differences are not. When a module is loaded, `import` statements trigger the loading of the specified files. The imported files must be completed parsed and loaded (without error) in order for module execution to begin. In order to do this as quickly as possible, loading begins as `import` statement are being parsed, prior to parsing the rest of the file.

Once a dependency has been loaded, there's an extra step of verifying that the imported bindings actually exist in the dependency. If you import `foo` from the module `foo.js`, the JavaScript engine needs to verify that `foo` is exported from `foo.js` before execution continues.

## How loading will work

At this point, hopefully it's clear why you need to specify that a file is a module before it is parsed and loaded. In browsers, you will load modules like this:

```html
<script type="module" src="foo.js"></script>
```

The `<script>` tag is the same as always, but the `type` is set to `"module"`[1]. This signals to the browser that the file should be loaded as a module. If that `foo.js` then `import`s other dependencies, those will be loaded dynamically.

In Node.js, there is not yet a decision on how ES6 modules will be loaded. The most recent recommendation is to use a special file extension, such as `.jsm`, to indicate that a file is an ES6 module so that Node.js knows how to load it correctly[2].

## Conclusion

The differences between scripts and modules are subtle enough that it's hard for developers to understand the restriction of declaring what a JavaScript file represents ahead of time. My hope is that this post clarifies some of the reasons why it's not possible to autodetect modules from inspecting the source code and why tools such as ESLint ask you to specify the file type before executing. There will be a point in the future where ES6 modules are the dominant JavaScript file type and script files are left only on legacy applications, and at that point, it's likely that tools will default to assuming that files are modules. In the meantime, we're going through a difficult adolescence between scripts and modules where mixing the two is going to be a bit painful.


## Updates

* **Fix (06-Apr-2016)**: The original version of this post incorrectly stated that `import` statements must appear at the top of the file. This was removed.







1. [The script Element](https://html.spec.whatwg.org/multipage/scripting.html#script) (whatwg.org)
2. [ES6 Module Detection in Node](https://github.com/nodejs/node/wiki/ES6-Module-Detection-in-Node) (github.com)
