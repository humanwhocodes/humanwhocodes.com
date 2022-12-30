---
title: 'On UA sniffing, browser detection, and Alex's post'
author: Nicholas C. Zakas
permalink: /blog/2011/02/08/on-ua-sniffing-browser-detection-and-alexs-post/
categories:
  - Web Development
tags:
  - Browser Detection
  - Feature Detection
  - JavaScript
  - Performance
  - User Agent String
---
Unless you've not been paying attention during the past week, you may have come across Alex Russell's recent treatises on the cost of feature detection and one possible solution<sup>[1]</sup>. Alex is one of the smartest folks I've ever met, and I've always admired his willingness to share his opinion in any forum regardless of the popularity of the thought or the response quality he'd receive. While I can't say I always agree with his conclusions, I can say that I respect how he arrives at them. And this is why I feel badly when his points of view get misrepresented to the point of confusion.

## The beginning

In his first post on the subject, <cite>Cutting the interrogation short</cite><sup>[1]</sup>, Alex makes several claims:

  1. Feature detection is not the panacea for cross-browser solutions
  2. Some feature detection techniques incur a performance hit that isn't always reasonable
  3. The set of available features for known browsers is known

I don't find anything terribly controversial about these claims, and further, I believe them all to be correct and easily verifiable. The second point is actually the key to understanding his position.

The fastest running code is the code that performs the fewest number of operations. As a good programmer, and certainly one that wishes to deliver the best user experience, it is your job to complete any given ask using the fewest number of operations. Feature detection necessarily introduces additional operations to determine the appropriate set of next operations.

While I've never been opposed to feature detection such as determining whether a given function or property exists, I've openly opposed the type of long and involved feature detection techniques<cite></cite><sup>[2]</sup> employed by some libraries and developers, especially when performed as an upfront evaluation of multiple features, such as those found in Modernizr<cite></cite><sup>[3]</sup>. As someone who's worked on several large-scale, highly trafficked web sites, I've always made it a point to avoid this type of methodology for performance reasons.

## The proposal

Alex's proposal for improving the performance of feature detection was to determine and then cache the results of feature tests for known browsers. This would allow libraries to skip passed the long and time-consuming feature detection code when the results are actually already known. The approach requires a certain level of user-agent detection<cite></cite><sup>[4]</sup> to serve up the correct feature detection set.

Now, I've been (in)famous for saying in that past that I don't believe user-agent detection is bad or evil or that it breaks the spirit of the Web or any such thing &#8211; I've simply stated that it's a technique you should know in general and understand where and when it's appropriate to use. I'll say this again: you use user-agent detection when you want to identify the browser being used. That's it. Feature detection, on the other hand, is used when you want to determine that a feature is available for use. These are two different techniques with two very different use cases.

The proposal from Alex is to use user-agent detection to load the results of feature tests run in a particular user-agent while leaving regular feature detection for browsers that are unknown entities. Let's face it, Internet Explorer 6&#8242;s feature set is not changing, so if you can accurately detect this browser it makes sense to preload its feature set.

I would also augment Alex's proposal with the same caution that I have with user-agent sniffing, which is to only identify *previous versions* of browsers (not current ones). You cannot  be certain that a feature set is frozen for a particular browser until the next version is released. Case in point: Internet Explorer 8 shipped with a native JSON implementation that didn't match the final ECMAScript 5 specification. This was later fixed in a patch<sup>[5]</sup>. At that point in time, Internet Explorer 8 was the most recent release so it would only be reasonable to cache results from Internet Explorer 7 or earlier.

## What he didn't say

Almost as interesting as what Alex did say is what he didn't say. Mostly because people immediately started hinting that he actually was saying the things that he didn't say. This is an incredibly frustrating yet unbelievably common occurrence on the web that I've also dealt with. Not that Alex needs anyone coming to his rescue, but I do want to outline the things he never said in his posts:

  1. He never said that user-agent detection is better than feature detection
  2. He never said that feature detection is bad and shouldn't be used
  3. He never said that user-agent detection is awesome and should always be used
  4. He never said his proposal is the only solution

As tends to happen with controversial topics, people have been latching on to one or two sentences in the entire post rather than trying to absorb the larger point.

## My opinion

I was asked by a colleague last week what I thought about Alex's proposal. Since I had only skimmed the two posts, I decided to go back and actually read them carefully. First and foremost, I think Alex accurately outlines the problems with the current feature detection craze, which can be summarized neatly as &#8220;all feature detection, all the time&#8221; or even more succinctly, &#8220;feature detection, always.&#8221; He's correct in pointing out that the feature detection craze doesn't pay close enough attention to the performance overhead associated with running a bunch of feature tests upfront.

Generally, I like the idea of having pre-built caches of feature tests for older, known browsers such as Internet Explorer 6 and 7. We absolutely know the issues with these browsers and neither the issues nor the browsers are going away anytime soon. I'm less convinced of the need to cache information for other classes of browsers, especially those that update with regular frequency. For instance, I think it would be wasteful to do such caching for Chrome, which auto-updates at such a dizzying pace that I can't tell you off the top of my head which version I'm running on this computer.

At this point, I'm more in favor of Alex's proposal than I am against it. I do believe there's value in caching feature detection results for known entities, however, I believe the number of UAs for which that should be done is small. I would target two sets of browsers: older ones (IE6/IE7) and specific mobile ones. Interestingly, these share the common aspect of running code slower than modern browsers running on desktops. Keeping a small static cache designed to optimize for the worst-performing browsers makes the most sense to me, and then I would only do additional feature tests on an as-needed basis &#8211; running the test on the first attempt to use the feature and then caching it dynamically.

I'm sure there's a sweet spot of cached feature data that can be found by focusing primarily on the outliers, especially ones that are using slower JavaScript engines (IE6) or low-powered devices (mobile) that cause slower-running JavaScript. Of course, as with every theory, this approach would have to be tested out in real world scenarios to figure out the exact savings. Personally, I think it's worth investigating.

## References

  1. [Cutting the interrogation short][1], by Alex Russell
  2. [JavaScript feature testing][2]
  3. [Modernizr][3]
  4. [Performance innumeracy & false positives][4], by Alex Russell
  5. [An update is available for the native JSON features in Internet Explorer 8][5]

 [1]: http://infrequently.org/2011/01/cutting-the-interrogation-short/
 [2]: http://kangax.github.com/cft/
 [3]: http://modernizr.com
 [4]: http://infrequently.org/2011/02/on-performance-innumeracy-false-positives/
 [5]: http://support.microsoft.com/kb/976662
