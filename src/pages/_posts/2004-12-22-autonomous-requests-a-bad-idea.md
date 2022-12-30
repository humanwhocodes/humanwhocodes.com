---
title: Autonomous Requests a Bad Idea
author: Nicholas C. Zakas
permalink: /blog/2004/12/22/autonomous-requests-a-bad-idea/
categories:
  - Web Development
tags:
  - Autonomous Requests
  - Firefox
  - Internet
---
Every once in a while I browse through my access logs to see what sort of traffic I've been getting. More and more, the number of <a title="Mozilla Firefox" rel="external" href="http://www.mozilla.org/projects/firefox">Firefox</a> and generic <a title="Mozilla" rel="external" href="http://www.mozilla.org/">Mozilla</a> users has been increasing. And that's when I noticed something else increasing as well&#8230;the number of requests for files that don't exist.

Examining all of the 404s I send out, I keep coming across one that's surprising: `{{site.url}}/favicon.ico`. Unlike many sites, I don't have an icon for my site (more out of laziness than anything else), but the request keeps getting sent anyways. After a little investigation, I figured out that Firefox/Mozilla is the culprit.

On every page, a Mozilla browser requests this icon from the server, regardless of whether there is a `<meta/>` tag indicating that such a file exists. This seems like a bad idea. Every request takes up time, therefore every request slows down the loading of the current page. Multiply that out by the number of pages requested by your browser every day, and you've got a lot of wasted requests.

In would be better, <acronym title="In My Humble Opinion">IMHO</acronym>, to look for the `<meta/>` tag instead. That *is* what it's there for, after all. Or at the very least, there should be some sort of flag to include in a page to prevent Mozilla from requesting the icon file if the designer so desires.

At my work, we're constantly trying to decrease the number of requests sent out by our pages, but this is one that we have no control over. Am I just talking crazy here? Does anyone else think this is a dumb idea?
