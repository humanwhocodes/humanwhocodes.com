/**
 * @fileoverview Helper utilities for the site.
 * @author Nicholas C. Zakas
 */
/*global fetch*/

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import path from "path";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

function formatJekyllPosts(posts, type) {
    return posts.map(post => {
        const filename = path.basename(post.file, ".md");
        const urlParts = {
            year: filename.slice(0, 4),
            month: filename.slice(5, 7),
            slug: filename.slice(11)
        };

        const newPost = Object.create(post, {
            url: { value: `/${type}/${urlParts.year}/${urlParts.month}/${urlParts.slug}/` }
        });

        newPost.urlParts = urlParts;
        newPost.frontmatter.date = new Date(filename.slice(0, 10));
        newPost.frontmatter.pubDate = newPost.frontmatter.date;

        if (newPost.frontmatter.updated) {
            newPost.frontmatter.updated = new Date(newPost.frontmatter.updated);
        }
        return newPost;
    }).reverse();
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function loadBlogPosts() {

    const postFiles = await import.meta.glob("../pages/_posts/**/*.md");
    const posts = await Promise.all(Object.values(postFiles).map(async (getInfo) => {
        const meta = await getInfo();
        return meta;
    }));

    return formatJekyllPosts(posts, "blog");
}

export async function loadSnippets() {

    const postFiles = await import.meta.glob("../pages/_snippets/**/*.md");
    const posts = await Promise.all(Object.values(postFiles).map(async (getInfo) => {
        const meta = await getInfo();
        return meta;
    }));

    return formatJekyllPosts(posts, "snippets");
}

export async function loadAllContent() {

    const all = await Promise.all([
        loadBlogPosts(),
        loadSnippets()
    ]);

    return all.flat().sort((a, b) => b.frontmatter.date - a.frontmatter.date);
}
