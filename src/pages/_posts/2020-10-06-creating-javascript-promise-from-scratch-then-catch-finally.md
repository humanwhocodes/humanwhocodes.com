---
title: "Creating a JavaScript promise from scratch, Part 3: then(), catch(), and finally()"
teaser: "Promise handlers are where all of the asynchronous actions happens and it helps to look at the internals to understand how they work."
date: 2020-10-06
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

In my [first post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/) of this series, I explained how the `Promise` constructor works by recreating it as the `Pledge` constructor. In the [second post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-resolving-to-a-promise/) in this series, I explained how asynchronous operations work in promises through jobs. If you haven't already read those two posts, I'd suggest doing so before continuing on with this one.

This post focuses on implementing `then()`, `catch()`, and `finally()` according to ECMA-262. This functionality is surprisingly involved and relies on a lot of helper classes and utilities to get things working correctly. However, once you master a few basic concepts, the implementations are relatively straightforward.

As a reminder, this series is based on my promise library, [Pledge](https://github.com/humanwhocodes/pledge). You can view and download all of the source code from GitHub.

## The `then()` method

The `then()` method on promises accepts two arguments: a fulfillment handler and a rejection handler. The term *handler* is used to describe a function that is called in reaction to a change in the internal state of a promise, so a fulfillment handler is called when a promise is fulfilled and a rejection handler is called when a promise is rejected. Each of the two arguments may be set as `undefined` to allow you to set one or the other without requiring both.

The steps taken when `then()` is called depends on the state of the promise:

* If the promise's state is pending (the promise is unsettled), `then()` simply stores the handlers to be called later.
* If the promise's state is fulfilled, `then()` immediately queues a job to execute the fulfillment handler.
* If the promise's state is rejected, `then()` immediately queues a job to execute the rejection handler.

Additionally, regardless of the promise state, `then()` always returns another promise, which is why you can chain promises together like this:

```js
const promise = new Promise((resolve, reject) => {
    resolve(42);
});

promise.then(value1 => {
    console.log(value1);
    return value1 + 1;
}).then(value2 => {
    console.log(value2);
});
```

In this example, `promise.then()` adds a fulfillment handler that outputs the resolution value and then returns another number based on that value. The second `then()` call is actually on a second promise that is resolved using the return value from the preceding fulfillment handler. It's this behavior that makes implementing `then()` one of the more complicated aspects of promises, and that's why there are a small group of helper classes necessary to implement the functionality properly.

### The `PromiseCapability` record

The specification defines a `PromiseCapability` record[^1] as having the following internal-only properties:

| **Field Name** | **Value** | **Meaning** |
|----------------|-----------|-------------|
| `[[Promise]]` | An object | An object that is usable as a promise.|
| `[[Resolve]]` | A function object | The function that is used to resolve the given promise object.|
| `[[Reject]]` | A function object | The function that is used to reject the given promise object.|

Effectively, a `PromiseCapability` record consists of a promise object and the `resolve` and `reject` functions that change its internal state. You can think of this as a helper object that allows easier access to changing a promise's state.

Along with the definition of the `PromiseCapability` record, there is also the definition of a `NewPromiseCapability()` function[^2] that outlines the steps you must take in order to create a new `PromiseCapability` record. The `NewPromiseCapability()` function is passed a single argument, `C`, that is a function assumed to be a constructor that accepts an executor function. Here's a simplified list of steps:

1. If `C` isn't a constructor, throw an error.
1. Create a new `PromiseCapability` record with all internal properties set to `undefined`.
1. Create an executor function to pass to `C`.
1. Store a reference to the `PromiseCapability` on the executor.
1. Create a new promise using the executor and extract it `resolve` and `reject` functions.
1. Store the `resolve` and `reject` functions on the `PromiseCapability`.
1. If `resolve` isn't a function, throw an error.
1. If `reject` isn't a function, throw an error.
1. Store the promise on the `PromiseCapability`.
1. Return the `PromiseCapability`

I decided to use a `PledgeCapability` class to implement both `PromiseCapability` and `NewPromiseCapability()`, making it more idiomatic to JavaScript. Here's the code:

```js
export class PledgeCapability {

    constructor(C) {

        const executor = (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        };

        // not used but included for completeness with spec
        executor.capability = this;

        this.pledge = new C(executor);

        if (!isCallable(this.resolve)) {
            throw new TypeError("resolve is not callable.");
        }

        if (!isCallable(this.reject)) {
            throw new TypeError("reject is not callable.");
        }
    }
}
```

The most interesting part of the constructor, and the part that took me the longest to understand, is that the `executor` function is used simply to grab references to the `resolve` and `reject` functions that are passed in. This is necessary because you don't know what `C` is. If `C` was always `Promise`, then you could use `createResolvingFunctions()` to create `resolve` and `reject`. However, `C` could be a subclass of `Promise` that changes how `resolve` and `reject` are created, so you need to grab the actual functions that are passed in.

A note about the design of this class: I opted to use string property names instead of going through the trouble of creating symbol property names to represent that these properties are meant to be internal-only. However, because this class isn't exposed as part of the API, there is no risk of anyone accidentally referencing those properties from outside of the library. Given that, I decided to favor the readability of string property names over the more technically correct symbol property names.

The `PledgeCapability` class is used like this:

```js
const capability = new PledgeCapability(Pledge);

capability.resolve(42);
capability.pledge.then(value => {
    console.log(value);
});
```

In this example, the `Pledge` constructor is passed to `PledgeCapability` to create a new instance of `Pledge` and extract its `resolve` and `reject` functions. This turns out to be important because you don't know the class to use when creating the return value for `then()` until runtime.

### Using `Symbol.species`

The well-known symbol `Symbol.species` isn't well understood by JavaScript developers but is important to understand in the context of promises. Whenever a method on an object must return an instance of the same class, the specification defines a static `Symbol.species` getter on the class. This is true for many JavaScript classes including arrays, where methods like `slice()` and `concat()` return arrays, and it's also true for promises, where methods like `then()` and `catch()` return another promise. This is important because if you subclass `Promise`, you probably want `then()` to return an instance of your subclass and not an instance of `Promise`.

The specification defines the default value for `Symbol.species` to be `this` for all built-in classes, so the `Pledge` class implements this property as follows:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    // other methods omitted for space
}
```

Keep in mind that because the `Symbol.species` getter is static, `this` is actually a reference to `Pledge` (you can try it for yourself accessing `Pledge[Symbol.species]`). However, because `this` is evaluated at runtime, it would have a different value for a subclass, such as this:

```js
class SuperPledge extends Pledge {
    // empty
}
```

Using this code, `SuperPledge[Symbol.species]` evaluates to `SuperPledge`. Because `this` is evaluated at runtime, it automatically references the class constructor that is in use. That's exactly why the specification defines `Symbol.species` this way: it's a convenience for developers as using the same constructor for method return values is the common case.

Now that you have a good understanding of `Symbol.species`, it's time to move on implementing `then()`.

### Implementing the `then()` method

The `then()` method itself is fairly short because it delegates most of the work to a function called `PerformPromiseThen()`. Here's how the specification defines `then()`[^3]:

1. Let `promise` be the `this` value.
1. If `IsPromise(promise)` is `false`, throw a `TypeError` exception.
1. Let `C` be `?` `SpeciesConstructor(promise, %Promise%)`.
1. Let `resultCapability` be `?` `NewPromiseCapability(C)`.
1. Return `PerformPromiseThen(promise, onFulfilled, onRejected, resultCapability)`.

And here's how I coded up that algorithm:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    then(onFulfilled, onRejected) {

        assertIsPledge(this);

        const C = this.constructor[Symbol.species];
        const resultCapability = new PledgeCapability(C);
        return performPledgeThen(this, onFulfilled, onRejected, resultCapability);
    }

    // other methods omitted for space
}
```

