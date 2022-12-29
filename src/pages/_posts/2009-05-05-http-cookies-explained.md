---
title: HTTP cookies explained
author: Nicholas C. Zakas
permalink: /blog/2009/05/05/http-cookies-explained/
categories:
  - Web Development
tags:
  - Cookies
  - HTTP
  - Web Development
---
HTTP cookies, most often just called &#8220;cookies,&#8221; have been around for a while but are still not very well understood. The first problem is a lot of misconceptions, ranging from cookies as spyware or viruses to just plain ignorance over how they work. The second problem is a lack of consistent interfaces to work with cookies. Despite all of the issues surrounding them, cookies are such an important part of web development that, should they disappear without a replacement, many of our favorite web applications would be rendered useless.

## Origin of cookies

One of the biggest issues in the early days of the web was how to manage state. In short, the server had no way of knowing if two requests came from the same browser. The easiest approach, at the time, was to insert some token into the page when it was requested and get that token passed back with the next request. This required either using a form with a hidden field containing the token or to pass the token as part of the URL&#8217;s query string. Both solutions were intensely manual operations and prone to errors.

[Lou Montulli][1], an employee of Netscape Communications at the time, is credited with applying the concept of &#8220;[magic cookies][2]&#8221; to web communication in 1994. The problem he was attempting to solve was that of the web&#8217;s first shopping cart, now a mainstay on all shopping sites. His [original specification][3] provides basic information about how cookies work, which was formalized in [RFC 2109][4] (the reference for most browser implementations) and eventually evolved into [RFC 2965][5]. Montulli would also be granted a United States [patent][6] for cookies. Netscape Navigator supported cookies since its first version, and cookies are now supported by all web browsers.

## What is a cookie?

Quite simply, a cookie is a small text file that is stored by a browser on the user&#8217;s machine. Cookies are plain text; they contain no executable code. A web page or server instructs a browser to store this information and then send it back with each subsequent request based on a set of rules. Web servers can then use this information to identify individual users. Most sites requiring a login will typically set a cookie once your credentials have been verified, and you are then free to navigate to all parts of the site so long as that cookie is present and validated. Once again, the cookie just contains data and isn&#8217;t harmful in and of itself.

## Cooke creation

A web server specifies a cookie to be stored by sending an HTTP header called `Set-Cookie`. The format of the `Set-Cookie` header is a string as follows (parts in square brackets are optional):

    Set-Cookie: <em>value</em>[; expires=<em>date</em>][; domain=<em>domain</em>][; path=<em>path</em>][; secure]

The first part of the header, the value, is typically a string in the format `name=value`. Indeed, the original specification indicates that this is the format to use but browsers do no such validation on cookie values. You can, in fact, specify a string without an equals sign and it will be stored just the same. Still, the most common usage is to specify a cookie value as `name=value` (and most interfaces support this exclusively).

When a cookie is present, and the optional rules allow, the cookie value is sent to the server with each subsequent request. The cookie value is stored in an HTTP header called `Cookie` and contains just the cookie value without any of the other options. Such as:

    Cookie: value

The options specified with `Set-Cookie` are for the browser&#8217;s use only and aren&#8217;t retrievable once they have been set. The cookie value is the exact same string that was specified with `Set-Cookie`; there is no further interpretation or encoding of the value. If there are multiple cookies for the given request, then they are separated by a semicolon and space, such as:

    Cookie: value1; value2; name1=value1

Server-side frameworks typically provide functionality to parse cookies and make their values available programmatically.

### Cookie encoding

There is some confusion over encoding of a cookie value. The commonly held belief is that cookie values must be URL-encoded, but this is a fallacy even though it is the de facto implementation. The original specification indicates that only three types of characters must be encoded: semicolon, comma, and white space. The specification indicates that URL encoding may be used but stops short of requiring it. The RFC makes no mention of encoding whatsoever. Still, almost all implementations perform some sort of URL encoding on cookie values. In the case of `name=value` formats, the name and value are typically encoded separately while the equals sign is left as is.

### The expires option

