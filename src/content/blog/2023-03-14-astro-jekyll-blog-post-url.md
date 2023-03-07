---
title: "Creating a Jekyll-style blog post URL in Astro"
teaser: "It's not obvious from the examples, but you can emulate Jekyll-style blog post URLs including years and months in Astro."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - Astro
  - Jekyll
---

In converting my [Jekyll](https://jekyllrb.com) blog to [Astro](https://astro.build), one of the trickiest parts was ensuring that all of the URLs remained the same. My blog has been around for almost 20 years and it has been converted from different frameworks multiple times, ultimately resulting in some different URL formats. The one I used most recently, however, is the familiar `/blog/year/month/title` format. In this post, I'll describe how to create this URL format in Astro.

## Step 1: Create the post page

Assuming your blog templates live in `src/pages/blog`, create `src/pages/blog/[...slug].astro`. The square brackets around `...slug` are intentional and let Astro know that this page has dynamic routes. In this case, you will be replacing `..slug` with the URL path to your post. The `...` indicates that the value of `slug` may contain slashes. Astro knows how to replace `slug` when you define a `getStaticPaths()` method.

## Step 2: Export `getStaticPaths()`

The `getStaticPaths()` function is called by Astro to determine how to render dynamic routes. The function must return an array of objects that each contain at least a `params` key that indicates how to fill in the dynamic portions of the filename and optionally a `props` key that contains data to make available in `Astro.props` when the page renders.

To create the appropriate URL for each blog post, you'll need to export a `slug` for each post in your collection. Here is the code to do that:

```js
import { getCollection } from 'astro:content';

export async function getStaticPaths() {

	const posts = await getCollection('blog');

    return posts
		.map(post => {

            const date = post.data.pubDate;
            const year = post.getFullYear();
            const month = (post.getMonth() + 1).padStart(2, "0");

            return {
                params: {
                    slug: `${year}/${month}/${post.slug}`
                },
                props: {
                    post
                }
            }
        });
};
```

The first step in this code is to get all of the blog posts in the `blog` collection. Each post is then inspected to construct the correct URL format.

If you're using the recommended setup for Astro, you'll have a `post.data.pubDate` property that contains the post's publication date (the name of the property is configurable -- the only important thing is that it's a date object.) For convenience, the year and month are assigned to variables. The year uses `getFullYear()` to ensure four digits; the month is 0-based so one is added to get the calendar year and then `padStart(2 "0")` is called to ensure that there are always at least two digits (i.e., `7` becomes `07`).

For each post, the code returns an object containing a `params` key that contains the `slug` property with the URL path (it's important that the URL path does not end with a slash, as this will cause the page to not be rendered) and a `props` key that contains the post itself.

## Step 3: Access the `params` and `props` to render

In that same `src/pages/blog/[...slug].astro` file, after `getStaticPaths()`, you can then start with the code to render each page. First, you'll want to gather the information about the page being rendered from `Astro.params` and `Astro.props`, like this:

```js
const post = Astro.props;
const { Content } = await post.render();
```

Now you have the year and the posts from that year, so all you need to do is render out post. Here's an example:

```astro
<main>
    <h1>{post.data.title}</h1>
    <Content />
</main>
```

## Bonus step: Refactor for easier reuse

While the code above works well as an example, in reality you don't want your URLs to be constructed only within `src/pages/blog/[...slug].astro` because you'll also want to reference those URLs elsewhere (i.e., on your blog index page). Rather than copying that logic everywhere, it's useful to create a helper function that will format the URLs for you, such as this:

```js
import { getCollection } from 'astro:content';

export async function loadAndFormatCollection(name) {

	const posts = await getCollection(name);

    posts.forEach(post => {

        const date = post.data.pubDate;
        const year = post.getFullYear();
        const month = (post.getMonth() + 1).padStart(2, "0");

        post.slug = `${year}/${month}/${post.slug}`;
    });

    return posts;
};
```

Then in `src/pages/blog/[...slug].astro` you can simplify the code to:

```js
import { loadAndFormatCollection } from '../../lib/util.js';

export async function getStaticPaths() {

	const posts = await loadAndFormatCollection('blog');

    return posts
		.map(post => {

            return {
                params: {
                    slug: post.slug
                },
                props: {
                    post
                }
            }
        });
};
```

Any time you would previously use the built-in `getCollection()`, you should now use the custom `loadAndFormatCollection()` to ensure that `post.slug` is the correct value.

## Bonus step: Support Jekyll permalinks

Jekyll allows you to override the default URL for any given post by specifying a `permalink` key in the frontmatter, such as:

```astro
---
title: "Hello world!"
permalink: "/blog/2013/12/my-special-post/"
---

Hello world content!
```

The first thing to notice about the `permalink` key is that it's an absolute URL that both begins and ends with a slash. It also begins with "blog", which is most likely the name of your collection. So, if you want to acknowledge the `permalink` key as overriding the default blog post URL, you'll need to take those into account and update the `loadAndFormatCollection()` function like this:

```js
import { getCollection } from 'astro:content';

export async function loadAndFormatCollection(name) {

	const posts = await getCollection(name);

    posts.forEach(post => {

        const permalink = post.data.permalink;

        if (permalink) {

            const urlParts = permalink.split("/");
            urlParts.shift();       // remove first empty space
            urlParts.shift();       // remove "blog"

            if (permalink.endsWith("/")) {
                urlParts.pop();     // remove last empty space
            }

            post.slug = urlParts.join("/");

            return;
        }

        const date = post.data.pubDate;
        const year = post.getFullYear();
        const month = (post.getMonth() + 1).padStart(2, "0");

        post.slug = `${year}/${month}/${post.slug}`;
    });

    return posts;
};
```

Now, if there's a `permalink` in the post's frontmatter, that will take priority over the default URL format.

(Note: If you are trying to convert a Jekyll blog to Astro and don't want to go through all of this manual stuff, check out my [`astro-jekyll`](https://github.com/humanwhocodes/astro-jekyll/) project, which does all of this for you.)

## Conclusion

This is another instance where Jekyll includes some functionality by default that Astro makes you jump through a few hoops to implement, but ultimately isn't all that much additional work. Thanks to the `slug` property on collection items, it's fairly straightforward to modify the URLs for your blog posts while not moving too far away from the Astro way of doing things. This is, after all, the strength of Astro: it is completely flexible and you can make it do whatever you want, it just may take a little more work than you're used to coming from Jekyll.
