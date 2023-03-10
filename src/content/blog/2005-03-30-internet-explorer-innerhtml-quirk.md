---
title: Internet Explorer innerHTML Quirk
author: Nicholas C. Zakas
permalink: /blog/2005/03/30/internet-explorer-innerhtml-quirk/
categories:
  - Web Development
tags:
  - innerHTML
  - Internet Explorer
  - JavaScript
---
I admit it: when I hit a wall programming I type a few words into <a title="Google" rel="external" href="http://www.google.com">Google</a> and click on the first few results. Very rarely have I ever looked at the Microsoft <a title="Microsoft Knowledge Base" rel="external" href="http://support.microsoft.com/search/">Knowledge Base</a>. But every once in a while someone will forward me an article from there and I'm just left thinking, &#8220;damn.&#8221;

Case in point, did you know that when you insert `img` tags into a document using `innerHTML` that the images are re-requested from the server and not used from the cache? According to <a rel="external" href="http://support.microsoft.com/default.aspx?scid=kb;en-us;319546">this article</a>, this functionality is &#8220;by design&#8221; in Internet Explorer and won't be fixed. Well, it's good to know that this happens but why is that how it should behave? Shouldn't you always be using cached data whenever possible? What's even more annoying is that the solutions they give aren't really practical. Sometimes you don't know what images will be loaded, so there's no way to preload them. The second proposed solution, to provide a time delay, doesn't explain how one would go about creating such functionality. Argh.
