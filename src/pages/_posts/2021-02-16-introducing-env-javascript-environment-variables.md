---
title: "Introducing Env: a better way to read environment variables in JavaScript"
teaser: "Reading environment variables in JavaScript is fraught with peril. Env makes it better."
author: Nicholas C. Zakas
categories:
  - Web Development
tags:
  - JavaScript
  - Environment Variables
  - Node.js
  - Deno
---

If you write server-side JavaScript, chances are you've need to read information from environment variables. It's considered a best practice to share sensitive information, such as access tokens, inside of environment variables to keep them secure. However, the way environment variables are read from JavaScript is error-prone in subtle ways that might take you hours to figure out. When an error occurs reading an environment variable, you want to know immediately, and you don't want to interpret cryptic error messages. That's where Env comes in.

## Installing Env

Env[^1] is a zero-dependency utility designed to make reading environment variables safer and less error-prone. It does this by addressing the root causes of environment variable-related errors in server-side JavaScript. It works in both Node.js and Deno, and automatically reads environment variables from the correct location based on the runtime being used.

To use Env in Node.js, install it with npm:

```
$ npm install @humanwhocodes/env
```

And then import the `Env` constructor:

```js
import { Env } from "@humanwhocodes/env";

// or

const { Env } = require("@humanwhocodes/env");
```

To use Env in Deno, reference it from Skypack:

```js
import { Env } from "https://cdn.skypack.dev/@humanwhocodes/env?dts";
```

Once you have the `Env` constructor, you can create a new instance like this:

```js
const env = new Env();
```

And now you're ready to read environment variables safely.

## Problem #1: Missing environment variables

The first problem Env addresses is how to deal with missing environment variables. It's quite common for environment variables to go missing either because they were accidentally not set up correctly or because they only exist on some containers and not all. In any case, you want to handle missing environment variables seamlessly. In Node.js, you might do something like this:

```js
const USERNAME = process.env.USERNAME || "guest";
```

The intent here is to use the `USERNAME` environment variable if present, and if not, default to `"guest"`. Env streamlines this to make setting defaults clear:

```js
const USERNAME = env.get("USERNAME", "guest");
```

This code has the same effect but avoids any type coercion in the process. Of course, this assumes it's okay for `USERNAME` to be missing. But what if you absolutely need an environment variable present in order for your application to work? For that, you might write some code like this:

```js
const USERNAME = process.env.USERNAME;
if (!USERNAME) {
    throw new Error("Environment variable USERNAME is missing.");
}
```

That's a lot of code for some simple validation, and if you have several required environment variables, you'll end up repeating this pattern for each one. With Env, you can use the `require()` method:

```js
const USERNAME = env.require("USERNAME");
```

If the environment variable `USERNAME` is missing in this example, then an error is thrown telling you so. You can also use the `required` property in a similar way:

```js
const USERNAME = env.required.USERNAME;
```

This syntax allows you to avoid typing a string but will still throw an error if `USERNAME` is not present.

## Problem #2: Typos

Another type of error that is common with environment variables are typos. Typos can be hard to spot when you are typing the same thing multiple times. For example, you might type something like this:

```js
const USERNAME = process.env.USERRNAME;
```

Personally, I've spent hours tracking down bugs related to my incorrectly typing the name of the environment variable in my code. For whatever reason, I type the name of the variable correctly but not the environment variable name. If you want your JavaScript variables to have the same name as some required environment variables, you can use destructuring of the `required` property to only type the name once: 

```js
const {
    PORT,
    HOST
} = env.required;
```

Here, two local variables, `PORT` and `HOST`, are created from the environment variables of the same name. If either environment variable is missing, an error is thrown.

## Problem #3: Type mismatches

Another subtle type of error with environment variables are type mismatches. For instance, consider the following Node.js code:

```js
const PORT = process.env.PORT || 8080;
```

This line, or something similar, appears in a lot of Node.js applications. Most of the time it doesn't cause an issue...but it could. Can you spot the problem?

All environment variables are strings, so the JavaScript variable `PORT` is a string when the environment variable is present and a number if not. Using similar code in Deno threw an error[^2] that took me a while to figure out. It turned out that the Deno HTTP server required the port to be a number, so it worked fine locally but when I deployed it to Cloud Run, I received an error.

To solve this problem, Env converts all default values into strings automatically:

```js
const PORT = env.get("PORT", 8080);
console.log(typeof PORT === "string");      // always true
```

Even if you pass in a non-string value as the default, Env will convert it to a string to ensure that you only ever receive a string value when reading environment variables.

## Problem #4: Fallback variables

Sometimes you might want to check several environment variables and only use a default if none of the environment variables are present. So you might have code that looks like this:

```js
const PORT = process.env.PORT || process.env.HTTP_PORT || 8080;
```

You can make that a bit clearer using Env:

```js
const PORT = env.first(["PORT", "HTTP_PORT"], 8080);
```

Using this code, Env returns a value from the first environment variable it finds. Similar to `get()`, `first()` allows you to pass in a default value to use if none of the environment variables are found, and that default value is automatically converted to a string. As an added error check, if the first argument isn't an array or is an array with only one item, then an error is thrown.

## Conclusion

Env is one of those utilities that has been so valuable to me that I sometimes forget to mention it. I've been using it in a number of personal projects for the past two years and it's saved me a lot of time. Debugging errors related to environment variables isn't anyone's idea of fun, and I can't count the times where I've been saved by an Env error. I hope you find it helpful, as well.


[^1]: [Env](https://github.com/humanwhocodes/env)
[^2]: [serve() error: "Uncaught InvalidData"](https://github.com/denoland/deno/issues/7891#issuecomment-706259974)
