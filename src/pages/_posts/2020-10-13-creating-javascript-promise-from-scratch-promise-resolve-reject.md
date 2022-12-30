---
title: "Creating a JavaScript promise from scratch, Part 4: Promise.resolve() and Promise.reject()"
teaser: "Promises created with Promise.resolve() and Promise.reject() go through a different process than when created with a constructor."
date: 2020-10-13
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

When you create a promise with the `Promise` constructor, you're creating an *unsettled promise*, meaning the promise state is pending until either the `resolve` or `reject` function is called inside the constructor. You can also created promises by using the `Promise.resolve()` and `Promise.reject()` methods, in which case, the promises might already be fulfilled or rejected as soon as they are created. These methods are helpful for wrapping known values in promises without going through the trouble of defining an executor function. However, `Promise.resolve()` doesn't directly map to `resolve` inside an executor, and `Promise.reject()` doesn't directly map to `reject` inside an executor.

Note: This is the fourth post in my series about creating JavaScript promises from scratch. If you haven't already read the [first post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/), the [second post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-resolving-to-a-promise/), and the [third post](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-then-catch-finally/), I would suggest you do so because this post builds on the topics covered in those posts.

As a reminder, this series is based on my promise library, [Pledge](https://github.com/humanwhocodes/pledge). You can view and download all of the source code from GitHub.

## The `Promise.resolve()` method

The purpose of the `Promise.resolve()` method is to return a promise that resolves to a given argument. However, there is some nuanced behavior around what it ends up returning:

1. If the argument isn't a promise, a new fulfilled promise is returned where the fulfillment value is the argument.
1. If the argument is a promise and the promise's constructor is different than the `this` value inside of `Promise.resolve()`, then a new promise is created using the `this` value and that promise is set to resolve when the argument promise resolves.
1. If the argument is a promise and the promise's constructor is the same as the `this` value inside of `Promise.resolve()`, then the argument promise is returned and no new promise is created.

Here are some examples to illustrate these cases:

```js
// non-promise value
const promise1 = Promise.resolve(42);
console.log(promise1.constructor === Promise);  // true

// promise with the same constructor
const promise2 = Promise.resolve(promise1);
console.log(promise2.constructor === Promise);  // true
console.log(promise2 === promise1);             // true

// promise with a different constructor
class MyPromise extends Promise {}

const promise3 = MyPromise.resolve(42);
const promise4 = Promise.resolve(promise3);
console.log(promise3.constructor === MyPromise); // true
console.log(promise4.constructor === Promise);      // true
console.log(promise3 === promise4);                 // false
```

In this code, passing `42` to `Promise.resolve()` results in a new fulfilled promise, `promise1` that was created using the `Promise` constructor. In the second part, `promise1` is passed to `Promise.resolve()` and the returned promise, `promise2`, is actually just `promise1`. This is a shortcut operation because there is no reason to create a new instance of the same class of promise to represent the same fulfillment value. In the third part, `MyPromise` extends `Promise` to create a new class. The `MyPromise.resolve()` method creates an instance of `MyPromise` because the `this` value inside of `MyPromise.resolve()` determines the constructor to use when creating a new promise. Because `promise3` was created with the `Promise` constructor, `Promise.resolve()` needs to create a new instance of `Promise` that resolves when `promise3` is resolved.

The important thing to keep in mind that the `Promise.resolve()` method always returns a promise created with the `this` value inside. This ensures that for any given `X.resolve()` method, where `X` is a subclass of `Promise`, returns an instance of `X`.

### Creating the `Pledge.resolve()` method

The specification[^1] defines a simple, three-step process for the `Promise.resolve()` method:

1. Let `C` be the `this` value.
1. If `Type(C)` is not `Object`, throw a `TypeError` exception.
1. Return `?` `PromiseResolve(C, x)`.

As with many of the methods discussed in this blog post series, `Promise.resolve()` delegates much of the work to another operation called `PromiseResolve()`[^2], which I've implemented as `pledgeResolve()`. The actual code for `Pledge.resolve()` is therefore quite succinct:

```js
export class Pledge {

    // other methods omitted for space

    static resolve(x) {

        const C = this;

        if (!isObject(C)) {
            throw new TypeError("Cannot call resolve() without `this` value.");
        }

        return pledgeResolve(C, x);
    }

    // other methods omitted for space
}
```

You were introduced to the the `pledgeResolve()` function in the third post in the series, and I'll show it here again for context:

```js
function pledgeResolve(C, x) {

    assertIsObject(C);

    if (isPledge(x)) {
        const xConstructor = x.constructor;

        if (Object.is(xConstructor, C)) {
            return x;
        }
    }

    const pledgeCapability = new PledgeCapability(C);
    pledgeCapability.resolve(x);
    return pledgeCapability.pledge;
}
```

When used in the `finally()` method, the `C` argument didn't make a lot of sense, but here you can see that it's important to ensure the correct constructor is used from `Pledge.resolve()`. So if `x` is an instance of `Pledge`, then you need to check to see if its constructor is also `C`, and if so, just return `x`. Otherwise, the `PledgeCapability` class is once again used to create an instance of the correct class, resolve it to `x`, and then return that instance.

With `Promise.resolve()` fully implemented as `Pledge.resolve()` in the Pledge library, it's now time to move on to `Pledge.reject()`.

## The `Promise.reject()` method

The `Promise.reject()` method behaves similarly to `Promise.resolve()` in that you pass in a value and the method returns a promise that wraps that value. In the case of `Promise.reject()`, though, the promise is in a rejected state and the reason is the argument that was passed in. The biggest difference from `Promise.resolve()` is that there is no additional check to see if the reason is a promise that has the same constructor; `Promise.reject()` always creates and returns a new promise, so there is no reason to do such a check. Otherwise, `Promise.reject()` mimics the behavior of `Promise.resolve()`, including using the `this` value to determine the class to use when returning a new promise. Here are some examples:

```js
// non-promise value
const promise1 = Promise.reject(43);
console.log(promise1.constructor === Promise);  // true

// promise with the same constructor
const promise2 = Promise.reject(promise1);
console.log(promise2.constructor === Promise);  // true
console.log(promise2 === promise1);             // false

// promise with a different constructor
class MyPromise extends Promise {}

const promise3 = MyPromise.reject(43);
const promise4 = Promise.reject(promise3);
console.log(promise3.constructor === MyPromise); // true
console.log(promise4.constructor === Promise);      // true
console.log(promise3 === promise4);                 // false
```

Once again, `Promise.reject()` doesn't do any inspection of the reason passed in and always returns a new promise, `promise2` is not the same as `promise1`. And the promise returned from `MyPromise.reject()` is an instance of `MyPromise` rather than `Promise`, fulfilling the requirement that `X.reject()` always returns an instance of `X`.

### Creating the `Pledge.reject()` method

According to the specification[^3], the following steps must be taken when `Promise.reject()` is called with an argument `r`:

1. Let `C` be the `this` value.
1. Let `promiseCapability` be `?` `NewPromiseCapability(C)`.
1. Perform `?` `Call(promiseCapability.[[Reject]], undefined, « r »)`.
1. Return `promiseCapability.[[Promise]]`.

Fortunately, converting this algorithm into JavaScript is straightforward:

```js
export class Pledge {

    // other methods omitted for space

    static reject(r) {
        
        const C = this;

        const capability = new PledgeCapability(C);
        capability.reject(r);
        return capability.pledge;
    }

    // other methods omitted for space
}
```

This method is similar to `pledgeResolve()` with the two notable exceptions: there is no check to see what type of value `r` and the `capability.reject()` method is called instead of `capability.resolve()`. All of the work is done inside of `PledgeCapability`, once again highlighting how important this part of the specification is to promises as a whole.

## Wrapping Up

This post covered creating `Promise.resolve()` and `Promise.reject()` from scratch. These methods are important for converting from non-promise values into promises, which is used in a variety of ways in JavaScript. For example, the `await` operator calls `PromiseResolve()` to ensure its operand is a promise. So while these two methods are a lot simpler than the ones covered in my previous posts, they are equally as important to how promises work as a whole.

All of this code is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.

## Want more posts in this series?

So far, I've covered the basic ways that promises work, but there's still more to cover. If you are enjoying this series and would like to see it continue, please [sponsor me](https://github.com/sponsors/nzakas) on GitHub. For every five new sponsors I receive, I'll release a new post. Here's what I plan on covering:

* Part 5: `Promise.race()` and `Promise.any()` (when I have 35 sponsors)
* Part 6: `Promise.all()` and `Promise.allSettled()` (when I have 40 sponsors)
* Part 7: Unhandled promise rejection tracking (when I have 45 sponsors)

It takes a significant amount of time to put together posts like these, and I appreciate your consideration in helping me continue to create quality content like this.


[^1]: [Promise.resolve( x )](https://www.ecma-international.org/ecma-262/#sec-promise.resolve)
[^2]: [PromiseResolve( C, x )](https://www.ecma-international.org/ecma-262/#sec-promise-resolve)
[^3]: [Promise.reject( r )](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-promise.reject)
