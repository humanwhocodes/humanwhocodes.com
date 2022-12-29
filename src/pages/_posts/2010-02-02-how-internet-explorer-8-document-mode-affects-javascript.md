---
title: How Internet Explorer 8 document mode affects JavaScript
author: Nicholas C. Zakas
permalink: /blog/2010/02/02/how-internet-explorer-8-document-mode-affects-javascript/
categories:
  - Web Development
tags:
  - Arrays
  - Internet Explorer
  - JavaScript
---
In a previous post, I talked about Internet Explorer 8&#8242;s wide array of [browser and document modes][1]. Most people are pretty familiar with how the various document modes affect layout in terms of how CSS is implemented, but what has been lost is how the document mode affects the core JavaScript engine in the browser. These changes are somewhat subtle, but important to understand when you&#8217;re working with Internet Explorer 8.

A couple of years ago, Microsoft published a paper called, [JScript Deviations from ES3][2], in which they outlined ways in which the JScript engine (the one power Internet Explorer&#8217;s JavaScript) had deviated from the ECMAScript 3 standard. These deviations are somewhat innocuous, but chances are that you&#8217;ve been bitten by one or more of them at some point in the past. In Microsoft&#8217;s attempt to make Internet Explorer 8 more standards-compliant, the same issues that arose around CSS also arose around JavaScript. They could fix the deviations in JScript, but if the browser were running in IE5 or IE7 document modes, there could be problems as these fixes might be incompatible with the code targeting those browsers.

Microsoft chose to create [versioned features of the JScript engine][3] for Internet Explorer 8. For IE5 and IE7 document modes, the JScript engine acts as it did in the actual Internet Explorer 7, complete with all deviations from ECMAScript 3. When in IE8 document mode, the deviations are gone and you get the full power of the JScript engine.

## Native JSON

Internet Explorer 8&#8242;s JScript engine implements the native `JSON` object object as defined by [ECMAScript 5][4]. The object is only present, however, when the page is running in IE8 document mode. This includes the global `JSON` object as well as methods used for JSON functionality:

  * `Date.prototype.toJSON()`
  * `Number.prototype.toJSON()`
  * `String.prototype.toJSON()`
  * `Boolean.prototype.toJSON()`

The `JSON` object and these methods in IE5 or IE7 document mode are undefined.

**Note:** Even though `Date.prototype.toJSON()` is supported in IE8 document, `Date.prototype.toISOString()` is not implemented. This is strange because they return the same value.

## DOM getters/setters

One of the more curious aspects of the JScript engine is that it implements ECMAScript 5 getters and setters, but [only for DOM objects][5] and not for native JavaScript objects. The implementation is made up of half-baked versions of `Object.defineProperty()` and `Object.getOwnPropertyDescriptor()` that primarily support the get and set properties. For example:

    Object.defineProperty(document.body, "active", {
        set: function(value){
            document.body.className = (value !== false) ? "active" : "";
        },
    
        get: function(){
            return document.body.className == "active";
        }
    
    });
    
    var descriptor = Object.getOwnPropertyDescriptor(document.body, "innerHTML");
    alert(descriptor.get);   //displays function

Both methods are only available in IE8 document mode and do not exist in other document modes.

## Arrays

One of the areas where the JScript implementation really fell apart was in dealing with arrays. Arrays had the most deviations from the ECMAScript 3 standard and were a constant source of headaches for developers. First, if undefined is passed into `join()`, the argument was translated into the string &#8220;undefined&#8221; and that was used to concatenate the items. For example:

    var colors = ["red", "green", "blue"];
    alert(colors.join(undefined));    //"redundefinedgreenundefinedblue" in IE7

When running in IE8 document mode, a value of `undefined` is ignored and the default separator (a comma) is used.

The `unshift()` method, which pushes an item to the front of the array, also had a deviation in JScript. Instead of returning the length of the array after adding the item, it simply returned `undefined`. In IE8 document mode, this has been fixed so that `unshift()` correctly returns the array length.

The last big change to arrays is the ability to properly inherit from the `Array` type. Dean Edwards has a [whole post][6] about trying to create a subtype of `Array` and the problems he encountered. The biggest problem is that assigning an instance of `Array` to be another constructor&#8217;s prototype meant that the `length` property would no longer work. Consider the following:

    function MyArray(){
    }
    
    MyArray.prototype = new Array();
    MyArray.prototype.get = function(i){
        return this[i];
    };
    
    var colors = new MyArray();
    colors.push("red");
    colors.push("green");
    colors.sort();
    alert(colors.get(0));    //"green"
    alert(colors.length);    //in IE7, outputs "0"; in IE8, outputs "2"

In Internet Explorer prior to 8, the `length` property of any `Array` type descendant didn&#8217;t change automatically, and so inheritance was only truly useful only for non-IE browsers. In IE8 document mode, though, the `length` property works as it does in other browsers while IE5 and IE7 document modes use the old deviated behavior.

## Miscellaneous fixes

There&#8217;s a small group of fixes that can&#8217;t really be logically categorized but nonetheless help JScript come more into agreement with other JavaScript implementations. The first is that object literals now allow trailing commas. Prior to Internet Explorer 8, the following would cause a parse error:

    var object = {
        name: "value",
    };

The trailing comma after the last property value is explicitly allowed by ECMAScript 3 syntax and is allowed in all other browsers. IE8 document mode now also supports this syntax correctly (other document modes still throw the error).

Another nice enhancement is that IE8 document mode now allows access to characters in a string via bracket notation:

    var s = "Hello world!";
    alert(s[0]);    //"H"

This brings JScript into line with other JavaScript engines; IE5 and IE7 document modes will still return `undefined`.

Two other changes that likely don&#8217;t affect you but are worth noting:

  * `Number.prototype.toPrecision()` used to throw an error when `undefined` was passed in. IE8 document mode now defaults to calling `Number.prototype.toString()` in this case.
  * `Error.prototype.toString()` has been properly implemented to provide better error messages.

## Conclusion

IE8 document mode offers a whole host of improvements over Internet Explorer 7 not just in CSS but also in JavaScript. If you&#8217;re looking to write the most standards-compliant code possible, make sure your page is being run on Internet Explorer 8 in IE8 document mode (see my previous post for details). Bringing JScript into line with other JavaScript engines is an incredibly important step. It&#8217;s too bad that these details were pretty much overlooked in the Internet Explorer 8 announcements.

 [1]: {{site.url}}/blog/2010/01/19/internet-explorer-8-document-and-browser-modes/
 [2]: http://wiki.ecmascript.org/lib/exe/fetch.php?id=resources%3Aresources&cache=cache&media=resources:jscriptdeviationsfromes3.pdf
 [3]: http://blogs.msdn.com/jscript/archive/2009/04/17/versioning-language-features-in-jscript.aspx
 [4]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
 [5]: http://msdn.microsoft.com/en-us/library/dd229916%28VS.85%29.aspx
 [6]: http://dean.edwards.name/weblog/2006/11/hooray/
