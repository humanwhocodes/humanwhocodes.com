---
title: 'Working with files in JavaScript, Part 1: The Basics'
author: Nicholas C. Zakas
permalink: /blog/2012/05/08/working-with-files-in-javascript-part-1/
categories:
  - Web Development
tags:
  - File API
  - JavaScript
---
Many years ago, I was asked during a job interview at Google what changes I would make to the web in order to provide better experiences. At the top of my list was having some way to work with files other than the `<input type="file">` control. Even as the rest of the web was evolving, the way we dealt with files never changed since it was first introduced. Thankfully, with HTML5 and related APIs, we now have far more options for working with files than ever before in the latest versions of desktop browsers (iOS still has no support for the File API).

## The File type

The `File` type is defined in the <cite>File API</cite><sup>[1]</sup> specification and is an abstract representation of a file. Each instance of `File` has several properties:

  * `name` &#8211; the filename
  * `size` &#8211; the size of the file in bytes
  * `type` &#8211; the MIME type for the file

A `File` object basically gives you essential information about the file without providing direct access to the file contents. That's important because reading from files requires disk access, and depending on the size of the file, that process has the potential to take a significant amount of time. A `File` object is just a reference to a file, and getting data from that file is a separate process altogether.

## Getting File references

Of course, access to user files is strictly forbidden on the web because it's a very obvious security issue. You wouldn't want to load up a web page and then have it scan your hard drive and figure out what's there. You need permission from the user in order to access files from their computer. There's no need for messy permission windows, however, because users grant permission for web pages to read files all the time when they decide to upload something.

When you use a `<input type="file">` control, you're giving the web page (and the server) permission to access that file. So it makes sense that the first place you can retrieve `File` objects is through a `<input type="file">` control.

HTML5 defines a `files` property for all `<input type="file">` controls. This collection is a `FileList`, which is an array-like structure called `FileList` containing `File` objects for each selected file in the control (remember, HTML5 allows multiple file selection in these controls). So at any point in time, you can get access to the files a user has selected using code similar to this:

    <input type="file" id="your-files" multiple>
    <script>
    var control = document.getElementById("your-files");
    control.addEventListener("change", function(event) {
    
        // When the control has changed, there are new files
    
        var i = 0,
            files = control.files,
            len = files.length;
    
        for (; i < len; i++) {
            console.log("Filename: " + files[i].name);
            console.log("Type: " + files[i].type);
            console.log("Size: " + files[i].size + " bytes");
        }
    
    }, false);
    </script></code>

This relatively simple code listens for the `change` event on the file control. When the event fires, it signifies that the file selection has changed, and the code iterates through each `File` object and outputs its information. Keep in mind that the `files` property is always accessible from JavaScript, so you don't have to wait for `change` to try to read it.

## Drag and drop files

Accessing files from form controls still requires the form control and the associated user action of browsing to find the files of interest. Fortunately, <cite>HTML5 Drag and Drop</cite><sup>[2]</sup> provides another way for users to grant access to their files: by simply dragging a file from the desktop into the web browser. All you have to do to take advantage is listen for two events.

In order to read files that are dropped onto an area of the page, you must listen for the `dragover` and `drop` events and cancel the default action of both. Doing so tells the browser that you are handling the action directly and it shouldn't, for example, open an image file. 

    <div id="your-files"></div>
    <script>
    var target = document.getElementById("your-files");
    
    target.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);
    
    target.addEventListener("drop", function(event) {
    
        // cancel default actions
        event.preventDefault();
    
        var i = 0,
            files = event.dataTransfer.files,
            len = files.length;
    
        for (; i < len; i++) {
            console.log("Filename: " + files[i].name);
            console.log("Type: " + files[i].type);
            console.log("Size: " + files[i].size + " bytes");
        }
    
    }, false);
    </script></code>

The `event.dataTransfer.files` is another `FileList` object that you can access to get file information. The code is almost exactly the same as using the file form control and the `File` objects can be accessed in the same way.

## Ajax file upload

Once you have a reference to the file, you're able to do something that's pretty cool: upload a file via Ajax. This is all possible due to the `FormData` object, which is defined in <cite>XMLHttpRequest Level 2</cite><sup>[3]</sup>. This object represents an HTML form and allows you to add key-value pairs to be submitted to the server via the `append()` method:

    var form = new FormData();
    form.append("name", "Nicholas");
    

The great thing about the `FormData` object is that you can add a file directly to it, effectively mimicking a file upload by HTML form. All you have to do is add the `File` reference with a specific name, and the browser does the rest. For example:

    // create a form with a couple of values
    var form = new FormData();
    form.append("name", "Nicholas");
    form.append("photo", control.files[0]);
    
    // send via XHR - look ma, no headers being set!
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log("Upload complete.");
    };
    xhr.open("post", "/entrypoint", true);
    xhr.send(form);
    

Once the `FormData` object is passed into `send()`, the proper HTTP headers are automatically set for you. You don't have to worry about setting the correct form encoding when using files, so the server gets to act as if a regular HTML form has been submitted, reading file data from the &#8220;photo&#8221; key and text data from the &#8220;name&#8221; key. This gives you the freedom to write processing code on the backend that can easily work with both traditional HTML forms and Ajax forms of this nature.

And all of this works in the most recent version of every browser, including Internet Explorer 10.

## Up next

You now know the two methods of accessing `File` information in the browser: through a file upload control and through native drag and drop. There will likely be other ways to access files in the future, but for now, these are the two you need to know. Of course, reading information about files is just part of the problem. The next step is read data from those files, and that's where part 2 will pick up.


  1. [File API specification (editor's draft)][1]
  2. [HTML5 Drag and Drop][2]
  3. [XMLHttpRequest Level 2][3]

 [1]: http://dev.w3.org/2006/webapi/FileAPI/
 [2]: http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#dnd
 [3]: http://www.w3.org/TR/XMLHttpRequest/
