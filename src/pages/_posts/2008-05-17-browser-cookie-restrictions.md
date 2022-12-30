---
title: Browser cookie restrictions
author: Nicholas C. Zakas
permalink: /blog/2008/05/17/browser-cookie-restrictions/
categories:
  - Web Development
tags:
  - Cookies
  - Firefox
  - IE
  - Opera
  - WebKit
---
I've been doing some research into cookies for my upcoming book and came across some interesting facts about the way browsers handle cookies. I started out by looking at the number of cookies that browsers allowed per domain. The results were interesting:

  * Microsoft indicated that Internet Explorer 8 increased the cookie limit per domain to 50 cookies but I've found that IE7 also allows 50 cookies per domain. Granted, this may have been increased with a system patch rather than having the browser's first version ship like this, but it's still more than the 20 that was commonly understood to be the limit.
  * Firefox has a per-domain cookie limit of 50 cookies.
  * Opera has a per-domain cookie limit of 30 cookies.
  * Safari/WebKit is the most interesting of all as it appears to have *no perceivable limit* through Safari 3.1. I tested setting up to 10,000 cookies and all of them were set and sent along in the `Cookie` header. The problem is that the header size exceeded the limit that the server could process, so an error occurred.

So the prevailing knowledge that browsers limit per-domain cookies to 20 is no longer valid. Another interesting inconsistency is how browsers react when too many cookies are set. With the exception of Safari, which sets all cookies regardless of the number, there are two approaches:

  1. The least recently used (LRU) approach automatically kicks out the oldest cookie when the cookie limit has been reached in order to allow the newest cookie some space. Internet Explorer and Opera use this approach.
  2. Firefox does something strange: it seems to randomly decide which cookies to keep although the last cookie set is always kept. There doesn't seem to be any scheme it's following at all. The takeaway? Don't go above the cookie limit in Firefox.

The total size of cookies also varies from browser to browser. This is another one that is a little hard to comprehend, but here's what my tests show:

  * Firefox and Safari allow cookies with up to 4097 characters, that's 4096 for the name and value and one for the equals sign.
  * Opera allows cookies with up to 4096 characters, which is for the name, value, and equals sign.
  * Internet Explorer allows cookies with up to 4095 characters, which is for the name, value and, equals sign.

It's worth noting that single-byte characters were used for these tests; multi-byte characters will, naturally, count as two. In all browsers, any cookie that is set with a size greater than the limit is ignored and never set.

My conclusion after doing all of these tests is that the traditional beliefs of cookie limitations (mostly taken from the original <a title="HTTP Cookies" rel="external" href="http://curl.haxx.se/rfc/cookie_spec.html">cookie specification</a>) are no longer valid. We should use caution when using cookies and always take the lowest limit as the one to look out for.