Each of the options after the cookie value are separated by a semicolon and space and each specifies rules about when the cookie should be sent back to the server. The first option is `expires`, which indicates when the cookie should no longer be sent to the server and therefore may be deleted by the browser. The value for this option is a date in the format `Wdy, DD-Mon-YYYY HH:MM:SS GMT` such as:

    Set-Cookie: name=Nicholas; expires=Sat, 02 May 2009 23:38:25 GMT

Without the `expires` option, a cookie has a lifespan of a single session. A session is defined as finished when the browser is shut down, so session cookies exist only while the browser remains open. This is why you&#8217;ll often see a checkbox when signing into a web application asking if you would like your login information to be saved: if you select yes, then an `expires` option is attached to the login cookie. If the `expires` option is set to a date that appears in the past, then the cookie is immediately deleted.

### The domain option

The next option is `domain`, which indicates the domain(s) for which the cookie should be sent. By default, `domain` is set to the host name of the page setting the cookie, so the cookie value is sent whenever a request is made to the same host name.Â  For example, the default domain for a cookie set on this site would be `www.nczonline.net`. The `domain` option is used to widen the number of domains for which the cookie value will be sent. Sample:

    Set-Cookie: name=Nicholas; domain=nczonline.net

Consider the case of a large network such as [Yahoo!][7] that has many sites in the form of *name*.yahoo.com (e.g., [my.yahoo.com][8], [finance.yahoo.com][9], etc.). A single cookie value can be set for all of these sites by setting the `domain` option to simply `yahoo.com`. The browser performs a tail comparison of this value and the host name to which a request is sent (meaning it starts the comparison from the end of the string) and sends the corresponding `Cookie` header when there&#8217;s a match.

The value set for the `domain` option must be part of the host name that is sending the `Set-Cookie` header. I couldn&#8217;t, for example, set a cookie on [google.com][10] because that would introduce a security issue. Invalid `domain` options are simply ignored.

### The path option

Another way to control when the `Cookie` header will be sent is to specify the `path` option. Similar to the domain option, `path` indicates a URL path that must exist in the requested resource before sending the `Cookie` header. This comparison is done by comparing the option value character-by-character against the start of the request URL. If the characters match, then the `Cookie` header is sent. Sample:

    Set-Cookie: name=Nicholas; path=/blog

In this example, the `path` option would match `/blog`, `/blogroll`, etc.; anything that begins with `/blog` is valid. Note that this comparison is only done once the `domain` option has been verified. The default value for the `path` option is the path of the URL that sent the `Set-Cookie` header.

### The secure option

The last option is `secure`. Unlike the other options, this is just a flag and has no additional value specified. A secure cookie will only be sent to the server when a request is made using SSL and the HTTPS protocol. The idea that the contents of the cookie are of high value and could be potentially damaging to transmit as clear text. Sample:

    Set-Cookie: name=Nicholas; secure

In reality, confidential or sensitive information should never be stored or transmitted in cookies as the entire mechanism is inherently insecure. By default, cookies set over an HTTPS connection are automatically set to be secure.

## Cookie maintenance and lifecycle

Any number of options can be specified for a single cookie, and those options may appear in any order. For example:

    Set-Cookie: name=Nicholas; domain=nczonline.net; path=/blog

This cookie has four identifying characteristics: the cookie `name`, the `domain`, the `path`, and the `secure` flag. In order to change the value of this cookie in the future, another `Set-Cookie` header must be sent using the same cookie name, domain, and path. For example:

    Set-Cookie: name=Greg; domain=nczonline.net; path=/blog

This overwrites the original cookie&#8217;s value with a new one. However, changing even one of these options creates a completely different cookie, such as:

    Set-Cookie: name=Nicholas; domain=nczonline.net; path=/

After returning this header, there are now two cookies with a name of &#8220;name&#8221;. If you were to access a page at `www.nczonline.net/blog`, the following header would be included in the request:

    Cookie: name=Greg; name=Nicholas

