---
title: Lessons on @font-face from the F2E Summit
author: Nicholas C. Zakas
permalink: /blog/2011/04/05/lessons-on-font-face-from-the-f2e-summit/
categories:
  - Web Development
tags:
  - CSS
  - CSS3
  - Performance
  - Web Development
---
Last week, I helped host the F2E Summit at Yahoo!, our internal developer event that brings together front end engineers from all around the world. One of the most heavily covered topics was `@font-face`, and more specifically, it's pros and cons. Before I forgot all of the great information, I wanted to write it down. This information comes directly from <cite>yahoo.com/tablet: Lessons from the Tablet Front Page</cite><sup>[1]</sup> by Matt Seeley and <cite>Case Study:<br /> Wretch New Front Page &#8211; Featuring CSS3 for the future</cite><sup>[2]</sup> by Adam Wang. I'm doing nothing aside from summarizing their findings.

## Compatibility

If you think there are problems with `<video>` and `<audio>`;, then you might not have looked closely at `@font-face`. While there is reasonably decent compatibility across desktop browsers via OpenType, TrueType, and WOFF, this not necessarily the case for mobile. iOS 4.1 and earlier only supports SVG web fonts while Android only supports TrueType; iOS 4.2 and later support Open Type, True Type, and SVG fonts. That means your minimum CSS code to support iOS and Android ends up looking like this:

    @font-face {
        font-family: "Gotham Medium";
        font-weight: normal;
        font-style: normal;
        src: url(gothmed.ttf) format(truetype),
            url(gothmed.svg#id) format(svg);
    }

Perhaps not the worst thing in the world, but the compatibility issue isn't yet resolved. Since Internet Explorer prior to 9 does not support multiple values in the `src` property, it incorrectly parses the above as:

    @font-face {
        font-family: "Gotham Medium";
        font-weight: normal;
        font-style: normal;
        src: url(gothmed.ttf)%20format(truetype),%20url(gothmed.svg#id)%20format(svg);
    }

Catch that? The entire `src `property value turns into a single URL. That means Internet Explorer 8 and earlier makes a request to your server with this URL:

    /gothmed.ttf)%20format(truetype),%20url(gotmed.svg

Note that the part following `#` is considered a fragment identifier and so isn't part of the HTTP request. The problem is that this causes a 404 for every page view, so even though earlier Internet Explorer versions don't support this file format, they still make a request.

To fix this, Matt used a data URI for the TTF file, which Internet Explorer 8 and earlier drops on the floor and doesn't make any further requests. He also notes that data URIs don't work for SVG fonts as the data URI size hits some sort of upper limit for iOS.

## Unexpected behavior

Matt also pointed out an unexpected behavior when applying `text-overflow: ellipsis` to SVG fonts. This works fine for other fonts and behaves as expected. When applied to SVG fonts, `text-overflow: ellipsis` causes all of the characters to disappear except for the ellipsis. So instead of seeing &#8220;My text&#8230;&#8221;, you end up seeing just &#8220;&#8230;&#8221; when an SVG font is used on the element.

## Performance

When talking about performance, I'm also talking about user experience, and more importantly, user-perceived performance. Both Matt and Adam touched on the performance issues surrounding `@font-face`. Matt pointed out the flash of unstyled text (FOUT<sup>3</sup>) on iOS is actually a flash of *no text*. He found that even though the page would render, the text that used the web font would not render until the file was completely downloaded. He further noted that the download only began when an element using the web font was received by the browser. This led to applying styles using the web font on the `<html>` element to trigger download as quickly as possible. The problem isn't completely solved and is probably worth more research.

Another aspect of web font performance is the size of an individual font file. We in the United States are pretty spoiled when it comes to web fonts since our alphabet has only 26 letters and a few punctuation marks. Adam pointed out that Asian character sets are much large, and so font files can be as large as 4-5 MB per file. So if you're thinking about using non-standard fonts for Asian web sites, you may want to think again before imposing this on your users.

## Conclusion

It appears we still have a lot to learn about `@font-face` and its use on high-traffic web sites. There are still a lot of caveats to consider, not the least of which are compatibility and performance. I'd like to thank Matt and Adam for sharing their learnings so we can better understand the implications of a design centered around web fonts.

**Update (6-Mar-2011)** &#8211; Included iOS version information for web font support.


  1. <cite><a href="http://www.slideshare.net/mattseeley/yahoocomtablet">yahoo.com/tablet: Lessons from the Tablet Front Page</a></cite> by Matt Seeley
  2. <cite><a href="http://li228-21.members.linode.com/slide/f2e_summit_adam.html">Case Study:<br /> Wretch New Front Page &#8211; Featuring CSS3 for the future</a></cite> by Adam Wang
  3. <cite><a href="http://paulirish.com/2009/fighting-the-font-face-fout/">Fighting the @font-face FOUT</a></cite> by Paul Irish
