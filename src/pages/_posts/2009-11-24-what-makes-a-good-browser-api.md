---
title: What makes a good browser API?
author: Nicholas C. Zakas
permalink: /blog/2009/11/24/what-makes-a-good-browser-api/
categories:
  - Web Development
tags:
  - API
  - Architecture
  - JavaScript
---
Last month, I attended another discussion at Mozilla, this one about the future of web databases. Though the content of the discussion was interesting, I found a rather general debate much more so. There ended up being two schools of thought related to native browser APIs for JavaScript. One camp firmly believes that native JavaScript APIs should be as low-level as possible, with the expectation that library developers will build nicer interfaces on top of it. The other camp, of which I&#8217;m a member, believes that mid-level APIs are the way to go. No one believed that browsers should provide high-level APIs to developers. But what does all of this mean?

## Low level

Low-level APIs are designed simply to provide capabilities. There is little need to make the API pretty or easy to understand because it just has to do the job. Low-level APIs can be difficult for novice and, sometimes, intermediate developers to understand. This significantly reduces the number of people who can exercise the API to find issues. Responsibility falls on library developers to implement pretty, usable APIs on top of the low-level APIs to make them accessible to the general developer population. The best example of a low-level browser API is `document.cookie`.

The `document.cookie` property is the JavaScript developer&#8217;s sole interface to manipulating cookies, and it&#8217;s one of the ugliest APIs ever created. I&#8217;ve [written][1] [extensively][2] about cookies and how to use them from JavaScript, but here&#8217;s a simple overview. In order to set a cookie, you need to assign a string in the correct cookie format to `document.cookie`, such as:

    document.cookie = "name=Nicholas; domain=nczonline.net; path=/; expires=Sat, 02 May 2009 23:38:25 GMT

To retrieve a cookie, you need to read `document.cookie`, which returns a string of name-value pairs in the following format:

    name1=value1; name2=value2; name3=value3; name4=value4

In order to retrieve the value you want, you must first search the string for the name and then parse out the value.

The reason that this API is considered low-level is that the implementation requires knowledge of how cookies work in order to use it. The `document.cookie` property effectively mimics the `Set-Cookie` and `Cookie` HTTP headers that are normally hidden from developers. In order to write cookies, you need to know the exact string format to use, which means the name and value need to be URI-encoded, other segments of the cookie need to be separated by a semicolon and a space, and you need to know the correct date format to set an expiration date. Likewise, to read a cookie, you need to understand the format of the string being returned and then parse out the data you&#8217;re interested in. The simplest use case isn&#8217;t much easier than the complex use case. Fundamentally, this API is unusable to anyone other than those who already understand cookies.

You can tell that an API is low-level when the majority of developers don&#8217;t use it directly. They can&#8217;t, the [cognitive overhead][3] required to perform the task is too high. Most developers who read and write cookies using JavaScript end up using a JavaScript library abstraction such as the YUI Cookie Utility (for [YUI 2][4] and [YUI 3][5]), which abstracts away all of the nasty implementation details.

This is exactly what proponents of low-level APIs believe should happen: browsers should simply provide capabilities and then rely on the development community to create usable APIs around them. The major argument for low-level APIs is that you can make any number of interesting abstractions around the capabilities and therefore give developers more choice as to how they want to interact with the functionality.

The problem with low-level APIs is the ramp-up time. Because you&#8217;ve limited the number of potential users by creating a low-level API, you essentially need to wait until one or more of them find the functionality interesting enough to create an abstraction that&#8217;s accessible to the rest of the development community. If you want the new API to start getting used quickly so you can know how to evolve it, low-level APIs just don&#8217;t work.

**Note:** Most server-side languages have native abstractions for reading/writing cookies ([ASP.NET][6], [JSP][7], [PHP][8]), but JavaScript still doesn&#8217;t.

## High level

On the opposite side of the argument are high-level APIs. High-level APIs are those designed to be used directly by developers and are frequently very intuitive. These APIs aren&#8217;t concerned just with providing capabilities, they also want to provide good and useful interfaces to those capabilities. High-level APIs are designed with developers in mind first and foremost, and as such, typically require theorizing about how developers will use the API. This, of course, is the rub: you rarely know exactly how someone is going to use an API and therefore creating a high-level API natively in the browser is a difficult, if not impossible, task.

