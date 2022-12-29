---
title: JavaScript minification/compression and performance
author: Nicholas C. Zakas
permalink: /blog/2009/07/07/javascript-minification-compression-and-performance/
categories:
  - Web Development
tags:
  - Compression
  - GZip
  - JavaScript
  - Minification
  - Performance
  - YUI Compressor
---
Last week, I came across a [blog post][1] by Matt Snider of [Mint.com][2] in which he was talking about ways to improve the output of [YUI Compressor][3] on JavaScript code. This led me to dig up a presentation I gave last year at Yahoo!&#8217;s internal Front End Engineering Summit entitled [Extreme JavaScript Compression with YUI Compressor][4]. This was a followup to my YUI Blog post, [Helping the YUI Compressor][5], in which I talked about certain patterns that could help or hinder the YUI Compressor. I continued to dig deeper, trying out several things and looking at the source code result before putting together the presentation. Note that my goal was to find the best compression *without* using gzip and I recognized these techniques as overly-aggressive, which is why I used the word &#8220;extreme.&#8221;

## JavaScript performance issues

Talking about JavaScript performance actually means four things:

  1. Network transfer time &#8211; the time it takes to receive the resource after the browser has requested it.
  2. Resource preparation time &#8211; the time it takes to prepare the resource for use.
  3. Source code parse time &#8211; the time it takes to parse the resource into something useful.
  4. Execution time &#8211; the time it takes to apply the resource to the page. Already talked about at length on this blog.

