---
title: The innovations of Internet Explorer
author: Nicholas C. Zakas
permalink: /blog/2012/08/22/the-innovations-of-internet-explorer/
categories:
  - Web Development
tags:
  - CSS
  - DOM
  - Internet Explorer
  - JavaScript
---
Long before Internet Explorer became the browser everyone loves to hate, it was the driving force of innovation on the Internet. Sometimes it's hard to remember all of the good that Internet Explorer did before Internet Explorer 6 became the scourge of web developers everywhere. Believe it or not, Internet Explorer 4-6 is heavily responsible for web development as we know it today. A number of proprietary features became de facto standards and then official standards with some ending up in the HTML5 specification. It may be hard to believe that Internet Explorer is actually to thank for a lot of the features that we take for granted today, but a quick walk through history shows that it's true.

## DOM

If Internet Explorer is a browser that everyone loves to hate, the Document Object Model (DOM) is the API that everyone loves to hate. You can call the DOM overly verbose, ill-suited for JavaScript, and somewhat nonsensical, and you would be correct on all counts. However, the DOM gives developers access to every part of a webpage through JavaScript. There was a time when you could only access certain elements on the page through JavaScript. Internet Explorer 3 and Netscape 3 only allowed programmatic access to form elements, images, and links. Netscape 4 improved the situation by expanding programmatic access to the proprietary `<layer>` element via `document.layers`. Internet Explorer 4 improve the situation even further by allowing programmatic access of every element on the page via `document.all`

In many regards, `document.all` was the very first version of `document.getElementById()`. You still used an element's ID to access it through `document.all`, such as `document.all.myDiv` or `document.all["myDiv"]`. The primary difference was that Internet Explorer used a collection instead of the function, which matched all other access methods at the time such as `document.images` and `document.forms`.

Internet Explorer 4 was also the first browser to introduce the ability to get a list of elements by tag name via `document.all.tags()`. For all intents and purposes, this was the first version of `document.getElementsByTagName()` and worked the exact same way. If you want to get all `<div>` elements, you would use `document.all.tags("div")`. Even in Internet Explorer 9, this method still exists and is just an alias for `document.getElementsByTagName()`.

Internet Explorer 4 also introduced us to perhaps the most popular proprietary DOM extension of all time: `innerHTML`. It seems that the folks at Microsoft realized what a pain it would be to build up a DOM programmatically and afforded us this shortcut, along with `outerHTML`. Both of which proved to be so useful, they were standardized in HTML5<sup>[1]</sup>. The companion APIs dealing with plain text, `innerText` and `outerText`, also proved influential enough that DOM Level 3 introduced `textContent`<sup>[2]</sup>, which acts in a similar manner to `innerText`.

Along the same lines, Internet Explorer 4 introduced `insertAdjacentHTML()`, yet another way of inserting HTML text into a document. This one took a little longer, but it was also codified in HTML5<sup>[3]</sup> and is now widely supported by browsers.

## Events

In the beginning, there was no event system for JavaScript. Both Netscape and Microsoft took a stab at it and each came up with different models. Netscape brought us event capturing, the idea that an event is first delivered to the window, then the document, and so on until finally reaching the intended target. Netscape browsers prior to version 6 supported only event capturing.

Microsoft took the opposite approach and came up with event bubbling. They believed that the event should begin at the actual target and then fire on the parents and so on up to the document. Internet Explorer prior to version 9 only supported event bubbling. Although the official DOM events specification evolves to include both event capturing and event bubbling, most web developers use event bubbling exclusively, with event capturing being saved for a few workarounds and tricks buried deep down inside of JavaScript libraries.

