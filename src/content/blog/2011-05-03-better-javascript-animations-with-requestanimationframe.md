---
title: Better JavaScript animations with requestAnimationFrame
author: Nicholas C. Zakas
permalink: /blog/2011/05/03/better-javascript-animations-with-requestanimationframe/
categories:
  - Web Development
tags:
  - Animation
  - JavaScript
  - mozRequestAnimationFrame
  - requestAnimationFrame
  - webkitRequestAnimationFrame
---
For a long time, timers and intervals have been the state of the art for JavaScript-based animations. While CSS transitions and animations make some animations easy for web developers, little has changed in the world of JavaScript-based animation over the years. That is, until Firefox 4 was released with the first way to improve JavaScript animations. But to fully appreciate the improvement, it helps to take a look at how animations have evolved on the web.

## Timers

The very first pattern for creating animations was to use chained `setTimeout()` calls. Long-time developers will remember the obsession with statusbar news tickers that littered the web during Netscape 3&#8242;s hayday. It usually looked something like this:

    (function(){
        var msg = "NFL Draft is live tonight from Radio City Music Hall in New York City!"
            len = 25,
            pos = 0,
            padding = msg.replace(/./g, " ").substr(0,len)
            finalMsg = padding + msg;
    
        function updateText(){
            var curMsg = finalMsg.substr(pos++, len);
            window.status = curMsg;
            if (pos == finalMsg.length){
                pos = 0;
            }
            setTimeout(updateText, 100);
        }
    
        setTimeout(updateText, 100);
    
    })();

If you want to test this code out in a browser, create a `<pre>` element and use that instead of `window.status`, as I did this [newsticker example][1].

This annoying web pattern was later countered with restrictions on `window.status`, but the basic technique re-emerged with the release of Internet Explorer 4 and Netscape 4, the first browsers to give developers more control over how elements were laid out on the page. With that, came the ability to dynamically change the size, location, color, etc. of elements using JavaScript, and a whole new breed of animations. For example. the following animates a `<div>` to a width of 100% (often found in progress bars):

    (function(){
    
        function updateProgress(){
            var div = document.getElementById("status");
            div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
            if (div.style.width != "100%"){
                setTimeout(updateProgress, 100);
            }
    
        }
    
        setTimeout(updateProgress, 100);
    
    })();

Even though the animated parts of the page were different, the basic technique remained the same: make a change, use `setTimeout()` to yield and let the page update, then the timer would be called to apply the next change. This process repeated until the animation was complete (see the [progressbar in action][2]). Same technique as the early status scrollers, just a different animation.

Chaining calls to `setTimeout()` together, as in both of these examples, creates an animation loop. Animation loops are used in computer programs to handle updating a user interface at regular intervals. All animation loops operate the same way: make an update, sleep, make an update, sleep. Early on, `setTimeout()` was the primary animation loop technique for JavaScript.

## Intervals

With the successful re-introduction of animations to the web (much to the dismay of purists like myself), came new explorations. It was no longer good enough to have just one animation, there had to be multiple. The first attempts were to create multiple animation loops, one for each animation. Creating multiple timers using `setTimeout()` proved to be a bit much for these early browsers to handle, and so developers began using a single animation loop, created with `setInterval()`, to manage all of the animations on the page. A basic animation loop using `setInterval()` looks like this:

    (function(){
    
        function updateAnimations(){
            updateText();
            updateProgress();
        }
    
        setInterval(updateAnimations, 100);
    
    })();

To build out a small animation library, the `updateAnimations()` method would cycle through the running animations and make the appropriate changes to each one (see both a [news ticker and a progressbar running together][3]). If there are no animations to update, the method can exit without doing anything and perhaps even stop the animation loop until more animations are ready for updating.

The tricky part about this animation loop is knowing what the delay should be. The interval has to be short enough to handle a variety of different animation types smoothly but long enough so as to produce changes the browser could actually render. Most computer monitors refresh at a rate of 60 Hz, which basically means there's a repaint 60 times per second. Most browsers cap their repaints so they do not attempt to repaint any more frequently than that, knowing that the end user gets no improvement in experience.

