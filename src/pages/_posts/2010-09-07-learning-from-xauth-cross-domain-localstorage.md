---
title: 'Learning from XAuth: Cross-domain localStorage'
author: Nicholas C. Zakas
permalink: /blog/2010/09/07/learning-from-xauth-cross-domain-localstorage/
categories:
  - Web Development
tags:
  - Cross Document Messaging
  - iframe
  - JavaScript
  - localStorage
  - XAuth
---
I typically don't get too excited when new open source JavaScript utilities are released. It may be the cynic in me, but generally I feel like there's very little new under the sun that's actually useful. Most of these utilities are knockoffs of other ones or are too large to be practically useful. When I first came across [XAuth][1], though, a little tingly feeling of excitement swept over me. And the first coherent thought I had while looking at the source: this is absolutely brilliant.

## What is XAuth?

I don't want to spend too much time explaining exactly what XAuth is, since you can read the documentation yourself to find the nitty gritty details. In short, XAuth is a way to share third-party authentication information in the browser. Instead of every application needing to go through the authorization process for a service, XAuth is used to store this information in your browser and make it available to web developers. That means a site that can serve you a more relevant experience when you're signed into Yahoo! doesn't need to make any extra requests to determine if you're signed in. You can read more about XAuth over on the [Meebo blog][2].

## The cool part

This post is really less about the usage of XAuth and more about the implementation. What the smart folks at Meebo did is essentially create a data server in the browser. The way that they did this is by combining the power of [cross-document messaging][3] and `<a href="http://hacks.mozilla.org/2009/06/localstorage/">localStorage</a>`. Since `localStorage` is tied to a single origin, you can't get direct access to data that was stored by a different domain. This makes the sharing of data across domains strictly impossible when using just this API (note the difference with cookies: you can specify which subdomains may access the data but not completely different domains).

Since the primary limitation is the same-origin policy of `localStorage`, circumventing that security issue is the way towards data freedom. The cross-document messaging functionality is designed to allow data sharing between documents from different domains while still being secure. The two-part technique used in XAuth is incredibly simple and consists of:

  * **Server Page** &#8211; there's a page that's hosted at <http://xauth.org/server.html> that acts as the &#8220;server&#8221;. It's only job is to handle requests for `localStorage`. The page is as small as possible with minified JavaScript, but you can see the [full source][4] at GitHub.
  * **JavaScript Library** &#8211; a single small script file contains the JavaScript API that exposes the functionality. This API needs to be included in your page. When you make a request through the API for the first time, it creates an `iframe` and points it to the server page. Once loaded, requests for data are passed through the `iframe` to the server page via cross-document messaging. The [full source][5] is also available on GitHub.

Although the goal of XAuth is to provide authentication services, this same basic technique can be applied to any data.

## General technique

Suppose your page is running on www.example.com and you want to get some information stored in `localStorage` for foo.example.com. The first step is to create an iframe that points to a page on foo.example.com that acts as the data server. The page's job is to handle incoming requests for data and pass the information back. A simple example is:

    
    <!doctype html>
    <!-- Copyright 2010 Nicholas C. Zakas. All rights reserved. BSD Licensed. -->
    <html>
    <body>
    <script type="text/javascript">
    (function(){
    
        //allowed domains
        var whitelist = ["foo.example.com", "www.example.com"];
    
        function verifyOrigin(origin){
            var domain = origin.replace(/^https?:\/\/|:\d{1,4}$/g, "").toLowerCase(),
                i = 0,
                len = whitelist.length;
    
            while(i < len){
                if (whitelist[i] == domain){
                    return true;
                }
                i++;
            }
    
            return false;
        }
    
        function handleRequest(event){
            if (verifyOrigin(event.origin)){
                var data = JSON.parse(event.data),
                    value = localStorage.getItem(data.key);
                event.source.postMessage(JSON.stringify({id: data.id, key:data.key, value: value}), event.origin);
            }
        }
    
        if(window.addEventListener){
            window.addEventListener("message", handleRequest, false);
        } else if (window.attachEvent){
            window.attachEvent("onmessage", handleRequest);
        }
    })();
    </script>
    </body>
    </html>

