---
title: History of the user-agent string
author: Nicholas C. Zakas
permalink: /blog/2010/01/12/history-of-the-user-agent-string/
categories:
  - Web Development
tags:
  - Browsers
  - Chrome
  - Firefox
  - Internet Explorer
  - Opera
  - Safari
  - User Agent String
---
A couple of weeks ago, I talked about [feature detection and browser detection][1]. That post featured a little bit about user-agent sniffing and the comments continued the trend. I maintain that user-agent sniffing is an important technique to keep in your back pocket for those rare occasions when it's needed. Before being able to do that, though, it's useful to understand why user-agent string detection is considered to be such an inexact science. And to do that, you need to take a look at how the user-agent string has evolved over the years.

The following is an abridged version of the history of user-agent strings as it appears in my book, [Professional JavaScript for Web Developers, 2nd Edition][2].

## Early Browsers

The first web browser, Mosaic, was released in 1993 by the National Center for Supercomputing Applications (NCSA). Its user-agent string was fairly simple, taking a form similar to this:

    Mosaic/0.9

Though this would vary depending on the operating system and platform, the basic format was simple and straightforward. The text before the forward slash indicated the product name (sometimes appearing as NCSA Mosaic or other derivatives), and the text after the slash is the product version.

When Netscape Communications began developing their web browser, its codename was Mozilla (short for &#8220;Mosaic Killer&#8221;). Netscape Navigator 2, the first publicly available version, had a user-agent string with the following format:

    Mozilla/Version [Language] (Platform; Encryption)

Netscape kept the tradition of using the product name and version as the first part of the user-agent string, but added the following information afterwards:

  1. Language &#8211; The language code indicating where the application was intended to be used.
  2. Platform &#8211; The operating system and/or platform on which the application is running.
  3. Encryption &#8211; The type of security encryption included. Possible values are U (128-bit encryption), I (40-bit encryption), and N (no encryption).

A typical user-agent string from Netscape Navigator 2 looked like this:

    Mozilla/2.02 [fr] (WinNT; I)

This string indicates Netscape Navigator 2.02 is being used, is compiled for use in French-speaking countries, and is being run on Windows NT with 40-bit encryption. At this point in time, it was fairly easy to determine what browser was being used just by looking at the product name in the user-agent string.

## Netscape Navigator 3 and Internet Explorer 3

In 1996, Netscape Navigator 3 was released and became the most popular web browser, surpassing Mosaic. The user-agent string went through only a small change, removing the language token and allowing optional information about the operating system or CPU used on the system. The format became the following:

    Mozilla/Version (Platform; Encryption [; OS-or-CPU description])

A typical user-agent string for Netscape Navigator 3 running on a Windows system looked like this:

    Mozilla/3.0 (Win95; U)

This string indicates Netscape Navigator 3 running on Windows 95 with 128-bit encryption. Note that the OS or CPU description was left off when the browser ran on Windows systems.

Shortly after the release of Netscape Navigator 3, Microsoft released their first publicly available web browser, Internet Explorer 3. Since Netscape was the dominant browser at the time, many servers specifically checked for it before serving up pages. The inability to access pages in IE would have crippled adoption of the fledgling browser, so the decision was made to create a user-agent string that would be compatible with the Netscape user-agent string. The result was the following format:

    Mozilla/2.0 (compatible; MSIE Version; Operating System)

For example, Internet Explorer 3.02 running on Windows 95 had this user-agent string:

    Mozilla/2.0 (compatible; MSIE 3.02; Windows 95)

Since most browser sniffers at the time looked only at the product-name part of the user-agent string, IE successfully identified itself as Mozilla, the same as Netscape Navigator. This move caused some controversy since it broke the convention of browser identification. Further, the true browser version is buried in the middle of the string.

## Netscape Communicator 4 and Internet Explorer 4-8

In August of 1997, Netscape Communicator 4 was released (the name was changed from Navigator to Communicator for this release). Netscape opted to keep the following user-agent string format from version 3. With version 4 on a Windows 98 machine, the user-agent string looked like this:

    Mozilla/4.0 (Win98; I)

As Netscape released patches and fixes for its browser, the version was incremented accordingly, as the following user-agent string from version 4.79 indicates:

    Mozilla/4.79 (Win98; I)

When Microsoft released Internet Explorer 4, the user-agent string featured an updated version, taking the following format:

    Mozilla/4.0 (compatible; MSIE Version; Operating System)

For example, IE 4 running on Windows 98 returned the following user-agent string:

    Mozilla/4.0 (compatible; MSIE 4.0; Windows 98)

With this change, the reported Mozilla version and the actual version of IE were synchronized, allowing for easy identification of these fourth-generation browsers. Unfortunately, the synchronization ended there. As soon as Internet Explorer 4.5 (released only for Macs), the Mozilla version remained 4 while the IE version changed as follows:

    Mozilla/4.0 (compatible; MSIE 4.5; Mac_PowerPC)

In IE versions through version 7, the same pattern remained.

Internet Explorer 8 [slightly modified the user-agent string][3] by adding the version of the rendering engine, Trident, into the user-agent string:

    Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)

