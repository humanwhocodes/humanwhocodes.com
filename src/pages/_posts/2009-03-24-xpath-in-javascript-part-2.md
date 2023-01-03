---
title: XPath in JavaScript, Part 2
author: Nicholas C. Zakas
permalink: /blog/2009/03/24/xpath-in-javascript-part-2/
categories:
  - Web Development
tags:
  - DOM
  - JavaScript
  - XML
  - XPath
---
In my [last post][1], I introduced DOM Level 3 XPath support in Firefox, Safari, Chrome, and Opera. Missing from that post was a discussion about namespaces and namespace resolution in XPath. If you're simply using XPath to query an HTML document, then the namespace resolver argument for `evaluate()` will always be `null`; if you intend to use XPath on an XML document containing namespaces, then you'll need to learn how to create and use namespace resolvers.

Every namespace URI is mapped to a specific prefix defined in the XML document with the exception of the default namespace, which doesn't require a prefix. A namespace resolver performs the mapping between namespace prefix and namespace URI for the XPath engine. There are two ways to create namespace resolvers. The first is to create a function that accepts the namespace prefix as an argument and returns the appropriate URI. For example:

    function resolver(prefix){
        switch(prefix){
            case "wrox": return "http://www.wrox.com/";
            case "ncz": return "https://humanwhocodes.com/";
            default: return "http://www.yahoo.com/";
        }
    }

This approach may work if you already have the prefixes and namespace URIs handy. When the default namespace is going to be resolved, an empty string is passed into the function.

The second approach is to create a namespace resolver using a node that contains namespace information, such as:

    <books xmlns:wrox="http://www.wrox.com/" xmlns="http://www.amazon.com/">
        <wrox:book>Professional JavaScript</book>
    </books>

The `<books>` element contains all of the namespace information for this XML snippet. You can pass a reference to this node into the `XPathEvaluator` object's `createNSResolver()` method and get a namespace resolver automatically created:

    var evaluator = new XPathEvaluator();
    var resolver = evaluator.createNSResolver(xmldoc.documentElement);

This approach is more useful when the namespace information is embedded in the XML document, in which case it doesn't make sense to duplicate that information and too tightly couple the JavaScript to the XML document.

Using either approach, you can easily evaluate XPath expressions on XML documents that have namespaces:

    var evaluator = new XPathEvaluator();
    var resolver = evaluator.createNSResolver(xmldoc.documentElement);
    var result = evaluator.evaluate("wrox:book", xmldoc.documentElement,
                     resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (result){
        alert(result.singleNodeValue.firstChild.nodeValue);
    }
    

If you don't provide a namespace resolver when an XPath query is run against a document that uses namespaces, then an error will occur.

Once again, this information is valid for Firefox, Safari, Chrome, and Opera; Internet Explorer does not natively support DOM Level 3 XPath. It does remain an option in other browsers, though, for super fast DOM querying.

 [1]: https://humanwhocodes.com/blog/2009/03/17/xpath-in-javascript-part-1/
