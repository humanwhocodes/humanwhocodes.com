---
title: 'Getting element dimensions: A follow up'
author: Nicholas C. Zakas
permalink: /blog/2008/02/04/getting-element-dimensions-a-follow-up/
categories:
  - Web Development
tags:
  - Dimensions
  - DOM
  - Firefox
  - getBoundingClientRect
  - getBoxObjectFor
  - Internet Explorer
  - JavaScript
  - Opera
---
In my <a title="Getting element dimensions" rel="internal" href="{{site.url}}/archive/2008/2/550">previous post</a> I discussed the tragedy of the `getBoundingClientRect()` method and its different implementations. Reader Jose Jeria pointed out that Opera 9.5 has implemented the method as well and has used the Firefox method of originating at (0,0). Distraught over the need to use browser detection for a cross-browser solution, I started playing around a bit and came up with a solution that works in Internet Explorer 7, Firefox 3, and Opera 9.5.

The solution hinges on the fact that IE7 reports the position of `document.documentElement` at (2,2), whereas the other browsers report it at the expected (0,0). In that case, you can check these coordinates and figure out what to do. For example:

<code class="block"> </code>

<pre>function getBoundingClientRect(element){
    if (typeof arguments.callee.offset != "number"){
        arguments.callee.offset = -document.documentElement.getBoundingClientRect().top;
    }

    var rect = element.getBoundingClientRect();
    var offset = arguments.callee.offset;

    return {
        left: rect.left + offset,
        right: rect.right + offset,
        top: rect.top + offset,
        bottom: rect.bottom + offset
    };
}</pre>

The theory behind this function is that it checks the location of `document.documentElement` only once, the first time it&#8217;s called, and stores an offset value on the function itself. That offset value will be 0 for Firefox/Opera and -2 for IE7. All of the dimensions are augmented by this offset before being returned. This works great&#8230;unless you&#8217;re using IE6.

IE6 returns (0,0) as the coordinates of `document.documentElement` in both standards mode and quirks mode&#8230;which makes no sense because an element absolutely positioned to (0,0) returns (2,2) from `getBoundingClientRect()`. So my initial test is obviously not optimal. However, since I know that an absolutely positioned element at (0,0) returns (2,2), I can create a new element, position it there, and check the reported coordinates:

<code class="block"> </code>

<pre>function getBoundingClientRect(element){
    if (typeof arguments.callee.offset != "number"){
        var temp = document.createElement("div");
        temp.style.cssText = "position:absolute;top:0;left:0";
        document.body.appendChild(temp);
        arguments.callee.offset = -temp.getBoundingClientRect().top;
        document.body.removeChild(temp);
        temp = null;
    }

    var rect = element.getBoundingClientRect();
    var offset = arguments.callee.offset;

    return {
        left: rect.left + offset,
        right: rect.right + offset,
        top: rect.top + offset,
        bottom: rect.bottom + offset
    };
}</pre>

I have to say right off the bat that *hate* this solution. The idea that you need to create an element, measure it, and then destroy it really feels dirty to me. However, this solution does work in all browsers I tested and it only does that initial calculation once, so it&#8217;s not a recurring performance hit. Technically, this qualifies as quirks detection but true browser detection would be less expensive.

**Side note:** Firefox has supported `getBoxObjectFor()` for a while, but it&#8217;s going to removed in future versions. This method was intended for use in XUL only and only leaked into HTML world due to a poorly constructed class hierarchy.
