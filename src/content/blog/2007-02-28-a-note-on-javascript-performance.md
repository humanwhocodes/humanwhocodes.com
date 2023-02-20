---
title: A note on JavaScript performance
author: Nicholas C. Zakas
permalink: /blog/2007/02/28/a-note-on-javascript-performance/
categories:
  - Web Development
tags:
  - Compression
  - Crunching
  - JavaScript
  - Minifying
---
There's a lot of focus on the performance of JavaScript in modern web applications. Sites are routinely panned for being too slow, using too much JavaScript, and interacting sluggishly. There's a lot of talk about this library being too big, that application using too much code, etc. Typically, the suggested solutions are:

  * **Crunch your code.** Using a processor to strip out extra white space, comments, and anything else reduces the overall size of the code. This is the traditional way of doing things.
  * **Compress your file.** Lately, a lot of people have suggested compressing the JavaScript file using gzip, which significantly reduces the file's size on the wire, moreso than simply removing excess characters.
  * **Do both!** The ultimate is to use both of these techniques to reduce the file size as much as possible.

There approaches are all fine for doing a single job: hastening transmission time from server to client. Once the code gets to the client, though, it doesn't matter how compressed it is. The JavaScript interpreter knows nothing about compression. It simply needs to parse, build a syntax tree, and then execute the code. This means that the more code there is, the slower the execution. The bits that you saved on the wire mean nothing at this point, you need to optimize your code.

My general rule of thumb is that less code is better. I'm not talking about bytes or replacing variable names with shorter ones, I'm talking about the number of statements in your code. The more statements, the slower the execution. There seems to be a misconception these days that you can make your JavaScript code as big as you want because the files can always be compressed and crunched, but you need to realize that code execution is a function of code mass. Long-running functions can cause severe performance problems and lead to the dreaded &#8220;A script is causing this page to run slowly&#8221; dialog.

So, a plea from a single voice: don't forget about optimizing your code the old-fashioned way by removing excess and unused functions, avoiding calls to functions that only execute a single statement, and keep your code weight down. You'll be happy that you did.
