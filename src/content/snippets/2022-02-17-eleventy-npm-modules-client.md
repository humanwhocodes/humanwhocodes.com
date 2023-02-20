---
title: "How to add npm packages for client-side use in Eleventy"
author: Nicholas C. Zakas
teaser: "It's not immediately obvious how to use npm packages in an Eleventy website front end. Here's how to do it."
date: 2022-02-17
categories:
  - Web Development
tags:
  - Eleventy
  - Static Site Generators
  - JavaScript
---

Suppose that you want to use my [ArrayWithDefault](https://npmjs.com/package/@humanwhocodes/array-with-default) package on the front end of an [Eleventy](https://www.11ty.dev/) site. What's the easiest way to make that package available for inclusion in HTML?

First, install the package:

```
npm install @humanwhocodes/array-with-default
```

Then, in your Eleventy config file (`.eleventy.js`), add this inside of your default config function:

```js
module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy({
        "./node_modules/@humanwhocodes/array-with-default/dist/array-with-default.js": "/assets/js/array-with-default.js"
    });

};
```

Now, `array-with-default.js` is placed inside the `/assets/js` directory, and you can modify, process, or reference that file the same way that you do any other files in that directory.

This process works for any npm package that has a defined `dist` directory with standalone files; for other package you may need to first generate a distributable file before copying over into the correct location.