The first thing to note is that I didn't define a variable to store `this` as the algorithm specifies. That's because it's redundant in JavaScript when you can access `this` directly. After that, the rest of the method is a direct translation into JavaScript. The species constructor is stored in `C` and a new `PledgeCapability` is created from that. Then, all of the information is passed to `performPledgeThen()` to do the real work.

The `performPledgeThen()` function is one of the longer functions in the Pledge library and implements the algorithm for `PerformPromiseThen()` in the specification. The algorithm is a little difficult to understand, but it begins with these steps:

1. Assert that the first argument is a promise.
1. If either `onFulfilled` or `onRejected` aren't functions, set them to `undefined`.
1. Create `PromiseReaction` records for each of `onFulfilled` and `onRejected`.

Here's what that code looks like in the Pledge library:

```js
function performPledgeThen(pledge, onFulfilled, onRejected, resultCapability) {
    
    assertIsPledge(pledge);

    if (!isCallable(onFulfilled)) {
        onFulfilled = undefined;
    }

    if (!isCallable(onRejected)) {
        onRejected = undefined;
    }

    const fulfillReaction = new PledgeReaction(resultCapability, "fulfill", onFulfilled);
    const rejectReaction = new PledgeReaction(resultCapability, "reject", onRejected);

    // more code to come

}
```

