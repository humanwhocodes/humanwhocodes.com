---
title: "My JavaScript quiz &#8211; answers"
author: Nicholas C. Zakas
permalink: /blog/2010/02/18/my-javascript-quiz-answers/
categories:
  - Web Development
tags:
  - JavaScript
  - Quiz
---
Earlier this week, I posted [my JavaScript quiz][1], containing some basic code along with questions. Here are the answers.

## Example #1

    var num1 = 5,
        num2 = 10,
        result = num1+++num2;

The key to understanding this example is to understand operator precedence. Clearly, +++ isn't a valid operator, so the JavaScript engine breaks it up into a postfix increment operator and the plus sign. This code is completely valid and parses without problem, but really could be written like this:

    var num1 = 5,
        num2 = 10,
        result = num1++ + num2;

With the understanding that this is how the code is interpreted, the questions should be fairly easy.

  * **What is the value of `result`? **The value is 15 because the postfix increment works after the `num1+++num2` statement has executed.
  * **What is the value of `num1`?** The value is 6 because it is incremented after the last statement.
  * **What is the value of `num2`?** The value is 10 because no operation takes place on `num2` itself.

## Example #2

    var x = 5,
        o = {
            x: 10,
            doIt: function doIt(){
                var x = 20;
                setTimeout(function(){
                    alert(this.x);
                }, 10);
            }
        };
    o.doIt();

The key to this example is understanding JavaScript scope. The alert inside of the closure references this.x, but because this reference is wrapped in a couple of functions inside of an object, what is the correct scope? The answer is pretty simple. All functions passed into `setTimeout()` are executed in the global scope.

  * **What value is displayed in the alert? **The value is 5 because `this.x` is the same as `window.x` and `var x = 5` is equivalent to `window.x = 5`.

## Example #3

    var num1 = "10",
        num2 = "9";

The code is pretty self-explanatory, just two string variables being defined.

  * **What is the value of `num1 < num2`?** When both operands are strings, comparison operators perform string comparisons by comparing characters in the same position. The string &#8220;10&#8243; comes before the string &#8220;9&#8243; because the character &#8220;1&#8243; comes before the character &#8220;9&#8243; in ASCII. Since there are no more characters to compare after that point, this comparison is the one that remains. Thus, the value of `num1 < num2` is `true`.
  * **What is the value of `+num1 < num2`?** The plus operator here converts `num1` into a number, so now you're comparing a number to a string. When this happens, the string operator gets converted into a number and then the comparison commences. So ultimately this is equivalent to 10 < 9, which very obviously is `false`.
  * **What is the value of `num1 + num2`?** Both operands are strings, which means a string concatenation happens. The result is `"109"`.
  * **What is the value of `+num1 + num2`?** As you saw earlier, the plus operator converts a string to number, so `num1` becomes the number 10. However, when the plus operator is used with a number and a string, the number gets converted to a string and then string concatenation is performed. So the result of this is the same as if you did `num1 + num2` as the value is `"109"`.

## Example #4

    var message = "Hello world!";

Just a simple string variable, nothing fancy here.

  * **What is the value of `message.substring(1, 4)`?** The first argument is the index of the first character you want and the second argument is the index of the character *after* the last one you want. In this case, you want the second character (index 1) through the fourth character (index 3). So the result is &#8220;ell&#8221;.
  * **What is the value of `message.substr(1,4)`?** The first argument is the index of the first character you want and the second argument is how many characters to retrieve. In this case, you want the second character (index 1) and then three more characters, so the result is &#8220;ello&#8221;.

## Example #5

    var o = {
            x: 8,
    
            valueOf: function(){
                return this.x + 2;
            },
            toString: function(){
                return this.x.toString();
            }
        },
        result = o < "9";
    
    alert(o);

This is perhaps the most difficult of the code examples because you need to understand how `valueOf()` and `toString()` work. All objects have these two methods as they are defined on `Object.prototype` and inherited through the prototype chain (nitpickers will note that it's possible to have objects that don't inherit from `Object`, but I'm trying to keep this simple). These two methods get called behind-the-scenes all the time. The `valueOf()` method is called whenever comparisons are done and `toString()` is called whenever automatic conversion into a string is necessary. By overriding these methods, you can control the values they return in various circumstances.

  * **What is the value `result`?** The `valueOf()` method gets called behind-the-scenes here, so really the comparison is 10 < &#8220;9&#8243;. As you learned earlier, a comparison between a number and a string causes the string to be converted into a number, so the comparison ends up being 10 < 9, which is `false`.
  * **What is the value displayed in the alert?** Values passed into `alert()` are converted to strings, which means that `toString()` gets called. The alert, therefore, displays `"8"`.

## That's it!

I hope you've enjoyed this little JavaScript quiz and hopefully learned a thing or two.

**Update (18-Feb-2010):** Fixed typo in answer #1.

 [1]: https://humanwhocodes.com/blog/2010/02/16/my-javascript-quiz/
