---
title: Inconsistent array literals
author: Nicholas C. Zakas
permalink: /blog/2007/09/09/inconsistent-array-literals/
categories:
  - Web Development
tags:
  - Arrays
  - Internet Explorer
  - JavaScript
---
Back at the <a title="The Rich Web Experience" rel="external" href="http://www.therichwebexperience.com">Rich Web Experience</a>, I helped lead a &#8220;birds of a feather&#8221; group discussion on JavaScript. In that discussion, someone called me a JavaScript expert. I quickly explained that I don't like being called an expert because it implies that I know everything about JavaScript, which I don't. I then went on to share some anecdotes of things that I learned in the past year. Indeed, every time I think I know a lot, I stumble across something else that I didn't know before. I'd like to share something I learned today about JavaScript.

Late last year, a discussion between myself and Steve Carlson (also on the My Yahoo! team) led to us discovering that array literals could be specified with empty values by putting commas in without values, such as:

    var values = [,,,,,];

This creates an array whose values are all `undefined`. The fun part is, once again, with browser differences. In Internet Explorer, this creates an array of six items. There are five commas so it assumes that you're separated six values&#8230;makes sense, right? In all the other browsers (Firefox, Safari, Opera), it creates an array of five items. Why does this happen? This can be seen more clearly in the following example:

    var values = [1,2,];

In Internet Explorer, this creates a three-item array where the values are 1, 2, and `undefined`. In the other browsers, it creates a two-item array where the values are 1 and 2. So which of these two groups is correct? By default, one would assume that IE is wrong since it usually is.

ECMA-262 (p.41) indicates that a dangling comma is legal syntax. Commas in array initializers are represented by the Elision production. Without going into all of the technical mumbo jumbo, the specification basically states that each Elision adds 1 to the array's `length` property. This means that, as usual, IE's implementation is incorrect since five commas should equal five items, not six.

It's really frustrating to me that now, eight years after the third edition of ECMA-262 was finalized that browsers still don't have this specification implemented perfectly.
