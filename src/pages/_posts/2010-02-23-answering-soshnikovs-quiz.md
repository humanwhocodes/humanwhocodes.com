---
title: "Answering Soshnikov's quiz"
author: Nicholas C. Zakas
permalink: /blog/2010/02/23/answering-soshnikovs-quiz/
categories:
  - Web Development
tags:
  - JavaScript
  - Quiz
---
JavaScript quizzes have sure been popular lately. The latest addition is one by [Dmitry A. Soshnikov][1] and is affectionately called, [The quiz][2]. I must admit, this quiz has some of the most mind-bending examples of JavaScript I've ever seen. What I like about his quiz is that each piece of code is more or less reliant on a single JavaScript concept, and that's why I'm spending another week explaining another quiz.

## Question #1

    typeof typeof(null)

This is probably the easiest of all of the questions. Whenever you have `typeof typeof`, the result is always &#8220;string&#8221;. Why? Because the `typeof` operator always returns a string value (in this case, it returns &#8220;object&#8221; for `typeof(null)`).

## Question #2

Are the algorithms of the following checks completely equivalent?

    typeof foo == 'undefined'

and

    typeof foo === 'undefined'

The quiz claims that the answer is &#8220;yes&#8221;, though as [Kangax pointed out][3], the algorithms for these two operations are actually different. A better way to ask this question would have been, &#8220;is the end result of these two checks completely equivalent?&#8221; The answer to that is a definitive yes because you're ultimately comparing two strings in each comparison. When comparing two strings, the == operator doesn't do any type coercion and so the two comparisons will always return the same result.

## Question #3

What's the result of:

    100['toString']['length']

A couple of good pieces of deception in this one. Numbers end up wrapped by the `Number` type when you use them, and the `Number` type has a `toString()` method. However, you're not actually calling `toString()` in this case, you're actually accessing the `length` property of the `toString()` method. It makes more sense to look at the code like this:

    100.toString.length

The `length` property of a function indicates how many names arguments are expected. The `toString()` methods accepts one argument, which is the radix in which to output the string representation of the number (for example `toString(2)` outputs the binary representation of the number as a string and `toString(16)` outputs the hexadecimal representation of the number as a string).

So the answer to this question is 1.

## Question #4

What's the result of:

    var a = (1,5 - 1) * 2

This is the first question that relies on your knowledge of how the comma operator works. To put it simply: when there's an expression containing one or more commas, the value of the expression is equal to the last value. For example, the value of `(1,2,3,4)` is 4 and the value of `("hello", "world")` is &#8220;world&#8221;. The comma operator's best use is in defining multiple variables and the example usage here is definitely not recommended.

Given this knowledge, it should be obvious that the answer to this question is 8. That's because `(1,5-1)` gets evaluated to `(1,4)` so the final value is 4. I'm sure you can take it from there.

## Question #5

What's the result of:

    var x = 10;
    var foo = {
      x: 20,
      bar: function () {
        var x = 30;
        return this.x;
      }
    };
    
    console.log(
      foo.bar(),
      (foo.bar)(),
      (foo.bar = foo.bar)(),
      (foo.bar, foo.bar)()
    );

This code outputs four values onto the console. The real question is what are the four values. It should be very obvious that the first value is 20 because `foo.bar()` accesses `this.x` on `foo`, which is 20. The next part, `(foo.bar)()` acts in the exact same way as `foo.bar()`. Wrapping `foo.bar` in parens doesn't change how it's evaluated. This also outputs 20.

The tricky part comes next. The return value of an assignment expression is always the right-hand side expression. Assigning a function to a location, even if it's the same location from where it came, results in the overall expression having a value of the function. The important piece of information is that the function now has no context object associated with it, so `(foo.bar = foo.bar)()` executes as if it where `foo.bar.call()`. Of course, any function called outside of an object context gets executed in the context of the global, so `this.x` now is 10. Thus, the third part outputs 10.

