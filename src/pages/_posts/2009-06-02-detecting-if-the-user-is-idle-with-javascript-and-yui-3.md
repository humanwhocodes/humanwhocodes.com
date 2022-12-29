---
title: Detecting if the user is idle with JavaScript and YUI 3
author: Nicholas C. Zakas
permalink: /blog/2009/06/02/detecting-if-the-user-is-idle-with-javascript-and-yui-3/
categories:
  - Web Development
tags:
  - Idle
  - JavaScript
  - Timer
  - YUI
---
Web developers have been interested in whether or not a user is idle since the Ajax explosion hit. With the introduction of more dynamic, highly interactive web interfaces came the desire to know if the user was actually doing anything at any point in time. Thus, the quest for determining if the user is idle began.

This problem has been solved, though I would argue inelegantly, in a lot of web applications: [Facebook][1], [WordPress][2], and [Gmail][3] all try to figure out when the user has stopped interacting with the page in order to perform some action. The usual JavaScript solution for this involves monitoring the `mousemove` event and, if there has been no mouse movement in a specific period of time, indicate that the user is idle. There is one major flaw in this approach and that is reliance on mouse events to indicate if the user is active or idle. This is problematic because there are, of course, two primary input devices (keyboard and mouse) attached to a computer so you&#8217;re losing 50% of the picture. If a user is typing a long email or blog post, does that mean they are idle simply because they haven&#8217;t moved the mouse? Of course not. What about those users who aren&#8217;t capable of using a mouse due to a disability, are they always idle? Once again, the answer is no.

With this background in mind, I set out to create an idle timer in JavaScript that is fitting of the complex web applications that might want to use it. I built this implementation on top of [YUI 3][4] because it has, in a short period of time, become my favorite JavaScript library. The features I wanted to implement were:

  1. Allow the idle timer to be started and stopped for proper cleanup of resources.
  2. Fire an event when the user becomes idle.
  3. Fire an event when the user becomes active after having been idle.
  4. Provide a function so I could determine, at any point in time, if the user is idle.

These features led me to a basic interface:

    Y.IdleTimer = {
    
        isRunning: function(){
        },
    
        isIdle: function(){
        },
    
        start: function(newTimeout){
        },
    
        stop: function(){
        }
    
    };
    

I decided to use the [YUI 3 Event utility][5] to provide custom event support for this implementation. This is done by augmenting the `Y.IdleTimer` object with `Y.Event.Target`:

    //inherit event functionality
    Y.augment(Y.IdleTimer, Y.Event.Target);

This line adds basic event methods, such as `fire()`, `subscribe()`, and `unsubscribe()`. Using `Y.Event.Target`, the creation and management of custom event objects are done for you, freeing you up to focus on implementation details.

Next, I created a couple of flags: `idle`, which indicates if the user is idle, and `enabled`, which is indicates if the timer is running. These are used internally to manage the state of the timer and are returned in `isIdle()` and `isRunning()`, respectively. I also created `tId`, which is a place to store the timer ID when using `setTimeout()` and `timeout`, which indicates the default amount of time to wait before declaring the user idle (set to 30,000ms initially, this can be overidden by passing a value into `start()`).

To manage the user&#8217;s idle state, you need to attach an event handler for both `mousemove` and `keydown`. Since both of these methods bubble, I can attach the handler at the document level to manage the entire page (of course, this presupposes that no one stops bubbling before it reaches the document level). The event handler should be the same for both events so there&#8217;s no duplication of code and the handler will have to manage the timeout process. I ended up creating two functions for this purpose:

    //event handler
    function handleUserEvent(){
    
        //clear any existing timeout
        clearTimeout(tId);
    
        //if the idle timer is enabled
        if (enabled){
    
            //if it's idle, that means the user is no longer idle
            if (idle){
                toggleIdleState();
            } 
    
            //set a new timeout
            tId = setTimeout(toggleIdleState, timeout);
        }
    }
    
    //helper to fire events
    function toggleIdleState(){
    
        //toggle the state
        idle = !idle;
    
        //fire appropriate event
        Y.IdleTimer.fire(idle ? "idle" : "active");
    }

The first function `handleUserEvent()` is assigned to be the event handler for `mousemove` and `keydown`. It doesn&#8217;t actually use the `event` object for anything, so I didn&#8217;t bother defining it as an argument. Whenever the user does something, the last timer should be cleared and then an appropriate action should be taken. If the timer is stopped, then nothing happens; if it&#8217;s running, then the action is determined based on the user&#8217;s current `idle` state. If the user is idle, then `toggleIdleState()` state is called immediately to indicate that the user is not active. Then, a timer is used to delay calling `toggleIdleState()` because the next toggle would be back to idle.

The `toggleIdleState()` function simply toggles the `idle` flag and then fires an appropriate event. If the user is idle after the toggle, then &#8220;idle&#8221; is fired, otherwise &#8220;active&#8221; is fired. These events end up being fired exactly when the user&#8217;s idle state has changed and only once until the state changes again.

To finish up the implementation, I just filled out the existing interface skeleton to make use of these functions:

    Y.IdleTimer = {
        isRunning: function(){
            return enabled;
        },
    
        isIdle: function(){
            return idle;
        },
    
        start: function(newTimeout){
    
            //set to enabled
            enabled = true;
    
            //set idle to false to begin with
            idle = false;
    
            //assign a new timeout if necessary
            if (typeof newTimeout == "number"){
                timeout = newTimeout;
            }
    
            //assign appropriate event handlers
            Y.on("mousemove", handleUserEvent, document);
            Y.on("keydown", handleUserEvent, document);
    
            //set a timeout to toggle state
            tId = setTimeout(toggleIdleState, timeout);
        },
    
        stop: function(){
    
            //set to disabled
            enabled = false;
    
            //clear any pending timeouts
            clearTimeout(tId);
    
            //detach the event handlers
            Y.detach("mousemove", handleUserEvent, document);
            Y.detach("keydown", handleUserEvent, document);
        }
    
    };
    
    //inherit event functionality
    Y.augment(Y.IdleTimer, Y.Event.Target);

Basic usage of the idle timer is as follows:

    
    Y.IdleTimer.subscribe("idle", function(){
        //handle when the user becomes idle
    });
    
    Y.IdleTimer.subscribe("active", function(){
         //handle when the user becomes active
    });
    
    //start the timer with a default timeout of 30s
    Y.IdleTimer.start();
    

Because of the power of YUI 3, this implementation of an idle timer is very small in size and pretty straightforward to use. You can get the full [source code][6] up on GitHub, and there&#8217;s an [example][7] to play with as well.

**Update (6-June-09):** Updated logic per Paul&#8217;s feedback.

**Update (21-June-09):**YUI 2 and generic versions of the idle timer are now available at my [GitHub project][6].

**Update (28-Oct-09):** YUI 3 IdleTimer is now part of [YUI Gallery][8] ([more info][9]).

 [1]: http://www.facebook.com/
 [2]: http://www.wordpress.org
 [3]: http://www.gmail.com/
 [4]: http://developer.yahoo.com/yui/3/
 [5]: http://developer.yahoo.com/yui/3/event/
 [6]: http://github.com/nzakas/jstools/
 [7]: http://nczonline.net/experiments/javascript/idle-timer/idle-timer.htm
 [8]: http://yuilibrary.com/gallery/show/idletimer
 [9]: {{site.url}}/blog/2009/10/28/yui-3-idletimer-now-available-on-yui-gallery/
