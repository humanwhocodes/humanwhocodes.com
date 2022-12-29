---
title: Use Null Comparisons Sparingly
author: Nicholas C. Zakas
permalink: /blog/2006/06/20/use-null-comparisons-sparingly/
categories:
  - Web Development
tags:
  - JavaScript
  - 'null'
---
Comparing values against `null` is a very popular thing to do in JavaScript, but I fear that typically it&#8217;s overused and used in situations when it&#8217;s completely inappropriate. Consider the following:

<pre>if (sText != null) {
    var aParts = sText.split(",");
}</pre>

Suppose this is in a function that has `sText` as an argument. The intent here it to say, &#8220;if the argument was passed in, continue, otherwise, don&#8217;t do anything.&#8221; This is perfectly fine logic, but in actuality, what you really want to check is to see if `sText` is a string. The next line uses the `split()` method, which only exists on a string. In the original scenario, it would be possible for `sText` to be non-null but still cause an error on the next line. So really, the more appropriate condition would be:

<pre>if (typeof sText == "string") {
    var aParts = sText.split(",");
}</pre>

Now, you&#8217;re ensuring that `sText` is not only not `null` (since a `null` value returns &#8220;object&#8221; when passed into `typeof`), but also that the next line will never fail. I&#8217;d really like to see more developers using `typeof` in this way instead of relying on comparisons against `null` that really do very little to save their code from invalid data.
