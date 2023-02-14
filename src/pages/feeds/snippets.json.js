import site from "../../data/config.yml";
import { loadSnippets, generateJsonFeed } from "../../lib/util";

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
