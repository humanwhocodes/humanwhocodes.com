---
title: 'Maintainable JavaScript: Don&#8217;t modify objects you don&#8217;t own'
author: Nicholas C. Zakas
permalink: /blog/2010/03/02/maintainable-javascript-dont-modify-objects-you-down-own/
categories:
  - Web Development
tags:
  - JavaScript
  - Maintainable
---
The first talk I gave after arriving at Yahoo! was entitled [Maintainable JavaScript][1] ([video][2]). As with most topics I write or speak about, I didn&#8217;t think it would be terribly controversial. The basis of the talk is that hacking around on your own and writing code in an enterprise environment are two different things. Web developers are truly unique in that none of us learned what we know in school; we all began as hobbyists one way or another and taught ourselves most (if not all) of what we know.

## Professionalization

The professionalization of web development has been a difficult journey because of our disparate beginnings. Even those who end up at large companies such as Yahoo! inevitably began on their own, hacking around. Perhaps you were even &#8220;the web guy&#8221; at a small company and could do pretty much whatever you wanted. When the large companies started tapping this previously undiscovered resource, it brought a lot of hackers into a corporate environment where they were met with constraints. No longer a lone soldier in a small battle, all of these self-taught, self-directed individuals had to figure out how to work together as a team.

At the time that I gave the talk (2007), web development was evolving into front-end engineering and people were having trouble with the transition. Smart folks like Nate Koechley talked about the [professionalization of front-end engineering][3] ([video][4]) and how our discipline was evolving. My talk was aimed at the same goal: helping front-end engineers adapt to JavaScript development in a team environment by making sure that their code was as maintainable as possible.

## Why can&#8217;t I modify objects I don&#8217;t own?

I still gets email and comments about Maintainable JavaScript, and the most popular question is, &#8220;why can&#8217;t I modify objects I don&#8217;t own?&#8221; JavaScript is, of course, a dynamic language that allows you to add and remove objects and their members at any point in time. For many, this is precisely why they enjoy the language: there are very few constraints imposed by the language. And I was telling them not to do this. Why?

### Dependability

The simple explanation is that an enterprise software product needs a consistent and dependable execution environment to be maintainable. In other languages, you consider already-existing objects as libraries for you to use in order to complete your task. In JavaScript, people saw already-existing objects as a playground in which you could do anything you wanted. My point was that you should treat the already-existing JavaScript objects as you would a library of utilities. Don&#8217;t override methods, don&#8217;t add new methods, don&#8217;t remove existing methods.

When you&#8217;re the only one working on a project, it&#8217;s easy to get away with these types of modifications because you know them and expect them. When working with a team on a large project, making changes like this cause mass confusion and a lot of lost time. I still remember a bug that occurred while working on [My Yahoo!][5] because someone had overridden `YAHOO.util.Event.stopEvent()` to do something else. It took days to track this problem down because we all assumed that this method was doing exactly what it always did. Once we discovered this, we also found other bugs because the same method was being used in other places with its original intended usage&#8230;but of course, it wasn&#8217;t behaving in that way. Unraveling this was an incredible mess and I&#8217;d be very happy if no engineers ever had to go through a similar exercise.

### Incompatible implementations

But developer confusion isn&#8217;t the only problem. Another peril of modifying objects that you don&#8217;t own is the possibility of naming collisions and incompatible implementations. Take a lesson from the history of the [Prototype][6] JavaScript library. John Resig [wrote about this][7] a while ago, so I&#8217;ll just quickly summarize. Prior to version 1.6, Prototype implemented its own `document.getElementsByClassName()` method long before it was part of HTML5 and long before any browser thought about implementing it natively. In addition, Prototype also added the `each()` method to `Array` objects. Thus, users of the Prototype library began writing code such as:

    document.getElementsByClassName("myclass").each(doSomething);

This wasn&#8217;t a problem until the native `document.getElementsByClassName()` method was implemented. While Prototype&#8217;s version returned an instance of `Array`, the native implementation returns a `NodeList` object. Since `NodeList` doesn&#8217;t have an `each()` method, either natively or added by Prototype, the above coding pattern caused a JavaScript error when executed in browsers that had a native implementation of `document.getElementsByClassName()`. The end result is that users of Prototype had to upgrade both the library code and their own code; what a maintenance nightmare.

## What if everyone did it?

Looking at a few isolated examples doesn&#8217;t really represent the enormity of the maintenance problem when you modify objects that you shouldn&#8217;t. To understand this point of view, it&#8217;s helpful to take a step back and look at [moral philosophy][8] (aka ethics). Moral philosophy is all about determining if an action is moral. There are many schools of thought on the topic, but I point towards a favorite modern philosopher, [Immanuel Kant][9].

While I don&#8217;t want to get too deeply into moral philosophy and open this up for philosophical debate, Kant was famous for trying to determine &#8220;universal law&#8221; as the basis for moral action. In short, you can determine if an act is moral by asking, what would happen if everyone did it? For example, what if everyone cheated on a test? In that case, the test becomes useless, so this must not be a moral action.

Applying this same line of reasoning to the topic at hand, what if everyone on your team started modifying objects that they didn&#8217;t own? What if I went in and made modifications to `document` and so did everyone else on my team? What if everyone on the team created their own global variables? I hope that it&#8217;s obvious just how detrimental these actions could be to a team development environment.

Simply put: if everyone on your team modified objects that they didn&#8217;t own, you&#8217;d quickly run into naming collisions, incompatible implementations, and maintenance nightmares.

As a side note, I find Kant&#8217;s question incredibly relevant to any system that must scale. &#8220;What if everyone did it?&#8221; can really save you some trouble when considered as part of a technical design.

## Conclusion

Maintainable code is code that you don&#8217;t need to modify when the browser changes. You don&#8217;t know how browser developers will evolve existing browsers and the rate at which those evolutions will take place. The code you write needs to continue working in future browsers and with future versions of JavaScript libraries without modification, and you cannot ensure that when you&#8217;re modifying objects that you didn&#8217;t create in the first place. The only code you can be certain will remain the same is the code you write yourself.

I can&#8217;t state this strongly enough: your code is not maintainable when it requires modifications to objects you didn&#8217;t create. Stepping down that path only leads to maintenance nightmares going forward.

P.S. If you&#8217;re interested in learning more, check out my presentation on [Scalable JavaScript Application Architecture][10] ([video][11]).

 [1]: http://www.slideshare.net/nzakas/maintainable-javascript-1071179
 [2]: http://video.yahoo.com/video/play?vid=568351
 [3]: http://www.slideshare.net/natekoechley/professional-frontend-engineering
 [4]: http://video.yahoo.com/watch/4671445/12486762
 [5]: http://my.yahoo.com
 [6]: http://prototypejs.org/
 [7]: http://ejohn.org/blog/getelementsbyclassname-pre-prototype-16/
 [8]: http://en.wikipedia.org/wiki/Ethics
 [9]: http://en.wikipedia.org/wiki/Immanuel_Kant
 [10]: http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 [11]: http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
