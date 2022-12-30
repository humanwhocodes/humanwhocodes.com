---
title: 'ECMAScript 4: I hate it'
author: Nicholas C. Zakas
permalink: /blog/2007/10/31/ecmascript-4-i-hate-it/
categories:
  - Web Development
tags:
  - ECMAScript 4
  - JavaScript
---
There's been a lot of discussion about <a title="ECMAScript" rel="external" href="http://www.ecmascript.org">ECMAScript 4</a> lately. The <a title="ECMAScript 4 Language Overview Whitepaper" rel="external" href="http://www.ecmascript.org/es4/spec/overview.pdf">overview whitepaper</a> was recently released as well (which I equate to little more than a public relations ploy). Those who were in my birds-of-a-feather discussion at the Rich Web Experience know of my utter disdain for ECMAScript 4, and nothing I've read thusfar has changed my mind.

Chris Wilson <a title="ECMAScript 3 and beyond" rel="external" href="http://blogs.msdn.com/ie/archive/2007/10/30/ecmascript-3-and-beyond.aspx">just blogged about it</a> as well. I echo his sentiment that we need to move forward without breaking the Web. Microsoft has been criticized in the past for not immediately jumping on the standards bandwagon. While it's hurt in some ways, their reason is solid: too many web sites and applications rely on the way things currently work to just abandon &#8220;wrong&#8221; implementations.

Gabriele Renzi <a title="ECMAScript 4, the fourth system syndrome" rel="external" href="http://www.riffraff.info/2007/10/25/ecmascript-4-the-fourth-system-syndrome">blogged about it</a> as well, stating that ECMAScript 4 changes ECMAScript 3 too much. I concur with this evaluation as well. ECMAScript 4 is not an evolution, it's a revolution, and revolutions are as destructive as they are exciting. And it's the destructive part that I'm concerned about.

The main question I ask those who are in support of ECMAScript 4 or those who are working on it is this: what problem is it solving? What is it that ECMAScript 4 introduces that we absolutely can't either a) do now with ECMAScript 3 or b) live without. Array comprehensions? I've never had a need for them. True classes and interfaces? I've done fine without them to this point. Packages and namespaces? Haven't really stopped me. Private members? Don't really see the need.

On top of that, ECMAScript 4 &#8220;fixes&#8221; things in ECMAScript 3, meaning that your knowledge is no longer useful. John Resig just posted a <a title="Bug fixes in JavaScript 2" rel="external" href="http://ejohn.org/blog/bug-fixes-in-javascript-2/">list of fixes</a> that ECMAScript 4 makes to the language. Most of the things he lists are questionable, in my opinion, as to their value, especially since they can't be implemented in an ECMAScript 3 environment because it will cause code to break. That means the upgrade path from 3 to 4 is not a straight line, which further aggravates me.

I don't really see ECMAScript 4 as the next step in JavaScript's development; I see it as a completely different language. It's part Python, part Java, with a sprinkle of JavaScript. It's a new language, not the logical extension of an existing one&#8230;I just wish that everyone would start treating it accordingly.

By the way, I have no intention of using JavaScript 2. Ever.
