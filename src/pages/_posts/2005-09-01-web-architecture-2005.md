---
title: 'Web Architecture: 2005'
author: Nicholas C. Zakas
permalink: /blog/2005/09/01/web-architecture-2005/
categories:
  - Web Development
tags:
  - Architecture
  - CSS
  - HTML
  - Internet
  - Web Development
  - XML
  - XSLT
---
After going through the process of another Web site design, I decided to sit back and think about my ultimate Web architecture. The result was a pretty simple idea separated into a few steps:

  * **Semantic <acronym title="eXtensible Markup Language">XML</acronym>** &#8211; Start out with data that has semantic value to it. Leave out any thought of formatting, just describe what should be on the page, not how it should be displayed.
  * **<acronym title="eXtensible Stylesheet Language Transformations">XSLT</acronym>** &#8211; Using the semantic data, transform it into semantically significant <acronym title="Hyper Text Markup Language">HTML</acronym>, using tags like `<h1/>`, `<strong/>`, `<em/>`, and `<p/>`. Some `<div/>`, `<ol/>`, `<ul/>`, etc., tags can be used to logically group sets of data.
  * **Semantic <acronym title="Hyper Text Markup Language">HTML</acronym> + <acronym title="Cascading Style Sheets">CSS</acronym>** &#8211; the final presentation is then formatted into a visually pleasing format using <acronym title="Cascading Style Sheets">CSS</acronym>.

It all seems so simple, but why is it that so many sites are content with laying things out in tables and losing all semantic value of the data that is the real focus of the site?
