---
title: "Reading streams with promises in Node.js"
author: Nicholas C. Zakas
teaser: "The fs.promises API doesn't provide a way to read streams in Node.js. Here's how to do it."
date: 2019-05-13
layout: snippet
categories:
  - Web Development
tags:
  - JavaScript
  - Node.js
  - Promises
  - Streams
---

If you've tried to use the Node.js [`fs.promises` API](https://nodejs.org/api/fs.html#fs_fs_promises_api), you might have noticed that there doesn't appear to be a cross-platform way of using `fs.readFile()` to read from `process.stdin` (such as `process.stdin`). Using the old, callback-based API, you could pass in a numeric file descriptor, such as:

```js
import fs from "fs";

const text = fs.readFileSync(0, "utf8");
```

However, when using the `fs.promises` version of `readFile()`, you can no longer use numeric file descriptors (an error is thrown). While you can use the string `"/dev/stdin"` on Linux machines, but that doesn't work on Windows machines.

The easiest way to read stream using promises is to write your own function do so. Here's what mine looks like:

```js
function readStream(stream, encoding = "utf8") {
    
    stream.setEncoding(encoding);

    return new Promise((resolve, reject) => {
        let data = "";
        
        stream.on("data", chunk => data += chunk);
        stream.on("end", () => resolve(data));
        stream.on("error", error => reject(error));
    });
}

const text = await readStream(process.stdin);
```

The key is to listen to three events:

1. `data` for the pieces of data being read
2. `end` to resolve the promise with the accumulated data
3. `error` to reject the promise if there's an error

Because `readStream()` returns a promise, you can use `await` to call it, making it fit in with the rest of the `fs.promises` API.