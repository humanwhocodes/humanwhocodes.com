---
title: "Empty string URLs &#8211; browser update"
author: Nicholas C. Zakas
permalink: /blog/2010/07/13/empty-string-urls-browser-update/
categories:
  - Web Development
tags:
  - Chrome
  - Firefox
  - HTML
  - HTML5
  - Internet Explorer
  - Safari
---
Frequent readers will remember my mission to stop browsers from making automatic requests when an empty string URL is reference in script. My mission began with a post entitled, [Empty image src can destroy your site][1], in which I explained just how devastating this browser quirk can be to an enterprise system. After that point, I started contacting browser vendors and discussing the issue on the WHAT-WG mailing list. I also did some research only to find that there were other tags besides `<img>` that suffered the same effects in some browsers, though in very inconsistent ways. I posted a [followup][2] on the progress I'd made in various arenas, including getting HTML5 updated to say that automatic downloads of resources should not happen for empty string URLs.

It's been eight months since my original post and from when I started contacting people about this issue, so I thought it would be good to update the current state. Keep in mind that Opera is intentionally left off of this list because they never have initiated a request for an empty string URL (hooray Opera!).

## Firefox

Firefox 3.5 fixed the issue with `<img src="">` so that it did not fire off a request as it did in previous versions. Unfortunately, it still fires a request for `<script src="">` and `<link href="">`. I filed a [bug][3] with Mozilla about this (the one that started the WHAT-WG discussion) and while a patch has been submitted on the bug, it hasn't yet been incorporated into a build. There hasn't been any movement in over a month, so perhaps it's time to nudge them again.

## Safari and Chrome

When I first went through and looked at the WebKit bug queue, I found an [existing bug][4] mentioning this issue. I added my comments as discussions continued with various people. Unfortunately, there wasn't much movement on the issue, which is particularly dismaying because WebKit made requests for `<img src="">`, `<script src="">`, and `<link href="">`, making it the worst current browser engine for this issue.

Seeing a lack of movement, I filed a [bug][5] against Chrome, hoping that they could apply some pressure. It took a little while, but the Chrome team eventually came back and said they would fix the issue. You can follow the conversation from the Chrome bug back onto the WebKit bug, where a patch has now been submitted for this issue. The Chrome bug indicates that this is scheduled to get fixed in Chrome 6 and there is no word yet on when it's scheduled for Safari.

## Internet Explorer

Being the least transparent of all browsers, it was difficult getting contacts to people who could make a difference. My initial attempts to get some movement failed, and I had to go back through my personal network to find another contact before I could make any progress. Finally, I got confirmation that the team believed fixing this issue was the right thing to do and that it would make it into a future build. They couldn't tell me what version or build this would be fixed in (corporate policy) but did assure me that it would be addressed in the future.

While sitting in the Internet Explorer 9 talk at Velocity, there was a slide featuring a bunch of performance-related fixes made in IE9. Towards the bottom of the slide was a bullet saying that `<img src="">` will no longer fire a request. When I got home, I setup the Internet Explorer 9 Platform Preview 3 to find that the issue had been fixed. So Internet Explorer 9 will definitely not fire these requests any more.

## Conclusion

We're not completely out of the woods yet, but with changes to HTML5 and all browsers now on the path towards resolving this issue, we could very well have seen the last of this issue by the end of 2010. I think this is a testament to just how great the web community is: to be able to take an issue in front of the people who can resolve it and see such amazing progress. I'd like to thank each of the browser vendors for responding to this issue. We're almost there!

**Update (14-Aug-2010):** Fixed typo.

 [1]: https://humanwhocodes.com/blog/2009/11/30/empty-image-src-can-destroy-your-site/
 [2]: https://humanwhocodes.com/blog/2010/03/16/empty-string-urls-in-html-a-followup/
 [3]: https://bugzilla.mozilla.org/show_bug.cgi?id=531327
 [4]: https://bugs.webkit.org/show_bug.cgi?id=30303
 [5]: http://code.google.com/p/chromium/issues/detail?id=38144
