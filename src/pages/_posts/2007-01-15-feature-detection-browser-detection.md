---
title: Feature detection != browser detection
author: Nicholas C. Zakas
permalink: /blog/2007/01/15/feature-detection-browser-detection/
categories:
  - Web Development
tags:
  - Browser Detection
  - Feature Detection
  - JavaScript
---
I&#8217;m not sure what&#8217;s in the water, but lately I&#8217;ve been coming across a lot of confusion regarding the difference between feature detection and browser detection. There are a lot of people who don&#8217;t like using the user-agent string to determine the browser (I, of course, am a <a title="Browser detection versus feature detection" rel="internal" href="/archive/2006/11/396">big proponent</a> of it), favoring instead the use of feature detection. As I&#8217;ve stated before, there is a time and a place to use each technique, but there is no time when you should confuse the two. For example, the following is *highly* undesirable:

<code class="block"> </code>

<pre>var isIE = document.uniqueID && window.ActiveXObject;
var isFirefox = typeof document.getBoxObjectFor == "function";</pre>

This the complete and utter **wrong** way of doing both feature and browser detection. The code above makes assumptions about the browser based on the availability of certain features. The gaping hole in this logic is that other browsers may decide to implement such features in the future, which renders the code useless.

Remember: feature detection is fine when you&#8217;re trying to figure out whether to use that feature or not. Feature detection is **not** the way to determine which browser is being used.
