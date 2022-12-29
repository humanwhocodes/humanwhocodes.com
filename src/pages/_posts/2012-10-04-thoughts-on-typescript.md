---
title: Thoughts on TypeScript
author: Nicholas C. Zakas
permalink: /blog/2012/10/04/thoughts-on-typescript/
categories:
  - Web Development
tags:
  - JavaScript
  - TypeScript
---
Earlier this week, Microsoft released TypeScript<sup>[1]</sup>, a new compile-to-JavaScript language for &#8220;application scale JavaScript.&#8221; My initial reaction was confusion:

<blockquote class="twitter-tweet tw-align-center">
  <p>
    Um, why? <a href="http://t.co/RufJBt7s" title="http://blogs.msdn.com/b/somasegar/archive/2012/10/01/typescript-javascript-development-at-application-scale.aspx">blogs.msdn.com/b/somasegar/ar…</a> (via @<a href="https://twitter.com/izs">izs</a>)
  </p>
  
  <p>
    &mdash; Nicholas C. Zakas (@slicknet) <a href="https://twitter.com/slicknet/status/252828286437163008" data-datetime="2012-10-01T17:52:15+00:00">October 1, 2012</a>
  </p>
</blockquote>



It seems like almost every week there&#8217;s a new language that&#8217;s trying to replace JavaScript on the web. Google received a lukewarm reception when it introduced Dart<sup>[2]</sup>, it&#8217;s own idea for fixing all of JavaScript&#8217;s perceived flaws. CoffeeScript<sup>[3]</sup> continues to be the most prominent of these options, frequently inciting the holy wars online. And now Microsoft is throwing its hat into the ring and I couldn&#8217;t help but wonder why.

## My bias

Before talking about TypeScript specifically, I want to explain my personal bias so that you can take the rest of my comments in their proper context. There is a very real problem in the web development industry and that problem is a significant lack of good JavaScript developers. I can&#8217;t tell you the number of companies that contact me trying to find above-average JavaScript talent to work on their applications. Yes, there are many more competent JavaScript developers now than there were 10 years ago, but the demand has increased in a way that far outpaces the supply increase. There are simply not enough people to fill all of the JavaScript jobs that are available. That&#8217;s a problem.

Some would argue that the high demand and low supply puts good JavaScript developers in an awesome position and we should never want to change that. After all, that&#8217;s why we can demand the salaries that we do. From a personal economic standpoint, I agree. From the standpoint of wanting to improve the web, I disagree. Yes, I want to be able to make a good living doing what I do, but I also want the web as a whole to continue to grow and get better, and that only happens when we have more competent developers entering the workforce.

I see compile-to-JavaScript languages as a barrier to that goal. We should be convincing more people to learn JavaScript rather than giving them more options to not write JavaScript. I often wonder what would happen if all of the teams and companies who spent time, energy, personnel, and money to develop these alternatives instead used those resources on improving JavaScript and teaching it. 

To be clear, I&#8217;m not saying that JavaScript is a perfect language and doesn&#8217;t have its warts. Every language I&#8217;ve ever used has parts that suck and parts that are awesome, and JavaScript is no different. I do believe that JavaScript has to evolve and that necessarily introduces more parts that will suck as well as more parts that are awesome. I just wish we were all spending our efforts in the same area rather than splintering them across different projects.

## What is TypeScript?

I spent a lot of time this week looking at TypeScript, reading through the documentation, and watching the video on the site. I was then invited by Rey Bango to meet with a couple members of the TypeScript team to have my own questions answered. With all of that background, I feel like I have a very good idea about what TypeScript is and what it is not.

TypeScript is first and foremost a superset of JavaScript. That means you can write regular JavaScript inside of TypeScript and it is completely valid. TypeScript adds additional features on top of JavaScript that then get converted into ECMAScript 5 compatible code by the TypeScript compiler. This is an interesting approach and one that&#8217;s quite different from the other compile-to-JavaScript languages out there. Instead of creating a completely new language with new syntax rules, TypeScript starts with JavaScript and adds additional features that fit in with the syntax quite nicely.

At its most basic, TypeScript allows you to annotate variables, function arguments, and functions with type information. This additional information allows for tools to provide better auto complete and error checking than you could get using normal JavaScript. The syntax is borrowed from the original JavaScript 2/ECMAScript 4 proposal<sup>[4]</sup> that was also implemented as ActionScript 3:

    var myName: string = "Nicholas";
    
    function add(num1: number, num2: number): number {
        return num1 + num2;
    }
    
    function capitalize(name: string): string {
        return name.toUpperCase();
    }
    

The colon syntax may look familiar if you ever used Pascal or Delphi, both of which use the same syntax for indicating the type. The strings, numbers, and booleans in JavaScript are represented in TypeScript as `string`, `number`, and `bool` (note: all lowercase). These annotations help the TypeScript compiler to figure out if you are using correct values. For example, the following would cause a warning:

    // warning: add() was defined to accept numbers
    var result = add("a", "b");

