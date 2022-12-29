---
title: React and the economics of dynamic web interfaces
date: 2016-01-26 00:00:00
categories:
- Programming
tags:
- JavaScript
- React
- jQuery
- Backbone
- Performance
---

I've been doing web development since 2000, and in that time I've seen eras marked by libraries and frameworks come and go. The Ajax era began around the same time as the jQuery era began, the Backbone era began several years later, and the React era really began about two years ago. Each of these eras brought with it a new realization about the way we can build dynamic web interfaces based on the tools available. jQuery made it clear that browser abstractions and CSS querying were important to developers, Backbone introduced the concept of client-side architecture to many, and React enables the creation of UI components instead of templates.

There are plenty of blog posts, talks, and videos touting how React works and why it's good for web development. There's been a lot of discussion around the virtual DOM, embedding HTML into JavaScript with JSX, organizing the UI into components. These are all interesting technical pieces of React, however, I don't believe the technical aspects alone account for its popularity. After researching a bit more, I realized why React is so powerful: it fundamentally changes an equation we've all been working with for years, and an idea can be much more powerful than the technology implementing it.

## The economics of dynamic web interfaces

Ever since the Document Object Model (DOM) was introduced and widely adopted in web browsers, web developers have been met with the same advice: the DOM is slow. Avoid DOM updates. Repaint and reflow will get you. In short, there was a tangible cost to dynamically updating a web page, and that cost is broken down into:

1. **Performance** - making changes to the DOM is slow due to repaint and reflow
1. **Efficiency** - you can end up creating memory leaks by losing track of node references
1. **Complexity** - make sure you're detaching and reattaching event handlers in the correct spots

When you stop and look at it this way, the cost of updating the DOM is high enough that the value you get from that cost needs to be sufficiently high to justify the cost. Or, you can try to lower the cost such that the value doesn't have to be as high to justify it. So we developed a whole series of approaches to try and lower that cost:

* Make only small changes. Large changes are slow, so if you can stick to small changes, it will be less slow.
* For big changes, detach the DOM node from the document, make your changes, and then reattach the DOM node. This will avoid repaint and reflow.
* Use event delegation to listen for events at a high level so you won't accidentally remove a node that has an important event handler.

Each of these approaches chips away at the cost of updating the DOM but doesn't do anything to fundamentally change the equation. In this world, you would never dream of issuing a command to re-render the entire page multiple times as it would undoubtedly cause a poor user experience. And that's exactly what React changes.

## React changes the equation

As you're undoubtedly aware, React solves a lot of these problems. It manages your event handlers for you, ensuring they're attached and detached at the correct time and on the correct nodes; it creates and destroys DOM structures efficiently; it uses virtual DOM diffing to determine which parts of a component have changed and only updates those parts. All of these technical solutions change the old equation: DOM updates are now fast.

(Yes, there is some debate[1] as to whether React is as fast as people claim or not. That's really not important for this discussion, as it's the *idea* of DOM updates being fast that is important).

Changing the equation has a ripple effect through how we develop web applications. This occurred to me first when looking at React Router[2]. The basic premise of React Router is that when the URL changes, it's intercepted by the History API's[3] state mechanism, and then the entire view is re-rendered. Before React, you would never think of dynamically re-rendering an entire page at one time, it would be too slow. The complexity of ensuring that the page worked correctly was high, and while some would do it, it would undoubtedly be the source of bugs. So we'd just stick to re-rendering smaller portions of the page.

But with React, you don't think twice about re-rendering the entire page because, in all likelihood, you won't be re-rendering *everything*. You'll just be re-rendering the pieces that need change. The cost of each render remains relatively consistent and is based only on the parts of the page that have changed, so there's little difference between manually re-rendering just the part of the page that has changed and re-rendering the entire page. Those are effectively the same operations.

React has, ironically, allowed us to once again think about writing web applications as a series of pages rather than a monolithic blob of JavaScript code. It's no wonder that developers have become so engaged with React and React Router: it's the same mental model as traditional server-only applications. A page is rendered, some changes are requested, then a page is rendered with those changes. The only difference is that this can all happen client-side.

## Conclusion

I'm still learning about React, and while the technical details are interesting, the way it has changed the dynamic web interface equation is really impressive to me. I ended up asking myself questions like, "what would you build if there was no cost to client-side rendering?" My mind took off in multiple directions at the same time and I came to realize just how game-changing React is. The most powerful thing any tool can do is fundamentally change the economics of the situation that it works in, and React has done that for client-side development.


## References

1. [React + Performance = ?](https://aerotwist.com/blog/react-plus-performance-equals-what/) (aerotwist.com)
1. [React Router](https://github.com/rackt/react-router) (github.com)
1. [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) (developer.mozilla.org)
