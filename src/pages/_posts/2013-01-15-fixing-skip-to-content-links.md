---
title: 'Fixing &#8220;Skip to content&#8221; links'
author: Nicholas C. Zakas
permalink: /blog/2013/01/15/fixing-skip-to-content-links/
categories:
  - Web Development
tags:
  - Accessibility
  - HTML
---
**Update (15-Jan-2013): ** After a few tweets about this and some re-testing, it appears the issue discussed in this post only affects Internet Explorer and Chrome. The post has been updated to reflect this.

If you've been doing web development for any amount of time, you have probably come across the recommendation to create a &#8220;skip to content&#8221; or &#8220;skip navigation&#8221; link for accessibility purposes<sup>[1]</sup>. The idea is to have the first link on the page linked to the main content so that those who can't use a mouse can easily avoid tabbing through all of the site navigation just to get to the main content. The first tab stop on the page is a &#8220;skip to content&#8221; link that simply links to the container of the main content. Depending on the site, the link might always be visible or might only be visible when focus is set to it. Either way, the HTML looks something like this:

    <a href="#content">Skip to Content</a>
    
    <!-- other links -->
    
    <div id="content">
        <!-- your content here -->
    </div>

Basically, this takes advantage of hashes for page navigation. The link to `#content` automatically moves the user down to the element whose ID is &#8220;content&#8221;. This type of navigation is very popular on large content sites where pages have a table of contents.

## The problem

Although the &#8220;skip to content&#8221; link approach works most of the time, Internet Explorer 9 and Chrome aren't obeying the rules. While the visual focus of the browser shifts to the element being linked to, the input focus stays where it was. For example, if I press tab and then enter on a &#8220;skip to content&#8221; link, the browser will scroll down to that element so I can read the content. If I then press tab again, the input focus moves to the next focusable element after the &#8220;skip to content&#8221; link, not to the next link in the content area.

The difference between visual focus and input focus is subtle. Visual focus is most often affected by scrolling. When you navigate to an element on the page using a hash, the browser scrolls that element into view, effectively changing the visual focus so you can read. If you use the up and down arrows, they interact with the scrollbar naturally. However, if you use tab to change focus then you end up scrolling back to the previous spot on the page. That's because the input focus didn't change along with the visual focus. 

This is definitely a but in WebKit<sup>[2]</sup> and potentially one in Internet Explorer (perhaps one that's been around for a while<sup>[3]</sup>). The WebKit one is a bit more innocuous whereas the Internet Explorer one appears to be related to styling. If the element being targeted by the in-page link has a width and height set via CSS, then the focus is set appropriately. Without both dimensions specified, the input focus doesn't shift in Internet Explorer.

## A solution

The best solution I came up with is to use a small piece of JavaScript to create a better behavior. The basic idea is to watch for changes in the URL hash using `onhashchange` and then set focus to the element that now has visual focus. Since that element is usually a `<div>` or some other container, these elements aren't the focusable by default (links and form controls are). To make them focusable, you need only set `tabIndex` to -1 before calling `focus()`. Doing so means that the element won't be in the regular tab order but you can still set focus to it using JavaScript. Here's the code:

    window.addEventListener("hashchange", function(event) {
    
        var element = document.getElementById(location.hash.substring(1));
    
        if (element) {
    
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }
    
            element.focus();
        }
    
    }, false); 

I've chosen to use the DOM Level 2 method for adding an event handler, but you can just as easily use a browser agnostic approach. The `hashchange` event is supported back to Internet Explorer 8, so you may want to mix in `attachEvent()` if you're supporting that browser as well. Of course, you could also just use a JavaScript library that abstracts that difference away from you.

What I like about this solution is that it doesn't interfere with what the browser is doing as it shifts visual focus. All it does is wait for that shift to happen and then set focus to the element that you're already looking at. That allows you to start tapping into the content area immediately while preserving the behavior of the back button.

## Conclusion

The &#8220;skip to content&#8221; links can be a great aid to accessibility. Once Internet Explorer and Chrome fix their buggy implementations, the fix mentioned in this post won't be necessary. As someone who uses only a keyboard on the web, I would greatly appreciate it if more sites used skips links to help with navigation.

## References

  1. [Skip Navigation Links][1] (WebAIM)
  2. [Skip links and other in page links in WebKit browsers][2] (456 Berea Street)
  3. [Keyboard Navigation and Internet Explorer][3] (Juicy Studio)

 [1]: http://webaim.org/techniques/skipnav/
 [2]: http://www.456bereastreet.com/archive/201203/skip_links_and_other_in_page_links_in_webkit_browsers/
 [3]: http://juicystudio.com/article/ie-keyboard-navigation.php
