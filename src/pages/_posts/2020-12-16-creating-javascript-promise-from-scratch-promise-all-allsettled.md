---
title: "Creating a JavaScript promise from scratch, Part 6: Promise.all() and Promise.allSettled()"
teaser: "Promise.all() and Promise.allSettled() work on any number of promises to allow you to know when all of the promises have resolved"
date: 2020-12-16
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

In my [last post](https://humanwhocodes.com/blog/2020/11/creating-javascript-promise-from-scratch-promise-race-any/), I walked you through the creation of the `Promice.race()` and `Promise.any()` methods, both of which work on multiple promises and return a single promise that indicates the result of the operation. This post continues on to discuss `Promise.all()` and `Promise.allSettled()`, two operations that are similar to one another as well as `Promise.any()`. Each of these methods use the same basic algorithm so if you're able to understand one of them then you can understand them all.

This is the sixth post in my series about creating JavaScript promises from scratch. If you haven't already read the previous posts, I'd suggest you do before continuing on:

* [Part 1: Constructor](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/)
* [Part 2: Resolving to a promise](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-resolving-to-a-promise/)
* [Part 3: then(), catch(), and finally()](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-then-catch-finally/)
* [Part 4: Promise.resolve() and Promise.reject()](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-promise-resolve-reject/)
* [Part 5: Promise.race() and Promise.any()](https://humanwhocodes.com/blog/2020/11/creating-javascript-promise-from-scratch-promise-race-any/)

As a reminder, this series is based on my promise library, [Pledge](https://github.com/humanwhocodes/pledge). You can view and download all of the source code from GitHub.

## The `Promise.all()` method

The `Promise.all()` method is the essentially the inverse of the `Promise.any()` method (discussed in part 5): it returns a rejected promise if any of the promises is rejected and returns a promise that is fulfilled to an array of promise results if all promises are fulfilled. Here are a couple examples:

```js
const promise1 = Promise.all([
    Promise.resolve(42),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise1.catch(reason => {
    console.log(reason);     // 43
});

const promise2 = Promise.all([
    Promise.resolve(42),
    Promise.resolve(43),
    Promise.resolve(44)
]);

promise2.then(value => {
    console.log(value[0]);    // 42
    console.log(value[1]);    // 43
    console.log(value[2]);    // 44
});
```

Because `Promise.all()` is so closely related to `Promise.any()`, you can actually implement it using essentially the same algorithm.

### Creating the `Pledge.all()` method

The specification[^1] for `Promise.all()` describes the same basic algorithm that you've already seen for `Promise.race()` and `Promise.any()`. 

```js
class Pledge {

    // other methods omitted for space

    static all(iterable) {

        const C = this;
        const pledgeCapability = new PledgeCapability(C);
        let iteratorRecord;

        try {
            const pledgeResolve = getPledgeResolve(C);
            iteratorRecord = getIterator(iterable);
            const result = performPledgeAll(iteratorRecord, C, pledgeCapability, pledgeResolve);
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

I've explained this algorithm in detail in part 5, so I'm going to skip right to discussing the `PerformPromiseAll()` [^2] operation and how I've implemented it as `performPledgeAll()`.

As I've already mentioned, this algorithm is so close to `PerformPromiseAny()`[^3] that it's almost copy-and-paste. The first difference is that instead of tracking rejected values, you instead track fulfilled values (so the array is named `values` instead of `errors`). Then, instead of attaching a common fulfillment handler and a custom rejection handler, you attach a custom fulfillment handler and a common rejection handler. The last difference is that instead of tracking remaining elements so you can reject an array of errors, you track remaining elements to so you can fulfill an array of values. All of that is wrapped in the wacky iteration algorithm just as in `Promise.any()`. Here's the code:

```js
function performPledgeAll(iteratorRecord, constructor, resultCapability, pledgeResolve) {

    assertIsConstructor(constructor);
    assertIsCallable(pledgeResolve);

    // in performPledgeAny, this is the errors array
    const values = [];
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
                // in performPledgeAny, this is where you reject errors
                resultCapability.resolve(values);
            }

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

        values.push(undefined);
        const nextPledge = pledgeResolve.call(constructor, nextValue);

        // in performPledgeAny, you'd create a reject element
        const resolveElement = createPledgeAllResolveElement(index, values, resultCapability, remainingElementsCount);

        remainingElementsCount.value = remainingElementsCount.value + 1;
        // in performPledgeAny, you'd attach resultCapability.resolve
        // and a custom reject element
        nextPledge.then(resolveElement, resultCapability.reject);
        index = index + 1;
    }
}
```

I've commented in the code the differences from `performPledgeAny()` so hopefully you can see that there really isn't a big difference. You'll also find that the  `createPledgeAllResolveElement()` function (which implements the `Promise.all` Resolve Element Functions algorithm[^4]) is very similar to the `createPledgeAnyRejectElement()` function:

```js
function createPledgeAllResolveElement(index, values, pledgeCapability, remainingElementsCount) {

    const alreadyCalled = { value: false };

    return x => {

        if (alreadyCalled.value) {
            return;
        }

        alreadyCalled.value = true;

        values[index] = x;
        remainingElementsCount.value = remainingElementsCount.value - 1;

        if (remainingElementsCount.value === 0) {
            return pledgeCapability.resolve(values);
        }

    };
}
```

The `createPledgeAllResolveElement()` function returns a function that is used as the fulfillment handler for the promise returned from `Pledge.all()`. The `x` variable is the fulfilled value and is stored in the `values` array when available. When there are no further elements remaining, a resolved pledge is returned with the entire `values` array.

Hopefully you can now see the relationship between `Promise.any()` and `Promise.all()`. The `Promise.any()` method returns a rejected promise with an array of values (wrapped in an `AggregateError`) when all of the promises are rejected and a fulfilled promise with the value from the first fulfilled promise; the `Promise.all()` method returns a fulfilled promises with an array of fulfillment values when all of the promises are fulfilled and returns a rejected promise with the reason from the first rejected promise (if one exists). So for `Promise.any()`, you create a new promise and assign the same fulfillment handler to each promise that was passed in; for `Promise.all()`, you create a new promise and assign the same rejection handler to each promise that was passed in. Then, in `Promise.any()` you create a new rejection handler for each promise to track the rejection; for `Promise.all()` you create a new fulfillment handler for each promise to track fulfillments.

If it seems like `Promise.any()` and `Promise.all()` are just two sides of the same coin, then you are correct. The next step is to combine both of these methods into one, and that's what `Promise.allSettled()` does.

## The `Promise.allSettled()` method

The `Promise.allSettled()` method is the last of the four promise methods that work on multiple promises. This method is unique because the promise returned is never rejected unless an error is thrown during the iteration step. Instead, `Promise.allSettled()` returns a promise that is fulfilled with an array of result objects. Each result object has two properties:

* `status` - either `"fulfilled"` or `"rejected"`
* `value` - the value that was fulfilled or rejected

The result objects allow you to collect information about every promise's result in order to determine the next step to take. As such, `Promise.allSettled()` will take longer to complete than any of the other multi-promise methods because it has no short-circuiting behavior. Whereas `Promise.race()` returns as soon as the first promise is settled, `Promise.any()` returns as soon as the first promise is resolved, and `Promise.all()` returns as soon as the first promise is rejected, `Promise.allSettled()` must wait until all promises have settled. Here are some examples showing how `Promise.allSettled()` is used:

```js
const promise1 = Promise.allSettled([
    Promise.resolve(42),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise1.then(values => {
    console.log(values[0]);     // { status: "fulfilled", value: 42 }
    console.log(values[1]);     // { status: "rejected", value: 43 }
    console.log(values[2]);     // { status: "fulfilled", value: 44 }
});

const promise2 = Promise.allSettled([
    new Promise(resolve => {
        setTimeout(() => {
            resolve(42);
        }, 500);
    }),
    Promise.reject(43),
    Promise.resolve(44)
]);

promise2.then(values => {
    console.log(values[0]);     // { status: "fulfilled", value: 42 }
    console.log(values[1]);     // { status: "rejected", value: 43 }
    console.log(values[2]);     // { status: "fulfilled", value: 44 }
});

const promise3 = Promise.allSettled([
    Promise.reject(42),
    Promise.reject(43),
    Promise.reject(44)
]);

promise3.then(values => {
    console.log(values[0]);     // { status: "rejected", value: 42 }
    console.log(values[1]);     // { status: "rejected", value: 43 }
    console.log(values[2]);     // { status: "rejected", value: 44 }
});
```

Notice that a fulfilled promise is returned even when all of the promises passed to `Promise.allSettled()` are rejected. 

### Creating the `Pledge.allSettled()` method

Once again, the `Promise.allSettled()` method follows the same basic algorithm[^5] as the other three multi-promise methods, so the `Pledge.allSettled()` implementation is the same the others except for naming:

```js
class Pledge {

    // other methods omitted for space

    static allSettled(iterable) {

        const C = this;
        const pledgeCapability = new PledgeCapability(C);
        let iteratorRecord;

        try {
            const pledgeResolve = getPledgeResolve(C);
            iteratorRecord = getIterator(iterable);
            const result = performPledgeAllSettled(iteratorRecord, C, pledgeCapability, pledgeResolve);
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

The algorithm for the `PerformPromiseAllSettled()` operation[^6] should look very familiar at this point. In fact, it is almost exactly the same as the `PerformPromiseAll()` operation. Just like `PerformPromiseAll()`, `PerformPromiseAllSettled()` uses a `remainingElementsCount` object to track how many promises must still be settled, and `index` variable to track where each result should go in the `values` array, and a `values` array to keep track of promise results. Unlike `PerformPromiseAll()`, the values stored in the `values` array in `PerformPromiseAllSettled()` are the result objects I mentioned in the previous section.

The other significant difference between `PerformPromiseAll()` and `PerformPromiseAllSettled()` is that the latter creates a custom rejection handler for each promise in addition to a custom fulfillment handler. Those handlers are also created using the same basic algorithm you've already seen in other multi-promise methods.

Without any further delay, here's the implementation of `performPledgeAllSettled()`:

```js
function performPledgeAllSettled(iteratorRecord, constructor, resultCapability, pledgeResolve) {

    assertIsConstructor(constructor);
    assertIsCallable(pledgeResolve);

    const values = [];
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
                resultCapability.resolve(values);
            }

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

        values.push(undefined);
        const nextPledge = pledgeResolve.call(constructor, nextValue);
        const resolveElement = createPledgeAllSettledResolveElement(index, values, resultCapability, remainingElementsCount);

        // the only significant difference from performPledgeAll is adding this
        // custom rejection handler to each promise instead of resultCapability.reject
        const rejectElement = createPledgeAllSettledRejectElement(index, values, resultCapability, remainingElementsCount);

        remainingElementsCount.value = remainingElementsCount.value + 1;
        nextPledge.then(resolveElement, rejectElement);
        index = index + 1;
    }

}
```

As you can see, the only significant change from `performPledgeAll()` is the addition of the `rejectElement` that is used instead of `resultCapability.reject`. Otherwise, the functionality is exactly the same. The heavy lifting is really done by the `createPledgeAllSettledResolveElement()` and `createPledgeAllSettledRejectElement()` functions. These functions represent the corresponding steps in the specification for Promise.allSettled Resolve Element Functions[^7] and Promise.allSettled Reject Element Functions[^8] and are essentially the same function with the notable exception that one specifies the result as "fulfilled" and the other specifies the result as "rejected". Here are the implementations:

```js
function createPledgeAllSettledResolveElement(index, values, pledgeCapability, remainingElementsCount) {

    const alreadyCalled = { value: false };

    return x => {

        if (alreadyCalled.value) {
            return;
        }

        alreadyCalled.value = true;

        values[index] = {
            status: "fulfilled",
            value: x
        };

        remainingElementsCount.value = remainingElementsCount.value - 1;

        if (remainingElementsCount.value === 0) {
            return pledgeCapability.resolve(values);
        }

    };
}

function createPledgeAllSettledRejectElement(index, values, pledgeCapability, remainingElementsCount) {

    const alreadyCalled = { value: false };

    return x => {

        if (alreadyCalled.value) {
            return;
        }

        alreadyCalled.value = true;

        values[index] = {
            status: "rejected",
            value: x
        };
        
        remainingElementsCount.value = remainingElementsCount.value - 1;

        if (remainingElementsCount.value === 0) {
            return pledgeCapability.resolve(values);
        }

    };
}
```

You've already seen several of these functions at this point, so I'll just point out how these are different. First, even the reject element calls `pledgeCapability.resolve()` because the returned promise should never be rejected due to a passed-in promise being rejected. Next, the value inserted into the `values` array is an object instead of just `x` (as you saw in `Promise.any()` and `Promise.all()`). Both the resolve and reject elements are just inserting a result object into the `values` and array, and when there are no further promises to wait for, returns a resolved promise.

## Wrapping Up

This post covered creating `Promise.all()` and `Promise.allSettled()` from scratch. These are the last two of the built-in methods that work on multiple promises (the previous two were covered in part 5). The `Promise.all()` method is essentially the inverse of the `Promise.any()` method: it returns a rejected promise if any of the promises is rejected and returns a promise that is fulfilled to an array of promise results if all promises are fulfilled. The `Promise.allSettled()` method combines aspects of `Promise.all()` and `Promise.any()` so that it almost always returns a fulfilled promise with an array of result objects containing the results of both fulfilled and rejected promises. 

In the next, and final, part of this series, I'll be covering unhandled promise rejections.

All of this code is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.


[^1]: [Promise.all ( iterable )](https://tc39.es/ecma262/#sec-promise.all)
[^2]: [PerformPromiseAll ( iteratorRecord, constructor, resultCapability, promiseResolve )](https://tc39.es/ecma262/#sec-performpromiseall)
[^3]: [PerformPromiseAny ( iteratorRecord, constructor, resultCapability, promiseResolve )](https://tc39.es/ecma262/#sec-performpromiseany)
[^4]: [Promise.all Resolve Element Functions](https://tc39.es/ecma262/#sec-promise.all-resolve-element-functions)
[^5]: [Promise.allSettled ( iterable )](https://tc39.es/ecma262/#sec-performpromiseallsettled)
[^6]: [PerformPromiseAllSettled ( iteratorRecord, constructor, resultCapability, promiseResolve )](https://tc39.es/ecma262/#sec-performpromiseallsettled)
[^7]: [Promise.allSetled Resolve Element Functions](https://tc39.es/ecma262/#sec-promise.allsettled-resolve-element-functions)
[^8]: [Promise.allSetled Reject Element Functions](https://tc39.es/ecma262/#sec-promise.allsettled-reject-element-functions)
