---
title: Introduction to web accessibility
author: Nicholas C. Zakas
permalink: /blog/2009/11/10/introduction-to-web-accessibility/
categories:
  - Web Development
tags:
  - Accessibility
  - ARIA
  - WAI
---
One topic that is close to my heart is web accessibility. It&#8217;s not something that I&#8217;ve written or spoken about in the past, and so I thought it was time to get the ball rolling. At Yahoo!, we&#8217;re fortunate to have a great number of people who are not only aware of accessibility issues but who also champion the cause among engineering. Outside of Yahoo!, however, there still seems to be a lot of misconceptions about accessibility, what it means, and what you have to do to make a web site or web application accessible.

## What is accessibility?

One of the great misunderstandings about web accessibility is that accessibility is equal to screen reader support. This is, in fact, just part of the equation. Accessibility basically means that the site or application&#8217;s content and functionality is available for use by anyone who is able to interact with a computer. What most healthy people fail to realize is that not everyone interacts with a computer the same way you do, with a monitor, keyboard, and mouse. Some examples (extracted from [a larger list of examples][1]):

  * Those who are mostly or completely blind may use a screen reader that reads out the contents of the screen audibly. Without sight, a mouse is useless and so the keyboard is likely the main input device. It&#8217;s therefore important that all critical functionality and information be accessible via keyboard.
  * Those with low vision may use a screen magnifier and consequently may only see a small portion of the total screen. Though capable of using a keyboard and mouse together, it&#8217;s important that the input focus stays where it&#8217;s most useful to the user.
  * Those with repetitive stress injuries (RSI) may not be able to use a mouse and so are left only with a keyboard as an input device. Once again, keyboard access to functionality becomes quite important.
  * Those with more serious physical impairments may not be able to use a keyboard or a mouse but are quite capable of using a [switch][2] that can mimic keyboard inputs.

This is just a small sampling of those with disabilities, but it gives you a good idea of how people might interact with a computer differently than you and I. Making a site accessible means that any of these groups are able to interact with the site in a meaningful way.

## Why accessibility?

One of the things I find quite upsetting when reading about accessibility on the Web is how frequently people bring up legislation as the driver. If your biggest driver is that you might get sued if your site or application isn&#8217;t accessible, then you&#8217;re missing the point. Why wouldn&#8217;t you want your site or application available to as many people as possible? Why limit yourself to only those who use a computer in the same way that you do?

I was incredibly moved by a story I was shown about a quadriplegic who could be wheeled to the computer and through an eye tracking camera was able to surf the Internet. Think about what this means. A person who is, for almost all of life, completely reliant on someone else to do even the simplest things is now able to use the Internet to do personal banking, order groceries for delivery, check the news, watch complete episodes of TV shows, chat with friends, and research any topic he pleases all on his own. That is how powerful the Internet is: it levels the playing field of the world in such a dramatic way that access to a computer now means access to most of life.

I like to remind people that chances are, before your life has concluded, you are going to have a disability of some sort. Injuries and old age are inevitable, and you never know how your body is an incredibly fragile machine. You&#8217;ll want someone keeping you in mind when you are no longer able to access a computer in the same way you do today.

As my colleague and accessibility guru Victor Tsaran likes to say, ramps on sidewalks don&#8217;t just help people with wheelchairs. Good product design is, by it&#8217;s very nature, accessible.

## Accessibility is not a feature

When concepts are supposed to be baked into a product from the beginning, it&#8217;s said that they are not features. I&#8217;ve been reminded many times in my career that performance is not a feature, and internationalization is not a feature &#8211; these are things that need to be baked into the development process from the beginning in order to get them right. In that same way, accessibility is not a feature.

If you look at accessibility as something that you&#8217;ll add on later, you&#8217;ve already failed. It only takes a little more work to come up with an accessible design than it does to come up with an inaccessible one. If you think about how people will need to interact with a feature from the beginning, the job is much, much easier than you could possibly imagine.

