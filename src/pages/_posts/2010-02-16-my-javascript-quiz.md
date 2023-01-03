---
title: My JavaScript quiz
author: Nicholas C. Zakas
permalink: /blog/2010/02/16/my-javascript-quiz/
categories:
  - Web Development
tags:
  - JavaScript
  - Quiz
---
Recently, there have been a couple of JavaScript quizzes floating around. There was one by [Dmitry Baranovskiy][1] (for which I [explained][2] the answers) and one by [Kangax][3]. But there are so many strange pieces of JavaScript that I thought I'd put together a quiz of my own. I've decided that each part will be a single code example followed by one or more questions. Once again, I don't think such quizzes are useful for job interviews, but they are fun to test the depths of your knowledge. Without further adieu, here it is (answers to follow by end of week).

## Example #1

    var num1 = 5,
        num2 = 10,
        result = num1+++num2;

Questions:

  * What is the value of `result`?
  * What is the value of `num1`?
  * What is the value of `num2`?

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

Questions:

  * What value is displayed in the alert?

## Example #3

    var num1 = "10",
        num2 = "9";

Questions:

  * What is the value of `num1 < num2`?
  * What is the value of `+num1 < num2`?
  * What is the value of `num1 + num2`?
  * What is the value of `+num1 + num2`?

## Example #4

    var message = "Hello world!";

Questions:

  * What is the value of `message.substring(1, 4)`?
  * What is the value of `message.substr(1,4)`?

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

Questions:

  * What is the value `result`?
  * What is the value displayed in the alert?

## That's it!

Whereas the other quizzes might have made your eyes cross trying to trace scope changes and the like, I wanted this one to be as dead simple as possible. The point? JavaScript is complex enough when written simply. Try to answer the questions without running the code. Answers with complete explanations will follow soon.

 [1]: http://dmitry.baranovskiy.com/post/91403200
 [2]: https://humanwhocodes.com/blog/2010/01/26/answering-baranovskiys-javascript-quiz/
 [3]: http://perfectionkills.com/javascript-quiz/
