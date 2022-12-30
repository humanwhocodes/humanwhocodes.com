---
title: Firefox 3.5/Firebug XMLHttpRequest and readystatechange bug
author: Nicholas C. Zakas
permalink: /blog/2009/07/09/firefox-35firebug-xmlhttprequest-and-readystatechange-bug/
categories:
  - Web Development
tags:
  - Ajax
  - Firebug
  - Firefox
  - JavaScript
  - XMLHttpRequest
---
Last Thursday I was debugging an issue at work that was reported by two colleagues using Firefox 3.5. Initially, they had neglected to mention their fast upgrade to the latest Firefox and I spent some time fruitlessly trying to reproduce the issue. The complaint was that our page wasn't displaying an Ajax response even though Firebug clearly showed that a response had been received. After checking my code, the rest of the page's code, and debugging back into the YUI layer, I discovered that the source of the bug wasn't JavaScript code at all &#8211; it was the browser. I thought I had found a bug in Firefox 3.5.

As I was debugging, I tweeted about this issue a [handful][1] [of][2] [times][3] and then pinged [YUI Connection Manager][4] creator Thomas Sha to see if he had heard of this issue. He hadn't, so I continued digging and eventually found two bugs, one in the [Firefox queue][5] via my co-worker Steve Carlson and one in the [Firebug queue][6] via [Christopher Blum][7]. Christopher [pointed out][8] to me that he believed the cause of the issue was actually Firebug rather than Firefox itself. It's now a week later and the issue hasn't been resolved, so I'd like to share with everyone in the hopes of avoiding a lot of debugging by web developers around the world.

## Symptoms

The issue presents itself when using Firefox 3.5 with Firebug 1.4.x or 1.5.x. The primary symptom is that the `readystatechange` event on an `XMLHttpRequest` object doesn't get fired past `readyState` 1, meaning that any script listening for `readystatechange` to test for `readyState` being equal to 4 will fail silently. There is no JavaScript error to catch and no error condition to look for, and in fact, the response is received by the browser (as can be tested using the Firebug Net panel or [Fiddler][9]).

Fortunately, this doesn't happen for all XHR communication. It seemingly occurs randomly but it's likelihood increases as the amount of time it takes for a response to be fully received increases. Therefore, a request that receives a response in less than a second is far less likely to see this happen than a request that receives a response in ten seconds. The longer the response takes to return, the more frequently the `readystatechange` event will not fire. [Kyle Huey][10] created a [reproducible test case][11] that allows you to specify how long the server should wait before finishing the response. I've found I get the most consistent results using a value of 10 or higher (though I've experienced the same issue with responses taking less than a second as well).

The bad news is that there's no way to detect that this issue is occurring. The good news is that there are workarounds.

## Workarounds

Even though the `readystatechange` event isn't firing, the `readyState` property is actually getting updated. So, it is possible to poll for changes in `readyState` on your own to determine when to determine that the response has been received. This is the approach taken in the [YUI 2.7 Connection Manager][12], so if you're using this utility, your code should continue to work without incident (the [YUI 3 Beta 1 equivalent][13] uses `onreadystatechange`, so users of that will be affected).

If that approach seems too hacky for you, there is another workaround. The Firefox `XMLHttpRequest` object supports the [W3C Progress Events][14], all of which continue to work appropriately. The progress events are:

  * `load` &#8211; fires when a response is received from the server.
  * `error` &#8211; fires when a network error occurs.
  * `abort` &#8211; fires when the request has been aborted.
  * `progress` &#8211; fires when a partial amount of data is available from the response.

Of these four, one of the first three will always be fired once a request is deemed to have been completed (by completion, I mean the connection is no longer open). Since `readystatechange` continues to work in all other browsers, you may need a temporary fork in your code to make use of the progress events in the meantime, such as:

    var xhr = new XMLHttpRequest();
    
    if (firefox3_5){
        xhr.onload = xhr.onerror = xhr.onabort = function(){
            processResponse(xhr);
        };
    } else {
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4){
                processResponse(xhr);
            }
        };
    }
    
    xhr.open("get", "/url", true);
    xhr.send(null);