In addition to creating event bubbling, Microsoft also created a bunch of additional events that eventually became standardized:

  * `contextmenu` &#8211; fires when you use the secondary mouse button on an element. First appeared in Internet Explorer 5 and later codified as part of HTML5<sup>[4]</sup>. Now supported in all major desktop browsers. 
  * `beforeunload` &#8211; fires before the `unload` event and allows you to block unloading of the page. Originally introduced in Internet Explorer 4 and now part of HTML5<sup>[4]</sup>. Also supported in all major desktop browsers.
  * `mousewheel` &#8211; fires when the mouse wheel (or similar device) is used. The first browser to support this event was Internet Explorer 6. Just like the others, it's now part of HTML5<sup>[4]</sup>. The only major desktop browser to not support this event is Firefox (which does support an alternative `DOMMouseScroll` event).
  * `mouseenter` &#8211; a non-bubbling version of `mouseover`, introduced by Microsoft in Internet Explorer 5 to help combat the troubles with using `mouseover`. This event became formalized in DOM Level 3 Events<sup>[5]</sup>. Also supported in Firefox and Opera, but not in Safari or Chrome (yet?).
  * `mouseleave` &#8211; a non-bubbling version of `mouseout` to match `mouseenter`. Introduced in Internet Explorer 5 and also now standardized in DOM Level 3 Events<sup>[6]</sup>. Same support level as `mouseenter`.
  * `focusin` &#8211; a bubbling version of `focus` to help more easily manage focus on a page. Originally introduced in Internet Explorer 6 and now part of DOM Level 3 Events<sup>[7]</sup>. Not currently well supported, though Firefox has a bug opened for its implementation.
  * `focusout` &#8211; a bubbling version of `blur` to help more easily manage focus on a page. Originally introduced in Internet Explorer 6 and now part of DOM Level 3 Events<sup>[8]</sup>. As with `focusin`, not well supported yet but Firefox is close.

## <iframe>

Frames were initially introduced by Netscape Navigator 2 as a proprietary feature. This included `<frameset>`, `<frame>`, and `<noframes>`. The idea behind this feature was pretty simple: at the time, everyone was using modems and roundtrips to the server were quite expensive. The main use case was to provide one frame with navigational elements that would only be loaded once, and another frame that could be controlled by the navigation and changed separately. Saving server render time and data transfer by having navigation as a separate page was a huge win at the time.

Internet Explorer 3 supported frames as well, since they were becoming quite popular on the web. However, Microsoft added its own proprietary tag to that functionality: `<iframe>`. The basic idea behind this element was to embed a page within another page. Whereas Netscape's implementation required you to create three pages to have static navigation (the navigation page, the content page, and the frameset page), you could create the same functionality in Internet Explorer using only two pages (the primary page including navigation, and the content page within the `<iframe>`). Initially, this was one of the major battlegrounds between Internet Explorer and Netscape Navigator.

The `<iframe>` started to become more popular because it was less work than creating framesets. Netscape countered by introducing `<ilayer>` in version 4, which had very similar features to `<iframe>`. Of course, the `<iframe>` won out and is now an important part of web development. Both Netscape's frames and Microsoft's `<iframe>` were standardized in HTML 4, but Netscape's frames were later obsoleted (deprecated) in HTML5.

## XML and Ajax

Although XML isn't used nearly as much in the web today as many thought it would be, Internet Explorer also led the way with XML support. It was the first browser to support client-side XML parsing and XSLT transformation in JavaScript. Unfortunately, it did so through ActiveX objects representing XML documents and XSLT processors. The folks at Mozilla clearly thought there was something there because they invented similar functionality in the form of `DOMParser`, `XMLSerializer`, and `XSLTProcessor`. The first two are now part of HTML5<sup>[9]</sup>. Although the standards-based JavaScript XML handling is quite different than Internet Explorer's version, it was undoubtedly influenced by IE.

The client-side XML handling was all part of Internet Explorer's implementation of `XMLHttpRequest`, first introduced as an ActiveX object in Internet Explorer 5. The idea was to enable retrieval of XML documents from the server in a webpage and allow JavaScript to manipulate that XML as a DOM. Internet Explorer's version requires you to use `new ActiveXObject("MSXML2.XMLHttp")`, also making it reliant upon version strings and making developers jump through hoops to test and use the most recent version. Once again, Firefox came along and cleaned up the mess up by creating a then-proprietary `XMLHttpRequest` object that duplicated the interface of Internet Explorer's version exactly. Other browsers then copied Firefox's implementation, ultimately leading to Internet Explorer 7 creating an ActiveX-free version as well. Of course, `XMLHttpRequest` was the driving force behind the Ajax revolution that got everybody excited about JavaScript.

## CSS

When you think of CSS, you probably don't think much about Internet Explorer. After all, it's the one that tends to lag behind in CSS support (at least up to Internet Explorer 10). However, Internet Explorer 3 was the first browser to implement CSS. At the time, Netscape was pursuing an alternate proposal, JavaScript Style Sheets (JSSS)<sup>[10]</sup>. As the name suggested, this proposal used JavaScript to define stylistic information about the page. Netscape 4 introduced JSSS and CSS, a full version behind Internet Explorer. The CSS implementation was less than stellar, often translating styles into JSSS in order to apply them properly<sup>[11]</sup>. That also meant that if JavaScript was disabled, CSS didn't work in Netscape 4.

