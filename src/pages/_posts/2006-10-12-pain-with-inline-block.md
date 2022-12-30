---
title: Pain with inline-block
author: Nicholas C. Zakas
permalink: /blog/2006/10/12/pain-with-inline-block/
categories:
  - Web Development
tags:
  - CSS
  - inline-block
---
Today I found myself wanting to format a link to look like a button. If I only needed one button, I could just set the link's display to `block` and be done with it, but I needed two. Further, they needed to be side-by-side. I figured it wouldn't be a problem because I could use `inline-block` instead.

The <a title="CSS2 - The display declaration" rel="external" href="http://www.w3.org/TR/CSS21/visuren.html#propdef-display"><code>inline-block</code></a> display is a wonderful state that creates a box inline. Where regular inline displays don't allow you to set width, height, padding, or margin, `inline-block` displays allow all of that without the other characteristics of a `block`-level element. Perfect solution, right? Except for one slight problem: it's not supported in Firefox.

Safari and Opera support `inline-block`; Internet Explorer supports `inline-block` only on elements whose native display is `inline`. But what about Firefox?

As it turns out, Firefox supported an alternative called `-moz-inline-block` at one time, but it <a title="Bugzilla: -moz-inline-block broken in Deer Park Alpha 2?" rel="external" href="https://bugzilla.mozilla.org/show_bug.cgi?id=301072">stopped working</a> in Firefox 1.5. I found some <a title="QuirksMode: The display declaration" rel="external" href="http://www.quirksmode.org/css/display.html">some references</a> suggesting to use `-moz-inline-box` instead, however, that form of display doesn't have proper text wrapping and doesn't support `text-align`. So, after bending the ear of Matt Sweeney (one of the <a title="Yahoo! User Interface Library" rel="external" href="http://developer.yahoo.com/yui/">YUI</a> developers), I was finally able to come up with a solution. The <acronym title="Hyper Text Markup Language">HTML</acronym> code looks like this:

<pre>&lt;a href="{{site.url}}/" class="button"&gt;&lt;strong&gt;Submit&lt;/strong&gt;&lt;/a&gt;
&lt;a href="{{site.url}}/" class="button"&gt;&lt;strong&gt;Cancel&lt;/strong&gt;&lt;/a&gt;</pre>

The <acronym title="Cascading Style Sheets">CSS</acronym> code is:

<pre>a.button {
    background-color: silver;
    border: 1px solid black;
    color: #000;
    display: inline-block;
    display: -moz-inline-stack;
    min-width: 100px;
    _width: 100px;
    padding: 5px;
    text-decoration: none;
}

a.button strong {
    text-align: center;
    display: block;
}</pre>

So what's going on here? There are two `display` declarations, the first being `inline-block` and the second being `-moz-inline-stack`. If a browser properly supports `inline-block` and <acronym title="Cascading Style Sheets">CSS</acronym>, then it will only obey the first declaration. However, since Firefox doesn't support `inline-block`, it ignores the first declaration and goes on to the second. Even though Internet Explorer will read both, it will ignore the second because it doesn't understand the value (Safari and Opera will read only the first one).

The second rule enables proper text wrapping and text alignment inside of the link. Using `-moz-inline-stack` is the only way that this will work; using `-moz-inline-box` or `-moz-inline-grid` won't work at all. So the inner element (in this case `<strong/>`), must be set to `block` in order for `text-align` to be valid. Now this works in all four browsers&#8230;and it only took one day to figure out. Hopefully Firefox will properly implement `inline-block` soon.
