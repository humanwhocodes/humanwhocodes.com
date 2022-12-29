---
title: Using HTML5 semantic elements today
author: Nicholas C. Zakas
permalink: /blog/2011/03/22/using-html5-semantic-elements-today/
categories:
  - Web Development
tags:
  - HTML5
  - JavaScript
  - Web Development
  - Web Standards
---
Over the past year, the argument over whether or not to use the new HTML5 semantic elements has morphed into *how* to use the new HTML5 semantic elements. All major browsers officially supporting these elements before the end of the year (many before the end of the quarter), and as such, the time to start using these new elements is now. Of course, the world is not just made up of HTML5-capable browser and so the question of writing for backwards compatibility is a major question that many have attempted to answer.

## The problem

The biggest issue with using the new semantic elements is how non-supporting browsers deal with them. There are essentially three possible outcomes when HTML5 elements are used in a page:

  1. The tag is considered an error and is completely ignored. The DOM is constructed as if the tag doesn&#8217;t exist.
  2. The tag is considered an error and a DOM node is created as a placeholder. The DOM is constructed as indicated by the code but the tag has no styles applied (considered an inline element).
  3. The tag is recognized as an HTML5 tag and a DOM node is created to represent it. The DOM is constructed as indicated by the code and the tag has appropriate styling applied (in many cases, as a block element).

As a concrete example, consider this code:

    <div class="outer">
        <section>
            <h1>title</h1>
            <p>text</p>
        </section>
    </div>

Many browsers (such as Firefox 3.6 and Safari 4) will parse this as a top-level `<div>` element with an unknown child element (`<section>`) that is created in the DOM but treated as an inline element. The `<h1>` and `<p>` elements are children of `<section>`. Because `<section>` is represented in the DOM, it is possible to style the element. This is case #2.

Internet Explorer prior to 9 parses this as a top-level `<div>` but sees `<section>` as an error. So `<section>` is ignored and then `<h1>` and `<p>` are parsed, both becoming children of `<div>`. The closing `</section>` is also seen as an error and skipped. The effective understanding of this code in the browser is equivalent to:

    <div class="outer">
        <h1>title</h1>
        <p>text</p>
    </div>

So older Internet Explorer browsers actually recover quite nicely from unknown elements but creates a different DOM structure than other browsers. Because there is no DOM representation of the unknown element, you also cannot apply styles to `<section>`. This is case #1.

Of course, HTML5-capable browsers such as Internet Explorer 9, Firefox 4, and Safari 5 create the correct DOM structure and also apply the correct default styles to that element as specified in HTML5.

So the big problem is that browser produce not only different DOM structures for the same code, but also different styling rules for the same DOM structures.

## The solutions

A number of people have come up with a number of different solutions to using HTML5 elements in pages today. Each attempts to attack one or more of the specific problems already mentioned in an effort to provide cross-browser compatibility.

### JavaScript shims

JavaScript shims aim to primarily solve the problem of styling HTML5 elements in older Internet Explorer browsers. There is a now-well-known quirk in Internet Explorer where it won&#8217;t recognize unknown elements unless one of these elements has already been created via `document.createElement()`. So the browser will create a DOM element and will allow styling of a `<section>` element so long as `document.createElement("section")` is called.

Shims such as html5shim<sup>[1]</sup> use this capability to ensure that HTML5 elements correctly create DOM elements in Internet Explorer and therefore allow you to apply styles. Shims typically also set HTML5 block element to `display: block` so they display correctly across other browsers as well.

I don&#8217;t like this approach because it breaks one of my primary web application principles: JavaScript should not be relied on for layout. This is about more than creating a bad experience for those with JavaScript disabled, it&#8217;s about making a predictable and maintainable web application codebase where there is a clear separation of concerns amongst layers. It does have the benefit of producing the same DOM structure across all browsers, thus making sure your JavaScript and CSS works exactly the same everywhere, but that benefit doesn&#8217;t outweigh the downside in my opinion.

### Namespace hack

Never short on hacks, Internet Explorer also has another technique for making the browser recognize unknown elements. This one was first gained wide attention through Elco Klingen&#8217;s article, <cite>HTML5 elements in Internet Explorer without JavaScript</cite><sup>[2]</sup>. This technique involves declaring an XML-style namespace and then using elements with the namespace prefix, such as:

    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:html5="http://www.w3.org/html5/">
    <body>
        <html5:section>
            <!-- content -->
        </html5:section>
    </body>
    </html>

