---
title: The great Safari keypress debacle
author: Nicholas C. Zakas
permalink: /blog/2008/03/21/the-great-safari-keypress-debacle/
categories:
  - Web Development
tags:
  - DOM
  - Events
  - keydown
  - keypress
  - keyup
  - Safari
  - WebKit
---
This week, Safari released version 3.1 with a whole list of <a title="About the Safari 3.1 Update" rel="external" href="http://docs.info.apple.com/article.html?artnum=307467">new goodies</a>. While everyone was going gaga over the <a title="Selectors API" rel="external" href="http://www.w3.org/TR/selectors-api/">selectors API</a> and native `getElementsByClassName()`, there was another change that didn't quite get announced: the overhauled key event system.

Before there was any specification indicating how key events should work, there was a de facto standard. Any key that was pressed down fired a `keydown` event, and if that key happened to affect textbox input, it would also fire a `keypress` event immediately after. Internet Explorer has done this for a while. Safari's previous implementation also fired the `keypress` event for some non-character keys, such as the arrow keys. This was an error in their implementation; an error that was fixed in Safari 3.1. This immediately led to a rash of complaints against Apple/WebKit for &#8220;breaking key events&#8221; when, in fact, it was developers who were incorrectly using the events in the first place. The `keypress` event doesn't hold any magical powers over the `keydown` event; for non-character keys, there is was no difference between the two in earlier Safari versions.

Now, to be a good web citizen, I think that Apple/WebKit should have surfaced this change front-and-center to let people know that this change was coming. But really, no web browser does such things currently (it's an issue that has irked me for some time), so I don't know that we could expect Safari to start the trend. The focus for each new browser release is always on new features rather than changed features.

I believe the key problem (no pun intended) around key events stems from the DOM. DOM Level 2 originally had a section about key events that prescribed how they should work. That section was later taken out before it became a recommendation, leaving browser vendors without clear guidance on key events. Firefox even erroneously implemented the original DOM Level 2 key events anticipating that it would become part of the specification. Key events didn't re-emerge until DOM Level 3, and when they did, they were quite different from the de facto standards that browsers had been implementing for years. So no browsers currently support DOM Level 3 events and Safari was just trying to be as compatible as possible with what's already out there.

In this situation, blame can be passed around to a number of parties. The bottom line is that if browser vendors want popular sites to work in their browser, they need to better communicate the changes from version to version. I understand that it's a tough problem to solve but it's really the only way to move the Web forward.
