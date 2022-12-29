---
title: "Creating a JavaScript promise from scratch, Part 5: Promise.race() and Promise.any()"
teaser: "Promise.race() and Promise.any() work on any number of promises to allow you to know when certain ones have resolved "
date: 2020-11-24
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

In the previous posts in this series, I discussed implementing a promise from scratch in JavaScript. Now that there's a full promise implementation, it's time to look at how you can monitor multiple promises at once using `Promise.race()` and `Promise.any()` (`Promise.all()` and `Promise.allSettled()` will be covered in the next post). You'll see that, for the most part, all of the methods that work with multiple promises follow a similar algorithm, which makes it fairly easy to move from implementing one of these methods to the next.

Note: This is the fifth post in my series about creating JavaScript promises from scratch. If you haven't already read the [first post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/), the [second post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-resolving-to-a-promise/), the [third post](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-then-catch-finally/), and the [fourth post](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-promise-resolve-reject/), I would suggest you do so because this post builds on the topics covered in those posts.

As a reminder, this series is based on my promise library, [Pledge](https://github.com/humanwhocodes/pledge). You can view and download all of the source code from GitHub.

## Prerequisite: Using iterators

Most of the time you see examples using `Promise.race()` and `Promise.any()` with an array being passed as the only argument, like this:

```js
Promise.race([p1, p2, p3]).then(value => {
    console.log(value);
});
```

Because of this, it's easy to assume that the argument to `Promise.race()` must be an array. In fact, the argument doesn't need to be an array, but it must be an *iterable*. An iterable is just an object that has a `Symbol.iterator` method that returns an *iterator*. An iterator is an object with a `next()` method that returns an object containing two properties: `value`, the next value in the iterator or `undefined` if none are left, and `done`, a Boolean value that is set to `true` when there are no more values in the iterator.

Arrays are iterables by default, meaning they have a default `Symbol.iterator` method that returns an iterator. As such, you can pass an array anywhere an iterator is required and it just works. What that means for the implementations of `Promise.race()` and `Promise.all()` is that they must work with iterables, and unfortunately, ECMA-262 makes working with iterables a little bit opaque.

The first operation we need is `GetIterator()`[^1], which is the operation that retrieves the iterator for an iterable and returns an `IteratorRecord` containing the iterator, the `next()` method for that iterator, and a `done` flag. The algorithm is a bit difficult to understand, but fundamentally `GetIterator()` will attempt to retrieve either an async or sync iterator based on a `hint` that is passed. For the purposes of this post, just know that only sync iterators will be used, so you can effectively ignore the parts that have to do with async iterators. Here's the operation translated into JavaScript:

```js
export function getIterator(obj, hint="sync", method) {

    if (hint !== "sync" && hint !== "async") {
        throw new TypeError("Invalid hint.");
    }

    if (method === undefined) {
        
        if (hint === "async") {
        
            method = obj[Symbol.asyncIterator];
        
            if (method === undefined) {
                const syncMethod = obj[Symbol.iterator];
                const syncIteratorRecord = getIterator(obj, "sync", syncMethod);

                // can't accurately represent CreateAsyncFromSyncIterator()
                return syncIteratorRecord;
            }
        } else {
            method = obj[Symbol.iterator];
        }
    }

    const iterator = method.call(obj);

    if (!isObject(iterator)) {
        throw new TypeError("Iterator must be an object.");
    }

    const nextMethod = iterator.next;

    return {
        iterator,
        nextMethod,
        done: false
    };

}
```

In ECMA-262, you always use `IteratorRecord` to work with iterators instead of using the iterator directly. Similarly, there are several operations that are used to manually work with an iterator:

* `IteratorNext()`[^2] - calls the `next()` method on an iterator and returns the result.
* `ItereatorComplete()`[^3] - returns a Boolean indicating if the iterator is done (simply reads the `done` field of the given result from `IteratorNext()`).
* `IteratorValue()`[^4] - returns the `value` field of the given result from `IteratorNext()`.
* `IteratorStep()`[^5] - returns the result from `IteratorNext()` if `done` is `false`; returns `false` if `done` is `true` (just for fun, I suppose).

Each of these operations is pretty straightforward as they simply wrap built-in iterator operations. Here are the operations implemented in JavaScript: 

```js
export function iteratorNext(iteratorRecord, value) {

    let result;

    if (value === undefined) {
        result = iteratorRecord.nextMethod.call(iteratorRecord.iterator);
    } else {
        result = iteratorRecord.nextMethod.call(iteratorRecord.iterator, value);
    }

    if (!isObject(result)) {
        throw new TypeError("Result must be an object.");
    }

    return result;

}

export function iteratorComplete(iterResult) {

    if (!isObject(iterResult)) {
        throw new TypeError("Argument must be an object.");
    }

    return Boolean(iterResult.done);
}

export function iteratorValue(iterResult) {

    if (!isObject(iterResult)) {
        throw new TypeError("Argument must be an object.");
    }

    return iterResult.value;
}

export function iteratorStep(iteratorRecord) {

    const result = iteratorNext(iteratorRecord);
    const done = iteratorComplete(result);
    
    if (done) {
        return false;
    }

    return result;
}
```

To get an idea about how these operations are used, consider this simple loop using an array:

```js
const values = [1, 2, 3];

for (const nextValue of values) {
    console.log(nextValue);
}
```

The `for-of` loop operates on the iterator creates for the `values` array. Here's a similar loop using the iterator functions defined previously:

```js
const values = [1, 2, 3];
const iteratorRecord = getIterator(values);

// ECMA-262 always uses infinite loops that break
while (true) {

        let next;
        
        /*
         * Get the next step in the iterator. If there's an error, don't forget
         * to set the `done` property to `true` for posterity.
         */
        try {
            next = iteratorStep(iteratorRecord);
        } catch (error) {
            iteratorRecord.done = true;
            throw error;
        }

        // if `next` is false then we are done and can exit
        if (next === false) {
            iteratorRecord.done = true;
            break;
        }

        let nextValue;

        /*
         * Try to retrieve the value of the next step. The spec says this might
         * actually throw an error, so once again, catch that error, set the
         * `done` field to `true`, and then re-throw the error.
         */
        try {
            nextValue = iteratorValue(next);
        } catch (error) {
            iteratorRecord.done = true;
            throw error;
        }

        // actually output the value
        console.log(nextValue);
    }
}
```

As you can probably tell from this example, there's a lot of unnecessary complexity involved with looping over an iterator in ECMA-262. Just know that all of these operations can be easily replaced with a `for-of` loop. I chose to use the iterator operations so that it's easier to go back and forth between the code and the specification, but there are definitely more concise and less error-prone ways of implementing the same functionality.

## The `Promise.race()` method

The `Promise.race()` method is the simplest of the methods that work on multiple promises: whichever promise settles first, regardless if it's fulfilled or rejected, that result is passed through to the returned promise. So if the first promise to settle is fulfilled, then the returned promise is fulfilled with the same value; if the first promise to settle is rejected, then the returned promise is rejected with the same reason. Here are a couple examples:

```js
const promise1 = Promise.race([
    Promise.resolve(42),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise1.then(value => {
    console.log(value);     // 42
});

const promise2 = Promise.race([
    new Promise(resolve => {
        setTimeout(() => {
            resolve(42);
        }, 500);
    }),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise2.catch(reason => {
    console.log(reason);    // 43
});
```

The behavior of `Promise.race()` makes it easier to implement than the other three methods that work on multiple promises, all of which require keeping at least one array to track results.

### Creating the `Pledge.race()` method

The specification[^6] for `Promise.race()` describes the algorithm as follows:

1. Let `C` be the `this` value.
1. Let `promiseCapability` be `?` `NewPromiseCapability(C)`.
1. Let `promiseResolve` be `GetPromiseResolve(C)`.
1. `IfAbruptRejectPromise(promiseResolve, promiseCapability)`.
1. Let `iteratorRecord` be `GetIterator(iterable)`.
1. `IfAbruptRejectPromise(iteratorRecord, promiseCapability)`.
1. Let `result` be `PerformPromiseRace(iteratorRecord, C, promiseCapability, promiseResolve)`.
1. If `result` is an abrupt completion, then
    1. If `iteratorRecord.[[Done]]` is `false`, set `result` to `IteratorClose(iteratorRecord, result)`.
    1. `IfAbruptRejectPromise(result, promiseCapability)`.
1. Return `Completion(result)`.

The main algorithm for `Promise.race()` actually takes place in an operation called `PerformPromiseRace`. The rest is just setting up all of the appropriate data to pass to the operation and then interpreting the result of the operation. All four of the methods that deal with multiple promises, `Promise.race()`, `Promise.any()`, `Promise.all()`, and `Promise.allSettled()`, all follow this same basic algorithm for their methods with the only difference being the operations they delegate to. This will become clear later in this post when I discussed `Promise.any()`.

```js
class Pledge {

    // other methods omitted for space

    static race(iterable) {

        const C = this;
        const pledgeCapability = new PledgeCapability(C);
        let iteratorRecord;

        try {
            const pledgeResolve = getPledgeResolve(C);
            iteratorRecord = getIterator(iterable);
            const result = performPledgeRace(iteratorRecord, C, pledgeCapability, pledgeResolve);
            return result;
        } catch (error) {

            let result = new ThrowCompletion(error);

            if (iteratorRecord && iteratorRecord.done === false) {
                result = iteratorClose(iteratorRecord, result);
            }

            pledgeCapability.reject(result.value);
            return pledgeCapability.pledge;
        }

    }

    // other methods omitted for space
}
```

Like many of the other methods in the `Pledge` class, this one starts by retrieving the `this` value and creating a `PledgeCapability` object. The next step is to retrieve the `resolve` method from the constructor, which basically means `pledgeResolve` is set equal to `Pledge.resolve()` (discussed in part 4). The `getPledgeResolve()` method is the equivalent of the `GetPromiseResolve`[^7] operation in the spec. Here's the code:

```js
function getPledgeResolve(pledgeConstructor) {

    assertIsConstructor(pledgeConstructor);
    const pledgeResolve = pledgeConstructor.resolve;

    if (!isCallable(pledgeResolve)) {
        throw new TypeError("resolve is not callable.");
    }

    return pledgeResolve;
}
```

After that, an iterator is retrieved for the iterable that was passed into the method. All of the important pieces of data are passed into `performPledgeRace()`, which I'll cover in a moment.

The `catch` clause of the `try-catch` statement handles any errors that are thrown. In order to make the code easier to compare the specification, I've chosen to once again use completion records (completion records were introduced in part 3 of this series). This part isn't very important to the overall algorithm, so I'm going to skip explaining it and the `iteratorClose()` function in detail. Just know that when an error is thrown, the iterator might not have completed and so `iteratorClose()` is used to close out the iterator, freeing up any memory associated with it. The `iteratorClose()` function may return its own error, and if so, that's the error that should be rejected into the created pledge. If you'd like to learn more about `iteratorClose()`, please check out the source code on GitHub.

The next step is to implement the `PerformPromiseRace()`[^8] operation as `performPledgeRace()`. The algorithm for this operation seems more complicated than it actually is due to the iterator loop I described at the start of this post. See if you can figure out what is happening in this code:

```js
function performPledgeRace(iteratorRecord, constructor, resultCapability, pledgeResolve) {

    assertIsConstructor(constructor);
    assertIsCallable(pledgeResolve);

    while (true) {

        let next;
        
        try {
            next = iteratorStep(iteratorRecord);
        } catch (error) {
            iteratorRecord.done = true;
            resultCapability.reject(error);
            return resultCapability.pledge;
        }

        if (next === false) {
            iteratorRecord.done = true;
            return resultCapability.pledge;
        }

        let nextValue;

        try {
            nextValue = iteratorValue(next);
        } catch (error) {
            iteratorRecord.done = true;
            resultCapability.reject(error);
            return resultCapability.pledge;
        }

        const nextPledge = pledgeResolve.call(constructor, nextValue);
        nextPledge.then(resultCapability.resolve, resultCapability.reject);
    }

}
```

The first thing to notice is that, unlike the loops described in the first section of this post, no errors are thrown. Instead, any errors that occur are passed to the `resultCapability.reject()` method and the created pledge object is returned. All of the error checking really gets in the way of understanding what is a very simple algorithm, so here's a version that better illustrates how the algorithm works using JavaScript you'd write in real life:

```js
function performPledgeRaceSimple(iteratorRecord, constructor, resultCapability, pledgeResolve) {

    assertIsConstructor(constructor);
    assertIsCallable(pledgeResolve);

    // You could actually just pass the iterator instead of `iteratatorRecord`
    const iterator = iteratorRecord.iterator;

    try {

        // loop over every value in the iterator
        for (const nextValue of iterator) {
            const nextPledge = pledgeResolve.call(constructor, nextValue);
            nextPledge.then(resultCapability.resolve, resultCapability.reject);
        }

    } catch (error) {
        resultCapability.reject(error);
    }

    iteratorRecord.done = true;
    return resultCapability.pledge;
}
```

With this stripped-down version of `performPledgeRace()`, you can see that the fundamental algorithm is take each value returned from the iterator and pass it to `Pledge.resolve()` to ensure you have an instance of `Pledge` to work with. The iterator can contain both `Pledge` objects and any other non-`Pledge` value, so the best way to ensure you have a `Pledge` object is to pass all values to `Pledge.resolve()` and use the result (`nextPledge`). Then, all you need to do is attach `resultCapability.resolve()` as the fulfillment handler and `resultCapability.reject()` as the rejection handler. Keep in mind that these methods only work once and otherwise do nothing, so there is no harm in assigning them to all pledges (see part 3 for detail on how this works).

With that, the `Pledge.race()` method is complete. This is the simplest of the static methods that work on multiple promises. The next method, `Pledge.any()`, uses some of the same logic but also adds a bit more complexity for handling rejections.

## The `Promise.any()` method

The `Promise.any()` method is a variation of the `Promise.race()` method. Like `Promise.race()`, `Promise.any()` will return a promise that is fulfilled with the same value as the first promise to be fulfilled. In effect, there's still a "race" to see which promise will be fulfilled first. The difference is when none of the promises are fulfilled, in which case the returned promise is rejected with an `AggregateError` object[^9] that contains an `errors` array with the rejection reasons of each promise. Here are some examples to better illustrate:


```js
const promise1 = Promise.any([
    Promise.resolve(42),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise1.then(value => {
    console.log(value);     // 42
});

const promise2 = Promise.any([
    new Promise(resolve => {
        setTimeout(() => {
            resolve(42);
        }, 500);
    }),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise2.then(value => {
    console.log(value);    // 44
});

const promise3 = Promise.any([
    Promise.reject(42),
    Promise.reject(43),
    Promise.reject(44)
]);

promise3.catch(reason => {
    console.log(reason.errors[0]);    // 42
    console.log(reason.errors[1]);    // 43
    console.log(reason.errors[2]);    // 44
});
```

The first two calls to `Promise.any()` in this code are resolved to a fulfilled promise because at least one promise was fulfilled; the last call resolves to an `AggregateError` object where the `errors` property is an array of all the rejected values.

### Creating an `AggregateError` object

The first step in implementing `Pledge.any()` is to create a representation of `AggregateError`. This class is new enough to JavaScript that it's not present in a lot of runtimes yet, so it's helpful to have a standalone representation. The specification[^9] indicates that `AggregateError` is not really a class, but rather a function that can be called with or without `new`. Here's what a translation of the specification looks like:

```js
export function PledgeAggregateError(errors=[], message) {

    const O = new.target === undefined ? new PledgeAggregateError() : this;

    if (typeof message !== "undefined") {
        const msg = String(message);

        Object.defineProperty(O, "message", {
            value: msg,
            writable: true,
            enumerable: false,
            configurable: true
        });
    }

    // errors can be an iterable
    const errorsList = [...errors];

    Object.defineProperty(O, "errors", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: errorsList
    });

    return O;
}
```

An interesting note about this type of error is that the `message` parameter is optional and may not appear on the object. The `errors` parameter is also optional, however, the created object will always have an `errors` property. Due to this, and the fact that the implementation is done with a function, there are a variety of ways to create a new instance:

```js
const error1 = new PledgeAggregateError();
const error2 = new PledgeAggregateError([42, 43, 44]);
const error3 = new PledgeAggregateError([42, 43, 44], "Oops!");

const error4 = PledgeAggregateError();
const error5 = PledgeAggregateError([42, 43, 44]);
const error6 = PledgeAggregateError([42, 43, 44], "Oops!");
```

This implementation matches how the specification defines `AggregateError` objects, so now it's time to move on to implementing `Pledge.any()` itself.

### Creating the `Pledge.any()` method

As I mentioned in the previous section, all of the algorithms for the static methods that work on multiple promises are similar, with the only real exception being the name of the operation that it delegates to. The `Promise.any()` method[^10] follows the same structure as the `Promise.race()` method, and so the `Pledge.any()` method in this library should look familiar:

```js
class Pledge {

    // other methods omitted for space

    static any(iterable) {

        const C = this;
        const pledgeCapability = new PledgeCapability(C);
        let iteratorRecord;

        try {
            const pledgeResolve = getPledgeResolve(C);
            iteratorRecord = getIterator(iterable);
            const result = performPledgeAny(iteratorRecord, C, pledgeCapability, pledgeResolve);
            return result;
        } catch (error) {

            let result = new ThrowCompletion(error);

            if (iteratorRecord && iteratorRecord.done === false) {
                result = iteratorClose(iteratorRecord, result);
            }

            pledgeCapability.reject(result.value);
            return pledgeCapability.pledge;
        }

    }

    // other methods omitted for space
}
```

Because you're already familiar with this basic algorithm, I'll skip directly to what the `performPledgeAny()` function does.

The algorithm for the `PerformPromiseAny()` method[^11] looks more complicated than it actually is. Part of the reason for that is the wacky way iterators are used, but you are already familiar with that. In fact, all this method does is attach `resultCapability.resolve` to be the fulfillment handler of each promise and attaches a special rejection handler that simply collects all of the rejection reasons in case they are needed.

To keep track of rejection reasons, the operation defines three variables:

1. `errors` - the array to keep track of all rejection reasons
1. `remainingElementsCount` - a record whose only purpose is to track how many promises still need to be fulfilled
1. `index` - the index in the `errors` array where each rejection reason should be placed

These three variables are the primary difference between `performPledgeAny()` and `performPledgeRace()`, and these will also appear in the implementations for `Pledge.all()` and `Pledge.allSettled()`.

With that basic explanation out of the way, here's the code:

```js
function performPledgeAny(iteratorRecord, constructor, resultCapability, pledgeResolve) {

    assertIsConstructor(constructor);
    assertIsCallable(pledgeResolve);

    const errors = [];
    const remainingElementsCount = { value: 1 };
    let index = 0;

    while (true) {
        let next;
        
        try {
            next = iteratorStep(iteratorRecord);
        } catch (error) {
            iteratorRecord.done = true;
            resultCapability.reject(error);
            return resultCapability.pledge;
        }

        if (next === false) {
            remainingElementsCount.value = remainingElementsCount.value - 1;
            if (remainingElementsCount.value === 0) {
                const error = new PledgeAggregateError();
                Object.defineProperty(error, "errors", {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: errors
                });
        
                resultCapability.reject(error);
            }
        
            return resultCapability.pledge;
        }
        
        let nextValue;

        try {
            nextValue = iteratorValue(next);
        } catch(error) {
            iteratorRecord.done = true;
            resultCapability.reject(error);
            return resultCapability.pledge;
        }

        errors.push(undefined);
        const nextPledge = pledgeResolve.call(constructor, nextValue);
        const rejectElement = createPledgeAnyRejectElement(index, errors, resultCapability, remainingElementsCount);
        
        remainingElementsCount.value = remainingElementsCount.value + 1;
        nextPledge.then(resultCapability.resolve, rejectElement);
        index = index + 1;
    }

}
```

The first important part of this function is when `remainingElementsCount.value` is `0`, then a new `PledgeAggregateError` object is created and passed to `resultCapability.reject()`. This is the condition where there are no more promises in the iterator and all of the promises have been rejected. 

The next important part of the code is the `createPledgeAnyRejectElement()` function. This function doesn't have a corresponding operation in the specification, but rather, is defined as a series of steps[^12] to take; I split it out into a function to make the code easier to understand. The "reject element" is the rejection handler that should be attached to each promise, and it's job is to aggregate the rejection reason. Here's the code:

```js
function createPledgeAnyRejectElement(index, errors, pledgeCapability, remainingElementsCount) {

    const alreadyCalled = { value: false };

    return x => {

        if (alreadyCalled.value) {
            return;
        }

        alreadyCalled.value = true;

        errors[index] = x;
        remainingElementsCount.value = remainingElementsCount.value - 1;

        if (remainingElementsCount.value === 0) {
            const error = new PledgeAggregateError();
            Object.defineProperty(error, "errors", {
                configurable: true,
                enumerable: false,
                writable: true,
                value: errors
            });

            return pledgeCapability.reject(error);

        }

    };
}
```

As with other fulfillment and rejection handlers, this function returns a function that first checks to make sure it's not being called twice. The `x` parameter is the reason for the rejection and so is placed into the `errors` array at `index`. Then, `remainingElementsCount.value` is checked to see if it's `0`, and if so, a new `PledgeAggregateError` is created. This is necessary because the promises might be rejected long after the initial called to `Pledge.any()` has completed. So the check in `performPledgeAny()` handles the situation where all of the promises are rejected synchronously while the reject element functions handle the situation where all of the promises are rejected asynchronously.

And for clarify, here is what the `performPledgeAny()` method would look like without the iterator craziness:

```js
function performPledgeAnySimple(iteratorRecord, constructor, resultCapability, pledgeResolve) {

    assertIsConstructor(constructor);
    assertIsCallable(pledgeResolve);

    // You could actually just pass the iterator instead of `iteratatorRecord`
    const iterator = iteratorRecord.iterator;

    const errors = [];
    const remainingElementsCount = { value: 1 };
    let index = 0;

    try {

        // loop over every value in the iterator
        for (const nextValue of iterator) {
            errors.push(undefined);

            const nextPledge = pledgeResolve.call(constructor, nextValue);
            const rejectElement = createPledgeAnyRejectElement(index, errors, resultCapability, remainingElementsCount);

            nextPledge.then(resultCapability.resolve, rejectElement);

            remainingElementsCount.value = remainingElementsCount.value + 1;
            index = index + 1;
        }

        remainingElementsCount.value = remainingElementsCount.value - 1;
        if (remainingElementsCount.value === 0) {
            const error = new PledgeAggregateError();
            Object.defineProperty(error, "errors", {
                configurable: true,
                enumerable: false,
                writable: true,
                value: errors
            });
    
            resultCapability.reject(error);
        }

    } catch (error) {
        resultCapability.reject(error);
    }

    iteratorRecord.done = true;
    return resultCapability.pledge;
}
```

This version is not as straightforward as the `performPledgeRace()` equivalent, but hopefully you can see that the overall approach is still just looping over the promises and attaching appropriate fulfillment and rejection handlers.

## Wrapping Up

This post covered creating `Promise.race()` and `Promise.any()` from scratch. These are just two of the built-in methods that work on multiple promises. The `Promise.race()` method is the simplest of these four methods because you don't have to do any tracking; each promise is assigned the same fulfillment and rejection handlers, and that is all you need to worry about. The `Promise.any()` method is a bit more complex because you need to keep track of all the rejections in case none of the promises are fulfilled. 

All of this code is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.

## Want more posts in this series?

If you are enjoying this series and would like to see it continue, please [sponsor me](https://github.com/sponsors/nzakas) on GitHub. For every five new sponsors I receive, I'll release a new post. Here's what I plan on covering:

* Part 6: `Promise.all()` and `Promise.allSettled()` (when I have 40 sponsors)
* Part 7: Unhandled promise rejection tracking (when I have 45 sponsors)

It takes a significant amount of time to put together posts like these, and I appreciate your consideration in helping me continue to create quality content like this.

## References

[^1]: [GetIterator ( obj [ , hint [ , method ] ] )](https://tc39.es/ecma262/#sec-getiterator)
[^2]: [IteratorNext (IteratorNext ( iteratorRecord [ , value ] ))](https://tc39.es/ecma262/#sec-iteratornext)
[^3]: [IteratorComplete ( iterResult )](https://tc39.es/ecma262/#sec-iteratorcomplete)
[^4]: [IteratorValue ( iterResult )](https://tc39.es/ecma262/#sec-iteratorvalue)
[^5]: [IteratorStep ( iteratorRecord )](https://tc39.es/ecma262/#sec-iteratorstep)
[^6]: [Promise.race ( iterable )](https://tc39.es/ecma262/#sec-promise.race)
[^7]: [GetPromiseResolve ( promiseConstructor )](https://tc39.es/ecma262/#sec-getpromiseresolve)
[^8]: [PerformPromiseRace ( iteratorRecord, constructor, resultCapability, promiseResolve )](https://tc39.es/ecma262/#sec-performpromiserace)
[^9]: [AggregateError Objects](https://tc39.es/ecma262/#sec-aggregate-error-objects)
[^10]: [Promise.any ( iterable )](https://tc39.es/ecma262/#sec-promise.any)
[^11]: [PerformPromiseAny ( iteratorRecord, constructor, resultCapability, promiseResolve )](https://tc39.es/ecma262/#sec-performpromiseany)
[^12]: [Promise.any Reject Element Functions](https://tc39.es/ecma262/#sec-promise.any-reject-element-functions)
