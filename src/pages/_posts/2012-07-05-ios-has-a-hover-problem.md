---
title: iOS has a :hover problem
author: Nicholas C. Zakas
permalink: /blog/2012/07/05/ios-has-a-hover-problem/
categories:
  - Web Development
tags:
  - CSS
  - Hover
  - iOS
  - Mobile
---
Recently, I got my first iPad. I've had an iPhone since last year, and had gotten used to viewing the mobile specific view of most websites. When I got the iPad, it was my first time experiencing desktop webpages using a touch interface. Generally, the transition was easy. I just tapped on links I wanted to navigate to. Although sometimes they hit target seemed a little bit too small, I would just zoom in and tap away. Then I started noticing something: on certain links it was taking two taps instead of one to navigate. Most worrisome to me, personally, was that I noticed this on the WellFurnished home page. Of course, I had to dig in and figure out what was happening.

## :hover exists everywhere

One of the things we've been told and I've repeated over and over again is that touch devices have no concept of hover. On a desktop with a mouse, you can move the pointer over an area of the screen and it can detect that to create a visual cue. That doesn't mean you have activated that particular part of the screen, it's just a visual indication that this part of the screen is &#8220;alive&#8221;. 

Naturally, with a touch device, there really isn't a lingering pointer. Designers who have relied on hover states to show functionality all of a sudden had unusable interfaces. This was one of the trends I fought hard against while I was at Yahoo: making sure that important functionality wasn't displayed only on hover. It's a clear accessibility issue for people who are not using a mouse.

So it goes without saying that most developers expect touch devices to simply ignore CSS rules containing `:hover`. That's a logical assumption to make because, once again, there's no such thing as a hover on a touch device. Except when there is.

This is where the people at Apple might have been a bit too smart. They realized that there was a lot of functionality on the web relying on hover states and so they figured out a way to deal with that in Safari for iOS. When you touch an item on a webpage, it first triggers a hover state and then triggers the &#8220;click&#8221;. The end result is that you end up seeing styles applied using `:hover` for a second before the click interaction happens. It's a little startling, but it does work. So Safari on iOS very much cares about your styles that have `:hover` in the selector. They aren't simply ignored.

## No double taps

When I started experiencing the double tap behavior, I was noticing what appeared to be a hover state being shown after the first. Immediately I started looking at all the rules containing `:hover`. If I removed those rules, then the link worked with one tap. As soon as I added the rules back in, I was back to having the double tap. Clearly, this had something to do with how `:hover` is handled by Safari in iOS.

My first step was to create a simple example to see if I could reproduce it. I started out with a link that had a hover state:

    <style>
    a:hover {
        color: red;
    }
    </style>
    <p><a href="/">Test me</a></p>

When I tried that, the link worked with one tap and I saw the color change briefly before navigating.

My next idea was that it might be a link inside of a container that had a `:hover` rule and came up with another example:

    <style>
    p:hover a {
        color: red;
    }
    </style>
    <p><a href="/">Test me</a></p>

Once again, the link navigated with a single tap after displaying the change in color. I decided to go back to my original code and look at it more carefully. That's when I noticed a slight difference between my test cases and the real world use case.

## Double tap!

The culprit, as it turns out, is a combination of two factors. It's not simply a `:hover` rule that triggers the double tap behavior. It's a `:hover` Rule that either hides or shows another element using `visibility` or `display`. For example:

    <style>
        p span {
            display: none;
        }
        
        p:hover span {
            display: inline;
        }
    </style>
    <p><a href="/">Tap me</a><span>You tapped!</span></p>

It seems that the good people at Apple were very concerned about controls being hidden and only displayed on hover in webpages. Whenever you run into this situation, where an element is initially hidden and then displayed on hover, you will run into the double tap issue. The first tab will display the change in element and the second tap will navigate. If you then tap somewhere else on the screen, the `:hover` rule is no longer applied and you need to start the sequence over again.

You can try this all for yourself using [this test page][1].

I went on and tried several other CSS properties and the only ones to trigger this behavior are `visibility` and `display`. 

## Possible workarounds

Shortly after originally posting this article, a couple of people on twitter gave some good suggestions for working around this issue area. Jacob Smartwood pointed out<sup>[1]</sup> that Modernizr provides a `no-touch` CSS class that indicates the browser doesn't support touch. In that case, you can just make sure that all of your `:hover` rules are preceded by `.no-touch`, such as:

    <style>
        p span {
            display: none;
        }
        
        .no-touch p:hover span {
            display: inline;
        }
    </style>
    <p><a href="/">Tap me</a><span>You tapped!</span></p>

This works although it has the side effect of changing the specificity of the rule. In some cases this might not matter, but in others it might be important.

Oscar Godson pointed out<sup>[2]</sup> that touch can be detected in JavaScript with a simple piece of code, allowing you to implement your own Modernizr-like solution:

    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }

## Conclusion

The mysterious double tap issue is caused by a `:hover` rule that changes the `visibility` or `display` properties of an element on the page. Changing any other property still allows a single tap to navigate to a link. I was only able to test this on iOS 5, as both my iPhone and iPad have it installed. Mobile Safari as well as any apps using the UIWebView (including Chrome) are affected. The Kindle Fire doesn't exhibit this behavior at all. I would love to hear from others using other devices to see if any other browsers exhibit this behavior.

So don't believe people when they tell you that hover doesn't exist on touch devices. At least on iOS, hover does exist and needs to be planned for accordingly. If you are using a `:hover` rule to show something in your interface, you may want to hide that rule when serving your page to a touch device. It might be a good idea to just completely remove all `:hover` rules for any experience that's going to be served to a touch device. The touch-based world doesn't need hover, so be careful not to inject it accidentally.

**Update (5-July-2012)** &#8211; added possible workarounds that were mentioned on Twitter.

## References

  1. [Jacob Smartwood's tweet][2]
  2. [Oscar Godson's tweet][3]

 [1]: http://nczonline.net/experiments/mobile/ioshover.htm
 [2]: https://twitter.com/jswartwood/status/221005854240026627
 [3]: https://twitter.com/oscargodson/status/221013516008689664