The `fulfillReaction` and `rejectReaction` objects are always created event when `onFulfilled` and `onRejected` are `undefined`. These objects store all of the information necessary to execute a handler. (Keep in mind that only one of these reactions will ever be used. Either the pledge is fulfilled so `fulfillReaction` is used or the pledge is rejected so `rejectReaction` is used. That's why it's safe to pass the same `resultCapability` to both even though it contains only one instance of `Pledge`.)

The `PledgeReaction` class is the JavaScript equivalent of the `PromiseReaction` record in the specification and is declared like this:

```js
class PledgeReaction {
    constructor(capability, type, handler) {
        this.capability = capability;
        this.type = type;
        this.handler = handler;
    }
}
```

The next steps in `PerformPromiseThen()` are all based on the state of the promise:

1. If the state is pending, then store the reactions for later.
2. If the state is fulfilled, then queue a job to execute `fulfillReaction`.
3. If the state is rejected, then queue a job to execute `rejectReaction`.

And after that, there are two more steps:

1. Mark the promise as being handled (for unhandled rejection tracking, discussed in an upcoming post).
1. Return the promise from the `resultCapability`, or return `undefined` if `resultCapability` is `undefined`.

Here's the finished `performPledgeThen()` that implements these steps:

```js
function performPledgeThen(pledge, onFulfilled, onRejected, resultCapability) {

    assertIsPledge(pledge);

    if (!isCallable(onFulfilled)) {
        onFulfilled = undefined;
    }

    if (!isCallable(onRejected)) {
        onRejected = undefined;
    }

    const fulfillReaction = new PledgeFulfillReaction(resultCapability, onFulfilled);
    const rejectReaction = new PledgeRejectReaction(resultCapability, onRejected);

    switch (pledge[PledgeSymbol.state]) {

        case "pending":
            pledge[PledgeSymbol.fulfillReactions].push(fulfillReaction);
            pledge[PledgeSymbol.rejectReactions].push(rejectReaction);
            break;

        case "fulfilled": 
            {
                const value = pledge[PledgeSymbol.result];
                const fulfillJob = new PledgeReactionJob(fulfillReaction, value);
                hostEnqueuePledgeJob(fulfillJob);
            }
            break;

        case "rejected":
            {
                const reason = pledge[PledgeSymbol.result];
                const rejectJob = new PledgeReactionJob(rejectReaction, reason);

                // TODO: if [[isHandled]] if false
                
                hostEnqueuePledgeJob(rejectJob);
            }
            break;

        default:
            throw new TypeError(`Invalid pledge state: ${pledge[PledgeSymbol.state]}.`);
    }

    pledge[PledgeSymbol.isHandled] = true;

    return resultCapability ? resultCapability.pledge : undefined;
}
```

In this code, the `PledgeSymbol.fulfillReactions` and `PledgeSymbol.rejectReactions` are finally used for something. If the state is pending, the reactions are stored for later so they can be triggered when the state changes (this is discussed later in this post). If the state is either fulfilled or rejected then a `PledgeReactionJob` is created to run the reaction. The `PledgeReactionJob` maps to `NewPromiseReactionJob()`[^4] in the specification and is declared like this:

```js
export class PledgeReactionJob {
    constructor(reaction, argument) {
        return () => {
            const { capability: pledgeCapability, type, handler } = reaction;
            let handlerResult;

            if (typeof handler === "undefined") {

                if (type === "fulfill") {
                    handlerResult = new NormalCompletion(argument);
                } else {
                    handlerResult = new ThrowCompletion(argument);
                }
            } else {
                try {
                    handlerResult = new NormalCompletion(handler(argument));
                } catch (error) {
                    handlerResult = new ThrowCompletion(error);
                }
            }

            if (typeof pledgeCapability === "undefined") {
                if (handlerResult instanceof ThrowCompletion) {
                    throw handlerResult.value;
                }

                // Return NormalCompletion(empty)
                return;
            }

            if (handlerResult instanceof ThrowCompletion) {
                pledgeCapability.reject(handlerResult.value);
            } else {
                pledgeCapability.resolve(handlerResult.value);
            }

            // Return NormalCompletion(status)
        };
    }
}
```

