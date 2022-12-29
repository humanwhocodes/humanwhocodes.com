---
title: Helpful Hint for Headless Unix Servers
author: Nicholas C. Zakas
permalink: /blog/2004/10/26/helpful-hint-for-headless-unix-servers/
categories:
  - Software Development
tags:
  - Headless
  - Java
  - Unix
---
While investigating Java charting solutions for use in <acronym title="Java Server Pages">JSP</acronym> applications, I was introduced to the fearsome &#8220;headless server problem.&#8221; For the uninitiated, this is the problem where the Java <acronym title="Abstract Windowing Toolkit">AWT</acronym> expects a <acronym title="Graphical User Interface">GUI</acronym> to be installed on the server so it can use the display driver to generate graphics. When you try to run something on a headless server that requires the <acronym title="Abstract Windowing Toolkit">AWT</acronym>, you&#8217;ll get this error:

`java.lang.InternalError: Can't connect to X11 window server using ':0.0'`

The solution is simple when you&#8217;re using <acronym title="Java Development Kit">JDK</acronym> 1.4, just add the following line before you start using any <acronym title="Abstract Windowing Toolkit">AWT</acronym>classes:

`System.setProperty("java.awt.headless","true");`

This simple line sets the <acronym title="Abstract Windowing Toolkit">AWT</acronym> to run in headless mode, foregoing the system display driver and more importantly, making your code work. Nice of Sun to get around to this feature!
