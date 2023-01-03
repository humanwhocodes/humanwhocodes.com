---
title: Introducing JSONLib
author: Nicholas C. Zakas
permalink: /blog/2008/01/15/introducing-jsonlib/
categories:
  - Web Development
tags:
  - JavaScript
  - JSON
  - JSONLib
---
A little while ago, I was complaining about the proposed JSON extensions to JavaScript 2.0 (<a title="Keep JSON out of JavaScript" rel="internal" href="https://humanwhocodes.com/archive/2007/9/484">Keep JSON out of JavaScript</a>). At that time, <a title="DHTML Kitchen" rel="external" href="http://www.dhtmlkitchen">Garrett</a> challenged me to come up with a better way of doing it. He was right, it's pointless to complain about something without suggesting a solution. Since that time, I've been formulating a new way of dealing with JSON in JavaScript, and I'm proud to share that with you now.

I've patterned this after my favorite extension to JavaScript, <a title="ECMA-357" rel="external" href="http://www.ecma-international.org/publications/standards/Ecma-357.htm">ECMAScript for XML</a>. Without writing up a complete specification (which I am in the process of doing), here's the basics:

  * The addition of two new global types: `JSON` and `JSONList`. `JSON` represents a JSON object while `JSONList` represents a JSON array.
  * Both types have a `toJSONString()` method that correctly encodes an object into a JSON string. The default `toString()` method is available but returns a string representation of the object (not a JSON string). This follows the convention set forth in E4X.
  * The `[[Put]]` method is overridden in both types such that it will only accept values of type `JSON`, `JSONList`, `Date`, boolean, string, number, or `null`. Any other data types cause an error to be thrown.
  * The `JSON` constructor allows an object to be passed in that has initial properties to add; the `JSONList` constructor allows an array to be passed in with items to add.
  * The `typeof` operator should return &#8220;json&#8221; when used on a value of type `JSON` or `JSONList`.
  * JSON strings are parsed via `JSON.parse()`, throwing syntax errors if they are found.

This description, while interesting, is less riveting than having code to play with. So, I've implemented as much as I could in a library called <a title="JSONLib" rel="internal" href="https://humanwhocodes.com/downloads/JSONLib0.1.zip">JSONLib</a>. I'm going to call this version 0.1 alpha &#8211; this is an experimental implementation that is not intended for use in production environments. If there's enough interest, I'll update it, make it more bullet-proof, and create a compressed version for distribution. Right now, though, it's just a proof of concept.

Since you cannot override `[[Put]]` or `[[Get]]` from JavaScript, I've had to include `put()` and `get()` methods on both `JSON` and `JSONList`. It's a little bit annoying, but ultimately works. Here's a few example use cases:

<code class="block"> </code>

<pre>var obj = JSON.parse("{"name":"Nicholas","age":29}");

var json = new JSON();
json.put("name", "Nicholas");
json.put("age", 29);
var name = json.get("name");
var str = json.toJSONString();

var list = new JSONList();
list.put(0, "blah");
list.push(25);
list.push(true);
var val = list.get(1);
var len = list.getLength();
var str = list.toJSONString();

var json = new JSON({name:"Nicholas"});
var name = json.get("name");

var list = new JSONList([1, 2, 3, 4]);
var val = list.get(2);
list.push(function(){}); //throws error</pre>

A word of warning: this takes a little getting used to. It is slightly more verbose than the current methods for using JSON in JavaScript, however, I believe this solution keeps JSON out of the core of JavaScript and maintains useful access to JSON parsing and serialization. The key to understanding this approach is that `JSON` and `JSONList` are purely data storage objects without any additional functionality. They have one job and they do it well. Make sure you only use `put()` or other methods to add values to the objects instead of just assigning new properties.

As this is experimental, I've included no documentation or examples. I have included a page filled with unit tests that ensure proper behavior in browsers. Before trying to use the library, please run the tests to ensure that it will work in your browser. If it doesn't, let me know the results and I'll try to fix the bugs. The source code is completely commented, so it should be easy to follow.

Some disclaimers and various notes: the parsing functionality is based on Douglas Crockford's original JSON parser written in JavaScript. As such, it is slower than using `eval()`. I believe the tradeoff is worth it because it is also far more secure than using `eval()`, eliminating the possibility that code will be executed while parsing JSON. Also, there is no other JavaScript library required to make this work; it is completely standalone.

So please, go forth and experiment. See if this is something you'd like to use and let me know. Enjoy!
