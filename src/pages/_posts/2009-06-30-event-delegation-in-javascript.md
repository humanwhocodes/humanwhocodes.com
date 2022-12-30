---
title: Event delegation in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2009/06/30/event-delegation-in-javascript/
categories:
  - Web Development
tags:
  - Delegation
  - DOM
  - Events
  - JavaScript
  - Performance
---
Last week, I spoke at and attended the [Velocity][1] web performance conference in San Jose. It was a lot of fun and I learned a lot in the other sessions I sat in on. During one session, [Steve Souders][2] announced to everyone that I had covered event delegation in my chapter from his new book, <cite><a href="http://www.amazon.com/gp/product/0596522304?ie=UTF8&tag=nczonline-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0596522304">Even Faster Web Sites</a></cite>. Unfortunately, Steve misspoke as that topic isn't covered, so I'm going to fill in the gap with this post.

## Traditional event handling

Event delegation is, quite simply, using a single event handler to manage a particular type of event for the entire page. This isn't a new idea, but it is an important one to grasp for performance. Most of the time, you'll see code like this in web applications:

    document.getElementById("help-btn").onclick = function(event){
        openHelp();
    };
    
    document.getElementById("save-btn").onclick = function(event){
        saveDocument();
    };
    
    document.getElementById("undo-btn").onclick = function(event){
        undoChanges();
    };

This traditional way of coding assigns an event handler to each element that is actionable. For web sites with only a small amount of interaction, this may be okay. Large web applications, however, can grind to a halt when there are too many event handlers. The problem here isn't necessarily a speed issue but rather a memory issue. If there are hundreds of possible interactions, there will end up being hundreds of ties between DOM elements and your JavaScript code. The more memory required of your web application, the slower it will run in general. Event delegation helps by minimizing this issue.

## Event bubbling and capturing

Event delegation would be possible if not for the flowing nature of events. Early on in web development, browser vendors had to answer a philosophical question: when you click an area on a web page, what element are you actually interacting with? The problem came with the definition of interaction. Clicking within the bounds of an element is somewhat ambiguous. After all, a click on any element is also within the bounds of other elements. Consider clicking on a button. You're actually clicking within the bounds of the button element, within the bounds of the `<body>` element, and within the bounds of the `<html>` element (see figure below).

<p style="text-align: center;">
  <a href="/images/wp-content/uploads/2009/06/event-delegation-1.png"><img class="alignnone size-full wp-image-2126" src="{{site.url}}/blog/wp-content/uploads/2009/06/event-delegation-1.png" alt="Clicks within rectangles on a web page" width="280" height="232" /></a>
</p>

At the time of this problem, there were two dominant browsers: Netscape Navigator and Internet Explorer. Each decided to solve this problem in a different way. Netscape defined an approach called event capturing, where events first occur on the highest object in the DOM tree (document) and then work down to the deepest element affected by the event. So in this example, event capturing has the click event first handled by `document`, then the `<html>` element, then `<body>`, and finally the `<button>` element.

Internet Explorer approached the problem in the exact opposite way. The IE team defined an approach called event bubbling. Event bubbling said that the deepest element affected by the event should receive the event first, then its parent should receive the event, and then it's parent, etc., until the `document` object finally receives the event. Even though the document doesn't have a distinct visual representation separate from `<html>`, it is still deemed to be its parent and thus bubbling continues up the DOM structure. The previous example would then see the `<button>` element receiving the event first, then `<body>`, `<html>`, and finally, `document`.

<p style="text-align: center;">
  <a href="/images/wp-content/uploads/2009/06/event-delegation-2.png"><img class="alignnone size-full wp-image-2127" src="{{site.url}}/blog/wp-content/uploads/2009/06/event-delegation-2.png" alt="Diagram of event capturing and event bubbling" width="320" height="329" /></a>
</p>

When defining the DOM, the W3C apparently found merit in both approaches and so the DOM Level 2 Events specification defines both event capturing and event bubbling as being present. First, the `document` receives the event, then the capturing phase commences to the most specific element affected by the event. Once the event is handled by that element, it bubbles back up to the `document`. The DOM `addEventListener()` method accepts three arguments: the name of the event to handle, a function to execute as the handler, and a Boolean set to `true` to handle the event during the capturing phase or `false` to handle during the bubbling phase. Most web developers have always been told to provide `false` as this argument so that it behaves the same way as `attachEvent()` in IE. Example:

    //bubbling phase handler
    document.addEventListener("click", handleClick, false);
    
    //capturing phase handler
    document.addEventListener("click", handleClick, true);

Attaching an event handler via a property (`element.onclick = function(){}`), automatically assumes you want to use the bubbling phase to handle the event (this is done for backwards compatibility). Pretty much every browser except Internet Explorer (even through version 8.0) supports the DOM Level 2 events specification and therefore supports both capturing and bubbling. Internet Explorer still has its own proprietary event system that supports just bubbling.

## Event delegation using bubbling

The key to event delegation is to use the bubbling aspect of events to handle them at the highest level (usually `document`). Not all events bubble, but mouse and keyboard events do, and fortunately, those are the ones you're in which you're interested. Revisiting the earlier example, you can handle all of the `click` events by assigning an event handler to the `document` and then checking the event's target to determine the course of action.

    document.onclick = function(event){
        //IE doesn't pass in the event object
        event = event || window.event;
        
        //IE uses srcElement as the target
    Â    var target = event.target || event.srcElement;    
    
        switch(target.id){
            case "help-btn":
                openHelp();
                break;
            case "save-btn":
                saveDocument();
                break;
            case "undo-btn":
                undoChanges();
                break;
            //others?
        }
    };

Using event delegation, the number of functions necessary to manage events has been cut back to one. All click events are now handled by a single function which then *delegates* to the appropriate function depending on the target of the event. The same can be down for `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `dblclick`, `keyup`, `keydown`, and `keypress`. A word of caution, though, `mouseover` and `mouseout` are difficult to handle via event delegation due to their nature (the mouse is considered &#8220;out&#8221; when it moves from a container to its child).

Note: You can also accomplish event delegation via event capturing, but it only works in browsers that support capturing and therefore not in Internet Explorer.

## Benefits

Event delegation has several benefits to the performance of a web application:

  1. Fewer functions to manage.
  2. Takes up less memory.
  3. Fewer ties between your code and the DOM.
  4. Don't need to worry about removing event handlers when changing the DOM via `innerHTML`.

Moving from traditional event handling to event delegation has improved the overall performance of large-scale web applications around the world. It's become so important that JavaScript libraries such as [YUI][3] and [jQuery][4] have started to bake it into their core interfaces. It really takes very little effort to implement event delegation, but the performance gains can be quite noticeable through the user interface. This is especially apparent when you move from dozens of event handlers to just one. Give event delegation a try and you may just never do traditional event handling again.

 [1]: http://en.oreilly.com/velocity2009
 [2]: http://www.stevesouders.com/
 [3]: http://developer.yahoo.com/yui/3/
 [4]: http://www.jquery.com/
