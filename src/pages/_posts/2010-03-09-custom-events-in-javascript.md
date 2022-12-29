---
title: Custom events in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2010/03/09/custom-events-in-javascript/
categories:
  - Web Development
tags:
  - BOM
  - DOM
  - Events
  - JavaScript
---
Without a doubt, the most often-used paradigm in JavaScript is events. Events are a manifestation of the [observer pattern][1], a well-defined computer science design pattern for loose coupling. [Loose coupling][2] is incredibly important for creating maintainable, stable codebases. I talk a lot about loose coupling and its importance in my talk, [Scalable JavaScript Application Architecture][3] ([video][4]), so I won&#8217;t talk too much about it here. However, the concept is very important to grasp if you wish to progress as a software engineer.

## Events

Unless you&#8217;ve never written any JavaScript before, you&#8217;ve used events at some point in time (admittedly, if you&#8217;ve never written JavaScript before, the chances of your reading my blog are probably pretty slim). Put quite simply: the way that you tie behavior to web pages is through events. Events are a way of letting interested parties know that an important moment has occurred in the lifecycle of the application. For instance:

    window.onload = function(){
        Application.init();
    };

In this example, the `load` event is the interesting moment. I want to know when the window is fully loaded so that I can initialized the JavaScript application. The `onload` event handler is the location to where an event handler is assigned. The brilliant part is that `window` doesn&#8217;t care what web page is loaded or who is writing the code; it just knows that there&#8217;s a function to call when `load` occurs. This is the essence of loose coupling: when parts of an application have very limited knowledge of one another.

The [Browser Object Model][5] (BOM) and [Document Object Model][6] (DOM) publish events to allow developers access to the interesting moments of the browser and web page, respectively.

## Custom events

It&#8217;s no surprise that most JavaScript libraries rely heavily on custom events since this is a pattern that web developers are familiar with. Every major JavaScript library provides its own events, components to enable easy custom event definition, or both. This makes sense, of course, since libraries want to be loosely-coupled to the execution environment, and therefore, to your code.

There&#8217;s nothing magic about custom events, though, and there&#8217;s no need to load an entire library if you&#8217;d like to experiment with custom events. An object that supports custom events needs to be able to do a small set of things:

  1. Assign an event handler for a particular event.
  2. Remove an event handler for a particular event.
  3. Fire an event and call all assigned event handlers.

The following implements all of this basic functionality:

    //Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
    //MIT License
    
    function EventTarget(){
        this._listeners = {};
    }
    
    EventTarget.prototype = {
    
        constructor: EventTarget,
    
        addListener: function(type, listener){
            if (typeof this._listeners[type] == "undefined"){
                this._listeners[type] = [];
            }
    
            this._listeners[type].push(listener);
        },
    
        fire: function(event){
            if (typeof event == "string"){
                event = { type: event };
            }
            if (!event.target){
                event.target = this;
            }
    
            if (!event.type){  //falsy
                throw new Error("Event object missing 'type' property.");
            }
    
            if (this._listeners[event.type] instanceof Array){
                var listeners = this._listeners[event.type];
                for (var i=0, len=listeners.length; i < len; i++){
                    listeners[i].call(this, event);
                }
            }
        },
    
        removeListener: function(type, listener){
            if (this._listeners[type] instanceof Array){
                var listeners = this._listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                    if (listeners[i] === listener){
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

The `EventTarget` type has three methods: `addListener()`, `fire()`, and `removeListener`.

The `addListener()` uses the private `_listeners` object to store event handlers for various events. When an event handler is added, the method first checks to see if there&#8217;s a named property for that event type on the `_listeners` object, and if not, creates one containing an array. The event handler function is then saved to the array for later.

The `fire()` method fires an event with a given name. In effect, this method&#8217;s only job is to execute each event handler for the given event type. The method accepts either an object, in which case it&#8217;s expected to have a `type` property, or a string, in which case a new object is created and the string is assigned as the value of `type`. Next, if the event object doesn&#8217;t have a `target` property assigned, it is set to the current instance. This effectively creates an event object similar to the one most are familiar with via the BOM and DOM. Once the event object is created, the `_listeners` object is checked for event handlers, and if found, they are executed. Note that in order to mimic the BOM/DOM approach, event handlers are executed in the scope of `this` via the `call()` method.

The last method, `removeListener()`, simply reverses the process of `addListener()`. It searches through the `_listeners` property for the given event type to locate the specified event handler. If found, the event handler is removed by using the array&#8217;s `splice()` method, and otherwise it exits without doing anything.

Basic usage:

    var target = new EventTarget();
    function handleEvent(event){
        alert(event.type);
    };
    
    target.addListener("foo", handleEvent);
    target.fire({ type: "foo" });    //can also do target.fire("foo")
    target.removeListener("foo", handleEvent);

Practically speaking, you&#8217;ll likely not want to use an instance of `EventTarget` directly, but rather inherit from it:

    function MyObject(){
        EventTarget.call(this);
    }
    
    MyObject.prototype = new EventTarget();
    MyObject.prototype.constructor = MyObject;
    MyObject.prototype.foo = function(){
        this.fire("foo");
    };
    
    var o = new MyObject();
    
    o.addListener("foo", function(){
        alert("Foo just happened.");
    });
    
    o.foo();

Typically, events are fired in reaction to some other method call, as in this example (events are usually not fired external to the object that is publishing the events).

## What about&#8230;?

This is a pretty barebones implementation of a custom event providing object, so inevitably someone will come along and ask why I didn&#8217;t include one feature or another. There are, of course, a lot of enhancements you can make to custom events if you so desire. Some enhancements others have implemented:

  * Bubbling of events
  * Continue to execute event handlers even if one throws an error
  * Allow event handlers to cancel further processing or default actions

Each of these can be built pretty easily on top of the base presented in this post.

## Conclusion

Custom events are a very powerful and useful pattern in JavaScript programming, and your usage of them doesn&#8217;t have to rely on a large JavaScript library. Implementing your own custom events is easy. The implementation presented in this post is a minimum feature set that typically fulfills most requirements, but you can consider it as a starting point for more advanced functionality if your requirements are more complex.

 [1]: http://en.wikipedia.org/wiki/Observer_pattern
 [2]: http://en.wikipedia.org/wiki/Loose_coupling
 [3]: http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 [4]: http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
 [5]: http://javascript.about.com/od/browserobjectmodel/a/bom01.htm
 [6]: http://www.w3.org/DOM/
