---
title: 'Internet Explorer 11&#8242;s user-agent string: What does it mean?'
author: Nicholas C. Zakas
permalink: /blog/2013/03/27/internet-explorer-11s-user-agent-string-what-does-it-mean/
categories:
  - Web Development
tags:
  - Browsers
  - Internet Explorer
  - User Agent String
---
Over the past few days, people have been going a little crazy over the announcement of the Internet Explorer 11 user-agent string. User-agent string announcements are typically met with a keen eye as we are still horribly tied to user-agent sniffing on servers around the world. And so when some beta testers leaked an Internet Explorer 11 user-agent string, people sat up and paid attention. The string in question, reported by Neowin<sup>[1]</sup>, looks like this:

    Mozilla/5.0 (IE 11.0; Windows NT 6.3; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko

If you&#8217;ve read my [history of user-agent strings][1] post, then you&#8217;re aware of the sinister history of user-agent strings and how browsers try to trick servers into believing that they are other browsers. Internet Explorer 3 actually began the practice by using &#8220;Mozilla&#8221; in the user-agent string so it would be identified by servers trying to filter for Netscape.

If this user-agent string is the final one (Microsoft hasn&#8217;t confirmed or denied this is the user-agent string), then it shows how one can manipulate the user-agent string to get different results. For comparison, here are a few different user-agent strings:

    Internet Explorer 10
    Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)
    
    Firefox 19 (Windows 7)
    Mozilla/5.0 (Windows NT 6.1; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0
    
    Safari 6
    Mozilla/5.0 (Macintosh; Intel Mac OS X 1076) AppleWebKit/536.26.17 (KHTML like Gecko) Version/6.0.2 Safari/536.26.17
    
    Chrome 25 (Windows 7)
    Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22

In the past, it was easy to identify Internet Explorer by searching for the string &#8220;MSIE&#8221; in the user-agent string. If present, the browser is Internet Explorer. When Gecko was the embedded webview of choice, many simply looked for &#8220;Gecko&#8221; in the user-agent string to determine if it was a Gecko-powered browser (and therefore likely to behave as Firefox). That approach fell apart when Safari decided to add &#8220;like Gecko&#8221; into the middle of its user-agent string. Not long ago, WebKit overtook Gecko as the embeddable webview of choice, and so many started looking for &#8220;Firefox&#8221; in the user-agent string to specifically identify Firefox.

Chrome came along and wanted to be identified as Safari, so it pretty much copied the Safari user-agent string and added a &#8220;Chrome&#8221; identifier. Simple browser type detection based on user-agent string meant you would need to look for certain tokens in order:

  1. If &#8220;MSIE&#8221; is present, it&#8217;s Internet Explorer.
  2. Else if &#8220;Firefox&#8221; is present, it&#8217;s Firefox.
  3. Else if &#8220;Chrome&#8221; is present, it&#8217;s Chrome.
  4. Else if &#8220;Safari&#8221; is present, it&#8217;s Safari.
  5. Else if &#8220;WebKit&#8221; is present, it&#8217;s a WebKit-based browser.
  6. Else if &#8220;Gecko&#8221; is present, it&#8217;s a Gecko-based browser.

So if the Internet Explorer 11 user-agent string is the final one, it causes some interesting logic to happen in this case. In short, by removing &#8220;MSIE&#8221; in favor of &#8220;IE&#8221;, the browser is forcing itself to not be identified as Internet Explorer (step 1). By adding &#8220;like Gecko&#8221; at the end, it is self-selecting into the category of Gecko-based browsers (step 6).

Gecko- and WebKit-based browsers both are considered to have better standards support than Internet Explorer (generally well-deserved prior to IE10), so tricking servers into identifying IE11 as a Gecko-based browser could mean that the browser can handle the same content (JavaScript, CSS) as Firefox. Of course, that&#8217;s usually not the case, especially when it comes to vendor-prefixed functionality. Will IE11 support `moz`-prefixed functionality?

Is it wise for Internet Explorer 11 to try to hide its identity? I&#8217;m sure in some convoluted way it makes sense based on how web applications are serving up different content based on user-agent strings. I still have hope for a day when user-agent strings reflect the actual browser rather than trying to trick servers into serving the correct content, but for now, this is just a continuation of a long, sad browser user-agent lineage.

## References

  1. [IE11 to appear as Firefox to avoid legacy IE CSS][2] (Neowin)

 [1]: {{site.url}}/blog/2010/01/12/history-of-the-user-agent-string/
 [2]: http://www.neowin.net/news/ie11-to-appear-as-firefox-to-avoid-legacy-ie-css
