---
title: "Introducing humanfs (formerly fsx): A modern filesystem API for JavaScript"
teaser: "Filesystem APIs in JavaScript runtimes haven't been great for a long time. This is my attempt to make a better one."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - Filesystem
  - APIs
updated: 2024-01-31
---

The JavaScript APIs we have today are so much better than those we had even a decade ago. Consider the transition for `XMLHttpRequest` to `fetch()`: the developer experience is dramatically better, allowing us to write more succinct, functional code that accomplishes the same thing. The introduction of promises for asynchronous programming allowed this change, along with a series of other changes that made JavaScript easier to write. There is, however, one area that has seen little to no innovation: filesystem APIs in server-side JavaScript runtimes.

## Node.js: The origin of today's filesystem APIs

Node.js was initially released in 2009, and with it, the `fs` module was born. The `fs` module was built around the core utilities of Linux, with many methods mirroring their Linux inspiration such as `rmdir`, `mkdir`, and `stat`. To this end, Node.js succeeded in creating a low-level filesystem API that could handle anything developers could hope to accomplish on the command line. Unfortunately, that's where the innovation stopped.

The biggest change to Node.js' filesystem API was the introduction of `fs/promises` that moved the entire utility from callback-based methods to promise-based methods. Smaller incremental changes included implementing web streams and ensuring that readers also implemented async iterators. The API still uses the proprietary `Buffer` class for reading binary data. (Even though `Buffer` is now a subclas of `Uint8Array`, there are still incompatibilities[^1] that make using `Buffer`s problematic.)

Even Deno, Ryan Dhal's successor to Node.js, hasn't done much to modernize filesystem APIs. It mostly follows the same pattern as the `fs` module from Node.js, though it uses `Uint8Array`s where Node.js uses `Buffer`s and uses async iterators in various places. Otherwise, it's still the same low-level API approach taken in Node.js.

Only Bun, the latest entry into the server-side JavaScript runtime ecosystem, has even made an attempt at modernizing filesystem APIs with `Bun.file()`[^2], which was inspired by `fetch()`. While I applaud this rethinking of how to work with files, creating a new object for every file you want to work with can be cumbersome when you are dealing with more than a few files (and a big performance sink when dealing with thousands). Outside of that, Bun expects you to use the Node.js `fs` module for other operations.

## What would a modern filesystem API look like?

After spending years fighting with the Node.js `fs` module while maintaining ESLint, I asked myself, what would a modern filesystem API look like? Here are some of the things I came up with:

* **Common cases would be easy.** At least 80% of the time, I'm either reading from or writing to files, or else checking if files exist. That's pretty much it. Yet those operations are fraught with peril as I need to check for various things to avoid errors or remember additional attributes (i.e., `{ encoding: "utf8" }`).
* **Errors would be rare.** My biggest complaint about the `fs` module is just how frequently it throws errors. Calling `fs.stat()` on a nonexistent file throws an error, which means you actually need to wrap each call in a `try-catch`. Why? Missing files aren't an unrecoverable error for most applications.
* **Actions would be observable.** When testing filesystem operations, I really just want a way to verify that the things I expected to happen actually happened. I don't want to set up a network of spies with some other utilities that may or may not be changing the actual behavior of the methods I'm observing.
* **Mocking would be easy.** I'm always amazed at how difficult it is to mock out filesystem operations. I end up using something like `proxyquire` or else need to set up a maze of mocks that take a while to get right. This is such a common requirement for filesystem operations that it's surprising no solution exists.

With these thoughts in mind, I moved forward with designing hfs.

## humanfs basics

The humanfs library[^3] is a culmination of all of my thoughts around what a modern, high-level filesytem API should look like. At this point, it is laser-focused on supporting the most common filesystem operations while leaving lesser-used operation (`chmod`, for example) behind. (I'm not saying these operations won't be added in the future, but it was important for me to focus on my most common cases to start and then build out more functionality in the same deliberate manner as the initial methods.)

### Using humanfs runtime packages

To start, the humanfs API is available in four runtime packages. These packages all contain the same functionality but are tied to different underlying APIs. The packages are:

