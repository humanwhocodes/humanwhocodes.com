---
title: What determines that a script is long-running?
author: Nicholas C. Zakas
permalink: /blog/2009/01/05/what-determines-that-a-script-is-long-running/
categories:
  - Web Development
tags:
  - JavaScript
  - Long-Running Script
  - Runaway Script
---
One of the programming barriers that web developers are constantly bumping up against is the dreaded long-running script dialog (also called a runaway script dialog). These frightening dialogs are displayed whenever your JavaScript code takes too long to execute. The cardinal rule of web programming is that a user should never see this dialog, as it indicates a lack of proper JavaScript code architecture. Or to put it in simple terms: your code is trying to do too much.

Brendan Eich, creator of JavaScript, is quoted as saying, &#8220;[JavaScript] that executes in whole seconds is probably doing something wrongâ€¦&#8221; My personal threshold is actually much smaller: no script should take longer than 100ms to execute on any browser at any time. If it takes any longer than that, the processing must be split up into smaller chunks.

Still, few web developers truly understand what triggers the long-running script dialog in various browsers, including myself. So I decided to sit down and figure out under what circumstances you'll see this dialog. There are basically two different ways of determining that a script is long-running. First is by tracking how many statements have been executed and second is by timing how long the script takes to execute. Not surprisingly, the approach each browser takes is slightly different.

Internet Explorer determines that a script is long-running by the total amount of statements the JScript engine has executed. By default, the value is 5 million statements and can be [altered via a registry setting][1]. When your script exceeds this maximum number of statements, you'll get this dialog:

<p style="text-align: center;">
  <a href="/images/wp-content/uploads/2009/01/ie_dialog.png"><img title="IE Long-Running Script Dialog" src="{{site.url}}/blog/wp-content/uploads/2009/01/ie_dialog-300x133.png" border="0" alt="IE Dialog: A script on this page is causing Internet Explorer to run slowly. If it continues to run, your compute may become unresponsive." width="300" height="133" /></a>
</p>

The message, &#8220;A script on this page is causing Internet Explorer to run slowly. If it continues to run, your compute may become unresponsive.&#8221; is a bit harsh if not technically accurate. The options here are to stop the script or allow it to continue running. Script execution is completely halted while the dialog is being displayed. If you choose to continue running the script, then the executed statement count is reset. You will see the dialog again if the number of statements once again reaches the maximum.

Firefox determines that a script is long-running by timing how long the script engine has been executing code continuously. The default time is set to 10 seconds and [can be altered via about:config][2]. Note that the amount of time modal dialogs, such as alerts, are displayed does not count against the script engine execution code. When this execution time has been reached, Firefox displays a dialog with the following message:

<p style="text-align: center;">
  <a href="/images/wp-content/uploads/2009/01/firefox_dialog.png"><img title="Firefox Long-Running Script Dialog" src="{{site.url}}/blog/wp-content/uploads/2009/01/firefox_dialog-300x80.png" border="0" alt="Firefox Dialog: A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue." width="300" height="80" /></a>
</p>

Firefox's message, &#8220;A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue,&#8221; is a bit more descriptive and arguably less scary than IE's. The options on this dialog are to stop the script, debug the script, or allow the script to continue. As with Internet Explorer, allowing the script to continue resets the timeout for script execution. The &#8220;Debug Script&#8221; button only appears if you have Firebug installed and active on the given page; debugging the script takes you into a view of the script that is causing the issue in Firebug.

Safari also uses script engine execution time to determine when a script has become long-running. After some digging around in the [WebKit source code][3], it looks like the default timeout is 5 seconds. When that threshold is reached, the following dialog is displayed:

<p style="text-align: center;">
  <a href="/images/wp-content/uploads/2009/01/safari_dialog.png"><img title="Safari Long-Running Script Dialog" src="{{site.url}}/blog/wp-content/uploads/2009/01/safari_dialog-300x130.png" border="0" alt="Safari Dialog: A script on the page [url] is making Safari unresponsive. Do you want to continue running the script, or stop it?" width="300" height="130" align="middle" /></a>
</p>

The message here is, &#8220;A script on the page [url] is making Safari unresponsive. Do you want to continue running the script, or stop it?&#8221; Once again, not terribly ideal for a user to see. You can turn off long-running script detection by selecting [Disable Runaway JavaScript Timer under the Develop menu][4].

Chrome is a bit trickier to track down. The long-running script control seems tied to the crash control of any given tab. I've dug through the source code and haven't been able to figure out the exact limit placed on scripts, but it does appear to be time-based and may be 10 seconds (it's likely either 5 or 10, to match Safari or Firefox). I'm trying to get in touch with someone on the project to confirm. Nonetheless, a long-running script will result in the following dialog:

<p style="text-align: center;">
  <a href="/images/wp-content/uploads/2009/01/chrome_dialog.png"><img title="Chrome Long-Running Script Dialog" src="{{site.url}}/blog/wp-content/uploads/2009/01/chrome_dialog-300x171.png" border="0" alt="Chrome Dialog: The following page(s) have become unresponsive. You can wait for them to become responsive or kill them." width="300" height="171" /></a>
</p>

Clearly, the Chrome dialog is a bit more vicious than the other browsers. Clicking on &#8220;Wait&#8221; results in the page continuing its processing until the next script timeout is reached; clicking on &#8220;Kill pages&#8221; removes the entire page from memory and it is replaced by a placeholder.

Opera is an interesting case: it doesn't appear to have a long-running script limit. I ran several tests that completed even after minutes of code execution. During the time, the browser remain mostly responsive, which is impressive. I'm not sure if this approach is a good thing or a bad thing at the moment, but it's what is implemented.

Regardless of the browser being used, your users should never encounter this dialog. It's very important to do regular performance testing of the JavaScript in your site or web application before deploying to production. There are numerous tools you can use, such as [Firebug's profiler][5] (Firefox), the [YUI Profiler][6] (all browsers), and [Internet Explorer 8&#8242;s Profiler][7]. You should be looking for any single script execution that takes 100ms or longer on any given browser; those methods involved with such a long execution should be evaluated for performance issues. Make sure you don't use Chrome as your baseline since its JavaScript execution is orders of magnitude faster than others (same goes for Firefox 3.1 and the latest WebKit nightlies). It's best to use Internet Explorer as a baseline and then look at other browsers; since IE is often the slowest JavaScript engine, fixing problems for it will certainly fix issues in other browsers as well.

**Update (1/9):** Added more description around the messages each dialog displays.

## Translations

  * Chinese (Simplified):  
    [ http://cuimingda.com/2009/01/what-determines-script-long-running.html][8]
  * Spanish:  
    <http://ernestdelgado.com/zakas/long-running-script.html>

 [1]: http://support.microsoft.com/kb/175500
 [2]: http://kb.mozillazine.org/Dom.max_script_run_time
 [3]: http://trac.webkit.org/changeset/14904#file4
 [4]: http://developer.apple.com/DOCUMENTATION/AppleApplications/Conceptual/Safari_Developer_Guide/2SafariDeveloperTools/chapter_2_section_3.html#//apple_ref/doc/uid/TP40007874-CH3-DontLinkElementID_15
 [5]: http://getfirebug.com/js.html
 [6]: http://developer.yahoo.com/yui/profiler/
 [7]: http://msdn.microsoft.com/en-us/library/cc848895(VS.85).aspx
 [8]: http://cuimingda.com/2009/01/what-determines-script-long-running.html
