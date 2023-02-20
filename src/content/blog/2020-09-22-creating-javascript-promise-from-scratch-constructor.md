---
title: "Creating a JavaScript promise from scratch, Part 1: Constructor"
teaser: "Sometimes it's easier to understand complex concepts like promises by creating them yourself."
date: 2020-09-22
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

Early on in my career, I learned a lot by trying to recreate functionality I saw on websites. I found it helpful to investigate why something worked the way that it worked, and that lesson has stuck with me for decades. The best way to know if you really understand something is to take it apart and put it back together again. That's why, when I decided to deepen my understanding of promises, I started thinking about creating promises from scratch.

Yes, I wrote a book on ECMAScript 6 in which I covered promises, but at that time, promises were still very new and not yet implemented everywhere. I made my best guess as to how certain things worked but I never felt truly comfortable with my understanding. So, I decided to turn ECMA-262's description of promises[^1] and implement that functionality from scratch.

In this series of posts, I'll be digging into the internals of my promise library, [Pledge](https://github.com/humanwhocodes/pledge). My hope is that exploring this code will help everyone understand how JavaScript promises work.

## An Introduction to Pledge

Pledge is a standalone JavaScript library that implements the ECMA-262 promises specification. I chose the name "Pledge" instead of using "Promise" so that I could make it clear whether something was part of native promise functionality or if it was something in the library. As such, wherever the spec using the term "promise,", I've replaced that with the word "pledge" in the library.

If I've implemented it correctly, the `Pledge` class should work the same as the native `Promise` class. Here's an example:

```js
import { Pledge } from "https://unpkg.com/@humanwhocodes/pledge/dist/pledge.js";

const pledge = new Pledge((resolve, reject) => {
    resolve(42);

    // or

    reject(42);
});

pledge.then(value => {
    console.log(then);
}).catch(reason => {
    console.error(reason);
}).finally(() => {
    console.log("done");
});

// create resolved pledges
const fulfilled = Pledge.resolve(42);
const rejected = Pledge.reject(new Error("Uh oh!"));
```

Being able to see behind each code example has helped me understand promises a lot better, and I hope it will do the same for you.

**Note:** This library is not intended for use in production. It's intended only as an educational tool. There's no reason not to use the native `Promise` functionality.

## Internal properties of a promise

ECMA-262[^2] specifies the following internal properties (called *slots* in the spec) for instances of `Promise`:

| **Internal Slot** | **Description** |
|-------------------|-----------------|
| `[[PromiseState]]` | One of `pending`, `fulfilled`, or `rejected`. Governs how a promise will react to incoming calls to its then method.|
| `[[PromiseResult]]` | The value with which the promise has been fulfilled or rejected, if any. Only meaningful if `[[PromiseState]]` is not `pending`.|
| `[[PromiseFulfillReactions]]` | A `List` of `PromiseReaction` records to be processed when/if the promise transitions from the pending state to the fulfilled state.|
| `[[PromiseRejectReactions]]` | A `List` of `PromiseReaction` records to be processed when/if the promise transitions from the pending state to the rejected state.|
| `[[PromiseIsHandled]]` | A boolean indicating whether the promise has ever had a fulfillment or rejection handler; used in unhandled rejection tracking.|

Because these properties are not supposed to be visible to developers but need to exist on the instances themselves for easy tracking and manipulation, I chose to use symbols for their identifiers and created the `PledgeSymbol` object as an easy way to reference them in various files:

```js
export const PledgeSymbol = Object.freeze({
    state: Symbol("PledgeState"),
    result: Symbol("PledgeResult"),
    isHandled: Symbol("PledgeIsHandled"),
    fulfillReactions: Symbol("PledgeFulfillReactions"),
    rejectReactions: Symbol("PledgeRejectReactions")
});
```

With `PledgeSymbol` now defined, it's time to move on to creating the `Pledge` constructor.

## How does the `Promise` constructor work?

The `Promise` constructor is used to create a new promise in JavaScript. You pass in a function (called the *executor*) that receives two arguments, `resolve` and `reject` which are functions that bring the promise's lifecycle to completion. The `resolve()` function resolves the promise to some value (or no value) and the `reject()` function rejects the promise with a given reason (or no reason). For example:

```js
const promise = new Promise((resolve, reject) => {
    resolve(42);
});

promise.then(value => {
    console.log(value);     // 42
})
```

The executor is run immediately so the variable `promise` in this example is already fulfilled with the value `42` (the internal `[[PromiseState]]` property is `Fulfilled`). (If you used `reject()` instead of `resolve()`, then `promise` would be in a rejected state.)

Additionally, if the executor throws an error, then that error is caught and the promise is rejected, as in this example:

```js
const promise = new Promise((resolve, reject) => {
    throw new Error("Oops!");
});

promise.catch(reason => {
    console.log(reason.message);     // "Oops!"
})
```

A couple of other notes about how the constructor works:

1. If the executor is missing then an error is thrown
1. If the executor is not a function then an error is thrown

In both cases, the error is thrown as usual and does not result in a rejected promise.

With all of this background information, here's what the code to implement these behaviors looks like:

```js
export class Pledge {
    constructor(executor) {

        if (typeof executor === "undefined") {
            throw new TypeError("Executor missing.");
        }

        if (!isCallable(executor)) {
            throw new TypeError("Executor must be a function.");
        }

        // initialize properties
        this[PledgeSymbol.state] = "pending";
        this[PledgeSymbol.result] = undefined;
        this[PledgeSymbol.isHandled] = false;
        this[PledgeSymbol.fulfillReactions] = [];
        this[PledgeSymbol.rejectReactions] = [];

        const { resolve, reject } = createResolvingFunctions(this);

        /*
         * The executor is executed immediately. If it throws an error, then
         * that is a rejection. The error should not be allowed to bubble
         * out of this function.
         */
        try {
            executor(resolve, reject);
        } catch(error) {
            reject(error);
        }

    }
}
```

After checking the validity of the `executor` argument, the constructor next initializes all of the internal properties by using `PledgeSymbol`. These properties are close approximations of what the specification describes, where a string is used for the state instead of an enum and the fulfill and reject reactions are instances of `Array` because there is no `List` class in JavaScript.