The fourth variation outputs the same result as the third. Once again you encounter the comma operator. Keep in mind that `foo.bar` in this part of the code represents a pointer to the function, and the comma operator takes on the value of that function before being called. This outputs the same value as the previous section for the same reason: using the comma operator means the function is context-free and gets executed in the global scope.

So your overall answer: `20 20 10 10`.

## Question #6

What's the result of:

    function f(x, y) {
      x = 10;
      console.log(
        arguments[0],
        arguments[1]
      );
    }
    
    f();

This function has two named arguments but neither are provided when the function is called. You should know that the value of these named arguments will be `undefined` in this case, and so outputting `arguments[1]` should also obviously be `undefined`. The only question, then, is the value of `arguments[0]`. This actually tests the inverse of what Baranovskiy's fourth question tested. In his test, Barnovskiy changed a value in the `arguments` object and you saw that the corresponding named argument changed in value as well (see my [writeup][4] for more info). The opposite, however, is not true.

Changing the named argument's value does not automatically change the corresponding value in `arguments`. As mentioned in my aforementioned post, the `arguments` object and the named argument do not share memory space. When a change is made to `arguments`, that value is *copied* to the named argument. It doesn't work the other way. A named argument is no more special than a local variable, and so changing its value doesn't affect the `arguments` object. So, `arguments[0]` is still `undefined` and the output of the code is `undefined undefined`.

## Question #7

What's the result of:

    var
      b = 10,
      c = (
        20,
        function (x) { return x + 100},
        function () { return arguments[0]}
      );
    
    a = b + c
    ({x: 10}).x

There are only two concepts that you need to understand to answer this. The first is how the comma operator works, which you should be an expert in by now. The value of `c` is the function `function(){ return arguments[0];}`, which just returns the first argument that was passed in.

The second thing you need to know is how automatic semicolon insertion works. Because of the way the code is formatted, you might be inclined to believe that a semicolon will be inserted after `a = b + c`. Keep in mind that `c` is a function, and the next non-whitespace character is `(`. In this case, the whitespace is ignored, so the last line is actually:

    a = b + c({x: 10}).x

Since the function contained in `c` simply passes back the argument that was passed in, the result of this expression is logically equivalent to:

    a = b + ({x: 10}).x

And that is really just:

    a = b + 10

This makes `a` equal to 20, and that is the final value of the code.

## Question #8

What's the result of:

    1..z

Another sneaky question. At first glance, this looks like an obvious syntax error. However, there is no syntax error here because of the way this text is parsed. Remember from earlier that numbers end up wrapped by the `Number` type when accessed, which makes an ad-hoc object. The `z` in this case is attempting to access a property, which means the code could be written as:

    (1.)["z"]

So what is `1.`? It's actually a valid floating-point number in JavaScript. JavaScript unfortunately allows trailing decimal points on numbers, so you can have `1` or `1.` or `1.0` depending on how you feel like writing the code. Trailing decimal points are considered bad practice and are a warning when code is run through [JSLint][5].

Really, this question is asking you for the value of the property `z` on this number object representing `1.`. Since there is no such property on `Number` objects, the value is `undefined`.

## Question #9

What's the result of:

    ({
      x: 10,
      foo: function () {
        function bar() {
          console.log(x);
          console.log(y);
          console.log(this.x);
        }
        with (this) {
          var x = 20;
          var y = 30;
          bar.call(this);
        }
      }
    }).foo();

Another tricky one that tests your understanding of `with` statements. There's really only one concept to grasp to get this question right, and that's what `var` statements in `with` statements actually do. There are essentially three scenarios:

  1. The variable being declared doesn't exist as a property on the context object (in this case, `this`) and the variable doesn't exist as a local variable of the containing function (`foo()`). In this case, the variable declaration creates a new local variable to the containing function. This happens due to `var` statement hoisting (also described in my [previous post][4]).
  2. The variable being declared exists as a property on the context object. Two things actually happen here. First, the `var` statement is hoisted and a new local variable is defined. The initialization statement, however, stays in the same location and thus assigns the value to the object property with the same name.
  3. The variable being declared exists as a local variable of the containing function. In this case, the existing variable is simply assigned the given value.

