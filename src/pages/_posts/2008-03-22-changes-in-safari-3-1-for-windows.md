---
title: Changes in Safari 3.1 for Windows
author: Nicholas C. Zakas
permalink: /blog/2008/03/22/changes-in-safari-3-1-for-windows/
categories:
  - Web Development
tags:
  - Safari
  - WebKit
---
I finally bit the bullet and updated by Safari on Windows to 3.1. Along with the upgrade came a bunch of surprises as things moved around and changed. The following is what I&#8217;ve found so far:

  * The `Preferences.plist` file we previously used to enable the Debug menu doesn&#8217;t exist anymore. All of the preferences are in `com.apple.Safari.plist` which is located in `C:Documents and Settings<username>Application DataApple ComputerSafariPreferences`. This is the file you need to edit to enable/disable features from now on.
  * The Debug menu is gone and has been replaced with the Develop menu.
  * The Develop menu can be turned on and off right from the Preferences window, no file editing necessary.
  * The JavaScript console has been replaced with Web Inspector. Unlike the old console, Web Inspector allows you to type in code to execute and also produces different visual treatments for calls to `console.error()`, `console.warn()`, etc., a la Firebug.
  * I&#8217;m still not able to get Drosera to attach to a running Safari instance on Windows. I&#8217;ve followed all of the steps I&#8217;ve found on various blog posts but no dice. The window does come up, it&#8217;s just not attached to any Safari instances so it can&#8217;t really debug anything.

I do have to say I&#8217;m fairly impressed with Safari thusfar. If I could just get Drosera working, I&#8217;d feel like I could do some serious development.
