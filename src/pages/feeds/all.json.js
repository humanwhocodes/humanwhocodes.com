import site from "../../data/config.yml";
import xmlEscape from "xml-escape";
import { loadAllContent } from "../../lib/util";
import { stripHtml } from "string-strip-html";


export async function get() {
	
	const posts = (await loadAllContent()).slice(0, 10);
	
	return {
		body: JSON.stringify({
            version: "https://jsonfeed.org/version/1",
            title: xmlEscape(site.name),
            home_page_url: site.url,
            feed_url: new URL(site.all_json_feed_source, site.url).href,
            description: site.description,
            expired: false,
            author: {
                name: site.author
            },
            items: posts.map(({collection, slug, data, compiledContent}) => ({
                id: new URL(collection, site.url).href,
                url: new URL(collection, site.url).href,
                title: data.title,
                author: {
                    name: site.author
                },
                summary: data.teaser,
                content_text: stripHtml(compiledContent()).result,
                content_html: xmlEscape(compiledContent()),
                tags: data.tags,
                date_published: data.date.toISOString(),
                date_updated: data.updated ? data.updated.toISOString() : data.date.toISOString()
             }))
        })
	};
}
