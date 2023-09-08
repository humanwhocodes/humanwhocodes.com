---
title: "JavaScript WTF: Why does every() return true for empty arrays?"
teaser: "How can a condition be satisified when there aren't any values to test?"
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - WTF
---


The core of the JavaScript language is large enough that it's easy to misunderstand how certain parts of it work. I was recently refactoring some code that used the `every()` method and discovered I didn't actually understand the logic behind it. In my mind, I was assuming that the callback function must be called and return `true` for `every()` to return `true`, but that's not actually the case. For an empty array, `every()` returns `true` regardless of what the callback function is because that callback function is never called. Consider the following:

```js
function isNumber(value) {
    return typeof value === "number";
}

[1].every(isNumber);            // true
["1"].every(isNumber);          // false
[1, 2, 3].every(isNumber);      // true
[1, "2", 3].every(isNumber);    // false
[].every(isNumber);             // true
```

In each case of this example, the call to `every()` checks that each item in the array is a number. The first four calls are fairly straightforward, with `every()` producing the expected result. Now consider these examples:

```js
[].every(() => true);           // true
[].every(() => false);          // true
```

This might be more surprising: callbacks that return either `true` or `false` have the same result. The only reason this can happen is if the callback isn't being called and the default value of `every()` is `true`. But why does an empty array return `true` for `every()` when there are no values to run the callback function on?

To understand why, it's important to take a look at how the specification describes this method.

## Implementing `every()`

ECMA-262 defines an `Array.prototype.every()`[^1] algorithm that roughly translates into this JavaScript code:

```js
Array.prototype.every = function(callbackfn, thisArg) {

    const O = this;
    const len = O.length;

    if (typeof callbackfn !== "function") {
        throw new TypeError("Callback isn't callable");
    }

    let k = 0;

    while (k < len) {
        const Pk = String(k);
        const kPresent = O.hasOwnProperty(Pk);

        if (kPresent) {
            const kValue = O[Pk];
            const testResult = Boolean(callbackfn.call(thisArg, kValue, k, O));

            if (testResult === false) {
                return false;
            }
        }

        k = k + 1;
    }

    return true;
};
```

From the code, you can see that `every()` assumes the result is `true` and only returns `false` if the callback function returns `false` on any item in the array. If there are no items in the array, then there is no opportunity to execute the callback function, and therefore, no way for the method to return `false`. 

Now the question is: why does `every()` behave this way?

## The "for all" quantifier in mathematics and JavaScript

The MDN page[^2] provides the answer as to why `every()` returns `true` for an empty array:

> `every` acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns true. (It is vacuously true that all elements of the empty set satisfy any given condition.)

*Vacuous truth* is a mathematical concept that means something is true if a given condition (called the *antecedent*) cannot be satisified (i.e., the given condition is not true).[^3] To put this back into JavaScript terms, `every()` returns `true` for an empty set because there is no way to call the callback. The callback represents the condition to test, and if it cannot be executed because there are no values in the array, then `every()` must return `true`.

The "for all" quantifier is part of a larger topic in mathematics called *universal quantification*[^4] that allows you to reason about sets of data. Given the importance of JavaScript arrays for performing mathematical calculations, especially with typed arrays, it makes sense to have built-in support for such operations. And `every()` isn't the only example.

## The "there exists" quantifier in mathematics and JavaScript

The JavaScript `some()` method implements the "exists" quantifier[^5] from *existential quantification*[^6] ("there exists" is also sometimes called "exists" or "for some"). The "exists" quantifier states that the result is false for any empty set. Therefore, the `some()` method returns `false` for an empty set and it also doesn't execute the callback. Here are some examples (pun intended):

```js
function isNumber(value) {
    return typeof value === "number";
}

[1].some(isNumber);            // true
["1"].some(isNumber);          // false
[1, 2, 3].some(isNumber);      // true
[1, "2", 3].some(isNumber);    // true
[].some(isNumber);             // false
[].some(() => true);           // false
[].some(() => false);          // false
```

## Quantification in other languages

JavaScript isn't the only programming language that has implemented quantification methods for collections or iterables:

* **Python:** the `all()` function implements "for all"[^7] while the `any()` function implements "there exists"[^8].
* **Rust:** the `Iterator::all()` method implements "for all"[^9] while the `any()` function implements "there exists"[^10].

So JavaScript is in good company with `every()` and `some()`.

## Implications of "for all" `every()`

Whether or not you think the behavior of `every()` is counterintuitive is up for debate[^10]. Regardless of your opinion, however, you need to be aware of the "for all" nature of `every()` to avoid errors. In short, if you're using `every()` or an array that might be empty, you should add an explicit check beforehand. For example, if you have an operation that relies on an array of numbers and will fail with an empty array, then you should check if the array is empty before using `every()`:

```js
function doSomethingWithNumbers(numbers) {

    // first check the length
    if (numbers.length === 0) {
        throw new TypeError("Numbers array is empty; this method requires at least one number.");
    }

    // now check with every()
    if (numbers.every(isNumber)) {
        operationRequiringNonEmptyArray(numbers);
    }

}
```

Again, this is only important if you have an array that should not be used for an operation when it's empty; otherwise, you can avoid this extra check.

## Conclusion

While I was surprised at the behavior of `every()` on an empty array, it makes sense once you understand the larger context of the operation and the proliferation of this functionality across languages. If you were also confused by this behavior, then I'd suggest changing the way you read `every()` calls when you come across them. Instead of reading `every()` as "does every item in this array match this condition?" read it as, "is there any item in this array that doesn't match this condition?" That shift in thinking can help avoid errors in your JavaScript code going forward.


*Thanks to [Dr. Axel Rauschmayer](https://fosstodon.org/@rauschma), [Bart Louwers](https://fosstodon.org/@nzakas/111018648543845719), [Naman](https://fosstodon.org/@nmn@indieweb.social), [Ronny Haase](https://twitter.com/ronnyhaase), [Alexey Raspopov](https://twitter.com/alexeyraspopov), [Ivan](https://twitter.com/IvanDotMe), and [David Thomas](https://fosstodon.org/@submicron) for chiming in on Mastodon and Twitter to provide more context.*

[^1]: [ECMA-262: Array.prototype.every(callbackfn, [thisArg])](https://tc39.es/ecma262/#sec-array.prototype.every)
[^2]: [MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
[^3]: [Vacuous truth](https://en.wikipedia.org/wiki/Vacuous_truth)
[^4]: [Universal quantification](https://en.wikipedia.org/wiki/Universal_quantification)
[^5]: [ECMA-262: Array.prototype.some(callbackFn, [thisArg])](https://tc39.es/ecma262/#sec-array.prototype.some)
[^6]: [Existential quantification](https://en.wikipedia.org/wiki/Existential_quantification)
[^7]: [Python all()](https://realpython.com/python-all/)
[^8]: [Python any()](https://realpython.com/python-any/)
[^9]: [Rust Iterator::all](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.all)
[^9]: [Rust Iterator::any](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.any)
[^10]: [GitHub: Emphasize that `every`` returns true for empty arrays](https://github.com/mdn/content/pull/28975)