The `html5` prefix is just purely pretend and isn&#8217;t official at all &#8211; you could just as well have the prefix be &#8220;foo&#8221; and the effect would be the same. With the prefix in place, Internet Explorer will recognize the new elements so that you can apply styles. This also works in other browsers, so you&#8217;ll end up with the same DOM and same styling everywhere.

The downside is clear: you must use XML-style namespaces in an HTML document and also use them in CSS, meaning something like this:

    html5\:section {
        display: block;
    }

This isn&#8217;t the way I&#8217;d like web developers to have to write their code. It&#8217;s a brilliant solution to the problem but one that teaches what I consider to be an unnatural application of the new elements. I don&#8217;t want to see files full of namespaced elements.

### &#8220;Bulletproof&#8221; technique

I was first exposed to this technique at YUIConf 2010, when Tantek Çelik gave a talk entitled, <cite>HTML5: Right Here, Right Now</cite><sup>[3]</sup>. In that talk, Tantek suggests using an inner `<div>` element for each of the new HTML5 block elements, and to include a CSS class name on that `<div>` indicating that it represents the HTML5 element. For example:

    <section><div class="section">
       <!-- content -->
    </div></section>

The intent of this approach is to ensure that content flows correctly in all browsers. Using one block element inside of an HTML5 element that should be a block means you&#8217;ll either have a single block element (Internet Explorer < 9), a block element inside of an inline element (Firefox 3.6, Safari 4, etc.), or a block element inside of a block element (Internet Explorer 9, Firefox 4, Safari 5, etc.). In each of these three cases, the default rendering is the same.

Tantek did note one exception where this doesn&#8217;t work, and that is with `<hgroup>`, which explicitly disallows non-heading child elements. For that he recommended putting the `<div>` on the outside:

    <div class="hgroup"><hgroup>
       <!-- content -->
    </hgroup></div>

For styling, Tantek recommended not to try to style the HTML5 element itself but rather to style the surrogate `<div>`. So instead of this:

    section {
        color: blue;
    }

Use this:

    .section {
        color: blue;
    }

The rationale is that it will be easy to automatically convert this pattern into one referencing the HTML5 element tag name later on. I&#8217;m not a fan of this part of his suggestion, since I generally do not like applying styles via tag name.

The downside of this approach is that different browsers create different DOM structures and so you must be careful in how you write JavaScript and CSS. For instance, using the immediate child selector (`>`) across an HTML5 element won&#8217;t work in all browsers. Also, directly accessing `parentNode` might result in a different node in different browsers. This is especially obvious in code such as:

    <div class="outer">
        <section><div class="section main">
            <!-- content -->
        </div></section>
    </div>

If you then have a selector such as `section > .main`, it will not be applied in Internet Explorer 8 and earlier. Whenever you cross the HTML 4 to HTML5 to HTML 4 barrier, you&#8217;ll end up with these issues.

### Reverse bulletproof technique

There are other posts, such as Thierry Koblentz&#8217;s, <cite>HTML elements and surrogate DIVs</cite><sup>[4]</sup> that have explored reversing Tantek&#8217;s approach so that the HTML5 elements appear inside of the `<div>` elements. For example:

    <div class="section"><section>
        <!-- content -->
    </section><div>

The only difference is the placement of the HTML5 element &#8211; everything else is the same. Proponents like this technique because of its consistency (works the same for all elements, including `<hgroup>`). It&#8217;s worth noting that this approach has the same caveats as Tantek&#8217;s as part as selector usage and JavaScript DOM traversal goes. It&#8217;s main advantage is the consistency of technique.

## My approach

My main goal in choosing an approach was to ensure that I would only have to make changes to the HTML of a page. That meant zero changes to either CSS or JavaScript. Why make such a requirement? The more layers of a web application (or any application) that have to change, the more likely you are to introduce bugs. Limiting the changes to one layer limits the introduction of bugs and, if they occur, limits your search for the underlying problem to one area. For example, if a layout breaks, I&#8217;ll know it was because I added `<section>` rather than the combination of that plus a change to the CSS that styles that area.