The various JavaScript libraries are good examples of high-level APIs. They&#8217;re all built on top of the same browser but provide very different interfaces to the same functionality. The way you use jQuery is very different than the way you use YUI, and that&#8217;s a good thing, because developers have options. But imagine is you told YUI developers that they had to write code using jQuery syntax because that&#8217;s all that was available, or vice versa? You&#8217;d have a whole swarm of unhappy developers. Forcing people to develop in a certain way is a recipe for disaster. It&#8217;s the abstractions, and the ability to add and remove them as necessary, that make development enjoyable and empowers developers to continue innovating.

High-level APIs have very low cognitive overhead and thus developers are able to use them directly with little trouble. No one believes that high-level APIs are appropriate for browsers, which is a good thing. Choice is good, different abstractions are good.

## Mid Level

The happy medium is a mid-level API. Mid-level APIs are, in my opinion, what browsers should be aiming to create and implement. As the name suggests, mid-level APIs exist between low level and high level, giving the best of both worlds. Mid level APIs are defined (in my mind) by providing simple interfaces for the most common use cases while having extensions to allow more powerful manipulation and less common use cases. The first part, the common use case interface, is simple enough to be used directly without an abstraction. The less common use case interface is allowed to be more complex and even a bit obtuse because it will be used less frequently.

An excellent example of a good mid level API is `XMLHttpRequest`. The common use case can be defined as sending a GET request to retrieve XML data. It doesn&#8217;t take a lot of code to achieve this:

    var xhr = new XMLHttpRequest();
    xhr.open("get", "/somexml", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                process(xhr.responseXML.getElementsByTagName("item"));
            }
        }
    };
    xhr.send(null);

Though some would argue the `onreadystatechange` event handler is a bit ugly, fundamentally, you end up checking a small amount of information to determine if you have received correct data. The data you&#8217;re interested in are in logical places and easily accessible in the format in which you need it: the HTTP status is there and the XML is automatically parsed into a DOM. The API is doing a lot of work to get that data to you directly.

Less common use cases include posting form data to a URL. The code becomes a bit uglier, but it&#8217;s still possible:

    var xhr = new XMLHttpRequest();
    xhr.open("post", "/add", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                signalComplete();
            }
        }
    };
    xhr.send(encodeURIComponent(name) + "=" + encodeURIComponent(value));

You can, of course, use the `XMLHttpRequest` object can also be used for more complex processes such as Comet. The point is that the common use case is simple and the interface scales up to more complex and less-common use cases easily. This allows JavaScript libraries to also build nicer interfaces to handle the ugliness of the more complex use cases behind the scenes. Every JavaScript library has a different take on how Ajax communication should be initiated, and the design of the `XMLHttpRequest` interface lends itself quite well to this usage.

**Note:** There are some who believe that the `XMLHttpRequest` object is also too low-level. I&#8217;ll admit that it&#8217;s not the cleanest API, but it does make the common use case simple to execute. Keep in mind that, when this object was first designed, the common use case was retrieving XML data from the server. Since that time, the common use case has changed, but the same API is still used. To me, this indicates just how good this API is as a mid-level example.

## Conclusion

It&#8217;s my assertion that native browser APIs should be mid-level, so that the common use case is easy to execute but there are enough extensions to allow for the less-common use cases. When APIs are too low-level, they take too long to propagate and become useful to the development community; when APIs are too high-level, people either take to them or ignore them because they&#8217;re being forced in a particular direction. It seems like the newer APIs are leaning more towards low-level designs that will require other people to create useful abstractions before developers can actually use them. I&#8217;d like to put a stop to that. Make the common use case easy so people can start using the APIs right away and allow for extension. Mid-level APIs represent the best of both worlds.

 [1]: {{site.url}}/blog/2009/05/05/http-cookies-explained/
 [2]: {{site.url}}/blog/2009/05/12/cookies-and-security/
 [3]: http://elab.eserver.org/hfl0098.html
 [4]: http://developer.yahoo.com/yui/2/cookie
 [5]: http://developer.yahoo.com/yui/3/cookie
 [6]: http://www.codetoad.com/ASP.NET/cookies.asp
 [7]: http://www.roseindia.net/jsp/jspcookies.shtml
 [8]: http://www.w3schools.com/PHP/php_cookies.asp
