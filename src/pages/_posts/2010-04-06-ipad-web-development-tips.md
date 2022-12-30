---
title: iPad web development tips
author: Nicholas C. Zakas
permalink: /blog/2010/04/06/ipad-web-development-tips/
categories:
  - Web Development
tags:
  - iPad
  - JavaScript
  - Safari
---
By now you, or someone you know, has an iPad. Of course, Apple has been preparing people on how to design their web sites for optimal use with the iPad (see [Preparing your Web Content for iPad][1]). Of course, the biggest thing is the lack of Flash support on the iPad. Apple is instead pushing people to use &#8220;HTML5.&#8221; I put that in quotation marks because most of the contexts in which I've seen this have been confusing. What Apple appears to mean by &#8220;HTML5&#8243; is that they want you to use `<video>` instead of Flash video and their CSS animations and transitions instead of Flash effects.

Semantics aside, there's a lot of information about how your site can be made to best work with the iPad, and I'd like to add a few nuggets to that body of knowledge.

## User-agent string

The previously-linked post describes the iPad Safari user-agent to be in the following format:

    Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10

<span style="text-decoration: line-through;">This was the user-agent string during the beta testing phase. The format is slightly different for the final release: </span>Although this appears to be the official user-agent string, I have received reports of a user-agent like this:

    Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10

You'll note the addition of &#8220;iPhone&#8221; in the operating system segment of the user-agent string. This brings the user-agent string for Safari on the iPad more into line with Safari on the iPhone and iPod Touch, which have the following user-agent strings, respectively:

    Mozilla/5.0 (iPod; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16
    Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16

This means a single user-agent string sniff for &#8220;iPhone&#8221; returns true in all three cases. The problem, of course, is that you might want to serve different experiences to the iPhone/iPod Touch than you would for the iPad. Make sure you double-check any user-agent sniffing designed to target these devices.

## JavaScript iPad detection

If you're trying to detect the iPad using JavaScript, there's a very simple way to do so: check `navigator.platform`. The value of `navigator.platform` is always &#8220;iPad&#8221; when Safari for iPad is the user-agent. This follows the tradition of &#8220;iPhone&#8221; for the iPhone and &#8220;iPod&#8221; for the iPod Touch. This is the most accurate way to detect the iPad from JavaScript, assuming you don't want to do a full user-agent string sniff.

    function isIPad(){
        return navigator.platform == "iPad";
    }

Also, keep in mind that `navigator.platform` doesn't change even when the user-agent string for a browser is changed.

## Screen dimensions and orientation

The iPad documentation says that the screen resolution is 1024&#215;768 as opposed to 480&#215;320 for the iPhone/iPod Touch. You can detect screen resolution via JavaScript by using `screen.width` and `screen.height`, though it may not work quite as you expect on the iPad. One would think that screen.width would be 768 when being held vertically and would be 1024 when held horizontally. However, `screen.width` is always 768 regardless of the way you're holding the iPad; likewise, `screen.height` is always 1024. It's worth noting that this is the same behavior as on the iPhone and iPod Touch.

Safari on the iPad does support the `window.orientation` property, so if necessary, you can use that to determine if the user is in horizontal or vertical mode. As reminder of this functionality:

  * `window.orientation` is 0 when being held vertically
  * `window.orientation` is 90 when rotated 90 degrees to the left (horizontal)
  * `window.orientation` is -90 when rotated 90 degrees to the right (horizontal)

There is also the `orientationchange` event that fires on the `window` object when the device is rotated.

You can also use CSS media queries to determine if the iPad is being held in vertical or horizontal orientation, such as:

    <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">
    <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css">

In this way, you can target styles specifically at different orientations. For more information, please see [iPad Orientation CSS][2].

## Mobile Safari is mobile Safari

The good news for web developers is that there's not a lot of difference between Safari on the iPad versus Safari on the iPhone or iPod Touch. Though the user-agent string is different and the screen size is different, the core browser remains the same. Thus, all of the capabilities that you've grown to learn about, such as touch and gesture events, are all there for the iPad. I cover these events, along with other mobile Safari-specific functionality, in [Professional JavaScript for Web Developers, 2nd Edition][3].

**Update (8-April-2010): **Added references to iPad orientation CSS.

**Update (21-April-2010): **Updated description of user-agent strings.

 [1]: http://developer.apple.com/safari/library/technotes/tn2010/tn2262.html
 [2]: http://www.cloudfour.com/ipad-orientation-css/
 [3]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
