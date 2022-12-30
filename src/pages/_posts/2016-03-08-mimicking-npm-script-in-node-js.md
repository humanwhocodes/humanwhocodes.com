---
title: Mimicking npm script in Node.js
teaser: Run command line tools with specific environment settings.
date: 2016-03-08 00:00:00
categories:
- Tutorial
tags:
- JavaScript
- Node.js
- npm
---

I'm a big fan of npm scripts[1] and have been using them in all of my projects instead of a standalone build system. The feature I like the most from npm scripts is the ability to run command line executables that are installed in your project's `node_modules/.bin` directory. That allows you to, for example, install ESLint[2] locally in your project:

```
$ npm i eslint --save-dev
```

Then create a "lint" script in your `package.json` file that looks like this:

```json
{
    "name": "Test Project",
    "devDependencies": {
        "eslint": "^1.10.3"
    },
    "scripts": {
        "lint": "eslint ."
    }
}
```

And after that, you can ESLint by typing:

```
$ npm run lint
```

This works because the npm script is actually running `node_modules/.bin/eslint`. It's a great trick, meaning you don't have to jump through any extra hoops to use these binaries in your scripts. But how does npm do it?

## Modifying PATH

The answer is that npm modifies the `PATH` environment variable so that it affects the lookup of executables. It does this only temporarily, so the change doesn't affect your system as a whole; it is in effect only for the script. I had a need to do the same thing in a project I was working on, and so dug into how this is possible. The actual code in npm is buried pretty deep and uses the `exec()` asynchronous function to execute scripts. For my purposes, though, I wanted synchronous execution and I didn't need to do most of what npm was doing (since obviously npm is far more complicated than simply running scripts with a modified `PATH`).

The goal is to run a string on the command line as if it were running directly in the console with the exception that the `PATH` environment variable includes the current working directory for Node.js.

## Creating a new environment

The first step is to create a clone of all environment variables. You want these so that the command will run with all the same information available on the system, and it's a good idea to keep the original `process.env` around just in case you need it later:

```js
var env = Object.assign({}, process.env);
```

The local `env` is the copy you can work with and modify without fear of affecting anything else. The next step is to modify the `PATH` variable so that it includes the correct `node_modules/.bin` directory. This needs to be added to the front of `PATH` so the search begins there before looking elsewhere. Slightly complicating matters is that Windows uses a semicolon to separate directories in `PATH` while Unix uses a colon, so you need to take that into account:

```js
var SEPARATOR = process.platform === "win32" ? ";" : ":",
    env = Object.assign({}, process.env);

env.PATH = path.resolve("./node_modules/.bin") + SEPARATOR + env.PATH;
```

The `env.PATH` property is updated to place `./node_modules/.bin` to the front of what it already contained (`path.resolve()` will resolve relative to the current working directory). Now the `env` object is ready for use.

## Executing the script

The next step is to execute the script using the modified environment. This is done using `execSync()` for synchronous execution. The first argument is the command to run and the second argument is an object containing options for the execution environment. On that second argument, you need to set two properties: `env`, which is the environment settings, and `cwd` to set the current working directory (it defaults to `undefined`). So to run a script in the current working directory, you would do this:

```js
var execSync = require("child_process").execSync;

var SEPARATOR = process.platform === "win32" ? ";" : ":",
    env = Object.assign({}, process.env);

env.PATH = path.resolve("./node_modules/.bin") + SEPARATOR + env.PATH;

function myExecSync(cmd) {
    var output = execSync(cmd, {
        cwd: process.cwd(),
        env: env
    });

    console.log(output);
}
```

You can then call `myExecSync()` and it will correctly find executables in the `node_modules/.bin` directory from the current working directory:

```js
myExecSync("eslint .");
```

## Conclusion

This little trick has come in very useful in my projects, especially when I want to write scripts that run inside of Node.js files. Given that executables are installed locally when installing packages from npm, the ability to easily run those executables is a powerful addition to your scripting capabilities. I'm using this to write longer scripts inside of JavaScript files that are triggered from `npm run`, and in doing so, the scripts end up looking more like Makefiles or bash scripts (and that makes me happy).



1. [How npm handles the scripts field](https://docs.npmjs.com/misc/scripts) (npmjs.com)
2. [ESLint](http://eslint.org) (eslint.org)
