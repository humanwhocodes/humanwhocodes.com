---
title: "Working with files in JavaScript, Part 5: Blobs"
author: Nicholas C. Zakas
permalink: /blog/2012/06/05/working-with-files-in-javascript-part-5-blobs/
categories:
  - Web Development
tags:
  - Blob
  - File API
  - JavaScript
---
Up to this point, this series of posts has focused on interacting with files specified by the user and accessed via `File` objects. The `File` object is actually a more specific version of a `Blob`, which represents a chunk of binary data. The `size` and `type` properties exist on `Blob` objects and are inherited by `File`.

In most cases, `Blob`s and `File`s can be used in the same places. For example, you can read from a `Blob` using a `FileReader` and you can create an object URL from a `Blob` using `URL.createObjectURL()`.

## Slicing

One of the interesting things you can do with `Blob`s (and therefore, also `File`s) is to create a new `Blob` based on a subsection of another one. Since each `Blob` just represents pointers to data rather than the data itself, you can quickly create new `Blob` objects pointing to subparts of others. This is accomplished by using the `slice()` method.

You may be familiar with `slice()` on strings and arrays, and the one for `Blob`s behaves in a similar manner. The method accepts three arguments: the offset of the starting byte, the offset of the ending byte, and an optional MIME type to apply to the `Blob`. If the MIME type isn't specified, the new `Blob` has the same MIME type as the original one.

Browser support for `slice()` isn't yet ubiquitous, with Firefox supporting it via `mozSlice()` and `webkitSlice()` in Chrome (no other browsers support this method currently). Here's an example:

    function sliceBlob(blob, start, end, type) {
    
        type = type || blob.type;
    
        if (blob.mozSlice) {
            return blob.mozSlice(start, end, type);
        } else if (blob.webkitSlice) {
            return blob.webkitSlice(start, end type);
        } else {
            throw new Error("This doesn't work!");
        }
    }

You can then use this function to, for example, split up a large file to upload it in chunks. Each new `Blob` being produced is independent from the original even though the data each references has an overlap. The engineers at Flickr use blob slicing to read the Exif information from photos that are uploaded<sup>[1]</sup> rather than waiting to it on the server. When the file is selected, the Flickr upload page simultaneously starts to upload the file as well as read the Exif information from the photo. This allows them to give a preview of the extracted metadata in the page as the file is being uploaded.

## Creating Blobs the old way

Very soon after `File` objects started appearing in browsers, developers realized that `Blob` objects were actually quite powerful and so wanted to be able to create them without user interaction. After all, any data can be represented in a `Blob`, it doesn't necessarily have to be tied to a file. Browsers quickly responded by creating `BlobBuilder`, a type whose sole purpose is to wrap some data in a `Blob` object. This is a non-standard type and has been implemented in Firefox (as `MozBlobBuilder`), Internet Explorer 10 (as `MSBlobBuilder`), and Chrome (as `WebKitBlobBuilder`).

The `BlobBuilder` works by creating a new instance and calling the `append()` method with a string, `ArrayBuffer`, or `Blob`. Once all of the data has been added, you call `getBlob()` and pass in an optional MIME type that should be applied to `Blob`. Here's an example:

    var builder = new BlobBuilder();
    builder.append("Hello world!");
    var blob = builder.getBlob("text/plain");
    

The ability to create URLs for arbitrary pieces of data is incredibly powerful, allowing you to dynamically create objects that can be addressed as files in the browser. You could, for example, use a `Blob` to create a web worker without having a separate file for the worker code. This technique was written up in <cite>The Basics of Web Workers</cite><sup>[2]</sup>:

    // Prefixed in Webkit, Chrome 12, and FF6: window.WebKitBlobBuilder, window.MozBlobBuilder
    var bb = new BlobBuilder();
    bb.append("onmessage = function(e) { postMessage('msg from worker'); }");
    
    // Obtain a blob URL reference to our worker 'file'.
    // Note: window.webkitURL.createObjectURL() in Chrome 10+.
    var blobURL = window.URL.createObjectURL(bb.getBlob());
    
    var worker = new Worker(blobURL);
    worker.onmessage = function(e) {
      // e.data == 'msg from worker'
    };
    worker.postMessage(); // Start the worker.

This code creates a simple script and then creates an object URL. The object URL is assigned to a web worker in place of a script URL. 

You can call `append()` as many times as you like, building up the contents of the `Blob`. 

### Creating Blobs the new way

Because developers kept clamoring for a way to create `Blob` objects directly, and browsers coming up with `BlobBuilder`, it was decided to add a `Blob` constructor. This constructor is now part of the specification and will be the way that `Blob` objects are created in the future.

The constructor accepts two arguments. The first is an array of parts to combine into a `Blob`. These would be the same values as passed into the `append()` method of `BlobBuilder` and can be any number of strings, `Blob`s, and `ArrayBuffer`s. The second argument is an object containing properties for the newly-created `Blob`. There are currently two properties defined, `type`, which specifies the MIME type of the `Blob`, and `endings`, which can be either &#8220;transparent&#8221; (default) or &#8220;native&#8221;. Here's an example:

    var blob = new Blob(["Hello world!"], { type: "text/plain" });
    

As you can see, this is much simpler than using `BlobBuilder`.

The `Blob` constructor is currently in the nightly builds of Chrome and will be in Firefox 13. Other browsers have not yet announced plans to implement this constructor, however, it is now part of the <cite>File API</cite><sup>[3]</sup> standard and is expected to be implemented universally.

## Conclusion

This is the last part of the series on working with files in JavaScript. As I hope you learned, the <cite>File API</cite> is incredibly powerful and opens up entirely new ways of working with files in web applications. You no longer need to stick with plain file upload boxes when users need to upload files, and now that you can read the files in the client, that opens up all sorts of possibilities for client-side manipulation. You could resize an image that's too large before uploading (using `FileReader` and `<canvas>`); you could create a text editor that works purely in the browser; you could split up large files to upload piece by piece. The possibilities aren't quite endless, but are pretty damn close.


  1. [Parsing Exif client-side using JavaScript][1] by Flickr Team
  2. [The Basics of Web Workers][2] by Eric Bidelman
  3. [File API &#8211; Blob Constructor][3]

 [1]: http://code.flickr.com/blog/2012/06/01/parsing-exif-client-side-using-javascript-2/
 [2]: http://www.html5rocks.com/en/tutorials/workers/basics/
 [3]: http://dev.w3.org/2006/webapi/FileAPI/#constructorBlob
