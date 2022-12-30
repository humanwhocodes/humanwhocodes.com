---
title: 'Mozilla JavaScript extension: __noSuchMethod__'
author: Nicholas C. Zakas
permalink: /blog/2009/02/17/mozilla-javascript-extension-nosuchmethod/
categories:
  - Web Development
tags:
  - JavaScript
  - Mozilla
---
Mozilla's JavaScript engines have always been a bit different than those from other companies. SpiderMonkey and its Java port, Rhino, had long contained extra features designed to make JavaScript more robust. One such feature is the `__noSuchMethod__()` method that is available on native objects. In most JavaScript engines, calling a method that doesn't exist simply results in an error; in Mozilla engines, this is only the default behavior. You can override that behavior by defining a `__noSuchMethod__()` method on the object. This method executes whenever an undefined method is called on the object.

When called, the `__noSuchMethod__()` method receives two arguments: the name of the method that was called and an array of arguments that were passed to that method. Note that the array of arguments is an instance of `Array` (not an `arguments` object) and is always passed even if there are no arguments. A simple example:

    //Works in Mozilla JavaScript engines only!
    var person = {
        name: "Nicholas",
        __noSuchMethod__: function(name, args){
            alert("Method called '" + name +
                "' executed with arguments [" + args + "]");
        }
    }
    
    
    //"Method called 'sayName' executed with arguments []"
    person.sayName();       
    
    //"Method called 'phone' executed with arguments [Mike]"
    person.phone("Mike");   

This code defines a variable `person` with a `__noSuchMethod__()` method defined. When the methods `sayName()` and `phone()` are called on the object, the `__noSuchMethod__()` method is called instead, preventing an error and allowing other handling. In this case, I'm just displaying the name of the method and the arguments that were passed in.

Of course, normal programming practices don't involve methods that you're unaware of until runtime; that would just be plain confusing. This isn't something you'd even want to do on a regular basis. It does, however, open up some interesting possibilities for dynamic utilities. Consider creating an object that helps to output valid XHTML:

    function HTMLWriter(){
        this._work = [];
    }
    
    HTMLWriter.prototype = {
    
        escape: function (text){
            return text.replace(/[><"&]/g, function(c){
                switch(c){
                    case ">": return ">";
                    case "<": return "<";
                    case "\"": return """;
                    case "&": return "&";
                }
            });
        },
    
        startTag: function(tagName, attributes){
            this._work.push("<" + tagName);
    
            if (attributes){
                var name, value;
                for (name in attributes){
                    if (attributes.hasOwnProperty(name)){
                        value = this.escape(attributes[name]);
                        this._work.push(" " + name + "=\"" + value + "\"");
                    }
                }
            }
    
            this._work.push(">");
        },
    
        text: function(text){
            this._work.push(this.escape(text));
        },
    
        endTag: function(tagName){
            this._work.push("<!--" + tagName + "-->");
        },
    
        toString: function(){
            return this._work.join("");
        }
    
    };
    
    var writer = new HTMLWriter();
    writer.startTag("html");
    writer.startTag("head");
    writer.startTag("title");
    writer.text("Example & Test");
    writer.endTag("title");
    writer.endTag("head");
    writer.startTag("body", { style: "background-color: red" });
    writer.text("Hello world!");
    writer.endTag("body");
    writer.endTag("html");
    
    alert(writer);

This code does the job using three methods: `startTag()`, `endTag()`, and `text()`. The usage is a bit verbose. Imagine if, instead of using `startTag()` and `endTag()`, there was a method for each valid XHTML tag. Your usage might look something like this:

    var writer = new HTMLWriter();
    var result = writer.html()
        .head().title().text("Example & Test").xtitle().xhead()
        .body().text("Hell world!").xbody()
    .xhtml().toString();

Since all tags behave more or less the same, you'd be forced to create what amounts to duplicate methods on the `HTMLWriter` object, which is incredibly wasteful. This is where the true power of `__noSuchMethod__()` comes in. Look at how simple the code becomes for such an implementation:

<pre>function HTMLWriter(){
    this._work = [];
}

HTMLWriter.prototype = {

    escape: function (text){
        return text.replace(/[&gt;&lt;"&]/g, function(c){
            switch(c){
                case "&gt;": return "&gt;";
                case "&lt;": return "&lt;";
                case "\"": return """;
                case "&": return "&";
            }
        });
    },

    text: function(text){
        this._work.push(this.escape(text));
        return this;
    },

    toString: function(){
        return this._work.join("");
    },

    __noSuchMethod__: function(name, args){
        var tags = [
            "a", "abbr", "acronym", "address", "applet", "area",
            "b", "base", "basefont", "bdo", "big", "blockquote",
            "body", "br", "button",
            "caption", "center", "cite", "code", "col", "colgroup",
            "dd", "del", "dir", "div", "dfn", "dl", "dt",
            "em",
            "fieldset", "font", "form", "frame", "frameset",
            "h1", "h2", "h3", "h4", "h5", "h6", "head", "hr", "html",
            "i", "iframe", "img", "input", "ins", "isindex",
            "kbd",
            "label", "legend", "li", "link",
            "map", "menu", "meta",
            "noframes", "noscript",
            "object", "ol", "optgroup", "option",
            "p", "param", "pre",
            "q",
            "s", "samp", "script", "select", "small", "span", "strike",
            "strong", "style", "sub", "sup",
            "table", "tbody", "td", "textarea", "tfoot", "th", "thead",
            "title", "tr", "tt",
            "u", "ul",
            "var"
        ];

        var closeTag = (name.charAt(0) == "x"),
            tagName = closeTag ? name.substring(1) : name;

        if (tags.indexOf(tagName) &gt; -1){
            if (!closeTag){
                this._work.push("&lt;" + tagName);

                if (args.length){
                    var attributes = args[0],
                        name, value;
                    for (name in attributes){
                        if (attributes.hasOwnProperty(name)){
                            value = this.escape(attributes[name]);
                            this._work.push(" " + name + "=\"" +
                                 value + "\"");
                        }
                    }
                }

                this._work.push("&gt;");
            } else {
                this._work.push("<!--" + tagName + "-->");
            }
            return this;
        } else {
            throw new Error("Method '" + name + "' is undefined.");
        }

    }

};</pre>

The majority of the work in this implementation is done in `__noSuchMethod__()`. It contains an array of all valid XHTML tags that is used to lookup the method that was called. Since closing the tag requires an &#8216;x' at the front of the method, a check is done to see if this is the first character. If so, then the `closeTag` flag is set and the &#8216;x' is stripped off of the tag name before proceeding. Next, the Mozilla array extension `indexOf()` is used to determine if the tag name matches the known list. If the tag name is invalid, an error is thrown; otherwise, normal processing occurs. The number of supported tags is completely dynamic, and new &#8220;methods&#8221; can be added or removed simply by modifying the list of tags.

Clearly, this isn't something that can be used on a regular basis as it's not cross-browser It does, however, open the door for some interest possibilities if you're running JavaScript through a Mozilla engine either in Firefox or elsewhere. The `__noSuchMethod__()` method is a powerful ally in the development of dynamic JavaScript interfaces.

## Translations

  * [Simplified Chinese][1]

 [1]: http://cuimingda.com/2009/02/mozilla-javascript-nosuchmethod.html
