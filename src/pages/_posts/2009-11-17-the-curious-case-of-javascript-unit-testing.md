---
title: The curious case of JavaScript unit testing
author: Nicholas C. Zakas
permalink: /blog/2009/11/17/the-curious-case-of-javascript-unit-testing/
categories:
  - Web Development
tags:
  - Continuous Integration
  - JavaScript
  - Rhino
  - Unit Testing
  - YUI Test
---
JavaScript unit testing, and front-end testing in general, is a fascinating topic to me. Coming from a job where I developed in Visual Basic.NET and used nUnit for testing, I instantly fell in love with unit testing. Not too long ago I created the YUI Test JavaScript testing framework (for [YUI 2.x][1] and [YUI 3.x][2]) to try and bring the same sort of capabilities to the web browser. I&#8217;ve both [written][3] [about][4] and [spoken][5] [about][6] applying unit testing in JavaScript over the past couple of years. Still, it remains a realm that hasn&#8217;t properly been explored let alone conquered with best practices. So what&#8217;s the problem?

## The problem

To sum up, the problem is the browser. Or rather, the problem is that there are so many browsers and they all have their quirks. Languages that are traditionally great for unit testing all run in a common, and stable, runtime environment where the effects (and side effects) of certain actions are well understood. JavaScript doesn&#8217;t have that luxury.

JavaScript written for web applications tends to also have many dependencies. JavaScript alone isn&#8217;t useful on the Web, it&#8217;s only useful when combined with HTML and CSS and through the use of the DOM and the BOM ([definitions][7]). So not only do you have to worry about the differences in JavaScript engines (just look at [Microsoft&#8217;s deviations][8] from the ECMAScript standard), you also have to worry about differences in the way that a page renders and how you can access and manipulate DOM elements. That alone makes the task of testing JavaScript incredibly daunting.

## The spirit of unit testing

At it&#8217;s core, [unit testing][9] is supposed to test a single atomic &#8220;unit&#8221; of functionality without dependencies on anything else. Dependencies are important to eliminate because a failure in a dependency can incorrectly show up as a failure in the unit you&#8217;re testing. For example, if a call to `JSON.stringify()` returns the wrong value, that&#8217;s not the fault of your code. Your code always expects `JSON.stringify()` to work correctly and return the correct value, and if it doesn&#8217;t, that&#8217;s an error outside of your control.

JavaScript&#8217;s dependent nature in the browser makes it difficult to accomplish true unit testing on anything but the lowest-level utility functions. JavaScript libraries are actually fairly easy to unit test because each method typically does one discrete operation given a certain set of inputs. The JavaScript library code doesn&#8217;t have any business logic or direct knowledge of the relationship between DOM elements, CSS, and the JavaScript itself. That&#8217;s why libraries such as [YUI][10] have such comprehensive unit test suites: the tests are pretty easy to write and then execute.

The larger problem is unit testing JavaScript code that runs web applications. This is where you start to run into serious dependency problems due to the interrelation HTML and CSS. The JavaScript code isn&#8217;t simply manipulating data; it&#8217;s expected to run within the web application environment. To do true unit testing, you would need to stub out the entire web application environment just to get the code to execute. And then, what do you test? A lot of the time you&#8217;re testing how the user interface responds to user input, which means you&#8217;re actually starting to cross over into the realm of functional testing (also called [system testing][11]).

## How to help yourself

The best way to start down the path of JavaScript unit testing is to write code in a way that&#8217;s as testable as possible. I touched on this in my recent talk, [Scalable JavaScript Application Architecture][12] ([slides][13]), and in my now-quite-old talk, [Maintainable JavaScript][14] ([slides][15]). The primary goal is to eliminate dependencies wherever possible, and you can do this in a number of ways:

  * **Don&#8217;t use global variables.** Anytime you need to test something that uses global variables, you need to recreate all of them just so the code will run. Save yourself the trouble.
  * **Don&#8217;t modify objects that don&#8217;t belong to you.** That goes for native object prototypes. Once again, this creates environmental dependencies that need to be recreated when you want to test the code.
  * **Create small pieces of functionality. **The more atomic the pieces of your code are, the less environmental dependencies they will have. Try to group functionality together logically and in a way that allows you to pass in the necessary data instead of expecting it to be in a particular location.
  * **Rely on a library for core functionality. **The library acts as an abstraction between your code and the environment, making it easier to stub or mock out functionality to eliminate dependencies.

## Run tests in the browser

Assuming you&#8217;ve written your code in a modular way and now have good tests written, the next step is to run them. I can&#8217;t stress enough how important it is to run JavaScript code *inside the browser*. In fact, the more browsers you can run the tests in, the better off you&#8217;ll be. I&#8217;d highly recommend starting with the [A-grade browsers][16] at a minimum.

Periodically, I get asked for help in running JavaScript unit tests on the command line using [Rhino][17]. While it is possible, I strongly recommend *against* doing this. If your JavaScript is intended to run in a web browser, then it should be tested in a web browser. Rhino is a completely different environment than any browser and, in fact, isn&#8217;t the JavaScript engine for any existing browser (it is a Java port of SpiderMonkey, the C-based library that was the JavaScript engine for Firefox prior to version 3.5). Testing JavaScript code in Rhino only tells you that the code works in Rhino, it does not tell you that the code runs in any browser.

Some folks have gone through a lot of trouble to try and bring command line JavaScript unit testing into the world. John Resig created [env.js][18], a JavaScript utility that builds out a lot of the common browser environment in Rhino. As interesting as that is, you&#8217;re once again dealing with a browser environment that doesn&#8217;t exist in the wild. I have seen tests that work perfectly fine in all browsers and fail miserably in an env.js-powered Rhino environment. There&#8217;s no real value in testing code in an environment into which it won&#8217;t ultimately be deployed.