While Internet Explorer's implementation of CSS was limited to font family, font size, colors, backgrounds, and margins, the implementation was solid and usable. Meanwhile, Netscape 4&#8242;s implementation was buggy and hard to work with. Yes, in some small way, Internet Explorer led to the success of CSS.

The box model, an important foundation of CSS, was heavily influenced by Internet Explorer. Their first implementation in Internet Explorer 5 interpreted `width` and `height` to mean that the element should be that size in total, including padding and border. This came to be known as `border-box` sizing. The W3C decided that the appropriate box sizing method was `content-box`, where `width` and `height` specified only the size of the box in which the content lived so that padding and border added size to the element. While Internet Explorer switched its standards mode to use the `content-box` approach to match the standard, Internet Explorer 8 introduced the `box-sizing` property as a way for developers to switch back to the `border-box` model. Of course, `box-sizing` was standardized in CSS3<sup>[12]</sup> and some, most notably Paul Irish, recommend that you should change your default `box-sizing` to `border-box`<sup>[13]</sup>.

Internet Explorer also brought us other CSS innovations that ended up being standardized:

  * `text-overflow` &#8211; used to show ellipses when text is larger than its container. First appeared in Internet Explorer 6 and standardized in CSS3<sup>[14]</sup>. Now supported in all major browsers.
  * `overflow-x` and `overflow-y` &#8211; allows you to control overflow in two separate directions of the container. This property first appeared in Internet Explorer 5 and later was formalized in CSS3<sup>[15]</sup>. Now supported in all major browsers.
  * `word-break` &#8211; used to specify line breaking rules between words. Originally in Internet Explorer 5.5 and now standardized in CSS3<sup>[16]</sup>. Supported in all major browsers except Opera.
  * `word-wrap` &#8211; specifies whether the browser should break lines in the middle of words are not. First created for Internet Explorer 5.5 and now standardized in CSS3 as `overflow-wrap`<sup>[17]</sup>, although all major browsers support it as `word-wrap`.

Additionally, many of the new CSS3 visual effects have Internet Explorer to thank for laying the groundwork. Internet Explorer 4 introduced the proprietary `filter` property making it the first browser capable of:

  * Generating gradients from CSS instructions (CSS3: gradients)
  * Creating semitransparent elements with an alpha filter (CSS3: `opacity` and RGBA)
  * Rotating an element an arbitrary number of degrees (CSS3: `transform` with `rotate()`)
  * Applying a drop shadow to an element (CSS3: `box-shadow`)
  * Applying a matrix transform to an element (CSS3: `transform` with `matrix()`)

Additionally, Internet Explorer 4 had a feature called transitions, which allowed you to create some basic animation on the page using filters. The transitions were mostly based on the transitions commonly available in PowerPoint at the time, such as fading in or out, checkerboard, and so on<sup>[18]</sup>. 

All of these capabilities are featured in CSS3 in one way or another. It's pretty amazing that Internet Explorer 4, released in 1997, had all of these capabilities and we are now just starting to get the same capabilities in other browsers.

## Other HTML5 contributions

There is a lot of HTML5 that comes directly out of Internet Explorer and the APIs introduced. Here are some that have not yet been mentioned in this post:

  * **Drag and Drop** &#8211; one of the coolest parts of HTML5 is the definition of native drag-and-drop<sup>[19]</sup>. This API originated in Internet Explorer 5 and has been described, with very few changes, in HTML5. The main difference is the addition of the `draggable` attribute to mark arbitrary elements as draggable (Internet Explorer used a JavaScript call, `element.dragDrop()` to do this). Other than that, the API closely mirrors the original and is now supported in all major desktop browsers.
  * **Clipboard Access** &#8211; now split out from HTML5 into its own spec<sup>[20]</sup>, grants the browser access to the clipboard in certain situations. This API originally appeared in Internet Explorer 6 and was then copied by Safari, who moved `clipboardData` off of the `window` object and onto the `event` object for clipboard events. Safari's change was kept as part of the HTML5 version and clipboard access is now available in all major desktop browsers except for Opera.
  * **Rich Text Editing** &#8211; rich text editing using `designMode` was introduced in Internet Explorer 4 because Microsoft wanted a better text editing experience for Hotmail users. Later, Internet Explorer 5.5 introduced `contentEditable` As a lighter weight way of doing rich text editing. Along with both of these came the dreaded `execCommand()` method and its associated methods. For better or worse, this API for rich text editing was standardized in HTML5<sup>[21]</sup> and is currently supported in all major desktop browsers as well as Mobile Safari and the Android browser.

