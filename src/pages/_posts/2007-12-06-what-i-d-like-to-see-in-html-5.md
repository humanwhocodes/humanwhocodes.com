---
title: "What I'd like to see in HTML 5"
author: Nicholas C. Zakas
permalink: /blog/2007/12/06/what-i-d-like-to-see-in-html-5/
categories:
  - Web Development
tags:
  - Accessibility
  - Forms
  - HTML 5
---
There's been a lot of discussion around HTML 5, what it should be, and what it shouldn't be. <a title="Fixing HTML" rel="external" href="http://www.crockford.com/html/">Crockford's post</a> outlines his perspective on things in typical Crockford-fashion. I also have my own ideas about what I'd like to see in HTML 5. I shared this internally at Yahoo!, but thought I'd put it out there for others to see as well.

My disclaimer to this list is that I do not have the solutions to the problems. Perhaps with time, I could come up with some proposals and such. However, my point is not to push forth my own ideas as solutions, but rather to point out the problems I run into frequently. In my mind, it's solving these problems that should lead to HTML 5.

  1. **Better Accessibility** &#8211; there are precious few accessibility features in HTML currently. We do a lot of hacking to provide better experiences to screen readers and the like, often ending up with hacks. There should be an easy way to provide accessibility features without sacrificing the visual format of the page or necessitating hacks such as `text-align: -10000px` to hide things visually but allow screen readers to read them. This goes double for dynamic portions of the page.
  2. **Better form controls** &#8211; as desktop apps have moved towards more interest input controls, we've been stuck with textboxes, checkboxes, radio buttons, standard buttons, and a single file upload for far too long. We need more control options, including multiple file upload and ways to submit structured data. All form controls should support some kind of built-in validation so we don't need to keep re-writing validation routines. All of the controls should be completely stylable with CSS in a consistent way.
  3. **More UI elements** &#8211; things like menus and tabsets have become so commonplace that it makes sense to make them part of HTML. This would save us from downloading JavaScript just to get these interactions.
  4. **Different behavior attachment** &#8211; I've <a title="The way JavaScript is handled: A call to action" rel="internal" href="https://humanwhocodes.com/archive/2007/10/494">blogged about this</a> before, but we really need a different way to attach behavior to elements. The old `<script/>` element just isn't cutting it anymore.
  5. **Style and script containment** &#8211; we need a way to constrain styles and scripts to a particular section of the page. This is the problem that Crockford's proposed <a title="The <module/> tag" rel="external" href="http://www.json.org/module.html"><code>&lt;module/&gt;</code> tag</a> solves. I'm not saying it's the right solution, just saying it is an identification of the problem.
  6. **Built-in sprites** &#8211; CSS sprites are a pain to implement and create. It'd be nice to have native support for sprites, where an image can be easily defined as being located within a larger sprite image.

These are the issues that tend to bite me on a regular basis, and I think they're annoying to a great deal of web developers. I think the next version of HTML should first aim to ease some of the pains we currently have rather than being an end-all be-all wishlist. Let's get the simple stuff figured out first before moving on to more complex things.
