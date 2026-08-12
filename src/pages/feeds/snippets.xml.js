import site from "../../data/config.yml";
import { loadSnippets, generateRssFeed } from "../../lib/util";

export async function GET() {

	const posts = (await loadSnippets()).slice(0, 10);

	return new Response(
		await generateRssFeed({
			site,
			feedUrl: site.snippets_feed_source,
			description: site.description,
			posts
		}),
		{
			headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
		}
	);
}
