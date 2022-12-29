---
title: 'My first pipe: Earthquakes in Northern California'
author: Nicholas C. Zakas
permalink: /blog/2007/11/01/my-first-pipe-earthquakes-in-northern-california/
categories:
  - Web Development
tags:
  - Earthquakes
  - Pipes
---
<a title="Yahoo! Pipes" rel="external" href="http://pipes.yahoo.com">Pipes</a> is such a cool tool, but until recently I couldn&#8217;t think of any reason to use it. Since we had a 5.6 earthquake yesterday and another smaller one today, I went online searching for earthquake information feeds. I found the <a title="USGS Shakemap - Northern California" rel="external" href="http://earthquake.usgs.gov/eqcenter/shakemap/list.php?y=2007&n=nc">USGS Shakemap for northern California</a>, which has a feed listed on the page. Unfortunately, the feed is pretty annoying: it&#8217;s not limited to northern California and its in ascending order. I thought to myself, &#8220;this would be useful if I could just filter it for what I wanted.&#8221; Then I realized that I could do exactly that with Pipes.

So, without further adieu, my very first pipe: <a title="Earthquakes in Northern California" rel="external" href="http://pipes.yahoo.com/pipes/pipe.info?_id=Tm1_uDyI3BGAPm8b2h2EvQ">Earthquakes in Northern California</a>. I used the filter module on the latitude and longitude values provides to narrow the area down to northern California. I then used the sort module to sort in descending order. Lastly, I used the location extractor module to add location information into the feed, allowing the pipe page to display the information on a Yahoo! map. This pipe has already been added to my reader, and I hope you find it useful as well.
