---
title: "Mimicking __dirname and __filename in ESM modules in Node.js"
author: Nicholas C. Zakas
teaser: "One of the things that I miss most about using ESM is the lack of __dirname and __filename. Here's how to recreate those variables."
categories:
  - Programming
tags:
  - Node.js
  - ECMAScript Modules
---

CommonJS files running in Node.js have access to two very helpful variables:

1. `__dirname` - the directory in which the current file lives.
1. `__filename` - the full path to the current file.

In ECMAScript modules, however, these are no longer available by default. Fortunately, you can recreate them yourself to get the same information that to the `import.meta.url` property:

```js
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

The `import.meta.url` property is a file URL, not a file path, so you first have to convert it into a file path. After that, you just need to use `path.dirname()` to pull off the directory.
