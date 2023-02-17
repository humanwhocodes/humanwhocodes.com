import site from "../../data/config.yml";
import { loadAllContent, generateRssFeed } from "../../lib/util";


export async function get() {
	
	const posts = (await loadAllContent()).slice(0, 10);
	
	return {
		body: await generateRssFeed({
			site,
			feedUrl: site.feed_source,
			description: site.description,
			posts
		})
	};
}
