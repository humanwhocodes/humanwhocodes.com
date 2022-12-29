---
title: "Create TypeScript declarations from JavaScript and JSDoc"
author: Nicholas C. Zakas
teaser: "Even if you don't write your code in TypeScript you can still generate .d.ts files to provide more information to developer tools."
date: 2020-10-15
layout: snippet
categories:
  - Programming
tags:
  - JavaScript
  - TypeScript
  - JSDoc
---

For a variety of reasons, I prefer to write my code in vanilla JavaScript with [JSDoc](https://jsdoc.app/) comments rather than writing in TypeScript. Today's smart code editors, like Visual Studio Code, are able to read type information from JSDoc and provide Intellisense options as you code. However, those consuming your code may not get the same benefit unless you include a TypeScript declaration file along with the source files. Fortunately, TypeScript allows you to generate type declaration files directly from JavaScript files and will use information in JSDoc comments to assign the appropriate types.

First, make sure you have [TypeScript](https://typescriptlang.org) installed:

```
$ npm install typescript --save-dev
```

Then, create a `tsconfig.json` file with the following options:

```json
{
    "include": [
        "**/*.js"
    ],
    "compilerOptions": {
        "declaration": true,
        "emitDeclarationOnly": true,
        "allowJs": true
    }
}
```

Make sure that `include` specifies the files you want to generate declaration files for. The `compilerOptions` are:

* `declaration` - generate the declarations for the files specified
* `emitDeclarationOnly` - only output `.d.ts` files and not source files
* `allowJs` - expect the source files to be JavaScript

Now you can run `tsc` to generate your `.d.ts` files:

```
$ tsc
```

Or you can omit the `tsconfig.json` file and just pass the corresponding flags on the command line, like this:

```
$ tsc --allowJs -d --emitDeclarationOnly src/foo.js
```

In this example, `tsc` will output `src/foo.d.ts`.

Just make sure the declaration file(s) are part of the package that you are publishing by using the [`types`](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package) field in your `package.json` file.
