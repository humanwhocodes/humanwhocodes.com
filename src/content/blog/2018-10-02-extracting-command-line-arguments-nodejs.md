---
title: "Extracting command line arguments from Node.js using destructuring"
teaser: Using array destructuring to easily handle command line arguments.
date: 2018-10-02 00:00:00
categories:
- Tutorial
tags:
- JavaScript
- Destructuring
- Node.js
---

If you've worked on a Node.js command-line program, you were probably faced with the extraction of command line arguments. Node.js provides all command line arguments in the `process.argv` array. However, the contents of the array aren't what you might expect.

## What's in process.argv?

The first two items in `process.argv` are:

1. The path to the executable running the JavaScript file
2. The path of the JavaScript file being executed

So the first command line argument is the third item in the array. For example, consider the following command that runs a Node.js program:

```
node index.js --watch
```

The contents of `process.argv` will look something like this (depending on your system and file root)

1. `/usr/bin/node`
2. `/home/nzakas/projects/example/index.js`
3. `--watch`

While the first two items in the array might be useful to some, chances are that you're only interested in `--watch`. Fortunately, you can use JavaScript destructuring to pick out just the command line arguments you want.

## Using destructuring to extract arguments

Using JavaScript destructuring, you can separate the `process.argv` array into pieces and only use what you need. For example, this code separates the array into its three parts:

```js
const [ bin, sourcePath, ...args ] = process.argv;

console.log(args[0]);   // "--watch"
```

Here, the `bin` variable receives the Node.js executable path, `sourcePath` receives the JavaScript filepath, and the rest element `args` is an array containing all of the remaining command line arguments. 

You can take this one step further and just omit `bin` and `sourcePath` if you have no use for them:

```js
const [ , , ...args ] = process.argv;

console.log(args[0]);   // "--watch"
```

The two commas at the beginning of the pattern indicate that you'd like to skip over the first two items in the array and store the remaining items in the `args` array. You can then further process `args` to determine what to do next.

## Conclusion

While the `process.argv` array is a bit confusing at first, you can easily slice off just the information you're interested in using JavaScript destructuring. Destructuring assignment is ideally suited for extracting just the information you want from an array.
