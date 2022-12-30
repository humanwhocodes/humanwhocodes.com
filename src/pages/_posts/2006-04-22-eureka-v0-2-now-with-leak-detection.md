---
title: 'Eureka v0.2 &#8211; Now With Leak Detection!'
author: Nicholas C. Zakas
permalink: /blog/2006/04/22/eureka-v0-2-now-with-leak-detection/
categories:
  - Web Development
tags:
  - Eureka
  - JavaScript
---
Finally got around to fiddling with Eureka this past weekend. The end result is <a title="Download Eureka v0.2" rel="internal" href="/downloads/Eureka.zip">version 0.2</a>, which introduces three new commands:

  * `/memory` &#8211; displays the current memory utilization of the Internet Explorer process.
  * `/leaktest` &#8211; reloads a page ten times and takes memory measurements to determine if there are any leaks on the page (I'd like feedback on how well this works).
  * `/time` &#8211; times how long it takes for a particular expression to evaluate.

I added these commands in the hopes that it would make <a title="Download Eureka v0.2" rel="internal" href="/downloads/Eureka.zip">Eureka</a> more useful to professional developers who need some sort of testing/benchmarking ability. This is just the beginning of my trek down that path, but wanted to get some simple commands under my belt before moving on to the more exciting ones.

As always, I'd really like some <a title="Contact Me" rel="internal" href="/contact/">feedback</a> as to how everyone likes these new features. And sorry <a title="XWeb" rel="external" href="http://www.wdonline.com">Jeremy</a>, still no <acronym title="Graphical User Interface">GUI</acronym>. Maybe next version. <img src="{{site.url}}/blog/wp-includes/images/smilies/icon_wink.gif" alt=";-)" class="wp-smiley" />
