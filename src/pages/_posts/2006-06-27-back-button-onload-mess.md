---
title: Back Button/Onload Mess
author: Nicholas C. Zakas
permalink: /blog/2006/06/27/back-button-onload-mess/
categories:
  - Web Development
tags:
  - Events
  - JavaScript
  - onload
---
Working on some code earlier this week, I discovered that Opera doesn't fire the `load` event when navigating to a page using the back button. This means anything set to fire `onload` doesn't get executed&#8230;so much for good coding practices. But this issue appears to intermittently happen on other browsers too, notably Firefox and Safari (Internet Explorer fires `load` no matter what).

Really, there should be some standard way of determining when the <acronym title="Document Object Model">DOM</acronym> document has been completely created and is ready to be used versus the `load` event, which only tells us after everything on the page has been loaded. (This is where the <acronym title="Yahoo! User Interface Library">YUI</acronym>&#8216;s <a title="onAvailable()" rel="external" href="http://developer.yahoo.com/yui/docs/event/YAHOO.util.Event.html#onAvailable">onAvailable()</a> method comes in really handy.) There actually are a mishmash of ways to do this otherwise, but no way that is common across all browsers:

  * Using the `<script>` element's `defer` attribute. By adding this attribute, you instruct the code not to be run until the document has been completely loaded. This works in most browsers, but can be a pain because you need to figure out which code needs to be run after the document is complete and separate that out into a distinct JavaScript file (`defer`) only works for external files, not inline scripts).
  * Use the document's `DOMContentLoaded` event. This is supported by Firefox and Opera (starting in version 9). This event fires when the document is completely loaded. I can't find anything saying that this is a standard right now, but it works.
  * Internet Explorer's `document` object supports a `readystatechange` event that fires whenever the document's `readyState` property changes. This is different from using an <acronym title="eXtensible Markup Language">XML</acronym> <acronym title="Document Object Model">DOM</acronym> object in that it returns strings&#8230;you want to look for &#8220;complete&#8221; as a value to determine when the <acronym title="Document Object Model">DOM</acronym> is ready for manipulation.
  * Apparently, Safari supports the `readyState` property on a document but has no event for watching it, therefore you could <a title="The window.onload Problem - Solved!" rel="external" href="http://dean.edwards.name/weblog/2006/06/again/">set a timeout</a> to watch for it to change.
  * Dean Edwards also suggests <a title="window.onload - An Alternative Solution" rel="external" href="http://dean.edwards.name/weblog/2005/09/busted2/">another approach</a> using Internet Explorer's behaviors.

All of this adds up to major pain in the butt. Then again, I just keep telling myself, all of these differences is why people like me have jobs. If it all worked the same everywhere, we'd have far less value than we do.
