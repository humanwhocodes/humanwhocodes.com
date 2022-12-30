---
title: Making accessible icon buttons
author: Nicholas C. Zakas
permalink: /blog/2013/04/01/making-accessible-icon-buttons/
categories:
  - Web Development
tags:
  - Accessibility
  - ARIA
  - HTML
  - Screen Readers
---
Last week, Pamela Fox tweeted a question to me:

<blockquote class="twitter-tweet">
  <p>
    @<a href="https://twitter.com/slicknet">slicknet</a> Do you know the best way to make a <button> that just has an icon accessible? title, aria-label, hidden text?
  </p>
  
  <p>
    — Pamela Fox (@pamelafox) <a href="https://twitter.com/pamelafox/status/316692888538980353">March 26, 2013</a>
  </p>
</blockquote>

&nbsp;

As tends to happen on Twitter, we fruitlessly exchanged 140 character messages trying to get some resolution before I finally offered to write a blog post explaining my view. Along the way, I discovered that I had misunderstood the original question (yay 140 character responses) and needed to do a little research. And so here it is.

## Simple icon buttons

In the beginning, there `<input type="image">`. Many seem to have forgotten this part of HTML. Early on, web developers wanted to use images as submit buttons rather than the plain submit button and `<input type="image">` allowed you to create an image that actually works like a button. Further, this type of image actually announces itself as a button in screen readers. Anytime you want the user to click on something and *not* navigate to another page, you're looking for a button, and `<input type="image">` gives you a nice compact way of doing that while supporting the same attributes as `<img>`. For example:

    <input type="image" src="email.png" width="14" height="14" alt="Email">

In this case, the major screen readers (JAWS, NVDA, VoiceOver) announce &#8220;Email button&#8221; in all major browsers, reading the `alt` text and identifying the image as a button. Part of the reason this pattern isn't used much anymore is due to the ubiquity of CSS sprites. However, it's still my favorite pattern, and with a little adjusting, works fine with sprites:

    <style>
        .email-btn {
            width: 14px;
            height: 14px;
            background: url(activities.png) 0 -85px no-repeat;
        }
    </style>
    
    <input type="image" src="pixel.gif" class="email-btn" alt="Email">

This example uses a single transparent GIF as the `src` of the image. Doing so allows a background image to be applied and show through via the &#8220;email-btn&#8221; class. If the thought of having an extra download for an icon button is unpalatable to you, you can also use a data URI representing a single transparent pixel:

    data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==

In either case, the major screen readers still announce &#8220;Email button&#8221; when focus is set to the button, which is exactly what you want.

## Using <button>

The `<button>` element has becomes the element of choice for making non-text buttons in HTML. This makes complete sense because you can put whatever HTML you desire inside and it renders as a button. However, the end result is not the same as with the more traditional approach. First, consider a really simple example:

    <button><img src="email.png" width="14" height="14" alt="Email"></button>

This button produces some very different results in different browsers and different screen readers:

  * **Chrome 25 (Win7/NVDA):** &#8220;Button&#8221;
  * **Internet Explorer 9 (Win7/NVDA):** &#8220;Button&#8221;
  * **Firefox 19 (Win7/NVDA):** &#8220;Email graphic button&#8221;
  * **Chrome 25 (Win7/JAWS):** &#8220;Email button&#8221;
  * **Internet Explorer 9 (Win7/JAWS):** &#8220;Email button&#8221;
  * **Firefox 19 (Win7/JAWS):** &#8220;Email button&#8221;
  * **Chrome 25 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Safari 6 (Mac OS X/VoiceOver):** &#8220;Button&#8221;
  * **Firefox 19 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Mobile Safari (iOS 6/VoiceOver):** &#8220;Button&#8221;

So basically, using a `<button>` element introduces a barrier for most screen reader/browser combinations to figure out what the button is doing. It doesn't matter if the `<img>` is used more traditionally or with a sprite, you don't get much information in most places.

You can give screen readers a hint by using the `aria-label` attribute on the `<button>` element. Doing so means providing a plain-text label for the button as a whole:

    <button aria-label="Email"><img src="email.png" width="14" height="14" alt="Email"></button>

By adding an `aria-label`, the various screen readers and browsers respond as follows:

  * **Chrome 25 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Internet Explorer 9 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Firefox 19 (Win7/NVDA):** &#8220;Email graphic button&#8221;
  * **Chrome 25 (Win7/JAWS):** &#8220;Email Button&#8221;
  * **Internet Explorer 9 (Win7/JAWS):** &#8220;Email Button&#8221;
  * **Firefox 19 (Win7/JAWS):** &#8220;Email button&#8221;
  * **Chrome 25 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Safari 6 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Firefox 19 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Mobile Safari (iOS 6/VoiceOver):** &#8220;Email button&#8221;

So now you actually have a nice response from all of the major browsers and screen readers. You can use this same technique regardless of what you place inside of the `<button>` element.

## Font Awesome

Part of what I missed from my original Twitter discussion with Pamela was that she was using Font Awesome<sup>[1]</sup>. For the uninitiated, Font Awesome is an icon font that contains numerous common icons for use in HTML. Instead of using separate image files or a sprite that you have to manage, you can use an icon font and reference the relevant icon by using a class name. The icon is inserted via CSS, so it has no negative accessibility concerns. This example is similar to the one Pamela brought up:

    <button><span class="icon-envelope"></span></button>

