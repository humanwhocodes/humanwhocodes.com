---
title: Moving the Web forward
author: Nicholas C. Zakas
permalink: /blog/2009/09/24/moving-the-web-forward/
categories:
  - Web Development
tags:
  - Internet
  - Mozilla
  - Web Development
---
Last week, I was invited to attend the Mozilla Platform Summit at Mozilla headquarters in Mountain View, California. [Dion Almaer][1] and [Ben Galbraith][2], of Mozilla and [Ajaxian][3] fame, put together this event to let developers help guide the future direction of Firefox. There were around 20 attendees in total, with familiar names like [John Resig][4] (Mozilla), [Steve Souders][5] (Google), [Scott Schiller][6] (Yahoo!/Flickr), and [Aaron Gustafson][7] (EasyDesigns/A List Apart/WaSP), along with representatives from [Facebook][8], [Apple][9], [280 North][10], and more.

## The day

The day began with several presentations from members of the Firefox team. [Christopher Blizzard][11] welcomed us all and gave us an overview of what we&#8217;d be doing throughout the day. I always like the story that Mozilla folks tell about the company: Mozilla is a non-profit organization whose sole goal is to [make the Internet better for everyone][12]. That&#8217;s it, no bottom line, no investors to worry about. The story gets more inspiring every time I hear it. Chris is also one of the nicest guys you could ever meet.

<p style="text-align: center;">
  <a title="Mozilla Platform Summit by Nicholas C. Zakas, on Flickr" href="http://www.flickr.com/photos/nzakas/3934669236/"><img src="http://farm3.static.flickr.com/2427/3934669236_1d0c89a1c1.jpg" alt="Mozilla Platform Summit" width="500" height="375" /></a>
</p>

[David Barron][13] gave a nice talk on CSS, including what&#8217;s already been added in Firefox, what&#8217;s planned for additions, and several other possibilities that they&#8217;re considering. He was a really good sport as the usual web developer angst started seeping into the room. As you would expect, a lot of people have opinions on how CSS should evolve and grow.

There were several other presentations about new and upcoming JavaScript APIs, as well as a rather deep discussion about the value of SVG to web developers. After lunch, we were treated to a walkthrough ECMAScript Harmony by [Brendan Eich][14], which was the same presentation he had given at the Ajax Experience. Since a lot of us weren&#8217;t at the Ajax Experience, this was a great opportunity to see the current state of ECMAScript development. Once again, there were some strong opinions about the relative goodness and badness of different parts of ECMAScript.

The afternoon was spent in a roundtable discussion where all kinds of topics were discussed. Many brought up the recent troubles with Firebug as something that Mozilla should work on fixing. I kicked off a long discussion about client-side storage, saying how much I love `sessionStorage` and `localStorage` as well as how I despite the Client-Side SQL Database spec. The general consensus seemed to be my position: client-side database are good but SQL isn&#8217;t the way we want to access that data. I also brought up my concern over the security of data in client-side storage (as I discussed briefly in a [previous post][15]), and how I&#8217;d prefer some sort of encryption and expiration API.

