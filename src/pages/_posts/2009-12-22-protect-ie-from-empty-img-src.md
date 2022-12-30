---
title: Protect IE from empty img src
author: Nicholas C. Zakas
permalink: /blog/2009/12/22/protect-ie-from-empty-img-src/
categories:
  - Web Development
tags:
  - HTML
  - Internet Explorer
  - Web Development
---
In a [previous post][1], I discussed the problem with setting an HTML image's `src` attribute to an empty string. In Internet Explorer, Safari, and Chrome, this results in a second request being made to the server (Firefox 3.5 patched this behavior and Opera doesn't exhibit the behavior). My post also showed a couple of ways to detect this issue on the server side at the time a request is received. I noted that it's very difficult to detect these requests from Internet Explorer because it doesn't send different `Accept` headers for image requests than it does for HTML requests. After a bit more investigation, I've found a way to prevent this behavior in Internet Explorer through version 8.

## The <base> tag

I'm still not entirely sure why this is true, but if you specify a base URL in the page using the [`<base>` tag][2]. For those unaware, the `<base>` tag is used to alter how URLs are resolved and linked to within a page. The href attribute is used to indicate the base URL from which relative URLs on the page should be resolved. This affects not just the `<a>` tag, but also any tags that accept a URL as an attribute value. Consider the following:

    <img src="smile.gif">

To resolve smile.gif for this tag, the browser looks at the path of the containing page and then append smile.gif. So if the page is `{{site.url}}/blog/`, then the image is resolved to `{{site.url}}/blog/smile.gif`. This is how normal URL resolution works. Adding a `<base>` tag alters the default URL resolution. Example:

    <html>
    <head>
        <base href="/stories/">
    </head>
    <body>
        <img src="smile.gif">
    </body>
    </html>

If this page has a path of `{{site.url}}/blog/`, then the image's URL is resolved to `{{site.url}}/stories/smile.gif`. That's because the base URL is reset to `{{site.url}}/stories/` by the `<base>` tag, so all URLs on the page are now resolved relative to that address. This is a convenient way to avoid duplicating the same URL information for every link on the page.

## The approach

For some reason that I still don't understand, the act of setting a base URL on a page causes Internet Explorer to ignore any `<img src="">` that appears on the page, including `<input type="image" src="">`. As long as a <base> tag appears on the page with an href specified, IE will no longer make a request to the server when one of these tags is present. You can try this yourself by viewing HTTP traffic while loading the following two pages (I recommend [Fiddler][3]):

  * [No base URL][4]
  * [Base URL][5]

If you have the possibility of an empty string image URL on your page, it would serve you well to set the base URL for the page. Since you probably don't want to actually change how the URL is resolved, just set the base URL to the current path for the page. In PHP, you can use this code:

    echo "<base href=\"{$_SERVER['REQUEST_URI'];}\">";

That way, you're including the base URL to avoid the extra image request without changing how all URLs on the page are resolved.

## Conclusion

Specifying a base URL on a page isÂ a quick and easy solution to prevent an extra request due to an empty image source URL in Internet Explorer. It's important to note that this has *no effect* on the other browsers with this behavior. For those, you'll still have to use the server-side detection logic shared in the [previous post][1] to detect such a request and abort before server resources are used. At least for Internet Explorer, the solution is simple and can save your server.

## Credits

Although I started running tests with this as part of an investigation based on a [WHAT-WG mailing list discussion][6], Ben Alman hinted at this solution in a [tweet to me][7] that I apparently missed. Had I been paying attention, this would have been a much faster followup!

 [1]: {{site.url}}/blog/2009/11/30/empty-image-src-can-destroy-your-site/
 [2]: http://www.w3schools.com/TAGS/tag_base.asp
 [3]: http://www.fiddlertool.com/
 [4]: {{site.url}}/experiments/html/BadURL.php?tag=img
 [5]: {{site.url}}/experiments/html/BadURL.php?tag=img&base=1
 [6]: http://lists.whatwg.org/pipermail/whatwg-whatwg.org/2009-December/024368.html
 [7]: http://twitter.com/cowboy/status/6312339175
