---
title: Introducing Eureka v0.1
author: Nicholas C. Zakas
permalink: /blog/2006/02/26/introducing-eureka-v0-1/
categories:
  - Web Development
tags:
  - Eureka
  - JavaScript
---
I like bookmarklets, I really do, but what I&#8217;ve always wanted was a way to interact directly with the JavaScript on a page without typing it into the address bar, formatting it, etc. Thus, I introduce Eureka.

Eureka is a command-line JavaScript interpreter designed to interface with Internet Explorer. You can attach to a running instance of Internet Explorer and then type in JavaScript commands to run on the page. If the command returns an object, then the return value is displayed. You can also use it to set values. Suppose you want to know how wide a particular element is, just type in `element.offsetWidth` and Eureka will output the value. If you&#8217;d like to see what it looks like at 400 pixels, just type `element.style.width = "400px"`.

To attach to an instance of Internet Explorer, you need to know its identifier. Type `/instances` and you&#8217;ll be given a list of running Internet Explorer instances. The identifier is the number to the left of the page title, so you can attach to the first instance by running `/attach 0`. Then, type in whatever you want, it will be evaluated as if it were in the page. Want to display all the properties of an object? Type `/inspect` and then the object, such as `/inspect document`.

Eureka requires the .NET Framework v1.1, so make sure you have that installed first, then go <a title="Downloads" rel="internal" href="/downloads">download it</a>. I&#8217;ve spent a lot of time over the past couple weeks working on this, so I&#8217;d like some feedback from people. Please use the <a title="Contact" rel="internal" href="/contact">contact page</a> to send me feedback.

I hope everyone enjoys Eureka! It&#8217;s freeware, so have fun!
