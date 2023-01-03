---
title: ECMAScript is dead; long live ECMAScript!
author: Nicholas C. Zakas
permalink: /blog/2008/08/19/ecmascript-is-dead-long-live-ecmascript/
categories:
  - Uncategorized
tags:
  - ECMAScript 3
  - ECMAScript 4
  - JSON
  - Objects
---
It hasn't been a secret that <a title="ECMAScript 4: I hate it" rel="internal" href="https://humanwhocodes.com/blog/2007/10/31/ecmascript-4-i-hate-it/">I hate ECMAScript 4</a>. Well, to be more precise, I hate it as an evolution of JavaScript on the web; on its own, I think it's an interesting and unique language. In writing my next book, I even came away with a certain appreciation for how it tips its hat to ECMAScript 3 in several areas. But ultimately, I hated it as the next generation of JavaScript.

I know from speaking with <a title="Douglas Crockford's Wrrrrld Wide Web" rel="external" href="http://www.crockford.com">Doug Crockford</a> that has was less-than-impressed with ECMAScript 4 as well and was talking about going in another direction. Apparently, everything hit the fan this week with Crockford and others triumphantly moving TC39 from being splintered between ECMAScript 3.1 and ECMAScript 4 to an agreement that ECMAScript 3.1 is the way to go. Finally, some sanity in the standardization process.

I prefer the evolutionary approach versus the revolutionary approach to ECMAScript, though I'm not completely happy with the current <a title="ECMAScript 3.1 Proposal Working Draft" rel="external" href="http://wiki.ecmascript.org/doku.php?id=es3.1:es3.1_proposal_working_draft">ECMAScript 3.1</a> proposal. My main points of contention at this point are:

  * **Native JSON** &#8211; I complained about this <a title="Keep JSON out of JavaScript" rel="external" href="https://humanwhocodes.com/blog/2007/09/13/keep-json-out-of-javascript/">before</a>. Language-specific features don't belong in the core of a programming language; these should be built as extensions. If you start by supporting JSON, then you also need to provide support for XML. I'd rather this become part of the browser's standard implementation, like `XMLHttpRequest` rather than having it defined in ECMAScript.
  * **Method name weirdness** &#8211; this applies mostly to the new `Object` methods. They either don't say what they do (`Object.fix()` prevents new properties from being added) or don't follow existing conventions (`Object.readOnly()` instead of `propertyIsEnumerable(name, false)`. And then throw in Crockford's `beget()` method. I have a lot of respect for the guy, but his choice of method names is a bit too unique for general consumption.
  * **Objects as hashes** &#8211; A lot of the new functionality around objects is intended to make them easier to use as hashes. I'd rather see a new `Hash` type that could be used for this purpose. We're overloading `Object` too much as it is; I'd hate to encourage it further.

I know the proposal is still under work, so hopefully some of these issues will be addressed. I think my favorite part of the proposal thusfar is the addition of secure `eval()` methods to safely invoke JavaScript code outside of the page's context. That's a toy I wish I could use right now.

Despite my typical criticisms, I think ECMAScript 3.1 is a much better approach towards moving JavaScript forward than ECMAScript 4 could ever have hoped to be. Maybe there's some hope for the standardization process (even though it took over a year to get to this point); here's hoping HTML 5 goes through a similar rationalization process.
