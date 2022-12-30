---
title: The best way to load external JavaScript
author: Nicholas C. Zakas
permalink: /blog/2009/07/28/the-best-way-to-load-external-javascript/
categories:
  - Web Development
tags:
  - Blocking
  - JavaScript
  - Performance
---
Not too long ago, I wrote about [loading JavaScript without blocking][1] by creating a dynamic `<script>` tag. When `<script>` tags are in the flow of an HTML document, the browser must stop rendering and wait for the script file to download and execute before continuing ([example][2]). Creating a new `<script>` tag via JavaScript avoids this issue because it's out of the flow of the document, so the script file is downloaded and executed without waiting. The result: dynamically loading JavaScript files allows your page to render faster and therefore improve perceived performance.

## The best technique

Steve Souders has explored several different ways to load JavaScript without blocking both on his [blog][3] and in his books. After thinking about it and experimenting, I've come to the conclusion that there's just one best practice for loading JavaScript without blocking:

  1. Create two JavaScript files. The first contains just the code necessary to load JavaScript dynamically, the second contains everything else that's necessary for the initial level of interactivity on the page.
  2. Include the first JavaScript file with a `<script>` tag at the bottom of the page, just inside the `</body>`.
  3. Create a second `<script>` tag that calls the function to load the second JavaScript file and contains any additional initialization code.

That's it! There's really no need to do anything else. The key takeaway is to have only two JavaScript and make the first one as small as possible. For example, the first file may just contain this function:

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
        document.getElementsByTagName("head")[0].appendChild(script);
    }

That's a tiny amount of code to get your bootstrapped so it will load incredibly fast (especially when gzipped).

The actual code on your page ends up looking like this:

    <script type="text/javascript" src="http://your.cdn.com/first.js"></script>
    <script type="text/javascript">
    loadScript("http://your.cdn.com/second.js", function(){
        //initialization code
    });
    </script>

The key to this whole technique is to have just two JavaScript files, so the second one contains everything that's needed to initialize the page. What if your page requires more than two files? Then you should be concatenating your files together either at build time (using something like [Sprockets][4]) or at run time (using something like [mod_concat][5] or a [combo handler][6]). There should never be a time when your page requires more than these two JavaScript files to properly initialize. Each additional HTTP request has overhead, and then you'll need to worry about sequencing the downloads so code is executed in the correct order. By having just two files, you eliminate a large point of concern over which file is downloaded and executed first as well as eliminating unnecessary HTTP requests.

## Script placement

You'll note that I mentioned the best practice of placing this code towards the end of the page, just inside the closing `</body>` tag. This is advice that has been around for a while and I still recommend it, even when using this technique. The reason is that you're guaranteed all of the DOM elements you may need are already present on the page. Loading your scripts earlier could introduce timing issues where you would need to worry about using `window.onload` or some other method to determine when the DOM is ready to be used. By including this code at the bottom of the page, you are assured that the DOM is ready to be poked and you won't need to delay initialization any further.

## Inlining the first script

Several commenters correctly pointed out that this technique can be further optimized by moving the initial function inline instead of keeping it in an external file. Generally, I like to keep JavaScript outside of the page code for maintainability purposes. I also anticipated that the initial JavaScript code on the page will be larger than just this function for one reason or another. If you can have some sort of automation around injecting this into your page as an inline script, I'm all for it! The key point is to make sure the script is small enough that it's runtime performance doesn't affect page loading.

## YUI 3 has you covered

YUI 3 is designed around this very premise. You can start by just loading the yui.js file and then use the built-in Loader component to dynamically load the rest of the YUI library. For example:

    <script src="http://yui.yahooapis.com/3.0.0b1/build/yui/yui-min.js"
        type="text/javascript"></script>
    <script type="text/javascript">
    YUI().use("node", function(Y){
        //initialization code
    });
    </script>

This code loads in the YUI &#8220;seed&#8221; file first, then creates a new instance of the `YUI` object and indicates that the &#8220;node&#8221; component is necessary. Behind the scenes, YUI constructs a URL with all of the dependencies for &#8220;node&#8221;, dynamically loads it, then calls the callback function when complete. The cool thing about the YUI 3 approach is that you don't need to worry about including the URL for the JavaScript statically, just indicate which components you need and the library figures out the correct URL to download ([details][7]).

## Conclusion

Though there's been a lot of research on ways to load JavaScript without blocking, there really is just one way that I'd recommend as a best practice. There should really be no need to load anything more than two scripts to get your site initialize and interactive. Make the initial JavaScript file as small as possible and then load in the larger one dynamically to avoid blocking. This is the simplest, easiest way to get all of your JavaScript onto the page without affecting the user experience.

**Update (1-Aug-2009):** Added section on script placement to clarify why I do it in `<body>` instead of `<head>`.

 [1]: {{site.url}}/blog/2009/06/23/loading-javascript-without-blocking/
 [2]: http://stevesouders.com/hpws/js-blocking.php
 [3]: http://www.stevesouders.com/blog/2009/04/27/loading-scripts-without-blocking/
 [4]: http://getsprockets.org/
 [5]: http://code.google.com/p/modconcat/
 [6]: http://blog.davglass.com/files/yui/combo/
 [7]: http://developer.yahoo.com/yui/3/yui/
