---
title: "Special formatting for SVG images with CSS"
author: Nicholas C. Zakas
teaser: "Beautifully displaying SVG images that don't have a background color or padding."
date: 2019-01-20
categories:
  - Web Development
tags:
  - CSS
  - SVG
---

I frequently run into a problem displaying SVG images in my blog posts. SVG images tend to have no background color (so the post background bleeds through) and don't have any space between the artwork and what would be the border. This left the SVG images looking a bit squished and washed out even though they were displayed using the same styles as any bitmap image on my site.

To solve this problem, I used a bit of CSS to single out the SVG images in my posts:

```css
p > img[src$=".svg"],
p > a > img[src$=".svg"] {
    background: white;
    padding: 20px;
}
```

Using an attribute selector, I checked the image's `src` attribute to see if it ends with `".svg"`, and if so, I apply extra padding and a background color. How the SVG images in my posts look great!
