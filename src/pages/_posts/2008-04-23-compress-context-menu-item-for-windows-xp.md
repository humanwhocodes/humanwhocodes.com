---
title: Compress context menu item for Windows XP
author: Nicholas C. Zakas
permalink: /blog/2008/04/23/compress-context-menu-item-for-windows-xp/
categories:
  - Web Development
tags:
  - JavaScript
  - Windows
  - YUI Compressor
---
Just thought I&#8217;d share a quick tip. I&#8217;m one of the few developers I know who uses Windows almost exclusively (sorry, no Mac here). Lately, I&#8217;ve been wanting to see how my JavaScript files would be compressed using Julien&#8217;s <a title="YUI Compressor" rel="external" href="http://developer.yahoo.com/yui/compressor/">YUI Compressor</a>. Previously, I was keeping a command window open and typing the command in directly. I figured there must be a simpler way to do this, and I was right.

The first step is download the YUI Compressor and put it somewhere handy. I put it directly in the `c:` directory for easy access. Then, I created a simple batch file called `compress.bat` and also placed it in `c:` for each access. The content of the batch file are as follows:

`java -jar c:yuicompressor-2.1.2.jar %1`

This line essentially runs the YUI Compressor against a file that is specified as the first command-line argument (`%1`). You can now simply type the following into a command window:

`c:>compress.bat myfile.js`

To take this one step further, you can add a &#8220;Compress&#8221; context menu item. To do so, follow these steps:

  1. Open an Explorer window.
  2. Under the Tools menu, click Folder Options.
  3. Click on the File Types tab.
  4. In the list, select &#8220;JS&#8221; and click the Advanced button.
  5. Click the New&#8230; button.
  6. In the Action field, type &#8220;Compress&#8221;.
  7. In the Application used to perform field, type &#8220;c:compress.bat &#8220;%1&#8243;&#8221;.
  8. Click OK.
  9. Click OK again.
 10. Click Close.

Once that is done, you can right-click on any file ending with a .js extension and see a context menu item called &#8220;Compress&#8221;. When clicked, the command runs the YUI Compressor and the output is placed in the same directory.

I&#8217;ve found this to be a very handy way to use the YUI Compressor. I hope it&#8217;s equally as useful for you.
