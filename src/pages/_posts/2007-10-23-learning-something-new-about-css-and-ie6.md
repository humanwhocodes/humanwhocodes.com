---
title: Learning something new about CSS and IE6
author: Nicholas C. Zakas
permalink: /blog/2007/10/23/learning-something-new-about-css-and-ie6/
categories:
  - Web Development
tags:
  - CSS
  - Internet Explorer
---
Every day it seems like I learn another difference between quirks and standards mode in Internet Explorer 6. For the longest time, I&#8217;ve operated under the (incorrect) belief that `margin: 0 auto` could not be used in IE6 to center something. As it turns out, this is only true in quirks mode. When in standards mode, this code works perfectly. I found evidence over at MSDN: <a title="CSS Enhancements in Internet Explorer 6" rel="external" href="http://msdn2.microsoft.com/en-us/library/bb250395.aspx">CSS Enhancements in Internet Explorer 6</a>.

I&#8217;m not entirely sure how I missed this in my recent development, considering I always use HTML 4.01 Strict. So to all of those with whom I steadfastly argued that `margin: 0 auto` would not work in IE6, I apologize. However, I do wish someone would have pointed out *why* it works so I could&#8217;ve figured this out much earlier. <img src="{{site.url}}/blog/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />
