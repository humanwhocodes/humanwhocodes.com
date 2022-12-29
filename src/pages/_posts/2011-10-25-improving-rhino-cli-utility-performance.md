---
title: Improving Rhino CLI utility performance
author: Nicholas C. Zakas
permalink: /blog/2011/10/25/improving-rhino-cli-utility-performance/
categories:
  - Personal
tags:
  - CLI
  - JavaScript
  - JSHint
  - Rhino
---
Back when I worked at Yahoo!, we spent a lot of time improving our build and checkin systems. Part of that meant using JSLint for JavaScript validation and a tool I wrote for CSS validation (not related to CSS Lint). Both of these tools were run using Rhino, the Java-based command line JavaScript engine. We start using these tools and quickly found them to be incredibly useful&#8230;when they were actually run. Developers seemed to have trouble remembering to run the lint check.

This wasn&#8217;t necessarily the developers&#8217; fault. There were actually a number of lint checks that could be run based on the type of work being done. We soon determined that we&#8217;d combine all of the checks into a single step so that everyone always ran the same check every time. And that&#8217;s when we discovered a problem: that single step was taking minutes to complete on our massive code base. Not very conducive to productivity.

After doing some digging, we discovered the root of the problem were the Rhino-based utilities. While we tinkered with the JavaScript and got some improvements, it wasn&#8217;t anywhere near good enough. The biggest change we found while changing the utilities in a very simple way: allowing them to process more than one file.

To understand the change, consider how you would currently run [JSHint][1] with Rhino:

    java -jar js.jar jshint-rhino.js yourfile.js

This executes the jshint-rhino.js file using Rhino and passes in yourfile.js as the file to run on. Most build systems using JSHint basically run this same line once *for every single file*. For example, this was the Ant target I was using in the [CSS Lint][2] build script:

    <target name="lint">
        <apply executable="java" parallel="false" failonerror="true">
            <fileset dir="${src.dir}" includes="**/*.js" />
            <arg line="-jar"/>
            <arg path="${lib.dir}/js.jar"/>
            <arg path="${lib.dir}/jshint.js" />
            <srcfile/>
            <arg line="curly=true,forin=true,latedef=true,noempty=true,undef=true,rhino=false"/>
        </apply>
    </target>
    
    

Running this target would result in each file being run through JSHint. So if, for example, there were only five files, this is the equivalent:

    java -jar js.jar jshint-rhino.js yourfile1.js 
    java -jar js.jar jshint-rhino.js yourfile2.js
    java -jar js.jar jshint-rhino.js yourfile3.js
    java -jar js.jar jshint-rhino.js yourfile4.js
    java -jar js.jar jshint-rhino.js yourfile5.js

Nothing wrong with that, really. The target took about 45 seconds to run through the entire CSS Lint codebase. That isn&#8217;t bad in the grand scheme of things but it is rather painful when you want to run the check frequently. Can you spot the problem?

Consider this: even though Rhino isn&#8217;t as fast as Node.js, it is still pretty fast. So where do you think the majority of the time is spent? 

The problem is in the setting up and tearing down of the JVM for every file. That is a fixed cost you&#8217;re paying each and every time you run Java, and if you have dozens of files in your code base, you&#8217;re paying that cost dozens of times. What you really want to do is the equivalent of:

    java -jar js.jar jshint-rhino.js yourfile1.js yourfile2.js yourfile3.js yourfile4.js yourfile5.js

Running all of your JavaScript through JSHint using a single JVM will be much, much faster than running each file through individually. Unfortunately, the JSHint Rhino CLI didn&#8217;t support passing in multiple files, so as part of my work I made the change and submitted a [pull request][3]. That change has now been merged into JSHint.

Once I had JSHint capable of evaluating multiple files in one pass, I changed the Ant target to the following (thanks to Tim Beadle on the CSS Lint mailing list for this):

    <target name="lint">       
        <fileset dir="${src.dir}" includes="**/*.js" id="jsfiles.raw"/>
        <pathconvert pathsep=" " property="jsfiles.clean" refid="jsfiles.raw" />
        <exec executable="java">
            <arg line="-jar"/>
            <arg path="${lib.dir}/js.jar"/>
            <arg path="${lib.dir}/jshint.js" />        
            <arg line="${jsfiles.clean} curly=true,forin=true,latedef=true,noempty=true,undef=true,rhino=false" />
        </exec>        
    </target>
    

Now, running `ant lint` on the CSS Lint code base takes **3 seconds**. That&#8217;s 3 seconds, down from 45 seconds before the change. Not bad.

The CSS Lint CLI for both Rhino and Node.js already support passing in multiple files on the command line, and so you can take advantage of this same pattern to validate all of your files very quickly.

The bottom line here is to keep an eye on your Rhino CLIs. The overhead of creating and destroying a JVM is something you shouldn&#8217;t be penalized for multiple times while using a utility on your code. If you&#8217;re using any Rhino-based JavaScript utilities, ask the author to support passing in multiple files. If the utility can already accept multiple files, then make sure your build scripts are actually passing in multiple files at once.

 [1]: http://jshint.com
 [2]: http://csslint.net
 [3]: https://github.com/jshint/jshint/pull/313
