---
title: Speed up your JavaScript, Part 4
author: Nicholas C. Zakas
permalink: /blog/2009/02/03/speed-up-your-javascript-part-4/
categories:
  - Uncategorized
tags:
  - DOM
  - JavaScript
  - Performance
  - Reflow
---
Over the past few weeks, I&#8217;ve been exploring the various techniques for speeding up your JavaScript. [Part 1][1] covered how to deal with loops that are doing too much. [Part 2][2] focused on functions that do too much and taught techniques such as queuing and memoization to lighten the workload. [Part 3][3] expanded the conversation to handling recursion both with memoization and switching to an iterative algorithm. Part 4, the last part in this series, focuses on too much DOM interaction.

We all know that the DOM is slow&#8230;really slow&#8230;and that it&#8217;s one of the most common sources of performance issues. What makes it slow is that DOM changes can change the user interface of a page, and redrawing the page is an expensive operation. Too many DOM changes mean a lot of redrawing since each change must be applied sequentially and synchronously to ensure the correct end result. This process is called [reflow][4], and is one of the most expensive functions of a browser. Reflow happens at various points in time:

  * When you add or remove a DOM node.
  * When you apply a style dynamically (such as `element.style.width="10px"`).
  * When you retrieve a measurement that must be calculated, such as accessing `offsetWidth`, `clientHeight`, or any computed CSS value (via `getComputedStyle()` in DOM-compliant browsers or `currentStyle` in IE), while DOM changes are queued up to be made.

They key, then, is to limit the number of reflows that occur on a page via DOM interactions. Most browsers will not update the DOM while JavaScript is executing. Instead, they queue up the DOM interactions and apply them sequentially once the script has finished executing. As with JavaScript execution, the user cannot interact with the browser while a reflow is occurring. (Reflows will happen when the [long-running script dialog][5] is displayed because it represents a break in JavaScript execution, allowing the UI to update.)