This code begins by extracting all of the information from the `reaction` that was passed in. The function is a little bit long because both `capability` and `handler` can be `undefined`, so there are fallback behaviors in each of those cases.

The `PledgeReactionJob` class also uses the concept of a *completion record*[^5]. In most of the code, I was able to avoid needing to reference completion records directly, but in this code it was necessary to better match the algorithm in the specification. A completion record is nothing more than a record of how an operation's control flow concluded. There are four completion types:

* **normal** - when an operation succeeds without any change in control flow (the `return` statement or exiting at the end of a function)
* **break** - when an operation exits completely (the `break` statement)
* **continue** - when an operation exits and then restarts (the `continue` statement)
* **throw** - when an operation results in an error (the `throw` statement)

These completion records tell the JavaScript engine how (or whether) to continue running code. For creating `PledgeReactionJob`, I only needed normal and throw completions, so I declared them as follows:

```js
export class Completion {
    constructor(type, value, target) {
        this.type = type;
        this.value = value;
        this.target = target;
    }
}
export class NormalCompletion extends Completion {
    constructor(argument) {
        super("normal", argument);
    }
}

export class ThrowCompletion extends Completion {
    constructor(argument) {
        super("throw", argument);
    }
}
```

Essentially, `NormalCompletion` tells the function to exit as normal (if there is no `pledgeCapability`) or resolve a pledge (if `pledgeCapability` is defined) and `ThrowCompletion` tells the function to either throw an error (if there is no `pledgeCapability`) or reject a pledge (if `pledgeCapability` is defined). Within the Pledge library, `pledgeCapability` will always be defined, but I wanted to match the original algorithm from the specification for completeness.

Having covered `PledgeReactionJob` means that the `pledgePerformThen()` function is complete and all handlers will be properly stored (if the pledge state is pending) or executed immediately (if the pledge state is fulfilled or rejected). The last step is to execute any save reactions when the pledge state changes from pending to either fulfilled or rejected.

### Triggering stored reactions

When a promise transitions from unsettled to settled, it triggers the stored reactions to execute (fulfill reactions if the promise is fulfilled and reject reactions when the promise is rejected). The specification defines this operation as `TriggerPromiseReaction()`[^6], and it's one of the easier algorithms to implement. The entire algorithm is basically iterating over a list (array in JavaScript) of reactions and then creating and queueing a new `PromiseReactionJob` for each one. Here's how I implemented it as `triggerPledgeReactions()`:

```js
export function triggerPledgeReactions(reactions, argument) {

    for (const reaction of reactions) {
        const job = new PledgeReactionJob(reaction, argument);
        hostEnqueuePledgeJob(job);
    }

}
```

The most important part is to pass in the correct `reactions` argument, which is why this is function is called in two places: `fulfillPledge()` and `rejectPledge()` (discussed in part 1 of this series). For both functions, triggering reactions is the last step. Here's the code for that:

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

    return triggerPledgeReactions(reactions, value);
}

export function rejectPledge(pledge, reason) {

    if (pledge[PledgeSymbol.state] !== "pending") {
        throw new Error("Pledge is already settled.");
    }

    const reactions = pledge[PledgeSymbol.rejectReactions];

    pledge[PledgeSymbol.result] = reason;
    pledge[PledgeSymbol.fulfillReactions] = undefined;
    pledge[PledgeSymbol.rejectReactions] = undefined;
    pledge[PledgeSymbol.state] = "rejected";

    // global rejection tracking
    if (!pledge[PledgeSymbol.isHandled]) {
        // TODO: perform HostPromiseRejectionTracker(promise, "reject").
    }

    return triggerPledgeReactions(reactions, reason);
}
```

After this addition, `Pledge` objects will properly trigger stored fulfillment and rejection handlers whenever the handlers are added prior to the pledge resolving. Note that both `fulfillPledge()` and `rejectPledge()` remove all reactions from the `Pledge` object in the process of changing the object's state and triggering the reactions.


## The `catch()` method

If you always wondered if the `catch()` method was just a shorthand for `then()`, then you are correct. All `catch()` does is call `then()` with an `undefined` first argument and the `onRejected` handler as the second argument:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    then(onFulfilled, onRejected) {

        assertIsPledge(this);

        const C = this.constructor[Symbol.species];
        const resultCapability = new PledgeCapability(C);
        return performPledgeThen(this, onFulfilled, onRejected, resultCapability);
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    // other methods omitted for space
}
```

