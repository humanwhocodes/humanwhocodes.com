---
title: JavaScript Compilers
author: Nicholas C. Zakas
permalink: /blog/2004/12/29/javascript-compilers/
categories:
  - Web Development
tags:
  - Compilers
  - JavaScript
---
My last blog got me thinking&#8230;I thought I had seen a JavaScript compiler available from <a title="Mozilla" rel="external" href="http://www.mozilla.org/">Mozilla</a>, and it turns out I was correct. Mozilla does have a <a title="JavaScript Compiler" rel="external" href="http://www.mozilla.org/rhino/jsc.html">JavaScript Compiler</a> as part of the <a title="Rhino Overview" rel="external" href="http://www.mozilla.org/rhino/overview.html">Rhino</a> JavaScript interpreter. The Rhino compiler creates Java source files from JavaScript files, which then can be used by any Java program.

There are other JavaScript compilers as well. The <a title="Semiofficial Home Page of the NGS JavaScript Compiler" rel="external" href="http://people.ssh.fi/mtr/js/">NGS JavaScript Compiler</a> actually compiles JavaScript down to a custom bytecode that is run by a virtual machine, similar to the Java virtual machine. Interesting concept, especially given its ability to communicate with C code. And even more interesting: the interpreter is partially written in JavaScript.
