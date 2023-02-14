import site from "../../data/config.yml";
import { loadSnippets, generateJsonFeed } from "../../lib/util";
import xmlEscape from "xml-escape";
import { stripHtml } from "string-strip-html";

export async function get() {
	
	const posts = (await loadSnippets()).slice(0, 10);

    return {
        body: await generateJsonFeed({
            site,
            feedUrl: site.snippets_json_feed_source,
            posts
        })
    };
}
