---
title: "Working with files in JavaScript, Part 2: FileReader"
author: Nicholas C. Zakas
permalink: /blog/2012/05/15/working-with-files-in-javascript-part-2/
categories:
  - Web Development
tags:
  - File API
  - FileReader
  - JavaScript
---
In my [previous post][1], I introduced using files in JavaScript, focusing specifically on how to get access to `File` objects. These objects contain file metadata obtained only when the user opts to either upload a file or drags and drops a file onto the web page. Once you have files, however, the next step is to read data from them.

## The FileReader type

The `FileReader` type has a single job: to read data from a file and store it in a JavaScript variable. The API is intentionally designed to be similar to `XMLHttpRequest` since both are loading data from an external (outside of the browser) resource. The read is done asynchronously so as not to block the browser.

There are several formats that a `FileReader` can create to represent the file data, and the format must be requested when asking the file to be read. Reading is done through calling one of these methods:

  * `readAsText()` &#8211; returns the file contents as plain text
  * `readAsBinaryString()` &#8211; returns the file contents as a string of encoded binary data (*deprecated &#8211; use `readAsArrayBuffer()` instead*) 
  * `readAsArrayBuffer()` &#8211; returns the file contents as an `ArrayBuffer` (good for binary data such as images)
  * `readAsDataURL()` &#8211; returns the file contents as a data URL

Each of these methods initiates a file read similar to the XHR object's `send()` method initiating an HTTP request. As such, you must listen for the `load` event before starting to read. The result of the read is always represented by `event.target.result`. For example:

    var reader = new FileReader();
    reader.onload = function(event) {
        var contents = event.target.result;
        console.log("File contents: " + contents);
    };
    
    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };
    
    reader.readAsText(file);
    

This example simply reads the contents of a file and outputs it in plain text to the console. The `onload` handler is called when the file is successfully read whereas the `onerror` handler is called if the file wasn't read for some reason. The `FileReader` instance is available inside of the event handler via `event.target` and it's recommended to use that instead of referencing the `reader` variable directly. The `result` property contains the file contents on success and `error` contains error information about the failed operation. 

### Reading data URIs

You can use the same basic setup for reading to a data URI. Data URIs (sometimes called data URLs) are an interesting option if you want to, for example, display an image that was just read from disk. You could do so with the following code:

    var reader = new FileReader();
    reader.onload = function(event) {
        var dataUri = event.target.result,
            img     = document.createElement("img");
    
        img.src = dataUri;
        document.body.appendChild(img);
    };
    
    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };
    
    reader.readAsDataURL(file);
    

This code simply inserts an image that was read from disk into a page. Since the data URI contains all of the image data, it can be passed directly into the `src` attribute of an image and displayed on the page. You could, alternately, load the image and draw it onto a `<canvas>` as well:

    var reader = new FileReader();
    reader.onload = function(event) {
        var dataUri = event.target.result,
            context = document.getElementById("mycanvas").getContext("2d"),
            img     = new Image();
     
        // wait until the image has been fully processed
        img.onload = function() {
            context.drawImage(img, 100, 100);
        };
        img.src = dataUri;
    };
    
    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };
    
    reader.readAsDataURL(file);
    

This code loads the image data into a new `Image` object and then uses that to draw the image onto a canvas (specifying both the width and height as 100).

Data URIs are generally used for this purpose, but can be used on any type of the file. The most common use case for reading a file into a data URI is to display the file contents on a web page immediately.

### Reading ArrayBuffers

The `ArrayBuffer` type<sup>[1]</sup> was first introduced as part of WebGL. An `ArrayBuffer` represents a finite number of bytes that may be used to store numbers of any size. The way data is read from an `ArrayBuffer` is by using a specific view, such as `Int8Array`, which treats the underlying bytes as a collection of 8-bit signed integers or `Float32Array`, which treats the underlying bytes as a collection of 32-bit floating point numbers. These are called typed arrays<sup>[2]</sup>, which force you to work with a specific numeric type rather than containing any type of data (as with traditional arrays).

You use an `ArrayBuffer` primarily when dealing with binary files, to have more fine-grained control over the data. It's beyond the scope of this post to explain all the ins and outs of `ArrayBuffer`, just realize that you can read a file into an `ArrayBuffer` pretty easily if you need it. You can pass an `ArrayBuffer` directly into an XHR object's `send()` method to send the raw data to the server (you'll have to read this data from the request on the server to reconstruct the file), so long as your browser fully supports <cite>XMLHttpRequest Level 2</cite><sup>[3]</sup> (most recent browsers, including Internet Explorer 10 and Opera 12).

## Up next

Reading data from a file using a `FileReader` is pretty simple. If you know how to use `XMLHttpRequest`, there's no reason you can't also be reading data from files. In the next part of this series, you'll learn more about using the `FileReader` events and understanding more about possible errors.


  1. [ArrayBuffer][2]
  2. [Typed Array Specification][3]
  3. [XMLHttpRequest Level 2][4]

 [1]: https://humanwhocodes.com/blog/2012/05/08/working-with-files-in-javascript-part-1/
 [2]: https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer
 [3]: http://www.khronos.org/registry/typedarray/specs/latest/
 [4]: http://www.w3.org/TR/XMLHttpRequest/
