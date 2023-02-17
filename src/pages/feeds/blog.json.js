import site from "../../data/config.yml";
import { generateJsonFeed, loadBlogPosts } from "../../lib/util";


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
