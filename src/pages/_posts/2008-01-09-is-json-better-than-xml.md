---
title: Is JSON better than XML?
author: Nicholas C. Zakas
permalink: /blog/2008/01/09/is-json-better-than-xml/
categories:
  - Web Development
tags:
  - JSON
  - XML
---
Use <acronym title="JavaScript Object Notation">JSON</acronym>, not <acronym title="eXtensible Markup Language">XML</acronym>. You hear it all the time these days. JSON is so much better. It must be because everyone is saying it, right? I&#8217;m starting to think not.

Fellow Yahoo <a title="Douglas Crockford's Wrrrld Wide Web" rel="external" href="http://www.crockford.com">Douglas Crockford</a>, creator/inventor/founder/father of JSON, says that JSON is better than XML. He says it whenever he can (most recently in his post <a title="Does XML have a future?" rel="external" href="http://blog.360.yahoo.com/blog-TBPekxc1dLNy5DOloPfzVvFIVOWMB0li?p=736">Does XML have a future on the web?</a>). It is, of course, natural that he would say that JSON is better than XML; every parent thinks their kid is adorable and quite possibly the smartest kid ever. I&#8217;m just not sure his hypothesis is based in fact.

What really makes one data interchange format better than the other? As long as it serves the needs of the developers using it, then the format can at least be said to be adequate. The primary usage of JSON is for data delivery between browsers and servers. Even though it can technically be stored in files and the like, JSON is rarely used outside of the web environment. XML can also be used for data delivery between browsers and servers but also is stored in files and used to extract data from database. For this comparision, I&#8217;ll just consider the browser/server usage.

**Syntax:** JSON syntax is quite light and definitely less verbose than XML, with all of its start and end tags. When it comes down to pure byte-size, JSON can represent the same data as XML using fewer characters.

**Weight:** Since JSON syntax requires fewer characters, it is lighter on the wire than XML. The question is if this really matters. Any large data set is going to be large regardless of the data format you use. Add to that the fact that most servers gzip or otherwise compress content before sending it out, the difference between gzipped JSON and gzipped XML isn&#8217;t nearly as drastic as the difference between standard JSON and XML.

**Browser Parsing:** On the browser, there&#8217;s no such thing as a JSON parser. However, there is `eval()`, which interprets JavaScript code and returns the result. Since JSON syntax is a subset of JavaScript syntax, a JSON string can be evaluated using `eval()` and quickly turned into an object that is easy to work with and manipulate. XML parsing on the browser is spotty at best. Each browser implements some different way of dealing with XML and none of them are terribly efficient. In the end, the XML ends up as a <acronym title="Document Object Model">DOM</acronym> document that must be navigated to retrieve data. Native JavaScript objects are much easier to work with in JavaScript than DOM documents, although the playing field would level out considerably if every browser supported <a title="Standard ECMA-357" rel="external" href="http://www.ecma-international.org/publications/standards/Ecma-357.htm">ECMAScript for XML (E4X)</a>, which makes working with XML data as easy as working with JavaScript objects.

**Server Parsing:** On the server, parsing is just about equal between JSON and XML. Most server-side frameworks have XML parsing capabilities and many now are starting to add JSON parsing capabilities as well. On the server, these parsers are essentially equal, parsing a text format into an object model. JSON holds no advantage over XML in this realm.

**Querying:** This is where XML really shines. Using XPath, it&#8217;s possible to get direct access to a part of multiple parts of an XML data structure; no such interface exists for JSON. To get data from a JSON structure, you must know exactly where it is or else iterate over everything until you find it.

**Format Changes:** So you have your data in one format but you want it in another. If the data is in XML, you can write an XSLT template and run it over the XML to output the data into another format: HTML, SVG, plain text, comma-delimited, even JSON. XSLT support in browsers is pretty good, even offering JavaScript-level access to it. XSLT support on the server is excellent. When you have data in JSON, it&#8217;s pretty much stuck there. There&#8217;s no easy way to change it into another data format. Of course it&#8217;s possible to walk the structure and do with it as you please, but the built-in support isn&#8217;t there as it is with XSLT for XML.

**Security:** Since the only way to parse JSON into JavaScript objects is to use `eval()`, it opens up a huge security hole. The `eval()` function will execute any arbitrary JavaScript code and so is dangerous to use in production systems. Invalid JSON that contains valid JavaScript code could execute and wreak havoc on an application. The solution, of course, is to build a true JSON parser for browsers, but we&#8217;re not there yet. On the other hand, XML data is completely safe. There is never a possibility that parsing XML data will result in code being executed.

With all of this considered, the two main advantages that JSON has over XML are 1) the speed and ease with which it&#8217;s parsed and 2) the ease of simple data retrieval from JavaScript object. Note that both of these advantages exist on the browser side of things; on the server-side they are essentially equal, unless you take querying and format changes into account, in which case XML is the clear winner. I don&#8217;t think that code size really is an advantage when you&#8217;re talking about gzipped data. I also believe that if ECMAScript for XML is implemented in all browsers, that JSON&#8217;s advantages go away.

So what do you think? Is JSON better than XML?
