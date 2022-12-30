---
title: Automatic data URI embedding in CSS files
author: Nicholas C. Zakas
permalink: /blog/2009/11/03/automatic-data-uri-embedding-in-css-files/
categories:
  - Web Development
tags:
  - Build
  - CSS
  - Data URI
---
Last week, I posted about [data URIs][1] and why they're an interesting feature of web browsers. In the conclusion, I mentioned that the best use of data URIs is to embed them in CSS files so that they have the best chance of being cached by the browser. I got a lot of responses, both on this blog and via other means that people were very excited about data URIs and were ready to make the leap to using them in CSS. This left me with me believing that an interesting time is upon us.

## The problem

Even though Internet Explorer prior to version 8 doesn't support data URIs, the majority of people seem willing to serve alternate content to those less-capable browsers and serve the more optimal content to those that can handle it. The problem is that millions of web sites are currently using CSS files that reference image files in the traditional manner, and all of those would have to be converted over to use data URIs. No one wants to maintain multiple versions of CSS files, so it would be best if this conversion process could be automatic.

## Introducing CSSEmbed

I spent the past couple of days coding and am proud to introduce [CSSEmbed][2], a tool to automatically embed images into CSS files as data URIs. This is a very small, simple tool that reads in a CSS file, identifies the images referenced within, converts them to data URIs, and outputs the resulting style sheet. The newly-created stylesheet is an exact duplicate of the original, complete with comments and indentation intact; the only difference is that all references to image files have been replaced with data URIs. Because it preserves the original formatting of the style sheet, it can be used both on nicely-formatted source code and crunched source code without worry.

CSSEmbed is written in Java and requires Java 1.5+ to run. To get started, download the [JAR file][3]. All of the dependencies are included in that JAR file, so there is no need to mess around with setting up classpaths or downloading other dependencies. Basic usage is as follows:

    java -jar cssembed-x.y.z.jar -o <output filename> <input filename>

For example:

    java -jar cssembed-x.y.z.jar -o styles_new.css styles.css

When the `-o` flag is omitted, the output ends up on `stdout`, thus you can direct the output to a file directly:

    java -jar cssembed-x.y.z.jar styles.css > styles_new.css

Complete usage instructions are available using the `-h` flag:

    Usage: java -jar cssembed-x.y.z.jar [options] [input file]
    
    Global Options
       -h, --help            Displays this information.
       --charset             Character set of the input file.
       -v, --verbose         Display informational messages and warnings.
       -root                 Prepends  to all relative URLs.
       -o                    Place the output into . Defaults to stdout.

CSSEmbed is smart in the way it identifies images. If the image location begins with &#8220;http://&#8221;, then the tool automatically downloads the file and converts it to a data URI. If the image location is a relative path (i.e., contains &#8220;../&#8221;), CSSEmbed looks for the file locally in relation to the style sheet file's location. If the files is an absolute path without &#8220;http://&#8221; specified, such as &#8220;/images/image.png&#8221;, you'll need to provide a root via the `--root` option. When specified, the root gets prepended to all image locations that don't already begin with &#8220;http://&#8221;.

For more information about CSSEmbed, please check out the [documentation][4]. You can also download the source (MIT License) from the [GitHub project][5]. CSSEmbed is in its very early stages, so feedback is welcome. If you find any bugs, please use the [issue tracker][6] to report them.

## &#8230;and introducing DataURI

When I was researching data URIs, I didn't come across any simple data URIs generators. There's Hixie's data URI kitchen, but that's just available online. What I really wanted was something to be run on the command line so that I could create CSSEmbed. As such, I created [DataURI][2], which is a simple tool that reads in a file and outputs the data URI representation. DataURI is the underlying engine that CSSEmbed uses to create its data URIs.

DataURI is also written in Java and requires Java 1.5+ to run. As with CSSEmbed, there is a single [JAR file][7] containing all of the dependencies. The same general command line options are available, so the basic usage is very similar to CSSEmbed:

    java -jar datauri-x.y.z.jar -o <output filename> <input filename>

For example:

    java -jar datauri-x.y.z.jar -o output.txt image.png

The files to encode don't have to be local, you can include a URL on the command line and it will download and encode them:

    java -jar datauri-x.y.z.jar -o output.txt http://www.your.domain.com/image.png

When the `-o` flag is omitted, the output ends up on `stdout`, thus you can direct the output to a file directly:

    java -jar datauri-x.y.z.jar styles.css > styles_new.css

Complete usage instructions are available using the `-h` flag:

    Usage: java -jar datauri-x.y.z.jar [options] [input file]
    
    Global Options
       -h, --help            Displays this information.
       --charset <charset>   Character set of the input file.
       -v, --verbose         Display informational messages and warnings.
       -m, --mime <type>     Mime type to encode into the data URI.
       -o <file>             Place the output into <file>. Defaults to stdout.

DataURI is capable of creating data URIs for images and some text files (for the complete list, please see the [documentation][8]). The source code is available (MIT License) from the [GitHub project][2] and you can report [issues][6] there as well.

## Acknowledgements

I was inspired to create these tools after reading, [Not Just a Pretty Face: Performance and the New Yahoo! Search][9], by [Ryan Grove][10], [Stoyan Stefanov][11], and Venkateswaran Udayasankar from the Yahoo! Search team. The section about data URIs led me to do more research and ultimately to the creation of both CSSEmbed and DataURI.

I'm nowhere near as good at Java as I am with JavaScript, and so having a great working example made this development easier. To that end, I must thank [Julien Lecomte][12] as I used the [source code][13] for [YUI Compressor][14] as a guideline for how to organize my code. Julien's code is so clean that it was easy to setup my projects in the same manner. I also used his Ant file as a basis for my own.

## Followup

Data URIs are definitely exciting as a means of improving web site performance.Â  Every big push forward in development technique needs a good set of tools to increase adoption. I sincerely hope that CSSEmbed and DataURI can help people get started in the creation and usage of data URIs.

**Update (27-June-2010): **Updated links to DataURI source on GitHub (now part of CSSEmbed repository).

 [1]: {{site.url}}/blog/2009/10/27/data-uris-explained/
 [2]: http://github.com/nzakas/cssembed
 [3]: http://github.com/nzakas/cssembed/downloads/
 [4]: http://wiki.github.com/nzakas/cssembed
 [5]: http://github.com/nzakas/cssembed/
 [6]: http://github.com/nzakas/cssembed/issues
 [7]: http://github.com/nzakas/datauri/downloads/
 [8]: http://wiki.github.com/nzakas/cssembed/datauri
 [9]: http://developer.yahoo.net/blog/archives/2009/09/search_performance.html
 [10]: http://www.wonko.com
 [11]: http://www.phpied.com
 [12]: http://www.julienlecomte.net/
 [13]: http://github.com/yui/yuicompressor
 [14]: http://developer.yahoo.com/yui/compressor/