After researching each of these techniques, doing some prototyping and testing, I eventually arrived back at Tantek&#8217;s approach. It was the only one where I could get all of the existing pages I was prototyping with to work without requiring changes to CSS and JavaScript. Now, I didn&#8217;t follow his approach to the letter and made several changes where I thought improvements could be made.

First, I never styled anything based on the class name representing the HTML5 element (so no `.section`in my selectors). I kept the same `<div>` elements that were already in the page and used the semantic class names that were applied to these elements as my style and JavaScript hooks. For instance, this code:

    <div class="content">
        <!-- content -->
    </div>
    

Became this code:

    <section><div class="section content">
        <!-- content -->
    </div></section>

With this change, I still used `.content` as the style and scripting hook for that area of the page. In doing so, the JavaScript and CSS I already had didn&#8217;t need to change.

Second, instead of having a special case for `<hgroup>`, I opted not to use it. The honest truth is that I didn&#8217;t find anywhere in any of my existing pages where this element would have been useful. Since `<hgroup>` can only contain headings, it&#8217;s mostly safe to include `<hgroup>` on its own if you really want to (assuming its contained within another block element).

I did spend a considerable amount of time bouncing back and forth between bulletproof and reverse bulletproof trying to determine which one worked best. The key determining factor for me was that reverse bulletproof required me to add CSS to make it work. In browsers that created a DOM node for the HTML5 element but did not apply default styling, having an HTML5 block element inside of a `<div>` messed up my layouts on more than one occasion because they became inline elements in older browsers. I had to explicitly add rules to make them into block elements to make my layouts work, and that broke my own requirement of not changing CSS to make things work.

## The proof

One of the things I&#8217;ve found incredibly frustrating in this realm of discussion is how people too quickly dismiss one approach because they can find at least one situation where it doesn&#8217;t work. None of the solutions I presented here is perfect; none of them work in every single situation you may run into. If you give me any technique I can virtually guarantee you that someone can come up with a situation where it won&#8217;t work. That doesn&#8217;t invalidate the technique, it simply informs you of the technique&#8217;s limitations so you can make a better decision.

In my research I took several existing pages and converted them to use the modified bulletproof technique. I put them in pages with simple layouts and complex layouts, pages with and without JavaScript interactions. In each case, the only changes I made were to the HTML and everything continued to work correctly (no changes to JavaScript or CSS). What about those caveats about child nodes and parent node relationships? The interesting thing is that I never ran into these problems.

Granted, the reason it may have been so easy for me is because of the rigor I apply to my coding. I religiously double-check that:

  * Tag names and IDs are not being used to apply styles (only use class names)
  * CSS selectors are as general as possible and use as few selector types as possible
  * JavaScript doesn&#8217;t rely on a specific DOM structure to work
  * Tag names aren&#8217;t being used to manipulate the DOM

Another interesting thing I noted is that I was using the HTML5 elements as containers. These new elements really are just boundaries between groups of functionality rather than anything else. You spend most of your time styling and scripting items inside of these boundaries rather than crossing the boundaries themselves. Since my JavaScript and CSS targets what&#8217;s going on inside of containers, *everything continued to work.* I suspect this would be the case for most sites that have been well-coded.

## Conclusion

The technique I ultimately decided on and would recommend to others is a modification of Tantek&#8217;s bulletproof technique. Clearly the name is a bit of a misnomer as there are some side effects in CSS and JavaScript, but in my experiments it really did seem to be the one approach that allowed me to change just the HTML of a page and have everything continue to work. I&#8217;m sure the debate will continue both inside of companies and on the Internet in general, and I hope this post helps you make an informed decision.

## References

  1. [html5shim][1]
  2. [<cite>HTML5 elements in Internet Explorer without JavaScript</cite>][2], by Elco Klingen<cite><em> </em></cite>
  3. <cite>HTML5: Right Here, Right Now</cite>, by Tantek Çelik ([Video][3], [Slides][4])
  4. [<cite>HTML elements and surrogate DIVs</cite>][5], by Thierry Koblentz

 [1]: http://code.google.com/p/html5shim/
 [2]: http://www.debeterevormgever.nl/html5-ie-without-javascript/
 [3]: http://developer.yahoo.com/yui/theater/video.php?v=yuiconf2010-tantek
 [4]: http://tantek.com/presentations/2010/11/html5-now/
 [5]: http://www.css-101.org/articles/thoughts_on_the_new_html_elements_and_surrogate_divs/
