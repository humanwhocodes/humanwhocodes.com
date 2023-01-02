---
title: "Working with files in JavaScript, Part 3: Progress events and errors"
author: Nicholas C. Zakas
permalink: /blog/2012/05/22/working-with-files-in-javascript-part-3/
categories:
  - Web Development
tags:
  - File API
  - FileReader
  - Files
  - JavaScript
---
The `FileReader` object is used to read data from files that are made accessible through the browser. In my [previous post][1], you learned how to use a `FileReader` object to easily read data from a file in a variety of formats. The `FileReader` is very similar to `XMLHttpRequest` in many ways.

## Progress events

Progress events are becoming so common that they're actually written up in a separate specification<sup>[1]</sup>. These events are designed to generically indicate the progress of data transfers. Such transfers occur when requesting data from the server, but also when requesting data from disk, which is what `FileReader` does. 

There are six progress events:

  * `loadstart` &#8211; indicates that the process of loading data has begun. This event always fires first.
  * `progress` &#8211; fires multiple times as data is being loaded, giving access to intermediate data.
  * `error` &#8211; fires when loading has failed.
  * `abort` &#8211; fires when data loading has been canceled by calling `abort()` (available on both `XMLHttpRequest` and `FileReader`).
  * `load` &#8211; fires only when all data has been successfully read.
  * `loadend` &#8211; fires when the object has finished transferring data. Always fires and will always fire after `error`, `abort`, or `load`.

Two events, `error` and `load`, were discussed in my previous post. The other events give you more fine-grained control over data transfers.

### Tracking progress

When you want to track progress of a file reader, use the `progress` event. The `event` object for this event contains three properties to monitor the data being transferred:

  * `lengthComputable` &#8211; a boolean indicating if the browser can determine the complete size of the data.
  * `loaded` &#8211; the number of bytes that have been read already.
  * `total` &#8211; the total number of bytes to be read.

The intent of this data is to allow for progress bars to be generated using the information from the `progress` event. For example, you may be using an HTML5 `<progress>` element to monitor the progress of reading a file. You can tie the progress value to the actual data using code like this:

    var reader = new FileReader(),
         progressNode = document.getElementById("my-progress");
    
    reader.onprogress = function(event) {
        if (event.lengthComputable) {
            progressNode.max = event.total;
            progressNode.value = event.loaded;
        }
    };
    
    reader.onloadend = function(event) {
        var contents = event.target.result,
            error    = event.target.error;
     
        if (error != null) {
            console.error("File could not be read! Code " + error.code);
        } else {
            progressNode.max = 1;
            progressNode.value = 1;
            console.log("Contents: " + contents);
        }
    };
    
    reader.readAsText(file);
    

This is similar to the approach that Gmail uses for its drag and drop file upload implementation, where you see a progressbar immediately after dropping a file onto the email. That progressbar indicates how much of the files has been transferred to the server.

## Dealing with errors

Even though you're reading a local file, it's still possible for the read to fail. The <cite>File API specification</cite><sup>[2]</sup> defines four types of errors:

  * `NotFoundError` &#8211; the file can't be found.
  * `SecurityError` &#8211; something about the file or the read is dangerous. The browser has some leeway as to when this occurs, but generally if the file is dangerous to load into the browser or the browser has been performing too many reads, you'll see this error.
  * `NotReadableError` &#8211; the file exists but can't be read, most likely due to a permissions problem.
  * `EncodingError` &#8211; primarily when trying to read as a data URI and the length of the resulting data URI is beyond the maximum length supported by the browser.

When an error occurs during a file read, the `FileReader` object's `error` property is assigned to be an instance of one of the above mentioned errors. At least, that's how the spec is written. In reality, browsers implement this as a `FileError` object that has a `code` property indicating the type of error that has occurred. Each error type is represented by a numeric constant value:

  * `FileError.NOT_FOUND_ERR` for file not found errors.
  * `FileError.SECURITY_ERR` for security errors.
  * `FileError.NOT_READABLE_ERR` for not readable errors.
  * `FileError.ENCODING_ERR` for encoding errors.
  * `FileError.ABORT_ERR` when `abort()` is called while there is no read in progress.

You can test for the type of error either during the `error` event or during `loadend`:

    var reader = new FileReader();
    
    reader.onloadend = function(event) {
        var contents = event.target.result,
            error    = event.target.error;
     
        if (error != null) {
            switch (error.code) {
                case error.ENCODING_ERR:
                    console.error("Encoding error!");
                    break;
    
                case error.NOT_FOUND_ERR:
                    console.error("File not found!");
                    break;
    
                case error.NOT_READABLE_ERR:
                    console.error("File could not be read!");
                    break;
    
                case error.SECURITY_ERR:
                    console.error("Security issue with file!");
                    break;
    
                default:
                    console.error("I have no idea what's wrong!");
            }
        } else {
            progressNode.max = 1;
            progressNode.value = 1;
            console.log("Contents: " + contents);
        }
    };
    
    reader.readAsText(file);
    

## Up next

The `FileReader` object is a fully-featured object with a lot of functionality and a lot of similarities to `XMLHttpRequest`. By following these last three posts, you should now be able to read data from files using JavaScript and send that data back to the server if necessary. However, the <cite>File API</cite> ecosystem is quite a bit larger than has been already discussed in this series, and in the next part you'll learn about a powerful new features designed to work with files.


  1. [Progress Events][2]
  2. [File API][3]

 [1]: {{site.url}}/blog/2012/05/15/working-with-files-in-javascript-part-2/
 [2]: http://www.w3.org/TR/progress-events/
 [3]: http://www.w3.org/TR/FileAPI/
