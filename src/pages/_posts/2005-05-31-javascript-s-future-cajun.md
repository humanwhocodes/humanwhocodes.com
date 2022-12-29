---
title: 'JavaScript&#8217;s Future: Cajun'
author: Nicholas C. Zakas
permalink: /blog/2005/05/31/javascript-s-future-cajun/
categories:
  - Web Development
tags:
  - Cajun
  - canvas
  - JavaScript
---
In the process of writing this new <acronym title="Asynchronous JavaScript + XML">Ajax</acronym> book, I&#8217;ve been recounting the major steps forward that JavaScript has taken since it was first released way back in Netscape Navigator 2.0 and wondering what the future will bring. In my opinion, the next revolution for JavaScript is going to be the implementation of the `<a title="Web Applications 1.0 - The bitmap canvas" rel="external" href="http://www.whatwg.org/specs/web-apps/current-work/#canvas"><canvas/></a>` element.

What exactly is the `<canvas/>` element? It was originally created by Apple to support its <a title="Apple - MacOS X - Dashboard" rel="external" href="http://www.apple.com/macosx/features/dashboard/">Dashboard</a> feature, it&#8217;s now part of the <a title="WHAT-WG" rel="external" href="http://www.whatwg.org">WHAT-WG</a> <a title="Web Applications 1.0" rel="external" href="http://www.whatwg.org/specs/web-apps/current-work/">Web Applications 1.0</a> specification. The `<canvas/>` element represents what&#8217;s essential a device-independent bitmap canvas that, when used with JavaScript, provides most of the drawing functions one would ever need.

Imagine, being able to draw any shape automatically as a page is being loaded, or creating animations without downloading actual images. Think of what this will do for online games or places like <a title="Google Maps" rel="external" href="http://maps.google.com">Google Maps</a> that must currently rely on server-side rendering for all images. This could literally revolutionize Web user interface design as we know it. No longer will developers be saddled with using the pre-rendered form elements. Don&#8217;t like that checkbox? Design your own. Need a color picker? Just draw in on a canvas. Need a collapsible tree? Don&#8217;t worry about tables and divs, just draw it the way you want it. Ultimately, this could push technologies like <acronym title="Vector Markup Language">VML</acronym> and <acronym title="Scalable Vector Graphics">SVG</acronym> out the door as developers are able to program their own graphics, making them resize, rotate, or skew, all by using JavaScript and a simple new element.

Already, Safari <a title="Introducing the Canvas" rel="external" href="http://weblogs.mozillazine.org/hyatt/archives/2004_07.html#005913">supports it</a> and <a title="Mozilla Gains Canvas Element Support" rel="external" href="http://www.mozillazine.org/talkback.html?article=6461">Firefox will soon</a>. Since these are heavily used by developers, will it be long before we see Web sites take advantage of the `<canvas/>` element to produce incredible effects with canvas-assisted JavaScript? Check out what&#8217;s <a title="Drawing Graphics with Canvas" rel="external" href="http://developer-test.mozilla.org/docs/Drawing_Graphics_with_Canvas">already possible</a>.

Ladies and gentlemen, what would any revolution be without a catch phrase? We have <acronym title="Asynchronous JavaScript + XML">Ajax</acronym> already; I&#8217;m proposing that this new model of Web user interfaces be called&#8230;what for it&#8230;<acronym title="Canvas Assisted JavaScript UnderNeath">Cajun</acronym> (Canvas Assisted JavaScript UnderNeath). Any sites that feature graphical user interfaces drawn on the `<canvas/>` element will be known as using the <acronym title="Canvas Assisted JavaScript UnderNeath">Cajun</acronym> model. Who knows? Maybe my next book will have to be *Professional <acronym title="Canvas Assisted JavaScript UnderNeath">Cajun</acronym> for Web Developers*?
