---
title: Firefox 1.5 Keypress Event Changes
author: Nicholas C. Zakas
permalink: /blog/2006/01/18/firefox-1-5-keypress-event-changes/
categories:
  - Web Development
tags:
  - Firefox
  - JavaScript
  - onkeypress
---
Someone submitted a post to the <a title="code in CH11 not work in FireFox" rel="external" href="http://p2p.wrox.com/topic.asp?TOPIC_ID=38810">P2P forum</a> saying that one of my book examples is no longer working in Firefox 1.5. After some investigating, I made an interesting discovery. It seems that in Firefox 1.5, the `keypress` event behaves differently than in previous version.

As I said in <a title="Professional JavaScript for Web Developers" rel="external" href="http://www.amazon.com/exec/obidos/tg/detail/-/0764579088/">Professional JavaScript</a>, the `keypress` event fires only for character keys (those keys that produce output). Prior to Firefox (and in other browsers) these did not include keys like Backspace and Delete. Firefox 1.5 now fires the event for Backspace, Delete, Ins, and Pause/Break. I haven&#8217;t been able to find a bug relating to this change, but it sure is annoying.
