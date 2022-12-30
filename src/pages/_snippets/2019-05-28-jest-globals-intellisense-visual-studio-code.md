---
title: "Setting up Visual Studio Code intellisense for Jest globals"
author: Nicholas C. Zakas
teaser: "VS Code can't automatically find Jest globals for intellisense, but you can change that."
date: 2019-05-28
categories:
  - Web Development
tags:
  - JavaScript
  - Testing
  - Jest
  - Visual Studio Code
---

One of the benefits of [Visual Studio Code](https://code.visualstudio.com) is it's ability to automatically detect the type of JavaScript value you're working with and provide autocomplete (aka intellisense) for properties and methods. This works really well whenever you're using a module system and explicitly importing values from modules. If a framework happens to add random global variables, however, Visual Studio Code has no way to determine that on its own.

[Jest](https://jestjs.io), the JavaScript testing framework, works by injecting several variables (such as `describe()`, `test()`, and `inspect()`) that Visual Studio Code doesn't know anything about by default. Fortunately, you can tell Visual Studio Code about these globals by creating a `jsconfig.json` file in the root directory of your project and adding the following into the file:

```json
{
    "typeAcquisition": {
        "include": [
            "jest"
        ]
    }
}
```

This instructs to look at the `jest` module for type definitions. With this configuration setup in `jsconfig.json`, Visual Studio Code will now have intellisense for all of the Jest globals. (Note: You must have the `jest` npm package installed for this to work.)
