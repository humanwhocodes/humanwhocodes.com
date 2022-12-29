---
title: What are web standards?
author: Nicholas C. Zakas
permalink: /blog/2008/11/28/what-are-web-standards/
categories:
  - Uncategorized
tags:
  - Microsoft
  - W3C
  - Web Standards
---
Working in web development, you hear the word &#8220;standards&#8221; a lot. And I mean, a lot. Internet Explorer is lambasted for not supporting standards, Opera holds itself up as the only browser that truly tries to fully implement standards, and web developers around the world chide each other for not following standards. The funny thing is, most people truly don&#8217;t understand what standards are or how they become so.

Let&#8217;s start with the #1 myth on the web: the W3C creates standards. This is completely false. The W3C&#8217;s [stated goal][1] is to create standards but it cannot *actually *create them. Why is that? Because standards are, quite simply, anything that the majority of people decide to do. Web standards, therefore, are anything that majority of browser vendors decide to follow. The W3C can make recommendations as to what should be done but [it has no authority][2] to force implementation. If the W3C could actually create standards, then we&#8217;d not still be waiting around for proper browser implementations of XHTML, which was finalized in 1999. The W3C has no power to force browser vendors to do anything; anyone can decide to do whatever they want. Even vendors who sit on the W3C often don&#8217;t adhere to the specifications (and all of the browser vendors do).

So if I and my buddies got together this weekend and came up with an idea for a cool JavaScript feature, we&#8217;d be in the same spot as the W3C. If we actually convinced Mozilla, Apple, Microsoft, and Opera to implement the feature, then we would have created a new standard&#8230;the same as the W3C. It doesn&#8217;t take an official stamp or seal to make something a standard, it just takes implementation by two or more browsers.

The W3C has been traditionally bad at creating standards. What they are incredibly good at is documenting and normalizing what has already been implemented in browsers. Such activity led to the creation of HTML 4 and DOM Level 1 based mostly on innovations included in Internet Explorer 4. Yes, folks, Microsoft was more influential over the creation of these standards than any other browser vendor because they went ahead and innovated without waiting for someone to tell them it was okay.

In fact, many of Microsoft&#8217;s innovations have become standards on their own. The `innerHTML` property. The `XMLHttpRequest` object. Rich text editing via `designMode`. No browser would dare implement anything without supporting these; that&#8217;s what makes them standards. The W3C is now going through the process of formalizing these in the [HTML 5 specification][3] and the [XMLHttpRequest specification][4].

It&#8217;s become fashionable to blame Microsoft for not following standards, but one could argue that if the most dominant browser on the planet isn&#8217;t implementing something, it may not actually be a standard. Internet Explorer has, as a conservative estimate, 80% market share worldwide. That means only 20% of Internet users are using &#8220;standards-compliant&#8221; browsers. Is something really a standard when only 20% of the market&#8217;s users use it? Ponder that for a bit.

The truth is that Microsoft has merely followed the lead of the most rebellious company that ever touched the web: Netscape. Netscape was the one to first say, &#8220;we&#8217;re gonna do whatever we want,&#8221; and introduced the `<blink>` tag. History has shown that the web moves forward when browser vendors start innovating. And Microsoft isn&#8217;t the only one that does this. Mozilla implemented non-standard features such as `XSLTProcessor`; Safari implemented the `<canvas>` tag; Opera implemented the `<event-source>` tag and the `window.opera` object. Yet no one complains about them going out on their own and innovating&#8230;it&#8217;s only Microsoft that&#8217;s the bad guy. Why is that?

As Alex Russell has [pointed out][5] numerous times, innovation doesn&#8217;t belong in the hands of the W3C. True innovation, innovation that can move the web forward, needs to come from the browser vendors. Let the free market decide what features are most desirable in web browsers and then ask the W3C to document that; these are true standards. Waiting for the epic HTML 5 specification to get done in [2022][6] won&#8217;t push the web forward. Getting smart guys like [Alex working on browsers][7] does.

 [1]: http://www.w3.org/Consortium/
 [2]: http://alex.dojotoolkit.org/2008/07/power-vs-authority/ "Power vs. Authority"
 [3]: http://www.w3.org/html/wg/html5/
 [4]: http://www.w3.org/TR/XMLHttpRequest/
 [5]: http://alex.dojotoolkit.org/2007/12/the-w3c-cannot-save-us/
 [6]: http://blogs.techrepublic.com.com/programming-and-development/?p=718
 [7]: http://alex.dojotoolkit.org/2008/11/joining-google/
