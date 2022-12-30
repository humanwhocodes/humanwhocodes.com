---
title: "How to generate ID attributes in headings using Eleventy"
author: Nicholas C. Zakas
teaser: "Eleventy doesn't generate heading IDs by default, here's how to do it."
date: 2020-07-28
categories:
  - Web Development
tags:
  - Eleventy
  - Static Site Generators
  - HTML
---

When switching from [Jekyll](jekyllrb.com/) to [Eleventy](https://www.11ty.dev/), I discovered that my headings no longer had `id` attributes in the rendered HTML. This meant that I couldn't link directly to headings in my (sometimes very long) pages. After searching through the Eleventy documentation, I discovered that this wasn't supported in Eleventy and I'd need to use a plugin.

Eleventy uses [`markdown-it`](https://npmjs.com/package/markdown-it) as its default Markdown engine, and you can install plugins to `markdown-it`. The one of interest for this case is [`markdown-it-anchor`](https://npmjs.com/package/markdown-it-anchor).

So to start, you'll need to install the plugin:

```
npm install markdown-it-anchor --save-dev
```

In your Eleventy config file (`.eleventy.js`), add this inside of your default config function:

```js
module.exports = function(eleventyConfig) {

    // other configuration goes here

    // this works because Eleventy also installs markdown-it 
    const markdownIt = require("markdown-it");
    
    // create a new markdown-it instance with the plugin
    const markdownItAnchor = require("markdown-it-anchor");
    const markdownLib = markdownIt({ html: true }).use(markdownItAnchor);

    // replace the default markdown-it instance
    eleventyConfig.setLibrary("md", markdownLib);

    // optionally return config object here
};
```

Now regenerate your website and you should see that all headings will now have an auto-generated `id` attribute.
