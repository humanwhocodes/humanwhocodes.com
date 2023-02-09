---
title: "Wanted: Browser debug mode"
author: Nicholas C. Zakas
permalink: /blog/2008/04/22/wanted-browser-debug-mode/
categories:
  - Uncategorized
tags:
  - Browser
  - CSS
  - Debug
  - HTML
---
A little while ago, Doug Crockford wrote a <a title="The Wrong End of the Network" rel="external" href="http://blog.360.yahoo.com/blog-TBPekxc1dLNy5DOloPfzVvFIVOWMB0li?p=765">blog entry</a> where he proclaimed that web development was broken. His example was the suggestion that browsers implement a strict mode that would give informative errors. The assertion was that this type of validation was being done at the wrong end of the network, that code should be validated *before* being sent to the user. His main point was that validation should be done by developers so users don't have to worry about it. No argument there.

After a recent conversation with <a title="Wait till I come!" rel="external" href="http://www.wait-till-i.com/">Chris Heilmann</a>, I got to thinking about Crockford's assertion again. In traditional software engineering, you write some code, compile it, and test it (running it). You do this frequently before the final compiled output is delivered to the user. The compiler catches syntax and data type errors such that your program won't compile if even one exists. This is excellent feedback for developers and a lot of bugs never make it to production because of this.

Web development is interesting in that the browser acts like a compiler to developers and acts like an operating system to users. Our mode of operation is to write some code, load it into a browser, and test it. Users, on the other hand, fire up a web browser and navigate to a page. In effect, the browser is serving two different needs to two different audiences. It does one of these jobs very well; the other, not so much.

Browsers are optimized for the viewing experience, plain and simple. All kinds of errors are silently ignored or worked around as a page is being loaded. The browser will never tell you about a syntax error in your HTML or CSS (we lucked out and at least get notice of JavaScript errors). I'm not saying that browsers shouldn't do this, mind you. Browsers are necessarily targeted at users as their as far more of them than there are of us. But since browsers really do two jobs, can't we have it do both well?

What I'd like to see all browser vendors implement is a debug mode for browsers. This could be a setting buried deep in the browser options or a config file change&#8230;it doesn't matter how it's enabled. The end result is that the browser should tell you whenever a parsing error occurs in HTML or CSS. This would mean not failing over and trying to do the right thing, but exploding with a message that says why your code is incorrect. Right now, there's a lot of theorizing around what breaks parsers &#8211; this debug mode would answer those questions forever. Does an extra slash before the closing greater-than symbol really give the parser fits? How about non-escaped quotation marks inside of text nodes? Seriously, how many hours have you wasted trying to track down some obscure HTML or CSS syntax error that was causing layout issues?

I think Crockford is wrong about the location of validation. Since the browser acts as the compiler for us, we need it to tell us when it's unhappy. These errors should be supressed when the browser is in normal viewing mode so as not to disturb or confuse the user. When in debug mode, however, the gloves should come off and all manner of parsing errors should be exposed to the developer. It really shouldn't be that hard to implement and the payoff for developers would be huge.
