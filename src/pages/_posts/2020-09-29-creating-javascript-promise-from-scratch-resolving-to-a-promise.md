---
title: "Creating a JavaScript promise from scratch, Part 2: Resolving to a promise"
teaser: "Resolving promises to non-thenables is easy; resolving promises to other promises requires a bit of work."
date: 2020-09-29
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

In my [first post](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/) of this series, I explained how the `Promise` constructor works by recreating it as the `Pledge` constructor. I noted in that post that there is nothing asynchronous about the constructor, and that all of the asynchronous operations happen later. In this post, I'll cover how to resolve one promise to another promise, which will trigger asynchronous operations.

As a reminder, this series is based on my promise library, [Pledge](https://github.com/humanwhocodes/pledge). You can view and download all of the source code from GitHub.

## Jobs and microtasks

Before getting into the implementation, it's helpful to talk about the mechanics of asynchronous operations in promises. Asynchronous promise operations are defined in ECMA-262 as *jobs*[^1]:

> A *Job* is an abstract closure with no parameters that initiates an ECMAScript computation when no other ECMAScript computation is currently in progress.

Put in simpler language, the specification says that a job is a function that executes when no other function is executing. But it's the specifics of this process that are interesting. Here's what the specification says[^1]:

> * At some future point in time, when there is no running execution context and the execution context stack is empty, the implementation must:
>   1. Push an execution context onto the execution context stack.
>   1. Perform any implementation-defined preparation steps.
>   1. Call the abstract closure.
>   1. Perform any implementation-defined cleanup steps.
>   1. Pop the previously-pushed execution context from the execution context stack.> > * Only one Job may be actively undergoing evaluation at any point in time.
> * Once evaluation of a Job starts, it must run to completion before evaluation of any other Job starts.
> * The abstract closure must return a normal completion, implementing its own handling of errors.

It's easiest to think through this process by using an example. Suppose you have set up an `onclick` event handler on a button in a web page. When you click the button, a new execution context is pushed onto the execution context stack in order to run the event handler. Once the event handler has finished executing, the execution context is popped off the stack and the stack is now empty. This is the time when jobs are executed, before yielding back to the event loop that is waiting for more JavaScript to run.

In JavaScript engines, the button's event handler is considered a *task* while a job is a considered a *microtask*. Any microtasks that are queued during a task are executed in the order in which they were queued immediately after the task completes. Fortunately for you and I, browsers, Node.js, and Deno have the `queueMicrotask()` function that implements the queueing of microtasks.

The `queueMicrotask()` function is defined in the HTML specification[^2] and accepts a single argument, which is the function to call as a microtask. For example:

```js
queueMicrotask(() => {
    console.log("Hi");
});
```

This example will output `"Hi"` to the console once the current task has completed. Keep in mind that microtasks will always execute before *timers*, which are created using either `setTimeout()` or `setInterval()`. Timers are implemented using tasks, not microtasks, and so will yield back to the event loop before they execute their tasks.

To make the code in Pledge look for like the specification, I've defined a `hostEnqueuePledgeJob()` function that simple calls `queueMicrotask()`:

```js
export function hostEnqueuePledgeJob(job) {
    queueMicrotask(job);
}
```

## The `NewPromiseResolveThenJob` job

In my previous post, I stopped short of showing how to resolve a promise when another promise was passed to `resolve`. As opposed to non-thenable values, calling `resolve` with another promise means the first promise cannot be resolved until the second promise has been resolved, and to do that, you need `NewPromiseResolveThenableJob()`.

The `NewPromiseResolveThenableJob()` accepts three arguments: the promise to resolve, the thenable that was passed to `resolve`, and the `then()` function to call. The job then attaches the `resolve` and `reject` functions for promise to resolve to the thenable's `then()` method while catching any potential errors that might occur.

To implement `NewPromiseResolveThenableJob()`, I decided to use a class with a constructor that returns a function. This looks a little strange but will allow the code to look like you are creating a new job using the `new` operator instead of creating a function whose name begins with `new` (which I find strange). Here's my implementation:

```js
export class PledgeResolveThenableJob {
    constructor(pledgeToResolve, thenable, then) {
        return () => {
            const { resolve, reject } = createResolvingFunctions(pledgeToResolve);
            
            try {
                // same as thenable.then(resolve, reject)
                then.apply(thenable, [resolve, reject]);
            } catch (thenError) {
                // same as reject(thenError)
                reject.apply(undefined, [thenError]);
            }
        };
    }
}
```

You'll note the use of `createResolvingFunctions()`, which was also used in the `Pledge` constructor. The call here creates a new set of `resolve` and `reject` functions that are separate from the original ones used inside of the constructor. Then, an attempt is made to attach those functions as fulfillment and rejection handlers on the thenable. The code looks a bit weird because I tried to make it look as close to the spec as possible, but really all it's doing is `thenable.then(resolve, reject)`. That code is wrapped in a `try-catch` just in case there's an error that needs to be caught and passed to the `reject` function. Once again, the code looks a bit more complicated as I tried to capture the spirit of the specification, but ultimately all it's doing is `reject(thenError)`.

Now you can go back and complete the definition of the `resolve` function inside of `createResolvingFunctions()` to trigger a `PledgeResolveThenableJob` as the last step:

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
        const job = new PledgeResolveThenableJob(pledge, resolution, thenAction);
        hostEnqueuePledgeJob(job);
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

If `resolution` is a thenable, then the `PledgeResolveThenableJob` is created and queued. That's important, because anything a thenable is passed to `resolve`, it means that the promise isn't resolved synchronously and you must wait for at least one microtask to complete.

## Wrapping Up

The most important concept to grasp in this post is how jobs work and how they relate to microtasks in JavaScript runtimes. Jobs are a central part of promise functionality and in this post you learned how to use a job to resolve a promise to another promise. With that background, you're ready to move into implementing `then()`, `catch()`, and `finally()`, all of which rely on the same type of job to trigger their handlers. That's coming up in the [next post](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-then-catch-finally/) in this series.

Remember: All of this code is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.

## References

[^1]: [Jobs and Host Operations to Enqueue Jobs](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-jobs)
[^2]: [Microtask queueing](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing)
