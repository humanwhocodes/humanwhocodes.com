---
title: getElementsMatching()
author: Nicholas C. Zakas
permalink: /blog/2007/02/22/getelementsmatching/
categories:
  - Web Development
tags:
  - DOM
  - JavaScript
---
In response to a <a title="What's the deal with CSS query engines?" rel="external" href="{{site.url}}/archive/2007/2/421#comments">previous post</a>, I was challenged to come up with a way to determine that elements had certain similarities without using CSS queries. Since this may benefit others, I decided to spin off the long comment thread into another post. I've called my solution `getElementsMatching()`:

<code class="block"> </code>

<pre>function getElementsMatching(tagName, matcher) {
    var elements = document.getElementsByTagName(tagName);
    var result = [];
    for (var i=0, len=elements.length; i &lt; len; i++){
        if (matcher(elements[i])){
            result.push(elements[i]);
        }
    }
    return result;
}</pre>

This function works be accepting a tag name to look for as well as a function that determines if an element passes the test to be included in the resultset. For instance, to return all of the `div` elements with a class of &#8220;special&#8221;, you could do the following:

<code class="block"> </code>

<pre>var results = getElementsMatching("div", function (element){
    return (element.className == "special");
});</pre>

The second argument should be a function that accepts an element as an argument and returns `true` if the element should be part of the resultset or `false` if not.

Of course, this function could be augmented to accept a reference node from which the initial search is conducted (instead of using `document` as the base), but I think you get the point. Let the flaming begin!
