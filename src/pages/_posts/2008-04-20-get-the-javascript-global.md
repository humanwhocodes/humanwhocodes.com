---
title: Get the JavaScript global
author: Nicholas C. Zakas
permalink: /blog/2008/04/20/get-the-javascript-global/
categories:
  - Web Development
tags:
  - Global
  - JavaScript
  - Objects
---
The `global` object in JavaScript is vitally important: all global variables and functions become properties fo the `global` object. In browsers. the `window` object doubles as the `global` object, and most developers use it as such without even realizing. In other JavaScript environments, however, the `global` object is something else. Most of the time, it&#8217;s not assigned to a global variable for you to access.

If you code is to run in non-browser JavaScript environments, you&#8217;d better avoid using `window` for dealing with globals. However, referencing the `global` object can be necessary. To that end, I present the `getGlobal()` function, which works in any JavaScript environment and always returns the `global` object:

`function getGlobal(){<br />
return (function(){<br />
return this;<br />
}).call(null);<br />
}`

The key to this function is that the `this` object always points to the `global` object anytime you are using `call()` or `apply()` and pass in `null` as the first argument. Since a `null` scope is not valid, the interpreter inserts the `global` object. The function uses an inner function to assure that the scope is always correct. You can then use this function as follows:

`var global = getGlobal();`

And I suggest you do this whenever writing JavaScript that should be executable in non-browser environments. Enjoy.