Next, the `resolve` and `reject` functions used in the executor are created using the `createResolvingFunctions()` function. (I'll go into detail about this function later in this post.) Last, the executor is run, passing in `resolve` and `reject`. It's important to run the executor inside of a `try-catch` statement to ensure that any error results in a promise rejection rather than a thrown error.

The `isCallable()` function is just a helper function I created to make the code read more like the specification. Here's the implementation:

```js
export function isCallable(argument) {
    return typeof argument === "function";
}
```

I think you'll agree that the `Pledge` constructor itself is not very complicated and follows a fairly standard process of validating the input, initializing instance properties, and then performing some operations. The real work is done inside of `createResolvingFunctions()`.

## Creating the resolving functions

The specification defines a `CreateResolvingFunctions` abstract operation[^3], which is a fancy way of saying that it's a series of steps to perform as part of some other function or method. To make it easy to go back and forth between the specification and the Pledge library, I've opted to use the same name for an actual function. The details in the specification aren't all relevant to implementing the code in JavaScript, so I've omitted or changed some parts. I've also kept some parts that may seem nonsensical within the context of JavaScript -- I've done that intentionally, once again, for ease of going back and forth with the specification.

The `createResolvingFunctions()` function is responsible for creating the `resolve` and `reject` functions that are passed into the executor. However, this function is actually used elsewhere, as well, allowing any parts of the library to retrieve these functions in order to manipulate existing `Pledge` instances.

To start, the basic structure of the function is as follows:

```js
export function createResolvingFunctions(pledge) {

    // this "record" is used to track whether a Pledge is already resolved
    const alreadyResolved = { value: false };

    const resolve = resolution => {
        // TODO
    };

    // attach the record of resolution and the original pledge
    resolve.alreadyResolved = alreadyResolved;
    resolve.pledge = pledge;

    const reject = reason => {
        // TODO
    };

    // attach the record of resolution and the original pledge
    reject.alreadyResolved = alreadyResolved;
    reject.pledge = pledge;

    return {
        resolve,
        reject
    };
}
```

The first oddity of this function is the `alreadyResolved` object. The specification states that it's a record, so I've chosen to implement it using an object. Doing so ensures the same value is being read and modified regardless of location (using a simple boolean value would not have allowed for this sharing if the value was being written to or read from the `resolve` and `reject` properties).

The specification also indicates that the `resolve` and `reject` functions should have properties containing `alreadyResolved` and the original promise (`pledge`). This is done so that the `resolve` and `reject` functions can access those values while executing. However, that's not necessary in JavaScript because both functions are closures and can access those same values directly. I've opted to keep this detail in the code for completeness with the specification but they won't actually be used.

As mentioned previously, the contents of each function is where most of the work is done. However, the functions vary in how complex they are. I'll start by describing the `reject` function, as that is a great deal simpler than `resolve`.

### Creating the `reject` function

The `reject` function accepts a single argument, the reason for the rejection, and places the promise in a rejected state. That means any rejection handlers added using `then()` or `catch()` will be executed. The first step in that process is to ensure that the promise hasn't already been resolved, so you check the value of `alreadyResolved.value`, and if `true`, just return without doing anything. If `alreadyResolved.value` is `false` then you can continue on and the value to `true`. This ensures that this set of `resolve` and `reject` handlers can only be called once. After that, you can continue on change the internal state of the promise. Here's what that function looks like in the Pledge library:

```js
export function createResolvingFunctions(pledge) {

    const alreadyResolved = { value: false };

    // resolve function omitted for ease of reading

    const reject = reason => {

        if (alreadyResolved.value) {
            return;
        }

        alreadyResolved.value = true;

        return rejectPledge(pledge, reason);
    };

    reject.pledge = pledge;
    reject.alreadyResolved = alreadyResolved;

    return {
        resolve,
        reject
    };
}
```

The `rejectPledge()` function is another abstract operation from the specification[^4] that is used in multiple places and is responsible for changing the internal state of a promise. Here's the steps directly from the specification:

1. Assert: The value of `promise.[[PromiseState]]` is `pending`.
2. Let `reactions` be `promise.[[PromiseRejectReactions]]`.
3. Set `promise.[[PromiseResult]]` to `reason`.
4. Set `promise.[[PromiseFulfillReactions]]` to `undefined`.
5. Set `promise.[[PromiseRejectReactions]]` to `undefined`.
6. Set `promise.[[PromiseState]]` to `rejected`.
7. If `promise.[[PromiseIsHandled]]` is `false`, perform `HostPromiseRejectionTracker(promise, "reject")`.
8. Return `TriggerPromiseReactions(reactions, reason)`.

For the time being, I'm going to skip steps 7 and 8, as those are concepts I'll cover later in this series of blog posts. The rest can be almost directly translated into JavaScript code like this:

```js
export function rejectPledge(pledge, reason) {

    if (pledge[PledgeSymbol.state] !== "pending") {
        throw new Error("Pledge is already settled.");
    }

    const reactions = pledge[PledgeSymbol.rejectReactions];

    pledge[PledgeSymbol.result] = reason;
    pledge[PledgeSymbol.fulfillReactions] = undefined;
    pledge[PledgeSymbol.rejectReactions] = undefined;
    pledge[PledgeSymbol.state] = "rejected";

    if (!pledge[PledgeSymbol.isHandled]) {
        // TODO: perform HostPromiseRejectionTracker(promise, "reject").
    }

    // TODO: Return `TriggerPromiseReactions(reactions, reason)`.
}
```

All `rejectPledge()` is really doing is setting the various internal properties to the appropriate values for a rejection and then triggering the reject reactions. Once you understand that promises are being ruled by their internal properties, they become a lot less mysterious.

The next step is to implement the `resolve` function, which is quite a bit more involved than `reject` but fundamentally is still modifying internal state.

### Creating the `resolve` function

I've saved the `resolve` function for last due to the number of steps involved. If you're unfamiliar with promises, you may wonder why it's more complicated than `reject`, as they should be doing most of the same steps but with different values. The complexity comes due to the different ways `resolve` handles different types of values:

1. If the resolution value is the promise itself, then throw an error.
1. If the resolution value is a non-object, then fulfill the promise with the resolution value.
1. If the resolution value is an object with a `then` property:
    1. If the `then` property is not a method, then fulfill the promise with the resolution value.
    1. If the `then` property is a method (that makes the object a *thenable*), then call `then` with both a fulfillment and a rejection handler that will resolve or reject the promise.

So the `resolve` function only fulfills a promise immediately in the case of a non-object resolution value or a resolution value that is an object but doesn't have a callable `then` property. If a second promise is passed to `resolve` then the original promise can't be settled (either fulfilled or rejected) until the second promise is settled. Here's what the code looks like:

```js
export function createResolvingFunctions(pledge) {

    const alreadyResolved = { value: false };

    const resolve = resolution => {

        if (alreadyResolved.value) {
            return;
        }

        alreadyResolved.value = true;

        // can't resolve to the same pledge
        if (Object.is(resolution, pledge)) {
            const selfResolutionError = new TypeError("Cannot resolve to self.");
            return rejectPledge(pledge, selfResolutionError);
        }

        // non-objects fulfill immediately
        if (!isObject(resolution)) {
            return fulfillPledge(pledge, resolution);
        }

        let thenAction;

        /*
         * At this point, we know `resolution` is an object. If the object
         * is a thenable, then we need to wait until the thenable is resolved
         * before resolving the original pledge.
         * 
         * The `try-catch` is because retrieving the `then` property may cause
         * an error if it has a getter and any errors must be caught and used
         * to reject the pledge.
         */
        try {
            thenAction = resolution.then;
        } catch (thenError) {
            return rejectPledge(pledge, thenError);
        }

        // if the thenAction isn't callable then fulfill the pledge
        if (!isCallable(thenAction)) {
            return fulfillPledge(pledge, resolution);
        }

        /*
         * If `thenAction` is callable, then we need to wait for the thenable
         * to resolve before we can resolve this pledge.
         */

        // TODO: Let job be NewPromiseResolveThenableJob(promise, resolution, thenAction).
        // TODO: Perform HostEnqueuePromiseJob(job.[[Job]], job.[[Realm]]).
    };

    // attach the record of resolution and the original pledge
    resolve.alreadyResolved = alreadyResolved;
    resolve.pledge = pledge;

    // reject function omitted for ease of reading

    return {
        resolve,
        reject
    };
}
```

As with the `reject` function, the first step in the `resolve` function is to check the value of `alreadyResolved.value` and either return immediately if `true` or set to `true`. After that, the `resolution` value needs to be checked to see what action to take. The last step in the `resolve` function (marked with `TODO` comments) is for the case of a thenable that needs handlers attached. This will be discussed in my next post.

The `fulfillPledge()` function referenced in the `resolve` function looks a lot like the `rejectPledge()` function referenced in the `reject` function and simply sets the internal state:

```js
export function fulfillPledge(pledge, value) {

    if (pledge[PledgeSymbol.state] !== "pending") {
        throw new Error("Pledge is already settled.");
    }

    const reactions = pledge[PledgeSymbol.fulfillReactions];

    pledge[PledgeSymbol.result] = value;
    pledge[PledgeSymbol.fulfillReactions] = undefined;
    pledge[PledgeSymbol.rejectReactions] = undefined;
    pledge[PledgeSymbol.state] = "fulfilled";

    // TODO: Return `TriggerPromiseReactions(reactions, reason)`.
}
```

As with `rejectPledge()`, I'm leaving off the `TriggerPromiseReactions` operations for discussion in a later post.

## Wrapping Up

At this point, you should have a good understanding of how a `Promise` constructor works. The most important thing to remember is that every operation so far is synchronous; there is no asynchronous operation until we start dealing with other operations, such as `then()`, `catch()`, and `finally()`, which will be covered later in this series. When you create a new instance of `Promise` and pass in an executor, that executor is run immediately, and if either `resolve` or `reject` is called synchronously, then the newly created promise is already fulfilled or rejected, respectively. It's only what happens after that point where you get into asynchronous operations, and asynchronous operations are discussed in the [next post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-resolving-to-a-promise/).

All of this code is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.


[^1]: [Promise Objects](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-promise-objects)
[^2]: [Properties of Promise instances](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-properties-of-promise-instances)
[^3]: [CreateResolvingFunctions(promise)](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-createresolvingfunctions)
[^4]: [RejectPromise(promise, reason)](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-rejectpromise)
