---
title: Thoughts on ECMAScript 6 and new syntax
author: Nicholas C. Zakas
permalink: /blog/2012/07/24/thoughts-on-ecmascript-6-and-new-syntax/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - Syntax
---
I am, just like many in the JavaScript world, watching anxiously as ECMAScript undergoes its next evolution in the form of ECMAScript 6. The anxiety is a product of the past, when we were all waiting for ECMAScript 4 to evolve. The ECMAScript 4 initiative seemed more like changing JavaScript into a completely different language that was part Java, part Python, and part Ruby. Then along came the dissenting crowd, including Douglas Crockford, who brought some sanity to the proceedings by suggesting a more deliberate approach. The result was ECMAScript 5, which introduced several new capabilities to the language without introducing a large amount of new syntax. The focus seemed to be on defining the so-called &#8220;magical&#8221; parts of JavaScript such as read-only properties and non-enumerable properties while setting the path forward to remove &#8220;the bad parts&#8221; with strict mode. The agreement was that TC39 would reconvene to address some of the larger language issues that were being solved in ECMAScript 4 and punted on in ECMAScript 5. That process began to create the next version of the language code-named &#8220;Harmony&#8221;.

We are now quite a bit further along the development of ECMAScript 6 so it's a good time to stop and take a look at what's been happening. Obviously, the evolution of any language focuses around adding new capabilities. New capabilities are added in ECMAScript 5 and I fully expected that to continue in ECMAScript 6. What I didn't expect was how new capabilities would end up tied to new syntax.

## Good new syntax

I've had several conversations with people about various ECMAScript 6 features and many have the mistaken belief that I'm against having new syntax. That's not at all the case. I like new syntax when it does two things: simplifies an already existing pattern and makes logical sense given the rest of the syntax. For example, I think the addition of `let` for the creation of block-scoped variables and `const` for defining constants make sense. The syntax is identical to using `var`, so it's easy for me to make that adjustment in my code if necessary:

    var SOMETHING = "boo!";
    const SOMETHING = "boo!";
    let SOMETHING = "boo!";

The cognitive overhead of using new keywords with the familiar syntax is pretty low, so it's unlikely that developers would get confused about their usage.

