import site from "../../data/config.yml";
import { loadAllContent, generateRssFeed } from "../../lib/util";

export async function GET() {

	const posts = (await loadAllContent()).slice(0, 10);

	return new Response(
		await generateRssFeed({
			site,
			feedUrl: site.feed_source,
			description: site.description,
			posts
		}),
		{
			headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
		}
	);
}
