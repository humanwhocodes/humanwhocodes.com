---
title: "Creating a Jekyll-style blog post year archive in Astro"
teaser: "While not included in their default blog template, it is straightforward to create a year-based archive for your posts in Astro."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - Astro
  - Jekyll
---

One of the things I enjoyed about [Jekyll](https://jekyllrb.com) was just how much was built in to the core and the common plugins. One of my favorite plugins is [`jekyll-archives`](https://github.com/jekyll/jekyll-archives), which allows you to create archive pages for your blog posts based on any type of criteria. On my Jekyll-based site, I had a number of archives, including a year-based archive that allowed you to access, i.e., `/blog/2022` to see all posts published in 2022. This was something I wanted to mimic when I converted my website to [Astro](https://astro.build), and after a bit of investigation, I discovered doing so was pretty straight forward.

## Step 1: Create the archive page

Assuming your blog templates live in `src/pages/blog`, create `src/pages/blog/[year].astro`. The square brackets around `year` are intentional and let Astro know that this page has dynamic routes. In this case, you will be replacing `year` with the four-digit year. Astro knows how to replace `year` when you define a `getStaticPaths()` method.

## Step 2: Export `getStaticPaths()`

The `getStaticPaths()` function is called by Astro to determine how to render dynamic routes. The function must return an array of objects that each contain at least a `params` key that indicates how to fill in the dynamic portions of the filename and optionally a `props` key that contains data to make available in `Astro.props` when the page renders.

To create a year-based archive, you'll need to ensure that each object in the array specifies the year and the posts for that year. Here is the code to do that:

```js
import { getCollection } from 'astro:content';

export async function getStaticPaths() {

	const posts = await getCollection('blog');
    const postYears = new Map();

    posts.forEach(post => {
        const year = post.data.date.getFullYear();

        if (!postYears.get(year)) {
            postYears.set(year, []);
        }

        postYears.get(year).push(post);
    });


    return [...postYears.entries()].map(([year, posts]) => ({
        params: { year },
        props: { posts }
    }));
};
```

The first step in this code is to get all of the blog posts in the `blog` collection. After that, each post is inspected to find its year and then added to the `postYears` map for easy reference. The last step is to arrange the `postYears` map into an array of objects containing the years and posts.

This code can be drammatically simplified once the JavaScript [Array Grouping](https://github.com/tc39/proposal-array-grouping) proposal is widely implemented, in which case the code would look like this:

```js
import { getCollection } from 'astro:content';

export async function getStaticPaths() {

	const posts = await getCollection('blog');
    const postYears = posts.groupToMap(post => post.getFullYear());

    return [...postYears.entries()].map(([year, posts]) => ({
        params: { year },
        props: { posts }
    }));
};
```

## Step 3: Access the `params` and `props` to render

In that same `src/pages/blog/[year].astro` file, after `getStaticPaths()`, you can then start with the code to render each page. First, you'll want to gather the information about the page being rendered from `Astro.params` and `Astro.props`, like this:

```js
const { year } = Astro.params;
const { posts } = Astro.props;
```

Now you have the year and the posts from that year, so all you need to do is render out your list of posts as you would normallly. Here's an example:

```astro
<main>
    <h2>Posts in {year}</h2>
    <section>
        <ul>
            {
                posts.map((post) => (
                    <li>
                        <time datetime={post.data.pubDate.toISOString()}>
                            {post.data.pubDate.toLocaleDateString('en-us', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </time>
                        <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
                    </li>
                ))
            }
        </ul>
    </section>
</main>
```

You can see a complete example of a year archive page in my [`astro-jekyll`](https://github.com/humanwhocodes/astro-jekyll/tree/main/example-site/src/pages/blog) GitHub project.

## Conclusion

Even though Astro doesn't include a lot of the functionality that Jekyll makes easily available, it is dynamic enough to implement anything you might have used in Jekyll. Creating year-based archive pages is just the start. You can use the same technique to create archive pages based on any type of post meta data: tags, categories, titles, etc. All you need to do is follow the same basic structure of creating a dynamically-routed Astro template, filter your blog posts into the groupings that you'd like, and then return that data from `getStaticPaths()`. 
