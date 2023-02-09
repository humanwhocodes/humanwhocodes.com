/**
 * @fileoverview Helper utilities for the site.
 * @author Nicholas C. Zakas
 */
/*global fetch*/

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import path from "path";
import site from "../data/config.yml";
import commentThreads from "../data/comments.json";
import { getCollection } from 'astro:content';
import { formatJekyllPost } from "@humanwhocodes/astro-jekyll";


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

    return all.flat().sort((a, b) => b.frontmatter.date - a.frontmatter.date);
}
