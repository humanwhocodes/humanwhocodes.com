---
title: What CSS is missing
author: Nicholas C. Zakas
permalink: /blog/2007/01/25/what-css-is-missing/
categories:
  - Web Development
tags:
  - CSS
  - Variables
---
It appears that <acronym title="Cascading Style Sheets">CSS</acronym> 3 will be the final iteration of the language. Undoubtedly, there&#8217;s some cool layout stuff in there along with everyone&#8217;s favorite tricks like rounded corners and opacity. However, I&#8217;m pretty dismayed if this is the end of <acronym title="Cascading Style Sheets">CSS</acronym> because I think there&#8217;s a very important concept still missing: variables.

I, like many designers, find myself using the same colors in multiple places throughout a style sheet. Consider:

<code class="block"> </code>

<pre>div.container {
    background-color: #123456;
}

div.outer a {
    color: #123456;
}</pre>

These two rules each use the same color, but in different ways. This means that the rules can&#8217;t be combined for simplicity. The fact that they both use the same color is irrelevant as far as <acronym title="Cascading Style Sheets">CSS</acronym> is concerned; there is no relation between these two rules. I say this is ridiculous. The next time I want to change the style on this page, I need to manually search and replace each instance of this color. Okay, maybe I&#8217;m going a little overboard, you can use the replace functionality of any basic text editor to do it but the issue I&#8217;m looking at here is the relationship between these two rules.

If <acronym title="Cascading Style Sheets">CSS</acronym> had some support for variables, style rules could be given some greater semantic value aside from listing out explicit details. Consider if the following code was possible:

<code class="block"> </code>

<pre>@define {
    $highlight_color: #123456;
}

div.container {
    background-color: $highlight_color;
}

div.outer a {
    color: $highlight_color;
}</pre>

With this code, you can tell how each rule relates to the overall page style. This approach can be done using server-side languages, intermixing variables with <acronym title="Cascading Style Sheets">CSS</acronym>&#8230;but that creates a layer of complexity that I&#8217;m not sure is necessary for most sites. The simple fact is that I want to be able to define colors (and fonts, and other information) as relevant parts of my page&#8217;s look and feel, not simply hex numbers or other measurements that don&#8217;t speak to me. Am I the only one who thinks this could be a great addition to our toolkit?
