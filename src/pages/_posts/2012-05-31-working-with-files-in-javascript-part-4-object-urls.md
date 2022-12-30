---
title: 'Working with files in JavaScript, Part 4: Object URLs'
author: Nicholas C. Zakas
permalink: /blog/2012/05/31/working-with-files-in-javascript-part-4-object-urls/
categories:
  - Web Development
tags:
  - File API
  - Files
  - JavaScript
  - Object URL
---
Up to this point in the blog series, you've learned how to use files in the traditional way. You can upload files to the server and you can read file data from disk. These all represent the most common ways of dealing with files. However, there is a completely new way to deal with files that has the capacity to simplify some common tasks. This new way is to use object URLs.

## What is an object URL?

Object URLs are URLs that point to files on disk. Suppose, for example, that you want to display an image from the user's system on a web page. The server never needs to know about the file, so there's no need to upload it. You just want to load the file into a page. You could, as shown in the previous posts, get a reference to a `File` object, read the data into a data URI, and then assign the data URI to an `<img>` element. But think of all the waste: the image already exists on disk, why read the image into another format in order to use it? If you create an object URL, you could assign that to the `<img>` and access that local file directly.

## How does it work?

The <cite>File API</cite><sup>[1]</sup> defines a global object called `URL` that has two methods. The first is `createObjectURL()`, which accepts a reference to a `File` and returns an object URL. This instructs the browser to create and manage a URL to the local file. The second method is `revokeObjectURL()`, which instructs the browser to destroy the URL that is passed into it, effectively freeing up memory. Of course, all object URLs are revoked once the web page is unloaded, but it's good to free them up when they're no longer needed anyway.

Support for the `URL` object isn't as good as for other parts of the <cite>File API</cite>. As of the time of my writing, Internet Explorer 10+ and Firefox 9+ support a global `URL` object. Chrome supports it in the form of `webkitURL` while Safari and Opera have no support.

## Example

So how would you display an image from disk without reading the data first? Suppose that you've given the user a way to select a file and now have a reference to it in a variable called `file`. You can then use the following:

    var URL = window.URL || window.webkitURL,
        imageUrl,
        image;
    
    if (URL) {
        imageUrl = URL.createObjectURL(file);
        image = document.createElement("img");
    
        image.onload = function() {
            URL.revokeObjectURL(imageUrl);
        };
        
        image.src = imageUrl;
        document.body.appendChild(image);
    }

This example creates a local `URL` variable that normalizes the browser implementations. Assuming that `URL` is supported, the code goes on to create an object URL directly from `file` and stores it in `imageUrl`. A new `<img>` element is created and given an `onload` event handler that revokes the object URL (more on that in a minute). Then, the `src` property is assigned to the object URL and the element is added to the page (you may want to use an already-existing image). 

Why revoke the object URL once the image is loaded? After the image is loaded, the URL is no longer needed unless you intend to reuse it with another element. In this example, the image is being loaded into a single element, and once the image has been completely loaded, the URL isn't serving any useful purpose. That's the perfect time to free up any memory associated with it.

## Security and other considerations

At first glance, this capability is a bit scary. You're actually loading a file directly from the user's machine via a URL. There are, of course, security implications to this capability. The URL itself isn't a big security issue because it's a URL that's assigned dynamically by the browser and would be useless on any other computer. What about cross-origin?

The <cite>File API</cite> disallows using object URLs on different origins. When an object URL is created, it is tied to the origin of the page in which the JavaScript executed, so you can't use an object URL from `www.wrox.com` on a page at `p2p.wrox.com` (an error occurs). However, two pages from `www.wrox.com`, where one is embedded in the other with an iframe, are capable of sharing object URLs.

Object URLs exist only so long as the document that created them. When the document is unloaded, all object URLs are revoked. So, it doesn't make sense to store object URLs in client-side data storage to use later; they are useless after the page has been unloaded.

You can use object URLs anywhere the browser would make a GET request, which includes images, scripts, web workers, style sheets, audio, and video. You can never use an object URL when the browser would perform a POST, such as within a `<form>` whose `method` is set to &#8220;post&#8221;.

## Up next

The ability to create URLs that link directly to local files is a powerful one. Instead of needing to read a local file into JavaScript in order to display it on a page, you can simply create a URL and point the page to it. This process greatly simplifies the use case of including local files in a page. However, the fun of working with files in JavaScript has only just begun. In the next post, you'll learn some interesting ways to work with file data.

## References

  1. [File API][1]

 [1]: http://www.w3.org/TR/FileAPI/
