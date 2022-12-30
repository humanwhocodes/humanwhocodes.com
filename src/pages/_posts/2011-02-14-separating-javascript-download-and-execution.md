---
title: Separating JavaScript download and execution
author: Nicholas C. Zakas
permalink: /blog/2011/02/14/separating-javascript-download-and-execution/
categories:
  - Web Development
tags:
  - Feature Detection
  - JavaScript
  - Performance
---
Not too long ago, I wrote  a post entitled, Thoughts on script loaders<sup>[1]</sup>, in which I discussed my thoughts on the continuing introduction of script loaders such as LABjs and ControlJS. In that post I also mentioned what I thought was the main problem that led to existence of these libraries. That problem is the inability of the developer to control the download of JavaScript files as separate from its execution.

After a conversation with Steve Souders about ControlJS, I put together a proposal for a delayed script execution model in browsers<sup>[2]</sup>. I reviewed this with Jonas Sicking and Boris Zbarsky from Mozilla as well as Tony Gentilcore from WebKit, where we had a nice go-around about actual use cases and possible solutions aside from mine. Ultimately, the consensus was that the issue should be brought up on the WHAT-WG mailing list to get a wider group of opinions, and so I initiated  that thread<sup>[3]</sup>. But before diving into that discussion, it's helpful to understand the problem.

## Background

Traditionally, JavaScript execution immediately followed download of the external JavaScript file. This is exactly how the `<script>` element works in markup. There's also the unfortunate side effect that `<script>` in markup causes the browser to block rendering (and other resource downloads in older browsers). Because most JavaScript isn't necessary until at least the entire HTML page has been downloaded, the addition of the `defer` attribute was the first attempt to separate JavaScript download from execution.

As a recap, adding `defer to a ``<script>` causes JavaScript to download immediately but hold off on executing until the entire DOM has been loaded (before `DOMContentLoaded`). Multiple scripts marked with `defer` preserve the order of execution. The most important part of `defer` is that downloading of external JavaScript doesn't block rendering or downloading of additional resources. Since `defer` was only supported in Internet Explorer, it was rarely used.

Developers discovered that creating a script element dynamically using JavaScript caused a different behavior. Downloading of an external JavaScript using this pattern did not block rendering or other downloads, and then the script executed immediately upon download. Multiple scripts loaded in this manner may or may not retain their order of execution across browsers (most did not retain order, Firefox did).

HTML5 introduced the `async` attribute on `<script>` to enable the same usage pattern as dynamic script elements. The behavior was the same: start to download immediately, don't block rendering or other downloads, and then execute as soon as download is complete. The order of execution is explicitly *not* maintained.

So there are already three different designations for how scripts should be loaded: regular, `defer`, and `async`. All three simply alter the timing and behavior of download and execution of the external JavaScript file. These cover the use case of initiating downloads very well but fail at allowing you to determine when the script should be executed.

## The problem

Despite the various options for loading JavaScript, there is still no way to download a JavaScript file and set it to execute at an arbitrary time. You can say execute immediately, or you can defer until the DOM document is complete, but you can't specify any other point in time to execute the code. This has resulted in developers coming up with hack after hack to try and create this ability:

  * Kyle Simpson uses a `type` attribute of &#8220;script/cache&#8221; to force IE to download but not execute scripts in Internet Explorer. Once in the cache, a dynamic script element is created with the same URL. This offers the potential of a double download if cache headers are not set appropriately on the JavaScript file.
  * Stoyan Stefanov investigated how to pre-cache both JavaScript and CSS using images<sup>[4]</sup>. ControlJS makes use of this technique. Once in the cache, a dynamic script element is created with the same URL. This has the same potential downside involving double downloading.
  * The Gmail mobile team introduced  a technique to provide JavaScript in script comments, and then only evaluate the code when necessary<sup>[5]</sup>. The only downside to this is that you must format the code as comments inline to the HTML and then eval later, which is a bit of work.

The reason why so many engineers are trying to come up with ways to separately download and execute JavaScript is because of the performance implications related to the blocking of rendering and other downloads. We need to get JavaScript onto the page, but we need to do it in such a way that it doesn't affect the user experience.

Bear in mind: this isn't just a mobile issue, nor is it just a desktop issue, it's an overall issue dealing with the level of control developers have over loading JavaScript into a web page. In my time at Yahoo!, my team has investigated many different ways of loading JavaScript, and the research continues.

It's with all this in mind that I decided to put forth a proposal to improve this situation. A lot of things get talked about hypothetically, but it's only when a concrete proposal appears that things tend to move, and that was my intention from the start.

## Requirements

One of the most helpful things that Steve and I did was to outline a few basic requirements for any solution that could solve this problem:

  1. The functionality must be exposed to feature detection techniques.
  2. No double download of JavaScript files as a guarantee.
  3. Don't inhibit the parallel downloading of JavaScript files.

With these requirements in mind, I set out on my first proposal.

## The original proposal

My original proposal<sup>[2]</sup> was based on adding a `noexecute` attribute to a `<script>` element, which informed the browser not to execute the external file but to download it. You could later execute the code by calling a new `execute()` method. Simple example:

    var script = document.createElement("script");
    script.noexecute = true;
    script.src = "foo.js";
    document.body.appendChild(script);
    
    //later
    script.execute();

The `noexecute` attribute could also be specified in HTML markup, allowing you to later get a reference to that element and called `execute()` on it as well. There were a large amount of additional details surrounding this proposal in terms of changes to events, formalization of `readyState`, and how to deal with the various states of the script itself.

