---
title: 'Getting the URL of an iframe&#8217;s parent'
author: Nicholas C. Zakas
permalink: /blog/2013/04/16/getting-the-url-of-an-iframes-parent/
categories:
  - Web Development
tags:
  - iframe
  - JavaScript
  - referrer
---
Dealing with iframes is always a double-edged sword. On the one hand, you get sandboxing of content within another page, ensuring that JavaScript and CSS from one page won&#8217;t affect another. If the iframe is displayed a page from a different origin then you can also be assured that the page can&#8217;t do anything nefarious to the containing page. On the other hand, iframes and their associated `window` objects are a mess of permissible and impermissible actions that you need to remember<sup>[1]</sup>. Working with iframes is frequently an exercise in frustration as you methodically move through what you&#8217;re allowed to do.

I was recently asked if there&#8217;s a way to get the URL of an iframe&#8217;s parent page, which is to say, the URL of the page with the `<iframe>` element. This seems like a simple enough task. For a regular page, you typically get the URL by using `window.location`. There are also `parent` to get the `window` object of the parent page and `top` to get the `window` object of the outermost page. You can then use `parent.location` or `top.location` to get a URL from the containing page depending on your needs. At least, that&#8217;s how you do it when both the iframe page and the containing page are from the same origin.

When the iframe page and containing page are from different origins, then you are completely cut off from the `parent.location` and `top.location`. This information is considered unsafe to share across origins. However, that doesn&#8217;t mean you can&#8217;t find out the URL of the containing page. To do so, you simply need to keep in mind what information the iframe owns and what information it does not.

To start, you should double-check that the page is actually in an iframe, which you can do with this code:

    var isInIframe = (parent !== window);

When a page is running inside of an iframe, the `parent` object is different than the `window` object. You can still access `parent` from within an iframe even though you can&#8217;t access anything useful on it. This code will never cause an error even when crossing origins.

Once you know you&#8217;re in an iframe, you can take advantage of a little-known fact: the HTTP `Referer` header for a page inside of an iframe is always set to the containing page&#8217;s URL. That means a page embedded in an iframe on `{{site.url}}` will have a `Referer` header equal to that URL. Knowing this fact, you need only use the oft-forgotten `document.referrer` property. As the name suggestions, this property contains the value of the `Referer` header for the given document. So you can get the URL of the iframe&#8217;s parent page like this:

    function getParentUrl() {
        var isInIframe = (parent !== window),
            parentUrl = null;
    
        if (isInIframe) {
            parentUrl = document.referrer;
        }
    
        return parentUrl;
    }

While this may look like a security issue, it&#8217;s really not. The `Referer` is already being sent to the server that is serving up the iframe page, so that information is already known by the web application. The `document.referrer` property is just exposing the information that the server already has. Since the `document` object is owned by the iframe `window`, you aren&#8217;t crossing the same-origin policy boundary.

Iframes are always a little bit hairy to deal with, especially when you throw JavaScript into the mix. The good news is that there&#8217;s usually a way to do something that makes sense and won&#8217;t put a user at risk, whether that be through `document.referrer` cross-document messaging, or some other means.

## References

  1. [Iframes, onload, and document.domain][1] by me (NCZOnline)

 [1]: {{site.url}}/blog/2009/09/15/iframes-onload-and-documentdomain/