So yes, `catch()` is really just a convenience method. The `finally()` method, however, is more involved.

## The `finally()` method

The `finally()` method was a late addition to the promises specification and works a bit differently than `then()` and `catch()`. Whereas both `then()` and `catch()` allow you to add handlers that will receive a value when the promise is settled, a handler added with `finally()` does not receive a value. Instead, the promise returned from the call to `finally()` is settled in the same as the first promise. For example, if a given promise is fulfilled, then the promise returned from `finally()` is fulfilled with the same value:

```js
const promise = Promise.resolve(42);

promise.finally(() => {
    console.log("Original promise is settled.");
}).then(value => {
    console.log(value);     // 42
});
```

This example shows that calling `finally()` on a promise that is resolved to `42` will result in a promise that is also resolved to `42`. These are two different promises but they are resolved to the same value.

Similarly, if a promise is rejected, the the promise returned from `finally()` will also be rejected, as in this example:

```js
const promise = Promise.reject("Oops!");

promise.finally(() => {
    console.log("Original promise is settled.");
}).catch(reason => {
    console.log(reason);     // "Oops!"
});
```

Here, `promise` is rejected with a reason of `"Oops!"`. The handler assigned with `finally()` will execute first, outputting a message to the console, and the promise returned from `finally()` is rejected to the same reason as `promise`. This ability to pass on promise rejections through `finally()` means that adding a `finally()` handler does not count as handling a promise rejection. (If a rejected promise only has a `finally()` handler then the JavaScript runtime will still output a message about an unhandled promise rejection. You still need to add a rejection handler with `then()` or `catch()` to avoid that message.)

With a good understanding of `finally()` works, it's time to implement it.

### Implementing the `finally()` method

The first few steps of `finally()`[^7] are the same as with `then()`, which is to assert that `this` is a promise and to retrieve the species constructor:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    finally(onFinally) {

        assertIsPledge(this);

        const C = this.constructor[Symbol.species];

        // TODO
    }

    // other methods omitted for space
}
```

After that, the specification defines two variables, `thenFinally` and `catchFinally`, which are the fulfillment and rejection handlers that will be passed to `then()`. Just like `catch()`, `finally()` eventually calls the `then()` method directly. The only question is what values will be passed. For instance, if the `onFinally` argument isn't callable, then `thenFinally` and `catchFinally` are set equal to `onFinally` and no other work needs to be done:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    finally(onFinally) {

        assertIsPledge(this);

        const C = this.constructor[Symbol.species];

        let thenFinally, catchFinally;

        if (!isCallable(onFinally)) {
            thenFinally = onFinally;
            catchFinally = onFinally;
        } else {

            // TODO

        }

        return this.then(thenFinally, catchFinally);
    }

    // other methods omitted for space
}
```

You might be confused as to why an uncallable `onFinally` will be passed into `then()`, as was I when I first read the specification. Remember that `then()` ultimately delegates to `performPledgeThen()`, which in turn sets any uncallable handlers to `undefined`. So `finally()` is relying on that validation step in `performPledgeThen()` to ensure that uncallable handlers are never formally added.