There are two cookies in this header named &#8220;name&#8221;, with the more specific `path` being returned first. The cookie string is always returned in order from most specific `domain-path-secure` tuple to least specific. Suppose I&#8217;m at `www.nczonline.net/blog` and set another cookie with default settings:

    Set-Cookie: name=Mike

The returned header now becomes:

    Cookie: name=Mike; name=Greg; name=Nicholas

Since the cookie with the value &#8220;Mike&#8221; uses the hostname (`www.nczonline.net`) for its domain and the full path (`/blog`) as its path, it is more specific than the two others.

### Using expiration dates

When a cookie is created with an expiration date, that expiration date relates to the cookie identified by name-`domain`-`path`-`secure`. In order to change the expiration date of a cookie, you must specify the exact same tuple. When changing a cookie&#8217;s value, you need not set the expiration date each time because it&#8217;s not part of the identifying information. Example:

    Set-Cookie: name=Mike; expires=Sat, 03 May 2025 17:44:22 GMT

The expiration date of the cookie has now been set, so the next time I want to change the value of the cookie, I can just use its name:

    Set-Cookie: name=Matt

The expiration date on this cookie hasn&#8217;t changed, since the identifying characteristics of the cookie are the same. In fact, the expiration date won&#8217;t change until you manually change it again. That means a session cookie can become a persistent cookie (one that lasts multiple sessions) within the same session but the opposite isn&#8217;t true. In order to change a persistent cookie to a session cookie, you must delete the persistent cookie by setting its expiration date to a time in the past and then create a session cookie with the same name.

Keep in mind that the expiration date is checked against the system time on the computer that is running the browser. There is no way to verify that the system time is in sync with the server time and so errors may occur when there is a discrepancy between the system time and the server time.

### Automatic cookie removal

There are a few reasons why a cookie might be automatically removed by the browser:

  * Session cookies are removed when the session is over (browser is closed).
  * Persistent cookies are removed when the expiration date and time have been reached.
  * If the browser&#8217;s cookie limit is reached, then cookies will be removed to make room for the most recently created cookie. For more details, see my post on [cookie restrictions][11].

Cookie management is important to avoid any of these automatic removal cases when they are unintended.

## Cookie restrictions

There are a number of restrictions placed on cookies in order to prevent abuse and protect both the browser and the server from detrimental effects. There are two types of restrictions: number of cookies and total cookie size. The original specification placed a limit of 20 cookies per domain, which was followed by early browsers and continued up through Internet Explorer 7. During one of Microsoft&#8217;s updates, they [increased the cookie limit][12] in IE 7 to 50 cookies. IE 8 has a maximum of 50 cookies per domain as well. Firefox also has a limit of 50 cookies while Opera has a limit of 30 cookies. Safari and Chrome have no limit on the number of cookies per domain.

The maximum size for all cookies sent to the server has remained the same since the original cookie specification: 4 KB. Anything over that limit is truncated and won&#8217;t be sent to the server.

## Subcookies

Due to the cookie number limit, developers have come up with the idea of subcookies to increase the amount of storage available to them. Subcookies are name-value pairs stored within a cookie value and typically have a format similar to the following:

    name=a=b&c=d&e=f&g=h

This approach allows a single cookie to hold multiple name-value combinations without going over the browser&#8217;s cookie limit. The downside to creating cookies in this format is that custom parsing is needed to extract the values rather than relying on the much simplier cookie format. Some server-side frameworks are beginning to support subcookie storage. The [YUI Cookie utility][13], which I wrote, supports subcookies reading/writing from JavaScript.

### Cookies in JavaScript

You can create, manipulate, and remove cookies in JavaScript by using the `document.cookie` property. This property acts as the `Set-Cookie` header when assigned to and as the `Cookie` header when read from. When creating a cookie, you must use a string that&#8217;s in the same format that `Set-Cookie` expects:

    document.cookie="name=Nicholas; domain=nczonline.net; path=/";

Setting the value of `document.cookie` *does not* delete all of the cookies stored on the page. It simply creates or modifies the cookie specified in the string. The next time a request is made to the server, these cookies are sent along with any others that were created via `Set-Cookie`. There is no perceivable difference between these cookies.

