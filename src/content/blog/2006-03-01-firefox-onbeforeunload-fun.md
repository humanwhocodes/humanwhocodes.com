---
title: Firefox OnBeforeUnload Fun!
author: Nicholas C. Zakas
permalink: /blog/2006/03/01/firefox-onbeforeunload-fun/
categories:
  - Web Development
tags:
  - Firefox
  - JavaScript
  - onbeforeunload
---
So <a title="OurKith.com" rel="external" href="http://www.ourkith.com/">Kevin</a> correctly pointed out that you can do the same `onbeforeunload` behavior in Firefox as you can in Internet Explorer. It does require a little bit of a tweak to use the <acronym title="Document Object Model">DOM</acronym> event model, though:

<pre>window.onbeforeunload = function (oEvent) {
    oEvent.returnValue = "blah";
}</pre>

See, even JavaScript authors can learn something new every once in a while!