Armed with this knowledge, you can determine the three values that are output. First, `x` is declared but never assigned a value. Due to `var` hoisting, the `with` statement is effectively the same as this:

    var x;
    var y;
    with (this) {
        x = 20;
        y = 30;
        bar.call(this);
    }

So `var x = 20;` gets mapped to `this.x = 20;` inside of the `with` statement since `x` exists as a property of the context object `this`. That means `this.x` changes from 10 to 20 while the local variable `x` is never assigned a value.

The function `bar()` is a closure inside of `foo()`, and therefore has access to all of `foo()`&#8216;s local variables (which are `x` and `y`). When `console.log(x)` is executed, it outputs `undefined` because the variable `x` was never initialized (all variables are assigned the value `undefined` when declared).

Next, `y` is assigned a value of 30, creating a local variable in `foo()`. Since `bar()` is a closure, it has access to all local variables of `foo()`y.

The last part, `console.log(this.x);` outputs 20 because the function is called in the context of the object.

So there's your answer: `undefined`, `30`, `20`.

## Question #10

What's the result of:

    foreach (k in {a: 10, b: 20})
    {
      // ...
    }

Another tricky one since `foreach-in` isn't defined in [ECMA-262][6]. There is a `for-each-in` statement defined in [ECMA-357][7] (ECMAScript for XML) and, in that spec, it is used to iterate over the values in an array. So the trick here is that knowing too much about JavaScript could actually lead to the wrong answer.

Since there is no `foreach-in` statement implemented anywhere, this should cause an error. You might think it would cause a syntax error but it won't because `foreach` is a valid identifier (it's not a keyword and follows the identifier format), so the JavaScript engine looks for a reference to `foreach` and, unable to find it, throws a `ReferenceError`.

The &#8220;correct&#8221; answer for this one is a point of contention. I would argue that the answer should &#8220;always ReferenceError&#8221; because if you run just this code in the example, this is what you get. The author says that the answer is actually &#8220;ReferenceError or possibly no error&#8221; because if `foreach()` and `k` are both defined previously, this won't throw an error. Since all of the other questions hinge on just the code presented, I don't think it's a fair jump to ask people to make. However, to be as complete as possible, let's assume the code is this:

    function foreach(){
        //do something
    }
    var k = "a";
    
    foreach (k in {a: 10, b: 20})
    {
      // ...
    }

With this code, you would receive no errors whatsoever. Why? Because `foreach(k in {a: 10, b: 20})` evaluates to `foreach(true)` because the property &#8220;a&#8221; does exist in the given object literal. But what about the remaining curly braces?

This is another trick of automatic semicolon insertion. The format of the code looks like the braces represent the body of a statement, however, they actually represent an empty object literal. The code is interpreted as:

    function foreach(){
        //do something
    }
    var k = "a";
    
    foreach (k in {a: 10, b: 20});
    
    {
      // ...
    };

Note that a semicolon is inserted before the left curly brace and after the right curly brace. These are actually two separate and unrelated statements once the semicolons have been inserted. An object literal that isn't assigned to a variable might look weird, but it's still a valid statement, just like any of the following:

    "hello world";
    5;
    true;

A statement doesn't have to execute a function or assign a value, it may just contain a value.

## Wrapping up

I really liked this quiz because of its high level of difficulty. Hopefully now you understand better how the comma operator works and some of the semantics around variable declaration hoisting.

 [1]: http://javascript.ru/person/Dmitry-A.-Soshnikov "Ð˜Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð¾ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ðµ."
 [2]: http://dmitrysoshnikov.com/ecmascript/the-quiz/
 [3]: http://javascript.ru/blog/Dmitry-A.-Soshnikov/The-quiz#comment-3456
 [4]: https://humanwhocodes.com/blog/2010/01/26/answering-baranovskiys-javascript-quiz/
 [5]: http://www.jslint.com
 [6]: http://www.ecma-international.org/publications/standards/Ecma-262.HTM
 [7]: http://www.ecma-international.org/publications/standards/Ecma-357.htm
