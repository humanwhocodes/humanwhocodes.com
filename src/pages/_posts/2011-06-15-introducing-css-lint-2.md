---
title: Introducing CSS Lint
author: Nicholas C. Zakas
permalink: /blog/2011/06/15/introducing-css-lint-2/
categories:
  - Web Development
tags:
  - CSS
  - CSSLint
  - Lint
---
Not too long ago, Nicole Sullivan and I announced that we&#8217;ve started working together. Today, we&#8217;re happy to announce the release of our first collaboration effort: [CSS Lint][1]. The goal of CSS Lint, as you may guess, is to help you write better CSS code. We&#8217;ve spent huge chunks of time over the past couple of weeks building and debating rules to help everyone write more efficient and less problematic CSS.

## The rules

To begin with, we defined several rules (explained in more detail on the [CSS Lint About][2] page). The rules are:

  * Parsing errors should be fixed
  * Don&#8217;t use adjoining classes
  * Remove empty rules
  * Use correct properties for a display
  * Don&#8217;t use too many floats
  * Don&#8217;t use too many web fonts
  * Don&#8217;t use too may font-size declarations
  * Don&#8217;t use IDs in selectors
  * Don&#8217;t qualify headings
  * Heading styles should only be defined once
  * Be careful using width: 100%
  * Zero values don&#8217;t need units
  * Vendor prefixed properties should also have the standard
  * CSS gradients require all browser prefixes
  * Avoid selectors that look like regular expressions
  * Beware of broken box models

The rules are all created using a very simple plugin model that makes it easy to change specific rules or add new ones. The ability to turn off or on specific rules isn&#8217;t yet exposed in the web or command line interfaces but is supported by the underlying API, so look for this addition soon.

<span style="font-size: 20px; font-weight: bold;">In your build&#8230;</span>

While we&#8217;re happy to introduce the web interface, we also realized that you may want to incorporate this into your build system. To help, there is CSS Lint for Node.js. You can install the CSS Lint command line tool via [npm][3]:

    sudo npm install -g csslint

Once installed, you can pass in any number of files or directories with CSS files:

    csslint foo.css bar.css dir_of_css/

The tool then outputs the same information as the web interface.

## Contribute

CSS Lint is completely open source and available on [GitHub][4]. We&#8217;re actively looking for people to contribute rules, bug fixes, and extensions. The rules, by the way, are completely pluggable. You can easily strip out rules you don&#8217;t want or add new rules that are more specific to your needs. Then, build a custom version that suits your needs or contribute the changes back.

The CSS parser that it&#8217;s built on is also open source and available on [GitHub][5]. There are some known issues with the parser that I&#8217;m planning on addressing soon, but it&#8217;s generally CSS3-compliant.

I hope Nicole and I will be able to make more tools of this nature to help everyone write better front-end code. Enjoy!

 [1]: http://csslint.net
 [2]: http://csslint.net/about.html
 [3]: http://npmjs.org
 [4]: http://github.com/stubbornella/csslint
 [5]: http://github.com/nzakas/parser-lib
