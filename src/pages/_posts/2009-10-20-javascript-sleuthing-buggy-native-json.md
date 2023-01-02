---
title: "JavaScript sleuthing: Buggy native JSON"
author: Nicholas C. Zakas
permalink: /blog/2009/10/20/javascript-sleuthing-buggy-native-json/
categories:
  - Web Development
tags:
  - Debugging
  - JavaScript
---
Debugging is a huge part of any software engineer's life: something goes wrong, and it's your job to figure out what happened and how to fix it. The more time I spend debugging, the more I feel like a detective trying to tickle out details and evidence in order to determine what happened. Whenever I discover some obscure bug that was biting us, people often ask me how I figured it out. And so, I thought I'd start a series of posts based on some of the strangest bugs I've encountered in the hopes that it will help others to better understand how I work.

## The bug

Our service engineering team flagged an issue on our servers. Requests were coming in that were causing PHP errors. Whenever requests are causing server-side errors, the natural first place to look is at the access logs to see exactly what the request is. The bug that was filed showed a request in (roughly) the following format:

    /entry?someId={}&anotherId=27&foo=true&requestId={}

From this, it was clear to tell that the requests were invalid because both `someId` and `requestId` didn't actually contain identifying information, just curly braces. This was causing the server-side error as the PHP tried to use these invalid IDs. But why was this happening?

## The investigation

Normally when an invalid request is received, my first inclination is that it's some sort of attack. This has proven to be true in the past, but this didn't fit in which any attack pattern I'm familiar with. Every request came in with the same format instead of the usual incremental change pattern that most attackers use. So an attack was off the table. That meant the request was coming from our code.

The entrypoint used in the request is for Ajax requests only, meaning that it was JavaScript code that created the URL for the request. I could tell which part of the page was creating the request by the arguments in the query string. The engineer for that part of the page double-checked his code and confirmed that nothing had changed with the recent release. Since all of our Ajax requests go through a common Ajax component, that pointed to a change deeper down in the JavaScript application stack.

To try and figure out what was going wrong, I looked at a valid request being sent from the same part of the page. The request should be in the following format:

    /entry?someId=10&anotherId=27&foo=true&requestId=5

So almost every query string argument value is a number except for one. Interestingly, the Boolean argument value remained fine as did the value for `anotherId`.

My next stop was to check out the Ajax component to see if there had been any changes there. After a quick look through the checkin log, I determined that nothing had changed. This pointed to a problem even deeper in the JavaScript application stack. What had changed so deep in the stack?

At that point I realized that we had just upgraded to the latest [YUI 3][1] version in the previous release. Among the changes was a switch in the [JSON utility][2] to use the native `JSON` object if it's available in the browser.

## The theory

I reviewed the Ajax component code again and discovered that `JSON.stringify()` was getting called on all arguments before being added to the query string. This is done because the values could be arrays or objects. With the YUI upgrade fresh in my mind, I came up with my first solid theory about the problem: what if someone is using a browser whose native JSON implementation has a bug?

After thinking about it for a little while longer, I refined my theory to include what I believed to be the actual bug. I realized that not all numbers were being converted to {}, only some of them, and a quick look through the code made me realize that the missing numbers were most likely zero. My theory then became that there was a browser out there for which a call to `JSON.stringify(0)` returns &#8220;{}&#8221;.

## The proof

I began testing the browsers that I knew had native JSON support and came up empty; I couldn't reproduce the bug. Feeling a bit stumped, I asked a service engineer to pull the full request headers for the request in question. When he did, I saw something interesting in the user-agent string:

    Mozilla/5.0 (Windows; U; Windows NT 6.0; fr; rv:1.9.1b1) Gecko/20081007 Firefox/3.1b1

Fascinating. It looks like the person for whom this error is occuring is actually using Firefox 3.1 Beta 1. For those unaware, Firefox 3.1 became Firefox 3.5 after the third beta (i.e., there was no GA of Firefox 3.1). That means there's someone out there using Firefox 3.1 Beta 1 for some unknown reason. But is that the problem browser?

I asked our service engineer how often this error was occuring. He responded that it was fairly frequently. I couldn't imagine that there were that many people using Firefox 3.1 Beta 1, so I wasn't sure if that was the source of the problem or not. I asked him to pull out a few more of the problem requests, complete with request headers, so I could look across them. That confirmed that every user encountering this problem was, in fact, using Firefox 3.1 Beta 1.

But a good sleuth doesn't stop there. All I had proved was that all of the users were using the same browser. I hadn't provided the source of the issue. After a lengthy search, I was able to find a [Firefox 3.1 Beta 1 installer][3] on FileHippo. I installed the browser and added Firebug. I popped open the Firebug console and typed `JSON.stringify(0)`. The output was {}. Mystery solved.

## The aftermath

I reported the issue to YUI as something that should be address. In the short term, I patched our own version of the JSON utility so that it never uses the native `JSON.stringify()` method. I wasn't concerned about the performance impact of this decision since most of our users' browsers don't support JSON natively,Â  and we only serialize a very small amount of data. Consistency and the elimination of the error is far more important than the few milliseconds we save by using the native `JSON.stringify()` method.

 [1]: http://developer.yahoo.com/yui/3/
 [2]: http://developer.yahoo.com/yui/3/json/
 [3]: http://www.filehippo.com/download_firefox/4773/
