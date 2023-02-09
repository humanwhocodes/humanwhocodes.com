---
title: Simple, maintainable templating with JavaScript
author: Nicholas C. Zakas
permalink: /blog/2011/10/11/simple-maintainable-templating-with-javascript/
categories:
  - Personal
tags:
  - Handlebars
  - HTML
  - JavaScript
  - Mustache
  - Templates
---
One of my principles of [Maintainable JavaScript][1] is to keep HTML out of JavaScript. The idea behind this principle is that all markup should be located in one place. It's much easier to debug markup issues when you have only one place to check. I always cringe when I see code such as this:

    function addItem(list, id, text){
        var item = document.createElement("li");
        item.innerHTML = "<a href=\"/view/" + id + "\">" + text + "</a>";  //ick
        item.id = "item" + id;
        list.appendChild(item);
    }

Whenever I see HTML embedded inside of JavaScript like this, I foresee a time when there's a markup issue and it takes far longer than it should to track down because you're checking the templates when the real problem is in the JavaScript. 

These days, there are some really excellent templating systems that work both in the browser and on the server, such as [Mustache][2] and [Handlebars][3]. Such templating systems allow all markup to live in the same template files while enabling rendering either on the client or on the server or both. There is a little bit of overhead to this in setup and preparation time, but ultimately the end result is a more maintainable system.

However, sometimes it's just not possible or worthwhile to change to a completely new templating system. In these situations, I like to embed the template into the actual HTML itself. How do I do that without adding junk markup to the page that may or may not be used? I use a familiar but under-appreciated part of HTML: comments.

A lot of developers are unaware that comments are actually part of the DOM. Each comment is represented as a node in the DOM and can be manipulated just like any other node. You can get the text of any comment by using the `nodeValue` property. For example, consider a simple page:

    <!DOCTYPE html>
    <html>
        <body><!--Hello world!--></body>
    </html>

You can grab the text inside of the comment via:

    var commentText = document.body.firstChild.nodeValue;

The value of `commentText` is simply, &#8220;Hello world!&#8221;. So the DOM is kind enough to remove the opening and closing comment indicators. This, plus the fact that comments are completely innocuous within markup, make them the ideal place to put simple template strings. 

Consider a dynamic list, one where you can add new items and the UI is instantly updated. In this case, I like to put the template comment as the first child of the `<ul>` or `<ol>` so its location isn't affected by other changes:

    <ul id="mylist"><!--<li id="item%s"><a href="/item/%s">%s</a></li>-->
        <li id="item1"><a href="/item/1">First item</a></li>
        <li id="item2"><a href="/item/2">Second item</a></li>
        <li id="item3"><a href="/item/3">Third item</a></li>
    </ul>

When I need to add another item to the list, I just grab the template out of the comment and format it using a very simple `sprintf()` implementation:

    /*
     * This function does not attempt to implement all of sprintf, just %s,
     * which is the only one that I ever use.
     */
    function sprintf(text){
        var i=1, args=arguments;
        return text.replace(/%s/g, function(pattern){
            return (i < args.length) ? args[i++] : "";
        });
    }</code>

This is a very minimal `sprintf()` implementation that only supports the use of `%s` for replacement. In practice, this is the only one I ever use, so I don't bother with more complex handling. You may want to use a different format or function for doing the replacing &#8211; this is really just a matter of preference.

With this out of the way, I am left with a fairly simple way of adding a new item:

    function addItem(list, id, text){
        var template = list.firstChild.nodeValue,
            result = sprintf(template, id, id, text),
            div = document.createElement("div");
    
        div.innerHTML = result;
        list.appendChild(div.firstChild);
    }

This function retrieves the template text and formats it into `result`. Then, a new `<div>` is created as a container for the new DOM elements. The `result` is injected into the `<div>`, which creates the DOM elements, and then the result is added to the list.

Using this technique, your markup still lives in the exact same place, whether that be a PHP file or a Java servlet. The most important thing is that the HTML is not embedded inside of the JavaScript.

There are also very simple ways to augment this solution if it's not quite right for you:

  * If you're using YUI, you may want to use [`Y.substitute()`][4] instead of `sprintf()` function.
  * You may want to put the template into a `<script>` tag with a custom value for `type` (similar to Handlebars). You can retrieve the template text by using the `text` property.

This is, of course, a very simplistic example. If you need more complex functionality such as conditions and loops, you'll probably want to go with a full templating solution.

 [1]: http://www.slideshare.net/nzakas/maintainable-javascript-2011
 [2]: http://mustache.github.com/
 [3]: http://www.handlebarsjs.com/
 [4]: http://yuilibrary.com/yui/docs/api/classes/YUI~substitute.html#method_substitute