Since `add()` was defined to accept numbers, this code causes a warning from the TypeScript compiler.

TypeScript is also smart enough to infer types when there is an assignment. For example, each of these declarations is automatically assigned a type:

    var count = 10;           // assume ": number"
    var name = "Nicholas";    // assume ": string"
    var found = false;        // assume ": bool"

That means to get some benefit out of TypeScript, you don&#8217;t necessarily have to add type annotations everywhere. You can choose not to add type annotations and let the compiler try to figure things out, or you can add a few type annotations to help out.

Perhaps the coolest part of these annotations is the ability to properly annotate callback functions. Suppose you want to run a function on every item in an array, similar to `Array.prototype.forEach()`. Using JavaScript, you would define something like this:

    function doStuffOnItems(array, callback) {
        var i = 0,
            len = array.length;
    
        while (i < len) {
            callback(array[i], i, array);
            i++;
        }
    }</code>

The callback function accepts three arguments, a value, an index, and the array itself. There&#8217;s no way to know that aside from reading the code. In TypeScript, you can annotate the function arguments to be more specific:

    function doStuffOnItems(array: string[], 
            callback: (value: string, i: number, array: string[]) => {}) {
        var i = 0,
            len = array.length;
    
        while (i < len) {
            callback(array[i], i, array);
            i++;
        }
    }</code>

This code adds annotations to both arguments of `doStuffOnItems()`. The first argument is defined as an array of strings, and the second argument is defined as a function accepting three arguments. Note that the format for defining a function type is the ECMAScript 6 fat arrow function syntax.<sup>[5]</sup> With that in place, the compiler can check to see that a function matches the signature before the code is ever executed.

The type annotations really are the core of TypeScript and what it was designed to do. By having this additional information, editors can be made that not only do type checking of code before its executed, but also provide better autocomplete support as you&#8217;re coding. TypeScript already has plug-ins for Visual Studio, Vim, Sublime Text 2, and Emacs,<sup>[6]</sup> so there are lots of options to try it out.

## Additional features

While the main point of TypeScript is to provide some semblance of static typing to JavaScript, it doesn&#8217;t stop there. TypeScript also has support for ECMAScript 6 classes<sup>[7]</sup> and modules<sup>[8]</sup> (as they are currently defined). That means you can write something like this:

    class Rectangle {
        constructor(length: number, width: number) {
            this.length = length;
            this.width = width;
        }
    
        area() {
            return this.length * this.width;
        }
    }

And TypeScript converts it into this:

    var Rectangle = (function () {
        function Rectangle(length, width) {
            this.length = length;
            this.width = width;
        }
        Rectangle.prototype.area = function () {
            return this.length * this.width;
        };
        return Rectangle;
    })();

Note that the constructor function is created appropriately and the one method is properly placed onto the prototype.

Aside from modules and classes, TypeScript also introduces the ability to define interfaces. Interfaces are not defined in ECMAScript 6 at all but are helpful to TypeScript when it comes to type checking. Since JavaScript code tends to have a large amount of object literals defined, interfaces provide an easy way to validate that the right type of object is being used. For example:

    interface Point {
        x: number;
        y: number;
    }
    
    function getDistance(pointA: Point, pointB: Point) {
        return Math.sqrt( 
                   Math.pow(pointB.x - pointA.x, 2) +
                   Math.pow(pointB.y - pointA.y, 2)
               );
    }
    
    var result = getDistance({ x: -2, y: -3}, { x: -4, y: 4})
    

In this code, there&#8217;s an interface called `Point` with two properties `x` and `y`. The `getDistance()` function accepts two points and calculates the distance between them. The two arguments can be any object containing exactly those two properties of `x` and `y`, meaning I can pass in object literals and TypeScript will check to ensure that they contain the correct properties.

Both interfaces and classes feed into the type system to provide better error checking. Modules are just ways to group related functionality together.

## What I like

The more I played with TypeScript the more I found parts of it that I really like. First and foremost, I like that you can write regular JavaScript inside of TypeScript. Microsoft isn&#8217;t trying to create a completely new language, they are trying to augment JavaScript in a useful way. I can appreciate that. I also like that the code compiles down into regular JavaScript that actually makes sense. Debugging TypeScript generated code isn&#8217;t all that difficult because it uses familiar patterns.

What impressed me the most is what TypeScript doesn&#8217;t do. It doesn&#8217;t output type checking into your JavaScript code. All of those type annotations and error checking are designed to be used only while you&#8217;re developing. The final code doesn&#8217;t do any type checking unless you are doing it manually using JavaScript code. Classes and modules get converted into regular JavaScript while interfaces completely disappear. No code for interfaces ever appear in the final JavaScript because they are used purely during development time for type checking and autocomplete purposes.

