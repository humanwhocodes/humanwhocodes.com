import site from "../../data/config.yml";
import { loadAllContent, generateJsonFeed } from "../../lib/util";

export async function GET() {

	const posts = (await loadAllContent()).slice(0, 10);

	return new Response(
		await generateJsonFeed({
			site,
			feedUrl: site.all_json_feed_source,
			posts
		}),
		{
			headers: { "Content-Type": "application/feed+json; charset=utf-8" }
		}
	);
}
