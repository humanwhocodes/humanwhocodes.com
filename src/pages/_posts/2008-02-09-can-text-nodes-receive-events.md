---
title: Can text nodes receive events?
author: Nicholas C. Zakas
permalink: /blog/2008/02/09/can-text-nodes-receive-events/
categories:
  - Web Development
tags:
  - Events
  - Internet Explorer
  - JavaScript
  - Opera
---
One of the most annoying things that developers discovered when the first DOM-compliant browser, Netscape 6, was released had to do with events. Due to the new DOM event flow model, text nodes could receive events. The result was utterly confusing. Suppose you had the following code:

`<div id="myDiv">Click Me</div>`

If an event handler was assigned to this `<div/>`, and then the text &#8220;Click Me&#8221; was clicked, the event would fire on the text node. Keeping strictly to the letter of the DOM law, this makes sense, since events are supposed to be fired on the deepest part of the DOM tree that was clicked. However, this confused everyone because it&#8217;s not the way we were used to thinking about events. I even put a warning in the events chapter of <a title="Professional JavaScript" rel="external" href="http://www.amazon.com/exec/obidos/redirect?link_code=ur2&tag=nczonline-20&camp=1789&creative=9325&path=http%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F0764579088%2F">Professional JavaScript</a> to be aware of the issue.

As I&#8217;m getting around to rewriting the events chapter for the second edition, I decided to try this out again. To my surprise, I&#8217;m not able to get events to fire on text nodes in any DOM-compliant browser (Opera, Safari, or Firefox). When I click on the `<div/>` element in the previous example, I get all indications that the event is firing on the `<div/>` element itself, not on the text node.

So now I&#8217;m a bit confused. Was the Netscape 6 implementation faulty or are today&#8217;s browsers faulty? Did common sense overrule the specification? Please keep in mind that I&#8217;m certainly not complaining about this, this is the way it should be. I&#8217;m just curious as to when this issue was &#8220;fixed&#8221; and if it&#8217;s possible for text nodes to receive events anymore. Anyone with any insights?

A few other oddities about events I&#8217;ve noticed:

  * Opera prior to 9.5 doesn&#8217;t fire events on the event target in the capture phase. According to <a title="Event Capturing Explained" rel="external" href="http://my.opera.com/hallvors/blog/2006/10/12/2006-10-12-event-capture-explained">this post</a>, this was intentional and is the way the spec should be even though other browsers allow it. Apparently Opera got tired of fighting that battle and has given in with version 9.5 to firing events on the event target during the capturing phase.
  * Opera&#8217;s event bubbling appears to be very confused. Events bubbling up through the page hit `window` before they hit `document`.
  * Internet Explorer has the correct scope for event handlers defined using the DOM Level 0 method of property assignment but not when using `attachEvent()`.

Man, events are fun!
