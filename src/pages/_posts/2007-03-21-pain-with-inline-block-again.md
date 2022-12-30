---
title: Pain with inline-block (again)
author: Nicholas C. Zakas
permalink: /blog/2007/03/21/pain-with-inline-block-again/
categories:
  - Web Development
tags:
  - CSS
  - inline-block
---
Once again I find myself banging my head against the wall thanks to Firefox's lack of support for `inline-block` elements. At least Internet Explorer let's you set the display of an element to `inline-block` if it's an `inline` element by default (such as `span`, but won't work on `div`). Opera and Safari both supports `inline-block`, so why is it that Firefox doesn't? (Rhetorical, see my original post, <a title="Pain with inline-block" rel="internal" href="{{site.url}}/archive/2006/10/382">Pain with inline-block</a>)

In various situations I've used different Firefox extensions to work around this issue, but none of these work 100% of the time. The different things I've tried are:

  * **`-moz-inline-box`** &#8211; similar to `inline-block` in that elements appear next to each other on the same line. Different in that you have no control over the text flow inside, so you have to add a `block` element inside of each one. Oh, and if your browser is in standards mode, it adds mysterious white space at the top. I haven't been able to figure out where it comes from, since it seems to happen only in some instances, but it's really frustrating.
  * **`table`** &#8211; this works well when your element will be the only one on a row and you need it to act like it's `inline-block`. Problem is that multiple instances wrap one under the other as if they were `block`.
  * **`table-cell`** &#8211; works when you need multiple instances on the same line. Caveat is that you need to only have these types of elements on the same line&#8230;and they behave like table cells, so widths can be a challenge to work with.

I still don't understand why `inline-block` is supported in everything but Firefox. For a browser that prides itself on being standards-compliant, it seems like there are some really basic things that are missing (hey, where's the `script`&#8216;s `defer` attribute?).
