---
title: 'Web workers: errors and debugging'
author: Nicholas C. Zakas
permalink: /blog/2009/08/25/web-workers-errors-and-debugging/
categories:
  - Web Development
tags:
  - Debugging
  - Errors
  - JavaScript
  - Web Workers
---
I've been continuing to experiment with web workers this past weekend and found some more interesting information. It seems that the earlier implementers, Firefox 3.5 and Safari 4, have some quirky differences in their capabilities and behaviors. I discovered this as I was trying to figure out what would happen if an error was thrown inside of a worker.

## The onerror event handler

The web workers [specification][1] indicates that an `error` event should be fired when a JavaScript error occurs in a worker. The `event` object passed into the `onerror` handler is supposed to contain three important properties: message, which is the error message, `lineno`, which is the line within the worker that threw the error, and `filename`, which is the JavaScript file in which the error occurred. That *should* give you enough information to deal with any error that occurs. Example:

    var worker = new Worker("worker.js");
    worker.onerror = function(event){
        throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
    };

Safari's implementation of web workers doesn't fire an `error` event when an error occurs ([bug][2]), making it nearly impossible to recover from an error in a worker. Firefox's implementation does fire the `error` event, but the `message` property on the `event` object isn't filled in ([bug][3]).

## Debugging workers

Both Safari and Firefox recognize errors in workers and therefore output them into their respective consoles. This is the good news: you can be aware that an error has occurred. The bad news is that you have no real way of debugging.

Neither Firebug nor Safari's Web Inspector show worker JavaScript files in their list of loaded scripts. This actually makes sense because the script is not loaded into the page's global scope and therefore doesn't register as in use. Even though it makes sense, it also makes debugging worker code incredibly painful.Â  Remember what debugging JavaScript was like before Firebug? You're right back there, except it's worse.

Since worker code runs in its own global scope separate from the page's global scope, it means you don't have access to the `console` object. No more `console.log()` to help you figure out what's going on. You may be thinking that you'll have to go back to using `alert()`, like the good ol' days. Bad news: `alert()` is a method of `window` and therefore isn't available inside of a worker.

## Faking it

Without functional `onerror` event handlers, and without access to our common debugging techniques, it's necessary to overload the one event that actually works in both Safari and Firefox: the `message` event. An ideal setup would look like this:

    //in page
    var worker = new Worker("worker.js");
    worker.onmessage = function(event){
        switch (event.data.type){
            case "debug":
                console.log(event.data.message);
                break;
    
            //other types of data
        }
    };
    
    worker.postMessage({
        type: "start",
        value: 12345
    });
    
    //in worker.js
    self.onmessage = function(event){
        if (event.data.type == "start"){
            process(event.data.value);
        }
    };
    
    function process(number){
    
        self.postMessage({
            type: "debug",
            message: "Starting processing..."
        });
    
        //code
    
        self.postMessage({
            type: "debug",
            message: "Processing finished"
        });
    }

In this model, an object is passed back from the worker via `postMessage()`. The object has a field, `type`, that indicates the message is for debugging purposes, and a `message` field containing the debugging message. This is then read by the page through the `onmessage` event handler and then the debugging message is output to the console. Note that I said this was the *ideal* scenario given the uselessness of `onerror`. Unfortunately, this can't be used because Safari only supports passing strings via `postMessage()` ([bug][4]). That means the messages can only be strings for a cross-browser implementation, leading to something like this:

    //in page
    var worker = new Worker("worker.js");
    worker.onmessage = function(event){
        var data = event.data.split(":");
        switch (data[0]){
            case "debug":
                console.log(data[1]);
                break;
    
            //other types of data
        }
    };
    
    worker.postMessage("start:12345");
    
    //in worker.js
    self.onmessage = function(event){
        var data = event.data.split(":");
        if (data[0] == "start"){
            process(parseInt(data[1],10));
        }
    };
    
    function process(number){
    
        self.postMessage("debug:Starting processing...");
    
        //code
    
        self.postMessage("debug:Processing finished");
    }

This version uses a very primitive string format with a colon separate to pass messages back and forth (if Safari 4 natively supported JSON, that would be another option). Each `onmessage` handler needs to parse the incoming message to determine what to do and then take the appropriate action. A bit hacky, but gets the job done.

## Conclusion

Web workers are still under development and have a lot of potential, but right now there's a lot of problems. The cross-browser differences are almost crippling and the lack of debugging capabilities lead me to believe that workers are not yet ready for enterprise usage. No one can afford to spend time trying to figure out why their worker isn't working (pun intended) when deadlines are looming. Perhaps the next iterations on each browser will yield better and more reasonable opportunities for adoption. The full adoption story will ultimately be determined, in my opinion, by the extent to which our debugging tools integrate with workers.

 [1]: http://www.w3.org/TR/workers/
 [2]: https://bugs.webkit.org/show_bug.cgi?id=8519
 [3]: https://bugzilla.mozilla.org/show_bug.cgi?id=512157
 [4]: https://bugs.webkit.org/show_bug.cgi?id=22878
