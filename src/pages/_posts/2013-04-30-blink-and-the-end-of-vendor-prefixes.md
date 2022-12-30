---
title: Blink and the end of vendor prefixes
author: Nicholas C. Zakas
permalink: /blog/2013/04/30/blink-and-the-end-of-vendor-prefixes/
categories:
  - Web Development
tags:
  - Blink
  - Vendor Prefix
  - Web Development
  - WebKit
---
When Google announced that it was forking WebKit into Blink, there was a lot of discussion around what this would mean for web developers, and if the WebKit monoculture was truly breaking or not. Amongst the consternation and hypotheticizing was a detail that went overlooked by many: Blink's plan to stop creating new vendor prefixes. This, to me, is one of the most significant shifts in browser philosophy that has occurred in recent memory.

## Why vendor prefixes anyway?

The idea behind vendor-prefixed features (both JavaScript and CSS) is quite simple: give browser developers and web developers opportunities to work with as-yet-incompletely-specified features to get feedback. The goal was just. How do browser developers really know if a proposed feature will work if they don't actually try to build it? Likewise, how do web developers know that a feature is useful if they never have the chance to try and use it? Vendor-prefixed features gave browsers the freedom to implement stuff that might not be quite ready and web developers the chance to give feedback to the browsers regarding these features. It seemed like a win-win situation. So what went wrong?

## To a person with a hammer&#8230;

There were problems with these vendor-prefixed features. First, browser developers were hanging on to them for far longer than originally anticipated. Firefox had `-moz-border-radius` from the beginning and it was only officially removed in Firefox 13, a timespan of over 8 years. Vendor-prefixed properties ended up being a playground for browser vendors where any experiment, prototype, or other &#8220;not exactly standard&#8221; feature could be implemented. After all, it was free to do so and developers should be forewarned by the vendor-prefix that this thing shouldn't be relied upon.

Web developers, however, saw vendor-prefixed properties more as &#8220;the way that browser X is choosing to support this feature&#8221; rather than as an experimental extension. That meant web sites started to depend on these experimental features for their functionality or appearance, leading to the creation of tools that would help by pointing out or automatically adding the correct vendor-prefixed version of CSS properties. Lest we forget this mess:

    .box {
        background: #1e5799; /* Old browsers */
        background: -moz-linear-gradient(top,  #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1e5799), color-stop(50%,#2989d8), color-stop(51%,#207cca), color-stop(100%,#7db9e8)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */
    }

And in JavaScript, more and more code ended up looking like this<sup>[1]</sup>:

        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length &#038;&#038; !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }</code>

These patterns in CSS and JavaScript indicated that web developers were not treating these features as experimental, but as dependencies they needed for things to work. Browser vendors didn't do web developers any favors by keeping these features around as long as they did. Certainly, quickly-disappearing vendor-prefixed features would teach web developers not to rely on them.

## More recently

The quickly-disappearing theory of vendor-prefixed features also seemed to be incorrect. Internet Explorer 10 introduced some features with a `ms` extension in the beta version, and then removed the prefixes when the final version was released. This created a lot of confusion amongst web developers as to whether or not `ms` was necessary to use certain features. Likewise, Chrome had started moving features through vendor-prefixed versions to standard ones much faster than before. Yet, there were still features that lagged far behind, so there's a mix of `webkit` prefixed functionality: some that have been around for a while and no one's quite sure where they're going (`-webkit-appearance`) while others moved quickly into a standardized version (`webkitIndexedDB`).

Due to this confusion, and the desire of browsers to properly support a large number of sites, some Mozilla and Opera considered supporting `webkit` CSS properties to have better compatibility with the web at large.<sup>[2]</sup> There were a lot of opinion pieces about whether or not this was a good thing, but all agreed that vendor prefixes resulted in a massive mess that there was no easy way to clean up.

## Goodbye, vendor prefixes!

Blink's decision to stop creating new vendor-prefixed functionality is the right approach to me. Remember, the whole point of vendor prefixes was to allow browser developers to test implementations and for web developers to give feedback. You don't need vendor prefixes for that. Blink's approach is to allow you to turn on certain experimental features through browser settings is something I'm very excited about. Doing so allows browser developers to continue with experimental implementations without the fear that web developers will come to rely on those features. It also gives web developers the opportunity to turn on those features and try them out, with a very clear directive that you cannot rely on your users having this feature enabled, therefore you should not depend on it.

I definitely welcome and look forward to a prefix-free world. We got into such a mess and placed so much cognitive burden on so many people for so long that it may be a crime in certain parts of the universe. Everyone needs the ability to experiment so that the web can continue to develop new functionality, but we all need to be smarter about how we implement and use those features. The Blink approach follows a systems approach that I like: make it difficult for people to do the wrong thing. If other browsers adopt the same approach then we can be assured that the future CSS and JavaScript we write won't be hampered down by numerous duplicate declarations or annoying feature tests. We can all just go back to what we really want to do: make awesome web experiences without forking our code for every browser.

## References

  1. [requestAnimationFrame() polyfill][1] (GitHub)
  2. [tl;dr on vendor prefix drama][2] by Chris Coyier (CSS Tricks)

 [1]: https://gist.github.com/paulirish/1579671
 [2]: http://css-tricks.com/tldr-on-vendor-prefix-drama/
