---
title: "Getting the URL of an iframe's parent"
author: Nicholas C. Zakas
permalink: /blog/2013/04/16/getting-the-url-of-an-iframes-parent/
categories:
  - Web Development
tags:
  - iframe
  - JavaScript
  - referrer
---
Dealing with iframes is always a double-edged sword. On the one hand, you get sandboxing of content within another page, ensuring that JavaScript and CSS from one page won't affect another. If the iframe is displayed a page from a different origin then you can also be assured that the page can't do anything nefarious to the containing page. On the other hand, iframes and their associated `window` objects are a mess of permissible and impermissible actions that you need to remember<sup>[1]</sup>. Working with iframes is frequently an exercise in frustration as you methodically move through what you're allowed to do.

I was recently asked if there's a way to get the URL of an iframe's parent page, which is to say, the URL of the page with the `<iframe>` element. This seems like a simple enough task. For a regular page, you typically get the URL by using `window.location`. There are also `parent` to get the `window` object of the parent page and `top` to get the `window` object of the outermost page. You can then use `parent.location` or `top.location` to get a URL from the containing page depending on your needs. At least, that's how you do it when both the iframe page and the containing page are from the same origin.

When the iframe page and containing page are from different origins, then you are completely cut off from the `parent.location` and `top.location`. This information is considered unsafe to share across origins. However, that doesn't mean you can't find out the URL of the containing page. To do so, you simply need to keep in mind what information the iframe owns and what information it does not.

To start, you should double-check that the page is actually in an iframe, which you can do with this code:

    var isInIframe = (parent !== window);

When a page is running inside of an iframe, the `parent` object is different than the `window` object. You can still access `parent` from within an iframe even though you can't access anything useful on it. This code will never cause an error even when crossing origins.

Once you know you're in an iframe, you can take advantage of a little-known fact: the HTTP `Referer` header for a page inside of an iframe is always set to the containing page's URL. That means a page embedded in an iframe on `{{site.url}}` will have a `Referer` header equal to that URL. Knowing this fact, you need only use the oft-forgotten `document.referrer` property. As the name suggestions, this property contains the value of the `Referer` header for the given document. So you can get the URL of the iframe's parent page like this:

    function getParentUrl() {
        var isInIframe = (parent !== window),
            parentUrl = null;
    
        if (isInIframe) {
            parentUrl = document.referrer;
        }
    
        return parentUrl;
    }

While this may look like a security issue, it's really not. The `Referer` is already being sent to the server that is serving up the iframe page, so that information is already known by the web application. The `document.referrer` property is just exposing the information that the server already has. Since the `document` object is owned by the iframe `window`, you aren't crossing the same-origin policy boundary.

Iframes are always a little bit hairy to deal with, especially when you throw JavaScript into the mix. The good news is that there's usually a way to do something that makes sense and won't put a user at risk, whether that be through `document.referrer` cross-document messaging, or some other means.


  1. [Iframes, onload, and document.domain][1] by me (NCZOnline)

 [1]: {{site.url}}/blog/2009/09/15/iframes-onload-and-documentdomain/