Adding the rendering engine is important because the MSIE version changes to 7.0 when IE8 is running in compatibility mode while the Trident version remains the same. Since the original IE7 user-agent string doesn't include the Trident version, you can easily distinguish between IE7 and IE8 running in compatibility mode.

Note: It is unclear if the Mozilla version will ever change as IE continues to develop, because it now has little meaning (it can't be used reliably to determine anything).

## Gecko

The Gecko rendering engine is at the heart of Firefox. When Gecko was first developed, it was as part of the generic Mozilla browser that was to become Netscape 6. A specification was written for Netscape 6, indicating how the user-agent string should be constructed in all future versions. The new format represented a fairly drastic departure from its relatively simple user-agent string used through version 4.x. The format is as follows:

    Mozilla/MozillaVersion (Platform; Encryption; OS-or-CPU; Language; PrereleaseVersion)Gecko/GeckoVersion ApplicationProduct/ApplicationProductVersion

[A lot of thought][4] went into this remarkably complex user-agent string. To better understand the Gecko user-agent string format, consider the following user-agent strings taken from various Gecko-based browsers.

Netscape 6.21 on Windows XP:

    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.4) Gecko/20011128 Netscape6/6.2.1

SeaMonkey 1.1a on Linux:

    Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1b2) Gecko/20060823 SeaMonkey/1.1a

Firefox 2.0.0.11 on Windows XP:

    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11

Camino 1.5.1 on Mac OS X:

    Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.6) Gecko/20070809 Camino/1.5.1

All of these user-agent strings indicate Gecko-based browsers (albeit using different versions). Oftentimes, looking for a particular browser is not as important as understanding whether it's Gecko-based. The Mozilla version hasn't changed from 5.0 since the first Gecko-based browser was released, and it likely won't change again.

## WebKit

In 2003, Apple announced that it would release its own web browser, called Safari. The Safari rendering engine, called WebKit, began as a fork of the KHTML rendering engine used in the Linux-based Konqueror web browser. A couple of years later, WebKit was split off into its own open-source project, focusing on development of the rendering engine.

Developers of this new browser and rendering engine faced a problem similar to that faced by Internet Explorer 3.0: how do you ensure that the browser isn't locked out of popular sites? The answer is, put enough information into the user-agent string to convince web sites that the browser is compatible with another popular browser. This led to a user-agent string with the following format:

    Mozilla/5.0 (Platform; Encryption; OS-or-CPU; Language) AppleWebKit/AppleWebKitVersion (KHTML, like Gecko) Safari/SafariVersion

Here's an example:

    Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125.1

As you can see, this is another long user-agent string. It takes into account not only the version of the Apple WebKit but also the Safari version. All WebKit-based browsers identify themselves as Mozilla 5.0, the same as all Gecko-based browsers. The Safari version has typically been the build number of the browser, not necessarily a representation of the release version number. So although Safari 1.25 has the number 125.1 in the user-agent string, there may not always be a one-to-one match. For this reason, Safari's user-agent string was augmented slightly when version 3 was released. The version token is now used to identify the actual version of Safari being used:

    Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5

The most interesting and controversial part of this user-agent string is the addition of the string &#8220;(KHTML, like Gecko)&#8221; in a pre-1.0 version of Safari. Apple got a lot of pushback from developers who saw this as a blatant attempt to trick clients and servers into thinking Safari was actually Gecko (as if adding Mozilla/5.0 wasn't enough). Apple's response was similar to Microsoft's when the IE user-agent string came under fire: Safari is compatible with Mozilla, and web sites shouldn't block out Safari users because they appear to be using an unsupported browser.

Note that this change was made only to Safari, not to WebKit, so other WebKit-based browsers may not have this change. Generally speaking, as with Gecko, it's typical to determine that a browser is WebKit-based rather than trying to identify Safari specifically.

## Konqueror

Konqueror, the browser bundled with the KDE Linux desktop environment, is based on the KHTML open-source rendering engine. Though available only on Linux, Konqueror has an active user base. For optimal compatibility, Konqueror opted to format its user-agent string after IE as follows:

    Mozilla/5.0 (compatible; Konqueror/Version; OS-or-CPU)

However, Konqueror 3.2 introduced a change to coincide with changes to the WebKit user-agent string, identifying itself as KHTML as follows:

    Mozilla/5.0 (compatible; Konqueror/Version; OS-or-CPU) KHTML/KHTMLVersion (like Gecko)

