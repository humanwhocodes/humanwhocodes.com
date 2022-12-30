---
title: Popups Are Evil
author: Nicholas C. Zakas
permalink: /blog/2005/05/24/popups-are-evil/
categories:
  - Web Development
tags:
  - Internet Explorer
  - Popups
---
Listen to me closely: **avoid popups whenever possible**. When the push came for Web sites to start looking and acting more like desktop applications, developers naturally started the popup parade. You've seen it, you know it well. Then advertisers got their hands on it, and the popup wars really began. Thankfully, this led to the introduction of popup blockers.

Now, with all major browsers having popup blockers, it's time to start rolling back all those popups into the main window. Because of popup blocks, we're finally forced to stop and think, &#8220;do I need a popup for that?&#8221; Most of the time, the answer is no.

The Internet Explorer popup blocker include in Windows XP Service Pack 2 is really an excellent one. It enforces what we, as developers, should have been doing all along. First, you can only fire a popup for user events like a click (`onmousedown` or `onclick`) or key press. Duh. Whoever thought popping up a window when it was first loaded or unloaded was a good idea was&#8230;well&#8230;probably an advertiser. Second, only one popup can be initiated during that user event, so you can't wait for a click and then barrage the user with popup windows. Nope, one popup window is all (and I'm sure this has befuddled many developers who relied on opening up one popup window, then closing it down and opening a new one to respond to a user action).

I can't believe I'm going to say this, but we really need to be thanking Microsoft and other browser makers for protecting us (the developers) from ourselves (the developers). Just because something is cool and can be done, doesn't always mean it should be done.
