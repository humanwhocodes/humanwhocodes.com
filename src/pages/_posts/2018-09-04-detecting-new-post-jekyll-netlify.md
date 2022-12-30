---
title: "Detecting new posts with Jekyll and Netlify"
teaser: Use Node.js to tell when a new Jekyll blog post is published.
date: 2018-09-04 00:00:00
categories:
- Tutorial
tags:
- JavaScript
- Jekyll
- Netlify
- Blog
- Node.js
---

This blog has long featured the ability to subscribe by email, so you could get an email notification when a new post was published. I've used various services over the years to achieve this, first with FeedBurner and later with Zapier. As I'm a do-it-yourself kind of person, I never liked relying on external services to determine when a new post appeared on my blog. I figured I would never be able to build my own system When I moved this blog from the dynamic Wordpress to the static Jekyll[1]. Still, it seemed like a waste to have a service keep polling an RSS feed to see if it changed. After all, I know when my blog is being built...why can't I just check for a new post then? It took me a little while and several iterations but eventually I figured out a way.

## Step 1: Creating a data source

Most services that check for new blog posts use RSS feeds to do so. I didn't want to use the RSS feed for two reasons:

1. Parsing RSS is a pain
2. Bandwidth concerns - My RSS feed is quite large because I include full post content

So I decided to create a small JSON file containing just the information I was interested in. This file lives at `/feeds/firstpost.json` and contains metadata related to just the most recent post on the blog. Here's the Liquid template:

```
---
layout: null
---
{
    {% assign post = site.posts.first %}
    "id": "{{ post.url | absolute_url | sha1 }}",
    "title": {{ post.title | jsonify }},
    "date_published": "{{ post.date | date_to_xmlschema }}",
    "summary": {{ post.content | strip_html | truncatewords: 55 | jsonify }},
    "url": "{{ post.url | absolute_url }}"
}
```

This file includes just the information I need for any new blog post notification, which might include emails, tweets, Slack messages, etc. I'm using the absolute URL for the blog post as a unique identifier, but you can use anything is sufficiently unique. (You can always add or remove any data you may need if this dataset doesn't fit your purposes.)

**Credit:** This format is loosely based on JSON Feed[2] and the code is partially taken from Alexandre Vallières-Lagacé's Jekyll JSON Feed implementation[3].

## Step 2: Deploy the data source

This is very important: the data source must already be live in order for the detectiong script to work correctly. So before going on to the next step, deploy an update to your site.

## Step 3: Create the new post detection script

The new post detection script checks the live data source against the one on disk after running `jekyll build`. If the `id` of the most recent post is different between the live and local versions of `firstpost.json`, then there is a new post. Here's the detection script:

```js
"use strict";

const fs = require("fs");
const fetch = require("node-fetch");

(async () => {

    // fetch the live data source
    const response = await fetch("https://humanwhocodes.com/feeds/firstpost.json");
    if (response.status !== 200) {
        throw new Error("Invalid response status: " + response.status);
    }

    const currentFirstPost = await response.json();
    console.log("Current first post is ", currentFirstPost.id);

    // read the locally built version of the data source
    const newFirstPost = JSON.parse(fs.readFileSync("./_site/feeds/firstpost.json", { encoding: "utf8" }));
    console.log("New first post is ", newFirstPost.id);

    // compare the two
    if (currentFirstPost.id !== newFirstPost.id) {

        console.log("New post detected!");

        // do something for new posts
    }
})();
```

This script uses `node-fetch` to retrieve the live data source and then compares it to the local data source. If the `id` is different, it outputs a message. How you respond to a new post is up to you. Some options include:

* Send an email notification
* Post a tweet
* Post a Slack message
* Emit an event to AWS CloudWatch (this is what I do)

The most important part of the script is that it needs to be executed after `jekyll build` and before the site is deployed.

## Step 4: Updating Netlify configuration

One of the advantages that Netlify[4] has over GitHub pages for Jekyll sites is the ability to modify the build command. The easiest way to do that is by using a `netlify.toml` file[5] in the root of your site. In that file, you can modify the build command. Here's an example:

```toml
[build]
  command = "jekyll build && node _tools/newpostcheck.js"
  publish = "_site"
```

The `command` entry specifies the build command while `publish` indicates the directory into which the built web site files should be placed (most Jekyll builds use `_site`, and this is Netlify's default). The `command` should be updated to run the new post detection script after `jekyll build`.

**Note:** You must have a `package.json` file in the root of your repository to have Netlify install Node.js and any dependencies (such as `node-fetch`) automatically.

## Step 5: Deploy to Netlify

The last step is to deploy the changes discussed in this post. When Netlify builds your site, the new post detection script will be executed and you will be able to respond accordingly. It's a good idea to run the script once with a new post and observe the logs just to make sure it's working correctly before hooking up notifications.

## Conclusion

The advantages of using a static site generator (such as Jekyll) sometimes means giving up a big of convenience as it relates to changes on your site. While dynamic solutions (such as WordPress) might offer more hooks, static solutions are often capable of similar functionality. New blog post notifications are important for most blogs and being able to achieve them using Jekyll is one more vote in favor of static sites.

While this post focuses on Jekyll and Netlify, the same approach should work for any static site generator and any deployment system that allows you to modify the build command. 


1. [Jekyll](https://jekyllrb.com/) (jekyllrb.com)
1. [JSON Feed](https://jsonfeed.org) (jsonfeed.org)
1. [jekyll-json-feed](https://github.com/vallieres/jekyll-json-feed) (github.com)
2. [Netlify](https://netlify.com) (netlify.com)
3. [The netlify.toml File](https://www.netlify.com/docs/netlify-toml-reference/) (netlify.com)
