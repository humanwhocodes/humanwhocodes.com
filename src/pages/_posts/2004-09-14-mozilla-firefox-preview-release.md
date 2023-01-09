---
title: Mozilla Firefox Preview Release
author: Nicholas C. Zakas
permalink: /blog/2004/09/14/mozilla-firefox-preview-release/
categories:
  - Web Development
tags:
  - Feeds
  - Firefox
  - Internet
  - RSS
  - Syndication
---
I just downloaded the preview release of <a rel="external" href="https://www.mozilla.org/products/firefox">Mozilla Firefox 1.0</a> because I was really interested in seeing the RSS support, and I was very disappointed. I was expecting a <a rel="external" href="https://www.feeddemon.com/">Feed Demon</a>-like experience but got something that was quite confusing.

Whenever you get to a site that supports an RSS feed (by using the appropriate `<link rel="alternate" type="application/rss+xml" href="" />` syntax), it presents a little RSS icon in the lower right corner of the browser. When you click on it, you are given a choice of RSS feeds to subscribe to. Once subscribed, the RSS feed lives in your bookmarks folder, but not as a single link. Instead, the RSS file becomes a folder in your bookmarks and creates items underneath it for each news item in the RSS file. By clicking on one of these items, Firefox navigates to the URL listed for that item. *It doesn't read or display the <description/> text in the RSS file.* I think this is a major misstep for Firefox since the whole appeal of RSS feeds is that you don't actually have to go to the Web site to get information.