## Reactions and alternatives

The reactions I received from this proposal ranged from &#8220;interesting&#8221; to &#8220;too complicated.&#8221; No one outright hated it, which is always a good sign, but the number of people who loved it wasn't high enough to continue on without rethinking. In the meantime, there were two other proposals being floated around:

  * Make all of the browsers behave like Internet Explorer in the way they handle dynamic scripts. Download begins as soon as the `src` property is assigned but the code isn't executed until the script node is added to the document. I pointed out the major issue with this is that there is no way to feature detect this functionality to differentiate browser behaviors. It was brought up that Internet Explorer is the only browser that supports `readyState `on script nodes and its value starts at &#8220;uninitialized&#8221;, so the functionality can be inferred. As many people I know, I hate feature inference.
  * Use some version of `<link rel="prefetch">` to download JavaScript files. I pointed out a couple of issues with this approach, the first being that prefetching happens during user idle time, and the developer doesn't know when that will happen. The second issue is that you'd still need to create a new script node and assign its `src` property. This relies on correct caching behavior and could result in a double download.

To be fair, there were significant criticisms on my proposal as well. The major list of dislikes in my proposal were:

  * Broken backwards compatibility when using `noexecute` in markup.
  * Requires defining `readyState` and `onreadystatechange` on `HTMLScriptElement`.
  * Changing how the load event works for `noexecute` scripts only.
  * Adding the `execute()` method to `HTMLScriptElement`. This brought up many questions as to what should happen when this method was called in different situations.

The overall feeling on the WHAT-WG mailing list was that the proposal was too complicated even though the general direction seemed okay.

## Proposal v2.1

After doing some soul searching, I decided to focus on what seemed like the simplest solution: making other browsers behave like Internet Explorer. As Kyle pointed out, this was already proven to work and the HTML5 specification allows this behavior. I set out to redefine my proposal as a way to codify this behavior in a way that allowed the developer to decide to turn this feature on as well as a way to feature detect. The results is a proposal I've called v2.1 (since I made some major edits after v2).

This proposal simplifies the list of enhancements to:

  1. Create a `preload` property on `HTMLScriptElement`. This works only when used in JavaScript and has no effect when put in markup.
  2. When `preload` is set to true, download begins as soon as `src` is assigned to.
  3. An `onpreload` event handler is called when the file is successfully downloaded and is ready for execution.
  4. The script is executed when the script node is added to the document.

A basic example of how this would be used:

    var script = document.createElement("script");
    script.preload = true;
    script.src = "foo.js";    //download begins here
    script.onpreload = function(){
        //script is now ready, if I want to execute, the following should be used:
        document.body.appendChild(script);
    };

The reason why I like this solution is that the feature detection is obvious and corresponds directly to the behavior that will occur:

    var isPreloadSupported = (typeof script.preload == "boolean");

I like this much better than the feature inference currently used in LABjs to detect Internet Explorer:

    var isPreloadSupported = (script.readyState == "uninitialized");

To me, this doesn't at all indicate that the preloading functionality is present. It only indicates that the `readyState `property is present and has  a value of &#8220;uninitialized&#8221;. This is exactly the type of code that I seek to avoid with my proposal, so that script loaders can stop trying to infer what the browser will do and instead actually know what the browser will do.

This proposal also keeps the changes to `HTMLScriptElement` small and self-contained,  without affecting existing definitions.

Note: There's also the possibility that the default value of `preload `could be true instead of false, making Internet Explorer's behavior the default amongst browsers that support this functionality. I could go either way on this issue, but the possibility should be mentioned.

## And so on

The conversation is still ongoing on the WHAT-WG mailing list. As I've said on the list, I really don't care what the final solution is, whether it be mine or not, so long as it fulfills the three requirements I laid out earlier. I think it's pretty clear that this capability is important for finishing the work started with the introduction of the `async` attribute. Once we have better control over when JavaScript can download and execute, we'll be able to create multiple variations of script loading techniques. It's my hope that we'll soon reach a conclusion on how best to move forward.

## References

  1. [Thoughts on script loaders][1], by Nicholas C. Zakas
  2. [Proposal for Delayed Script Execution][2], by Nicholas C. Zakas
  3. [WHAT-WG: Proposal for separating script downloads and execution][3]
  4. [Preload JavaScript/CSS without execution][4], by Stoyan Stefanov
  5. [Gmail for Mobile HTML5 Series: Reducing Startup Latency][5], by Bikin Chiu
  6. [Proposal for Delayed Script Execution v2.1][6], by Nicholas C. Zakas

 [1]: {{site.url}}/blog/2010/12/21/thoughts-on-script-loaders/
 [2]: https://docs.google.com/document/d/1s8_iRr1TcwcDtShgfuGThapwZtVXItymw5zc16D0Pz8/edit?hl=en&authkey=CNbDlo8J
 [3]: http://lists.whatwg.org/htdig.cgi/whatwg-whatwg.org/2011-February/030161.html
 [4]: http://www.phpied.com/preload-cssjavascript-without-execution/
 [5]: http://googlecode.blogspot.com/2009/09/gmail-for-mobile-html5-series-reducing.html
 [6]: https://docs.google.com/document/d/1EGM9xmQXbJ_rI0IFhbnACiDaaBPTSb7T3RynwD-naJg/edit?hl=en&authkey=CO7aqZAO