There was an interesting discussion around whether or not Mozilla should wait for specifications to be finished before implementing anything. My position on this is that specifications take too long to complete and often result in bad interfaces. Mozilla has a long history of implementing what they believed to be useful interfaces, such as `XMLHttpRequest` (as a generalized copy of IE&#8217;s implementation) and `XSLTProcessor`. I encouraged them to continue in that tradition: create and implement an excellent addition to JavaScript APIs and worry about standardization later. APIs become standards pretty quickly when the developer community loves them (see aforementioned `XMLHttpRequest` and `XSLTProcessor`).

Another interesting discussion evolved around creating low-level, ugly interfaces versus trying to create nice interfaces from the start. There had been mention of building a nicer interface on top of the Client-Side Database API when someone asked why we always need to have nicer interfaces to native functionality rather than having the native functionality with a nice interface. I thought that was a valid point. It seems that JavaScript is more and more becoming akin to Assembly, where it is the lowest level of an API stack. Is that good or bad? There are arguments in both directions.

A lot of great discussion in the afternoon gave way to an alcohol-fueled gathering where Brendan Eich served as the bartender. This was a great time to interact with everyone else in a relaxed and congenial atmosphere. I&#8217;d venture to say we all felt pretty good about how the day went and were all happy to hear everyone&#8217;s own stories about web development.

It really speaks volumes about Mozilla&#8217;s direction when they&#8217;ll stop to get the opinions of web developers before deciding how best to spend their development time. We&#8217;re all looking forward to having more discussions with Mozilla in the future with the goal of moving the web forward.

## What does forward mean?

An interesting question that started to sneak into my head while participating at the Mozilla Platform Summit was this: what does forward mean for the Web? As I continued listening to others and myself, I became convinced that there are two schools of thought about which problems the browser vendors should be focusing on:

  1. **Problems in today&#8217;s web applications.** The problems of today are things that we, as web developers, are currently struggling with. We&#8217;re trying to do something that the browser just won&#8217;t let us do. Solving these problems help us to deliver better, more usable versions of the web applications we&#8217;re actively working on right now. These are problems that, if addressed, would allow Facebook, Gmail, and the Yahoo! homepage to provide better user experiences immediately. You&#8217;ll find a lot of web developers experiencing the same problems. Example of APIs targeted at today&#8217;s problems : 
      * [History API][16], which allows Ajax applications to manipulate the history stack in such a way that the Back button continues to work as expected.
      * [Web Storage][17], which finally gives developers an alternative to cookies for storing data in the browser.
  2. **Problems in tomorrow&#8217;s web applications.** The problems of tomorrow are mostly theoretical at this point. We&#8217;re trying to guess where web applications are going and make sure there are enough resources that they can get there. This is the realm of porting Photoshop and Microsoft Office to web applications. A large portion of HTML5 is aimed at this set of problems. The result are APIs that are interesting and fun but of little practical use today. That&#8217;s because the web applications that would need these APIs to function don&#8217;t actually exist yet. Example of APIs targeted at tomorrow&#8217;s problems: 
      * [Web Workers][18], which provides threading support for JavaScript. I&#8217;ve written about web workers in a [previous post][19] and noted that I don&#8217;t see any practical use for them right now. But in a world where Photoshop effects are applied to an image in a browser, web workers become useful.
      * [Web Databases][20], which provide for a SQLite database running in the browser. This was pushed forward by Apple, who really wanted it for developing web applications on the iPhone. They had an immediate future problem to which this was the solution. There are still so many questions about how databases should be used in web applications. Should joining be allowed? Will we need DBAs on the front end as well?
      * [Canvas][21], which allows for 2D graphic rendering with a simple syntax. This was another one pushed by Apple so that developers could create compelling dashboard widgets using HTML and JavaScript.

There are some people who want to focus on the problems of tomorrow to push the web forward and others who want to focus on the problems of today. My personal belief is that we need a little bit of both. To date, HTML5 has been heavily tilted towards solving future problems, and it&#8217;s left behind a lot of current problems in its wake. Current problems are well-defined and the solutions are easier to develop because we already know the use cases.

I&#8217;m all for splitting time between current and future problems, but we can&#8217;t skip over the current problems to get to the future ones. The Web is closely tied to people&#8217;s livelihood, education, and ability to interact with the world right now, today, in 2009. Browser vendors do us a great disservice by focusing on more interesting and cool hypothetical problems rather than the problems with which we&#8217;re currently dealing.

Equal time is the path forward.

## That&#8217;s not what the Web is&#8230;

As the Web continues to move forward, it&#8217;s created a large amount of fear in the web development community. I heard this a few times at the Mozilla Platform Summit when people talked about various new APIs. There&#8217;s always someone who says that something new ruins the Web. In order to move the Web forward, we need to abandon our concepts of what the Web is so that we don&#8217;t feel that new parts are &#8220;ruining&#8221; it. The Web doesn&#8217;t have a philosophically true form, it wasn&#8217;t born a certain way that we must fight to preserve against all odds. If that was the case, we&#8217;d still have battleship-gray backgrounds with black text and blue links for all web sites.

To move the Web forward, we need to disavow ourselves of the restrictions some have imposed on us over the years. We need to realize that providing options is a good thing, and that just because an option is provided doesn&#8217;t mean we need to use it. There is no such thing as a bad API if it provides new capabilities; libraries like YUI help make the badness of the API design a non-factor. All APIs, regardless of their warts, are good in that they open the door to further possibilities.

Consider a favorite topic: tables. Tables were very necessary for the Web and its forward momentum. Web pages needed to display tabular data, that was the &#8220;current&#8221; problem at the time. Of course, we all know that tables eventually ended up being used for layout, at which point everyone got upset. Tables were being used inappropriately, that was the bad news. The good news is that, as a result of this trend, CSS gained momentum and ultimately provided us with so many more layout options that people didn&#8217;t have to use tables for layout anymore. This is the general trend: new capability used as intended, new capability used in an unintended way, a different capability is introduced to make up for it. That&#8217;s evolution.

We can&#8217;t get so bogged down by what the Web is today that we won&#8217;t allow it to grow in a new direction tomorrow. We also have to be logical enough to realize that moving the Web forward doesn&#8217;t mean we have to change what the Web is to us. The Web is already a bunch of different things to a bunch of different people, and therein lies its power. It can continue to be the source of my employment while it can provide you an outlet for displaying your prize-winning photography.

The Web isn&#8217;t one thing, it&#8217;s many things to many people. In order for the Web to have a future, it must continue to be newer and different things. Options are good. New capabilities are good. New APIs are good. The only bad thing is stagnancy.

## Push the Web forward

Push the Web forward by being open to all of the possibilities and afraid of none. Not one of us can see what&#8217;s beyond the horizon, but we can choose to approach it with open and accepting arms or run away afraid, presuming disgust and failure. Only the former moves the Web forward. What path will you take?

 [1]: http://almaer.com/blog/
 [2]: http://benzilla.galbraiths.org/
 [3]: http://www.ajaxian.com/
 [4]: http://www.ejohn.org/
 [5]: http://www.stevesouders.com
 [6]: http://www.schillamania.com
 [7]: http://easy-designs.net/
 [8]: http://www.facebook.com/
 [9]: http://www.apple.com/
 [10]: http://280north.com/
 [11]: http://www.0xdeadbeef.com/weblog/
 [12]: http://www.mozilla.com/en-US/about/whatismozilla.html
 [13]: http://dbaron.org/
 [14]: http://en.wikipedia.org/wiki/Brendan_Eich
 [15]: {{site.url}}/blog/2009/07/21/introduction-to-sessionstorage/
 [16]: http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html
 [17]: http://www.w3.org/TR/2009/WD-webstorage-20090910/
 [18]: http://www.w3.org/TR/workers/
 [19]: {{site.url}}/blog/2009/08/18/experimenting-with-web-workers/
 [20]: http://www.w3.org/TR/2009/WD-webdatabase-20090910/
 [21]: http://www.whatwg.org/specs/web-apps/current-work/#the-canvas-element
