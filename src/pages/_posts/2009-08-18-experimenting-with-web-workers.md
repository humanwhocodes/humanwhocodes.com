---
title: Experimenting with web workers
author: Nicholas C. Zakas
permalink: /blog/2009/08/18/experimenting-with-web-workers/
categories:
  - Web Development
tags:
  - JavaScript
  - Web Workers
---
In the past couple of months, there&#8217;s been some good [information][1] [floating][2] [around][3] [about][4] [web workers][5]. I have no desire to add yet another introduction to the topic into the blogosphere, but I would like to share some information about my experiences with web workers. What follows are some notes based on my playing around with the API.

## Worker global scope

The interesting thing about workers is that they have their own global scope that is separate from the global scope that we all know and dread in JavaScript. Workers don&#8217;t share the browser UI thread that in-page JavaScript uses for execution, and therefore isn&#8217;t allowed access to the DOM or most of the BOM. In effect, a worker is a sandboxed environment in which JavaScript can be run completely separate from the page. This is why worker code must exist in a separate file rather than in the same location as the page code. Typical creation looks like this:

    var worker = new Worker("worker.js")

The file worker.js contains all of the code to be executed within the worker. That code executes in the worker&#8217;s global scope. The global scope of a worker contains a limited set of functionality, including:

  * The `XMLHttpRequest` constructor.
  * A `self` object, which is the global object representing the worker in this scope.
  * All ECMAScript constructors.
  * A `navigator` object containing only appName, appVersion, userAgent, and platform properties.
  * A `location` object that is the same as window.location except that all properties are read-only.
  * `setTimeout()` and `setInterval()`.
  * An `importScripts()` method, which is used to load external JavaScript files into the worker&#8217;s scope.

As in other ECMAScript environments, global variables become properties on `self`. Most of the worker examples show a really bad pattern that confuses what&#8217;s going on:

    //inside worker.js
    onmessage = function(event){
        //do something in response to the event
    };

I looked over this code repeatedly trying to figure out exactly what was going on. Why is there a global variable being assigned to a function? Then I discovered that `self` is a reference to the worker&#8217;s global scope, and decided I&#8217;d write code like this instead:

    //inside worker.js
    self.onmessage = function(event){
        //do something in response to the event
    };

This small addition makes the example code much more readable as this pattern is very common in JavaScript. I strongly recommend that anyone writing code with web workers stick with the convention of assigning properties and calling methods directly on the `self` object to avoid any confusion. It&#8217;s also worth mentioning that `this` points to `self` when accessed in the global worker scope.

## Worker messaging

Worker can&#8217;t affect change in a page directly, instead they rely on a messaging system to pass data back and forth. The `postMessage()` method is used to send data into a worker, when called on the `Worker` instance in the page, and to send data out of the worker when called on the worker global object. Example:

    //on page
    var worker = new Worker("worker.js");
    
    //receive message from the worker
    worker.onmessage = function(event){
        alert(event.data);
    };
    
    //send message to the worker
    worker.postMessage("Nicholas");
    
    //in worker.js
    //receive message from the page
    self.onmessage = function(event){
    
        //send message back to the page
        this.postMessage("Hello, " + event.data);
    
    };

The API on both sides of the communication is exactly the same. Calling `postMessage()` causes a `message` event to be fired asynchronously on the receiver. The event handler must be assigned using the old DOM 0 style of setting `onmessage` equal to a function. The `event` object has a property called `data` that contains the information from the supplier.

Perhaps the most interesting thing about this messaging system is the way in which the data is transferred. You can pass any primitive data type (string, number, Boolean, `null`, or `undefined`) as well as any instance of `Object` or `Array` that isn&#8217;t part of the DOM or the BOM. The tricky part is that the values appears to be passed directly through, such as:

    //on page
    var worker = new Worker("worker.js");
    
    //receive message from the worker
    worker.onmessage = function(event){
        alert(event.data.name);   //"Nicholas"
    };
    
    //send object to the worker
    worker.postMessage({ name: "Nicholas" });
    
    //in worker.js
    //receive message from the page
    self.onmessage = function(event){
    
        //send message back to the page
        var name = event.data.name;   //comes through fine!
        this.postMessage(event.data);
    
    };

This code passes an object back and forth between the page and a web worker. You&#8217;ll note that the `name` property is accessible in both locations. This gives the appearance that the object is being passed directly through to the worker and then back. In reality, this can&#8217;t happen because the worker is in its own detached scope. What actually happens is that the value is serialized as it passes through and then deserialized on the other side. The page and the worker cannot share an object instance, only the data represented in the object. Firefox actually implements this by JSON-encoding the value and then JSON-decoding it on the other side. The end result is that a duplicate of the original data is created.

## Better messaging

At first glance, the messaging system seems a bit too simple, with `postMessage()` just accepting a single argument to pass through. Passing a primitive value seems to be a poor way of communicating because there&#8217;s no context. I&#8217;ve now taken to passing objects all the time so I can provide better context as to the reason. Example:

    //on page
    var worker = new Worker("worker.js");
    
    //send object to the worker
    worker.postMessage({
        type: "first",
        data: "Nicholas"
    });
    
    //send object to the worker
    worker.postMessage({
        type: "last",
        data: "Zakas"
    });
    
    //in worker.js
    //receive message from the page
    self.onmessage = function(event){
    
        //determine what to do
        switch(event.data.type){
            case "first":
                //do something
                break;
            case "last":
                //do something else
                break;
            //and so on...
        }
    };

By always passing an object with some contextual data, your worker knows what to do with the data it received.

## Wrap-up

Workers seem like an interesting feature in browsers that may ultimately prove useful. It&#8217;s going to take a while for web developers to full grasp the idea of data-centric JavaScript that can be done in a worker versus DOM-centric JavaScript that cannot. I&#8217;m not completely convinced of worker usefulness in most web applications at this point, however. The majority of examples floating out there seem cool but aren&#8217;t things that JavaScript will or should be doing in a web application. I haven&#8217;t yet come across an instance where I&#8217;ve said, &#8220;oh man, if only web workers were widely supported, this would be easy,&#8221; and so I wonder if that day will come or if workers will be relegated to the domain of proofs-of-concept without practical applications.

 [1]: http://ejohn.org/blog/web-workers/
 [2]: http://genevajs.com/blog/new-worker-expanding-capabilities-of-javascript-web-workers
 [3]: https://developer.mozilla.org/En/Using_DOM_workers
 [4]: http://hacks.mozilla.org/2009/07/working-smarter-not-harder/
 [5]: http://www.w3.org/TR/workers/