## Conclusion

While it's easy and popular to poke at Internet Explorer, in reality, we wouldn't have the web as we know it today if not for its contributions. Where would the web be without `XMLHttpRequest` and `innerHTML`? Those were the very catalysts for the Ajax revolution of web applications, upon which a lot of the new capabilities have been built. It seems funny to look back at the browser that has become a &#8220;bad guy&#8221; of the Internet and see that we wouldn't be where we are today without it.

Yes, Internet Explorer had its flaws, but for most of the history of the Internet it was the browser that was pushing technology forward. Now that were in a period with massive browser competition and innovation, it's easy to forget where we all came from. So the next time you run into people who work on Internet Explorer, instead of hurling insults and tomatoes, say thanks for helping to make the Internet what it is today and for making web developers one of the most important jobs in the world.

**Update (23-August-2012):** Added mention of `box-sizing` per Sergio's comment. Added mention of `<iframe>` per Paul's comment.

**Update (10-September-2012):** Added mention of Internet Explorer 3 support for margins based on Chris' comment.

## Translations

  * [Spanish][1]


  1. [innerHTML in HTML5][2]
  2. [textContent in DOM Level 3][3]
  3. [insertAdjacentHTML() in HTML5][4]
  4. [Event Handlers on Elements][5] (HTML5)
  5. [mouseenter][6] (DOM Level 3 Events)
  6. [mouseleave][7] (DOM Level 3 Events)
  7. [focusin][8] (DOM Level 3 Events)
  8. [focusout][9] (DOM Level 3 Events)
  9. [DOMParser interface][10] (HTML5) 
 10. [JavaScript Style Sheets][11] (Wikipedia)
 11. [The CSS Saga][12] by Håkon Wium Lie and Bert Bos
 12. [box-sizing property][13] (CSS3 UI)
 13. [* { box-sizing: border-box } FTW][14] (Paul Irish)
 14. [text-overflow property][15] (CSS3 UI)
 15. [overflow-x and overflow-y][16] (CSS3 Box)
 16. [word-break][17] (CSS3 Text)
 17. [overflow-wrap/word-wrap][18] (CSS3 Text)
 18. [Introduction to Filters and Transitions][19] (MSDN)
 19. [Drag and Drop][20] (HTML5)
 20. [Clipboard API and Events][21] (HTML5)
 21. [User Interaction &#8211; Editing][22] (HTML5)

 [1]: http://www.desarrolloweb.com/articulos/innovaciones-internet-explorer.html
 [2]: http://www.w3.org/TR/html5/apis-in-html-documents.html#innerhtml
 [3]: http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-textContent
 [4]: http://html5.org/specs/dom-parsing.html#insertadjacenthtml()
 [5]: http://www.whatwg.org/specs/web-apps/current-work/multipage/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects
 [6]: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseenter
 [7]: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseleave
 [8]: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focusIn
 [9]: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focusOut
 [10]: http://html5.org/specs/dom-parsing.html#the-domparser-interface
 [11]: http://en.wikipedia.org/wiki/JavaScript_Style_Sheets
 [12]: http://www.w3.org/Style/LieBos2e/history/
 [13]: http://dev.w3.org/csswg/css3-ui/#box-sizing
 [14]: http://paulirish.com/2012/box-sizing-border-box-ftw/
 [15]: http://www.w3.org/TR/css3-ui/#text-overflow0
 [16]: http://dev.w3.org/csswg/css3-box/#overflow-x
 [17]: http://dev.w3.org/csswg/css3-text/#word-break
 [18]: http://dev.w3.org/csswg/css3-text/#word-wrap
 [19]: http://msdn.microsoft.com/en-us/library/ms532847(v=vs.85).aspx
 [20]: http://www.w3.org/TR/html5/dnd.html#dnd
 [21]: http://dev.w3.org/2006/webapi/clipops/
 [22]: http://www.w3.org/TR/html5/editing.html#editing-0