The editor integration for TypeScript is quite good. All you have to do is add a few annotations and all of a sudden the editor starts to light up with potential errors and suggestions. The ability to explicitly define expectations for callback functions is especially impressive, since that&#8217;s the one area I tend see a lot of issues related to passing incorrect values into functions.

I also like that Microsoft open-sourced TypeScript. They seem to be committed to developing this in the open and to developing a community around TypeScript. Whether or not they follow through and actually operate as an open source project is yet to be seen, but they&#8217;ve at least taken steps to allow for that possibility.

## What I don&#8217;t like

While I applaud Microsoft&#8217;s decision to use ECMAScript 6 classes, I fear it puts the language in a difficult position. According to the TypeScript team members I spoke with, they&#8217;re absolutely planning on staying in sync with ECMAScript 6 syntax for modules and classes. That&#8217;s a great approach in theory because it encourages people to learn skills that will be useful in the future. In reality, that&#8217;s a difficult proposition because ECMAScript 6 is not yet complete and there is no guarantee that the syntax won&#8217;t change again before the specification is finished. That puts the TypeScript team in a very difficult position: continue to update the syntax to reflect the current reality of ECMAScript 6 or lag behind (possibly fork?) In order to keep their development environment stable.

The same goes for the type annotations. While there is significant prior work indicating that the colon syntax will work in JavaScript, there&#8217;s no guarantee that it will ever be added to the language. That means what TypeScript is currently doing may end up at odds with what ECMAScript eventually does. That will also lead to a decision as to which way to go.

The TypeScript team is hoping that a community will evolve around the language and tools in order to help inform them of which direction to go when these sort of decisions appear. That&#8217;s also a double-edged sword. If they succeed in creating a large community around TypeScript, it&#8217;s very likely that the community may decide that they want to go away from the ECMAScript standard rather than stick with it due to the high maintenance cost of upgrading existing code.

And I really don&#8217;t like having a primitive type named `bool`. I already told them I&#8217;d like to see that changed to `boolean` so that it maps back to the values returned from `typeof`, along with `string` and `number`.

## Should you use it?

I think TypeScript has a lot of promise but keep one thing in mind: the current offering is an early alpha release. It may not look like that from the website, which is quite polished, or the editor plug-ins, or the fact that the version number is listed as 0.8.0, but I did confirm with the TypeScript team that they consider this a very early experimental release to give developers a preview of what&#8217;s coming. That means things may change significantly over the next year before TypeScript stabilizes (probably as ECMAScript 6 stabilizes).

So is it worth using now? I would say only experimentally and to provide feedback to the TypeScript team. If you choose to use TypeScript for your regular work, you do so at your own risk and I highly recommend that you stick to using type annotations and interfaces exclusively because these are removed from compiled code and less likely to change since they are not directly related to ECMAScript 6. I would avoid classes, modules, and anything else that isn&#8217;t currently supported in ECMAScript 5.

## Conclusion

TypeScript offers something very different from the other compile-to-JavaScript languages in that it starts with JavaScript and adds additional features on top of it. I&#8217;m happy that regular JavaScript can be written in TypeScript and still benefit from some of the type checking provided by the TypeScript compiler. That means writing TypeScript can actually help people learn JavaScript, which makes me happy. There&#8217;s no doubt that these type annotations can create a better development experience when integrated with editors. Once ECMAScript 6 is finalized, I can see a big use for TypeScript, allowing developers to write ECMAScript 6 code that will still work in browsers that don&#8217;t support it natively. We are still a long way from that time, but in the meantime, TypeScript is worth keeping an eye on.

## References

  1. [TypeScript][1] (typescriptlang.org)
  2. [Dart][2] (dartlang.org)
  3. [CoffeeScript][3] (coffeescript.org)
  4. [Proposed ECMAScript 4th Edition – Language Overview][4] (ECMA)
  5. [ECMAScript 6 Arrow Function Syntax][5] (ECMA)
  6. [Sublime Text, Vi, Emacs: TypeScript enabled!][6] (MSDN)
  7. [ECMAScript 6 Maximally Minimal Classes][7] (ECMA)
  8. [ECMAScript 6 Modules][8] (ECMA)

 [1]: http://www.typescriptlang.org/
 [2]: http://www.dartlang.org/
 [3]: http://coffeescript.org/
 [4]: http://www.ecma-international.org/activities/Languages/Language%20overview.pdf
 [5]: http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax
 [6]: http://blogs.msdn.com/b/interoperability/archive/2012/10/01/sublime-text-vi-emacs-typescript-enabled.aspx
 [7]: http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes
 [8]: http://wiki.ecmascript.org/doku.php?id=harmony:modules
