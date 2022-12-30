---
title: Introducing Props2Js
author: Nicholas C. Zakas
permalink: /blog/2011/12/20/introducing-props2js/
categories:
  - Personal
tags:
  - Build
  - JavaScript
  - JSON
  - JSONP
---
One of my principles of Maintainable JavaScript<sup>[1]</sup> is to separate your configuration data from your application logic. Configuration data is hardcoded information that your JavaScript uses to work properly. This could be anything such as a URL or a UI string. For example:

    function validate(value) {
        if (!value) {
            alert("Invalid value");
            location.href = "/errors/invalid.php";
        }
    }
        
    function toggleSelected(element) {
        if (hasClass(element, "selected")) {
            removeClass(element, "selected");
        } else {
            addClass(element, "selected");
        }
    }

There are three pieces of configuration data in this code. The first is the string, &#8220;Invalid value&#8221;, which is displayed to the user. As a UI string, there's a high chance that it will change frequently. The second is the URL &#8220;/errors/invalid.php&#8221;. URLs tend to change as development progresses due to architectural decisions. The third is the CSS class name &#8220;selected&#8221;. This class name is used three times, meaning that a class name change requires changes in three different places, increasing the likelihood that one will be missed.

Configuration data is best extracted from the core application logic, such as:

    //Configuration data externalized
    var config = {
        MSG_INVALID_VALUE:  "Invalid value",
        URL_INVALID:        "/errors/invalid.php",
        CSS_SELECTED:       "selected"
    };
    
    function validate(value) {
        if (!value) {
            alert(config.MSG_INVALID_VALUE);
            location.href = config.URL_INVALID;
        }
    }
    
    function toggleSelected(element) {
        if (hasClass(element, config.CSS_SELECTED)) {
            removeClass(element, config.CSS_SELECTED);
        } else {
            addClass(element, config.CSS_SELECTED);
        }
    }

This example stores all of the configuration data in the `config` object. Each property of `config` holds a single piece of data, and each property name has a prefix indicating the type of data (`MSG` for a UI message, `URL` for a URL, and `CSS` for a class name). The naming convention is, of course, a matter of preference. The important part of this code is that all of the configuration data has been removed from the functions, replaced with placeholders from the `config` object.

Externalizing the configuration data means that anyone can go in and make a change without fear of introducing an error in the application logic. It also means that the entire `config` object can be moved into its own file, so edits are made far away from the code that uses the data.

Having an external object managing your configuration data is a good start, but I'm not a fan of storing configuration data directly in JavaScript code. Because such data changes frequently, I prefer to keep it in a simpler file format &#8211; one that's free from worries about missing a semicolon or comma. And that's when I turned to the Java properties file<sup>[2]</sup>.

Java properties files are incredibly simple. One name-value pair per line and comments begin with a `#`. It's really hard to mess up this format. Here's what the previous example's configuration data looks like in a Java properties file:

    # UI Strings
    MSG_INVALID_VALUE = Invalid value
    
    # URLs
    URL_INVALID = /errors/invalid.php
    
    # CSS Classes
    CSS_SELECTED = selected

Even though I had my configuration data in a Java properties file, I had no easy way of making this data available to JavaScript.

This is why I created Props2Js<sup>[3]</sup>, a simple tool that does just one thing: reads a Java properties file and outputs it in a format that JavaScript can use. Actually, it's capable of outputting the data into three formats that JavaScript can use: JSON, JSONP, and regular JavaScript.

    java -jar props2js-0.1.0.jar --to jsonp --name myfunc --output result.js source.properties

The `--to` option specifies the output format, either &#8220;js&#8221;, &#8220;json&#8221;, or &#8220;jsonp&#8221;. The `--name` option specifies either the variable name (for &#8220;js&#8221;) or the function name (for &#8220;jsonp&#8221;); this option is ignored for &#8220;json&#8221;. The `--output` option specifies the file to write the data into. So this line takes the Java properties file named `source.properties` and outputs JSONP with a callback function of `myfunc` to a file named `result.js`.

Props2Js outputs the properties file mentioned above into JSON format:

    {"MSG_INVALID_VALUE":"Invalid value","URL_INVALID":"/errors/invalid.php",
    "CSS_SELECTED":"selected"}

Here's the JSONP output:

    myfunc({"MSG_INVALID_VALUE":"Invalid value","URL_INVALID":"/errors/invalid.php",
    "CSS_SELECTED":"selected"});

And here's the plain JavaScript option with `--name config`:

    var config={"MSG_INVALID_VALUE":"Invalid value","URL_INVALID":"/errors/invalid.php",
    "CSS_SELECTED":"selected"};

Props2Js is also smart enough to know that you're assigning to an object property if you include a dot in in the `--name` option. In that case, it omits the `var`.

Props2Js is available under an MIT License and is hosted at GitHub<sup>[3]</sup>.


  1. [Maintainable JavaScript 2011][1] by Nicholas C. Zakas
  2. [.properties][2] by Wikipedia
  3. [Props2Js][3]

 [1]: http://www.slideshare.net/nzakas/maintainable-javascript-2011
 [2]: http://en.wikipedia.org/wiki/.properties
 [3]: https://github.com/nzakas/props2js/
