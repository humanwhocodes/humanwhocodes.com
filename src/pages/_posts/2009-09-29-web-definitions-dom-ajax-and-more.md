---
title: 'Web definitions: DOM, Ajax, and more'
author: Nicholas C. Zakas
permalink: /blog/2009/09/29/web-definitions-dom-ajax-and-more/
categories:
  - Web Development
tags:
  - Ajax
  - BOM
  - DOM
  - ECMAScript
  - XHR
---
Even though we're now a decade into professional web development, there's still a large amount of terms and phrases being used incorrectly. Long-time readers of my blog know that [communication][1] and [social interaction][2] are things that I find fascinating, and that I'm on a constant mission to be a clearer communicator in all situations. One of the most frequent sources of confusion in communication is when someone uses a term or phrase thinking that it means one thing but it actually means another. Recently, I've seen an uptick of this in web development and so want to lay out some official definitions so that everyone can communicate more clearly.

## ECMAScript

ECMAScript is the language defined by the [ECMA-262][3] standard. ECMAScript defines the core functionality that we use in JavaScript, including syntax, operators, functions, built-in types, and more. There is nothing about ECMAScript that is tied to the web; it simply is a description of a scripting language that is easily extensible enough to work on the Web. That being said, ECMAScript can also be embedded in other environments such as the desktop and the server.

To really make this clear, the so-called JavaScript engines that browsers use are actually ECMAScript engines &#8211; they don't know anything about the DOM or the browser. This is why the engines can be swapped in and out, as Google swapped in V8 for Chome in place of the default WebKit JavaScriptCore engine. This is possible because the engine just runs the low-level ECMAScript language.

## Document Object Model (DOM)

The document object model, or more affectionately called the DOM, allows you to interact with elements of a web page through JavaScript. The DOM is defined by the W3C in [DOM Level 1][4], [DOM Level 2][5], and the not-often-implemented [DOM Level 3][6]. At the very end of each specification, there is a section called [ECMAScript Language Binding][7], which defines the interfaces for the API as defined in ECMAScript (note, it does not say &#8220;JavaScript&#8221; language binding &#8211; exactly why is discussed later).

You may have also heard of DOM Level 0. DOM Level 0 isn't a true specification, it's a generic term used to identify the mish-mash of pre-DOM Level 1 ECMAScript bindings for limited element access. DOM Level 0 is considered what appeared in Netscape Navigator 4 and earlier and Internet Explorer 4 and earlier.

The W3C specifications are the core of the DOM, but generally anything that interacts with the document's structure, allowing either querying or manipulation, is considered part of the DOM. This includes newer specifications such as the [Selectors API][8], which define extensions to the DOM.

The root object of the DOM is the `document` object; nothing above that is defined in any of the DOM specifications.

## Browser Object Model (BOM)

The browser object model (BOM) is the most mysterious part of the browser API because it is not defined by any specifications at all. The BOM originated in Netscape Navigator, which introduced the `window` and `navigator` objects that are now ubiquitous in all browsers.

I've been accused, in the past, of creating this term since it's not used very frequently. In reality, the term has been around for a while, and there are [several][9] [good][10] [resources][11] available. In general, the BOM is comprised of everything needed to interact with the browser outside of the document. The BOM represents `window`, `navigator`, `location`, `history`, `frames`, and `screen`, as well as any of the properties of each (including `setTimeout()` and `setInterval()`).

The difficult part about dealing with the BOM is that, without any specifications guiding the implementation, most browsers just copy what has already been implemented in others. Even so, the browser vendors have done a remarkable job at keeping the BOM fairly consistent across implementations. Even though there has been [an attempt][12] at standardizing these interfaces, there is no final published recommendation.

## JavaScript

JavaScript as we typically think about it is really a combination of ECMAScript, for the core, the DOM, for interaction with the page, and the BOM, for interaction with the browser. When you see JavaScript being used in other contexts, it really is ECMAScript being used as the core around which to build a scripting environment. Without the DOM and the BOM, there is no JavaScript. ECMAScript alone is of little usage because it has no facilities for input or output, it's only the inclusion of the DOM and the BOM, implemented using ECMAScript, that makes JavaScript useful for web pages.

## Dynamic HTML

Before the DOM came along, Microsoft and Netscape hyped something called Dynamic HTML (or DHTML). Dynamic HTML is really just a way to say that you can, programmatically, change the appearance or structure of a web page using JavaScript all without unloading the page. The DOM enables DHTML, since that is the facility for dynamically changing the document, but the two are not equivalent. You can think of DHTML as a browser capability and the DOM as the interface used to achieve it.

## Ajax

Perhaps the most misunderstood term in web development is Ajax.Â  In the [original article][13] that started the trend, Garrett coined &#8220;Ajax&#8221; as an abbreviation (not an acronym, so not AJAX) to describe a particular development technique. Put simply, Ajax is the ability to retrieve new data from the server without unloading the current page. It doesn't necessarily have to do with any particular transport mechanism or any particular request or response format. The DOM enables Ajax because, once new data is retrieved, it can be used to insert the data into the page.

## XMLHttpRequest (XHR)

The `XMLHttpRequest` object, often called the XHR object, is the most popular mechanism for achieving Ajax communication. It is just one transport mechanism for Ajax, however, and is not equivalent. Ajax is the technique, XHR is the tool.

 [1]: {{site.url}}/blog/2008/05/04/the-communication-hierarchy/
 [2]: {{site.url}}/blog/2008/11/23/books-about-social-interaction/
 [3]: http://www.ecma-international.org/publications/standards/ECMA-262.HTM
 [4]: http://www.w3.org/TR/REC-DOM-Level-1/
 [5]: http://www.w3.org/TR/DOM-Level-2-Core/
 [6]: http://www.w3.org/TR/DOM-Level-3-Core/
 [7]: http://www.w3.org/TR/DOM-Level-2-Core/ecma-script-binding.html
 [8]: http://www.w3.org/TR/selectors-api/
 [9]: http://msdn.microsoft.com/en-us/library/ms952643.aspx
 [10]: http://www.webdevelopersjournal.com/articles/dhtml3/dhtml3.html
 [11]: http://javascript.about.com/od/browserobjectmodel/Browser_Object_Model.htm
 [12]: http://www.w3.org/TR/Window/
 [13]: http://www.adaptivepath.com/ideas/essays/archives/000385.php
