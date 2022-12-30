---
title: The Magic of Unit Testing
author: Nicholas C. Zakas
permalink: /blog/2006/04/08/the-magic-of-unit-testing/
categories:
  - Professional
tags:
  - nUnit
  - Unit Testing
---
I've never done unit testing&#8230;ever. I've heard the phrase and wondered what the heck it was for some time now, so I decided to go and download <a title="NUnit" rel="external" href="http://www.nunit.org/">NUnit</a>, a unit testing framework for .NET. Now that I've started playing with it, I really like it.

Basically, create a special project with some special classes that run tests on your objects. Then, load the compiled DLL into the NUnit console and let it run. The tests are executed and you are told if any of them fail and why. It really makes debugging your classes much, much easier. You can now count me among the converted.