Normally, I wouldn't recommend browser-specific hacks, but in this case we're not sure how long the issue will be out there and therefore don't know how long our code will continue to break. At least this workaround will continue to work even after this issue has been addressed.

## Ongoing investigation

The discussion of this issue has bounced back and forth between the Firebug team and the Firefox team as the two groups try to figure out the cause of the issue. I've personally been in touch with Rob Campbell of the Firebug team who is very dedicated to resolving this bug. I've also done a fair amount of investigation (within the realm of my knowledge) to try to help narrow down the issue. Some of the things I've found:

  * Occurs with Firefox 3.5 and Firebug 1.4.x or 1.5.x, including the nightlies.
  * Does not occur in Firefox 3.0 using Firebug 1.4.x.
  * Does not occur in Firefox 3.5 without Firebug installed.
  * Occurs more frequently as the response time of an Ajax request increases.
  * Can cause an error to be output in the Firebug console in the format of:  
    onreadystatechange FAILS Error: Permission denied for toÂ  create wrapper for object of class UnnamedClass Error: Permission denied forÂ  to create wrapper for object of class UnnamedClass  
    [xpconnect wrapped nsIDOMEventListener]

Without much knowledge of how Firefox or Firebug work internally, my own conclusion is that a change in Firefox 3.5&#8242;s handling of XHR traffic probably breaks the way that Firebug is hooking into it. Since the same Firebug version (1.4.x) works on Firefox 3.0 without issue, that points the finger at Firefox. Of course, it's entirely possible that Firebug is doing something that it shouldn't be doing, in which case the finger is back at Firebug. And this is why the issue is so hard to track down.

If your responses are being returned in a small amount of time, then you'll likely not run into this issue. This really affects those applications using Comet-style communication (such as Facebook chat) and requests being made over high-latency connections (spotty wireless networks, overseas servers). The latter is what I was working on when this issue first came to my attention.

The discussion continues on the [Firefox bug][5] and the [Firebug bug][6]. These are the two places to go for updates to the problem. I'd like to ask that you only comment on either bug if you have new information to add. It's not going to help to have a lot of &#8220;me too&#8221; or &#8220;hurry up&#8221; comments. I know this is frustrating, as it's akin to saying, &#8220;what if we remove the `XMLHttpRequest` object?&#8221; Both teams are taking this issue seriously and hope to have a resolution soon.

**Update (14 July 2009):** It looks like this issue is related to a security change in Firefox 3.5 that Firebug is running into. The way that Firebug tries to listen on an XHR object to get the response causes a security error and therefore the `readystatechange` event becomes useless. It's believed that [this bug][15] is the ultimate source of the problem and will likely involve a Firefox patch to get resolution.

**Update (18 July 2009):** Firefox 3.5.1 does *not* fix this issue. Resolution still pending.

**Update (23 July 2009):** Firebug 1.4.1 and Firebug 1.5a18 fix this issue. Thanks to the folks on the Firebug team for their diligence.

 [1]: http://twitter.com/slicknet/status/2447298270
 [2]: http://twitter.com/slicknet/status/2449122924
 [3]: http://twitter.com/slicknet/status/2500746473
 [4]: http://developers.yahoo.com/yui/connection/
 [5]: https://bugzilla.mozilla.org/show_bug.cgi?id=501962
 [6]: http://code.google.com/p/fbug/issues/detail?id=1948
 [7]: http://www.xing.com/profile/Christopher_Blum2
 [8]: http://twitter.com/ChristopherBlum/status/2450783350
 [9]: http://www.fiddlertool.com
 [10]: http://www.kylehuey.com/
 [11]: http://www.kylehuey.com/moz/testRequest.php
 [12]: http://developer.yahoo.com/yui/connection/
 [13]: http://developer.yahoo.com/yui/3/io/
 [14]: http://www.w3.org/TR/progress-events/
 [15]: https://bugzilla.mozilla.org/show_bug.cgi?id=502959
