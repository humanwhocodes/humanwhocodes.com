---
title: Thoughts on script loaders
author: Nicholas C. Zakas
permalink: /blog/2010/12/21/thoughts-on-script-loaders/
categories:
  - Web Development
tags:
  - JavaScript
  - Loaders
---
Last week, Steve Souders released his [ControlJS][1] project. The goal of the project is to give developers more control over how and when JavaScript files are loaded and executed on a page. It does so by using [Stoyan Stefanov&#8217;s approach][2] of preloading JavaScript without executing it and has the pleasant side effect of enabling parallel downloads. For more details on usage, take a look at Steve&#8217;s [three][3] [blog][4] [posts][5].

The first blog post contains some criticisms in the comments from Kyle Simpson, the creator of [LABjs][6], another script loader. LABjs&#8217;s goal is a bit different than ControlJS: to enable parallel downloading of JavaScript files while maintaining execution order. To do so, LABjs needs to know which browsers allow parallel downloads by default and then provide other solutions for the browsers that don&#8217;t.

Both LABjs and ControlJS have a major problem: they&#8217;re using various browser detection techniques to determine the correct course of action to optimize script loading. Some have argued that LABjs&#8217;s browser inference is safer than ControlJS&#8217;s user-agent detection, but I disagree. Browser inference is feature detection plus assumptions and is an [inherently flawed approach][7] ([seriously][8]). Browser inference isn&#8217;t more accurate than user-agent detection, nor is it less likely to fail. I&#8217;m not saying that user-agent detection is a great thing, but at least it&#8217;s explicit in what it&#8217;s trying to detect. I choose explicit over implicit every time as it helps to prevent errors or, if errors occur, identify them faster. But this is a debate that&#8217;s tangential to the point of this post.

LABjs has already proven that this approach, browser-based forking of script loading techniques, is a [bad idea][9]. It&#8217;s just too fragile to withstand the onslaught of browser updates that we&#8217;ve been seeing, which is why I&#8217;ve never suggested using script loaders that try to outsmart the browser. Kyle faced a [serious issue][10] when Firefox 4 nightlies started showing up that broke the behavior of LABjs. The issue was that dynamically inserted script elements were no longer guaranteeing execution order, which was something LABjs relied on. The change was made to bring Firefox in alignment with the  HTML5 spec and other browsers. ControlJS will undoubtedly run into the same issue as browsers continue to evolve. Maintenance of such solutions comes at a high price.

## The real problem(s)

There has been some debate over what the real problem that LABjs and ControlJS are trying to solve. In truth, there are three problems represented by the libraries.

First, both are trying to enable parallel downloading of JavaScript resources. That&#8217;s a worthy goal but one that&#8217;s [already being handled][11] by newer browsers. Though it&#8217;s an academically interesting pursuit to try to squeeze out parallelization of JavaScript downloads in older browsers, I don&#8217;t believe it&#8217;s practically worthwhile. Browsers are already solving this problem for us, so script loaders aren&#8217;t needed to help there.

Second, LABjs is very focused on maintaining script execution order. With this comes an assumption: that you want to download multiple JavaScript files that have dependencies on one another. This is something I don&#8217;t recommend but I recognize that some people feel it&#8217;s important. ControlJS is not concerned with this. Either way, this is a problem that is not being handled in a rational way by browsers so if you want this behavior, you must use a script loader.

Third, ControlJS is very focused on separation of download and execution of JavaScript. Built into it is the idea that you should be able to download a JavaScript file and not execute it until a point in time determined by you. It&#8217;s an interesting concept and one that&#8217;s been through a lot of experimentation in the community (as Steve points out in his blog post). The assumption here is that your page is progressively enhanced such that JavaScript isn&#8217;t immediately needed. LABjs doesn&#8217;t address this problem. Browsers are also not helping with this.

## A call to arms

Though Kyle and I have differences of opinion on many things, I think he said it exactly right when he called for a common solution to problem #2. *We shouldn&#8217;t need script loaders*. There should be native ways to achieve all of the things developers need and want to do with JavaScript files. The script loaders have showed us the ways in which developers are trying to solve performance problems, and the logical next step is to have the browser vendors internalize these and come up with ways to solve them. Kyle put together a [lengthy examination][12] of the issues and proposals for how to address problem #2 (note: no one has come up with a proposal to solve problem #3). I&#8217;ll admit, Kyle asked for my feedback as this was going on, but I was very wrapped up in a few projects and didn&#8217;t have time to really dig in until now.

## async=false?

A proposal introduced by Kyle calls for a strange augmentation to the `async` attribute of `<script>` tags. The `async` attribute is a Boolean attribute, meaning that its very presence indicates the feature should be turned on, which also means that the attribute value is of no consequence. So the following three lines are equivalent:

    <script async src="foo.js"></script>
    <script async="true" src="foo.js"></script>
    <script async="false" src="foo.js"></script>
    

These act as HTML5 specifies: they begin to download immediately and execute as soon as they&#8217;re finished downloading without preserving order. In JavaScript, you can enable or disable this functionality by setting the corresponding async property on a script element:

    var script = document.screateElement("script");
    script.async = true;   //enable async per HTML
    

Under Kyle&#8217;s proposal, setting the `async` property on a script element *using JavaScript* would trigger a new mode. So the meaning of this code has changed:

    var script = document.screateElement("script");
    script.async = false;   //switch into new mode (WebKit nightly, Firefox 4)
    

Previously, setting `async` to false would have no effect. Now, setting `async `to false in supporting browsers makes the scripts download in a non-blocking manner while maintaining execution order.

While I applaud Kyle&#8217;s tenacity in pushing through to a proposal, I&#8217;m a bit baffled by this. To me, this code reads as &#8220;this script is not asynchronous&#8221; instead of &#8220;this script is asynchronous and please preserve the order.&#8221; Once again, I favor explicit over implicit to avoid errors.

An alternate proposal mentioned in his twiki is to create a `<scriptgroup>` element that logically groups script files together:

    <scriptGroup id="group1" ordered="true">
       <script src="foo.js"></script>
       <script src="bar.js"></script>
       <script>
         somethingInline();
       </script>
     </scriptGroup>
    

I actually like this proposal a lot. It&#8217;s explicit, there&#8217;s very little doubt as to what is going on here, and you could conceivably attach an event handler to the `<scriptgroup>` element that could tell you when all files have been loaded. It does introduce another element, but in the interest of clarity, I think this overhead is validated by the obviousness of the developer&#8217;s intent.

## Separate download and execution

There is still no good, consistent solution for separating download and execution of JavaScript, something that I think is very necessary. This isn&#8217;t just for the initial loading of script files on page load, but also for the dynamic addition of new code after the page is loaded. In my presentation, [Performance on the Yahoo! Homepage][13], I spoke about how we trickle in JavaScript after the page is loaded so that it&#8217;s ready when the user makes another action. The ability to preload JavaScript and execute later is absolutely becoming more important, and that&#8217;s really the problem that ControlJS is trying to tackle.

In an ideal world, I&#8217;d be able to do something along the lines of this:

    var script = document.createElement("script");
    script.type = "text/cache";
    script.src = "foo.js";
    script.onload = function(){
        //script has been loaded but not executed
    };
    document.body.insertBefore(script, document.body.firstChild);
    
    //at some point later
    script.execute();

That&#8217;s all I want. I don&#8217;t want to make a request to download a file and then make another request expecting that the file is in cache &#8211; that&#8217;s a very fragile solution to this problem. What I want is to download the file, have it sitting in cache, and then later just call a` ` method to run that code. This is what ControlJS is modeling.

## In the end

Both LABjs and ControlJS are attempting to solve the JavaScript loading problems in different ways. Kyle and Steve are both smart guys, pursuing their approaches for solving similar and slightly different problems. The good news is that we now have two script loaders that show the various ways developers are trying to load scripts on their pages, and hopefully that&#8217;s enough to get the browser vendors to come together and agree on longer-term native solutions so we won&#8217;t need script loaders in the future.

In the short-term, with apologies to both Kyle and Steve, I can&#8217;t recommend using either. While both illustrate interesting approaches to script loading, the reliance on browser detection means that they will require constant monitoring and updating as new browser versions come out. Maintenance is important in large web applications and these libraries presently add maintenance overhead that isn&#8217;t necessary.

I know this is a heated topic lately, so I&#8217;ll ask everyone to please try and keep your comments civil.

**Update (22 Dec 2010):** Changed description of how async=false works, as my original example incorrectly showed functionality working with markup when in fact it works only with script.

 [1]: http://stevesouders.com/controljs/
 [2]: http://www.phpied.com/preload-cssjavascript-without-execution/
 [3]: http://www.stevesouders.com/blog/2010/12/15/controljs-part-1/
 [4]: http://www.stevesouders.com/blog/2010/12/15/controljs-part-2/
 [5]: http://www.stevesouders.com/blog/2010/12/15/controljs-part-3/
 [6]: http://labjs.com
 [7]: {{site.url}}/blog/2009/12/29/feature-detection-is-not-browser-detection/
 [8]: https://twitter.com/getify/status/26109887817
 [9]: http://blog.getify.com/2010/10/ff4-script-loaders-and-order-preservation/comment-page-1/#comment-748
 [10]: http://blog.getify.com/2010/10/ff4-script-loaders-and-order-preservation/
 [11]: http://www.stevesouders.com/blog/2009/04/27/loading-scripts-without-blocking/
 [12]: http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
 [13]: http://www.slideshare.net/nzakas/performance-yahoohomepage
