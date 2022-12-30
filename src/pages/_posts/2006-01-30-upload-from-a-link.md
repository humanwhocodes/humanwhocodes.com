---
title: Upload From a Link
author: Nicholas C. Zakas
permalink: /blog/2006/01/30/upload-from-a-link/
categories:
  - Web Development
tags:
  - Internet Explorer
  - JavaScript
  - Upload
---
I don't use Internet Explorer on a regular basis anymore, so I've missed some of the IE-specific functionality in <a title="Gmail" rel="external" href="http://www.gmail.com">Gmail</a>. I was talking with my pal <a title="Bradley Baumann's Blog" rel="external" href="http://bradbaumann.blogspot.com/">Brad</a>, who pointed out that Gmail has a really cool function in IE: you click &#8220;Attach a File&#8221; and the Open File dialog pops up&#8230;no input element or anything! He then gave me a challenge: figure out how to do it. I search around the web and didn't find anything, so I set out to discover how this trick works.

It's actually a bit simpler than I initially thought. In IE only, you can cause the file dialog to pop up by calling the `click()` method on a file input field. That's easy enough, the trouble is when you try to submit the form. As soon as the submit button gets focus, the file input field clears. If you try to submit the form using JavaScript, you can an Access Denied error. So to make this work, you need a little bit of indirection.

Here's the trick: you need to place a form with a file input field and a button into an iframe. The button should be set up to submit the form. When you click a link on the main page, it calls `click()` on the file input field, checks to see if a value has been provided, then calls `click()` on the button, which in turn submits the form. For some reason, this bypasses the security restrictions. Try it yourself (IE only):



<a onclick="doSomething(); return false" href="#">Click Me To Upload (IE only)</a>

Pretty cool huh? Too bad it only works in IE. Then again, perhaps it's too big of a security risk and it shouldn't be working in IE. Ah well. You can download the source <a title="Upload From a Link" rel="internal" href="/downloads/uploadlink.zip">here</a>.
