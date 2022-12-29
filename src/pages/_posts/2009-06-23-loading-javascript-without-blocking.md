---
title: Loading JavaScript without blocking
author: Nicholas C. Zakas
permalink: /blog/2009/06/23/loading-javascript-without-blocking/
categories:
  - Web Development
tags:
  - Blocking
  - JavaScript
  - Performance
---
I was reading Steve Souder&#8217;s blog post on [loading scripts without blocking][1] in which he notes that dynamically creating a `<script>` element and assigning its `src` attribute leads to a download that doesn&#8217;t block other downloads or page processes. His post is missing an example of how to do this, so I thought I&#8217;d pick up from there. I think most developers tend to use JavaScript libraries for such behavior (the [YUI Get utility][2] comes to mind) but a discussion of the underlying technique is still useful to know.

The basic approach to downloading JavaScript without blocking is quite straightforward:

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "file.js";
    document.body.appendChild(script);

This is about as easy as it gets, you just create a new DOM element, assign its properties and add it to the page. There are two things to note about this code. First, the download doesn&#8217;t actually begin until the `script` node is added to the document. This is different from dynamically creating an `<img>` element, for which assigning the `src` automatically begins the download even before the node is added to the document. The second thing to note is that you can add the script node either to the `<head>` or `<body>`; it really doesn&#8217;t matter. That&#8217;s all it takes to dynamically load a JavaScript file without blocking the page.

Of course, you may also want to be notified when the JavaScript file is fully downloaded and executed, and that&#8217;s where things get a bit tricky. Most modern browsers (Firefox, Safari, Opera, Chrome) support a `load` event on `<script>` elements. This is an easy way to determine if the script is loaded:

    //Firefox, Safari, Chrome, and Opera
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "file.js";
    script.onload = function(){
        alert("Script is ready!");
    };
    document.body.appendChild(script);

The real problem is in Internet Explorer, which uses the `readyState` property to indicate the state of the script and a `readystatechange` event to indicate when that property has changed. In this case, `readyState` isn&#8217;t a number as it is with the `XMLHttpRequest` object; instead, it&#8217;s one of five possible values:

  * &#8220;uninitialized&#8221; â€“ the default state.
  * &#8220;loading&#8221; â€“ download has begun.
  * &#8220;loaded&#8221; â€“ download has completed.
  * &#8220;interactive&#8221; â€“ data is completely available but isn&#8217;t fully available.
  * &#8220;complete&#8221; â€“ all data is ready to be used.

Even though the [MSDN documentation][3] indicates that these are the available values for `readyState`, in reality, you&#8217;ll never see all of them. The documentation also applies to other elements that also support `readyState` and leaves us hanging with a rather cryptic description of which `readyState` values to expect:

> An object&#8217;s state is initially set to `uninitialized`, and then to `loading`. When data loading is complete, the state of the link object passes through the `loaded` and `interactive` states to reach the `complete` state.  
> *The states through which an object passes are determined by that object; an object can skip certain states (for example, `interactive`) if the state does not apply to that object.*

Even stranger is that the final `readyState` isn&#8217;t always `complete`. Sometimes, `readyState` stops at `loaded` without going on to `complete` and sometimes it skips over `loaded` altogether. The best approach is to check for both `readyState` values and remove the event handler in both cases to ensure you don&#8217;t handle the loading twice:

    //Internet Explorer only
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "file.js";
    script.onreadystatechange = function(){
        if (script.readyState == "loaded" ||
                script.readyState == "complete"){
            script.onreadystatechange = null;
            alert("Script is ready!");
        }
    };
    document.body.appendChild(script);

You can wrap these two approaches pretty easily to create a cross-browser function to dynamically load JavaScript:

    function loadScript(url, callback){
    
        var script = document.createElement("script")
        script.type = "text/javascript";
    
        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                        script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function(){
                callback();
            };
        }
    
        script.src = url;
        document.body.appendChild(script);
    }

To use this, just pass in the URL to retrieve and a function to call once it&#8217;s loaded:

    loadScript("http://yui.yahooapis.com/2.7.0/build/yahoo/yahoo-min.js",
        function(){
            YAHOO.namespace("mystuff");
    
        //more...
    });

Loading scripts in this way prevents them from blocking the download of other resources on the page or preventing the display from rendering. It&#8217;s a really useful technique when performance is important (and let&#8217;s face it, when is it never?). The really cool thing is that [YUI 3][4] is built completely around the idea of non-blocking JavaScript downloads. All you need to do is download the ~20KB seed file and then specify the additional resources you want to load, such as:

    YUI().use("dom", function(Y){
        Y.DOM.addClass(document.body, "active");
    });

Behind the scenes, YUI constructs the appropriate URL for the `dom` module and downloads it, automatically executing the callback function when the code is ready. This can really improve the initial download time of an overall page by asynchronously downloading the rest of the JavaScript code.

Loading JavaScript without blocking is a really important technique to understand and use in web applications that are concerned with page load performance. JavaScript blocking slows down the entire user experience, but it no longer has to.

 [1]: http://www.stevesouders.com/blog/2009/04/27/loading-scripts-without-blocking/
 [2]: http://developer.yahoo.com/yui/get/
 [3]: http://msdn.microsoft.com/en-us/library/ms534359(VS.85).aspx
 [4]: http://developer.yahoo.com/yui/3/
