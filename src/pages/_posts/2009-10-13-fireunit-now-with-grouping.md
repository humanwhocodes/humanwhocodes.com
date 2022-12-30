---
title: 'FireUnit: Now with grouping'
author: Nicholas C. Zakas
permalink: /blog/2009/10/13/fireunit-now-with-grouping/
categories:
  - Web Development
tags:
  - Firebug
  - FireUnit
  - Unit Testing
  - YUI Test
---
When I first got wind of John Resig's [FireUnit][1] extension for Firefox, I was very excited. JavaScript unit testing, and front-end testing in general, is an area of particular interest to me. It's so interesting that a couple of years ago I wrote [YUI Test][2] as a way to enable front-end testing in the browser. This past month, [YUI Test for YUI 3.x][3] was also released, updated with mock objects.

One of the things I never got around to with YUI Test was to create a useful console for outputting the results (both version use the built-in YUI Logger to display the results). The TestRunner object itself is event-driven, so it's fairly easy to create a different way of displaying test results. I thought FireUnit looked like a great way to display test results in a logical, out-of-the-page way.

## Basic usage

FireUnit is interesting in that it's both a console for displaying test results as well as a mini unit testing framework (John wrote a post on [basic FireUnit usage][4], so I'm not going to go too deep into it here). The extension embeds as part of Firebug, creating a new &#8220;Test&#8221; tab and exposing the `fireunit` object. This object is similar to `console` but interacts only with the Test panel.

The main method is `fireunit.ok()`, which accepts two arguments: a Boolean value and a string. The Boolean indicates if the test passed while the string provides a message to display. You can use this method either to run a simple test or to simply output a test result:

    fireunit.ok(true, "This test passed.");
    fireunit.ok(num == 2, "The number should be 2.");

In order to get the results to show up in the FireUnit console, you need to call `fireunit.testDone()`. Then, all of the information is beautifully displayed for your perusal.

## Tying to YUI Test

When I first saw this, I realized FireUnit could be used to output results from YUI Test by tying the `pass` and `fail` events to `fireunit.ok()`, which led me to create a [FireUnit extension for YUI Test][5]. The basic code was pretty simple:

    //Copyright 2008-2009 Nicholas C. Zakas. All rights reserved.
    //BSD license
    YAHOO.tool.FireUnit = function(){
    
        function handleEvent(event){
            switch(event.type){
                case "pass":
                    fireunit.ok(true, event.testName + " passed.");
                    break;
                case "fail":
                    fireunit.ok(false, event.testName + "failed: " + event.error.getMessage());
                    break;
                case "complete":
                    fireunit.testDone();
                    break;
            }
        }
    
        return {
    
            attach: function(){
                var testRunner = YAHOO.tool.TestRunner;
                testRunner.subscribe("pass", handleEvent);
                testRunner.subscribe("fail", handleEvent);
                testRunner.subscribe("complete", handleEvent);
            },
    
            detach: function(){
                var testRunner = YAHOO.tool.TestRunner;
                testRunner.unsubscribe("pass", handleEvent);
                testRunner.unsubscribe("fail", handleEvent);
                testRunner.unsubscribe("complete", handleEvent);
            }
        };
    
    }();

In order to attach to FireUnit, you just have to call `YAHOO.tool.FireUnit.attach()`, which sets up all of the appropriate event handlers.

## Grouping

I liked what I saw from FireUnit at this point, but I thought it was missing a major feature: grouping. Since most unit testing frameworks group tests into either test cases or test suites, or both, the ability to group the results of tests as noticeably missing. I asked John if he was planning on implementing such a feature and he said that if I'd like to implement it, he'd merge the changes in.

My initial thoughts about the API were to keep it simple and generic so that everyone could benefit, not just YUI Test. Since different unit testing frameworks use different grouping terminology, I looked to Firebug for inspiration. I ultimately decided to mimic the `console.group()` and `console.groupEnd()` and created `fireunit.group()` and `fireunit.groupEnd()`. The usage is almost exactly the same: `fireunit.group()` accepts a string that is the name of the group and begins a new section in the console while `fireunit.groupEnd()` doesn't have any arguments and simply closes out the section in the console. You can have as many nested groups as you'd like, which makes it easy to work with YUI Test test suites and test cases. Example usage:

    fireunit.ok(true, "Passing test result");
    fireunit.ok(false, "Failing test result.");
    
    //create first group
    fireunit.group("Group #1");
    fireunit.compare("expected data", "expected data",
        "Passing verification of expected and actual input.");
    fireunit.compare("<div>expected</div>", "<div>actual</div>",
        "Failing verification of expected and actual input.");
    fireunit.groupEnd();
    
    //create second group
    fireunit.group("Group #2");
    fireunit.compare("expected data", "expected data",
        "Passing verification of expected and actual input.");
    
    //create third group inside of second group
    fireunit.group("Group #3");
    fireunit.compare("expected data", "expected data",
        "Passing verification of expected and actual input.");
    fireunit.compare("<div>expected</div>", "<div>actual</div>",
        "Failing verification of expected and actual input.");
    fireunit.groupEnd();    //close third group
    fireunit.compare("<div>expected</div>", "<div>actual</div>",
        "Failing verification of expected and actual input.");
    fireunit.groupEnd();  //close second group
    
    fireunit.ok(false, "My test", 5, "5");
    
    // Finish test
    fireunit.testDone();

