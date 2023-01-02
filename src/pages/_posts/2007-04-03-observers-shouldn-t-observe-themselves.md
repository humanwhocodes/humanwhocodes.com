---
title: "Observers shouldn't observe themselves"
author: Nicholas C. Zakas
permalink: /blog/2007/04/03/observers-shouldn-t-observe-themselves/
categories:
  - Professional
tags:
  - Design Patterns
  - Observer
  - Programming
---
I love design patterns, they make life so much easier. Particularly, I love the <a title="Observer pattern" rel="external" href="http://en.wikipedia.org/wiki/Observer_pattern">observer pattern</a>. If you use JavaScript, you're already familiar with this pattern: events. Events are how we tie functionality to a page and create interactions for the user. You can even create your own observer objects using JavaScript libraries such as <a title="Yahoo! User Interface Library" rel="external" href="http://developer.yahoo.com/yui/">YUI</a> or even my own <a title="Downloads" rel="internal" href="{{site.url}}/downloads/">zEvents</a>. The problem is in how I've seen them implemented.

I'll say this as clearly as possible: **observers shouldn't observe themselves**. An event indicates that something of importance will occur or has occurred. There is some default behavior that is of interest to observers and the event is the way to broadcast that this important moment in processing has occurred. The default behavior should *never* be executed by an observer. Let me state this as a concrete example: if your object publishes a load event, you shouldn't assign an event handler that does the loading. The default behavior should be there regardless of the event. In fact, you should be able to remove all events and have the object still perform its duties appropriately.

Again, I love the observer pattern and I'm a big fan of creating objects with custom events (loosely coupled objects rule!). But let's have some sanity around events. Let the important moments be just those, and make sure your object works appropriately without any observers subscribing to its events.