Likewise, the addition of the `for-of` loop is some syntactic sugar around `Array.prototype.forEach()`, plus some compatibility for Array-like items (making it syntactic sugar for Firefox's generic `Array.forEach()`). So you could easily change this code:

    var values = [1, 2, 3, 4, 5, 6];
    values.forEach(function(value) {
        console.log(value);
    });
    

Into this:

    var values = [1, 2, 3, 4, 5, 6];
    for (let value of values) {
        console.log(value);
    }
    

This makes complete sense to me. The syntax is very similar to the already existing `for` and `for-in` loops and mimics what's already available with `Array.prototype.forEach()`. I look at this code, and it still looks like JavaScript, and that makes me happy. Even if I choose not to use the new syntax, I can still pretty much accomplish the same thing.

## Bad new syntax

One of the features of ECMAScript 6 that has received a lot of attention by the so-called &#8220;fat arrow&#8221; functions<sup>[1]</sup>. This appears to be an attempt to solve several problems:

  * **`this` binding** &#8211; The desire to more easily specify the value of `this` Within a function. This is the problem that `Function.prototype.bind()` solves.
  * **Avoid typing &#8220;function&#8221;** &#8211; For some reason, people seem to hate typing the word &#8220;function&#8221;. Brendan Eich himself has said that he regrets using such a long word. I've never really had a problem with it or understood people's frustration with having to type those characters.
  * **Avoid typing parentheses, braces** &#8211; Once again, the syntax seems to be the issue. And once again, I just don't get it.

So essentially this:

    function getName() {
         return this.name;
    }
    
    var getWindowName = getName.bind(window);

Becomes this:

    var getWindowName = () => this.name;

And this:

    function getName(myName) {
         return this.name + myName;
    }
    
    var getWindowName = getName.bind(window);

Becomes this:

    var getWindowName = myName => this.name + myName;

I know I'm probably alone on this, but I don't think the syntax is clear. If there are no arguments to the function, then you need to provide parentheses; also, if there is more than one argument, you need parentheses. If there's just one argument, then you don't need the parentheses. With me so far?

If you want to return an object literal from one of these functions, then you must enclose the object literal and parentheses:

    let key_maker = val => ({key: val});

Then if you want to do more than one thing in the function body, you need to wrap it in braces and use a `return` Like you would in a regular function:

    let sumIt = (val1, val2) => {
        var sum = val1 + val2;
        return sum;
    };

And don't be confused into thinking these functions act like all other functions. There are several important differences between functions declared using the fat arrow syntax and functions declared in the more traditional way:

  * As mentioned previously, the value of `this` is static. It always takes the value of `this` for the enclosing function or global scope.
  * You can't use `new` with a fat arrow function, it throws an error.
  * Fat arrow functions do not have a `prototype` property.

So not only are arrow functions trying to solve a bunch of problems, they also introduce a bunch of side effects that aren't immediately apparent from the syntax. This is the type of new syntax that I don't like. There's a lot that goes on with arrow functions that is unexpected if you think that this is just a shorthand way of writing functions.

What's more, I don't know how to read this out loud. One of the things I've always liked about JavaScript is that it says what it does so I can actually read the code out loud and it makes sense. I have no idea how to pronounce that arrow function. &#8220;Let variable equal to a group of arguments that executes some statements?&#8221; It just doesn't work for me. In some ways, this is the sort of problem you end up with when you try to solve multiple problems with one solution. There are a lot of rules to remember with this syntax and a lot of side effects to consider.

Just for argument sake, if someone asked me what sort of new syntax I would suggest for sugaring `Function.prototype.bind()`, I would choose something along the lines of this:

    // My own attempt at sugaring Function.prototype.bind() - not ES6
    function<window> getName() {
        return this.name;
    }
    

This sort of syntax looks familiar to me while actually being new. I would read it as, &#8220;define a function in the scope of window called getName.&#8221; The idea is that `this` would always end up equal to `window`. Granted, the solves only one of the problems that arrow functions try to solve, but at least it says what it does.

## Ugly new syntax

There are other features in ECMAScript 6 that make me feel like JavaScript is becoming an ASCII art language. For some reason, instead of adding new capabilities with already existing syntax, the specification adds new capabilities only with new syntax. What puzzles me the most about this is that these capabilities are those that already exist in other languages in some form.

Case in point: quasis (aka quasi-literals)<sup>[2]</sup>. Quasis seem to be a solution for many different problems in JavaScript. As best I can tell, quasis are supposed to solve all of these problems:

  * **String formatting** &#8211; JavaScript has been missing this for a long time. Languages such as C# and Java have a method called `String.format()` that allows simple symbol substitution in strings. Quite honestly, an implementation of that in JavaScript would make me incredibly happy (Crockford has actually proposed something along those lines<sup>[3]</sup>).
  * **Multiline strings** &#8211; For some reason, people feel like there needs to be a standard way of doing multiline strings that isn't what's already implemented using a backslash before a newline character.
  * **HTML escaping** &#8211; This is also something JavaScript has been missing for a long time. While it has shipped with URL escaping for quite a while now, HTML escaping has been noticeably missing.

Quasis use the backtick symbol (`` ` ``) to indicate a section of code that requires variable substitution. Inside of the backticks, anything contained within `${...}` will be interpreted as JavaScript in the current context. The basic syntax is as follows:

    someFunc`Some string ${value}`;

The idea is that `someFunc` is the name of a function (a quasi handler) that interprets the value enclosed in the backticks. There are several use cases in the proposal, such as the creation of a `safehtml` quasi handler for doing HTML escaping and a `msg` quasi handler for performing localization substitutions. The `${value}` is interpreted as the value of a variable named `value`. You can also have multiple lines within the backticks:

    someFunc`Some string ${value}.
    And another line.`;

I'm not going to go into all of the ins and outs of quasis, for that you should see Axel Rauschmayer's writeup<sup>[4]</sup>. If you read through his post, you'll see that this is a fairly involved solution to the already-solved problems I mentioned earlier. What's more, it doesn't even look like JavaScript to me. With the exception of multiline strings, the problems can be solved using regular JavaScript syntax. Once again, if it were up to me, this is how I would solve them:

    // My take at string formatting - not in ES6
    var result = String.format("Hi %s, nice day we're having.", name);
    
    // My take at HTML escaping - not in ES6
    var result = String.escapeHtml("Does it cost < $5?");</code>

In these cases, it seems like a bazooka is being used when a water gun would suffice. Adding the capability to format strings and escape HTML is certainly important for the future of JavaScript, I just don't see why there has to be a new syntax to solve these problems. Of everything in ECMAScript 6, quasis is the feature I hope dies a horrible, painful death.

## Conclusion

I'm admittedly a bit of a JavaScript purist, but I'm willing to accept new syntax when it makes sense. I would prefer that new capabilities be added using existing syntax and then layer syntactic sugar on top of that for those who choose to use it. Providing new capabilities only with new syntax, as is the case with quasis, doesn't make sense to me especially when the problems are both well-defined and previously solved in other languages using much simpler solutions. Further, only using new syntax for new capabilities means that feature detection is impossible.

It seems like in some cases, TC 39 ends up creating the most complicated solution to a problem or tries to solve a bunch of problems all at once, resulting in Frankenstein features like arrow functions and quasis. I believe that the intent is always good, which is to avoid problems that other languages have seen. However, the result seems to make JavaScript much more complicated and the syntax much more foreign. I don't want JavaScript to be Python or Ruby or anything else other than JavaScript.

## References

  1. [Arrow function syntax][1] by Brendan Eich
  2. [Quasi-Literals][2]
  3. [String.prototype.format()][3] by Douglas Crockford
  4. [Quasi-literals: embedded DSLs in ECMAScript.next][4] by Dr. Axel Rauschmayer

 [1]: http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax
 [2]: http://wiki.ecmascript.org/doku.php?id=harmony:quasis
 [3]: http://wiki.ecmascript.org/doku.php?id=strawman:string_format
 [4]: http://www.2ality.com/2011/09/quasi-literals.html
