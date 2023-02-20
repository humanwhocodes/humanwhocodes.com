---
title: XPath in JavaScript, Part 3
author: Nicholas C. Zakas
permalink: /blog/2009/04/04/xpath-in-javascript-part-3/
categories:
  - Web Development
tags:
  - Internet Explorer
  - JavaScript
  - XPath
---
In my previous [two][1] [posts][2], I talked about the DOM Level 3 XPath JavaScript implementation available in Firefox, Safari, Chrome, and Opera. Internet Explorer as of version 8 still hasn't implemented this feature set, but it does have some support for XPath. Unlike the other browsers, Internet Explorer's XPath functionality is available on XML documents and can't be used on the `document` object.

## Creating XML documents

There are three basic ways of creating XML documents in Internet Explorer. The first is to create an XML DOM document object directly. Internet Explorer uses an ActiveX library called MSXML to implement XML support in JavaScript, so you need to create an `ActiveXObject` instance and pass in the correct identifier. Microsoft recommends using one of the following three: `MSXML2.DOMDocument.6.0`, `MSXML2.DOMDocument.3.0`, and `MSXML2.DOMDocument`. Of course, there is no way to detect which is the correct version to use directly, so you need to attempt to create each. When an ActiveX object fails to be created, it throws an error, which must be trapped to know that this is not the version to use. Ultimately, you end up with a function that looks something like this (excerpted from [Professional JavaScript, 2nd Edition][3]):

    function createDocument(){
        if (typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.DOMDocument.6.0",
                            "MSXML2.DOMDocument.3.0",
                            "MSXML2.DOMDocument"];
    
            for (var i=0,len=versions.length; i < len; i++){
                try {
                    var xmldom = new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    return xmldom;
                } catch (ex){
                    //skip
                }
            }
        }
    
        return new ActiveXObject(arguments.callee.activeXString);
    }

Once you have an XML DOM document instance, you can fill it with XML using either `loadXML()` and passing in an XML string or by using `load()` and passing in the URL of an XML file. The latter should be avoided in favor of using the `XMLHttpRequest` object.

    var xmldoc = createDocument();
    xmldoc.loadXML("");

The second way to create an XML document is to request the XML via `XMLHttpRequest` and access the `responseXML` property. This property contains a DOM document whenever the server's response has a content type of `text/xml`. The DOM document is created for you using the most recent (and appropriate) MSXML version.

    var xhr = new XMLHttpRequest(),
        xmldoc;
    xhr.open("get", "data.xml", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status < 300){
                xmldoc = xhr.responseXML;
            }
    };
    xhr.send(null);

This is the most-often used approach to loading XML into a JavaScript object, largely because it's supported across all browsers.

The third way to create an XML document in Internet Explorer is to use the `<xml>` tag. This proprietary extension allows you to embed XML right inside of an HTML page; Microsoft calls these [XML data islands][4]. Using the `<xml>` tag requires that you either set its `src` attribute to an XML file or include the XML data inline. Examples:

    <xml id="myXML" src="data.xml"></xml>
    
    <xml id="books">
        <books>
            <book>
                <title>Professional JavaScript</title>
                <edition>2nd</edition>
                <author>Nicholas C. Zakas</author>
            </book>
            <book>
                <title>Professional Ajax</title>
                <edition>2nd</edition>
                <author>Nicholas C. Zakas</author>
                <author>Jeremy McPeak</author>
                <author>Joe Fawcett</author>
            </book>
        </books>
    </xml>

With an `<xml>` tag in the page, you can get a reference to its DOM document object using the `XMLDocument` property:

    var xmldoc = document.getElementById("myXML").XMLDocument;

As with the `XMLHttpRequest` object, this approach will automatically create the correct ActiveX version of an XML document. XML data islands are rarely used because they are IE-specific.

## XPath support

All XML DOM document objects in Internet Explorer have built-in support for XPath via two methods: `selectSingleNode()` and `selectNodes()`. Each method accepts an XPath expression as an argument and returns the first matching node and a `NodeSet` of all matching nodes, respectively. If there are no matching nodes, `selectSingleNode()` returns `null` while `selectNodes()` returns an empty `NodeList` object. Every element in the document has these two methods, making it easy to execute an XPath query in the correct context. Before using these methods, though, it's recommended to set the selection language of the XML DOM document to be XPath. This is necessary to avoid some of the nuanced differences between Microsoft's first XPath implementation (which came before the specification was final) and the W3C recommendation:

    xmldoc.setProperty("SelectionLanguage", "XPath");

XPath will work without setting this property, but there are small differences that may cause issues without it. After setting the property, you can use XPath queries in the same format as other browsers:

    var books = xmldoc.documentElement.selectNodes("//book");
    var secondBook = xmldoc.documentElement.selectSingleNode("//book[2]");
    var secondAuthor = secondBook.selectSingleNode("author[2]");

Note that unlike the W3C's XPath interfaces, Internet Explorer will only ever return a single node or a `NodeSet`; there are no other possible return types, so you can't run queries that return non-node values such as those using `count()`.

## Namespace support

By default, Internet Explorer's XPath engine doesn't work with namespaces (the same as the DOM Level 3 XPath implementation). Namespace information must be specified ahead of time as a property on the XML DOM document object itself. Consider the following XML code:

    <books xmlns:wrox="http://www.wrox.com/" xmlns="http://www.amazon.com/">
        <wrox:book>Professional JavaScript</book>
    </books>

In order to use XPath queries on this document, you'd first need to define namespace information for the `wrox` and default namespaces. You can do so via the `setProperty()` method, passing in `"SelectionNamespaces"` and a space-separated string of namespace declarations. Example:

    xmldoc.setProperty("SelectionNamespaces", 
        "xmlns:wrox='http://www.wrox.com/' xmlns='http://www.amazon.com/'");
    var book = xmldoc.documentElement.selectSingleNode("wrox:book");

Note that the namespace declarations are in the same format as they appear in the XML. Unfortunately, there is no automatic way to extract the namespace information from the document for use with XPath queries.

## Conclusion

Internet Explorer does have XPath support, but it comes with several caveats. First is that XPath queries only work on XML documents, not on HTML documents and therefore can't be used on `document` to help find elements on the page. Second, the XPath implementation is very basic and allows only basic return types (nodes and `NodeSet` objects). Still, if you're dealing with XML data, XPath remains a fast and convenient way to find specific elements without walking the DOM manually.

 [1]: https://humanwhocodes.com/blog/2009/03/17/xpath-in-javascript-part-1/
 [2]: https://humanwhocodes.com/blog/2009/03/24/xpath-in-javascript-part-2/
 [3]: http://www.amazon.com/gp/product/047022780X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=047022780X
 [4]: http://msdn.microsoft.com/en-us/library/ms766512(VS.85).aspx
