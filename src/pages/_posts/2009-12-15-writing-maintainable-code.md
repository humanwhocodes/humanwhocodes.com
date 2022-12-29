---
title: Writing maintainable code
author: Nicholas C. Zakas
permalink: /blog/2009/12/15/writing-maintainable-code/
categories:
  - Web Development
tags:
  - CSS
  - JavaScript
  - Programming
---
Three years ago, I gave my first talk at Yahoo! entitled, [Maintainable JavaScript][1] ([slides][2]). The point of the talk was to encourage people to use more rigor in their JavaScript coding. A lot of people who write JavaScript for a living began as hobbyists and hackers, including myself. All of the best front end engineers are self-taught, of course, because this stuff hasn&#8217;t been taught in colleges and universities. I took the opportunity to simply point out that the same coding practices that are taught in traditional software engineering programs can also be applied to JavaScript. And of course, I threw in some of my own personal findings gathered through years of web development.

## What is maintainable code?

In the presentation, I said that maintainable code has the following qualities:

  * Understandable
  * Intuitive
  * Adaptable
  * Extendable
  * Debuggable

I&#8217;d also now like to add &#8220;Testable&#8221; as a sixth quality of maintainable code. As I thought about this more recently, I realized that all six of these qualities really boil down to a single concept: don&#8217;t be confusing.

Confusing code doesn&#8217;t embody these qualities and makes everyone&#8217;s job harder. Over the years, we&#8217;ve become better at identifying bad code. Bad code causes runtime problems, whether they be actual thrown errors, performance bottlenecks, or accessibility issues. Bad code is typically identified by bugs that require spot changes to code for a remedy. Confusing code is more insidious.

It&#8217;s hard to uncover confusing code without context. Any single line or series of lines of code, when examined in a vacuum, is confusing. Context is what determines if that code is confusing or not. That necessarily means that the only way to uncover confusing code is by thorough review.

Anyone who&#8217;s worked with me knows my passion for code reviews, as I believe they are the best way to not only catch more esoteric issues but also as a way to socialize best practices within a group. Code reviews are never at the top of anyone&#8217;s &#8220;to do&#8221; list, but they are vitally important. When confusing code is shown in the light of day, it&#8217;s much easier to identify and fix. What&#8217;s more, when a group of people are looking at confusing code, they can all agree that it&#8217;s confusing and come up with a common way to fix it.

## Confusing JavaScript

Confusing code comes in many forms but has an overriding quality: it&#8217;s hard to tell if it&#8217;s intentional or a mistake. JavaScript is the easiest of the three (JavaScript, CSS, and HTML) within which confusing code exists. A classic example:

    switch(type){
        case "string":
            handleString(value);
        case "number":
            handleNumber(value);
        default:
            handleValue(value)
    }

This code looks innocuous enough. Decent engineers will look at this code and say, &#8220;hey, each case statement is missing a break.&#8221; If you were fixing code in the same file, you might even be inclined to help out and just add a `break` after each case. But are you sure there&#8217;s an error here? How do you know that the developer didn&#8217;t intentionally omit the `break` in each case? There&#8217;s really no way to tell, so you could be *creating* a bug by fixing this code, but for all you know, this code could be already causing a bug that you could fix. This is confusing code.

How do you make it into good code? By providing context. In this case, the surrounding code doesn&#8217;t provide enough context, so adding a comment is the best way to go. For example:

    switch(type){
        case "string":
            handleString(value);
            /*falls through*/
        case "number":
            handleNumber(value);
            /*falls through*/
        default:
            handleValue(value)
    }

This code is much less confusing. You know that the intent is for each case to fall through to the next, so you won&#8217;t accidentally fix this code when you come across it. Further, if your team agrees that this is the pattern to use in these situations, then you know that each case statement must be terminated by a `break`, `return`, `throw`, or a `/*falls through*/` comment. If a `case` statement doesn&#8217;t end with one of those, then it&#8217;s likely an error and should be filed as a defect.

### JSLint

In case you somehow haven&#8217;t heard, [JSLint][3] is a tool created by Douglas Crockford to validate JavaScript code. It&#8217;s described as a tool to help identify bad code, which it does, but it also identifies confusing code. In fact, it identifies more types of confusing code than it does bad code. What exactly qualifies as confusing code is subjective, and Crockford and I are not in agreement on 100% of the things that JSLint points out, but this is still the best tool available to help identify potentially confusing code in additional to bad code.

## Confusing CSS

Don&#8217;t be fooled, confusing code can exist in the other layers of a web application as well. CSS has some interesting syntactic issues that could lead to confusion. For example, the padding property can have one, two, three, or four parts to its value:

    /*same padding all around*/
    padding: 10px;
    
    /*padding for top/bottom, different padding for left/right*/
    padding: 10px 20px;
    
    /*padding for top, different padding for left/right, different padding for bottom*/
    padding: 10px 20px 15px;
    
    /*different padding for top, right, bottom, and left*/
    padding: 10px 20px 15px 25px;

Some will say that all of these are fine and not confusing. Personally, I find the third option quite confusing, as it&#8217;s not clear that you intended for a different bottom padding. You might have meant to use two or four parts. This form is also the least intuitive of all the options. There&#8217;s a couple of easy ways to disambiguate. The first is to agree to always use one, two, or four parts for properties such as `padding`. This has the pleasant side effect of really making you stop and think if you need just one dimension to be different. Here&#8217;s how this looks:

    /*Don't use*/
    padding: 10px 20px 15px;
    
    /*Better*/
    padding: 10px 20px 15px 20px;

Even though you end up using the same value for the right and left parts, I&#8217;d argue that it&#8217;s easier to tell that the result is intended. Another option is to always use the specific padding property for the one-off dimension, such as:

    /*Don't use*/
    padding: 10px 20px 15px;
    
    /*Better*/
    padding: 10px 20px;
    padding-bottom: 15px;

Both this and previous example have the advantage of making this decision explicit: you *meant* to change just one dimension of padding and therefore, it must be correct.

## Beware of confusing code

Confusing code is the second-worst (next to bad code) type of code to have in your source because it can introduce subtle errors that can go unnoticed for long periods of time. I like to say that code is like rabbits: it multiplies when you&#8217;re not looking. If there&#8217;s one instance of confusing code in your system, it doesn&#8217;t take very long before there are two. That&#8217;s because of the natural flow of a software project. Someone is looking for an example of how to do something new and they come across the confusing code. The confusing code gets copied and now there are two instances in the source. The next time someone goes looking for an example, they&#8217;re twice as likely to find the confusing code as an example (and of course, finding two examples of the same approach validates the approach in the seeker&#8217;s mind).

The same is true with good, maintainable code. The more examples of good code that are in source, the more likely that others will copy it. And that&#8217;s what you want.

 [1]: http://video.yahoo.com/video/play?vid=568351
 [2]: http://www.slideshare.net/nzakas/maintainable-javascript-1071179
 [3]: http://www.jslint.com/
