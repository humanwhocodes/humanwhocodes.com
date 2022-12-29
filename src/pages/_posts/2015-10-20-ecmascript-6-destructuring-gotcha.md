---
title: ECMAScript 6 destructuring gotcha
date: 2015-10-20 00:00:00
categories:
- Programming
tags:
- ECMAScript 6
- Destructuring
---

With all of the new syntax in ECMAScript 6, you're bound to periodically find something that is confusing (likely as you're hunting down an error). Recently, I've seen an uptick in the reporting of a specific type of error as it relates to destructuring assignment[1] using object patterns.

## Destructuring basics

Before you can understand the problem, it's helpful to look at a few examples of destructuring. Here's a simple one:

```js
var node = {
    type: "Identifier",
    value: "foo"
};

var { type } = node;
console.log(type);      // "Identifier"
```

In this example, the variable `type` is created and assigned to be the value of `node.type` using destructuring. You can also grab the `value` property if you want:

```js
var node = {
    type: "Identifier",
    value: "foo"
};

var { type, value } = node;
console.log(type);      // "Identifier"
console.log(value);     // "foo"
```

Destructuring lets you extract specific properties from an object. On the surface, this is pretty simple and self-explanatory.

## Different variable names

You can also create variables that have different names than the properties whose values they are assigned. For example:

```js
var node = {
    type: "Identifier",
    value: "foo"
};

var { type: myType } = node;
console.log(myType);      // "Identifier"
console.log(type);        // error: type is not defined
```

Here, the variable created is called `myType` and receives the value of `node.type`. This syntax is a bit confusing, as it's the opposite of the name-value pair syntax of object literals. There is no variable `type` in this example.

## Default values

Adding more complexity, you can assign a default value for any destructured property using an equals sign. This can make the destructuring looks a bit complicated, for example:

```js
var node = {
    type: "Identifier",
    value: "foo"
};

var anotherNode = {};

var { type: myType = "Unknown" } = anotherNode;
console.log(myType);      // "Unknown"
```

This example creates a local variable `myType` that is assigned the value of `node.type` is it exists. If `node.type` doesn't exist, then `myType` is assigned the value `"Unknown"`.

## Nested destructuring

You can further the complexity by nesting destructuring. That means you can retrieve values from objects inside of objects, such as:

```js
var node = {
    type: "Identifier",
    value: "foo",
    loc: {
        start: {
            line: 1,
            column: 5
        },
        end: {
            line: 1,
            column: 8
        }
    }
};

var { loc: { start: { line }} } = node;
console.log(line);      // 1
console.log(loc);       // error: loc is undefined
```

In this example, only the local variable `line` is created with a value of `1`. The `loc` and `start` inside of the object pattern simply serve as location information to find `line`.

## The gotcha

Here's where things get confusing. Now that you've had this crash course in destructuring, what is the expected behavior in the following code?

```js
var node = {
    type: "Identifier",
    value: "foo",
    loc: {
        start: {
            line: 1,
            column: 5
        },
        end: {
            line: 1,
            column: 8
        }
    }
};

var { loc: {} } = node;
console.log(loc);       // ?
```

You may be surprised to know that `console.log(loc)` actually throws an error because `loc` is undefined. Why is that? Because the curly braces to the right of `loc:` indicate that `loc` is merely location information for what comes to the right of it. However, there is nothing to the right of it, so there are no new variables created.

This is confusing because it looks like an object literal whose `loc` property is assigned an empty object, but in fact, that is not the case.

It's quite possible the intent of this code is to assign an empty object when `loc` isn't present, and in that case, you need to use an equals sign:

```js
var node = {
    type: "Identifier",
    value: "foo",
    loc: {
        start: {
            line: 1,
            column: 5
        },
        end: {
            line: 1,
            column: 8
        }
    }
};

var { loc = {} } = node;
console.log(loc);       // [Object object]
```

Here, `loc` always ends up as an object regardless of whether `node.loc` exists.

## Summary

Nested destructuring can be pretty confusing, especially when you mix in default values. In all cases `identifier: {}` in a destructured assignment is a mistake: it has zero effect. It's more likely that you meant to assign a default value to variable. ESLint just added the `new-empty-pattern` rule[2] to check for this problem, so I'd recommend turning that on immediately if you are using destructuring in your code.

## References

1. [Destructuring](https://leanpub.com/understandinges6/read#leanpub-auto-destructuring) by me (leanpub.com)
1. [Disallow empty destructuring patterns](http://eslint.org/docs/rules/no-empty-pattern)