I recently came across an [accessibility review of Google Wave][3]. The author concludes that Google Wave is completely inaccessible and lists out a few bullet points that he found. Most of the points are small details that would have been easy to bake-in from the beginning and wouldn&#8217;t have taken that much extra time. Writing semantically significant code doesn&#8217;t take any longer than writing semantically insignificant code. The amount of code is exactly the same. The excuse that Google Wave is trying to do so many new things and that they wouldn&#8217;t have time for accessibility (as [one commenter said][4]) is ridiculous at best and insulting at worst. I applaud the author for [pointing out][5] just how silly that comment is.

When you plan accessibility, along with performance and internationalization, right from the beginning, you&#8217;ll find that there isn&#8217;t much you can&#8217;t accomplish. More work always translates to longer timelines, but my point is that basic accessibility isn&#8217;t more work, it&#8217;s just different work. Yes, there will be times when complex interactions will need to be thought through. You&#8217;ll find, however, that the majority of interactions are actually quite basic and lend themselves quite well to accessible solutions.

## Basic accessibility

Accessibility, at its core, really isn&#8217;t that hard. There&#8217;s just a shift in the way you approach creating web applications. Instead of worrying first about layout and how to get those pesky rounded corners into place, you think about how to best convey what the feature is and how users can perform the necessary actions. The visual design is easily overlaid on top of those concepts. Some basic things you can do to improve accessibility:

  * **Use semantic markup.** Really think about which tags you&#8217;re using to represent which types of data. The `<div>` tag doesn&#8217;t have any semantic value, the `<p>` tag does. What is the nature of the data being presented to the user?
  * **Don&#8217;t use tables for layout.** Tables can be used for tabular data, as that has semantic value. Tables shouldn&#8217;t be used for layout as this doesn&#8217;t match the semantics. CSS should be used for layout.
  * **Use images wisely.** For images and other embedded media, make sure to provide an alternate text description. All `<img>` tags should have an `alt` attribute that describes the image. If an image is purely for decorative purposes, you can have an `alt` attribute of an empty string, or better yet, apply it using CSS as a background image and keep it out of the markup altogether.
  * **Use descriptive link text. **Links that say &#8220;click here&#8221; or &#8220;more&#8221; don&#8217;t always tell the story. Link text should properly describe where the link navigates to.
  * **All form elements should have a `<label>`. **The `<label>` tag is used to describe the purpose of a form field and is an important tool in aiding screen readers to understand forms.
  * **Use headings. **The `<h1>` through `<h6>` tags should be used to mark different parts of the page, giving the underlying data a hierarchical structure. Screen reader users can use headings as jump points to navigate around the page.
  * **Use proper ordering of content.** CSS allows you to visually move content around, but the underlying order of the content should make sense such that an unstyled page is still consumable. Test your page without any CSS applied to see if everything still makes sense.
  * **Use buttons to execute JavaScript.** Links are meant to navigate to a URL. If you just need a focusable element to execute JavaScript, try to use a button.
  * **Move the focus to points of interest.** When the page changes dynamically, set focus to the area on which the user should be paying attention. You can call `focus()` on most DOM elements, and many non-focusable elements can be made focusable by setting their `tabIndex` to -1. This helps both with screen readers and screen magnifiers by ensuring the user is aware of newly displayed content.
  * **Make sure everything is keyboard accessible. **There shouldn&#8217;t be any major piece of functionality that can&#8217;t be initiated directly by the keyboard. Many times, simply being able to tab to buttons/links and hitting Enter is enough. For more complex interactions, you may need to use JavaScript or access keys to aid in this capability. The best way to test is literally to unplug your mouse and try to use the application.
  * **Don&#8217;t hide visual focus.** The special dotted lines and focus effects that browsers apply to elements that have focus are incredibly important for keyboard-only users as it&#8217;s the only way they can tell which element will be affected by hitting a key. Resist the urge to turn this off using `outline: 0` or other such techniques.

