---
title: New site design
author: Nicholas C. Zakas
permalink: /blog/2009/02/08/new-site-design/
categories:
  - Web Development
tags:
  - CSS
  - Personal
  - Web Design
---
It's been a long time coming, but I've finally updated my site's design. My contest failed to deliver enough designs for there to be a real competition so I just decided to do a very simple evolution of the previous design. The primary goal for this redesign was to improve the readability of the blog posts.

Back when I first implemented the original design, people were mostly using screen resolutions of 800&#215;600 and I was actually praised for having a site that was very readable. Over the years, however, people's resolutions changed and my design didn't. This led to angry emails from people asking why I couldn't make my site more readable. The sad truth was that I just didn't have the time to tweak the design because the code was such a horrid mess. Any small tweak meant days of work, and I just didn't have the time with everything else that was going on in my life.

This weekend I finally sat down and did a quick sketch of what I thought the site could look like. I started by looking at the fonts I typically use in a blog post and worked my way out from there. Because I didn't have a lot of time, I decided to go with an image-less design. I kept the same color scheme as the previous design and moved from a three-column layout to a two-column layout. Keeping things simple like this helped me get the design done quickly because it eliminated a lot of experimentation.

I made judicious use of the YUI CSS foundation. The page includes Nate Kochley's excellent [Fonts][1], [Reset][2], and [Base][3] CSS libraries. I applied Reset and Fonts to the entire page and applied Base specifically to the content area of the page. Thanks to Nate's great work, my content was instantly more readable without any additional work. I was able to adjust some of the default styles slightly to create a look that ties in with the rest of the design.

I don't consider the design done at this point. There's still some cleaning up I need to do around the edges and thinks I want to tighten up. I also haven't yet updated the Contact page because there's a bunch of logic in there that I don't have time to do right now.

And in case you're wondering, from concept to HTML to full implementation took me four hours. So yes, it's a bit rough, but I think it's a big step forward.

 [1]: http://developer.yahoo.com/yui/3/cssfonts/
 [2]: http://developer.yahoo.com/yui/3/cssreset/
 [3]: http://developer.yahoo.com/yui/3/cssbase/
