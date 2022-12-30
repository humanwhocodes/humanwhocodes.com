---
title: IE8 goodies and baddies
author: Nicholas C. Zakas
permalink: /blog/2008/03/09/ie8-goodies-and-baddies/
categories:
  - Web Development
tags:
  - Ajax
  - CSS
  - DOM
  - Internet Explorer
  - JavaScript
  - Selectors API
  - Storage
---
Even though I was sick this week, I managed to read a couple of things about Internet Explorer 8. My feelings were, I believe, about the same everyone else's: a mixture of excitement and disappointment. I'm excited for <a title="CSS Improvements in Internet Explorer 8" rel="external" href="http://msdn2.microsoft.com/en-us/library/cc304082(VS.85).aspx">CSS improvements</a> that are long overdue but sorely disappointed in the JavaScript &#8220;improvements&#8221;, though the CSS improvements are also less than I wish were there (no support for `:hover` on all elements? really?).

I was *very* disappointed at the purported DOM improvements were limited to making attributes work correctly, making `document.getElementById()` work correctly, and adding the `contentDocument` property to iframes. You'll excuse me if I can't get overly excited about those. There's still no DOM Level 2 support and we're stuck with the IE event model. Would it really be that hard to create a facade for DOM Level 2 events, even if you didn't support event capturing yet? Those of us in software engineering do this sort of thing all the time.

I am happy to see the <a title="Selecting Objects with JavaScript" rel="external" href="http://msdn2.microsoft.com/en-us/library/cc288326(VS.85).aspx">Selectors API</a> implementation, the addition of `postMessage()`, and <a title="Introduction to DOM Storage" rel="external" href="http://msdn2.microsoft.com/en-us/library/cc288326(VS.85).aspx">DOM storage</a>, even though it's not quite to spec.

My initial reaction to the <a title="XDomainRequest object" rel="external" href="http://msdn2.microsoft.com/en-us/library/cc288060(VS.85).aspx">XDomainRequest object</a> was, &#8220;what the hell?&#8221; I didn't understand why this couldn't have just been `XMLHttpRequest` such that when it sees &#8220;http://&#8221; at the beginning of a URL it knows it's a cross-domain request (similar to <a title="Cross-Site XMLHttpRequest" rel="external" href="http://ejohn.org/blog/cross-site-xmlhttprequest/">Firefox 3&#8242;s implementation</a>). But the more I thought about it, the more I grew to like Microsoft's approach. Same- and cross-domain requests are very different in terms of the information transmitted (cookies or no?) and dependencies (higher risk of failure). Given how important cross-domain access restrictions are, it seems like a good idea to make this a separate object altogether so there is no way to trick one object into thinking it should send cookies when it couldn't; `XDomainRequest` doesn't have the capability to send cookies so you'll never need to worry about it. Overall, I've come to believe that making cross-domain requests explicit on the client-side is a very good thing. It forces you, as the developer, to really understand that you're doing something different and it minimizes the opportunities for mistakes by the browser.

I'm hoping that there's more improvements to come before IE8 is finally released. In the meantime, my advice to everyone is to play with it but don't go crazy making fixes to your work quite yet. There's still a large number of bugs in the layout and JavaScript engines that will need to be fixed. Right now you could be attempting to work around something that won't be an issue in the future.

Oh, and in case anyone didn't notice, Microsoft has released a <a title="Internet Explorer Application Compatibility VPC Image" rel="external" href="http://www.microsoft.com/downloads/details.aspx?FamilyId=21EABB90-958F-4B64-B5F1-73D0A413C8EF&displaylang=en">timebombed IE8 Virtual PC image</a> so you can try out IE8 without worrying about destroying your machine. I still have memories of installing IE4 and then spending the next two days trying to breathe life back into my computer.
