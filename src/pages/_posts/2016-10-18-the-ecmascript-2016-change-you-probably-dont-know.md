---
title: "The ECMAScript 2016 change you probably don't know"
teaser: How the JavaScript strict mode directive changed in 2016.
date: 2016-10-18 00:00:00
categories:
- Programming
tags:
- JavaScript
- ECMAScript 2016
- Strict Mode
---

Compared to ECMAScript 6 (also known as ECMAScript 2015), ECMAScript 2016 was a minor update to the language specification for JavaScript. This was due to the decision that ECMAScript editions would now move to a yearly release cycle, effectively just a snapshot of all the features that were ready. As such, most resources list only two significant changes in ECMAScript 2016:

1. The addition of the exponentiation (`**`) operator
1. The addition of the `Array.prototype.includes()` method

These features had the most direct impact for JavaScript developers, however, there is one other significant change that is often forgotten. It's something I cover in my book, [Understanding ECMAScript 6](http://amzn.to/2d31CIC), however, I'm still receiving questions about it and so I'd like to dig a bit deeper.

First I'll describe the change and then I'll describe some of the rationale behind it.

## The change

ECMAScript 2016 says that the `"use strict"` directive cannot be used in the body of a function whose parameters either have default values, use destructuring, or a rest parameter. The specification defines *simple parameters* as parameter lists that contain only identifiers (ECMAScript 5 only supported simple parameter lists)[1]. The change affects all function types, including function declarations and expressions, arrow functions, and concise object literal methods. Here are some examples:

```js
// this is okay
function doSomething(a, b) {
    "use strict";

    // code
}

// syntax error in ECMAScript 2016
function doSomething(a, b=a) {
    "use strict";

    // code
}

// syntax error in ECMAScript 2016
const doSomething = function({a, b}) {
    "use strict";

    // code
};

// syntax error in ECMAScript 2016
const doSomething = (...a) => {
    "use strict";

    // code
};

const obj = {

    // syntax error in ECMAScript 2016
    doSomething({a, b}) {
        "use strict";

        // code
    }
};
```

You can still use `"use strict"` globally, outside of a function, in order to have that function run in strict mode even if the function has non-simple parameters. For example:

```js
// this is okay
"use strict";

function doSomething(a, b=a) {
    // code
}
```

In this case, the `"use strict"` directive outside of the function is valid syntax. This is also not a concern if you're using ECMAScript modules, which run all code in strict mode.

## Why make this change?

This change is important due to the way strict mode and non-simple parameter lists work. When strict mode was created in ECMAScript 5, destructuring and default parameter values did not exist, so there was no problem with parsing the parameter list and then seeing a "`use strict`" directive. At that point, the `"use strict"` could not affect the outcome of parsing the parameter list, it was only used to validate parameter identifiers (disallowing duplicates and checking for forbidden identifiers like `eval` and `arguments`). With the introduction of destructuring and default parameter values in ECMAScript 6, however, this was no longer the case because the specification indicated that parameter lists should be parsed in the same mode as the function body (which means the `"use strict"` directive in the function body must trigger strict mode).

The first thing to realize is that strict mode requires changes to both parsing and execution[2] of JavaScript code. As a very simple example, strict mode disallows the use of the old-style octal numeric literals (such as `070`). If code is parsed in strict mode, then `070` will throw a syntax error. With that in mind, what do you think the following code should do?

```js
// syntax error in ECMAScript 2016
function doSomething(value=070) {
    "use strict";

    return value;
}
```

If you have a JavaScript parser attempting to parse this code, the parameter list is parsed before the function body. That means `070` is parsed as valid and then `"use strict"` is encountered in the function body, which tells the parser, "actually, you should have parsed the parameter list in strict mode." At that point, the parser would have to backtrack and re-parse the parameter list in strict mode so a syntax error is thrown for `070`. That might not seem like a big deal, but what if the default parameter value is more complex?

```js
// syntax error in ECMAScript 2016
function doSomething(value=(function() {
   return doSomeCalculation() + 070;
}())) {
    "use strict";

    return value;
}
```

In this case, with a function used in a default parameter value, you have more of a problem. The number of tokens you'd have to unwind is greater and the you also have to set the function in the default value as running in strict mode. That's a lot of complexity to ensure that the default parameter value expression is parsed correctly and understood to be running in strict mode.

Destructured parameters cause similar problems because they can include default values. For example:

```js
// syntax error in ECMAScript 2016
function doSomething({value=070}) {
    "use strict";

    return value;
}
```

Here, the destructured parameter `value` has a default value that is disallowed in strict mode, causing the same problems as default parameter values.

In the end, it appears TC-39 decided[3] to simply disallow function body `"use strict"` in situations that were not present in ECMAScript 5 in order to avoid missing edge cases. That means functions with default parameter values, destructured parameters, or rest parameters cannot have `"use strict"` in the function body. That includes situations where `"use strict"` would have no effect, such as this:

```js
function outer() {
    "use strict";

    // syntax error in ECMAScript 2016
    function doSomething(value=070) {
        "use strict";

        return value;
    }
}
```

This example nests a function with non-simple parameters inside of another function that has `"use strict"`. The `doSomething()` function is automatically in strict mode but JavaScript engines will still throw a syntax error on the `"use strict"` directive in `doSomething()`'s function body.

## Workarounds

This change is unlikely to affect many developers, which is likely why you weren't aware of it. The `"use strict"` directive is starting to become a historical artifact of JavaScript as ECMAScript modules and classes both automatically run in strict mode without a way to opt-out, meaning that `"use strict"` is not needed in those situations. However, in the rare case that you need a function with non-simple parameters to run in strict mode, you can use an IIFE to create the function:

```js
const doSomething = (function() {
    "use strict";

    return function(value=42) {
        return value;
    };
}());
```

In this code, a function is created inside an IIFE that is running in strict mode. This allows the returned function to run in strict mode while using a default parameter value. Because the outer scope is running in strict mode, there is no problem parsing the default parameter value correctly and no need for an additional `"use strict"` inside the function body.

## Conclusion

This small change to ECMAScript 2016, disallowing function body `"use strict"` for functions with non-simple parameter lists, highlights just how difficult evolving such a popular programming language can be. In this case, TC-39 decided to remove ambiguity by introducing a new syntax error that likely would have been part of ECMAScript 6 (2015) had this problem been surfaced earlier. Adding this syntax error was the most obvious path forward because it affects very little existing code (the specification change was made around the same time that JavaScript engines were implementing non-simple parameter lists) and likely wouldn't affect much future code due to ECMAScript modules and classes running in strict mode.


## References

1. [Static Semantics: IsSimpleParameterList](http://www.ecma-international.org/ecma-262/7.0/#sec-function-definitions-static-semantics-issimpleparameterlist) (ecma-international.org)
1. [It's time to start using JavaScript strict mode](https://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/) (nczonline.net)
1. [The scope of "use strict" with respect to destructuring in parameter lists](https://github.com/rwaldron/tc39-notes/blob/d0c651b358b361b0855cfe7af9ba0b76cab73949/es7/2015-07/july-29.md#611-the-scope-of-use-strict-with-respect-to-destructuring-in-parameter-lists)