This code results in the following output in FireUnit:

<p style="text-align: center;">
  <img class="alignnone" title="FireUnit" src="http://i764.photobucket.com/albums/xx289/nzakas/blog/fireunit1.png" alt="" width="595" height="316" />
</p>

FireUnit now displays a hierarchical view of the groups so that you can expand/collapse to investigate the results. By default, the groups are open so you can see all of the tests that have been executed within a specific group.

## Other changes

Another thing I liked about FireUnit was the Compare tab that appeared whenever you used the `fireunit.compare()` method. This method does a comparison and creates either a passing or failing test based on whether two values are equivalent. YUI Test does this comparison as part of the test, and I really wanted to be able to use the Compare tab without needing to redo the comparison. To that end, I added two additional optional arguments to `fireunit.ok()`: an expected value and an actual value. If these arguments are provided, the Compare tab is displayed with the comparison. For example:

    fireunit.ok(false, "This test failed.", 1, "1");

This will cause the Compare tab to be displayed and will show that the number 1 is not equal to the string &#8220;1&#8243;. The main difference between this and `fireunit.compare()` is that the comparison has no bearing on the result of the test; it's purely informational. To make things a little bit easier, I also added the type of each result (via the `typeof` operator).

<p style="text-align: center;">
  <img class="alignnone" title="FireUnit" src="http://i764.photobucket.com/albums/xx289/nzakas/blog/fireunit2.png" alt="" width="595" height="316" />
</p>

## Working with YUI Test

With this addition to FireUnit, I've updated the FireUnit extension for YUI Test to make use of these grouping functionality. Since YUI Test is completely event-driven, adding this functionality was as easy as assigning more event handlers:

    //Copyright 2008-2009 Nicholas C. Zakas. All rights reserved.
    //BSD license
    
    YAHOO.tool.FireUnit = function(){
    
        function handleEvent(event){
            switch(event.type){
                case "pass":
                    fireunit.ok(true, event.testName + " passed.");
                    break;
                case "fail":
                    if (event.error instanceof YAHOO.util.ComparisonFailure){
                        fireunit.ok(false, event.testName + "failed: " + event.error.message, event.error.expected, event.error.actual);
                    } else {
                        fireunit.ok(false, event.testName + "failed: " + event.error.message);
                    }
                    break;
                case "testsuitebegin":
                    fireunit.group(event.testSuite.name);
                    break;
                case "testcasebegin":
                    fireunit.group(event.testCase.name);
                    break;
                case "testsuitecomplete":
                case "testcasecomplete":
                    fireunit.groupEnd();
                    break;
                case "complete":
                    fireunit.testDone();
                    break;
            }
        }
    
        return {
    
            attach: function(){
                var testRunner = YAHOO.tool.TestRunner;
                testRunner.subscribe("pass", handleEvent);
                testRunner.subscribe("fail", handleEvent);
                testRunner.subscribe("complete", handleEvent);
                testRunner.subscribe("testsuitebegin", handleEvent);
                testRunner.subscribe("testsuitecomplete", handleEvent);
                testRunner.subscribe("testcasebegin", handleEvent);
                testRunner.subscribe("testcasecomplete", handleEvent);
            },
    
            detach: function(){
                var testRunner = YAHOO.tool.TestRunner;
                testRunner.unsubscribe("pass", handleEvent);
                testRunner.unsubscribe("fail", handleEvent);
                testRunner.unsubscribe("complete", handleEvent);
                testRunner.unsubscribe("testsuitebegin", handleEvent);
                testRunner.unsubscribe("testsuitecomplete", handleEvent);
                testRunner.unsubscribe("testcasebegin", handleEvent);
                testRunner.unsubscribe("testcasecomplete", handleEvent);
            }
        };
    
    }();

By hooking into the events that are fired when testcases and testsuites begin and end, I'm able to call the `fireunit.group()` and `fireunit.groupEnd()` methods at the correct time and with the correct data to create the appropriate console output.

## Get the source

FireUnit is open source and can be forked from [John's GitHub repository][6]. I've also released my [FireUnit for YUI Test][7] extension as open source on GitHub. There are both YUI 2.x and YUI 3.x versions available. Note that the YUI 3.x version requires you to pass in the `TestRunner` object to the `attach()` and `detach()` methods (because there can be multiple instances on a page).

 [1]: http://www.fireunit.org
 [2]: http://developer.yahoo.com/yui/yuitest/
 [3]: http://developer.yahoo.com/yui/3/test/
 [4]: http://ejohn.org/blog/fireunit/
 [5]: {{site.url}}/blog/2008/12/19/fireunit-extension-for-yui-test/
 [6]: http://github.com/jeresig/fireunit
 [7]: http://github.com/nzakas/jstools/tree/master/yuitest-fireunit/
