---
title: "Understanding IE8&#8242;s site compatibility view list"
author: Nicholas C. Zakas
permalink: /blog/2010/05/17/understanding-ie8s-site-compatibility-view-list/
categories:
  - Web Development
tags:
  - Browser Mode
  - Compatibility View
  - Document Mode
  - Internet Explorer
---
Not too long ago, I wrote about Internet Explorer 8&#8242;s [browser mode and document mode][1] settings. The goal of the post was to familiarize everyone with the various modes that IE8 can run your document in. Since that time, I've had ample opportunity to play with the browser and figure out a bunch of quirks related to this functionality. I've seen IE8 send the wrong user-agent to the server a handful of times, messing up server-side user-agent detection. But the most interesting issue I've come across has been the site compatibility view list.

## What is it?

When Microsoft announced that IE8 would run in a new &#8220;super standards&#8221; mode by default, it created a lot of fear that this would &#8220;break the web.&#8221; The argument was that there were web sites/applications that were created for use specifically with IE7 (or worse, IE5) and that these sites would break as soon as the user upgraded to IE8.

To mitigate this concern, Microsoft took several steps:

  1. Introducing browser and document modes so that IE8 was capable of acting like IE7 and IE5.
  2. Developers can add the `X-UA-Compatible` HTTP header or `<meta>` tag to specify that the page should be rendered in a particular browser mode.
  3. The creation of a site compatibility view list, maintained by Microsoft and delivered to IE8, that kept a list of sites known not to work in IE8 browser mode and therefore should be rendered in IE7 browser mode.

Numbers 1 and 2 covered those sites who were fully staffed and able to do work to prepare for IE8 compatibility. Number 3 is designed to help the rest of the web, the sites that aren't actively maintained and don't have resources to make any changes.

## Where can I get a copy?

Prior to IE8 release candidate, Microsoft created a draft site compatibility view list based on pages that had trouble working in the browser. The list was fed by feedback buttons on pre-release versions of the browser as well as through comments and interactions with the web community. Over time, the list has been updated and changed as feedback was received.

You can download a copy of the site compatibility view list in [Excel format from MSDN][2]. The file contains details such as when the site was added to the list, when it was removed (if it was) and why, and more.

The site incompatibility list is downloaded as part of Windows Update. When you download updates from Microsoft, the list comes along with it.

## How can I tell what settings my browser uses?

At any point in time, you can view the site compatibility view list that your browser is using by typing the following into your address bar:

    res://iecompat.dll/iecompatdata.xml

If you're ever unsure if IE8 thinks that a site should be run in compatibility view mode, double-check the list to see if it's included.

## What happens in the browser

When you visit a site that's on the site compatibility view list, the &#8220;Compatibility View&#8221; button that is normally next to the Refresh button disappears. Since the browser has already determined that the site must use compatibility view and won't work in IE8 mode, the button is hidden to prevent the user from accidentally putting the browser into a mode in which the page won't work. This is actually the same behavior as if the `X-UA-Compatible` header is set.

## Learn more

There is a lot of information about the site compatibility list and all things related to browser and document modes. The best place to start is MSDN's, [Understanding the Compatibility View List][3], which gives an overview of the feature. To understand more about why this is necessary, I'd recommend reading, [Defining Document Compatibility][4].

 [1]: http://rds.yahoo.com/_ylt=A0oGkwOLQu9LmbEAAo5XNyoA;_ylu=X3oDMTEyYTloODYwBHNlYwNzcgRwb3MDMgRjb2xvA3NrMQR2dGlkA0g0NjVfNzc-/SIG=13c38n4p7/EXP=1274057739/**http%3a//www.nczonline.net/blog/2010/01/19/internet-explorer-8-document-and-browser-modes/
 [2]: http://www.microsoft.com/downloads/details.aspx?FamilyID=b885e621-91b7-432d-8175-a745b87d2588&displaylang=en
 [3]: http://msdn.microsoft.com/en-us/library/dd567845%28VS.85%29.aspx
 [4]: http://msdn.microsoft.com/en-us/library/cc288325%28VS.85%29.aspx
