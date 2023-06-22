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
import { renderMarkdown } from "@astrojs/markdown-remark";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const CONTEXT = process.env.CONTEXT;
const previewContexts = new Set(["deploy-preview", "dev"]);

/**
 * Determines if a post should be displayed on the site or not. If it's a draft
 * or occurs in the future then the post is hidden unless we're in a dev 
 * environment or deploy preview on Netlify.
 * @param {Object} post The post to check. 
 * @returns {boolean} True to show a post, false to hide.
 */
function shouldDisplay(post) {

    /*
     * Always show all posts when in a preview context, which could be locally
     * when CONTEXT is "dev" or on Netlify when context is "deploy-preview".
     * In both of these contexts we want to see everything to verify it's
     * rendering okay.
     */
    if (previewContexts.has(CONTEXT)) {
        return true;
    }

    /*
     * If a post is a draft, and we aren't in a preview context, we definitely
     * don't want to show it on the site.
     */
    if (post.data.draft) {
        return false;
    }

    /*
     * Otherwise, the post date is what determines whether or not the post is
     * displayed. If the post date is either today or in the future, then we
     * definitely want to show it.
     */
    return Date.now() - post.data.date >= 0;
}

const collectionCache = new Map();

async function loadJekyllCollection(name) {

    if (collectionCache.has(name)) {
        return collectionCache.get(name);
    }

    /*
     * Note: getCollection() appears to cache the results of each call,
     * so we only ever want to call getCollection() and format the results
     * one time, otherwise we'll get strange behavior.
     */
    const collection = (await getCollection(name))
        .map(formatJekyllPost())
        .sort((a, b) => b.data.date - a.data.date)
        .filter(shouldDisplay);

    collectionCache.set(name, collection);
    
    return collection;
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function loadBlogPosts() {
    const posts = await loadJekyllCollection('blog')

    // check for comments
    posts.forEach(post => {
        const url = `/${post.collection}/${post.slug})`;
        const commentThread = commentThreads[new URL(url, site.url).href];
        post.comments = commentThread ? commentThread.comments : null;
    });

    return posts;
}

export function loadSnippets() {
    return loadJekyllCollection('snippets')
}

export async function loadAllContent() {

    const all = await Promise.all([
        loadBlogPosts(),
        loadSnippets()
    ]);

    return all.flat().sort((a, b) => b.data.date - a.data.date);
}


export async function generateJsonFeed({ site, feedUrl, description=site.description, posts}) {

    const rendered = await Promise.all(
        posts.map(post => renderMarkdown(post.body, { fileURL: "foo.md", contentDir:"."}))
    );

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
                content_text: post.body,
                content_html: xmlEscape(rendered[index].metadata.html),
                tags: data.tags,
                date_published: data.date.toISOString(),
                date_updated: data.updated ? data.updated.toISOString() : data.date.toISOString()
            };
        })
    });
}

export async function generateRssFeed({ site, feedUrl, description = site.description, posts }) {

    const rendered = await Promise.all(
        posts.map(post => renderMarkdown(post.body, { fileURL: "foo.md", contentDir: "." }))
    );

    return `
		<?xml version="1.0" encoding="utf-8"?>
		<rss version="2.0"
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:wfw="http://wellformedweb.org/CommentAPI/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
		>
		<channel>
			<title xml:lang="en">${site.name}</title>
			<atom:link href="${new URL(feedUrl, site.url).href}" rel="self" type="application/rss+xml"/>
			<link>${site.url}</link>
			<pubDate>${(new Date()).toUTCString()}</pubDate>
			<lastBuildDate>${(new Date()).toUTCString()}</lastBuildDate>
			<language>en-US</language>
			<generator>Astro</generator>
			<description>${description}</description>

			${posts.map((post, index) => {
                
                const url = new URL(`/${post.collection}/${post.slug}/`, site.url).href;
                const data = post.data;
                
                return `
					<item>
						<title>${data.title}</title>
						<link>${new URL(url, site.url).href}</link>
						<pubDate>${data.date.toUTCString()}</pubDate>
						<dc:creator>Nicholas C. Zakas</dc:creator>
						${data.tags.map(tag => `<category>${tag}</category>`).join("")}
						<guid isPermaLink="true">${new URL(url, site.url).href}</guid>
						<description>${data.teaser}</description>
						<content:encoded>${xmlEscape(rendered[index].metadata.html)}</content:encoded>
					</item>
				`.trim();
            }).join("")
        }
		</channel>
    </rss>`.trim();
}
