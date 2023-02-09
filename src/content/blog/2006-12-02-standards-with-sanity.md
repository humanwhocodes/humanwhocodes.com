---
title: Standards with sanity
author: Nicholas C. Zakas
permalink: /blog/2006/12/02/standards-with-sanity/
categories:
  - Web Development
tags:
  - Web Standards
---
A lot has been made out of the importance of staying within web standards and making sure that your code is semantically correct. The biggest thing that so-called experts talk about is the avoidance of using tables. Really, they mean not to use tables for layout. The argument is that the markup should be able to persist no matter the set of styles applied to it, and that the content should make sense to screen readers as well as traditional web browsers. But there is such a thing as going too far.

I've been in situations where, with deadlines looming, I've spent way too much time trying to create semantically correct markup for visual designs. The question is this: does it make sense to spend four or five days fighting through <acronym title="Cascading Style Sheets">CSS</acronym> inconsistencies across browsers to achieve a layout that could easily be accomplished using tables in less than a day? I know some people who argue that it's worth spending those four or five days to make sure that semantics are all correct because it's the &#8220;best way&#8221;. But what makes it the best?

I am all for accessibility and making sure that your content is available via screen reading software, but there does come a point where you need to question the amount of work necessary to make things purely semantic in the business world. Will your product manager accept &#8220;it's not semantically correct&#8221; as an excuse for why your deadline was missed?

Now, I'm not saying go out and start using tables everywhere again. I agree that, generally speaking, tables shouldn't be used as layout. I think that there are enough examples of how to layout pages in any number of columns, with and without headers and footers. But for specific sections of a page, if you find yourself fighting with a <acronym title="Cascading Style Sheets">CSS</acronym> layout for a couple of days that could easily be accomplished with tables, ask yourself what delivers the most value for your company.
