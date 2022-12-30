---
title: Cross-domain Ajax with Cross-Origin Resource Sharing
author: Nicholas C. Zakas
permalink: /blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
categories:
  - Web Development
tags:
  - Ajax
  - CORS
  - JavaScript
  - XDomainRequest
  - XDR
  - XHR
  - XMLHttpRequest
---
A couple of years ago, web developers were banging their head against the first wall in Ajax: the [same-origin policy][1]. While we marveled at the giant step forward enabled by cross-browser support for the `XMLHttpRequest` object, we quickly bemoaned the fact that there was no way to make a request to a different domain from JavaScript. Everyone setup proxies on their web sites, which was the onset of a new host of open redirect problems, as a way to get around the restriction. Although developers were working around this limitation using server-side proxies as well as other techniques, the community outcry was around allowing native cross-domain Ajax requests. A lot of people are unaware that almost all browsers (Internet Explorer 8+, Firefox 3.5+, Safari 4+, and Chrome) presently support cross-domain Ajax via a protocol called Cross-Origin Resource Sharing.

## Cross-Origin Resource Sharing (CORS)

[Cross-Origin Resource Sharing][2] (CORS) is a W3C Working Draft that defines how the browser and server must communicate when accessing sources across origins. The basic idea behind CORS is to use custom HTTP headers to allow both the browser and the server to know enough about each other to determine if the request or response should succeed or fail.

For a simple request, one that uses either GET or POST with no custom headers and whose body is `text/plain`, the request is sent with an extra header called `Origin`. The `Origin` header contains the origin (protocol, domain name, and port) of the requesting page so that the server can easily determine whether or not it should serve a response. An example `Origin` header might look like this:

    Origin: {{site.url}}

If the server decides that the request should be allowed, it sends a `Access-Control-Allow-Origin` header echoing back the same origin that was sent or &#8220;*&#8221; if it's a public resource. For example:

    Access-Control-Allow-Origin: {{site.url}}

If this header is missing, or the origins don't match, then the browser disallows the request. If all is well, then the browser processes the request. Note that neither the requests nor responses include cookie information.

All of the previously mentioned browsers support these simple requests. Firefox 3.5+, Safari 4+, and Chrome all support usage through the `XMLHttpRequest` object. When attempting to open a resource on a different origin, this behavior automatically gets triggered without any extra code. For example:

    var xhr = new XMLHttpRequest();
    xhr.open("get", "{{site.url}}/some_resource/", true);
    xhr.onload = function(){  //instead of onreadystatechange
        //do something
    };
    xhr.send(null);

To do the same in Internet Explorer 8, you'll need to use the [`XDomainRequest` object][3] in the same manner:

    var xdr = new XDomainRequest();
    xdr.open("get", "{{site.url}}/some_resource/");
    xdr.onload = function(){
        //do something
    };
    xdr.send();

The Mozilla team suggests in their [post about CORS][4] that you should check for the existence of the `withCredentials` property to determine if the browser supports CORS via XHR. You can then couple with the existence of the `XDomainRequest` object to cover all browsers:

    function createCORSRequest(method, url){
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined"){
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
    
    var request = createCORSRequest("get", "{{site.url}}/");
    if (request){
        request.onload = function(){
            //do something with request.responseText
        };
        request.send();
    }

The `XMLHttpRequest` object in Firefox, Safari, and Chrome has similar enough interfaces to the IE `XDomainRequest` object that this pattern works fairly well. The common interface properties/methods are:

  * `abort()` &#8211; use to stop a request that's already in progress.
  * `onerror` &#8211; use instead of `onreadystatechange` to detect errors.
  * `onload` &#8211; use instead of `onreadystatechange` to detect successes.
  * `responseText` &#8211; use to get contents of response.
  * `send()` &#8211; use to send the request.

### Preflighted requests

CORS allows the use of custom headers, methods other than GET or POST, and different body content types through a transparent mechanism of server verification called preflighted requests. When you try to make a request with one of the advanced options, a &#8220;preflight&#8221; request is made to the server. This request uses the OPTIONS method and sends the following headers:

  * `Origin` &#8211; same as in simple requests.
  * `Access-Control-Request-Method` &#8211; the method that the request wants to use.
  * `Access-Control-Request-Headers` &#8211; (Optional) a comma separated list of the custom headers being used.

Example assuming a POST request with a custom header called `NCZ`:

    Origin: {{site.url}}
    Access-Control-Request-Method: POST
    Access-Control-Request-Headers: NCZ

During this request, the server can determine whether or not it will allow requests of this type. The server communicates this to the browser by sending the following headers in the response:

  * `Access-Control-Allow-Origin` &#8211; same as in simple requests.
  * `Access-Control-Allow-Methods` &#8211; a comma separated list of allowed methods.
  * `Access-Control-Allow-Headers` &#8211; a comma separated list of headers that the server will allow.
  * `Access-Control-Max-Age` &#8211; the amount of time in seconds that this preflight request should be cached for.

Example:

    Access-Control-Allow-Origin: {{site.url}}
    Access-Control-Allow-Methods: POST, GET
    Access-Control-Allow-Headers: NCZ
    Access-Control-Max-Age: 1728000

Once a preflight request has been made, the result is cached for the period of time specified in the response; you'll only incur the cost of an extra HTTP request the first time a request of this type is made.

Firefox 3.5+, Safari 4+, and Chrome all support preflighted requests; Internet Explorer 8 does not.

### Credentialed requests

By default, cross-origin requests do not provide credentials (cookies, HTTP authentication, and client-side SSL certificates). You can specify that a request should send credentials by setting the `withCredentials` property to true. If the server allow credentialed requests, then it responds with the following HTTP header:

    Access-Control-Allow-Credentials: true

If a credentialed request is sent and this header is not sent as part of the response, then the browser doesn't pass the response to JavaScript (`responseText` is an empty string, `status` is 0, and `onerror()` is invoked). Note that the server can also send this HTTP header as part of the preflight response to indicate that the origin is allowed to send credentialed requests.

Internet Explorer 8 doesn't support the `withCredentials` property; Firefox 3.5, Safari 4, and Chrome all support it.

## Conclusion

There is a lot of solid support for cross-domain Ajax in modern web browsers, yet most developers are still unaware of this powerful capability. Usage requires just a little bit of extra JavaScript work and a little extra server-side work to ensure that the correct headers are being sent. IE8&#8242;s implementation lags a bit behind the others in terms of allowing advanced requests and credentialed requests, but hopefully support for CORS will continue to improve. If you'd like to learn more, I highly suggest checking out Arun Ranganathan's [examples page][5].

**Update (25 May 2010):** Fixed typo in example code.

**Update (27 May 2010):** Removed trailing slash from Origin headers.

 [1]: https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript
 [2]: http://www.w3.org/TR/access-control/
 [3]: http://msdn.microsoft.com/en-us/library/cc288060%28VS.85%29.aspx
 [4]: http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
 [5]: http://arunranga.com/examples/access-control/