I hope you can tell from this list that basic accessibility is actually quite easy. There&#8217;s nothing magical or strange about any of the items listed here, and chances are that you&#8217;re probably already doing some of them without noticing.

## Advanced accessibility

Going beyond basic accessibility is where I&#8217;d love to see web developers flourish. There&#8217;s a lot of new things going on in the world of web accessibility, not the least of which is [ARIA][6] (short for Accessible Rich Internet Applications). ARIA, sometimes also called WAI-ARIA, is a way to provide information about a web page to assistive technologies. More specifically, ARIA provides a new set of attributes that can be applied to HTML elements to provide more semantics around the data.

For example, a common user interface paradigm in computers is the concept of a tabset, a single panel with multiple tabs containing different information. You can visually style HTML to look like a tabset such that sighted users will instantly understand the relationship between the tab title and the tab panel conent, but those semantics are completely lost if the content is unstyled or not viewed. ARIA provides a way to indicate that set of markup is a tabset, and screen readers, in turn, can treat the markup as they would any other tabset in any other application. This is done through the use of the `role` attribute as well as a couple of other ARIA-specific attributes. Todd Kloots of the YUI team wrote a [great blog post][7] on marking up tabsets with ARIA that makes the concepts a bit clearer.

ARIA is a bit controversial because its attributes are not part of the HTML standard and therefore cause HTML documents not to validate. Work is currently being done to rationalize the use of ARIA within the context of HTML 5. If you care about accessibility, and I hope at this pointÂ  you do, you should read up on ARIA and how it can be used to improve the accessibility of a web page. ARIA is currently supported in Firefox 3+, Internet Explorer 8+, Safari 4+, and Opera 10+.

## Accessibility software

There&#8217;s a fair amount of software centered around accessibility on computers, both for Windows and Mac. Some tools are shipped with the operating systems while others must be downloaded. For screen readers and screen magnifiers, here&#8217;s some basic information:

  * The dominant Windows screen reader is [JAWS][8]. It is a commercial product and is quite expensive but does have a free trial available for download. There is also an open-source screen reader called [NVDA][9] that is undergoing rapid development and is a decent alternative. Mac OS X has a built-in screen reader called VoiceOver that can be enabled from the Settings panel.
  * Windows ships with a screen magnifier that&#8217;s accessible from the Accessories -> Accessibility program group. Mac OS X has a built-in screen magnifier that you can activate instantly by holding down Shift and using the mouse&#8217;s scroll wheel. You can also go Universal Access on the Settings panel and manually configure zooming.

There&#8217;s a lot more accessibility-related software available, but these are the ones you should start investigating as a basis for your accessibility knowledge.

## Conclusion

The information in this post is the just beginning of an accessibility discussion. There are a lot of aspects to consider, a lot of tools to use, and a lot of mindsets that have to change. Still, I hope that this overview has inspired some to look more into accessibility from the beginning and not excluding a large portion of computer users. I&#8217;ve purposely left out mention of laws regarding accessibility, because this is something we all should be doing regardless of any existing laws. The Web is gives us unprecedented access to the world and can change the lives of those with disabilities for the better. We are powerful, let&#8217;s use that power wisely.

 [1]: http://www.w3.org/WAI/intro/people-use-web
 [2]: http://www.iltsource.com/General_Switches_s/65.htm
 [3]: http://webaim.org/blog/google-wave-preview-accessibility-review/
 [4]: http://webaim.org/blog/google-wave-preview-accessibility-review/comment-page-1/#comment-60839
 [5]: http://webaim.org/blog/google-wave-preview-accessibility-review/comment-page-1/#comment-60840
 [6]: http://www.w3.org/WAI/intro/aria.php
 [7]: http://yuiblog.com/blog/2008/07/30/tabview-aria/
 [8]: http://www.freedomscientific.com/products/fs/jaws-product-page.asp
 [9]: http://www.nvda-project.org/
