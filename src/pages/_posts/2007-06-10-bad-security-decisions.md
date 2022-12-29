---
title: Bad security decisions
author: Nicholas C. Zakas
permalink: /blog/2007/06/10/bad-security-decisions/
categories:
  - Web Development
tags:
  - Programming
  - Security
---
In this day when security on the Internet is at the forefront of concerns, I&#8217;m constantly shocked to see what some web developers are putting out into the open. For obvious reasons, I&#8217;m not going to point out who is doing this, but I would like to point out a bad practice that should be common sense to avoid but for some reason is not.

I had logged into the system and was submitting a payment via electronic check. The screen I got to had remembered information about my account from a previous transaction and asked if I wanted to use the same account. I said yes. I was then taken to a page that asked me to confirm my account number before proceeding. This isn&#8217;t a bad practice, but the way it was implemented was horrible. There was a password input field, filled in with my account number, followed by another input field asking me to re-enter the number. So there&#8217;s a field with all stars above a field that shows the numbers as I type&#8230;interesting design.

As I looked at this I got a bad feeling in the pit of my stomach and I thought to myself, &#8220;they wouldn&#8217;t really have been dumb enough to fill in the password field with my full account number, would they?&#8221; I quickly viewed source to see&#8230;my account number had been output into the password field as static HTML. This weird UI was all in the name of security but ultimately, if someone had gotten in there by signing in as me, they would have had my bank account number in no time flat. Needless to say, that&#8217;s the last time I do business online with that particular site.
