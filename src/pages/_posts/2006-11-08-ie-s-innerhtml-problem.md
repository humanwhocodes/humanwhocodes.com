---
title: 'IE's innerHTML problem'
author: Nicholas C. Zakas
permalink: /blog/2006/11/08/ie-s-innerhtml-problem/
categories:
  - Web Development
tags:
  - DOM
  - innerHTML
  - Internet Explorer
---
How do you remove content from an element that's already been added? The fastest way is to use `innerHTML` and set it to an empty string. Boom! The content is now gone. This is much faster than going through and removing each child using `removeChild()`. But there's a problem with this approach in Internet Explorer. Try doing the following:

  1. Create an empty `<div/>` element with a background color.
  2. Insert some content dynamically (text, elements, whatever you'd like).
  3. Remove the content using `innerHTML`.

What I expect to happen is for the `<div/>` to become invisible (technically, 0 pixels in height) because there is no content holding it open and a `<div/>` element has no height specified by default. In IE, the content is removed but the height of the `<div/>` does not go to 0; Firefox and Opera behave as I expected (sorry, don't have Safari handy to test at the moment).

I remember a time when I used to have to code around bugs in Netscape Navigator, funny how things have been reversed now.
