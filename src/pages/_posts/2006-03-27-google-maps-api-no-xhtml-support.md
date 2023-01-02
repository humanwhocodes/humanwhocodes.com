---
title: "Google Maps API &#8211; No XHTML Support"
author: Nicholas C. Zakas
permalink: /blog/2006/03/27/google-maps-api-no-xhtml-support/
categories:
  - Web Development
tags:
  - API
  - Google
  - JavaScript
  - XHTML
---
I've been playing around with the <a title="Google Maps API" rel="external" href="http://www.google.com/apis/maps/">Google Maps API</a> recently as I attempt to write an article on its usage. Right off the bat, I found a problem.

All of the pages on my site are served up as proper <acronym title="eXtensible Hyper Text Markup Language">XHTML</acronym>, including the <acronym title="eXtensible Markup Language">XML</acronym> prolog and serving the pages up as application/xhtml+xml in Firefox. Apparently, this causes the Google Maps API fits because it wants to use `document.write()`, which doesn't exist in the <acronym title="eXtensible Hyper Text Markup Language">XHTML</acronym> <acronym title="Document Object Model">DOM</acronym>.

A quick search through the <a title="Google Maps API Group" rel="external" href="http://groups.google.com/group/Google-Maps?lnk=rgu">Google Maps API Group</a> reveals no answer other than, &#8220;remove the <acronym title="eXtensible Markup Language">XML</acronym> declaration and don't serve up your page as application/xhtml+xml.&#8221; What? You've got to be kidding me. This seems to be a major oversight of the Google Maps API team, to use a feature that is deprecated. All of the examples provided use the strict <acronym title="eXtensible Hyper Text Markup Language">XHTML</acronym> but we're not actually supposed to have valid strict <acronym title="eXtensible Hyper Text Markup Language">XHTML</acronym>? I hope someone is looking into fixing this.
