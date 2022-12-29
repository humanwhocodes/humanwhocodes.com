---
title: And so the HTML 5 trouble begins
author: Nicholas C. Zakas
permalink: /blog/2008/05/18/and-so-the-html-5-trouble-begins/
categories:
  - Web Development
tags:
  - DOM
  - Firefox
  - HTML
  - HTML 5
  - Storage
  - WebKit
---
A little while ago, I wrote about <a title="The Web could be heading for another dark age" rel="internal" href="{{site.url}}/blog/2008/3/31/the_web_could_be_heading_for_another_dark_age">the dangerous point</a> we&#8217;re at with <a title="HTML 5" rel="external" href="http://www.w3.org/html/wg/html5/">HTML 5</a>. At the time, I mentioned how browser vendors tend to jump on cool new things too quickly and that sometimes those things end up being removed and we&#8217;re left with incompatible implementations. Sadly, DOM Storage has become the first such example of the HTML 5 era.

In the first versions of HTML 5, inherited from Web Applications 1.0, DOM Storage consisted of two objects: `sessionStorage` and `globalStorage`. The former is used for session data only while the latter is used for storing data that persists across sessions. Firefox 2 implemented both objects, followed by Internet Explorer 8. The problem is that `globalStorage` has been removed from HTML 5 in favor of a `localStorage` object. WebKit, which just recently added DOM Storage in nightly builds, implemented `sessionStorage` and `localStorage`, which now means we have incompatible global storage data stores.

This is always the danger when implementing features described in a working draft. Browser vendors only rarely, if ever, remove features so it&#8217;s likely that `globalStorage` will stick around and ultimately will need to be added back into HTML 5. That leaves `localStorage`, arguably the better solution, as a third object that may or may not be implemented by other browsers.

Part of the problem is that HTML 5 is still under heavy development and refinement. The other part is that browser vendors are hotly competing with one another on features for developers, and everyone wants to be the first to implement a talked-about feature. At some point, this has to stop so that the ultimate vision of cross-browser compatibility can be achieved.
