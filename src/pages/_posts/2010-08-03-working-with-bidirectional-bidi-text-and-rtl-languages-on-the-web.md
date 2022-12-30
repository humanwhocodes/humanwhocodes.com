---
title: Working with bidirectional (bidi) text and RTL languages on the web
author: Nicholas C. Zakas
permalink: /blog/2010/08/03/working-with-bidirectional-bidi-text-and-rtl-languages-on-the-web/
categories:
  - Web Development
tags:
  - Bidi
  - CSS
  - HTML
  - RTL
---
While a lot of focus in the web development world has shifted to mobile development, there's still a subject within desktop development for which that hasn't been much written: dealing with bidirectional (bidi) text and right-to-left (RTL) languages. The two languages that people frequently discuss when the topic of RTL comes up are Hebrew and Arabic, both of which are read from the right side to the left. Bidi text is created when an RTL language and an LTR language are both contained on the same line. So imagine a line containing both Arabic and English (actually, you don't have to imagine, just check out [Yahoo! Maktoob][1] in Arabic). As you might imagination, there are any number of challenges when dealing with BiDi text. The purpose of this post is to introduce the aspects of HTML and CSS (and a little JavaScript) that are designed to work with RTL languages.

## The HTML dir attribute

All HTML elements may include a `dir` attribute. The `dir` attribute can be set either to &#8220;ltr&#8221; (which is the default) or &#8220;rtl&#8221;. All descendant nodes of the element on which `dir` is set will inherit the setting, such as:

    <div dir="rtl">
      <p>Hello world!</p>
      <p>RTL is fun!</p>
    </div>
    

Here, both of the `<p>` elements inherit their direction from the container `<div>`. If you were to load this into a page, what you would see:

    !Hello world
    !RTL is fun

Since English is a left-to-right (LTR) language, the words are rendered as they would normally, however the punctuation marks are rendered to the left. This is how you would read English if it were on the same line as an RTL language. Anytime there's an RTL language, you start reading from the right and read any RTL words that way. When an LTR word or series of words is encountered, you must read switch and read left-to-right, before returning to reading right-to-left afterwards. So even though the English characters are considered LTR, the punctuation is considered RTL and therefore must appear after (in this case, to the left) of the sentence text.

The browser does a lot to help you when the `dir` attribute is set to &#8220;rtl&#8221;. As already mentioned, the text is automatically aligned to the right and punctuation naturally goes to the end of the text (on the left). You can easily embed content going in different directions on the same page:

    <div dir="rtl">
      <p dir="ltr">Hello world!</p>
      <p>RTL is fun!</p>
    </div>

This example has some LTR content inside of an RTL block. The second paragraph is still rendered in RTL mode because it's inheriting from the container, while the first is rendered in LTR since the `dir` attribute there overrides the container.

Note: Internet Explorer always places the scrollbar on the left of any block container that displays a scrollbar. This also means that setting `dir="rtl"` on either `<html>` or `<body>` will result in the page scrollbar being shown on the left.

## The CSS direction property

You can actually change the direction of text by using CSS only via the direction property. This property has two possible values: `ltr` (default) and `rtl`. Note that these aren't strings, they're identifiers. You can change the direction of text like so:

    /*not recommended*/
    .content {
        direction: rtl;
    }

This CSS has the same effect as using `dir="rtl"` to the element with a class of `content`. Even so, [bidi best practices][2] indicate that you should never set the direction of text using CSS. The reason is because the direction of the text is an important part of the *content* of the document, and should remain even if there are no styles applied to the overall page. CSS is used to describe the *presentation* of the document, but the underlying content should still be valid even when consumed without presentational information (such as in an RSS reader).

## Detecting text direction

You may have been asking yourself, &#8220;why does he bother telling me about the CSS for bidi and then tell me not to use it?&#8221; Good question. First, it's important to identify both patterns and anti-patterns when discussing a topic. Second, because this information actually is useful. It turns out that setting `dir="rtl"` on an element causes its CSS `direction` property to be set to `rtl`. Further, all descendant elements of that element have an effective (computed) `direction` property of `rtl` as well. That means you can determine the directionality of the content in a particular element by looking at the computed value for the CSS direction property. Example:

    //Copyright 2010 Nicholas C. Zakas. All rights reserved.
    //MIT Licensed
    function getDirection(element){
        var result = null;
        if (element){
            if (window.getComputedStyle){
                result = window.getComputedStyle(element,null).direction;
            } else if (element.currentStyle){
                result = element.currentStyle.direction;
            }
        }
    
        return result;
    }

This function accepts an element as an argument and returns either &#8220;ltr&#8221; or &#8220;rtl&#8221;, based on the element's direction. It uses either the DOM way (`getComputedStyle()`) or the IE-specific way (`currentStyle`) to determine the value of the CSS `direction` property. Basic usage:

    if (getDirection(document.body) == "rtl"){
        //do something
    }

So while it's not recommended to use the direction property to set the direction of content on a page, using this property's computed value is the fastest way to determine which directionality a block of content uses.

## Much, much more

This post just barely scratches the surface of the challenges and issues around bidi web content. There are a lot of smart people doing a lot of work in this area, and as Internet usage continues to grow in emerging markets like the Middle East, web developers right here in the United States are going to need to know more and more about dealing with bidi text and RTL languages. Hopefully this post represents a good jumping off point for people to learn more.

**Update (4 Aug 2010):** Fixed typo in code snippet.

 [1]: http://www.maktoob.com/?lang=ar
 [2]: http://www.w3.org/International/questions/qa-bidi-css-markup
