import site from "../../data/config.yml";
import xmlEscape from "xml-escape";
import { loadSnippets, generateRssFeed } from "../../lib/util";


export async function get() {
	
	const posts = (await loadSnippets()).slice(0, 10);
	
	return {
		body: await generateRssFeed({
			site, 
			feedUrl: site.snippets_feed_source,
			description: site.description,
			posts
		})
	};
}
