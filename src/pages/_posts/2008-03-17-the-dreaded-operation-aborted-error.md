---
title: The dreaded Operation Aborted error
author: Nicholas C. Zakas
permalink: /blog/2008/03/17/the-dreaded-operation-aborted-error/
categories:
  - Web Development
tags:
  - Internet Explorer
  - JavaScript
  - Operation Aborted
---
At one point or another, it seems like most web developers have run into the dreaded &#8220;Operation Aborted&#8221; in Internet Explorer. Microsoft has acknowledge that it&#8217;s a bug and provided a <a title="BUG: Error message when you visit a Web page or interact with a Web application in Internet Explorer: &quot;Operation aborted&quot;" rel="external" href="http://support.microsoft.com/default.aspx/kb/927917">detailed writeup</a> of the situation. As usual, their writeup is wordy and hard to understand. I&#8217;ve been investigating this problem more thoroughly and wanted to provide a sane writeup of the problem and its solutions.

The problem occurs when a `script` node is contained within an element and the script is trying to modify that element&#8217;s parent or ancestor. For example, the following example page causes an operation aborted error:

` `

<pre>&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Operation Aborted Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;The following code should cause an Operation Aborted error in IE versions prior to 8.&lt;/p&gt;
    &lt;div&gt;
        &lt;script type="text/javascript"&gt;
            document.body.appendChild(document.createElement("div"));
        &lt;/script&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>

The problem in this case is that the `script` element is contained within a `div`, and the script is attempting to modify `document.body`, which is the `div`&#8216;s parent. You can replace the `div` with any other element and the result will be the same (I&#8217;ve seen examples that use `form` and `table` elements, but it really doesn&#8217;t matter). You can fix the problem in several ways:

  * Move the `script` element so that it&#8217;s a direct child of `body`.
  * Use `insertBefore()` to insert the `div` at the beginning of `body` instead of the end.
  * Wait until the page is loaded before attempting to manipulate `document.body`.

Of course, the best solution will depend entirely on what you&#8217;re trying to do.

The good news is that Internet Explorer 8 won&#8217;t throw an operation aborted error under any circumstances. Instead, it throws a regular JavaScript error that explains the situation:

> HTML Parsing Error: Unable to modify the parent container element before the child element is closed (KB927917).

This is also a difficult-to-understand error message, but it more accurately described the problem and is much better than operation aborted.
