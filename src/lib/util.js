/**
 * @fileoverview Helper utilities for the site.
 * @author Nicholas C. Zakas
 */
/*global fetch*/

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import site from "../data/config.yml";
import commentThreads from "../data/comments.json";
import { getCollection } from 'astro:content';
import { formatJekyllPost } from "@humanwhocodes/astro-jekyll";
import xmlEscape from "xml-escape";
import { stripHtml } from "string-strip-html";


//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function loadBlogPosts() {
    const posts = (await getCollection('blog'))
        .map(formatJekyllPost())
        .reverse()
        .filter(post => !post.data.draft && (post.data.date - new Date()));

    // check for comments
    posts.forEach(post => {
        const url = `/${post.collection}/${post.slug})`;
        const commentThread = commentThreads[new URL(url, site.url).href]
        post.comments = commentThread ? commentThread.comments : null;
    });

    return posts;
}

export async function loadSnippets() {

    return (await getCollection('snippets'))
        .map(formatJekyllPost())
        .reverse()
        .filter(post => !post.data.draft && (post.data.date - new Date()))
}

export async function loadAllContent() {

    const all = await Promise.all([
        loadBlogPosts(),
        loadSnippets()
    ]);

    return all.flat().sort((a, b) => b.data.date - a.data.date);
}


export async function generateJsonFeed({ site, feedUrl, description=site.description, posts}) {

    const rendered = await Promise.all(posts.map(post => post.render()));
console.log(rendered[0])
    return JSON.stringify({
        version: "https://jsonfeed.org/version/1",
        title: xmlEscape(site.name),
        home_page_url: site.url,
        feed_url: new URL(feedUrl, site.url).href,
        description,
        expired: false,
        author: {
            name: site.author
        },
        items: posts.map((post, index) => {
            
            const url = new URL(`/${post.collection}/${post.slug}/`, site.url).href;
            const data = post.data;

            return {
                id: url,
                url,
                title: data.title,
                author: {
                    name: site.author
                },
                summary: data.teaser,
                // content_text: stripHtml(compiledContent()).result,
                // content_html: xmlEscape(compiledContent()),
                tags: data.tags,
                date_published: data.date.toISOString(),
                date_updated: data.updated ? data.updated.toISOString() : data.date.toISOString()
            };
        })
    });
}