The question is, how do you add descriptive text to this? One way would be to add an `aria-label` attribute as in the previous section:

    <button aria-label="Email"><span class="icon-envelope"></span></button>

Since that always works for `<button>` elements, that's the fastest and easiest way forward. The result in various screen readers:

  * **Chrome 25 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Internet Explorer 9 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Firefox 19 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Chrome 25 (Win7/JAWS):** &#8220;Email Button&#8221;
  * **Internet Explorer 9 (Win7/JAWS):** &#8220;Email Button&#8221;
  * **Firefox 19 (Win7/JAWS):** &#8220;Email button&#8221;
  * **Chrome 25 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Safari 6 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Firefox 19 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Mobile Safari (iOS 6/VoiceOver):** &#8220;Email button&#8221;

I prefer this over the second (and often overused option) of hiding text off screen, in which case you would have code similar to this:

    <button><span class="icon-envelope"></span><span class="hide-offscreen">Email</span></button>

The idea here is to position text far off in some direction such that it's not visible to sighted users but is still read out for screen reader users. I'm not a huge fan of hiding text off screen, primarily because it feels very hacky&#8230;a bit like a sleight of hand trick. Additionally, each of the major ways of hiding text off screen comes with some sort of caveat. Using a big negative `text-indent` doesn't work well with RTL languages, using a `height` of 0 means VoiceOver won't announce the contents, and so on. Jonathan Snook put together a fantastic post<sup>[2]</sup> outlining the different approaches and the caveats to each.

The screen readers all end up announcing the same message as when using `aria-label`.

Do I use hiding text off screen periodically? Yes, but only as a measure of last resort when I've exhausted all other possibilities. I would encourage you to do the same.

One final note: don't use `title` as your button label. Example:

    <button title="Email"><span class="icon-envelope"></span></button>

While it would be ideal if screen readers were able to use this value, the results are very uneven:

  * **Chrome 25 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Internet Explorer 9 (Win7/NVDA):** &#8220;Email button&#8221;
  * **Firefox 19 (Win7/NVDA):** &#8220;Button email&#8221;
  * **Chrome 25 (Win7/JAWS):** &#8220;Email Button&#8221;
  * **Internet Explorer 9 (Win7/JAWS):** &#8220;Email Button&#8221;
  * **Firefox 19 (Win7/JAWS):** &#8220;Email button&#8221;
  * **Chrome 25 (Mac OS X/VoiceOver):** &#8220;Button&#8221;
  * **Safari 6 (Mac OS X/VoiceOver):** &#8220;Button&#8221;
  * **Firefox 19 (Mac OS X/VoiceOver):** &#8220;Email button&#8221;
  * **Mobile Safari (iOS 6/VoiceOver):** &#8220;Email button&#8221;

Even though the `title` attribute is helpful for sighted users as a hint, it doesn't provide any real consistent benefit as far as screenreaders go.

## Update (07-April-2013)

As several commenters mentioned, my recommendation results in an empty `<button>` element. I wasn't too concerned about that at first, but as I thought about it more and more, the purist in me got a little bit upset. Yes, in an ideal world, you should be able to remove all JavaScript and CSS and the page still make sense. In this case, you'd be left with a button that has no descriptive text whatsoever. That turned my stomach and I went back to the drawing board to try and find a way to have text inside of the `<button>` element without hiding it offscreen. After some tinkering, here's what I came up with:

    <style>
    .btn-label {
        font-size: 0;
        height: 1px;
        overflow: hidden;
        display: block;
    }
    </style>
    
    <button class="icon-envelope"><span class="btn-label">Email</span></button>
    

The idea is to have the descriptive text inside of the `<button>` element while placing the Font Awesome class on the `<button>` itself. This allows you to modify the inner `<span>` element separately from the `<button>`. The `<span>` is set to be practically invisible by using a `font-size` of 0, a `height` of one pixel (to make VoiceOver happy). The rest is used to ensure the `<span>` never grows any larger.

In all browsers and screenreaders mentioned in this post, the text &#8220;Email button&#8221; is announced using this pattern. The solution is something that makes the purist side of me very comfortable. You aren't tempting fate by moving text offscreen yet the `<button>` element still has text inside of it. You don't have to use ARIA to provide additional context for screen readers in this case.

## Conclusion

I still prefer the old-school `<input type="image">` element for creating clickable icons. However, in the case of using an icon font, that really doesn't work. In that situation, <del>I prefer to use the <code>aria-label</code> attribute to provide additional text for screen readers. Doing so yields the most consistent treatment for buttons across major browsers and screenreaders.</del> I prefer to use some in-line hidden text to ensure the `<button>` element has actual text inside. As a bonus, you don't have to worry too much about how position text off screen might affect other parts of the page.

## References

  1. [Font Awesome][1] (GitHub)
  2. [Hiding content for accessibility][2] by Jonathan Snook (snook.ca)

 [1]: http://fortawesome.github.com/Font-Awesome/
 [2]: http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