* `@humanfs/node` - the Node.js bindings
* `@humanfs/deno` - the Deno bindings
* `@humanfs/web` - the web browser bindings (using origin private file system)
* `@humanfs/memory` - an in-memory implementation suitable for any runtime (including web browsers)

So to get started, you'll use the runtime package that best fits your use case. For the purposes of this post, I'll be focusing on `@humanfs/node`, but the same APIs exist on all runtime packages. All runtime packages export an `hfs` singleton that you can use in a manner that is similar to `fs`.

```js
import { fsx } from "@humanfs/node";
```

### Reading files with fsx

Files are read by using the method that returns the specific data type that you want:

* `hfs.text(filePath)` reads the given file and returns a string.
* `hfs.json(filePath)` reads the given file and returns a JSON value.
* `hfs.bytes(filePath)` reads the given file and returns an `Uint8Array`.

Here are some examples:

```js
// read plain text
const text = await hfs.text("/path/to/file.txt");

// read JSON
const json = await hfs.json("/path/to/file.json");

// read bytes
const bytes = await hfs.bytes("/path/to/file.png");
```

If a file doesn't exist, each method returns `undefined` instead of throwing an error. This means you can use an `if` statement instead of a `try-catch`, and optionally, use the nullish coalescing operator to specify a default value, like this:

```js
// read plain text
const text = await hfs.text("/path/to/file.txt") ?? "default value";

// read JSON
const json = await hfs.json("/path/to/file.json") ?? {};

// read bytes
const bytes = await hfs.bytes("/path/to/file.png") ?? new Uint8Array();
```

I feel that this approach is a lot more JavaScripty in 2024 than constantly worrying about errors for files that don't exist.

### Writing files with fsx

To write files, call the `hfs.write()` method. This method accepts two arguments:

- `filePath:string` - the path to write to
- `value:string|ArrayBuffer|ArrayBufferView` - the value to write to the file

Here's an example:

```js
// write a string
await hfs.write("/path/to/file.txt", "Hello world!");

const bytes = new TextEncoder().encode("Hello world!");

// write a buffer
await hfs.write("/path/to/file.txt", bytes);
```

As an added bonus, `hfs.write()` will automatically create any directories that don't already exist. This is another problem I've run into constantly that I think should "just work" in a modern filesystem API.

### Detecting files with humanfs

To determine to if a file exists, use the `hfs.isFile(filePath)` method, which returns `true` if the given file exists or `false` otherwise.

```js
if (await hfs.isFile("/path/to/file.txt")) {
    // handle the file
}
```

Unlike `fs.stat()`, this method simply returns `false` if the file doesn't exist rather than throwing an error. Compare to the equivalent `fs.stat()` code:

```js
try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
} catch (ex) {
    if (ex.code === "ENOENT") {
        return false;
    }

    throw ex;
}
```

### Deleting files and directories

The `hfs.delete()` method accepts a single parameter, the path to delete, and works on both files and directories.

```js
// delete a file
await hfs.delete("/path/to/file.txt");

// delete a directory
await hfs.delete("/path/to");
```

## humanfs logging

One of the key features of humanfs is how easy it is to determine which methods have been called with which arguments thanks to its built-in logging system. To enable logging on an `hfs` instance, call the `logStart()` method and pass in a log name. When you're done logging, call `logEnd()` and pass in the same name to retrieve an array of log entries. Here's an example:

```js
hfs.logStart("test1");

const fileFound = await hfs.isFile("/path/to/file.txt");

const logs = hfs.logEnd("test1");
```

Each log entry is an object containing the following properties:

* `timestamp` - the numeric timestamp of when the log was created
* `type` - a string describing the type of log
* `data` - additional data related to the log

For method calls, a log entry's `type` is `"call"` and the `data` property is an object containing:

* `methodName` - the name of the method that was called
* `args` - an array of arguments passed to the method.

For the previous example, `logs` would contain a single entry:

```js
// example log entry

{
    timestamp: 123456789,
    type: "call",
    data: {
        methodName: "isFile",
        args: ["/path/to/file.txt"]
    }
}
```

