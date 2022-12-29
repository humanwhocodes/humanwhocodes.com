---
title: Fighting Code Injection
author: Nicholas C. Zakas
permalink: /blog/2005/02/25/fighting-code-injection/
categories:
  - Web Development
tags:
  - Code Injection
---
Seems like I&#8217;ve been <a title="Secret Service hacker, how did he do it?" rel="external" href="http://www.infosecinstitute.com/blog/2005/02/secret-service-hacker-how-did-he-do-it.html">reading a lot</a> about code injection vulnerabilities on Web sites. Of course, we all know about the Paris Hilton fiasco where a hacker was able to access her photos via the <a title="T-Mobile" rel="external" href="http://www.tmobile.com">T-Mobile</a> Web site. So for the sake of conversation, here&#8217;s what I do to prevent code injection:

  * **Double Validation** &#8211; validate data input on the client side using JavaScript as well as on the server side. The server side validation is necessary in case the user turns off JavaScript.
  * **Referrer Checking** &#8211; any page or process that accepts input from an HTML form should check its referrer to be sure it is receiving data from a trusted source. In some cases, it&#8217;s simple enough just to ensure it&#8217;s from the same domain; in others, you may want to be sure it comes from a particular page.
  * **Verify GET or POST** &#8211; some languages, such as <acronym title="Java Server Pages">JSP</acronym>, use a single method to get data regardless of the method used to submit it (`request.getParameter()`). If you know the data should be submitted using a POST, make sure that&#8217;s where it came from when processing it.
  * **Remove <acronym title="Hyper Text Markup Language">HTML</acronym> Tags by Default** &#8211; there&#8217;s no reason to *not* strip <acronym title="Hyper Text Markup Language">HTML</acronym> tags from input by default. Most of the time, there&#8217;s no need for it. It is only special cases (such as e-mails or message board postings) where <acronym title="Hyper Text Markup Language">HTML</acronym> may need to be allowed.
  * **Never Echo** &#8211; this is the golden rule to avoid code injection. Never take an input value and output it directly to a Web page. You should always &#8220;scrub&#8221; the data (validate, strip <acronym title="Hyper Text Markup Language">HTML</acronym>, etc.) *before* using it in output.

In general, I&#8217;ve found that these approaches take care of a lot of code injection vulnerabilities. If anyone has any other ideas, please feel free to add them.
