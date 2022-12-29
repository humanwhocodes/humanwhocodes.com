---
title: 'JavaScript variable names you shouldn&#8217;t use'
author: Nicholas C. Zakas
permalink: /blog/2007/06/03/javascript-variable-names-you-shouldn-t-use/
categories:
  - Web Development
tags:
  - JavaScript
  - Variables
---
One of the biggest maintainability problems in any language has to be the correct and consistent naming of variables, classes, and methods. In most languages, keywords can&#8217;t be used as identifiers, so there&#8217;s always a warning if you attempt to do something dumb. JavaScript has keywords and reserved words that can&#8217;t be used as identifiers, but there&#8217;s also a number of host objects that exist and can be overridden without any warning.

So, quite simply, here&#8217;s a list of variables names you should *never* use because they are host objects in JavaScript and should never be redeclared:

  * `self` &#8211; I see this a lot when setting a pointer to the `this` object, such as: `var self = this;`. Oftentimes, this is how developers are keeping a reference to an object for use inside of a closure. The problem is that `self` is already in use as another pointer to the `window` object. Don&#8217;t redefine `self` as something other than what it is as it could confuse others looking at your code. (<a title="Google code search for 'var self'" rel="external" href="http://www.google.com/codesearch?q=%22var+self%22&hl=en&btnG=Search+Code">proof</a>)
  * `top` &#8211; This one is most often used in combination with a variable named `left` to determine or set element coordinates. Once again, the problem is that `top` is a host object, it points to the outermost `window` object and is most useful when used from within a frame. (<a title="Google code search for 'var top'" rel="external" href="http://www.google.com/codesearch?q=%22var+top%22&hl=en&btnG=Search+Code">proof</a>)
  * `location` &#8211; I&#8217;m surprised, but I have seen variables with this name. This is a host object containing information about the page that is currently loaded. (<a title="Google code search for 'var location'" rel="external" href="http://www.google.com/codesearch?q=%22var+location%22&hl=en&btnG=Search+Code">proof</a>)

Again, these are variables names that should never be used. When people expect variables with particular names to behave a certain way, it&#8217;s always dangerous to change their behavior. You might as well just start redefining methods on the `window` object.
