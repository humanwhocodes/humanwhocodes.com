---
title: Event order of blur and change
author: Nicholas C. Zakas
permalink: /blog/2007/02/06/event-order-of-blur-and-change/
categories:
  - Web Development
tags:
  - blur
  - DOM
  - Events
  - focus
  - JavaScript
---
I'm in the middle of fighting a battle with the `blur` and `change` events on a textbox. The requirement is simple: if the text changed in the textbox after losing focus, do one thing; if the text hasn't changed when the textbox loses focus, do something else. This led me to an experiment to determine how `blur` and `change` events affected each other.

My initial assumption was that `change` would fire first since it's a combination of a value change and `blur`, so if I prevented the default behavior of `change` that should effectively kill the `blur` event. I tested this hypothesis in Internet Explorer and found this to be the case. The `change` event fires first and, when the default action is prevented, it stops the `blur` event from firing. Thinking I had solved the problem, I did a quick double check in Firefox&#8230;naturally it didn't work.

In Firefox, the `blur` event fires *before* the `change` event, so preventing the default behavior of `change` does nothing. A quick check of Opera 9 showed the same result as Firefox, thus indicating that Internet Explorer is probably the faulty implementation.

The <a title="DOM Level 2 Events" rel="external" href="http://www.w3.org/TR/DOM-Level-2-Events/events.html">specification</a> states that neither `blur` nor `change` can be canceled and that only `change` bubbles, but doesn't seem to provide any guidance on how the two should interact (if at all). I'm wondering who, then, has the correct implementation and who has the incorrect one? Does majority rule in this case?
