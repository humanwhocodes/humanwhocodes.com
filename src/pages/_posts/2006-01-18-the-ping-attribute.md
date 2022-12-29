---
title: The ping Attribute
author: Nicholas C. Zakas
permalink: /blog/2006/01/18/the-ping-attribute/
categories:
  - Web Development
tags:
  - Firefox
  - ping
---
Privacy concerns abound! The latest is the new Firefox <a title="Fried Fish: <a ping>" rel="external" href="http://weblogs.mozillazine.org/darin/archives/009594.html">ping attribute</a> that can be placed on links. Essentially, using `ping`, you can specify a location that should be notified when the link is clicked, for tracking purposes. There was an immediate flurry of responses related to privacy concerns. &#8220;We don&#8217;t want you knowing what we&#8217;re doing on your site,&#8221; they say.

I&#8217;ve got news for those people: we already know exactly what you&#8217;re doing on our site. We can tell how many pages you went to, the order in which you went to them, how long you stayed on each page, and at which point you navigated away. There are already methods of doing this that are widely employed by nearly every high-traffic web site on the Internet. This single new attribute (which is defined in <a title="Web Applications 1.0" rel="external" href="http://whatwg.org/specs/web-apps/current-work/#ping">Web Applications 1.0</a>, simply makes it easier to enable this tracking instead of coming up with constant hacks to provide the same behavior.

How do you think <a title="Amazon.com" rel="external" href="http://www.amazon.com">Amazon.com</a> knows what to offer you or what to show on the home page? They analyze everything you do on the site and use that to serve you information according to your preferences. Yet, no one is complaining about privacy issues there.

I&#8217;m a huge supporter of most privacy initiatives, but in this case, I think people have gone overboard. The bigger issue is, of course, if only Firefox supports it, what value does actually have?
