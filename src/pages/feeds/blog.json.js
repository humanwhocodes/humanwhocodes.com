import site from "../../data/config.yml";
import xmlEscape from "xml-escape";
import { loadBlogPosts } from "../../lib/util";
import { stripHtml } from "string-strip-html";


export async function get() {
	
	const posts = (await loadBlogPosts()).slice(0, 10);
    return {
        body: await generateJsonFeed({
            site,
            feedUrl: site.json_feed_source,
            posts
        })
    };
}
