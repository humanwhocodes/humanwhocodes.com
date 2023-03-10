import site from "../../data/config.yml";
import { loadBlogPosts, generateRssFeed } from "../../lib/util";


export async function get() {
	
	const posts = (await loadBlogPosts()).slice(0, 10);
	
	return {
		body: await generateRssFeed({
			site,
			feedUrl: site.feed_source,
			description: site.description,
			posts
		})
	};
}
