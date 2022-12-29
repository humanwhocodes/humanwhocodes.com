---
title: Experimenting with ECMAScript 6 proxies
author: Nicholas C. Zakas
permalink: /blog/2011/09/15/experimenting-with-ecmascript-6-proxies/
categories:
  - Personal
tags:
  - ECMAScript
  - Harmony
  - JavaScript
  - Proxy
---
ECMAScript 6, aka &#8220;Harmony&#8221;, introduces a new type of object called a proxy. Proxies are objects whose default behavior in common situations can be controlled, eliminated, or otherwise changed. This includes definition what happens when the object is used in a `for-in` look, when its properties are used with `delete`, and so on. 

The behavior of proxies is defined through traps, which are simply functions that &#8220;trap&#8221; a specific behavior so you can respond appropriately. There are several different traps available, some that are fundamental and some that are derived. The fundamental traps define low-level behavior, such as what happens when calling `Object.defineProperty()` on the object, while derived traps define slightly higher-level behavior such as reading from and writing to properties. The fundamental traps are recommended to always be implemented while the derived traps are considered optional (when derived traps are undefined, the default implementation uses the fundamental traps to fill the gap).

My experiments focused largely on the derived `get` trap. The `get` trap defines what happens when a property is read from the object. Think of the `get` trap as a global getter that is called for every property on the object. This made me realize that my [earlier experiments][1] with the proprietary `__noSuchMethod__()` might be applicable. After some tinkering, I ended up with the following HTML writer prototype:

    /*
     * The constructor name I want is HTMLWriter.
     */
    var HTMLWriter = (function(){
    
        /*
         * Lazily-incomplete list of HTML tags.
         */
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
    
        /* 
         * Define an internal-only type. 
         */
        function InternalHTMLWriter(){
            this._work = [];
        }
    
        InternalHTMLWriter.prototype = {
    
            escape: function (text){
                return text.replace(/[>< "&#038;]/g, function(c){
                    switch(c){
                        case ">": return "&gt;";
                        case "< ": return "&lt;";
                        case "\"": return "&quot;";
                        case "&#038;": return "&amp;";
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
                return this;
            },
    
            text: function(text){
                this._work.push(this.escape(text));
                return this;
            },
    
            endTag: function(tagName){
                this._work.push("</" + tagName + ">");
                return this;
            },
    
            toString: function(){
                return this._work.join("");
            }
    
        };
        
        /*
         * Output a pseudo-constructor. It's not a real constructor,
         * since it just returns the proxy object, but I like the
         * "new" pattern vs. factory functions.
         */
        return function(){
            var writer = new InternalHTMLWriter(),    
                proxy = Proxy.create({
    
                    /*
                     * Only really need getter, don't want anything else going on.
                     */
                    get: function(receiver, name){
                        var tagName, 
                            closeTag = false;
                        
                        if (name in writer){
                            return writer[name];
                        } else {
                        
                            if (tags.indexOf(name) > -1){
                                tagName = name;
                            } else if (name.charAt(0) == "x" &#038;&#038; tags.indexOf(name.substring(1)) > -1){
                                tagName = name.substring(1);
                                closeTag = true;
                            }
                            
                            if (tagName){                
                                return function(){
                                    if (!closeTag){
                                        writer.startTag(tagName, arguments[0]);
                                    } else {
                                        writer.endTag(tagName);
                                    }
                                    return receiver;                
                                };
                            }
                        }
                    }
                
                });
                
            return proxy;
        };
    })();
    

This uses the same basic approach as my earlier experiment, which is to define a getter that interprets property names as HTML tag names. When the property matches an HTML tag name, a function is returned that calls the `startTag()` method, likewise a property beginning with an &#8220;x&#8221; and followed by the tag name receives a function that calls `endTag()`. All other methods are passed through to the interal `writer` object.

The `InternalHTMLWriter` type is defined inside of a function so it cannot be accessed outside; the `HTMLWriter` type is the preferred way to use this code, making the implementation transparent. Each called to `HTMLWriter` creates a new proxy which, in turn, has reference to its own internal `writer` object. Basic usage is:

    var w = new HTMLWriter();
    
    w.html()
        .head().title().text("Example &#038; Test").xtitle().xhead()
        .body().text("Hello world!").xbody()
    .xhtml();
    
    console.log(w);

Ugly method names aside, the prototype works as you&#8217;d expect. What I really like about this type of pattern is that the methods can be easily updated to support new HTML tags by modifying the `tags` array.

The more I thought about proxies and the `get` trap, the more ideas I came up with. Developers have long tried to figure out ways to inherit from `Array` to create their own array-like structures, but we&#8217;ve also been unable to get there due to a number of issues. With proxies, implementing array-like data structures are trivial. 

I decided that I&#8217;d like to make a stack implementation in JavaScript that uses an array underneath it all. I wanted the stack to be old-school, just `push()`, `pop()`, and `length` members (no numeric index support). Basically, I would just need to filter the members being accessed in the `get` trap. Here&#8217;s the result:

    var Stack = (function(){
    
        var stack = [],
            allowed = [ "push", "pop", "length" ];
        
        return Proxy.create({
            get: function(receiver, name){;
                if (allowed.indexOf(name) > -1){
                    if(typeof stack[name] == "function"){
                        return stack[name].bind(stack);
                    } else {
                        return stack[name];
                    }
                } else {
                    return undefined;
                }
            }
        
        });
    
    });
    
    var mystack = new Stack();
    
    mystack.push("hi");
    mystack.push("goodbye");
    
    console.log(mystack.length);    //1
    
    console.log(mystack[0]);        //undefined
    console.log(mystack.pop());     //"goodbye"

Here, I&#8217;m using a private `stack` array for each instance of my stack. Each instance also has a single proxy that is returned and used as the interface. So every method I want to allow ends up being executed on the array rather than the proxy object itself.

This pattern of object member filtering allowed me to easily enable the members I wanted while disabling the ones I didn&#8217;t. The one tricky part was ensuring the methods were bound to the correct `this` value. In my first try, I simply returned the method from the array, but ended up with multiple errors because `this` was the proxy object instead of the array. I added the use of the ECMAScript 5 `bind()` method to ensure the `this` value remained correct for the methods and everything worked fine.

A few caveats as you start playing with proxies. First, it&#8217;s only currently supported in Firefox 6+. Second, the specification is still in flux and the syntax, order of arguments, etc. may change in the future. Third, the patterns I&#8217;ve explained here are not and should not be considered best practices for using proxies. These are just some experiments I hacked together to explore the possibilities. Proxies aren&#8217;t ready for production use but are a lot of fun for experimentation.

**Update (2011-Sept-18)**: Fixed escaping issue in code.

 [1]: {{site.url}}/blog/2009/02/17/mozilla-javascript-extension-nosuchmethod/
