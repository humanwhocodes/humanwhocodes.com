---
title: "How to optionally await a JavaScript function call"
author: Nicholas C. Zakas
teaser: "By inspecting the return value first, you can determine whether or not to await."
date: 2020-02-22
layout: snippet
categories:
  - Web Development
tags:
  - JavaScript
  - Promises
  - Async Functions
---

Even though async functions and the `await` operator quickly became popular in JavaScript, many use `await` solely with function calls, such as:

```js
const result = await readSomeFile();
```

That works fine when you know the function you're calling returns a promise. Actually, it works fine even without the function returning a promise as `await` will wrap the return value in a promise if it isn't already one. But why go through the overhead of creating and returning a promise if it's not needed?

The key here is that `await` operates on promises, and those are hidden when using `await` in front of a function call. Therefore, if you're unsure that a function returns a promise, you can always check using the `instanceof` operator and only `await` if a promise is returned:

```js
let result = someFunction();
if (result instanceof Promise) {
    result = await result;
}
```

The value of `result` is usable directly at the end of this code regardless if `someFunction()` returns a promise or not.
