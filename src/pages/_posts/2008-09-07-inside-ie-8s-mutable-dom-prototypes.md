---
title: 'Inside IE 8&#8242;s mutable DOM prototypes'
author: Nicholas C. Zakas
permalink: /blog/2008/09/07/inside-ie-8s-mutable-dom-prototypes/
categories:
  - Web Development
tags:
  - DOM
  - Element
  - HTMLElement
  - Internet Explorer
  - JavaScript
  - Node
  - Prototypes
---
When Internet Exporer 8 was released, a much talked-about feature was <a rel="external" href="http://www.microsoft.com/windows/internet-explorer/beta/readiness/developers-new.aspx#mutabledom">mutable DOM prototypes</a>. I dug in this morning to figure out exactly what is and is not supported. As one would expect, the support is not as full as the nice writeup would have everyone believe. Here&#8217;s a quick summary:

  * The `Node` type doesn&#8217;t exist, so you still can&#8217;t access `Node.ELEMENT_NODE` as you can in other browsers.
  * The `Element` type exists, but since `Node` doesn&#8217;t, it&#8217;s not a subtype.
  * The `HTMLElement` type doesn&#8217;t exist even though, technically, `HTMLElement` is the base type for all of the other HTML element types. For example, `HTMLBodyElement` inherits from `HTMLElement` which inherits from `Element`.
  * Getters and setters are supported via `__defineGetter__()` and `__defineSetter__()`. Sadly, these are only available on the DOM types and not on native JScript objects.
  * Other available types: `NodeList`, `NamedNodeMap`, `Attr`, `Text`, `DOMImplementation`, `HTMLDocument`, `HTMLCollection`. Each of these supports getters and setters.
  * Sadly, none of the DOM types are native JScript types, meaning the JScript engine sees all of the functions on the prototypes as objects and `Array.prototype.slice()` still can&#8217;t be used on `NodeList` or `HTMLCollection` objects.

I guess this is a good start from where IE was prior to this release, though still somewhat disappointing. Hopefully this feature will be more fleshed-out once they go GA.
