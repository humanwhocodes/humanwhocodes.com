---
title: Why is getElementsByTagName() faster than querySelectorAll()?
author: Nicholas C. Zakas
permalink: /blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/
categories:
  - Web Development
tags:
  - getElementsByTagName
  - JavaScript
  - NodeList
  - querySelectorAll
---
Yesterday, fellow Yahoo and SoundManager creator [Scott Schiller][1] expressed some confusion on Twitter over why `getElementsByTagName("a")` is faster than `querySelectorAll("a")` in nearly all browsers. There a [JSPerf test][2] comparing the two and you can that the speed comparison is fairly pronounced. In the browser I'm using right now, Firefox 3.6.8 on Windows XP, `querySelectorAll("a")` is a shocking 98% slower than `getElementsByTagName("a")`. There was a lively Twitter-sation between myself, Scott, and YUI team member [Ryan Grove][3] about why this and how disappointing but not unexpected this really is. I thought I'd follow up with a longer description of why exactly this happens and why it probably won't change very much.

Before digging into details, there's one very important difference between these two methods, and it's not that one accepts only a tag name and the other accepts a full CSS selector. The big difference is in the return value: the `getElementsByTagName()` method returns a live `NodeList` while `querySelectorAll()` returns a static `NodeList`. This is extremely important to understand.

## Live NodeLists

This is one of the major gotchas of the Document Object Model. The `NodeList` object (also, the `HTMLCollection` object in the HTML DOM) is a special type of object. The [DOM Level 3 spec][4] says about `HTMLCollection` objects:

> <a name="td-live"></a> `NodeList` and `NamedNodeMap` objects in the DOM are *live*; that is, changes to the underlying document structure are reflected in all relevant <span class="noxref"><code>NodeList</code></span> and <span class="noxref"><code>NamedNodeMap</code></span> objects. For example, if a DOM user gets a <span class="noxref"><code>NodeList</code></span> object containing the children of an `Element`, then subsequently adds more children to that element (or removes children, or modifies them), those changes are automatically reflected in the <span class="noxref"><code>NodeList</code></span>, without further action on the user's part. Likewise, changes to a `Node` in the tree are reflected in all references to that <span class="noxref"><code>Node</code></span> in <span class="noxref"><code>NodeList</code></span> and <span class="noxref"><code>NamedNodeMap</code></span> objects.

The `getElementsByTagName()` method returns one of these live collections of elements that are automatically updated whenever the document is changed. Thus, the following is actually an infinite loop:

```js
var divs = document.getElementsByTagName("div"),
    i=0;

while(i < divs.length){
    document.body.appendChild(document.createElement("div"));
    i++;
}
```

The infinite loop occurs because `divs.length` is recalculated each time through the loop. Since each iteration of the loop is adding a new `<div>`, which means `divs.length` is being incremented each time through the loop so `i`, which is also being incremented, can never catch up and terminal condition is never triggered.

These live collections might seems like a bad idea, but they are in place to enable the same objects to be used for `document.images`, `document.forms`, and other similar pre-DOM collections that had become commonplace in browsers.

## Static NodeLists

The `querySelectorAll()` method is different because it is a static `NodeList` instead of a live one. This is indicated in the [Selectors API spec][5]:

> The `NodeList` object returned by the `querySelectorAll()` method <em class="ct">must</em> be static, not live (\[DOM-LEVEL-3-CORE\], section 1.1.1). Subsequent changes to the structure of the underlying document 
> 
> <em class="ct">must not</em> be reflected in the `NodeList` object. This means that the object will instead contain a list of matching `Element` nodes that were in the document at the time the list was created.

So even though the return value of `querySelectorAll()` has the same methods and behaves the same as those returned by `getElementsByTagName()`, they are actually very different. In the former case, the `NodeList` is a snapshot of the document's state at the time the method was called whereas the latter case will always be up to date with the current state of the document. This is *not *an infinite loop:

    var divs = document.querySelectorAll("div"),
        i=0;
    
    while(i < divs.length){
        document.body.appendChild(document.createElement("div"));
        i++;
    }

There is no infinite loop in this case. The value of `divs.length` never changes, so the loop will essentially double the number of `<div>` elements in the document and then exit.

## So why are live NodeLists faster?

Live `NodeList` objects can be created and returned faster by the browser because they don't have to have all of the information up front while static `NodeList`s need to have all of their data from the start. To hammer home the point, the WebKit source code has a separate source file for each type of `NodeList`: [DynamicNodeList.cpp][6] and [StaticNodeList.cpp][7]. The two object types are created in very different ways.

The `DynamicNodeList` object is created by [registering its existence][8] in a cache. Essentially, the overheard to creating a new `DynamicNodeList` is incredibly small because it doesn't have to do any work upfront. Whenever the `DynamicNodeList` is accessed, it must query the document for changes, as evidenced by the [`length` property][9] and the [`item()` method][10] (which is the same as using bracket notation).

Compare this to the `StaticNodeList` object, instances of which are created in another file and then populated with all of the data [inside of a loop][11]. The upfront cost to running a query on the document is much more significant than when using a `DynamicNodeList` instance.

If you take a look at the WebKit source code that actually [creates the return value][11] for `querySelectorAll()`, you'll see that a loop is used to get every result and build up a `NodeList` that is eventually returned.

## Conclusion

The real reason why `getElementsByTagName()` is faster than `querySelectorAll()` is because of the difference between live and static `NodeList` objects. Although I'm sure there are way to optimize this, doing no upfront work for a live `NodeList` will generally always be faster than doing all of the work to create a static `NodeList`. Determining which method to use is highly dependent on what you're trying to do. If you're just searching for elements by tag name and you don't need a snapshot, then `getElementsByTagName()` should be used; if you do need a snapshot of results or you're doing a more complex CSS query, then `querySelectorAll()` should be used.

 [1]: http://www.schillmania.com/
 [2]: http://jsperf.com/queryselectorall-vs-getelementsbytagname
 [3]: http://www.wonko.com
 [4]: http://www.w3.org/TR/DOM-Level-3-Core/core.html#td-live
 [5]: http://www.w3.org/TR/selectors-api/#queryselectorall
 [6]: http://trac.webkit.org/browser/trunk/WebCore/dom/DynamicNodeList.cpp
 [7]: http://trac.webkit.org/browser/trunk/WebCore/dom/StaticNodeList.cpp
 [8]: http://trac.webkit.org/browser/trunk/WebCore/dom/DynamicNodeList.cpp?rev=41093#L48
 [9]: http://trac.webkit.org/browser/trunk/WebCore/dom/DynamicNodeList.cpp?rev=41093#L57
 [10]: http://trac.webkit.org/browser/trunk/WebCore/dom/DynamicNodeList.cpp?rev=41093#L109
 [11]: http://trac.webkit.org/browser/trunk/WebCore/dom/SelectorNodeList.cpp?rev=41093#L61
