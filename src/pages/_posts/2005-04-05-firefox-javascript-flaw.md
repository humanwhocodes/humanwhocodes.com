---
title: Firefox JavaScript Flaw
author: Nicholas C. Zakas
permalink: /blog/2005/04/05/firefox-javascript-flaw/
categories:
  - Web Development
tags:
  - Firefox
  - JavaScript
---
It appears that the folks over at <a title="Secunia" rel="external" href="http://www.secunia.com">Secunia</a> have found a JavaScript flaw in <a title="Mozilla Firefox" rel="external" href="http://www.mozilla.org/projects/firefox">Firefox</a>. The flaw allows a script to read an arbitrary amount of information contained in the browser memory. This data could be anything from <acronym title="Universal Resource Locator">URL</acronym>s to JavaScript commands. Secunia has posted <a title="Mozilla Products Arbitrary Memory Exposure Test" rel="external" href="http://secunia.com/mozilla_products_arbitrary_memory_exposure_test/">a test</a> that demonstrates the flaw. The test uses a buffer overrun technique to access the memory, similar to popular hacking methods used worldwide.
