import site from "../../data/config.yml";
import xmlEscape from "xml-escape";
import { loadBlogPosts } from "../../lib/util";
import { stripHtml } from "string-strip-html";


export async function get() {
	
	const posts = (await loadBlogPosts()).slice(0, 10);
	
	return {
		body: JSON.stringify({
            version: "https://jsonfeed.org/version/1",
            title: xmlEscape(site.name),
            home_page_url: site.url,
            feed_url: new URL(site.json_feed_source, site.url).href,
            description: site.description,
            expired: false,
            author: {
                name: site.author
            },
            items: posts.map(({url, frontmatter, compiledContent}) => ({
                id: new URL(url, site.url).href,
                url: new URL(url, site.url).href,
                title: frontmatter.title,
                author: {
                    name: site.author
                },
                summary: frontmatter.teaser,
                content_text: stripHtml(compiledContent()).result,
                content_html: xmlEscape(compiledContent()),
                tags: frontmatter.tags,
                date_published: frontmatter.date.toISOString(),
                date_updated: frontmatter.updated ? frontmatter.update.toISOString() : frontmatter.date.toISOString()
            }))
        })
	};
}
