---
title: XPath in JavaScript, Part 1
author: Nicholas C. Zakas
permalink: /blog/2009/03/17/xpath-in-javascript-part-1/
categories:
  - Web Development
tags:
  - DOM
  - JavaScript
  - XML
  - XPath
---
XPath is one of those things you don&#8217;t hear too much about these days. In the days when XML ruled, XPath was very important to developers as a means of random access within a large structure. Since JSON was popularized, XPath has gotten less and less attention, but there is still fairly good support for XPath queries in browsers. Few people know about it, fewer people use it, and thus there&#8217;s not a lot of written information available. I hope this post helps to fill that gap.

For those that are unaware, [DOM Level 3 XPath][1] specifies the interfaces that are implemented by Firefox, Safari, Chrome, and Opera. The central interface is `XPathEvaluator`, which contains methods for working with XPath expressions. The primary method is `evaluate()`, which accepts five arguments: the XPath query string, the node from which the query should begin, a namespace resolver (discussed later), the type of result to return, and an optional result object onto which the new results should be added. The last argument is rarely used since the result is also returned as the value of `evaluate()`.

There are 10 different result types, each represented by a constant on the `XPathResult` object. They are (excerpted from [Professional JavaScript, 2nd Edition][2]):

  * `XPathResult.ANY_TYPE` &#8211; Returns the type of data appropriate for the XPath expression
  * `XPathResult.ANY_UNORDERED_NODE_TYPE` &#8211; Returns a node set of matching nodes, although the order may not match the order of the nodes within the document
  * `XPathResult.BOOLEAN_TYPE` &#8211; Returns a Boolean value
  * `XPathResult.FIRST_ORDERED_NODE_TYPE` &#8211; Returns a node set with only one node, which is the first matching node in the document
  * `XPathResult.NUMBER_TYPE` &#8211; Returns a number value
  * `XPathResult.ORDERED_NODE_ITERATOR_TYPE` &#8211; Returns a node set of matching nodes in the order in which they appear in the document. This is the most commonly used result type.
  * `XPathResult.ORDERED_NODE_SNAPSHOT_TYPE` &#8211; Returns a node set snapshot, capturing the nodes outside of the document so that any further document modification doesnâ€™t affect the result set. The nodes in the result set are in the same order as they appear in the document.
  * `XPathResult.STRING_TYPE` &#8211; Returns a string value
  * `XPathResult.UNORDERED_NODE_ITERATOR_TYPE` &#8211; Returns a node set of matching nodes, although the order may not match the order of the nodes within the document
  * `XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE` &#8211; Returns a node set snapshot, capturing the nodes outside of the document so that any further document modification doesnâ€™t affect the node set. The nodes in the node set are not necessarily in the same order as they appear in the document.

The information returned from `evaluate()` depends wholly on the result type requested. The simplest results return a single value (Boolean, Node, Number, and String) while the more complex ones return multiple nodes. When called, `evaluate()` returns an `XPathResult` object. This object&#8217;s properties contain the result of the evaluation. There is a property for each type of simple result: `booleanValue`, `singleNodeValue`, `numberValue`, and `stringValue`. Additionally, there is a `resultType` property whose value maps to one of the `XPathResult` constants. This is useful in determining the type of result when using `XPathResult.ANY_TYPE`. If there is no matching result, `evaluate()` returns `null`.

To perform an XPath query, you&#8217;ll need to use an `XPathEvaluator` object. You can either create a new instance or use a built-in one. Creating your own means instantiating `XPathEvaluator` (Opera only implemented this as of version 9.5):

    var evaluator = new XPathEvaluator();
    
    //get first div
    var result = evaluator.evaluate("//div", document.documentElement, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    alert("First div ID is " + result.singleNodeValue.id);

In Firefox, Safari, Chrome, and Opera, all instances of `Document` also implement the `XPathEvaluator` interface, which means you can access `document.evaluate()` if you want to query the HTML page. If you load an XML document via `XMLHttpRequest` or another mechanism, the `evaluate()` method is also available. For example:

    //get first div
    var result = document.evaluate("//div", document.documentElement, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    alert("First div ID is " + result.singleNodeValue.id);

Note that you cannot use `document.evaluate()` outside of `document`; you can use an instance of `XPathEvaluator` any document.

There are two ways to return multiple nodes, via iterator or snapshot. Iterator results are still tied to the document, so any changes made will automatically be reflected in the result set. Snapshot results, on the other hand, take the results at that point in time and are not affected by further document augmentation. Both result types require you to iterate over the results. For iterator results, you&#8217;ll need to use the `iterateNext()` method, which will either return a node or `null` (this works for both ordered and unordered iterator results):

    //get all divs - iterator style
    var result = document.evaluate("//div", document.documentElement, null,
                     XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    if (result){
        var node = result.iterateNext();
        while(node) {
            alert(node.id);
            node = result.iterateNext();
        }
    }

For snapshot results, you can use the `snapshotLength` property to determine how many results were returned and the `snapshotItem()` method to retrieve a result in a specific position. Example (this works for both ordered and unordered snapshot results):

    //get all divs - iterator style
    var result = document.evaluate("//div", document.documentElement, null,
                     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (result){
        for (var i=0, len=result.snapshotLength; i < len; i++) {
            alert(result.snapshotItem(i).id);
        }
    }</code>

In most cases, a snapshot result is preferable to an iterator result because the connection with the document has been severed; every call to `iterateNext()` re-executes the XPath query on the document and so is much slower. In short, iterator results have the same performance implications as using `HTMLCollection` objects, which also query the document repeatedly.

Compared to walking the DOM manually, XPath queries are incredibly fast and so they are used in several JavaScript-based CSS query engines to speed up their execution. Anytime you are looking for a specific node or set of nodes buried inside of a document, consider using XPath to speed up the process in Firefox, Safari, Chrome, and Opera (Internet Explorer doesn&#8217;t support DOM 3 XPath).

 [1]: http://www.w3.org/TR/DOM-Level-3-XPath/
 [2]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
