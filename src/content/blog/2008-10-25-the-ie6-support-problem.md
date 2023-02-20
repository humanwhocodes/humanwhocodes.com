---
title: The IE6 support problem
author: Nicholas C. Zakas
permalink: /blog/2008/10/25/the-ie6-support-problem/
categories:
  - Professional
tags:
  - IE
  - IE6
  - Internet
  - Internet Explorer
  - Web
---
I've been catching up on my RSS reading and came across [this post][1] from former Yahoo Steve Souders expressing his frustration with IE6. I'll admit, IE6 is a huge time sink, and the source of a lot of frustration for web developers around the world. Steve goes on to talk about a campaign called &#8220;Save the developers,&#8221; as a program to promote people to upgrade to IE7 or another browser. The slew of comments on the post all put forth various suggestions and approaches for killing IE6. While I can relate with the frustration of developing for IE6, I think both Steve's and the commenters' suggestions are quite short-sighted and can actually cause more harm than good.

First, there seems to be this assumption that IE6 users are stubborn people who just don't want to upgrade. In reality, there's a large amount of people using IE6 that don't even know the browser version (and possibly not even the name). The general population of Internet users are not tech savvy. Case in point, when I tried to switch my parents to using Firefox and removed the Internet Explorer icon from their desktop, they complained that they could no longer access the Internet. I literally had to add the icon back but have it point to Firefox so they could get on the Web again. If I told my parents to upgrade their browser, I can imagine the blank stares I'd receive.

Another issue people seem to forget is that not everyone who uses IE6 is capable of upgrading. There are two main situations under which an upgrade is impossible: corporate-controlled workstations and earlier operating systems. Many non-tech corporations lock down their employee workstations with what they've deemed a &#8220;secure&#8221; environment, often disallowing installation or upgrade of programs. The web browser will be upgraded only with the company's IT department has done the due diligence and is certain that it is safe. Further, anyone using a Windows operating system prior to Windows XP Service Pack 2 can't install IE7. There are still users on Windows 98, Windows 2000, and Windows ME; those people cannot upgrade to IE7. Looking through my access logs, I actually get hits from operating systems all the way back to Windows NT 4.0! The bad news is that those people won't upgrade until they have a reason to get a new computer and not a moment sooner.

I also take great issue with people who claim that we should just stop supporting IE6 because, &#8220;that will teach the users to upgrade.&#8221; Oh really? These people advocate putting up a site that says nothing more than &#8220;upgrade your browser&#8221; to convince people to download IE7 or some other browser. And do you know what will happen when those users see that message? They're not going to download a new browser because, as I said, they're not tech savvy. Instead, they're going to your competitor, whose site does work with IE6. What about putting a big nasty box at the top of your page begging users to upgrade? Once again, non-techie users will never upgrade on their own, no matter how much you message them. So annoy them or accept them. Your choice.

I think the overall thing we as developers need to remember is that it's not the job of our users to make our lives easier. Harassing our users to do something that they don't understand isn't the way to win your users' loyalty. Choosing not to support IE6 can mean cutting out a large amount of your audience (this site still gets more IE6 and IE5.5 users than IE7) and why would you want to do that? We're going to be stuck with IE6 for at least the next 2-3 years (by my best estimation), so come up with a plan for supporting your users through that time period. Use a [progressive enhancement][2] strategy to provide the best experience for modern browsers but still provide a decent experience for older ones. Most of all, don't alienate your users. It's not their fault they use IE6, it was there when they got the computer.

 [1]: http://www.stevesouders.com/blog/2008/10/11/say-no-to-ie6/ "Say No to IE6"
 [2]: http://en.wikipedia.org/wiki/Progressive_enhancement
