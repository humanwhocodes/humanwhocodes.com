---
title: JavaScript stack overflow error
author: Nicholas C. Zakas
permalink: /blog/2009/05/19/javascript-stack-overflow-error/
categories:
  - Web Development
tags:
  - JavaScript
  - Overflow
  - Performance
  - Recursion
  - Stack
---
From time to time, I&#8217;ve blogged about JavaScript browser limits and how they present themselves. I started out by discussing the [long-running script dialog][1] and then moved on to [other][2] [performance][3] [issues][4]. I thought I had covered most of the annoying and ill-explained JavaScript limits, but this past week I ran across another that is worth discussing: stack overflow errors.

I&#8217;ve written about how too much recursion can lead to performance issues. Most browsers have limits on how much recursion is allowed before the script is automatically canceled. This is a limit that is separate from the one determining if the script is long-running. And the limit is really less about recursive calls so much as it is about the size of the JavaScript call stack.

Not surprisingly, different browsers have different call stack sizes. Also not surprisingly, the method that they use to determine the call stack varies as well. The various call stack sizes I could measure are (give or take, might be off by 1 or 2):

  * Internet Explorer 7: 1,789
  * Firefox 3: 3,000
  * Chrome 1: 21,837
  * Opera 9.62: 10,000
  * Safari 3.2: 500

Some have said, but I cannot confirm, that IE and Opera&#8217;s call stack size are somewhat tied to the amount of RAM on the system. All other browsers have this set by a default. It&#8217;s also worth noting that WebKit seems to have a much higher limit and that Safari imposes a stricter limit on the JavaScript engine.

There are two common scenarios in which this limit could be reached. The first is simple recursion, such as:

    function recurse(){
        recurse();
    }
    
    recurse();

The second is a more devious and harder-to-identify issue, especially in large code bases, where two functions each call the other, such as:

    function doSomething(){
        doSomethingElse();
    }
    
    function doSomethingElse(){
        doSomething();
    }
    
    doSomething();

In each case, the browser will end up stopping your code and (hopefully) display a message about the issue:

  * Internet Explorer 7: &#8220;Stack overflow at line x&#8221;
  * Firefox 3:&#8221;Too much recursion&#8221;
  * Chrome 1: n/a
  * Opera 9.62: &#8220;Abort (control stack overflow)&#8221;
  * Safari 3.2:&#8221;RangeError: Maximum call stack size exceeded.&#8221;

Chrome is the only browser that doesn&#8217;t display a message indicating the problem. If you see any of these error messages pop up, it means one of the two patterns are involved and need to be changed. There&#8217;s usually a line number and file name associated with this error, so it&#8217;s fairly straightforward to debug.

Perhaps the most interesting part of stack overflow errors is that they are actual JavaScript errors in some browsers, and can therefore be trapped using a `try-catch` statement. The exception type varies based on the browser being used. In Firefox, it&#8217;s an `InternalError`, in Safari and Chrome, it&#8217;s a `RangeError`, and Internet Explorer throws a generic `Error` type (Opera doesn&#8217;t throw an error, it just stops the JavaScript engine) . So, it&#8217;s possible to do something like this:

    try {
        recurse();
    } catch (ex){
        alert("Too much recursion!");
    }

If left untrapped, these errors bubble up as any other error would (in Firefox, it ends up in the Firebug console, Safari/Chrome it shows up in the console) except in Internet Explorer. IE will not only display a JavaScript error but will also display an ugly dialog box that looks just like an alert with the stack overflow message. 

Now, just because it&#8217;s possible to trap this error in almost all browsers doesn&#8217;t mean that you should. No code should end up in production with even the possibility of a stack overflow error present. Such instances indicate poor code design and should be re-evaluated and/or re-designed to avoid this error. Consider this post as an aid in debugging this issue, not as a license to trap and disguise it.

 [1]: {{site.url}}/blog/2009/01/05/what-determines-that-a-script-is-long-running/
 [2]: {{site.url}}/blog/2009/01/13/speed-up-your-javascript-part-1/
 [3]: {{site.url}}/blog/2009/01/20/speed-up-your-javascript-part-2/
 [4]: {{site.url}}/blog/2009/01/27/speed-up-your-javascript-part-3/
