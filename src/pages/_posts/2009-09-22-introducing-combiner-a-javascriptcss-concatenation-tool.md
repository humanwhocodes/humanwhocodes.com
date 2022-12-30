---
title: Introducing Combiner, a JavaScript/CSS concatenation tool
author: Nicholas C. Zakas
permalink: /blog/2009/09/22/introducing-combiner-a-javascriptcss-concatenation-tool/
categories:
  - Web Development
tags:
  - Build
  - Combiner
  - JavaScript
---
One of the things I used to love when programming in more &#8220;traditional&#8221; languages such as C++ and Java was the build process. My source files just indicated what they needed in order to run successfully, and the build tool did the rest. This had the wonderful advantage of allowing you, as a programmer, to separate your code into as many files as logically sensible without worry about the order in which they would end up.

I love JavaScript and try to bring good coding practices to it as part of my job. I was very excited when people started talking about using a build process to combine JavaScript files into single, deployable files. My colleague Julien Lecomte wrote an excellent blog post entitled, [Building Web Applications with Apache Ant][1], which shows how easy and powerful a build process can be for your files. It seems that most people now understand the value of having a good build process, as most JavaScript libraries use one.

## The problem

Most build systems I've seen require you to indicate your dependencies in a separate file. This has bothered me for quite some time. Why should dependency information exist outside of the files that need it? Why introduce another file into the system whose sole job is to manage dependencies? What I wanted was the equivalent of `#include` in C or `import` in Java, something that would allow me to specify dependencies in my source file and then combine all source files together in the correct order based on their dependencies. So early last year, I started working on Combiner.

## What Combiner does

Combiner does just one thing: figures out the dependencies between files and creates a single file with all parts in the correct order. The process is the same for *both JavaScript and CSS* files. You specify that a file has a dependency on another by including a special comment in the following form:

    /*requires filename.ext*/

For example:

    /*requires yahoo.js*/

I chose to name the comment &#8220;requires&#8221; because it is not a static include. Combiner looks at all specified files, reads in their requirements, then arranges all files so that dependencies always occur prior to the code requiring them. You need one &#8220;requires&#8221; comment for each file that is required.

Note: You can use relative or absolute paths in the comment. For example, the following works as expected:

    /*requires ../yahoo.js*/

## Usage

I purposely made Combiner accept the same format and order of arguments as the [YUI Compressor][2]. Here is the help text (accessible via the `-h` or `--help` flags):

    Usage: java -jar combiner-x.y.z.jar [options] [input files]
    
    Global Options
      -h, --help                Displays this information
      --charset <charset>       Read the input file using <charset>
      -v, --verbose             Display informational messages and warnings
      -s, --separator           Output a separator between combined files
      -e, --eliminate           Eliminates any files that aren't explicitly required.
      -o <file>                 Place the output into <file>. Defaults to stdout.

There are two basic ways to use Combiner for combining JavaScript and CSS files. The first way is to indicate just the core files you want to build. For example:

    java -jar combiner-0.0.1.jar -o output.js file1.js file2.js

In this case, Combiner reads in file1.js and file2.js and checks for dependencies. If there are dependencies, then Combiner also reads those in. The final file, output.js, is comprised of file1.js, file2.js, plus any dependent files that might have been specified in source code. This method of usage ensures that only the necessary files end up in the resulting file.

The second way to use Combiner is to give it a pattern. You can, for instance, include all JavaScript files in a single directory:

    java -jar combiner-0.0.1.jar -o output.js *.js

When all JavaScript (or CSS) files are included, Combiner reads through all files specified to find dependency information. Even if one or more files have no dependency information, meaning they don't require any of the other files and none of the other files require them, these files still end up in the resulting output.js. If this isn't what you want, you can tell Combiner to eliminate files without dependency information by including the `-e` flag:

    java -jar combiner-0.0.1.jar -e -o output.js *.js

If you're interested in seeing what Combiner has found and what it's doing, add the `-v` or `--verbose` flag:

    java -jar combiner-0.0.1.jar -v -o output.js *.js

