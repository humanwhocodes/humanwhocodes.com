---
title: A critical review of ECMAScript 6 quasi-literals
author: Nicholas C. Zakas
permalink: /blog/2012/08/01/a-critical-review-of-ecmascript-6-quasi-literals/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - Quasis
---
Quasi-literals (update: now formally called &#8220;template strings&#8221;) are a proposed addition to ECMAScript 6 designed to solve a whole host of problems. The proposal seeks to add new syntax that would allow the creation of domain-specific languages (DSLs)<sup>[1]</sup> for working with content in a way that is safer than the solutions we have today. The description on the <cite>template string-literal strawman page</cite><sup>[2]</sup> is as follows:

> This scheme extends EcmaScript syntax with syntactic sugar to allow libraries to provide DSLs that easily produce, query, and manipulate content from other languages that are immune or resistant to injection attacks such as XSS, SQL Injection, etc.

In reality, though, template strings are ECMAScript's answer to several ongoing problems. As best I can figure, these are the immediate problems template strings attempt to address:

  1. **Multiline strings** &#8211; JavaScript has never had a formal concept of multiline strings.
  2. **Basic string formatting** &#8211; The ability to substitute parts of the string for values contained in variables.
  3. **HTML escaping** &#8211; The ability to transform a string such that it is safe to insert into HTML.
  4. **Localization of strings** &#8211; The ability to easily swap out string from one language into a string from another language.

I've been looking at template strings to figure out if they actually solve these problems sufficiently or not. My initial reaction is that template strings solve some of these problems in certain situations but aren't useful enough to be the sole mechanism of addressing these problems. I decided to take some time and explore template strings to figure out if my reaction was valid or not.

## The basics

Before digging into the use cases, it's important to understand how template strings work. The basic format for template strings is as follows:

    `literal${substitution}literal`

This is the simplest form of template string that simply does substitutions. The entire template string is enclosed in backticks. In between those backticks can be any number of characters including white space. The dollar sign (`$`) indicates an expression that should be substituted. In this example, the template string would replace `${substitution}` With the value of the JavaScript variable called `substitution` That is available in the same scope in which the template string is defined. For example:

    var name = "Nicholas",
        msg = `Hello, ${name}!`;
        
    console.log(msg);    // "Hello, Nicholas!"

In this code, the template string has a single identifier to substitute. The sequence `${name}` is replaced by the value of the variable `name`. You can substitute more complex expressions, such as:

    var total = 30,
        msg = `The total is ${total} (${total*1.05} with tax)`;
        
    console.log(msg);       // "The total is 30 (31.5 with tax)"

This example uses a more complex expression substitution to calculate the price with tax. You can place any expression that returns a value inside the braces of a template string to have that value inserted into the final string.

The more advanced format of a template string is as follows:

    tag`literal${substitution}literal`

This form includes a tag, which is basically just a function that alters the output of the template string. The template string proposal includes a proposal for several built-in tags to handle common cases (those will be discussed later) but it's also possible to define your own.

A tag is simply a function that is called with the processed template string data. The function receives data about the template string as individual pieces that the tag must then combined to create the finished value. The first argument the function receives is an array containing the literal strings as they are interpreted by JavaScript. These arrays are organized such that a substitution should be made between items, so there needs to be a substitution made between the first and the second item, the second and the third item, and so on. This array also has a special property called `raw`, which is an array containing the literal strings as they appear in the code (so you can tell what was written in the code). Each subsequent argument to the tag after the first is the value of a substitution expression in the template string. For example, this is what would be passed to a tag for the last example:

  * Argument 1 = `[ "The total is ", " (", " with tax)" ]` 
      * `.raw = [ "The total is ", " (", " with tax)" ]`
  * Argument 2 = `30`
  * Argument 3 = `31.5`

Note that the substitution expressions are automatically evaluated, so you just receive the final values. That means the tag is free to manipulate the final value in any way that is appropriate. For example, I can create a tag that behaves the same as the defaults (when no tag specified) like this:

    function passthru(literals) {
        var result = "",
            i = 0;
            
        while (i < literals.length) {
            result += literals[i++];
            if (i < arguments.length) {
                result += arguments[i];
            }
        }
        
        return result;
    
    }</code>

And then you can use it like this:

    var total = 30,
        msg = passthru`The total is ${total} (${total*1.05} with tax)`;
        
    console.log(msg);       // "The total is 30 (31.5 with tax)"

In all of these examples, there has been no difference between `raw` and `cooked` Because there were no special characters within the template string. Consider template string like this:

    tag`First line\nSecond line`

In this case, the tag would receive:

  * Argument 1 = `cooked = [ "First line\nSecond line" ]` 
      * `.raw = [ "First line\\nSecond line" ]`

Note that the first item in `raw` is an escaped version of the string, effectively the same thing that was written in code. May not always need that information, but it's around just in case.

## Multiline strings

The first problem that template string literals were meant to address his multiline strings. As I've mentioned in previous posts, this isn't a big problem for me, but I know that there are a fair number of people who would like this capability. There has been an unofficial way of doing multiline string literals and JavaScript for years using a backslash followed by a newline, such as this:

    var text = "First line\n\
    Second line";

This has widely been acknowledged as a mistake and something that is considered a bad practice, although it was blessed as part of ECMAScript 5. Many resort to using arrays in order not to use the unofficial technique:

    var text = [ 
        "First line", 
        "Second line"].join("\n");

However, this is pretty cumbersome if you're writing a lot of text. It would definitely be easier to have a way to include  
this directly within the literal. Other languages have had this feature for years.

There are of course heredocs<sup>[3]</sup>, such as what is supported in PHP:

    $text = <<<EOF
    First line
    Second line
    EOF;

And Python has its triple quoted strings:

    text = """First line
    Second line"""

In comparison, template string-literals look cleaner because they use fewer characters:

    var text = `First line
    Second line`;

So it's pretty easy to see that template strings solve the problem of multiline strings in JavaScript pretty well. This is undoubtedly a case where new syntax is needed, because both the double quote and single quote are already spoken for (and pretty much are exactly the same).

## Basic string formatting

The problem the basic string formatting hasn't been solved in JavaScript yet. When I say basic string formatting, I'm talking about simple substitutions within text. Think of `sprintf` in C or `String.format()` in C# or Java. This comment isn't particularly for and JavaScript, finding life in a few corners of development.

First, the `console.log()` method (and its related methods) support basic string formatting in Internet Explorer 8+, Firefox, Safari, and Chrome (Opera doesn't support string formatting on the console). On the server, Node.js also supports string formatting for its `console.log()`<sup>[4]</sup>. You can include `%s` to substitute a string, `%d` or `%i` to substitute an integer, or `%f` for floating-point vlaues (Node.js also allows `%j` for including JSON, Firefox and Chrome allow `%o` for outputting an object<sup>[5]</sup>). For example:

    console.log("Hello %s", "world");  // "Hello world"
    console.log("The count is %d", 5);    // "The count is 5"

Various JavaScript libraries have also implemented similar string formatting functions. YUI has the `substitute()`<sup>[6]</sup> method, which uses named values for string replacements:

    YUI().use("substitute", function(Y) {
    
        var msg = Y.substitute("Hello, {place}", { place: "world" });
        console.log(msg);   // "Hello, world"
    
    });

Dojo has a similar mechanism via `dojo.string.substitute()`<sup>[7]</sup>, though it can also deal with positional substitutions by passing an array:

    var msg = dojo.string.substitue("Hello, ${place}", { place: "world" });
    console.log(msg);   // "Hello, world"
    
    msg = dojo.string.substitue("Hello, ${0}", [ "world" ]);
    console.log(msg);   // "Hello, world"

It's clear that basic string formatting is already alive and well in JavaScript and chances are that many developers have used it at some point in time. Keep in mind, simple string formatting isn't concerned with escaping of values because it is doing simple string manipulation (HTML escaping is discussed later).

In comparison to the already available string formatting methods, template strings visually appear to be very much the same. Here's how the previous examples would be written using a template string:

    var place = "world",
        msg = `Hello, ${place}`;
        
    console.log(msg);   // "Hello, world"

Syntactically, one could argue that template strings are easier to read because the variable is placed directly into the literal so you can guess the result more easily. So if you're going to be converting code using older string formatting methods into template strings, it's a pretty easy conversion if you are using string literals directly in your JavaScript.

The downside of template strings is the same downside experienced using heredocs: the literal must be defined in a scope that has access to the substitution variables. There are couple of problems with this. First, if a substitution variable isn't defined in the scope in which a template string is defined, it will throw an error. For example:

    var msg = `Hello, ${place}`;    // throws error

Because `place` isn't defined in this example, the template string actually throws an error because it's trying to evaluate the variable that doesn't exist. That behavior is also cause of the second major problem with template strings: you cannot externalize strings.

When using simple string formatting, as with `console.log()`, YUI, or Dojo, you have the ability to keep your strings external from the JavaScript code that uses it. This has the advantage of making string changes easier (because they aren't buried inside of JavaScript code) and allowing the same strings to be used in multiple places. For example, you can define your strings in one place such as this:

    var messages = {
        welcome: "Hello, {name}"
    };

And use them somewhere else like this:

    var msg = Y.substitute(messages.welcome, { name: "Nicholas" });

With template strings, you are limited to using substitution only when the literal is embedded directly in your JavaScript along with variables representing the data to substitute. In effect, format strings have late binding to data values and template strings have early binding to data values. That early binding severely limits the cases where template strings can be used for the purpose of simple substitutions.

So while template strings solve the problem of simple string formatting when you want to embed literals in your JavaScript code, they do not solve the problem when you want to externalize strings. For this reason, I believe that even with the addition of template strings, some basic string formatting capabilities need to be added to ECMAScript.

## Localization of strings

Closely related to simple string formatting is localization of strings. Localization is a complex problem encompassing all aspects of a web application, but localization of strings is what template strings are supposed to help with. The basic idea is that you should be able to define a string with placeholders in one language and be able to easily translate the strings into another language that makes use of the same substitutions. 

The way this works in most systems today is that strings are externalized into a separate file or data structure. Both YUI<sup>[9]</sup> and Dojo<sup>[10]</sup> support externalized resource bundles for internationalization. Fundamentally, these work the same way as simple string formatting does, where each of the strings is a separate property in an object that can be used in any number of places. The strings can also contain placeholders for substitutions by the library's method for doing so. For example:

    // YUI
    var messages = Y.Intl.get("messages");
    console.log(messages.welcome, { name: "Nicholas" });

Since the placeholder in the string never changes regardless of language, the JavaScript code is kept pretty clean and doesn't need to take into account things like different order of words and substitutions in different languages.

The approach that template strings seemed to be recommending is more one of a tool-based process. The strawman proposal talks about a special `msg` tag that is capable of working with localized strings. The purpose of `msg` is only to make sure that the substitutions themselves are being formatted correctly for the current locale (which is up to the developer to define). Other than that, it appears to only do basic string substitution. The intent seems to be to allow static analysis of the JavaScript file such that a new JavaScript file can be produced that correctly replaces the contents of the template string with text that is appropriate for the locale. The first example given is of translating English into French assuming that you already have the translation data somewhere:

    // Before
    alert(msg`Hello, ${world}!`);
     
    // After
    alert(msg`Bonjour ${world}!`);

The intent is that the first line is translated to the second line by some as-yet-to-be-defined tool. For those who don't want to use this tool, the proposal suggests including the message bundle in line such that the `msg` tag looks up its data in that bundle in order to do the appropriate replacement. Here is that example:

    // Before
    alert(msg`Hello, ${world}!`);
     
    // After
    var messageBundle_fr = {  // Maps message text and disambiguation meta-data to replacement.
      'Hello, {0}!': 'Bonjour {0}!'
    };
     
    alert(msg`Hello, ${world}!`);

The intent is that the first line is translated into the several lines after it before going to production. You'll note that in order to make this work, the message bundle is using format strings. The `msg` tag is then written as:

    function msg(parts) {
      var key = ...;  // 'Hello, {0}!' given ['Hello, ', world, '!']
     
      var translation = myMessageBundle[key];
     
      return (translation || key).replace(/\{(\d+)\}/g, function (_, index) {
          // not shown: proper formatting of substitutions
          return parts[(index < < 1) | 1];
        });
    }</code>

So it seems that in an effort to avoid format strings, template strings are only made to work for localization purposes by implementing its own simple string formatting.

For this problem, it seems like I'm actually comparing apples to oranges. The way that YUI and Dojo deal with localized strings and resource bundles is very much catered towards developers. The template string approach is very much catered towards tools and is therefore not very useful for people who don't want to go through the hassle of integrating an additional tool into their build system. I'm not convinced that the localization scheme in the proposal represents a big advantage over what developers have already been doing.

## HTML escaping

This is perhaps the biggest problem that template strings are meant to address. Whenever I talk to people on TC-39 about template strings, the conversation always seems to come back to secure escaping for insertion into HTML. The proposal itself starts out by talking about cross-site scripting attacks and how template strings help to mitigate them. Without a doubt, proper HTML escaping is important for any web application, both on the client and on the server. Fortunately, we have seen some more logical typesetting languages pop up, such as Mustache, which automatically escape output by default. 

When talking about HTML escaping, it's important to understand that there are two distinct classes of data. The first class of data is controlled. Controlled data is data that is generated by the server without any user interaction. That is to say the data was programmed in by developer and was not entered by user. The other class of data is uncontrolled, which is the very thing that template strings were intended to deal with. Uncontrolled data is data that comes from the user and you can therefore make no assumptions about its content. One of the big arguments against format strings is the threat of uncontrolled format strings<sup>[11]</sup> and the damage they can cause. This happens when uncontrolled data is passed into a format string and isn't properly escaped along the way. For example:

    // YUI
    var html = Y.substitute(">p<Welcome, {name}>/p<", { name: username });

In this code, the HTML generated could potentially have a security issue if `username` hasn't been sanitized prior to this point. It's possible that `username` could contain HTML code, most notably JavaScript, that could compromise the page into which the string was inserted. This may not be as big of an issue on the browser, where script tags are innocuous when inserted via `innerHTML`, but on the server this is certainly a major issue. YUI has `Y.Escape.html()` to escape HTML that could be used to help:

    // YUI
    YUI().use("substitute", "escape", function(Y) {
        var escapedUsername = Y.Escape.html(username),
            html = Y.substitute(">p<Welcome, {name}>/p<", { name: escapedUsername });
    });

After HTML escaping, the username is a bit more sanitized before being inserted into the string. That provides you with a basic level of protection against uncontrolled data. The problems can get a little more complicated than that, especially when you're dealing with values that are being inserted into HTML attributes, but essentially escaping HTML before inserting into an HTML string is the minimum you should do to sanitize data.

Template strings aim to solve the problem of of HTML escaping plus a couple of other problems. The proposal talks about a tag called `safehtml`, which would not only perform HTML escaping, but would also look for other attack patterns and replace them with innocuous values. The example from the proposal is:

    url = "http://example.com/";
    message = query = "Hello & Goodbye";
    color = "red";
    safehtml`<a href="${url}?q=${query}" onclick=alert(${message}) style="color: ${color}">${message}</a>`

In this instance, there are a couple potential security issues in the HTML literal. The URL itself could end up being a JavaScript URL that does something bad, the query string could also end up being something bad, and the CSS value could end up being a CSS expression in older versions of Internet Explorer. For instance: 

    url = "javascript:alert(1337)";
    color = "expression(alert(1337))";

Inserting these values into a string using simple HTML escaping, as in the previous example, would not prevent the resulting HTML from containing dangerous code. An HTML-escaped JavaScript URL still executes JavaScript. The intent of `safehtml` is to not only deal with HTML escaping but also to deal with these attack scenarios, where a value is dangerous regardless of it being escaped or not. 

The template string proposal claims that in a case such as with JavaScript URLs, the values will be replaced with something completely innocuous and therefore prevent any harm. What it doesn't cover is how the tag will know whether a &#8220;dangerous&#8221; value is actually controlled data and intentionally being inserted versus uncontrolled data that should always be changed. My hunch from reading the proposal is that it always assumes dangerous values to be dangerous and it's up to the developer to jump through hoops to include some code that might appear dangerous to the tag. That's not necessarily a bad thing.

So do template strings solve the HTML escaping problem? As with simple string formatting, the answer is yes, but only if you are embedding your HTML right into JavaScript where the substitution variables exist. Embedding HTML directly into JavaScript is something that I warned people not to do because it becomes hard to maintain. With templating solutions such as Mustache, the templates are often read in at runtime from someplace or else precompiled into functions that are executed directly. It seems that the intended audience for the `safehtml` tag might actually be the template libraries. I could definitely see this being useful when templates are compiled. Instead of compiling into complicated functions, the templates could be compiled into template strings using the `safehtml` tag. That would eliminate some of the complexity of template languages, though I'm sure not all.

Short of using a tool to generate template strings from strings or templates, I'm having a hard time believing that developers would go through the hassle of using them when creating a simple HTML escape function is so easy. Here's the one that I tend to use:

    function escapeHTML(text) {
        return text.replace(/[<>"&]/g, function(c) {
            switch (c) {
                case "< ":  return "&lt;";
                case ">":   return "&gt;";
                case "\"":  return "&quot;";
                case "&#038;":   return "&amp;";
            }
        });
    }

I recognize that doing basic HTML escaping isn't enough to completely secure an HTML string against all threats. However, if the template string-based HTML handling must be done directly within JavaScript code, and I think many developers will still end up using basic HTML escaping instead. Libraries are already providing this functionality to developers, it would be great if we could just have a standard version that everyone can rely on so we can stop shipping the same thing with every library. As with the `msg` tag, which needs simple string formatting to work correctly, I could also see `safehtml` needing basic HTML escaping in order to work correctly. They seem to go hand in hand.

## Conclusion

Template strings definitely address all four of the problems I outlined at the beginning of this post. They are most successful in addressing the need to have multiline string literals in JavaScript. The solution is arguably the most elegant one available and does the job well. 

When it comes to simple string formatting, template strings solve the problem in the same way that heredocs solve the problem. It's great if you are going to be embedding your strings directly into the code near where the substitution variables exist. If you need to externalize your strings, then template strings aren't solving the problem for you. Given that many developers externalize strings into resource bundles that are included with their applications, I'm pessimistic about the potential for template strings to solve the string formatting needs of many developers. I believe that a format string-based solution, such as the one that was Crockford proposed<sup>[12]</sup>, still needs to be part of ECMAScript for it to be complete and for this problem to be completely solved.

I'm not at all convinced that template strings solve a localization use case. It seems like this use case was shoehorned in and that current solutions require a lot less work implement. Of course, the part that I found most interesting about the template strings solution for localization is that it made use of format strings. To me, that's a telling sign that simple string formatting is definitely needed in ECMAScript. Template strings seem like the most heavy-handed solution to the localization problem, even with the as-yet-to-be-created tools that the proposal talks about.

Template strings definitely solve the HTML escaping problem, but once again, only in the same way that simple string formatting is solved. With the requirement of embedding your HTML inside of the JavaScript and having all variables present within that scope, the `safehtml` tag seems to only be useful from the perspective of templating tools. It doesn't seem like something that developers will use by hand since many are using externalized templates. If templating libraries that precompiled templates are the target audience for this feature then it has a shot at being successful. I don't think, however, that it serves the needs of other developers. I still believe that HTML escaping, as error-prone as it might be, is something that needs to be available as a low-level method in ECMAScript.

Note: I know there are a large number of people who believe HTML escaping shouldn't necessarily be part of ECMAScript. Some say it should be a browser API, part of the DOM, or something else. I disagree with that sentiment because JavaScript is used quite frequently, on both the client and server, to manipulate HTML. As such, I believe that it's important for ECMAScript to support HTML escaping along with URL escaping (which it has supported for a very long time).

Overall, template strings are an interesting concept that I think have potential. Right off the bat, they solve the problem of having multiline strings and heredocs-like functionality in JavaScript. They also appear to be an interesting solution as a generation target for tools. I don't think that they are a suitable replacement for simple string formatting or low-level HTML escaping for JavaScript developers, both of which could be useful within tags. I'm not calling for template strings to be ripped out of ECMAScript, but I do think that it doesn't solve enough of the problems for JavaScript developers that it should preclude other additions for string formatting and escaping.

**Update (01-August-2012)** &#8211; Updated article to mention that braces are always required in template strings. Also, addressed some of the feedback from Allen's comment by changing &#8220;quasi-literals&#8221; to &#8220;template strings&#8221; and &#8220;quasi handlers&#8221; to &#8220;tags&#8221;. Updated description of slash-trailed multiline strings.

**Update (02-August-2012)** &#8211; Fixed YUI method name based on Ryan's comment. Fixed `escapeHTML()` function encoding issue per Jakub's comment.


  1. [Domain-specific language][1] (Wikipedia)
  2. [ECMAScript quasi-literals][2] (ECMAScript Wiki)
  3. [Here-Documents][3] (Wikipedia)
  4. [The built-in console module][4] by Charlie McConnell (Nodejitsu)
  5. [Outputting text to the console][5] (Mozilla Developer Network)
  6. [YUI substitute method][6] (YUILibrary)
  7. [dojo.string.substitute()][7] (Dojo Toolkit)
  8. [YUI Internationalization][8] (YUILibrary)
  9. [Translatable Resource Bundles][9] by Adam Peller
 10. [Uncontrolled format string][10] (Wikipedia)
 11. [String.prototype.format][11] by Douglas Crockford (ECMAScript Wiki)

 [1]: http://en.wikipedia.org/wiki/Domain-specific_language
 [2]: http://wiki.ecmascript.org/doku.php?id=harmony:quasis
 [3]: http://en.wikipedia.org/wiki/Here_document
 [4]: http://docs.jit.su/articles/getting-started/the-console-module
 [5]: https://developer.mozilla.org/en/DOM/console#Outputting_text_to_the_console
 [6]: http://yuilibrary.com/yui/docs/api/classes/YUI~substitute.html#method_substitute
 [7]: http://livedocs.dojotoolkit.org/dojo/string#substitute
 [8]: http://yuilibrary.com/yui/docs/intl/
 [9]: http://dojotoolkit.org/reference-guide/1.7/quickstart/internationalization/resource-bundling.html
 [10]: http://en.wikipedia.org/wiki/Uncontrolled_format_string
 [11]: http://wiki.ecmascript.org/doku.php?id=strawman:string_format
