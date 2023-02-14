import site from "../../data/config.yml";
import xmlEscape from "xml-escape";
import { loadAllContent } from "../../lib/util";
import { stripHtml } from "string-strip-html";


export async function get() {
	
	const posts = (await loadAllContent()).slice(0, 10);
	

    return {
        body: await generateJsonFeed({
            site,
            feedUrl: site.all_json_feed_source,
            posts
        })
    };
}
