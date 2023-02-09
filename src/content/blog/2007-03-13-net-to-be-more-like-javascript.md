---
title: .NET to be more like JavaScript
author: Nicholas C. Zakas
permalink: /blog/2007/03/13/net-to-be-more-like-javascript/
categories:
  - Professional
tags:
  - .NET
  - JavaScript
  - Programming
---
This was an interesting read I found today: <a title="New &quot;Orcas&quot; Language Feature: Extension Methods" rel="external" href="http://weblogs.asp.net/scottgu/archive/2007/03/13/new-orcas-language-feature-extension-methods.aspx">New &#8220;Orcas&#8221; Language Feature: Extension Methods</a>. The point of the post is to discuss a new upcoming feature for .NET languages in which developers can add their own methods to objects without touching the class definition. Essentially, at any point you can add a method to any class such that all instances will have it. This is just like JavaScript, and it works for all .NET languages!

The ironic thing is that it allows you to do what I always tell people to avoid: you can't modify objects you don't own. While it's possible in JavaScript, and fun to do as a hobby (most of my hobby scripts modify some object or another), it's not a good idea to do in production code. There's already too much stuff going on in a developer's head to make them figure out whether a method is native or not. I know they're trying to make .NET as extensible as possible, but whatever happened to creating a subclass or using the behavior pattern? :: sigh ::