Knowing this, you can easily set up logging in a test and then inspect which methods were called without needing a third-party library for spies.

## Using fsx impls

The design of fsx is such that there is abstract, core functionality contained in the `@humanfs/core` package. Each runtime package extends that functionality with runtime-specific implementations of the filesystem operations wrapped up in an object called an *impl*. Each runtime package actually exports three things:

1. The `hfs` singleton
1. A constructor that lets you create another instance of `hfs` (such as `NodeHfs` in `@humanfs/node`)
1. A constructor that lets you create an impl instance for the runtime package (such as `NodeHfsImpl` in `@humanfs/node`)

This lets you use just the functionality you want.

### Base impls and active impls in fsx

Each `hfs` instance is created with a *base impl* that defines how the `hfs` object should behave in production. The *active impl* is the impl in use at any given time, which may or may not be the base impl. You can change the active impl by calling `hfs.setImpl()`. For example:

```js
import { fsx } from "@humanfs/node";

hfs.setImpl({
    json() {
        throw Error("This operation is not supported");
    }
})


// somewhere else

await hfs.json("/path/to/file.json");       // throws error
```

In this example, the base impl is swapped out for a custom one that throws an error when the `hfs.json()` method is called. That makes it easy to mock out methods for your tests without worry about how it might affect the containing `hfs` object as a whole.

### Swapping impls for testing

Suppose you have a function called `readConfigFile()` that makes use of the `hfs` singleton from `@humanfs/node` to read a file called `config.json`. When it comes time to test that function, you'd really rather not have it actually hit the filesystem. You can swap out the impl of `hfs` and replace it with an in-memory filesystem implementation provided by `@humanfs/memory`, like this:

```js
import { hfs } from "@humanfs/node";
import { MemoryHfsImpl } from "@humanfs/memory";
import { readConfigFile } from "../src/example.js";
import assert from "node:assert";

describe("readConfigFile()", () => {

    beforeEach(() => {
        hfs.setImpl(new MemoryHfsImpl());
    });

    afterEach(() => {
        hfs.resetImpl();
    });

    it("should read config file", async () => {

        await hfs.write("config.json", JSON.stringify({ found: true });

        const result = await readConfigFile();

        assert.isTrue(result.found);
    });

});
```

That's how easy it is to mock out an entire filesystem in memory using humanfs. You don't have to worry about the order in which you import all of the modules for the test, as you would with module loader interceptions, nor do you need to go through the process of including a mocking library to ensure that everything works. You can just swap out the impl for the test and then reset it afterwards. In this way, you can test your filesystem operations in a more performant and less error-prone way.

## A note on naming

This library was originally called fsx, but unfortunately I discovered that Amazon had released a product called FSx[^4]. This post was updated to reflect the new name, humanfs.

## Conclusion and feedback wanted

We've been dealing with the same clunky, low-level filesystem APIs in JavaScript runtimes for a long time. The humanfs library is my attempt at reimagining what a modern filesystem API could look like if we spent some time focusing on the most common cases and improving ergonomics for what the JavaScript language offers today. By rethinking things from the ground-up, I think that humanfs offers a glimpse into a more enjoyable filesystem experience.

The base library focuses on just the methods that I'm using most frequently, but I do plan on adding more as I understand and think through use cases. You can try it today[^5] and feedback is welcome[^6]. I'd love to know what you think!

**Update(2024-01-31):** Changed library name, packages, and interfaces to reflect the name change from fsx to humanfs.

[^1]: [Goodbye, Node.js Buffer](https://sindresorhus.com/blog/goodbye-nodejs-buffer)
[^2]: [Bun: File I/O](https://bun.sh/docs/api/file-io)
[^3]: [fsx: A modern filesystem API for JavaScript](https://github.com/humanwhocodes/fsx)
[^4]: [Amazon FSx File Server](https://aws.amazon.com/fsx/)
[^5]: [fsx: Getting started](https://github.com/humanwhocodes/fsx/tree/main/docs)
[^6]: [fsx: Discussions](https://github.com/humanwhocodes/fsx/discussions/categories/feedback)