To retrieve cookie values in JavaScript, just read from the `document.cookie` property. The returned string is in the same format as the `Cookie` header value, so multiple cookies are separated by a semicolon and space. Example:

    name1=Greg; name2=Nicholas

Because of this, you need to parse the cookie string manually to extract actual cookie data. There are numerous resources describing cookie parsing approaches for JavaScript, including my book, [Professional JavaScript][14], so I won&#8217;t go into it here. It&#8217;s often easier to use an already-existing JavaScript library, such as the [YUI Cookie utility][13] to deal with cookies in JavaScript rather than recreating these algorithms by hand.

The cookies returned by accessing document.cookie follow the same access rules as cookies sent to the server. In order to access cookies via JavaScript, the page must be in the same domain and have the same path and have the same security level as specified by the cookie.

Note: It&#8217;s not possible to retrieve the options for cookies once they&#8217;ve been set via JavaScript, so you&#8217;ll have no idea what the `domain`, `path`, expiration date, or `secure` flag.

## HTTP-Only cookies

Microsoft introduced a new option for cookies in Internet explorer 6 SP1: HTTP-only cookies. The idea behind HTTP-only cookies is to instruct a browser that a cookie should never be accessible via JavaScript through the `document.cookie` property. This feature was designed as a security measure to help prevent cross-site scripting (XSS) attacks perpetrated by stealing cookies via JavaScript (I&#8217;ll discuss security issues with cookies in another post, this one is long enough as it is). Today, Firefox 2.0.0.5+, Opera 9.5+, and Chrome also support HTTP-only cookies. Safari as of 3.2 still does not.

To create an HTTP-only cookie, just add an `HttpOnly` flag to your cookie:

    Set-Cookie: name=Nicholas; HttpOnly

Once this flag is set, there is no access via `document.cookie` to this cookie. Internet Explorer also goes a step further and doesn&#8217;t allow access to this header using the `getAllResponseHeaders()` or `getResponseHeader()` methods on `XMLHttpRequest` while other browsers still permit it. Firefox [fixed this vulnerability][15] in 3.0.6 though there are still [various browser vulnerabilities][16] floating around ([complete browser support list][17]).

You cannot set HTTP-only cookies from JavaScript, which makes sense since you also can&#8217;t read them from JavaScript.

## Conclusion

There&#8217;s a lot to know and understand about cookies in order to use them effectively. It&#8217;s truly amazing how a technique created more than ten years ago is still in use in almost the exact same way as it was first implemented. This post is a guide to the basics that everyone should know about cookies in browsers but is not, in any way, a complete reference. Cookies are an important part of the web today and improperly managing them can lead to all kinds of issues from poor user experience to security holes. I hope that this writeup has shed some light on the magic of cookies.

 [1]: http://en.wikipedia.org/wiki/Lou_Montulli "Lou Montulli"
 [2]: http://en.wikipedia.org/wiki/Magic_cookie
 [3]: http://curl.haxx.se/rfc/cookie_spec.html
 [4]: http://tools.ietf.org/html/rfc2109
 [5]: http://tools.ietf.org/html/rfc2965
 [6]: http://v3.espacenet.com/publicationDetails/biblio?CC=US&NR=5774670&KC=&FT=E
 [7]: http://www.yahoo.com/
 [8]: http://my.yahoo.com/
 [9]: http://finance.yahoo.com/
 [10]: http://www.google.com
 [11]: {{site.url}}/blog/2008/05/17/browser-cookie-restrictions/
 [12]: http://blogs.msdn.com/ie/archive/2007/08/29/update-to-internet-explorer-s-cookie-jar.aspx
 [13]: http://developer.yahoo.com/yui/cookie/
 [14]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
 [15]: http://www.mozilla.org/security/announce/2009/mfsa2009-05.html
 [16]: http://manicode.blogspot.com/2009/01/browser-httponly-support-update.html
 [17]: https://www.owasp.org/index.php/HTTPOnly#Browsers_Supporting_HTTPOnly