The next step is to define the values for `thenFinally` and `catchFinally` if `onFinally` is callable. Each of these functions is defined in the specification as a sequence of steps to perform in order to pass on the settlement state and value from the first promise to the returned promise. The steps for `thenFinally` are a bit difficult to decipher in the specification[^8] but are really straight forward when you see the code:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    finally(onFinally) {

        assertIsPledge(this);

        const C = this.constructor[Symbol.species];

        let thenFinally, catchFinally;

        if (!isCallable(onFinally)) {
            thenFinally = onFinally;
            catchFinally = onFinally;
        } else {

            thenFinally = value => {
                const result = onFinally.apply(undefined);
                const pledge = pledgeResolve(C, result);
                const valueThunk = () => value;
                return pledge.then(valueThunk);
            };

            // not used by included for completeness with spec
            thenFinally.C = C;
            thenFinally.onFinally = onFinally;

            // TODO

        }

        return this.then(thenFinally, catchFinally);
    }

    // other methods omitted for space
}
```

Essentially, the `thenFinally` value is a function that accepts the fulfilled value of the promise and then:

1. Calls `onFinally()`.
2. Creates a resolved pledge with the result of step 1. (This result is ultimately discarded.)
3. Creates a function called `valueThunk` that does nothing but return the fulfilled value.
4. Assigns `valueThunk` as the fulfillment handler for the newly-created pledge and then returns the value.

After that, references to `C` and `onFinally` are stored on the function, but as noted in the code, these aren't necessary for the JavaScript implementation. In the specification, this is the way that the `thenFinally` functions gets access to both `C` and `onFinally`. In JavaScript, I'm using a closure to get access to those values.

The `pledgeResolve()` function is straightforward and follows the algorithm described in the specification[^9] almost exactly:

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

For the purposes of this post, it's not important to get into the specifics of checking to see if `x` is an instance of `Pledge` because that value is never used within `onFinally`. (This will be discussed, however, in my next post as it's an important feature used in `Promise.resolve()`.) Ultimately, the function creates a new `PledgeCapability` so it can return a `Pledge` instance.

The steps to create `catchFinally`[^10] are similar, but the end result is a function that throws a reason:

```js
export class Pledge {

    // constructor omitted for space

    static get [Symbol.species]() {
        return this;
    }

    finally(onFinally) {

        assertIsPledge(this);

        const C = this.constructor[Symbol.species];

        let thenFinally, catchFinally;

        if (!isCallable(onFinally)) {
            thenFinally = onFinally;
            catchFinally = onFinally;
        } else {

            thenFinally = value => {
                const result = onFinally.apply(undefined);
                const pledge = pledgeResolve(C, result);
                const valueThunk = () => value;
                return pledge.then(valueThunk);
            };

            // not used by included for completeness with spec
            thenFinally.C = C;
            thenFinally.onFinally = onFinally;

            catchFinally = reason => {
                const result = onFinally.apply(undefined);
                const pledge = pledgeResolve(C, result);
                const thrower = () => {
                    throw reason;
                };
                return pledge.then(thrower);
            };

            // not used by included for completeness with spec
            catchFinally.C = C;
            catchFinally.onFinally = onFinally;

        }

        return this.then(thenFinally, catchFinally);
    }

    // other methods omitted for space
}
```

You might be wondering why the `catchFinally` function is calling `pledge.then(thrower)` instead of `pledge.catch(thrower)`. This is the way the specification defines this step to take place, and it really doesn't matter whether you use `then()` or `catch()` because a handler that throws a value will always trigger a rejected promise.

With this completed `finally()` method, you can now see that when `onFinally` is callable, the method creates a `thenFinally` function that resolves to the same value as the original function and a `catchFinally` function that throws any reason it receives. These two functions are then passed to `then()` so that both fulfillment and rejection are handled in a way that mirrors the settled state of the original promise.

## Wrapping Up

This post covered the internals of `then()`, `catch()`, and `finally()`, with `then()` containing most of the functionality of interest while `catch()` and `finally()` each delegate to `then()`. Handling promise reactions is, without a doubt, the most complicated part of the promises specification. You should now have a good understanding that all reactions are executed asynchronously as jobs (microtasks) regardless of promise state. This understanding really is key to a good overall understanding of how promises work and when you should expect various handlers to be executed.

In the next post in this series, I'll cover creating settled promises with `Promise.resolve()` and `Promise.reject()`.

All of this code is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.

## References

[^1]: [PromiseCapability Records](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-promisecapability-records)
[^2]: [NewPromiseCapability( C )](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-newpromisecapability)
[^3]: [Promise.prototype.then( onFulfilled, onRejected )](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-promise.prototype.then)
[^4]: [NewPromiseReactionJob( reaction, argument )](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-newpromisereactionjob)
[^5]: [The Completion Record Specification Type](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-completion-record-specification-type)
[^6]: [TriggerPromiseReactions( reactions, argument )](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-triggerpromisereactions)
[^7]: [Promise.prototype.finally( onFinally )](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-promise.prototype.finally)
[^8]: [Then Finally Functions](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-thenfinallyfunctions)
[^9]: [PromiseResolve( C, x )](https://www.ecma-international.org/ecma-262/#sec-promise-resolve)
[^10]: [Catch Finally Functions](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-catchfinallyfunctions)
