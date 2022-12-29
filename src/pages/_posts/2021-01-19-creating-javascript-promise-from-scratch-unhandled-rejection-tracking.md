---
title: "Creating a JavaScript promise from scratch, Part 7: Unhandled rejection tracking"
teaser: "Rejected promises without rejection handlers can hide important errors, which is why both Node.js and browsers have a way of tracking them."
date: 2021-01-19
categories:
- Programming
tags:
- JavaScript
- Promises
- ECMAScript 6
---

When promises were introduced in ECMAScript 2015, they had an interesting flaw: if a promise didn't have a rejection handler and was later rejected, you would have no idea. The rejection silently occurred behind the scenes and, therefore, could easily be missed. The best practice of always attaching rejection handlers to promises emerged due to this limitation. Eventually, a way to detect unhandled promise rejections was added to ECMA-262 and both Node.js and web browsers implemented console warnings when an unhandled rejection occurred. In this post, I'll walk through how unhandled rejection tracking works and how to implement it in JavaScript.

This is the seventh and final post in my series about creating JavaScript promises from scratch. If you haven't already read the previous posts, I'd suggest you do before continuing on:

* [Part 1: Constructor](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/)
* [Part 2: Resolving to a promise](https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-resolving-to-a-promise/)
* [Part 3: then(), catch(), and finally()](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-then-catch-finally/)
* [Part 4: Promise.resolve() and Promise.reject()](https://humanwhocodes.com/blog/2020/10/creating-javascript-promise-from-scratch-promise-resolve-reject/)
* [Part 5: Promise.race() and Promise.any()](https://humanwhocodes.com/blog/2020/11/creating-javascript-promise-from-scratch-promise-race-any/)
* [Part 6: Promise.all() and Promise.allSettled()](https://humanwhocodes.com/blog/2020/12/creating-javascript-promise-from-scratch-promise-all-allsettled/)

As a reminder, this series is based on my promise library, [Pledge](https://github.com/humanwhocodes/pledge). You can view and download all of the source code from GitHub.

## Unhandled rejection tracking in browsers

While both Node.js and web browsers have ways of dealing with unhandled rejections, I'm going to focus on the web browser implementation because it is defined in the HTML specification[^1]. Having a specification to work from makes it easier to understand what's going on as opposed to the Node.js implementation which is custom (though still similar to web browsers). To start, suppose you have a promise defined like this:

```js
const promise = new Promise((resolve, reject) => {
    reject(43);
});
```

This promise doesn't have a rejection handler defined and so when it's rejected it ends up being tracked by the browser. Periodically, the browser checks its list of unhandled rejections and fires a `unhandledrejection` event on `globalThis`. The event handler receives an `event` object with a `promise` property containing the rejected promise and a `reason` property containing the rejection reason (`43` in the case of this example). For example:

```js
// called when an unhandled rejection occurs
globalThis.onunhandledrejection = event => {
    console.log(event.promise);     // get the promise
    console.log(event.reason);      // get the rejection reason
};
```

In addition to triggering the `unhandledrejection` event, the browser will output a warning to the console indicating that an unhandled rejection occurred. You can therefore choose to track unhandled rejections programmatically or keep your console open to see them as you're developing.

### Late-handled promise rejection

You may be wondering, what happens if a rejection handler is added at some later point in time? After all, you can add a rejection handler anytime between creation of the promise and the time when the promise is destroyed through garbage collection. You can, for instance, do this:

```js
const promise = new Promise((resolve, reject) => {
    reject(43);
});

setTimeout(() => {
    promise.catch(reason => {
        console.error(reason);
    });
}, 1000);
```

Here, a promise is created without a rejection handler initially and then adds one later. What happens in this case depends largely on the amount of time that has passed:

* If the rejection handler is added before the browser decides to trigger `unhandledrejection`, then the event will not be triggered.
* If the rejection handler is added after the browser has triggered `unhandledrejection`, then a `rejectionhandled` event is triggered to let you know that the rejection is no longer unhandled.

It's a little bit confusing, but basically, any promise that triggers an `unhandledrejection` event could potentially trigger a `rejectionhandled` event later. Therefore, you really need to listen for both events and track which promises remain, like this:

```js
const rejections = new Map();

// called when an unhandled rejection occurs
globalThis.onunhandledrejection = ({ promise, reason }) => {
    rejections.set(promise, reason);
};

// called when an unhandled rejection occurs
globalThis.onrejectionhandled = ({ promise }) => {
    rejections.delete(promise);
};
```

This code tracks unhandled rejections using a map. When an `unhandledrejection` event occurs, the promise and rejection reason are saved to the map; when a `rejectionhandled` event occurs, the promise is deleted from the map. By periodically checking the contents of `rejections`, you can then track which rejections occurred without handlers.

Another quirk in the relationship between the `unhandledrejection` and `rejectionhandled` events is that you can prevent the `rejectionhandled` event from firing by adding a rejection handler inside of the `onunhandledrejection` event handler, like this:

```js
// called when an unhandled rejection occurs
globalThis.onunhandledrejection = ({ promise, reason }) => {
    promise.catch(() => {});        // make the rejection handled
};

// this will never be called
globalThis.onrejectionhandled = ({ promise }) => {
    console.log(promise);
};
```

In this case, the `rejectionhandled` event isn't triggered because a rejection handler is added before it's time for that event. The browser assumes that you know the promise is now handled and so there is no reason to trigger the `rejectionhandled` event.

### Eliminating the console warning

As mentioned previously, the browser will output a warning to the console whenever an unhandled promise rejection occurs. This console warning occurs after the `unhandledrejection` event is fired, which gives you the opportunity to prevent the warning altogether. You can cancel the console warning by calling the `preventDefault()` method on the `event` object, like this:

```js
globalThis.onunhandledrejection = event => {
    event.preventDefault();
};
```

This event handler ensures that the console warning for the unhandled rejection will not happen. Suppressing the console warning is helpful in production where you don't want to litter the console with additional information once you already know a promise was missing a rejection handler.

With that overview out of the way, it's now time to discuss how to implement the same browser unhandled rejection tracking from scratch.

## Implementing unhandled rejection tracking

The design for rejection tracking in the Pledge library closely follows the web browser approach. Because I didn't want to mess with the `globalThis` object, I decided to add two static methods to the `Pledge` class to act as event handlers:

```js
class Pledge {

    // other methods omitted for space

    static onUnhandledRejection(event) {
        // noop
    }
    
    static onRejectionHandled(event) {
        // noop
    }

    // other methods omitted for space
}
```

The `event` object is an instance of `PledgeRejectionEvent`, which is defined like this:

```js
class PledgeRejectionEvent {
    constructor(pledge, reason) {
        this.pledge = pledge;
        this.reason = reason;
        this.returnValue = true;
    }

    preventDefault() {
        this.returnValue = false;
    }
}
```

I've included the `preventDefault()` method as well as the `returnValue` legacy property so either way of canceling the event will work.

Last, I created a `RejectionTracker` class to encapsulate most of the functionality. While this class isn't described in any specification, I found it easier to wrap all of the functionality in this class. I then attached an instance of `RejectionTracker` to `Pledge` via a symbol property:

```js
Pledge[PledgeSymbol.rejectionTracker] = new RejectionTracker();
```

In this way, I can always reach the rejection tracker from any instance of `Pledge` through `this.constructor[PledgeSymbol.rejectionTracker]`. It will become more apparent why this is important later in this post.

### What does it mean for a promise to be handled?

ECMA-262 considers a promise to be handled if the promise's `then()` method has been called (which includes `catch()` and `finally()`, both of which call `then()` behind the scenes). It actually doesn't matter if you've attached a fulfillment handler, a rejection handler, or neither, so long as `then()` was called. Each call to `then()` creates a new promise which then becomes responsible for dealing with any fulfillment or rejection. Consider this example:

```js
const promise1 = new Promise((resolve, reject) => {
    reject(43);
});

const promise2 = promise1.then(value => {
    console.log(value);
});
```

Here, `promise1` is considered handled because `then()` is called and a fulfillment handler is attached. When `promise1` is rejected, that rejection is passed on to `promise2`, which is not handled. A browser would report the unhandled rejection from `promise2` and disregard `promise1`. So, the browser isn't really tracking all unhandled rejections, but rather, it's tracking whether the last promise in a chain has any handlers attached.

### How do you know if a promise is handled?

ECMA-262 describes two key features that enable rejection tracking:

1. The `[[PromiseIsHandled]]` internal property[^2] of every promise. This is a Boolean value indicating if the promise is handled. It starts out as `false` and is changed to `true` after `then()` is called.
1. The `HostPromiseRejectionTracker()` operation[^3] is an abstract representation of a promise rejection tracker. ECMA-262 itself does not specify an algorithm for this operation; instead, it defers that to host environments to decide (host environments meaning browsers, Node.js, Deno, etc.).

The majority of the functionality related to these two features is contained the `PerformPromiseThen()` operation[^4] (discussed in part 3), which I've implemented as `performPledgeThen()`:

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

                // if the pledge isn't handled, track it with the tracker
                if (pledge[PledgeSymbol.isHandled] === false) {
                    hostPledgeRejectionTracker(pledge, "handle");
                }

                const rejectJob = new PledgeReactionJob(rejectReaction, reason);
                hostEnqueuePledgeJob(rejectJob);
            }
            break;

        default:
            throw new TypeError(`Invalid pledge state: ${pledge[PledgeSymbol.state]}.`);
    }

    // mark the pledge as handled
    pledge[PledgeSymbol.isHandled] = true;

    return resultCapability ? resultCapability.pledge : undefined;
}
```

Regardless of what happens during the course of called `performPledgeThen()`, the pledge is always marked as handled before the end of the function. If the pledge is rejected, then `hostPledgeRejectionTracker()` is called with the pledge and a second argument of `"handle"`. That second argument indicates that the rejection was handled and shouldn't be tracked as an unhandled rejection.

The `HostPromiseRejectionTracker()` is also called by the `RejectPromise()` operation[^5] (also discussed in part 3), which I've implemented as `rejectPledge()`:

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

    // global rejection tracking
    if (pledge[PledgeSymbol.isHandled] === false) {
        hostPledgeRejectionTracker(pledge, "reject");
    }

    return triggerPledgeReactions(reactions, reason);
}
```

Here, the `rejectPledge()` function called `hostPledgeRejectionTracker()` with a second argument of `"reject"`, indicating that the pledge was rejected and not handled. Remember, `rejectPledge()` is the function that is called by the `reject` argument that is passed in to executor function when creating a new promise, so at that point in time, the promise hasn't had any handlers assigned. So, `rejectPledge()` is marking the pledge as unhandled, and if `then()` is later called to assign a handler, then it will bemarked as handled.

I've implemented `hostPledgeRejectionTracker()` as follows:

```js
export function hostPledgeRejectionTracker(pledge, operation) {
    const rejectionTracker = pledge.constructor[PledgeSymbol.rejectionTracker];
    rejectionTracker.track(pledge, operation);
}
```

This is where attaching the rejection handler to the `Pledge` constructor is helpful. I'm able to get to the `RejectionTracker` instance and call the `track()` method to keep this function simple. 

### The `RejectionTracker` class

The `RejectionTracker` class is designed to encapsulate all of the rejection tracking functionality described in the HTML specification:

> An environment settings object also has an outstanding rejected promises weak set and an about-to-be-notified rejected promises list, used to track unhandled promise rejections. The outstanding rejected promises weak set must not create strong references to any of its members, and implementations are free to limit its size, e.g. by removing old entries from it when new ones are added.

This description is a little bit confusing, so let me explain it. There are two different collections used to track rejections:

* The *"about-to-be-notified" rejected promises list* is a list of promises that have been rejected and will trigger the `unhandledrejection` event.
* The *outstanding rejected promises weak set* is a collection of promises that had unhandled rejections and triggered the `unhandledrejection` event. These promises are tracked just in case they have a rejection handler added later, in which case the `rejectionhandled` event is triggered.

So these are the two collections the `RejectionTracker` needs to manage. Additionally, it manages a logger (typically `console` but can be overwritten for testing) and a timeout ID (which I'll explain later in this post). Here's what the class and constructor look like:

```js
export class RejectionTracker {

    constructor(logger = console) {
        this.aboutToBeNotified = new Set();
        this.outstandingRejections = new WeakSet();
        this.logger = logger;
        this.timeoutId = 0;
    }

    track(pledge, operation) {
        // TODO
    }
}
```

I chose to use a set for the "about-to-be-notified" promises list because it will prevent duplicates while allowing me to iterate through all of the promises contained within it. The outstanding rejections collection is implemented as a weak set, per the specification, which means there's no way to iterate over the contents. That's not a problem for how this collection is used in algorithm, however.

#### Implementing `HostPromiseRejectionTracker()`

The primary method is `track()`, and that implements the functionality described in the HTML specification for `HostPromiseRejectionTracker()`[^6], which is as follows:

1. Let *script* be the running script.
1. If *script*'s muted errors is true, terminate these steps.
1. Let *settings object* be *script*'s settings object.
1. If *operation* is `"reject"`,
    1. Add *promise* to *settings object*'s about-to-be-notified rejected promises list.
1. If *operation* is `"handle"`,
    1. If *settings object*'s about-to-be-notified rejected promises list contains *promise*, then remove *promise* from that list and return.
    1. If *settings object*'s outstanding rejected promises weak set does not contain *promise*, then return.
    1. Remove *promise* from settings object's outstanding rejected promises weak set.
    1. Let *global* be *settings object*'s global object.
    1. Queue a global task on the DOM manipulation task source given *global* to fire an event named `rejectionhandled` at *global*, using `PromiseRejectionEvent`, with the `promise` attribute initialized to *promise*, and the `reason` attribute initialized to the value of *promise*'s `[[PromiseResult]]` internal slot.

The first three steps can be ignored for our purposes because they are just setting up variables. The fourth steps occurs when `operation` is `"reject"`, at which point the promise that was rejected is added to the about-to-be-notified rejected promises list. That's all that needs to happen at this point because a recurring check will later read that list to determine if any events need to be fired. The more interesting part is what happens when `operation` is `"handle"`, meaning that a previously rejected promise now has a rejection handler added. Here are the steps using clearer language:

1. If `promise` is in the about-to-be-notified rejected promises list, that means the promise was rejected without a rejection handler but the `unhandledrejection` event has not yet been fired for that promise. Because of that, you can just remove `promise` from the list to ensure the event is never fired, and therefore, you'll never need to fire a `rejectionhandled` event. Your work here is done.
1. If the outstanding rejected promises weak set doesn't contain `promise`, then there's also nothing else to do here. The `unhandledrejection` event was never fired for `promise` so the `rejectionhandled` event should also never fire. There's no more tracking necessary.
1. If `promise` is in the outstanding rejected promises weak set, that means it has previously triggered the `unhandledrejection` event and you are now being notified that it is handled. That means you need to trigger the `rejectionhandled` event. For simplicity, you can read "queue a global task" as "run this code with `setTimeout()`."

After all of that explanation, here's what it looks like in code:

```js
export class RejectionTracker {

    constructor(logger = console) {
        this.aboutToBeNotified = new Set();
        this.outstandingRejections = new WeakSet();
        this.logger = logger;
        this.timeoutId = 0;
    }

    track(pledge, operation) {
        
        if (operation === "reject") {
            this.aboutToBeNotified.add(pledge);
        }

        if (operation === "handle") {

            if (this.aboutToBeNotified.has(pledge)) {
                this.aboutToBeNotified.delete(pledge);
                return;
            }

            if (!this.outstandingRejections.has(pledge)) {
                return;
            }
            
            this.outstandingRejections.delete(pledge);

            setTimeout(() => {
                const event = new PledgeRejectionEvent(pledge, pledge[PledgeSymbol.result]);
                pledge.constructor.onRejectionHandled(event);
            }, 0);            
        }

        // not part of spec, need to toggle monitoring
        if (this.aboutToBeNotified.size > 0) {
            this.startMonitor();
        } else {
            this.stopMonitor();
        }
    }

    // other methods omitted for space
}
```

The code closely mirrors the specification algorithm, ultimately resulting in the `onRejectionHandled` method being called on the `Pledge` constructor with an instance of `PledgeReactionEvent`. This event can't be cancelled, so there's no reason to check the `returnValue` property.

I did need to add a little bit of extra code at the end to toggle the monitoring of rejected promises. You only need to monitor the about-to-be-notified rejected promises list to know when to trigger the `unhandledrejection` event. (The outstanding promise rejections weak set doesn't need to be monitored.) To account for that, and to save resources, I turn on the monitor when there is at least one item in the about-to-be-notified rejected promises list and turn it off otherwise.

The actual monitoring process is described in the HTML specification, as well, and is implemented as the `startMonitor()` method.

#### Monitoring for promise rejections

The HTML specification[^1] says that the following steps should be taken to notify users of unhandled promise rejections:

1. Let *list* be a copy of *settings object*'s about-to-be-notified rejected promises *list*.
1. If *list* is empty, return.
1. Clear *settings object*'s about-to-be-notified rejected promises list.
1. Let *global* be *settings object*'s global object.
1. Queue a global task on the DOM manipulation task source given *global* to run the following substep:
    1. For each promise *p* in *list*:
        1. If *p*'s `[[PromiseIsHandled]]` internal slot is true, continue to the next iteration of the loop.
        1. Let *notHandled* be the result of firing an event named `unhandledrejection` at *global*, using `PromiseRejectionEvent`, with the `cancelable` attribute initialized to true, the `promise` attribute initialized to *p*, and the `reason` attribute initialized to the value of *p*'s `[[PromiseResult]]` internal slot.
        1. If *notHandled* is false, then the promise rejection is handled. Otherwise, the promise rejection is not handled.
        1. If *p*'s `[[PromiseIsHandled]]` internal slot is false, add *p* to *settings object*'s outstanding rejected promises weak set. 

The specification further says:

> This algorithm results in promise rejections being marked as **handled** or **not handled**. These concepts parallel handled and not handled script errors. If a rejection is still **not handled** after this, then the rejection may be reported to a developer console.

So this part of the specification describes exactly how to determine when an `unhandledrejection` event should be fired and what effect, if any, it has on a warning being output to the console. However, the specification doesn't say when this should take place, so browsers are free to implement it in the way they want. For the purposes of this post, I decided to use `setInterval()` to periodically check the about-to-be-notified rejected promises list. This code is encapsulated in the `startMonitor()` method, which you can see here:

```js
export class RejectionTracker {

    // other methods omitted for space

    startMonitor() {

        // only start monitor once
        if (this.timeoutId > 0) {
            return;
        }

        this.timeoutId = setInterval(() => {

            const list = this.aboutToBeNotified;

            this.aboutToBeNotified = new Set();

            if (list.size === 0) {
                this.stopMonitor();
                return;
            }

            for (const p of list) {
                if (p[PledgeSymbol.isHandled]) {
                    continue;
                }

                const event = new PledgeRejectionEvent(p, p[PledgeSymbol.result]);
                p.constructor.onUnhandledRejection(event);
                const notHandled = event.returnValue;

                if (p[PledgeSymbol.isHandled] === false) {
                    this.outstandingRejections.add(p);
                }
                
                if (notHandled) {
                    this.logger.error(`Pledge rejection was not caught: ${ p[PledgeSymbol.result] }`);
                }
            }
        }, 100);
    }

    stopMonitor() {
        clearInterval(this.timeoutId);
        this.timeoutId = 0;
    }

}
```

The first step in `stopMonitor()` is to ensure that only one timer is ever used, so I check to make sure that `timeoutId` is `0` before proceeding. Next, `list` stores a reference to the current about-to-be-notified rejected promises list and then the property is overwritten with a new instance of `Set` to ensure that the same promises aren't processed by this check more than once. If there are no promises to process then the monitor is stopped and the function exits (this is not a part of the specification).

Next, each pledge in `list` is evaluated. Remember that the `PledgeSymbol.isHandled` property indicates if there's a rejection handler attached to the pledge, so if that is `true`, then you can safely skip processing that pledge. Otherwise, the `Pledge.onUnhandledRejection()` method is called with an event object. Unlike with `Pledge.onRejectionHandled()`, in this case you care about whether or not the event was cancelled, so `notHandled` is set to the event's return value.

After that, the function checks `PledgeSymbol.isHandled` again because it's possible that the code inside of `Pledge.onUnhandledRejection()` might have added a rejection handler. If this property is still `false`, then the pledge is added to the outstanding rejections weak set to track for any future rejection handler additions.

To finish up the algorithm, if `notHandled` is `true`, that's when an error is output to the console. Keep in mind that the `notHandled` variable is the sole determinant of whether or not a console error is output; the `PledgeSymbol.isHandled` property is a completely separate value that only indicates if a rejection handler is present.

The `stopMonitor()` method simply cancels the timer and resets the `timeoutId` to `0`.

With that, the `RejectionTracker` class is complete and all of the unhandled rejection tracking from browser implementations are now part of the Pledge library.

## Wrapping Up

This post covered how browsers track unhandled promise rejections, which is a bit different than how Node.js tracks them. The browser triggers an `unhandledrejection` event when a rejected promise is missing a rejection handler as well as outputting a message to the console. If the promise later has a rejection handler assigned, then a `rejectionhandled` event is triggered.

The description of how this functionality works is spread across both the ECMA-262 and HTML specifications, with the former defining only a small, abstract API while the latter provides explicit instructions to browsers on how to track unhandled rejections.

All of the code from this series is available in the [Pledge](https://github.com/humanwhocodes/pledge) on GitHub. I hope you'll download it and try it out to get a better understanding of promises.

And thank you to my [sponsors](https://github.com/sponsors/nzakas), whose donations supported parts 5 through 7 of this series. If you enjoyed this series and would like to see more in-depth blog posts, please consider [sponsoring me](https://github.com/sponsors/nzakas). Your support allows independent software developers like me to continue our work.

## References

[^1]: [Unhandled promise rejections](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections)
[^2]: [Properties of Promise Instances](https://tc39.es/ecma262/#sec-properties-of-promise-instances)
[^3]: [HostPromiseRejectionTracker ( promise, operation )](https://tc39.es/ecma262/#sec-host-promise-rejection-tracker)
[^4]: [PerformPromiseThen ( promise, onFulfilled, onRejected [ , resultCapability ] )](https://tc39.es/ecma262/#sec-performpromisethen)
[^5]: [RejectPromise ( promise, reason )](https://tc39.es/ecma262/#sec-rejectpromise)
[^6]: [HostPromiseRejectionTracker(promise, operation)](https://html.spec.whatwg.org/multipage/webappapis.html#the-hostpromiserejectiontracker-implementation)