This is the minimal implementation that I would suggest. The key function is `handleRequest()`, which is called when the `message` event is fired on the window. Since I'm not using any JavaScript libraries here, I need to manually check for the appropriate way to attach the event handler.

Inside of `handleRequest()`, the first step is to verify the origin from which the request is coming. This is a vital step to ensure that not just anyone can create an iframe, point to this file, and get all of your `localStorage` information. The `event` object contains a property called `origin` that specifies the scheme, domain, and (optionally) port from which the request originated (for example, &#8220;http://www.example.com&#8221;); this property does not contain any path or query string information. The `verifyOrigin()` function simply checks a whitelist of domains to ensure that the origin property indicates a whitelisted domain. It does so by stripping off the protocol and port using a regular expression and then normalizing to lowercase before matching against the domains in the `whitelist` array.

If the origin is verified then the `event.data` property is parsed as a JSON object and the `key` property is used as the key to read from `localStorage`. A message is then sent back as a JSON object that contains the unique ID that was passed initially, the key name, and the value; this is done using `postMessage()` on `event.source`, which is a proxy for the `window` object that sent the request. The first argument is the JSON-serialized message containing the value from `localStorage` and the second is the origin to which the message should be delivered. Even though the second argument is optional, it's good practice to include the destination origin as an extra measure of defense against cross-site scripting (XSS) attacks. In this case, the original origin is passed.

For the page that wants to read data from the iframe, you need to create the iframe server and handle message passing. The following constructor creates an object to manage this process:

    /*
     * Copyright 2010 Nicholas C. Zakas. All rights reserved.
     * BSD Licensed.
     */
    function CrossDomainStorage(origin, path){
        this.origin = origin;
        this.path = path;
        this._iframe = null;
        this._iframeReady = false;
        this._queue = [];
        this._requests = {};
        this._id = 0;
    }
    
    CrossDomainStorage.prototype = {
    
        //restore constructor
        constructor: CrossDomainStorage,
    
        //public interface methods
    
        init: function(){
    
            var that = this;
    
            if (!this._iframe){
                if (window.postMessage && window.JSON && window.localStorage){
                    this._iframe = document.createElement("iframe");
                    this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
                    document.body.appendChild(this._iframe);
    
                    if (window.addEventListener){
                        this._iframe.addEventListener("load", function(){ that._iframeLoaded(); }, false);
                        window.addEventListener("message", function(event){ that._handleMessage(event); }, false);
                    } else if (this._iframe.attachEvent){
                        this._iframe.attachEvent("onload", function(){ that._iframeLoaded(); }, false);
                        window.attachEvent("onmessage", function(event){ that._handleMessage(event); });
                    }
                } else {
                    throw new Error("Unsupported browser.");
                }
            }
    
            this._iframe.src = this.origin + this.path;
    
        },
    
        requestValue: function(key, callback){
            var request = {
                    key: key,
                    id: ++this._id
                },
                data = {
                    request: request,
                    callback: callback
                };
    
            if (this._iframeReady){
                this._sendRequest(data);
            } else {
                this._queue.push(data);
            }   
    
            if (!this._iframe){
                this.init();
            }
        },
    
        //private methods
    
        _sendRequest: function(data){
            this._requests[data.request.id] = data;
            this._iframe.contentWindow.postMessage(JSON.stringify(data.request), this.origin);
        },
    
        _iframeLoaded: function(){
            this._iframeReady = true;
    
            if (this._queue.length){
                for (var i=0, len=this._queue.length; i < len; i++){
                    this._sendRequest(this._queue[i]);
                }
                this._queue = [];
            }
        },
    
        _handleMessage: function(event){
            if (event.origin == this.origin){
                var data = JSON.parse(event.data);
                this._requests[data.id].callback(data.key, data.value);
                delete this._requests[data.id];
            }
        }
    
    };

The `CrossDomainStorage` type encapsulates all of the functionality for requesting values from a different domain through an iframe (note that it does not support saving values, which is a very different security scenario). The constructor takes an origin and a path which together are used to construct the iframe's URL. The `_iframe` property will hold a reference to the iframe while `_iframeReady` indicates that the iframe has been fully loaded. The `_queue` property is an array of requests that might be queued before the iframe is ready. The `_requests` property stores meta data for ongoing requests and `_id` is the seed value from which unique request identifiers will be created.

Before making any requests, the `init()` method must be called. This method's sole job is to set up the iframe, add the `onload` and `onmessage` event handlers, and then assign the URL to the iframe. When the iframe is loaded, `_iframeLoaded()` is called and the `_iframeReady` flag is set to true. At that time, the `_queue` is checked to see if there are any requests that were made before the iframe was ready to receive them. The queue is emptied, sending each request again.

The `requestValue()` method is the public API method to retrieve a value and it accepts two arguments: the key to return and a callback function to call when the value is available. The method creates a request object as well as a data object to store the meta data about the request. If the iframe is ready, then the request is sent to the iframe, otherwise the meta data is stored in the queue. The `_sendRequest()` method is then responsible for using `postMesage()` to send the request. Note that the request object must be serializes into JSON before being sent since `postMessage()` only accepts strings.

When a message is received from the iframe, the `_handleMessage()` method is called. This method verifies the origin of the message and then retrieves the message's meta data (the server iframe passes back the same unique identifier) to execute the associated callback. The meta data is then cleared.

Basic usage of the `CrossDomainStorage` type is as follows:

    var remoteStorage = new CrossDomainStorage("http://www.example.com", "/util/server.htm");
    
    remoteStorage.requestValue("keyname", function(key, value){
        alert("The value for '" + key + "' is '" + value + "'");
    });

Keep in mind that this technique works not just for different subdomains, but also for different domains.

## Pragmatism

Another thing I love about XAuth is the pragmatic way in which it was written: instead of going for complete functionality in all browsers, Meebo chose to target only the most capable browsers. Essentially, the browser must support cross-document messaging, `localStorage`, and native JSON serialization/parsing in order to use the library. By making that simplifying assumption, they saved a lot of time and effort (and probably a lot of code) in making this utility. The result is a really tight, small footprint utility with little chance of significant bugs. I really want to applaud the authors for this pragmatism as I believe it will be a contributing factor to rapid adoption and ease of ongoing maintenance.

## Ironic side note

Who knew cross-domain client-side data storage would be useful? Actually, the WHAT-WG did. In the first draft of the Web Storage specification (at that time, part of HTML5), there was an object called `globalStorage` that allowed you to specify which domains could access certain data. For example:

    //all domains can access this
    globalStorage["*"].setItem("foo", "bar");
    
    //only subdomains of example.com can access this
    globalStorage["*.example.com"].setItem("foo", "bar");
    
    //only www.example.com can access this
    globalStorage["www.example.com"].setItem("foo", "bar");
    

The `globalStorage` interface was implemented in Firefox 2 prematurely as the specification was still evolving. Due to security concerns, `globalStorage` was removed from the spec and replaced with the origin-specific `localStorage`.

## Conclusion

The basic technique of using an iframe to access another domain's `localStorage` object is quite brilliant and applicable far beyond just the XAuth use case. By allowing any domain to access data stored on another domain, complete with whitelisting based on origin, web developers now have a way to share data amongst many different sites. All browsers that support `localStorage` also support native JSON parsing and cross-document messaging, making cross-browser compatibility much easier. XAuth and the code in this post work with Internet Explorer 8+, Firefox 3.5+, Safari 4+, Chrome 4+, and Opera 10.5+.

 [1]: http://xauth.org/info/
 [2]: http://blog.meebo.com/?p=2391
 [3]: http://msdn.microsoft.com/en-us/library/cc511311%28VS.85%29.aspx
 [4]: http://github.com/xauth/xauth/blob/master/src/server.js
 [5]: http://github.com/xauth/xauth/blob/master/src/xauth.js
