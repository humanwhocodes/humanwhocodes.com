---
title: The Web could be heading for another dark age
author: Nicholas C. Zakas
permalink: /blog/2008/03/31/the-web-could-be-heading-for-another-dark-age/
categories:
  - Web Development
tags:
  - CSS
  - CSS 3
  - HTML
  - HTML 5
  - Internet Explorer
  - Netscape
  - Selectors API
---
Right now is a very exciting time for the Web as things are changing incredibly fast. Right now is also a very dangerous time for the Web as things are changing incredibly fast. We're almost back to the early days of Netscape versus Internet Explorer. I'm not talking 4.0 here folks, I'm talking 3.0.

For the third generation of browsers, there was a lot going on, too. Netscape had recently invented the concept of cookies and JavaScript. Microsoft countered with VBScript. Both were fighting for control over the future of HTML, resulting in proprietary elements such as `<blink/>` and `<marquee/>` being implemented and several more like the `<math/>` and `<ruby/>` elements being suggested. Changes were being submitted to the HTML specification at a dizzying pace. Browsers then started implementing things that they assumed would be accepted and ultimately become part of the spec. Basically, they placed bets on what would happen as intellectuals argued the future of the Web.

When Internet Explorer finally pulled ahead and ultimately destroyed Netscape (which was still clinging to thoughts of JavaScript Style Sheets for styling pages among other missteps), we moaned and groaned about how horrible a Microsoft-dominated Web would be. But, as Crockford says, this was just the stabilizing force that the Web needed. This long period of inaction let developers become familiar with the development environment and led to the emergence of techniques such as Ajax. Then the browser market heated up again.

At present, we have several specs currently being worked on: <a title="Selectors API" rel="external" href="http://www.w3.org/TR/selectors-api/">Selectors API</a>, <a title="HTML 5" rel="external" href="http://www.w3.org/html/wg/html5/">HTML 5</a>, and <a title="CSS Current Work" rel="external" href="http://www.w3.org/Style/CSS/current-work">CSS 3</a>. All of them show some level of promise, but all of them also show that we could be heading into another dark age. Browser vendors are well-represented on the working groups and dominate the discussion and decision phases of the draft process. The specifications are incomplete and some parts seem to have not been thought through completely. Recommendations for certain features are inserted without any background information as to the problem that the feature is solving. It sometimes makes me wonder if the people primarily responsible have done any serious web development recently.

Making matters worse, browsers are started to implement these ill-defined and unfinished specs, leaving room that their implementation will become incompatible. Look at what happened to Firefox and its key events implementation. DOM Level 2 originally had key events in an early draft, so Mozilla went ahead and implemented it. When the specification was finalized, key events were removed and only reintroduced in DOM Level 3, which leaves Firefox with an incompatible implementation. Already, browsers are implementing the Selectors API, whose method names seem not only unnecessarily verbose but nonsensical. Where did `querySelector()` come from? I could understand `query()`, but I don't understand why &#8220;selector&#8221; is in there. All major browser vendors have already started implementing HTML 5, which is barely a newborn. There's also some CSS 3 being implemented even though no progress has been made in years.

When browsers start implementing incomplete specifications, it's the web developers that suffer. The market is flooded with incompatibilities because no one knows what a correct implementation is. Further, each browser tends to think that its proposal will be the accepted one and this stubborn view means that we'll probably be left with incompatibilities for some time.

The best thing that can happen at this point is for browsers to stop implementing incomplete specs and for web developers to demand this. The Web was doing fine before the Selectors API, HTML 5, and CSS 3 started coming up in conversations. We can certainly wait a couple of years for things to solidify. I'd also like to see independent developers get called in for formal reviews of the specs as they're being developed. I'm not talking about more people from Microsoft or Opera or Apple, I'm talking about people who will give unbiased opinions that are based on personal experience. Specs should be fulfilling developer needs more than corporate needs, and I'm really afraid that's not the case now.

But hey, I could be wrong. Things may end up just fine. But I also could be right, and though I hope I'm not, there could be dark days ahead for the Web.
