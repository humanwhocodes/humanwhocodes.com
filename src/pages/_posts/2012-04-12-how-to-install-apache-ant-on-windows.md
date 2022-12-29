---
title: How to install Apache Ant on Windows
author: Nicholas C. Zakas
permalink: /blog/2012/04/12/how-to-install-apache-ant-on-windows/
categories:
  - Software Development
---
Apache Ant<sup>[1]</sup> is still my favorite tool for creating build systems for my code. Yes, I know there are a lot of shiny new tools written in Node.js or something else, but I&#8217;ve used Ant for a long time and have found it easy to teach others. What&#8217;s more, it comes installed on Macs and is an easy install on Linux as a package.

Unfortunately, it&#8217;s a bit of a beast to install on Windows. Every time I have to install Ant on another Windows machine I end up searching the web yet again for a good set of instructions. So this post is primarily for myself, so that I don&#8217;t need to search too far.

## Prerequisites

Before beginning, make sure you have the latest JDK installed. If not, go download it from Sun<sup>[2]</sup> and install it. It&#8217;s better to install the JDK instead of just the JRE because some Ant tasks require the JDK.

## Step 1: Download and install

The first step, as with most software, is to download Ant. Go to the Ant homepage and click to download the binary. Because we&#8217;re talking about Windows, choose to download the ZIP file rather than any of the others. Scroll down to where it says &#8220;Current release of Ant&#8221; and click on the ZIP filename.

Once downloaded, unzip the file. You&#8217;ll now need to choose a permanent home for Ant on the computer. I tend to use c:\java\ant for simplicity, but you can use whatever you want. I do recommend, however, that the path have no spaces in it (spaces make things more complicated).

## Step 2: Set environment variables

This is the part that I always forget. Because you&#8217;re installing Ant by hand, you also need to deal with setting environment variables by hand. 

**For Windows XP**: To set environment variables on Windows XP, right click on My Computer and select Properties. Then go to the Advanced tab and click the Environment Variables button at the bottom.

**For Windows 7**: To set environment variables on Windows 7, right click on Computer and select Properties. Click on Advanced System Settings and click the Environment Variables button at the bottom.

The dialog for both Windows XP and Windows 7 is the same. Make sure you&#8217;re only working on system variables and not user variables.

The only environment variable that you absolutely need is `JAVA_HOME`, which tells Ant the location of your JRE. If you&#8217;ve installed the JDK, this is likely `c:\Program Files\Java\jdk1.x.x\jre` on Windows XP and `c:\Program Files(x86)\Java\jdk1.x.x\jre` on Windows 7. You&#8217;ll note that both have spaces in their paths, which causes a problem. You need to use the mangled name<sup>[3]</sup> instead of the complete name. So for Windows XP, use `C:\Progra~1\Java\jdk1.x.x\jre` and for Windows 7, use `C:\Progra~2\Java\jdk1.6.0_26\jre` if it&#8217;s installed in the `Program Files(x86)` folder (otherwise use the same as Windows XP).

That alone is enough to get Ant to work, but for convenience, it&#8217;s a good idea to add the Ant binary path to the `PATH` variable. This variable is a semicolon-delimited list of directories to search for executables. To be able to run `ant` in any directory, Windows needs to know both the location for the `ant` binary and for the `java` binary. You&#8217;ll need to add both of these to the end of the `PATH` variable. For Windows XP, you&#8217;ll likely add something like this:

    ;c:\java\ant\bin;C:\Progra~1\Java\jdk1.x.x\jre\bin

For Windows 7, it will look something like this:

    ;c:\java\ant\bin;C:\Progra~2\Java\jdk1.x.x\jre\bin

## Done

Once you&#8217;ve done that and applied the changes, you&#8217;ll need to open a new command prompt to see if the variables are set properly. You should be able to simply run `ant` and see something like this:

    Buildfile: build.xml does not exist!
    Build failed

That means Ant is installed properly and is looking for a `build.xml` file.

## References

  1. [Apache Ant homepage][1]
  2. [Java SE Downloads][2]
  3. [Microsoft filenames][3]

 [1]: http://ant.apache.org/
 [2]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
 [3]: http://en.wikipedia.org/wiki/Tilde#Microsoft_filenames
