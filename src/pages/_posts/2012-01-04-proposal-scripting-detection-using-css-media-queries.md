---
title: 'Proposal: Scripting detection using CSS media queries'
author: Nicholas C. Zakas
permalink: /blog/2012/01/04/proposal-scripting-detection-using-css-media-queries/
categories:
  - Web Development
tags:
  - CSS
  - JavaScript
  - Media Query
---
I&#8217;ve been doing a lot of thinking about CSS media queries lately. I&#8217;m a big fan of media queries, as I think they bring a sense of sanity to feature detection. That&#8217;s a big reason why I was investigating CSS media queries in JavaScript<sup>[1]</sup> and will continue to do so. I think we&#8217;re only scraping the surface of what can be done with media queries on the web. As part of my pondering over the holiday break, I scribbled down a few notes of ways I&#8217;d like to use media queries. I just proposed the first one to the CSS working group.

## The Proposal

Yesterday, I sent an email<sup>[2]</sup> to the CSS working group with my proposal. The basic idea is to allow you to determine if scripting is enabled in the browser using a media query. The proposal can be summed up with a few examples:

    @media screen and (script) {
        /* styles to apply only when scripting is enabled */
    }
    
    @media screen and not (script) {
        /* styles to apply only when scripting is disabled */
    }

So, just like you currently use `device-width`, `orientation`, and so on to detect features of the device, you could also use `script` in the same way. 

## Rationale

In the realm of progressive enhancement, you don&#8217;t want to show page elements that can&#8217;t be used. This may be as simple as an arrow next to link indicating a dropdown menu is available. If JavaScript is disabled, you want the link to act like a regular link and not confuse people by having an arrow that means nothing. So you want to apply the style that shows the arrow only if JavaScript is enabled.

The most common approach to this problem is to add a class to the `<html>` element via JavaScript. So somewhere on the page, you put:

    <script>
    document.documentElement.className += " js-enabled";
    </script>

This adds the class `js-enabled` via JavaScript. Of course, this only gets executed when JavaScript is enabled. You can then define CSS rules such as:

    .arrow {
        /* empty */
    }
    
    .js-enabled .arrow {
        background: url(image.png) no-repeat;
    }

It&#8217;s a bit of a hack, but this basic technique is in use by large sites such Twitter and the Yahoo! homepage, as well as being done automatically by Modernizr and YUI. 

While this technique works, it has two downsides. First, you need to include that little JavaScript snippet (or a supporting library) to ensure the class ends up being added. Second, it alters the specificity of your rules, which can adversely affects the cascade. 

## Clarifications

I&#8217;m a big believer that common patterns should be codified and standardized so that the development community can move on to more interesting challenges<sup>[3]</sup>. As such, it seems that the community has spoken that we want to define different styles when JavaScript is enabled, and CSS media queries seem like the right approach.

The <cite>CSS Media Queries specification</cite><sup>[4]</sup> states:

> A media query consists of a media type and zero or more expressions that check for the conditions of particular media features. Among the media features that can be used in media queries are &#8216;width&#8217;, &#8216;height&#8217;, and &#8216;color&#8217;. By using media queries, presentations can be tailored to a specific range of output devices without changing the content itself.

The term *media feature* is key. When I was first debating myself over whether scripting support is appropriate for a CSS media query, I went and read the specification. Script support is just as much a media feature as color depth and orientation. It&#8217;s a capability of that particular device at the time your page is loaded. Given that, I felt comfortable proposing the inclusion of `script` as another media feature to test. 

To be clear, my proposal&#8217;s goal is to easily indicate whether or not scripting is enabled in a browser. Think of it as a relative of the `<noscript>` element. So instead of doing something like this:

    <noscript>
    <style>
    .foo {
        color: red;
    }
    </style>
    </noscript>

You could do this:

    @media screen and not (script) {
        .foo {
            color: red;
        }
    }

Of course, by omitting `not`, you could also apply changes when scripting is enabled.

Some non-goals of this proposal are:

  * **Replacing JavaScript feature detection.** You will still be checking, in JavaScript, if certain features are available. In short: I&#8217;m not looking to propose implementing media query features for all possible JavaScript APIs. If you want that, you should use Modernizr.
  * **Enabling JavaScript in CSS.** I have no desire to have JavaScript in CSS in any way, shape, or form.
  * **Be JavaScript-centric in detection.** Actually, the intent is to indicate if *scripting* is enabled, not just JavaScript. It would probably be easy to extend the syntax, such as `(script:"text/javascript")`, but I&#8217;m not sure that&#8217;s necessary at this point.

And as I always like to remind people: no one would force you to use this feature if it&#8217;s implemented. If you don&#8217;t like it, you can always leave it to those who do.

## Conclusion

I think CSS media queries are one of the best things to happen to the web, and I look forward to using them in new and interesting ways. Adding feature detection for scripting seems like a logic step towards standardizing a fairly common practice. The good news is that Florian Rivoal, one of the editors of the <cite>CSS Media Queries</cite> specification has agreed<sup>[5]</sup> to write it up as a proposal for inclusion in <cite>CSS Level 4 Media Queries</cite>. I hope the proposal is able to move forward quickly.

## References

  1. [CSS media queries in JavaScript, Part 1][1] by me
  2. [Proposal: Detecting JavaScript with media queries][2] by me
  3. [When web standards fail us][3] by me
  4. [CSS Level 3 Media Queries][4]
  5. [Re: Proposal: Detecting JavaScript with media queries][5] by Florian Rivoal

 [1]: {{site.url}}/blog/2012/01/03/css-media-queries-in-javascript-part-1/
 [2]: http://lists.w3.org/Archives/Public/www-style/2012Jan/0034.html
 [3]: {{site.url}}/blog/2011/10/03/when-web-standards-fail-us/
 [4]: http://www.w3.org/TR/css3-mediaqueries/
 [5]: http://lists.w3.org/Archives/Public/www-style/2012Jan/0046.html
