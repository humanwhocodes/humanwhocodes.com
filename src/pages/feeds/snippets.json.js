import site from "../../data/config.yml";
import { loadSnippets, generateJsonFeed } from "../../lib/util";

export async function GET() {

	const posts = (await loadSnippets()).slice(0, 10);

	return new Response(
		await generateJsonFeed({
			site,
			feedUrl: site.snippets_json_feed_source,
			posts
		}),
		{
			headers: { "Content-Type": "application/feed+json; charset=utf-8" }
		}
	);
}