Here's an example:

    Mozilla/5.0 (compatible; Konqueror/3.5; SunOS) KHTML/3.5.0 (like Gecko)

The version numbers for Konqueror and KHTML tend to coincide or be within a subpoint difference, such as Konquerer 3.5 using KHTML 3.5.1.

## Chrome

Google's Chrome web browser uses WebKit as its rendering engine but uses a different JavaScript engine. For Chrome's initial beta release, version 0.2, the user-agent string carries along all of the information from WebKit as well as an extra section for the Chrome version. The format is as follows:

    Mozilla/5.0 (Platform; Encryption; OS-or-CPU; Language) AppleWebKit/AppleWebKitVersion (KHTML, like Gecko) Chrome/ChromeVersion Safari/SafariVersion

The full user-agent string for Chrome 0.2 is as follows:

    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.29 Safari/525.13

It's likely that the WebKit version and Safari version will always be synchronized going forward, though this is not guaranteed.

## Opera

One of the most controversial web browsers, as far as user-agent strings are concerned, is Opera. The default user-agent string for Opera is the most logical of all modern browsers, correctly identifying itself and its version. Prior to version 8.0, the Opera user-agent string was in the following format:

    Opera/Version (OS-or-CPU; Encryption) [Language]

Using Opera 7.54 on a Windows XP computer, the user-agent string is as follows:

    Opera/7.54 (Windows NT 5.1; U) [en]

With the release of Opera 8, the language part of the user-agent string was moved inside of the parentheses to better match other browsers, as follows:

    Opera/Version (OS-or-CPU; Encryption; Language)

Opera 8 on Windows XP yields the following user-agent string:

    Opera/8.0 (Windows NT 5.1; U; en)

By default, Opera returns a user-agent string in this simple format. Currently it is the only one of the four major browsers to use the product name and version to fully and completely identify itself. As with other browsers, however, Opera found problems with using its own user-agent string. Even though it's technically correct, there is a lot of browser-sniffing code on the Internet that is geared toward user-agent strings reporting the Mozilla product name. There is also a fair amount of code looking specifically for IE or Gecko. Instead of confusing sniffers by changing its own user-agent string, Opera identifies itself as a different browser completely by changing its own user-agent string.

As of Opera 9, there are two ways to change the user-agent string. One way is to identify it as another browser, either Firefox or IE. When using this option, the user-agent string changes to look just like the corresponding one for Firefox or IE, with the addition of the string &#8220;Opera&#8221; and Opera's version number at the end. Here's an example:

    Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50

    Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.50

The first string identifies Opera 9.5 as Firefox 2 while maintaining the Opera version information. The second string identifies Opera 9.5 as Internet Explorer 6 and includes the Opera version information. Although these user-agent strings pass most tests for Firefox and IE, the possibility of identifying Opera is open.  
Another option for identifying the browser is to mask it as either Firefox or IE. When masking the browser's identity, the user-agent strings are exactly the same as would be returned from the other browsers &#8211; the string &#8220;Opera&#8221; does not appear, nor does any Opera version information. There is literally no way to distinguish Opera from the other browsers via user-agent string when identity masking is used. Further complicating the issue is Opera's tendency to set site-specific user-agent strings without notifying the user.

## Conclusion

The history of the user-agent string is marked by browsers trying to convince user-agent sniffers that they are what they are not. Internet Explorer wants to be identified as Netscape 4; Konqueror and WebKit want to be identified as Firefox; Chrome wants to be identified as Safari. This can make user-agent sniffing a bit more difficult although every browser (with the exception of Opera) gives you a definitive way to identify it out of a crowd. The thing to remember about sniffing is that if a browser goes through great lengths to trick you, it's because they believe their browser is compatible with the browser that they are reporting. In those cases, it may not even be necessary to determine which is which.

Chrome, for example, claims that any site that works with Safari 3 will also work with Chrome, so there is no reason to try to detect Chrome. It's worth nothing that this claim has already shot themselves in the foot, and so Chrome now spoofs [Safari for Hotmail][5]. Chrome isn't the only one that does this sort of thing, there's a lot that goes on behind the scenes of browsers for compatibility reasons. And so the battle rages on.

 [1]: https://humanwhocodes.com/blog/2009/12/29/feature-detection-is-not-browser-detection/
 [2]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
 [3]: http://blogs.msdn.com/ie/archive/2009/01/09/the-internet-explorer-8-user-agent-string-updated-edition.aspx
 [4]: https://developer.mozilla.org/User_Agent_Strings_Reference
 [5]: http://news.cnet.com/8301-17939_109-10153165-2.html
