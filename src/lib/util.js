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

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

function getDateParts(text) {
    const dateMatches = /^(\d{4})\-(\d{2})\-(\d{2})/.exec(text);
    if (dateMatches) {
        return {
            year: dateMatches[1],
            month: dateMatches[2],
            day: dateMatches[3],
            toString() {
                return `${this.year}-${this.month}-${this.day}`
            }
        };
    }

    return undefined;

}

function formatJekyllPosts(posts, type) {
    return posts.map(post => {
        const filename = path.basename(post.file, ".md");
        let slug = filename;
        let dateParts;

        // is there a date in the filename?
        dateParts = getDateParts(filename);
        if (dateParts) {
            slug = filename.slice(11);
        }

        // date in the frontmatter overrides the filename
        if (post.frontmatter.date) {
            dateParts = getDateParts(post.frontmatter.date.toISOString());
        }

        let url;
        let urlPath;

        if (post.frontmatter.permalink) {

            url = post.frontmatter.permalink;
            
            // format: [ '', 'blog', '2009', '05', '05', 'http-cookies-explained', '' ]
            const pathParts = post.frontmatter.permalink.split("/");
            pathParts.shift();  // remove first empty space
            pathParts.shift();  // remove "blog"
            pathParts.pop();    // remove last empty space
            urlPath = pathParts.join("/");
        } else {
            url = `/${type}/${dateParts.year}/${dateParts.month}/${slug}/`;
            urlPath = `${dateParts.year}/${dateParts.month}/${slug}`;
        }

        const newPost = Object.create(post, {
            url: { value: url }
        });

        newPost.urlPath = urlPath;

        if (!newPost.frontmatter.date) {
            newPost.frontmatter.date = new Date(dateParts);
        }
        
        if (!newPost.frontmatter.pubDate) {
            newPost.frontmatter.pubDate = newPost.frontmatter.date;
        }

        if (newPost.frontmatter.updated) {
            newPost.frontmatter.updated = new Date(newPost.frontmatter.updated);
        }

        // check for comments
        const commentThread = commentThreads[new URL(url, site.url).href]
        newPost.comments = commentThread ? commentThread.comments : null;

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
