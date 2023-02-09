---
title: Safari lies
author: Nicholas C. Zakas
permalink: /blog/2007/05/08/safari-lies/
categories:
  - Web Development
tags:
  - DOM
  - JavaScript
  - Safari
  - WebKit
---
You know, the Document Object Model gives us a wonderful method called `hasFeature()`, which gives browsers a chance to indicate what parts of the specification that they properly support. The idea being that developers could query this method to determine what parts of the <acronym title="Document Object Model">DOM</acronym> are available. This works great in theory, but it falls completely apart when browsers lie. And Safari lies.

I'm using Safari 2.0.3 on my Mac Mini. I was trying to use mouse events as defined in <acronym title="Document Object Model">DOM</acronym> Level 2. If I run `document.implementation.hasFeature("MouseEvents", "2.0")`, it returns true. However, if I create an event and try to call `initMouseEvent()`, the initializer for <acronym title="Document Object Model">DOM</acronym> mouse event objects, I get an error. Why? Because the method doesn't exist. Further, the `initUIEvent()` method doesn't exist either&#8230;but mouse event is a subclass of <acronym title="User Interface">UI</acronym> event, so it that method should be there too. That means not only does `document.implementation.hasFeature("MouseEvents", "2.0")` return an incorrect value (true), but `document.implementation.hasFeature("UIEvents", "2.0")` is also incorrect (returns true as well).

What is the point of having these standards if browser vendors aren't honest. At least in IE, pretty much everything returns false&#8230;thanks for being honest! When browsers lie about their capabilities, developers end up spending an unnecessary amount of time tracking down what exactly is breaking. Especially for Apple, which aims to be conformant to the specifications, this is a huge step backwards.

To be fair, I checked the last nightly of WebKit, and this issue appears to be fixed. But still, because Safari lied initially, I need to do extra tests to figure out if I'm using a truthful version or not. Ugh.

**P.S.** Thanks to everyone who sent emails and left blog comments of support for my last post. It really meant a lot to me. I may not be back to full form right now, but I'm getting there slowly. Thanks.
