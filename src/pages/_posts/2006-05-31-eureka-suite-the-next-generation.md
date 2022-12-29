---
title: 'Eureka Suite &#8211; The Next Generation'
author: Nicholas C. Zakas
permalink: /blog/2006/05/31/eureka-suite-the-next-generation/
categories:
  - Web Development
tags:
  - Eureka
  - JavaScript
---
When last we left Eureka, it was a JavaScript console that interacted with Internet Explorer. As I thought more about it, it seemed that there could be ways to reuse the components of the original Eureka for other purposes. So, I proudly introduce the <a rel="internal" href="/downloads/EurekaSuiteSetup.zip">Eureka Suite</a>, which will be an ever-growing group of JavaScript utilities.

In this release, version 0.3, the Eureka Console is still included and has been rearchitected to be faster and has an improved leak detection test that gives you blow-by-blow coverage of the leak test as it&#8217;s being performed. New in this release is Eureka XmlDoc, which parses through JavaDoc-style comments (see the included test.js file in the Program FilesEurekaSuite folder) and creates an <acronym title="eXtensible Markup Language">XML</acronym> file outlining your JavaScript file. You can then use whatever method you like to create nicely-formatted documentation.

I hope everyone enjoys this, as usual, I&#8217;m looking for feedback.
