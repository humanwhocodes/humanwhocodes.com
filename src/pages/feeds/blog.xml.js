import site from "../../data/config.yml";
import xmlEscape from "xml-escape";
import { loadBlogPosts } from "../../lib/util";


export async function get() {
	
	const posts = await loadBlogPosts();
	
	return {
		body: `
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
			<title xml:lang="en">${ site.name }</title>
			<atom:link href="${ new URL(site.feed_source, site.url).href }" rel="self" type="application/rss+xml"/>
			<link>${ site.url }</link>
			<pubDate>${ (new Date()).toUTCString() }</pubDate>
			<lastBuildDate>${ (new Date()).toUTCString() }</lastBuildDate>
			<language>en-US</language>
			<generator>Astro</generator>
			<description>${ site.description }</description>

			${
				posts.slice(0, 10).map(({ frontmatter, compiledContent, url }) => `
					<item>
						<title>${ frontmatter.title }</title>
						<link>${ new URL(url, site.url).href }</link>
						<pubDate>${ frontmatter.date.toUTCString() }</pubDate>
						<dc:creator>Nicholas C. Zakas</dc:creator>
						${
							frontmatter.tags.map(tag => `<category>${ tag }</category>`).join("")
						}
						<guid isPermaLink="true">${ new URL(url, site.url).href }</guid>
						<description>${ frontmatter.teaser }</description>
						<content:encoded>${ xmlEscape(compiledContent()) }</content:encoded>
					</item>
				`.trim()).join("")
			}
						
		</channel>
		</rss>
		`.trim()
	};
}
