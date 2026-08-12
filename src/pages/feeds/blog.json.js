import site from "../../data/config.yml";
import { generateJsonFeed, loadBlogPosts } from "../../lib/util";

export async function GET() {

	const posts = (await loadBlogPosts()).slice(0, 10);

	return new Response(
		await generateJsonFeed({
			site,
			feedUrl: site.json_feed_source,
			posts
		}),
		{
			headers: { "Content-Type": "application/feed+json; charset=utf-8" }
		}
	);
}
