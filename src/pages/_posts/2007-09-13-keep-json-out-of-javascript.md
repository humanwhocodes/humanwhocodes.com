---
title: Keep JSON out of JavaScript
author: Nicholas C. Zakas
permalink: /blog/2007/09/13/keep-json-out-of-javascript/
categories:
  - Web Development
tags:
  - JavaScript
  - JSON
---
I've been meaning to blog about this for a while, but just haven't gotten around to it. ECMA-262 is the specification for ECMAScript, which is the core of JavaScript, providing syntax, operators, keywords, default objects, and more. The third edition of ECMA-262 is the one implemented by almost all browser vendors (though to varying degrees of completedness). The fourth edition is currently being developed and will be the basis for JavaScript 2.0, its progress can be tracked at <a title="ECMAScript 4 Wiki" rel="external" href="http://wiki.ecmascript.org/">wiki.ecmascript.org</a>.

While I don't really like ECMAScript 4 for a lot of reasons, the part I really don't like is including <a title="JSON encoding and decoding" rel="external" href="http://wiki.ecmascript.org/doku.php?id=proposals:json_encoding_and_decoding">JSON serialization and parsing</a> as part of the core. ECMAScript has never cared about data formats; there's no native support for XML, why should there be native support for JSON?

Undoubtedly, JSON has been very important to Web 2.0. It is being used everywhere by almost everyone who's doing anything online. I understand that the popularity requires better tools, but I don't believe this is the answer. I think the proposal for a `parseJSON()` method on the String type is ridiculous &#8211; it doesn't make any sense. The String type isn't a parser, it's a string! It shouldn't have any more functionality than is necessary for dealing with strings. Adding the `toJSONString()` method to the Object type also doesn't make sense to me. Since Object is the base of all objects in JavaScript, this means that all objects must implement it, even for objects on which it won't make any sense (think Date, RegExp, Error, etc.).

Is better support for JSON necessary in browsers? Absolutely. The ability to parse JSON without using `eval()` is something that really needs to be provided, but I don't think what's in the ECMAScript 4 specification is the answer. I'd rather see one of the browsers take the lead and provide a generic interface that makes sense. Mozilla started the trend of using having DOMParser and XMLHttpRequest&#8230;take the lead again and create something for JSON that makes so much sense that the other browsers are forced to implement it too.

My please: let's keep data formats out of the JavaScript core. A good programming language shouldn't care about the data formats it uses, instead, it should provide enough functionality so that any data format can be used. This is necessary because data formats come into and out of style frequently, and a programming language shouldn't have to adapt to those trends. JSON, XML, and any other data formats that come along should not be part of any language's core, and certainly not part of JavaScript's core.
