---
title: The value of HTML validation
author: Nicholas C. Zakas
permalink: /blog/2010/08/17/the-value-of-html-validation/
categories:
  - Web Development
tags:
  - HTML
  - Validation
---
This post has been percolating in my mind for some time, and reading [Chris Heilmann&#8217;s post][1] about [Remy Sharp&#8217;s site][2]. Chris and I have had more than a couple exchanges about this very topic and we&#8217;ve had to agree to disagree in the past. I&#8217;ve been very vocal, both publicly and privately, about my disdain for the current state of HTML validation. To understand my position, you first need to understand what the HTML validator does.

## What is HTML validation?

The [HTML validator][3] performs several checks on your code. The major ones are:

  1. **Syntax validation -** checks for syntax errors. Technically `<foo bar="baz">` is correct *syntax* even though `<foo>` is not part of HTML, so syntax validation alone is minimally useful for writing good HTML.
  2. **Tag nesting validation -** checks that elements are closed in the reverse order in which they were opened. This catches those instances when a `<div>` isn&#8217;t closed appropriately, for example.
  3. **DTD validation** &#8211; checks that your code follows the patterns specified in the DTD. This includes validating tag names, attribute names, and tag embedding (which tags are allowed inside of others).
  4. **Outlier validation** &#8211; checks for anything appearing in the code that was not mentioned in the DTD. Custom tags and custom attributes are the common findings.

Keep in mind that these are logical validation tasks and not necessarily how the validator is implemented. If any one of these checks fails, the HTML is considered invalid. And therein lies the problem.

## The argument

The argument for HTML validation is typically along the lines of ensuring interoperability across multiple browsers. Every browser has a different parser and feeding it what everyone agrees to understand is the only way to be sure your code will work everywhere it should. Since each browser has different error-correction mechanisms in their HTML parser you cannot rely on invalid code to behave in predictable ways.

The argument against HTML validation is that it&#8217;s too strict and doesn&#8217;t allow for how browsers actually work. Yes, the HTML may technically be invalid, but all browsers handle some invalid HTML similarly (note: not often exactly the same). If I&#8217;m willing to take responsibility for the invalid code I&#8217;m writing, I shouldn&#8217;t have to worry about validation. All I care about is that it works.

## My position

This is one of the few times that I&#8217;ll ever publicly make a statement of position on something, so enjoy. I&#8217;ve always been in the camp that&#8217;s against validation on the grounds that the HTML validator is far too strict to be practical in real-world scenarios. There are things that browsers widely support (`<noscript>` in `<head>`, `<script>` after `</html>`) that are invalid yet sometimes very necessary for delivering the correct user experience.

Practically speaking, though, my big problem with HTML validation is in task #4 (flagging outliers). I&#8217;m a big believer in the use of custom attributes on HTML elements for providing additional meta data related to a particular element. To me, it just makes sense to add a foo attribute when I have bar data that I need associated with it. Sometimes people overload existing attributes for this purpose just to ensure that their code validates even though the attribute is being used in a way in which it was never intended. That doesn&#8217;t make sense to me.

The dirty secret of browsers is that they never perform HTML validation against a DTD. The doctype you put at the top of the document switches the parser into a particular mode of operation, but no operations involve downloading the doctype and verifying that the code matches. What does this mean? It means that a basic syntax parser handles HTML, with exceptions specified for self-closing tags and block vs. inline elements (and I&#8217;m sure other situations as well).

In the case of custom attributes, all browsers parse and consider syntactically-correct as real attributes, thus making them accessible through the DOM via JavaScript. Not only do browsers not break while parsing custom attributes, they parse correctly and are treated like any other attribute! So why would I be worried about this? I will continue to use custom attributes and am very glad that HTML5 formalized them as datasets.

The best example of a technology that causes invalid HTML but has incredible importance is [ARIA][4]. ARIA works by overlaying additional attributes onto HTML 4. These attributes provide additional semantic meaning to HTML elements and the browser is able to transmit those semantics to assistive devices designed to help differently-abled people experience the web in a usable way. All major browsers currently support ARIA markup. Yet if you add in those attributes, all of a sudden you have invalid HTML.

I don&#8217;t feel as strongly about custom elements, which are discarded as part of error-recovery. Personally, I think that throwing custom elements into a page in a syntactically-correct way should be okay, but I don&#8217;t see a very strong use case for doing so.

To be clear on my position: I strongly believe that tasks #1 and #2 are fundamentally important and should be done all the time. Task #3 I&#8217;d place as important but less so than the first two. Task #4 is of questionable importance to me as it relates to custom attributes. At a maximum, outliers should be flagged as warnings just to double-check that you didn&#8217;t misspell an attribute name. Flagging custom elements as errors is probably a good idea, though has some downsides as it relates to embedding of other markup content such as SVG and MathML (essentially, each of these needs to become a specific exception in the parser).

## Validation for the sake of validation?

Let me say this as strongly as I can: validation for the sake of validation is just plain silly. Valid HTML means just that all four tasks completed without errors. There are a lost of things that valid HTML does not guarantee:

  * Valid HTML does not guarantee accessibility
  * Valid HTML does not guarantee a good user experience
  * Valid HTML does not guarantee a functioning site
  * Valid HTML does not guarantee the layout is correct

Having valid HTML code may be a badge of honor that gains you some geek cred, but it is not a measure of success in and of itself. Your code isn&#8217;t necessarily better at doing its job than mine.

## HTML5 validation

HTML5 validation fixes some of the issues that I and others have with HTML 4 validation. It explicitly allows ARIA attributes and you can add your own attributes so long as they begin with `data-`. All of these cases are considered valid HTML5 and satisfy me vs. HTML 4 validation. To be clear, there are still some parts of the HTML5 validator that I disagree with, but I do believe it more accurately reflects real-world use cases than the HTML 4 validator.

## Conclusion and please keep civil

I do believe that parts of the HTML validation service are incredibly useful, but I won&#8217;t be held hostage because I&#8217;m using custom attributes. I&#8217;m proud of using ARIA roles in my day job and couldn&#8217;t care less if that makes the HTML 4 validator unhappy. Again, of the four tasks that are part of the validator, I only have a problem with one of them. And the HTML5 validator takes care of most of my issues.

I know this is a hot-button issue that will likely spawn several more threads and blog posts. I already have this disclaimer at the comment form, but please keep all further discussion civil and productive. I know there are people who come down very strongly on each side of this argument and everyone has valid points (no pun intended). It would be great to get a good, strong debate going in the comments, but let&#8217;s make sure tempers are kept in check. This should be an intellectual debate, not an emotional one. That being said, I&#8217;m going to be moderating the comments even more heavily than usual &#8211; so play nice!

 [1]: http://www.wait-till-i.com/2010/08/17/validate-dont/
 [2]: http://doesvalidationmatter.com/
 [3]: http://validator.w3.org
 [4]: http://www.w3.org/WAI/intro/aria
