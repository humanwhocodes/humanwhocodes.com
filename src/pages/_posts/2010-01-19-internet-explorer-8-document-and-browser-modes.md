---
title: Internet Explorer 8 document and browser modes
author: Nicholas C. Zakas
permalink: /blog/2010/01/19/internet-explorer-8-document-and-browser-modes/
categories:
  - Web Development
tags:
  - Browser Mode
  - CSS
  - Document Mode
  - Internet Explorer
  - JavaScript
  - Quirks Mode
  - Standards Mode
---
When Microsoft began planning for Internet Explorer 8, they were struck with an interesting problem. They were willing to admit that Internet Explorer had implementation bugs both in rendering and scripting. After admitting that, though, they had the problem that is commonly referred to as &#8220;don&#8217;t break the Internet.&#8221; Microsoft had no way of knowing how many sites were reliant upon the implementation bugs to function correctly. Their ultimate solution to the problem was interesting: Internet Explorer 8 could run in a variety of different modes. The sheer number of possible modes is a bit daunting but basically comes down to two types: document mode and browser mode.

## Document mode

A page&#8217;s document mode determines to which features it has access. This means that there&#8217;s a specific level of CSS support, a specific number of features available for scripting through JavaScript, and a specific way that doctypes are treated. There are three different document modes:

  * **Internet Explorer 5** &#8211; renders the page in IE7 quirks mode (also known as IE5 mode). New features in IE8 are not available.
  * **Internet Explorer 7** &#8211; renders the page in IE7 standards mode. New features in IE8 are not available.
  * **Internet Explorer 8** &#8211; renders the page in IE8 standards mode. New features in IE8 are available, so you can access the Selectors API, more CSS 2 selectors, some CSS 3 features, HTML 5 features, etc. Essentially, you get everything that IE8 has to offer.

The concept of document mode is very important for understanding how Internet Explorer 8 works.

### Forcing a document mode

You can force a particular document mode by using the `X-UA-Compatible` HTTP header or by using the `<meta>` tag equivalent:

    <meta http-equiv="X-UA-Compatible" content="IE=<em>IEVersion</em>">

There are several different possible values for the IE version in this field and they don&#8217;t necessary map to the three document modes:

  * **Edge** &#8211; always put the document into the most recent document mode available. Doctype is ignored. For Internet Explorer 8, this forces the document mode to IE8 standards all the time. Be careful when using this because when Internet Explorer 9 comes out, this will force the page into IE9 standards **mode.**
  * **EmulateIE8** &#8211; if a doctype is present, set the document mode to IE8 standards and otherwise set the document mode to IE5.
  * **EmulateIE7** &#8211; if a doctype is present, set the document mode to IE7 standards and otherwise set the document mode to IE5.
  * **8** &#8211; force document mode to be IE8 standards. Doctype is ignored.
  * **7** &#8211; force document mode to be IE7 standards. Doctype is ignored.
  * **5** &#8211; force document mode to be IE5. Doctype is ignored.

For example, to make the document mode behave as it would in Internet Explorer 7, you can use the following:

    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">

Whereas to force IE7 standards mode regardless of doctype, use this:

    <meta http-equiv="X-UA-Compatible" content="IE=7">

You are not required to have an `X-UA-Compatible` field set on pages. If not present, the default is `EmulateIE8`.

### Detecting document mode

You can determine the document mode for a given page using the `document.documentMode` property a new feature in Internet Explorer 8, which returns either 5, 7, or 8:

    var mode = document.documentMode;

Using this property can give you a hint as to how the page is going to behave. This property is available in all document modes.

## Browser mode

There are three browser modes: Internet Explorer 8, Internet Explorer 8 compatibility, and Internet Explorer 7. These modes affect the page in a number of ways, most notably by altering document mode and the user-agent string. By default, the browser mode is set to Internet Explorer 8.

### Internet Explorer 8 mode

By default, the browser runs in Internet Explorer 8 mode. The document mode is determined as if `X-UA-Compatible` is set to EmulateIE8. The user-agent string for the browser includes both the Internet Explorer version and the Trident (rendering engine) version. For instance, I see this on my machine:

    Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)

Most pages end up running in Internet Explorer 8 browser mode.

### Internet Explorer 8 compatibility mode

When an end user clicks the [compatibility view button][1] next to refresh button, the browser mode changes to Internet Explorer 8 compatibility. IE8 compatibility mode is meant to emulate Internet Explorer 7 and so theÂ  document mode is determined as if `X-UA-Compatible` is set to EmulateIE7. The user-agent string for the browser changes the Internet Explorer version 7 but leaves Trident (rendering engine) version. For instance, I see this on my machine:

    Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)

The user-agent string change is to ensure that any code reliant on user-agent sniffing continues to function as if running in Internet Explorer 7. Leaving the Trident version allows developers the opportunity to determine that this is, in fact, Internet Explorer 8 running in compatibility mode.

### Internet Explorer 7 mode

Internet Explorer 7 mode is the most curious of all browser modes as it appears to be an option in [IE Developer Tools][2] only. The documentation states that this is used to test your site in an actual Internet Explorer 7 instance rather than Internet Explorer 8 running in compatibility mode. Internet Explorer 7 determines the document mode as if `X-UA-Compatible` is set to EmulateIE7. Additionally, this mode completely disregards `X-UA-Compatible` and so there is no way to manually change the document mode (Internet Explorer 7 didn&#8217;t honor `X-UA-Compatible` either). This means that unlike the other browser modes, Internet Explorer 7 mode can never have a document mode of IE8 standards. Further, the user-agent string is changes so that the Trident version is no longer available. Here it is on my box:

    Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)

There doesn&#8217;t appear to be any other way that and end user can trigger Internet Explorer 7 mode. As such, it appears that this is just a convenience tool for developers that frees us from needing toÂ  and so it appears to be a tool used primary for developers

## Summary

Internet Explorer 8 has some powerful, and confusing, features as it relates to its rendering and execution engine. Document modes are used to determine which features are available to the page, and that includes which CSS features and which JavaScript features are enabled and available. You can tell the browser how you would like the document mode to be determined by specifying a value of `X-UA-Compatible`.

Browser modes change how the document mode is determined when `X-UA-Compatible` is not specified. They also change the user-agent string so that user-agent sniffers won&#8217;t be broken. In the wild, you will only see Internet Explorer 8 mode and Internet Explorer 8 compatibility mode; Internet Explorer 7 mode appears to be just for developer usage.

 [1]: http://www.microsoft.com/uk/windows/internet-explorer/features/enhanced-navigation.aspx
 [2]: http://msdn.microsoft.com/en-us/library/dd565626%28VS.85%29.aspx#browserModeMenu