The first issue, network transfer time, has been at the forefront of web development concerns for quite some time. Of course, the situation was much worse when most users were connecting to the Internet over modems. This was when the first round of JavaScript minification tools were created, tools such as [ESC][6] and [JSMin][7]. Because JavaScript files were being transferred directly without any optimizations, the network transfer time was higher than necessary. These early tools sought to minimize network transfer time by minimizing the number of bytes being transmitted (typically called &#8220;wire weight&#8221;).

As this issue became better understood, browsers started implementing true decompression solutions so that servers could use real compression, not just byte reduction, to transfer resources. The two commonly supported compression schemes are gzip and deflate, supported by all major browsers as well as server software. Generally, these gzip and deflate work in the same manner. A basic description of gzip ([source][8]):

> The deflation algorithm used by gzip (also zip and zlib) is a variation of LZ77 (Lempel-Ziv 1977, see reference below). It finds duplicated strings in the input data. The second occurrence of a string is replaced by a pointer to the previous string, in the form of a pair (distance, length). Distances are limited to 32K bytes, and lengths are limited to 258 bytes. When a string does not occur anywhere in the previous 32K bytes, it is emitted as a sequence of literal bytes. (In this description, &#8216;string&#8217; must be taken as an arbitrary sequence of bytes, and is not restricted to printable characters.)

Compressing resources using gzip or deflate makes resource files as small as possible during network transfer. However, doing so introduces a second point of interest: resource preparation time.

The browser must decompress any compressed resources before using them and I call this resource preparation time. You&#8217;ve saved network transfer time but introduced an additional step before the browser can make use of the file. Thankfully, decompression tends to be fast in modern browsers and doesn&#8217;t cause any issues (older browsers such as Internet Explorer 5 had issues when decompressing certain files). Still, I count this as part of the process.

Once the file is in a format that the browser can consume, it must be parsed. Exactly how long parse times take in browsers is a bit of mystery even though [PageSpeed][9] gives a small glimpse into this process. I&#8217;ve theorized that parse time becomes more important as the total amount of JavaScript on a given page increases. This was the basis for exploring how to optimize the output of the YUI Compressor as I believed the uncompressed file size affeced parse time. I spoke with [Julien Lecomte][10], creator of the YUI Compressor, about this and he disagreed, indicating that it&#8217;s the number of tokens the source code generates not the byte count that matters during parse time. Unfortunately, neither of us have enough data to prove or disprove our positions.

## Criticisms

Though it seems like a lot of people enjoyed the presentation, there were a subset who did not. Of those dissenters, there were two basic concerns:

  1. Doing everything I suggested can actually increase the compressed file size.
  2. Performance overhead of declaring variables to use instead of literal values for `true`, `false`, `null`, and `undefined`.

To address the first point, I pointed out earlier that gzip works by looking for repeating string patterns and replacing them with pointers. By storing repeated literal values in variables you are, effectively, removing gzip&#8217;s most effective weapon. Naturally, this can affect the overall compressed size of your file.

I decided to put this to a really simple test and used the `toggle()` function from the presentation as an example. I ran the YUI Compressor and gzip on both the original version and the optimized version.

<table border="0">
  <tr>
    <th>
      Version
    </th>
    
    <th>
      Raw
    </th>
    
    <th>
      Minified
    </th>
    
    <th>
      Gzipped
    </th>
    
    <th>
      Both
    </th>
  </tr>
  
  <tr>
    <td>
      Original
    </td>
    
    <td>
      263
    </td>
    
    <td>
      172
    </td>
    
    <td>
      161
    </td>
    
    <td>
      140
    </td>
  </tr>
  
  <tr>
    <td>
      Optimized
    </td>
    
    <td>
      327
    </td>
    
    <td>
      127
    </td>
    
    <td>
      194
    </td>
    
    <td>
      144
    </td>
  </tr>
</table>

As you can see, when using both the YUI Compressor and gzip on the source, the original actually comes out smaller than the optimized version. The difference may be small, but we&#8217;re talking about a fairly small code sample as well. You can assume that code optimized with the techniques in my presentation will be a small percentage larger when minified and gzipped versus the originals.

Given this difference, the only performance reason to apply all of the techniques in the presentation would be if there&#8217;s a value in having the smallest-possible minified but not compressed file size. My theory about this size affecting parse time will have to be proved (or perhaps disproved), but there are other reasons why minified file size is important.

The Yahoo! Exceptional Performance team did [some research][11] on browser caching and found that Safari for the iPhone caches the uncompressed version of the files. Further, the maximum file size cached by Mobile Safari is 25 KB. In this case, both the wire weight and the disk weight are important for performance reasons as you clearly don&#8217;t want to re-download resources on your iPhone if not necessary. Indeed, [Ryan Grove][12] of Yahoo! Search did a [writeup][13] on how he used these techniques to optimize Yahoo! Search for the iPhone.

There probably is a balancing point where applying some of these techniques, but not all, would result in the smallest possible file size and I&#8217;ll continue to research to see if there&#8217;s a way to optimize in that direction.

For the second criticism, you&#8217;ll note [my research on variable performance][14] in JavaScript shows that out-of-scope variables take longer to read to and write from than in-scope ones. I&#8217;ve also done some research on data access and found that local variables have roughly the same performance characteristics as literal values ([experiment][15]), so replacing the literal true with a variable won&#8217;t have much of a performance impact when the variable is local. Replacing a literal with an out-of-scope variable will have an effect on execution time.

This is the classic performance optimization struggle of space vs. time. If this approach results in smaller file size and therefore faster network transfer time and parse time, are you willing to take a small execution time performance hit? That&#8217;s not a question I can answer for you or anyone else, it&#8217;s a tradeoff you have to ask yourself if you&#8217;re willing to make. It&#8217;s impossible to get the fastest executing code and the smallest, so there&#8217;s a balancing point that you as the developer need to make a decision on.

## Which techniques to use

There are always tradeoffs that must be made in software development. There&#8217;s a number of requirements we need to meet and biasing towards just one requirement typically makes the others suffer. The thing I pointed out in my talk at the Yahoo! Front End Engineering Summit is that several of the techniques covered in this presentation are the same as the ones I covered in my [Maintainable JavaScript][16] talk. These are the ones that I&#8217;d suggest are important for the overall quality of your code. Even though there may be a performance impact to storing commonly-used strings and values in variables, I believe that the tradeoff is worth it to make your code more maintainable. Other more extreme measures, such as replacing native literals, are only advisable if you&#8217;re concerned about minified code size for a particular reason.

## Conclusion

As with everything I present, I&#8217;d never be so bold as to say you should follow the techniques in [Extreme JavaScript Compression with YUI Compressor][4] all the time. Research is important for understanding how better to use the tools that we have, but that doesn&#8217;t mean you should just automatically do anything differently. It&#8217;s foolish to perform any type of optimization without understanding your goal. For your case, gzipping alone may actually be the correct answer to minimizing network transfer time. I&#8217;m going to continue researching this topic and will write another post when I have more data to share.

 [1]: http://mattsnider.com/languages/javascript/development-more-thoughts-on-compression/
 [2]: http://www.mint.com
 [3]: http://developer.yahoo.com/yui/compressor/
 [4]: http://www.slideshare.net/nzakas/extreme-javascript-compression-with-yui-compressor/
 [5]: http://yuiblog.com/blog/2008/02/11/helping-the-yui-compressor/
 [6]: http://www.saltstorm.net/depo/esc/
 [7]: http://www.crockford.com/javascript/jsmin.html
 [8]: http://www.ee.uwa.edu.au/~roberto/teach/itc314/resources/gzip.txt
 [9]: http://code.google.com/speed/page-speed/
 [10]: http://www.julienlecomte.net/
 [11]: http://www.yuiblog.com/blog/2008/02/06/iphone-cacheability/
 [12]: http://wonko.com/
 [13]: http://www.yuiblog.com/blog/2008/08/28/ysearch-for-iphone/
 [14]: {{site.url}}/blog/2009/02/10/javascript-variable-performance/
 [15]: {{site.url}}/experiments/javascript/performance/data-access/
 [16]: http://www.slideshare.net/nzakas/maintainable-javascript-1071179/
