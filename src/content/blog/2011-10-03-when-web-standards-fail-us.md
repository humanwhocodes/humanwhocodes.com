---
title: When web standards fail us
author: Nicholas C. Zakas
permalink: /blog/2011/10/03/when-web-standards-fail-us/
categories:
  - Personal
tags:
  - HTML
  - HTML5
  - JavaScript
  - TC39
  - W3C
  - Web Standards
---
From time to time, web developers rise up and grumble more loudly about the failings of the W3C and ECMA for the ways they choose to evolve (or not evolve) the technologies of the web. We talk about design by committee as a failure, browser vendors should just implement and not worry about it&#8230;unless it's Microsoft, they should never do anything without asking someone else first&#8230;and whether or not there is a better, faster way to create change. I'm actually less concerned about organizational structure than I am about these groups' lack of focus. 

## The big problem

I have a bias when it comes to problem solving: once a problem is solved, I don't want to have to solve it again. When the problem is well-defined and the solution is understood and accepted, I want that to be *the* solution and move on to solving newer problems.

Each web standard committee has a single job, and that is to solve problems in their focus area. The committees seem to have trouble defining the problems they want to solve. To be fair, fully defining a problem is often the most complicated part of solving it. However, there are two sets of problems to select from and there are many problems that have yet to be addressed despite years of history. 

## Design for today, design for tomorrow

From speaking with various people who work on web standards, there are basically two types of problems they attempt to solve: the problems of today and the problems of tomorrow. The problems of today are known entities. The entire problem context is well known and developer-created solutions already exist. The problems of tomorrow are a bit more esoteric. These problems may not have yet been encountered by developers but the standards want to provide for their eventuality. 

To be certain, both problem sets deserve their due time and diligence, and everything from HTML5 to ECMAScript 5 solves some problems of today while also addressing some problems of tomorrow. The `getElementsByClassName()` method and the Selectors API solved the problem of developers wanting to query the DOM by CSS classes and use CSS queries &#8211; both were already ubiquitous amongst JavaScript libraries. The Cross-Document Messaging API solved the problem of secure cross-frame communication where otherwise developers were using multiple embedded iframes just to pass data back and forth. ECMAScript 5 finally introduced the official way to assign getter and setters as well as controlling property enumerability. All of these were problems of today that were well understood and fairly quickly turned into officially supported APIs.

The problems of tomorrow are often centered around doing things on the web that aren't yet being done. I like to call this to Photoshop-on-the-web problem. It goes something like this: given that I someday want to write Photoshop as a web application, what would I need to make that happen? First, I would need some way to manipulate pixel data directly (solved by canvas). Then, I would need some way to crunch a lot of data without freezing the browser UI (solved by web workers). Of course, I would need to be able to read files directly from the desktop (solved by the File API). 

You may be saying at this point, &#8220;but I do want to do that now!&#8221; That's fine, but these APIs came about before today. It's inevitable that some problems of tomorrow will become problems of today, but some may not. Do we really need databases in the browser, or are simple key-value stores enough? Only the future will tell.

## Unsolved problems of today

As I said, it's definitely important to spend time both solving problems of today and looking forward at potential future problems that will trip people up. What I absolutely can't stand is the way web standards committees frequently overlook problems of today in favor of spending time on problems of tomorrow. If a problem is well-defined and affecting a large number of developers, let's solve that problem so no one ever has to re-solve it. There are a lot of problems that we've been dealing with a for long time and no one seems interested in addressing them. To me, this is the biggest failing of web standards: failure to allow developers to move on to more interesting problems.

Here's a list of current problems that are not yet solved:

  * **Cookie reading/writing in JavaScript** &#8211; Netscape gave us `document.cookie`. It hasn't changed at all since then, meaning anytime anyone wants to read from or write to a cookie, they must do all of the string formatting themselves. We've been writing JavaScript cookie libraries for the past 15 years and we still need them because the API never changed to reflect what we're actually doing. This is a glaring failure in the evolution of the web.
  * **JavaScript string formatting** &#8211; we've known for a decade that we need to be able to escape text for HTML and regular expressions, and that we have a need for general string formatting similar to `sprintf()`. Why is this not a solved problem? Why do we each have to rewrite such functionality over and over again? The next version of ECMAScript will apparently have a feature called [quasis][1] that tries to solve all problems using the same (new) syntax. I really don't like this because there's no backwards compatibility for what is a set of solved problems in the world of computer science. We're not breaking new ground here, an `htmlEscape()` method would be a great start, or implement `String.format()`. Something sane.
  * **JavaScript date formatting** &#8211; once again, a problem that has existed for over a decade. Why can't I easily do date formatting in JavaScript? Java has had this capability for a while, and it's not horrible. Why are we stuck still writing date formatting libraries?
  * **Common UI paradigms** &#8211; this one really bugs me. For the past decade, we've all been writing a ton of JavaScript to make the best UI controls. The controls have become ubiquitous in JavaScript libraries and often require a ton of code to make them work correctly. Why aren't there HTML tags that allow me to create these common UI paradigms: 
      * **Tabs** &#8211; how many more times do we need to create JavaScript for a tabset? There are even ARIA roles to markup HTML to be tabs, why can't we have some tags whose default behavior is to use those roles? I am very tired of creating ever-newer versions of tabs.
      * **Carousels** &#8211; a very popular control that is little more than a `<marquee>` tag that stops and starts periodically based on user interaction. There are few sites you can go to that won't have at least one carousel on the page. And having written a few, it's always a pain. Why can't this just be part of HTML?
      * **Accordions** &#8211; nothing magical here. Very close to the HTML5 `<details>` element behavior. Why can't I have this natively?
      * **Trees** &#8211; another decade-long invention that we've still not standardized. In fact, my second-ever published article was about [creating an expandable tree][2]&#8230;that was in 2002. ARIA also has roles to represent trees, so why not have an HTML-native version?
  * **JavaScript touch events** &#8211; even though touchscreen technology is relatively new, there quickly emerged some common patterns that would be nice to have standardized. Why do I need to decipher multiple `touch` events to figure out what the user is doing? Why aren't there events for `swipe`, `flick`, `tap`, and `pinch`? I don't want to need a PhD in computer science to be able to program for the touch-enabled web.

## Conclusion

I'm all for moving forward, and don't get me wrong, both TC-39 and the W3C have done a commendable job at solving many of today's problems. I'd just like to see more addressed so that we can stop solving the same problems repeatedly over the next decade. In another ten years, I don't want to be writing JavaScript to parse a cookie string, and I don't want to be debating the best way to create a tab control. These are all known problems that deserve attention now so that we can move on to solving more interesting problems in the future.

 [1]: http://wiki.ecmascript.org/doku.php?id=harmony:quasis&s=functions
 [2]: http://www.webreference.com/programming/javascript/trees/