Even scarier is [Crosscheck][19], a Java-based system that claims to test your code in several browsers without actually using the browser. Created by The Frontside Software, Inc., Crosscheck tries to recreate the browser environment of Internet Explorer 6, Firefox 1, and Firefox 1.5 in Java. As you might have expected, Crosscheck relies on Rhino as it&#8217;s JavaScript engine and then proceeds to build out each browser environment. An ambitious idea, for sure, but now you&#8217;re going one step further away from the truth: you&#8217;re relying on someone else&#8217;s understanding of browser quirks on which to base your tests. I&#8217;ve been in web development for a long time, but even I couldn&#8217;t sit down and list out every browser quirk. The result is that you&#8217;re testing in several mythical browser environments that have no real correlation to reality.

I&#8217;ll repeat, JavaScript code designed to be run in web browsers should be tested in web browsers. All code should be tested in the environment in which it is to be deployed. If your JavaScript code will be deployed to Rhino, then by all means, test in Rhino. But that&#8217;s the only reason you should test your JavaScript code in Rhino (or any other command line JavaScript engine).

## It&#8217;s the automation, stupid

The real reason that command line tools keep trying to appear is for the purposes of automation. When the developer is sitting in front of his computer and running tests in browsers, the unit testing process is pretty simple. But that&#8217;s terribly redundant and, of course, boring. It would be much easier if the tests were automatically run periodically and the results were recorded. Really, the command line appeal is integrate test running into a [continuous integration][20] (CI) system.

The two CI systems I hear the most about are [CruiseControl][21] and [Hudson][22]. Both work in a similar manner, periodically running a series of tasks related to your build. They are capable of checking out code, running scripts, and of course, executing command-line operations. Command-line utilities fit perfectly into these systems because the output can easily be monitored for completion and errors. This represents a major problem since most of the browsers people use are GUI-based ([Lynx][23] is still around, though).

Fortunately, there is another movement of JavaScript testing focused on command line-initiated yet still browser-based testing. Leading the charge is [Selenium][24], a tool primarily designed for functional testing is generally useful in that it can be run from the command line and can execute JavaScript inside of a browser. This means that, from the command line, you can use Selenium to fire up a browser, navigate to a particular page, run JavaScript commands, and inspect what happens to the page. What&#8217;s more, you can use [Selenium Remote Control][25] to fire up any number of browsers and perform the same tests. These results can be passed back into the command line interface, creating a seamless integration with CI systems. This is an area in which I&#8217;m currently doing more research. Stay tuned!

Another interesting tool that recently popped up is [TestSwarm][26]. TestSwarm&#8217;s approach is different than that of Selenium. Instead of manually starting browsers and navigating them to a page, TestSwarm relies on browsers to already be set up and attached to the TestSwarm server. The browsers can then poll the server to see if there are any new jobs that must be processed. The advantage is that you can add new browsers simply by opening a browser and pointing it to the TestSwarm server. Since the browsers are very loosely coupled to the system, upgrading to include new browsers is ridiculously simple.

TestSwarm also enables the [crowd sourcing][27] of tests. Anyone who wants to help test a product can joined a swarm and volunteer to leave the browser open for testing.

## The future

The problem of JavaScript unit testing isn&#8217;t really close to being solved at this point. Web developers, as a whole, have made significant progress over the past two years in bringing unit testing to the forefront of the web development discussion. At this point, all major JavaScript libraries have accompanying JavaScript unit testing frameworks, which is a great sign.Â  Still, the small amount of tools is a good indicator of the infancy this discipline is currently experiencing.

As I stated earlier, this is an area that I&#8217;m currently researching heavily, both inside and outside of Yahoo!. I&#8217;m hoping to make significant progress over the next year and share my findings with everyone.

 [1]: http://developer.yahoo.com/yui/yuitest/
 [2]: http://developer.yahoo.com/yui/3/test/
 [3]: http://yuiblog.com/blog/2008/12/01/yuitest-getting-started/
 [4]: http://yuiblog.com/blog/2009/01/05/effective-tests/
 [5]: http://video.yahoo.com/watch/3737228/10267335
 [6]: http://www.slideshare.net/nzakas/test-driven-development-with-yui-test-presentation
 [7]: {{site.url}}/blog/2009/09/29/web-definitions-dom-ajax-and-more/
 [8]: http://wiki.ecmascript.org/lib/exe/fetch.php?id=resources%3Aresources&cache=cache&media=resources:jscriptdeviationsfromes3.pdf
 [9]: http://en.wikipedia.org/wiki/Unit_testing
 [10]: http://developer.yahoo.com/yui
 [11]: http://en.wikipedia.org/wiki/System_testing
 [12]: http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
 [13]: http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 [14]: http://video.yahoo.com/video/play?vid=568351
 [15]: http://www.slideshare.net/nzakas/maintainable-javascript-1071179
 [16]: http://developer.yahoo.com/yui/articles/gbs/
 [17]: http://www.mozilla.org/rhino/
 [18]: http://ejohn.org/blog/bringing-the-browser-to-the-server/
 [19]: http://www.thefrontside.net/crosscheck
 [20]: http://en.wikipedia.org/wiki/Continuous_integration
 [21]: http://cruisecontrol.sourceforge.net/
 [22]: https://hudson.dev.java.net/
 [23]: http://lynx.isc.org/
 [24]: http://seleniumhq.org/
 [25]: http://seleniumhq.org/projects/remote-control/
 [26]: http://testswarm.com/
 [27]: http://en.wikipedia.org/wiki/Crowdsourcing
