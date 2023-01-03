---
title: "IE vs. PNG: The battle continues"
author: Nicholas C. Zakas
permalink: /blog/2007/02/05/ie-vs-png-the-battle-continues/
categories:
  - Web Development
tags:
  - Images
  - Internet Explorer
  - PNG
---
Just when I thought I had figured out the rules of engagement between <a title="Opacity in IE6: alpha or PNG?" rel="internal" href="https://humanwhocodes.com/archive/2007/1/406">Internet Explorer and opacity</a>, another hurdle arose. I figured with IE7 sporting brand-new native support for PNGs with an alpha channel that the best way to implement opacity (per my previous entry) would be to just use a semi-transparent PNG and assign it as a background image, letting the image tile to fill up the space. What I got was another unwelcome surprise: the client's CPU spiked to 100% usage!

A few more tests confirmed my suspicions: tiling of semi-transparent PNGs in IE7 is a major problem. It causes the browser to go into a tailspin from which there is no recovery. The solution? I just went back to using the old `AlphaImageLoader` code&#8230;the CPU usage immediately went back to normal on the same page.

I really wish that the IE team would get their act together on this one. What use is having native transparent PNG support if it pegs the processor to the point of slowing down the entire machine? And how about getting opacity working without so much memory so that we don't need to use PNGs for it?
