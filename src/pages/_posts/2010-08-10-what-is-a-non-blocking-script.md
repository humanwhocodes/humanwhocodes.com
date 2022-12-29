---
title: What is a non-blocking script?
author: Nicholas C. Zakas
permalink: /blog/2010/08/10/what-is-a-non-blocking-script/
categories:
  - Web Development
tags:
  - Asynchronous Download
  - Blocking
  - JavaScript
---
It was just a couple of years ago that [Steve Souders][1] introduced the concept of blocking vs. non-blocking into the common lexicon of web developers around the world. His big focus was pointing out how `<script>` tags block the rendering of the page as well as the downloading of other resources. Obviously, this is really bad for your initial page load, where a single high-latency `<script>` tag causes your page to appear blank for a large amount of time. Even with all of this discussion, it seems that there&#8217;s still some confusion over non-blocking scripts and how they relate to parallel downloads. This is my attempt to clear up the confusion.

## JavaScript is single-threaded

To begin, you need to understand a little bit about JavaScript and the browser. JavaScript is fundamentally single-threaded, meaning that only one operation can be performed at a time. Further, this single thread is actually shared between JavaScript execution and browser rendering. This is typically referred to as the UI thread of the browser and is usually the focus of rendering-related performance discussions.

The browser can only be executing JavaScript or rendering UI at any particular point in time (it can&#8217;t be doing both). This makes sense logically, because JavaScript may affect the UI by moving elements around or otherwise altering content, and the next time the UI is updated the browser wants to be sure the latest information is used.

With this knowledge, think of what happens as a page downloads to the browser. The page has started to render as it was downloaded, and then a `<script>` tag is encountered. At that point, the browser can no longer continue rendering because the JavaScript may affect the UI, and so it waits. The HTTP connection is made, the file is downloaded, parsed, and executed. Only once that is complete can the browser continue to render the rest of the page in full confidence that the output is up-to-date.

## Parallel downloading

Older browsers would actually stop doing everything, including downloading additional resources in the page, while a script was downloading. That meant two `<script>` tags in a row would result in the browser waiting to begin download of the second script until after the first was downloaded and executed. Newer browsers will download the script files in parallel and then execute them in order, so the second script is ready to be executed as soon as the first complete (for more information, read [Steve&#8217;s post][2] on this).

Parallel downloading should not be confused for asynchronous execution. Remember, JavaScript is single threaded, so you literally cannot be executing two scripts at the same time. Parallel downloading of scripts only means that two scripts are *downloaded* at the same time, not that they&#8217;re *executed* at the same time. There&#8217;s a big difference.

By downloading more than one JavaScript file at a time, you&#8217;re saving time on the downloading of resources only. This can turn out to be significant if you&#8217;re dealing with a high-latency connection versus downloading the script files sequentially. Just keep in mind that the scripts are still executed in order and only one can be executed at a time.

## Non-blocking scripts

Steve also wrote a [post][3] about how to load JavaScript in a non-blocking manner (actually, he gives multiple ways of doing this). The basic approach that I&#8217;ve [recommended][4] is to create a script node dynamically. As opposed to using a <script> tag in HTML, dynamically created script nodes do not block while the page is being loaded. But what does it mean to not block?

A blocking script means that the page cannot continue *rendering* until the script has been:

  1. Completely downloaded
  2. Parsed
  3. Executed

In many cases, it&#8217;s #1 that takes the longest. Parsing and execution of JavaScript is pretty fast, especially in the newer browsers with optimizing JavaScript engines. Network latency and the overhead of an HTTP connection is usually the slowest part of the process. When a script is loaded in a blocking manner, that response time for the script is roughly equivalent to the amount of time that the browser is not rendering. That&#8217;s a lousy user experience, and that&#8217;s exactly what you get when an external script is loaded using the `<script>` tag.

Using a dynamic script node causes external JavaScript files to be downloaded in a non-blocking way. This means the browser doesn&#8217;t need to wait for the file to download before continuing to render. In effect, #1 (and probably #2) in the previous list no longer cause the UI thread to stop. But since there is only one thread, the actual execution of JavaScript once the file is downloaded will still block rendering. However, as mentioned before, execution is often the fastest part of the sequence and so this goes largely unnoticed by users (assuming you&#8217;re not doing something insane in that script).

So loading scripts in a non-blocking way basically frees up the browser to continue rendering while the script file is being downloaded. The *loading *of these files is done asynchronously, but *execution *will still cause the UI thread to block for a small amount of time.

## The HTML5 async attribute

HTML5 introduces a new attribute on the `<script>` tag called `async`. This is a Boolean attribute (doesn&#8217;t require a value) and, when specified, causes the script file to be loaded as if you had created a dynamic script node. Basic usage is as follows:

    <script type="text/javascript" async src="foo.js"></script>

When supporting browsers see the `async` attribute (only Firefox 3.6 currently supports it), it knows that the script file can be downloaded without blocking rendering. This is really a convenient way to load files in a non-blocking manner versus using a JavaScript function to do the loading.

The `async` attribute is still a bit misunderstood, and has some side effects based on browser behavior. When set using HTML, the behavior is very straightforward as discussed earlier. When set on a dynamic script node, the behavior has a subtle distinction. Firefox and Opera preserve the order of execution for external JavaScript files, so you are guaranteed that scripts will execute in order when two dynamic script nodes are added one after the other. So in Firefox 3.6, setting `async` on the first script informs the browser that it need not wait to execute this script before executing others that may come after it. When Opera implements this feature, it will likely work the same way. This is the apparent motivation behind the [Google Analytics source code][5] that creates a dynamic script node and then sets `async` on it. Internet Explorer, Safari, and Chrome do not preserve the order of execution, as scripts are executed as soon as they are retrieved regardless of the order in which they were inserted. In these browsers, setting `async` on script nodes has no effect (but also doesn&#8217;t hurt anything).

<del>The <code>async</code> attribute is still a bit misunderstood, as evidenced by the <a href="http://googlecode.blogspot.com/2009/12/google-analytics-launches-asynchronous.html">Google Analytics source code</a> that creates a dynamic script node and then sets <code>async</code> on it. Doing so is redundant since dynamic script nodes are loaded asynchronously already. The <code>async</code> attribute is only really useful when <code>&lt;script&gt;</code> is included directly in HTML.</del>

## Conclusion

There are basically two ways to achieve non-blocking (aka asynchronous) JavaScript downloading: create a script node dynamically and use the HTML5 `async` attribute of a `<script>` tag. Combining this with the capability of parallel script downloads in newer browsers means that your page can take less time to render fully to the user. Try to avoid blocking JavaScript downloads whenever possible.

**Update (10 August 2010):** Fixed small typos and updated description of `async` attribute to reflect Steve&#8217;s and James&#8217; comments.

 [1]: http://www.stevesouders.com/
 [2]: http://www.stevesouders.com/blog/2010/02/07/browser-script-loading-roundup/
 [3]: http://www.stevesouders.com/blog/2009/04/27/loading-scripts-without-blocking/
 [4]: {{site.url}}/blog/2009/06/23/loading-javascript-without-blocking/
 [5]: http://googlecode.blogspot.com/2009/12/google-analytics-launches-asynchronous.html