There are two basic ways to mitigate reflow based on DOM changes. The first is to perform as many changes as possible outside of the live DOM structure (the part representing visible elements). The classic example is adding a number of DOM nodes into a document:

    for (var i=0; i < items.length; i++){
        var item = document.createElement("li");
        item.appendChild(document.createTextNode("Option " + i);
        list.appendChild(item);
    }

This code is inefficient because it touches the live DOM each time through the loop. To increase performance, you should minimize this number. The best option, in this case, is to create a document fragment as an intermediate placeholder for the created `li` elements and then use that to add all of the elements to their parent:

    var fragment = document.createDocumentFragment();
    for (var i=0; i < items.length; i++){
        var item = document.createElement("li");
        item.appendChild(document.createTextNode("Option " + i);
        fragment.appendChild(item);
    }
    list.appendChild(fragment);

This version of the code touches the live DOM only once, on the last line. Prior to that, the document fragment is used to hold the intermediate results. Since a document fragment has no visual representation, it doesn&#8217;t cause reflow when modified. Document fragments also can&#8217;t be added into the live DOM, so passing it into `appendChild()` actually adds all of the fragment&#8217;s children to `list` rather than the fragment itself.

The second way to avoid unnecessary reflow is to remove a node from the live DOM before operating on it. You can remove a node from the live DOM in two ways: 1) literally remove the node from the DOM via `removeChild()` or `replaceChild()`, or 2) setting the `display` style to `"none"`. Once the DOM modifications have been complete then the process must be reversed and the node must be added back into the live DOM. Another approach to the previous example could be:

    list.style.display = "none";
    for (var i=0; i < items.length; i++){
        var item = document.createElement("li");
        item.appendChild(document.createTextNode("Option " + i);
        list.appendChild(item);
    }
    list.style.display = "";

Setting the list&#8217;s display to &#8220;none&#8221; removes it from the live DOM since it no longer has a visual representation. All of the items can safely be added before setting the display back to its default value.

Another common source of multiple reflows is making changes to an element&#8217;s appearance via the `style` property. For example:

    element.style.backgroundColor = "blue";
    element.style.color = "red";
    element.style.fontSize = "12em";

This code has three style changes&#8230;and also three reflows. A reflow happens with every change in style to this element. If you&#8217;re going to be making a number of changes to an element&#8217;s style, it&#8217;s best to group those in a CSS class and then change the class using JavaScript rather than applying individual style changes manually. For example:

    .newStyle {
        background-color: blue;
        color: red;
        font-size: 12em;
    }

Then the JavaScript becomes a single line:

    element.className = "newStyle";

Changing the class of an element counts allows all of the styles to be applied at once, within a single reflow. This is much more efficient and also more [maintainable][6] in the long run.

Since the DOM is so slow at pretty much everything, it&#8217;s very important to cache results that you retrieve from the DOM. This is important for property access that causes reflow, such as `offsetWidth`, but also important in general. The following, for example, is incredibly inefficient:

    document.getElementById("myDiv").style.left = document.getElementById("myDiv").offsetLeft +
        document.getElementById("myDiv").offsetWidth + "px";
    

The three calls to `getElementById()` here are the problem. Accessing the DOM is expensive, and this is three DOM calls to access the exact same element. The code would better be written as such:

    var myDiv = document.getElementById("myDiv");
    myDiv.style.left = myDiv.offsetLeft + myDiv.offsetWidth + "px";

Now the number of total DOM operations has been minimized by removing the redundant calls. Always cache DOM values that are used more than once to avoid a performance penalty.

Perhaps the most egregious offender of slow property access is the `HTMLCollection` type. This is the type of object that is returned from the DOM anytime a collection of nodes must be represented, and so is the type of the `childNodes` property and is the type returned from `getElementsByTagName()`. An `HTMLCollection` may act like an array in many ways, but it actually is a living, breathing entity that changes as the DOM structure changes. Every time you access a property on an `HTMLCollection` object, it actually queries the DOM for all nodes matching the original criteria once again. That means the following is an infinite loop:

    var divs = document.getElementsByTagName("div");
    for (var i=0; i < divs.length; i++){  //infinite loop
        document.body.appendChild(document.createElement("div"));
    }

This code is an infinite loop because every time a new `div` element is added to the document, the `divs` collection is updated with that new information. That means that `i` will never reach `divs.length` because `divs.length` increases by one every time through the loop. Every time `divs.length` is accessed, it collection is updated, making it far more expensive than accessing a regular array&#8217;s `length` property. When dealing with `HTMLCollection` objects, it&#8217;s best to minimize the number of times you access their properties. You can speed up a loop tremendously by simply caching the `length` in a local variable:

    var divs = document.getElementsByTagName("div");
    for (var i=0, len=divs.length; i < len; i++){  //not an infinite loop
        document.body.appendChild(document.createElement("div"));
    }

This code no longer represents an infinite loop because the value of `len` remains the same through each iteration. Caching the value is also more efficient so that the document isn&#8217;t queried more than once.

This wraps up the &#8220;Speed up your JavaScript&#8221; series. I hope you&#8217;ve learned enough to avoid the long-running script dialog and make your code much faster. A lot of the topics I&#8217;ve covered aren&#8217;t new; I&#8217;m just presenting them all in one place so that others can find this information easily. If you have other topics you&#8217;d like to see me cover, feel free to leave a note in the comments or [contact me][7] directly.

## Translations

  * [Chinese (Simplified)][8][  
    ][8]

 [1]: {{site.url}}/blog/2009/01/13/speed-up-your-javascript-part-1/
 [2]: {{site.url}}/blog/2009/01/20/speed-up-your-javascript-part-2/
 [3]: {{site.url}}/blog/2009/01/27/speed-up-your-javascript-part-3/
 [4]: http://dev.opera.com/articles/view/efficient-javascript/?page=3#reflow
 [5]: {{site.url}}/blog/2009/01/05/what-determines-that-a-script-is-long-running/
 [6]: http://video.yahoo.com/watch/568351/2820297
 [7]: {{site.url}}/contact/
 [8]: http://cuimingda.com/2009/02/speed-up-your-javascript-part-4.html