The resulting output looks something like this:

    [INFO] Using charset Cp1252
    [INFO] Output file is 'yuitest.js'
    [INFO] Adding file 'yuitest\ArrayAssert.js'
    [INFO] Adding file 'yuitest\Assert.js'
    [INFO] Adding file 'yuitest\DateAssert.js'
    [INFO] Adding file 'yuitest\Mock.js'
    [INFO] Adding file 'yuitest\ObjectAssert.js'
    [INFO] Adding file 'yuitest\TestCase.js'
    [INFO] Adding file 'yuitest\TestFormat.js'
    [INFO] Adding file 'yuitest\TestManager.js'
    [INFO] Adding file 'yuitest\TestReporter.js'
    [INFO] Adding file 'yuitest\TestRunner.js'
    [INFO] Adding file 'yuitest\TestSuite.js'
    [INFO] Processing file 'yuitest\ArrayAssert.js'
    [INFO] ... has dependency on Assert.js
    [INFO] Processing file 'yuitest\Assert.js'
    [INFO] ... no dependencies found.
    [INFO] Processing file 'yuitest\DateAssert.js'
    [INFO] ... has dependency on Assert.js
    [INFO] Processing file 'yuitest\Mock.js'
    [INFO] ... has dependency on Assert.js
    [INFO] Processing file 'yuitest\ObjectAssert.js'
    [INFO] ... has dependency on Assert.js
    [INFO] Processing file 'yuitest\TestCase.js'
    [INFO] ... has dependency on Assert.js
    [INFO] Processing file 'yuitest\TestFormat.js'
    [INFO] ... no dependencies found.
    [INFO] Processing file 'yuitest\TestManager.js'
    [INFO] ... no dependencies found.
    [INFO] Processing file 'yuitest\TestReporter.js'
    [INFO] ... no dependencies found.
    [INFO] Processing file 'yuitest\TestRunner.js'
    [INFO] ... has dependency on TestCase.js
    [INFO] ... has dependency on TestSuite.js
    [INFO] ... has dependency on Assert.js
    [INFO] Processing file 'yuitest\TestSuite.js'
    [INFO] ... has dependency on TestCase.js
    [INFO] Verifying dependencies of 'yuitest\TestReporter.js'
    [INFO] Verifying dependencies of 'yuitest\ObjectAssert.js'
    [INFO] Verifying dependencies of 'yuitest\TestFormat.js'
    [INFO] Verifying dependencies of 'yuitest\TestRunner.js'
    [INFO] Verifying dependencies of 'yuitest\Assert.js'
    [INFO] Verifying dependencies of 'yuitest\DateAssert.js'
    [INFO] Verifying dependencies of 'yuitest\TestCase.js'
    [INFO] Verifying dependencies of 'yuitest\ArrayAssert.js'
    [INFO] Verifying dependencies of 'yuitest\TestSuite.js'
    [INFO] Verifying dependencies of 'yuitest\TestManager.js'
    [INFO] Verifying dependencies of 'yuitest\Mock.js'
    [INFO] Adding 'yuitest\Assert.js' to output.
    [INFO] Adding 'yuitest\ObjectAssert.js' to output.
    [INFO] Adding 'yuitest\TestCase.js' to output.
    [INFO] Adding 'yuitest\TestSuite.js' to output.
    [INFO] Adding 'yuitest\DateAssert.js' to output.
    [INFO] Adding 'yuitest\ArrayAssert.js' to output.
    [INFO] Adding 'yuitest\Mock.js' to output.
    [INFO] Adding 'yuitest\TestRunner.js' to output.

If you believe that your file is coming out in the wrong order, running in verbose mode can help identify the problem. The most frequent cause of incorrect file order is that dependency information is missing or incorrect.

## Error checking

I tried to identify all of the areas where an error could occur in the process and give an appropriate error message. The following error conditions are checked each time Combiner is run:

  * Verify that all specified files exist.
  * Verify that all dependency files exist.
  * Verify that circular references do not exist between files.

It's my hope that any errors occurring in the process are indicating in an obvious and non-confusing manner. I know I've spent endless hours trying to decipher the output of some tools when errors occurred, and I hope Combiner saves everyone from this pain.

## What Combiner isn't

Combiner isn't a front-end build system. There are plenty of good build systems already out there, and I don't want to add to that list. Combiner's job is simply to combine JavaScript and CSS files in a way that frees you from worrying about source file ordering. You can use this as part of your build process just like you'd use YUI Compressor as part of the build process.

Combiner is neither a copycat of [Sprockets][3] nor an alternative to it. Sprockets is a far more complete build system for front-end development that includes JavaScript dependency management as well as packaging of other assets such as CSS and images. Combiner is strictly for JavaScript and CSS dependency management and can be plugged into any build system.

## What took so long?

I originally wrote Combiner for a talk I was scheduled to give at the Rich Web Experience in San Jose. The talk was an overview of creating a front-end build system using Combiner, YUI Compressor, and more. Unfortunately, the conference was canceled and I got involved with some other projects (including a new book) that took up most of my time. This weekend, while trying to develop another tool, I came across the old source files and decided to finish up the work I had started.

## Download

Combiner is written in Java and is distributed as a jar file, which can be downloaded here: [combiner-0.0.1.jar][4]. Combiner is freeware currently. If there's enough interest, I'll clean up the code and open source it, so definitely feel free to contact me with feedback.

**Update (18 Oct 2009):** Combiner released under BSD license. Source available at [GitHub][5].

 [1]: http://www.julienlecomte.net/blog/2007/09/16/
 [2]: http://developer.yahoo.com/yui/compressor/
 [3]: http://getsprockets.org/
 [4]: {{site.url}}/downloads/combiner-0.0.1.jar
 [5]: http://github.com/nzakas/combiner