Given that, the best interval for the smoothest animation is 1000ms / 60, or about 17ms. You'll see the smoothest animation at this rate because you're more closely mirroring what the browser is capable of doing. Compare this [example with a 17ms interval][4] to the previous example and you'll see a much smoother animation (also much faster because the animations are updating more frequently and I've not done any calculation to take that into effect). Multiple animations may need to be throttled so as not to complete too quickly when using an animation loop with a 17ms interval.

## The problem(s)

Even though `setInterval()`-based animation loops are more efficient than having multiple sets of `setTimeout()`-based loops, there are still problems. Neither `setInterval()` nor `setTimeout()` are intended to be precise. The delay you specify as the second argument is only an indication of when the code is added in the browser's UI thread queue for possible execution. If there are other jobs in the queue ahead of it, then that code waits to be executed. In short: the millisecond delay is not an indication of when the code will be *executed*, only an indication of when the job will be *queued*. If the UI thread is busy, perhaps dealing with user actions, then that code will not execute immediately.

Understanding when the next frame will be drawn is key to smooth animations, and until recently, there was no way to guarantee when the next frame would be drawn in a browser. As `<canvas>` became popular and new browser-based games emerged, developers became increasingly frustrated with the inaccuracy of `setInterval()` and `setTimeout()`.

Exacerbating these problems is the timer resolution of the browser. Timers are not accurate to the millisecond. Here are some common timer resolutions<sup>[1]</sup>:

  * Internet Explorer 8 and earlier have a timer resolution of 15.625ms
  * Internet Explorer 9 and later have a timer resolution of 4ms.
  * Firefox and Safari have a timer resolution of ~10ms.
  * Chrome has a timer resolution of 4ms.

Internet Explorer prior to version 9 has a timer resolution of 15.625 ms<sup>[1]</sup>, so any value between 0 and 15 could be either 0 or 15 but nothing else. Internet Explorer 9 improved timer resolution to 4 ms, but that's still not very specific when it comes to animations. Chrome's timer resolution is 4ms while Firefox and Safari's is 10ms. So even if you set your interval for optimum display, you're still only getting close to the timing you want.

## mozRequestAnimationFrame

Robert O'Callahan of Mozilla was thinking about this problem and came up with a unique solution. He pointed out that CSS transitions and animations benefit from the browser knowing that some animation should be happening, and so figures out the correct interval at which to refresh the UI. With JavaScript animations, the browser has no idea that an animation is taking place. His solution was to create a new method, called `mozRequestAnimationFrame()`, that indicates to the browser that some JavaScript code is performing an animation. This allows the browser to optimize appropriately after running some code.

The `mozRequestAnimationFrame()` method accepts a single argument, which is a function to call *prior *to repainting the screen. This function is where you make appropriate changes to DOM styles that will be reflected with the next repaint. In order to create an animation loop, you can chain multiple calls to `mozRequestAnimationFrame()` together in the same way previously done with `setTimeout()`. Example:

    function updateProgress(){
    
        var div = document.getElementById("status");
        div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
    
        if (div.style.left != "100%"){
            mozRequestAnimationFrame(updateProgress);
        }
    }
    
    mozRequestAnimationFrame(updateProgress);

Since `mozRequestAnimationFrame()` only runs the given function once, you need to call it again manually the next time you want to make a UI change for the animation. You also need to manage when to stop the animation in the same way. Pretty cool, and the result is a very smooth animation as seen in this [enhanced example][5].

So far, `mozRequestAnimationFrame()` has solved the problem of browsers not knowing when a JavaScript animation is happening and the problem of not knowing the best interval, but what about the problem of not knowing when your code will actually execute? That's also covered with the same solution.

The function you pass in to `mozRequestAnimationFrame()` actually receives an argument, which is a time code (in milliseconds since January 1, 1970) for when the next repaint will actually occur. This is a very important point: `mozRequestAnimationFrame()` actually schedules a repaint for some known point in the future and can tell you when that is. You're then able to determine how best to adjust your animation.

