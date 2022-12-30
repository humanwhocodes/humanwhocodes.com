---
title: Cross-domain XHR removed from Firefox 3
author: Nicholas C. Zakas
permalink: /blog/2008/04/27/cross-domain-xhr-removed-from-firefox-3/
categories:
  - Web Development
tags:
  - Ajax
  - Cross Domain
  - Firefox
  - Internet Explorer
  - JavaScript
  - XDomainRequest
  - XDR
  - XHR
  - XMLHttpRequest
---
When Internet Explorer 8 introduced the <a title="XDomainRequest object" rel="external" href="http://msdn2.microsoft.com/en-us/library/cc288060(VS.85).aspx">XDomainRequest</a> object, I was really excited because I had just read <a title="Cross-site XMLHttpRequest" rel="external" href="http://ejohn.org/blog/cross-site-xmlhttprequest/">John's post</a> about cross-domain XHR in Firefox 3. Great, I thought to myself, the top two browsers now support cross-domain requests&#8230;we're finally getting somewhere.

This weekend I was digging in a little more when I found the Firefox <a title="Cross-Site XMLHttpRequest" rel="external" href="http://developer.mozilla.org/en/docs/Cross-Site_XMLHttpRequest">cross-domain XHR documentation</a>. A note at the top now boldly states that this feature is enabled only for privileged scripts and extension developers. While this feature was included in Firefox 3 betas at least through 3 (I missed 4), in beta 5 this feature has been removed for web content.

I must say that I'm pretty disappointed in this. Digging through some of the documentation and discussions surrounding the implementation, I'm hoping that everyone can rationalize how this should work in Firefox so it can be brought back. I was never a huge fan of overloading the XHR object to do this because it seems like there are just too many differences and security issues you'd have to lock down. IE's approach, making a completely different object, makes a lot of sense to me and quite logically locks down functionality that otherwise would be part of an `if` statement in the XHR code.

I do think it's a shame that the removal of cross-site XHR in Firefox 3 wasn't more widely publicized. It's inclusion was announced and featured on blogs everywhere; one would think it's removal would also garner such attention.
