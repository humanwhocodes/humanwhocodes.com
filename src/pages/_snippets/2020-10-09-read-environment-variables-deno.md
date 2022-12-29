---
title: "How to read environment variables in Deno using JavaScript"
author: Nicholas C. Zakas
teaser: "Deno's API for accessing environment variables is different than Node.js's API."
date: 2020-10-09
layout: snippet
categories:
  - Programming
tags:
  - Deno
  - Environment Variables
  - JavaScript
---

The way to read environment variables in [Deno](https://deno.land) has changed from its early incarnation. Originally, there was a `Deno.env()` function that returned an object containing all of the defined environment variables. For v1.0.0, Deno switched to a `Deno.env` object with a `get()` method.

First, in order to read environment variables, you must run your code with the `--allow-env` flag, such as:

```
$ deno run --allow-env index.js
```

Then, inside your JavaScript, you can read an environment variable by passing a string to `Deno.env.get()`, such as:

```js
const PORT = Deno.env.get("PORT");
```

You can also retrieve an object whose properties are all of the environment variables, similar to `process.env` in [Node.js](https://nodejs.org):

```js
const env = Deno.env.toObject();

const PORT = env.PORT:
```

The `Deno.env` object also has `set()` and `delete()` methods that let you change the contents of the `Deno.env` object. You probably don't want to use those methods regularly, however, they can be helpful for debugging purposes.