In order to determine how much time has passed since the last repaint, you can query `mozAnimationStartTime`, which contains the time code for the last repaint. Subtracting this value from the time passed into the callback allows you to figure out exactly how much time will have passed before your next set of changes are drawn to the screen. The typical pattern for using these values is as follows:

    function draw(timestamp){
    
        //calculate difference since last repaint
        var diff = timestamp - startTime;
    
        //use diff to determine correct next step
    
        //reset startTime to this repaint
        startTime = timestamp;
    
        //draw again
        mozRequestAnimationFrame(draw);
    }
    
    var startTime = mozAnimationStartTime;
    mozRequestAnimationFrame(draw);

The key is to make the first call to `mozAnimationStartTime` outside of the callback that is passed to `mozRequestAnimationFrame()`.  If you call `mozAnimationStartTime` inside of the callback, it will be equal to the time code that is passed in as an argument.

## webkitRequestAnimationFrame

The folks over at Chrome were clearly excited about this approach and so created their own implementation called `webkitRequestAnimationFrame()`. This version is slightly different than the Firefox version in two ways. First, it doesn't pass a time code into the callback function, you don't know when the next repaint will occur. Second, it adds a second, optional argument which is the DOM element where the changes will occur. So if you know the repaint will only occur inside of one particular element on the page, you can limit the repaint to just that area.

It should come as no surprised that there is no equivalent `mozAnimationStartTime`, since that information without the time of the next paint is not very useful. There is, however, a `webkitCancelAnimationFrame()`, which cancels the previously scheduled repaint.

If you don't need precision time differences, you can create an animation loop for Firefox 4+ and Chrome 10+ with the following pattern:

    (function(){

        function draw(timestamp){
    
            //calculate difference since last repaint
            var drawStart = (timestamp || Date.now()),
                diff = drawStart - startTime;
    
            //use diff to determine correct next step
    
            //reset startTime to this repaint
            startTime = drawStart;
    
            //draw again
            requestAnimationFrame(draw);
        }
    
        var requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame,
            startTime = window.mozAnimationStartTime || Date.now();
        requestAnimationFrame(draw);

    })();

This pattern uses the available features to create an animation loop with some idea of how much time has passed. In Firefox, this uses the time code information that is available while Chrome defaults to the less-accurate Date object. When using this pattern, the time difference gives you a general idea of how much time has passed but certainly isn't going to tell you the next time a repaint will occur in Chrome. Still, it's better to have some idea of how much time has passed rather than none.

## Wrap up

The introduction of the `mozRequestAnimationFrame()` method is the most significant contribution to improving JavaScript animations perhaps in the history of the web. As discussed, the state of JavaScript animation has pretty much been the same since the early days of JavaScript. With browsers getting better at animation and the introduction of CSS transitions and animations, it's nice to see some attention being paid to JavaScript-based animations, as these will mostly certainly become more important and more CPU-intensive with the proliferation of <canvas>-based games. Knowing when JavaScript is attempting animation allows browsers to do more optimal processing, including stopping that processing when a tab is in the background or when the battery on a mobile device is running low.

The `requestAnimationFrame()` API is now being drafted as a new recommendation by the W3C and is being worked on jointly by Mozilla and Google as part of the Web Performance group. It's good to see the two groups moving so quickly to get compatible (if not completely) implementations out into the wild.

**Update (03-May-2011)**: Fixed typo, added mobile information.********

**Update (04-May-2011)**: Fixed link to enhanced example.


  1. [Chrome: Cranking up the clock][6], by Mike Belshe
  2. [requestAnimationFrame implementation][7] (Chrome)

 [1]: https://humanwhocodes.com/experiments/animation/newsticker.htm
 [2]: https://humanwhocodes.com/experiments/animation/progressbar.htm
 [3]: https://humanwhocodes.com/experiments/animation/newsticker-and-progressbar.htm
 [4]: https://humanwhocodes.com/experiments/animation/newsticker-and-progressbar-2.htm
 [5]: https://humanwhocodes.com/experiments/animation/newsticker-and-progressbar-3.htm
 [6]: http://www.belshe.com/2010/06/04/chrome-cranking-up-the-clock/
 [7]: http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
