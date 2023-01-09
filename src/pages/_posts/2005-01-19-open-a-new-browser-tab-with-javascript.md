---
title: Open a New Browser Tab With JavaScript
author: Nicholas C. Zakas
permalink: /blog/2005/01/19/open-a-new-browser-tab-with-javascript/
categories:
  - Uncategorized
  - Web Development
tags:
  - JavaScript
  - Mozilla
  - Tabs
---
I just came across <a title="Opening new tabs with JavaScript" rel="external" href="https://jroller.com/page/larrywilliams/20050116#opening_new_tabs_with_javascript">this entry</a> over at <a title="Larry Williams' Blog" rel="external" href="https://jroller.com/page/larrywilliams/">Larry Williams' Blog</a> explaining how to open a link in a new tab. Pretty interesting, and kudos to Larry for figuring this out. It just seems to me that there should be a way to do with without JavaScript. Wouldn't that be more usable?

I mean, there are special names to use in the `target` to do things such as open a new window (`_blank`), open in a parent window (`_parent`), etc. <acronym title="Internet Explorer">IE</acronym> and Mozilla also provide the `_search` value to open links in the search sidebar. Wouldn't it make sense for Mozilla to support a value like `_tab` to open a link in a new tab? That way, it would fail gracefully in non-supporting browsers by opening a new window instead.
