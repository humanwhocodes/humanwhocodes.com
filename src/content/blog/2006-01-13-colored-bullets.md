---
title: Colored Bullets
author: Nicholas C. Zakas
permalink: /blog/2006/01/13/colored-bullets/
categories:
  - Web Development
tags:
  - Bullets
  - CSS
---
I recently came across a design that asked for colored bullets in a bullet list. One would think that there would be some sort of <acronym title="Cascading Style Sheets">CSS</acronym> property to allow such a thing. But alas, there isn't. The bullets are always the color of the text. However, I refused to resort to using images for bullets when all they had to be was a different color.

After a few minutes of thinking, I came up with a solution. Just set the color of the `<ul/>` element to the color for the bullets, then enclose each list item's text inside of a `<span/>` that specifies the text color. For example:

<pre>&lt;ul style="color: red"&gt;
&lt;li&gt;&lt;span style="color: black"&gt;List Item 1&lt;/span&gt;&lt;/li&gt;
&lt;li&gt;&lt;span style="color: black"&gt;List Item 2&lt;/span&gt;&lt;/li&gt;
&lt;li&gt;&lt;span style="color: black"&gt;List Item 3&lt;/span&gt;&lt;/li&gt;
&lt;li&gt;&lt;span style="color: black"&gt;List Item 4&lt;/span&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>

This displays as:

<ul style="color: red">
  <li>
    <span style="color: black;">List Item 1</span>
  </li>
  <li>
    <span style="color: black;">List Item 2</span>
  </li>
  <li>
    <span style="color: black;">List Item 3</span>
  </li>
  <li>
    <span style="color: black;">List Item 4</span>
  </li>
</ul>

It's a little bit of a pain to have to include the extra tags, but it's less of a pain that creating images every time you need different colored bullets.
