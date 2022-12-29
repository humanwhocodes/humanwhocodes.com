---
title: 'Opacity in IE6: alpha or PNG?'
author: Nicholas C. Zakas
permalink: /blog/2007/01/03/opacity-in-ie6-alpha-or-png/
categories:
  - Web Development
tags:
  - Alpha Filter
  - Internet Explorer
  - Opacity
  - PNG
---
I was fighting with a problem today that I thought I&#8217;d share. I&#8217;m using some semi-transparent `div` elements to create certain effects on a page and got pinged with a memory bug. After some tests, I discovered that the source of the memory issue was the use of IE6&#8242;s alpha filter:

<code class="block"> </code>

<pre>.shade {
    filter: alpha(opacity=70);
}</pre>

The first thing I did was switch from dynamically creating the `div` elements to outputting them into the page. I thought that, perhaps, the memory required to apply the filter to dynamically created elements was higher than those that were already loaded. This change cut down some of the memory usage, about 30%, but that still wasn&#8217;t enough.

Next, I removed the filter completely and found that this reclaimed almost all of the memory spike I had seen initially. Well that&#8217;s great, except that I needed the elements to be semi-transparent, and how else can that be accomplished in IE6 but with using the alpha filter? What about a transparent background image?

I created a 2&#215;2 GIF image with two colored pixels and two transparent ones to serve as the shade. It looked ugly, but it worked. Man, what I wouldn&#8217;t give for an alpha layer in GIFs. Then it hit me: IE6 can load semi-transparent PNGs using the `AlphaImageLoader`. I had cautious optimism because there were two potential problems: 1) the `AlphaImageLoader` is a filter just like the alpha filter, and if alpha channels were a problem for one filter, it may be a problem for the other, and 2) IE6 can&#8217;t tile PNG images loaded this way. So I set out to experiment.

Indeed, the `AlphaImageLoader` used less memory than the alpha filter, so I could create a semi-transparent PNG image to the same specs as the semi-transparent `div` element. But man that seemed like a waste. Then I remembered the `sizingMethod` property of the `AlphaImageLoader` could be set to &#8220;scale&#8221;, forcing the image to be scaled to the size of its container. That meant I could create a small image and just scale it:

<code class="block"> </code>

<pre>.shade {
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='shade.png', sizingMethod='scale');
}</pre>

The end result: I managed to cut the memory consumption by about 70%. Anytime you&#8217;re using a filter in IE6, there&#8217;s a memory penalty to pay, but it looks like using the `AlphaImageLoader` and a semi-transparent PNG image beats using the alpha filter on a `div` element. I really can&#8217;t wait until we don&#8217;t have to worry about IE6 anymore.
