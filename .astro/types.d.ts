declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"2004-05-13-eclipse.md": {
  id: "2004-05-13-eclipse.md",
  slug: "2004-05-13-eclipse",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-08-25-site-redesign.md": {
  id: "2004-08-25-site-redesign.md",
  slug: "2004-08-25-site-redesign",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-09-11-ny-attorney-general-rules-ada-applies-to-private-web-sites.md": {
  id: "2004-09-11-ny-attorney-general-rules-ada-applies-to-private-web-sites.md",
  slug: "2004-09-11-ny-attorney-general-rules-ada-applies-to-private-web-sites",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-09-14-mozilla-firefox-preview-release.md": {
  id: "2004-09-14-mozilla-firefox-preview-release.md",
  slug: "2004-09-14-mozilla-firefox-preview-release",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-10-05-a-klingon-programming-language.md": {
  id: "2004-10-05-a-klingon-programming-language.md",
  slug: "2004-10-05-a-klingon-programming-language",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-10-06-jslint.md": {
  id: "2004-10-06-jslint.md",
  slug: "2004-10-06-jslint",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-10-13-cms-test-drive.md": {
  id: "2004-10-13-cms-test-drive.md",
  slug: "2004-10-13-cms-test-drive",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-10-20-tabbed-browser-security-risk.md": {
  id: "2004-10-20-tabbed-browser-security-risk.md",
  slug: "2004-10-20-tabbed-browser-security-risk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-10-26-helpful-hint-for-headless-unix-servers.md": {
  id: "2004-10-26-helpful-hint-for-headless-unix-servers.md",
  slug: "2004-10-26-helpful-hint-for-headless-unix-servers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-05-zevents-1-0.md": {
  id: "2004-11-05-zevents-1-0.md",
  slug: "2004-11-05-zevents-1-0",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-09-firefox-1-0-finally.md": {
  id: "2004-11-09-firefox-1-0-finally.md",
  slug: "2004-11-09-firefox-1-0-finally",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-11-xml-spy-2005.md": {
  id: "2004-11-11-xml-spy-2005.md",
  slug: "2004-11-11-xml-spy-2005",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-12-phpeclipse.md": {
  id: "2004-11-12-phpeclipse.md",
  slug: "2004-11-12-phpeclipse",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-14-referenced-in-a-book.md": {
  id: "2004-11-14-referenced-in-a-book.md",
  slug: "2004-11-14-referenced-in-a-book",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-18-new-netscape-browser.md": {
  id: "2004-11-18-new-netscape-browser.md",
  slug: "2004-11-18-new-netscape-browser",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-19-google-scholar.md": {
  id: "2004-11-19-google-scholar.md",
  slug: "2004-11-19-google-scholar",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-25-netscape-devedge-gone.md": {
  id: "2004-11-25-netscape-devedge-gone.md",
  slug: "2004-11-25-netscape-devedge-gone",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-11-27-jre-hell.md": {
  id: "2004-11-27-jre-hell.md",
  slug: "2004-11-27-jre-hell",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-04-netscape-devedge-back.md": {
  id: "2004-12-04-netscape-devedge-back.md",
  slug: "2004-12-04-netscape-devedge-back",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-06-reviewers-wanted.md": {
  id: "2004-12-06-reviewers-wanted.md",
  slug: "2004-12-06-reviewers-wanted",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-06-zinherit-1-0-and-zevents-1-1.md": {
  id: "2004-12-06-zinherit-1-0-and-zevents-1-1.md",
  slug: "2004-12-06-zinherit-1-0-and-zevents-1-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-07-new-netscape-browser-2.md": {
  id: "2004-12-07-new-netscape-browser-2.md",
  slug: "2004-12-07-new-netscape-browser-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-09-wrox-blog.md": {
  id: "2004-12-09-wrox-blog.md",
  slug: "2004-12-09-wrox-blog",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-13-penn-state-kicks-out-ie.md": {
  id: "2004-12-13-penn-state-kicks-out-ie.md",
  slug: "2004-12-13-penn-state-kicks-out-ie",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-14-fighting-blog-spam.md": {
  id: "2004-12-14-fighting-blog-spam.md",
  slug: "2004-12-14-fighting-blog-spam",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-20-fixing-duff-s-device.md": {
  id: "2004-12-20-fixing-duff-s-device.md",
  slug: "2004-12-20-fixing-duff-s-device",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-22-autonomous-requests-a-bad-idea.md": {
  id: "2004-12-22-autonomous-requests-a-bad-idea.md",
  slug: "2004-12-22-autonomous-requests-a-bad-idea",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-23-thunderbird-sunbird.md": {
  id: "2004-12-23-thunderbird-sunbird.md",
  slug: "2004-12-23-thunderbird-sunbird",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2004-12-29-javascript-compilers.md": {
  id: "2004-12-29-javascript-compilers.md",
  slug: "2004-12-29-javascript-compilers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-04-create-favicons.md": {
  id: "2005-01-04-create-favicons.md",
  slug: "2005-01-04-create-favicons",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-11-pre-order-professional-javascript-for-web-developers.md": {
  id: "2005-01-11-pre-order-professional-javascript-for-web-developers.md",
  slug: "2005-01-11-pre-order-professional-javascript-for-web-developers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-14-kind-words.md": {
  id: "2005-01-14-kind-words.md",
  slug: "2005-01-14-kind-words",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-19-open-a-new-browser-tab-with-javascript.md": {
  id: "2005-01-19-open-a-new-browser-tab-with-javascript.md",
  slug: "2005-01-19-open-a-new-browser-tab-with-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-19-prevent-comment-spam-2.md": {
  id: "2005-01-19-prevent-comment-spam-2.md",
  slug: "2005-01-19-prevent-comment-spam-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-20-del-icio-us-tag-javascript.md": {
  id: "2005-01-20-del-icio-us-tag-javascript.md",
  slug: "2005-01-20-del-icio-us-tag-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-21-sharp-develop-and-free-book.md": {
  id: "2005-01-21-sharp-develop-and-free-book.md",
  slug: "2005-01-21-sharp-develop-and-free-book",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-26-ticketmaster-the-world-s-worst-web-app.md": {
  id: "2005-01-26-ticketmaster-the-world-s-worst-web-app.md",
  slug: "2005-01-26-ticketmaster-the-world-s-worst-web-app",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-01-28-finally-mozilla-vs-firefox-explained.md": {
  id: "2005-01-28-finally-mozilla-vs-firefox-explained.md",
  slug: "2005-01-28-finally-mozilla-vs-firefox-explained",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-02-how-to-build-a-mozilla-app.md": {
  id: "2005-02-02-how-to-build-a-mozilla-app.md",
  slug: "2005-02-02-how-to-build-a-mozilla-app",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-03-gzip-compression-in-php.md": {
  id: "2005-02-03-gzip-compression-in-php.md",
  slug: "2005-02-03-gzip-compression-in-php",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-03-javascript-game-programming.md": {
  id: "2005-02-03-javascript-game-programming.md",
  slug: "2005-02-03-javascript-game-programming",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-04-super-bowl-friday.md": {
  id: "2005-02-04-super-bowl-friday.md",
  slug: "2005-02-04-super-bowl-friday",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-08-google-maps.md": {
  id: "2005-02-08-google-maps.md",
  slug: "2005-02-08-google-maps",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-09-ie-memory-problems.md": {
  id: "2005-02-09-ie-memory-problems.md",
  slug: "2005-02-09-ie-memory-problems",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-10-more-on-ie-memory-leaks.md": {
  id: "2005-02-10-more-on-ie-memory-leaks.md",
  slug: "2005-02-10-more-on-ie-memory-leaks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-13-google-maps-explained.md": {
  id: "2005-02-13-google-maps-explained.md",
  slug: "2005-02-13-google-maps-explained",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-15-ie-7-is-coming.md": {
  id: "2005-02-15-ie-7-is-coming.md",
  slug: "2005-02-15-ie-7-is-coming",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-16-creating-a-firefox-extension.md": {
  id: "2005-02-16-creating-a-firefox-extension.md",
  slug: "2005-02-16-creating-a-firefox-extension",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-23-browser-injection-problem.md": {
  id: "2005-02-23-browser-injection-problem.md",
  slug: "2005-02-23-browser-injection-problem",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-23-i-quit-my-job-i-m-gonna-blog-instead.md": {
  id: "2005-02-23-i-quit-my-job-i-m-gonna-blog-instead.md",
  slug: "2005-02-23-i-quit-my-job-i-m-gonna-blog-instead",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-23-tracking-trackback.md": {
  id: "2005-02-23-tracking-trackback.md",
  slug: "2005-02-23-tracking-trackback",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-24-finally-devedge-has-a-home.md": {
  id: "2005-02-24-finally-devedge-has-a-home.md",
  slug: "2005-02-24-finally-devedge-has-a-home",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-02-25-fighting-code-injection.md": {
  id: "2005-02-25-fighting-code-injection.md",
  slug: "2005-02-25-fighting-code-injection",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-07-netscape-8-0-beta.md": {
  id: "2005-03-07-netscape-8-0-beta.md",
  slug: "2005-03-07-netscape-8-0-beta",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-08-gmail-reflections.md": {
  id: "2005-03-08-gmail-reflections.md",
  slug: "2005-03-08-gmail-reflections",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-11-ie-blog-asks-for-feedback.md": {
  id: "2005-03-11-ie-blog-asks-for-feedback.md",
  slug: "2005-03-11-ie-blog-asks-for-feedback",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-11-mozilla-stops-production-of-suite.md": {
  id: "2005-03-11-mozilla-stops-production-of-suite.md",
  slug: "2005-03-11-mozilla-stops-production-of-suite",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-16-google-x-borrows-from-macos.md": {
  id: "2005-03-16-google-x-borrows-from-macos.md",
  slug: "2005-03-16-google-x-borrows-from-macos",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-16-ie-7-information-leaked.md": {
  id: "2005-03-16-ie-7-information-leaked.md",
  slug: "2005-03-16-ie-7-information-leaked",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-17-google-x-gone.md": {
  id: "2005-03-17-google-x-gone.md",
  slug: "2005-03-17-google-x-gone",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-17-view-dom-source-bookmarklet.md": {
  id: "2005-03-17-view-dom-source-bookmarklet.md",
  slug: "2005-03-17-view-dom-source-bookmarklet",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-20-opera-8-to-support-user-javascript.md": {
  id: "2005-03-20-opera-8-to-support-user-javascript.md",
  slug: "2005-03-20-opera-8-to-support-user-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-21-creating-an-autosuggest-textbox.md": {
  id: "2005-03-21-creating-an-autosuggest-textbox.md",
  slug: "2005-03-21-creating-an-autosuggest-textbox",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-23-paypal-sdk.md": {
  id: "2005-03-23-paypal-sdk.md",
  slug: "2005-03-23-paypal-sdk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-30-internet-explorer-innerhtml-quirk.md": {
  id: "2005-03-30-internet-explorer-innerhtml-quirk.md",
  slug: "2005-03-30-internet-explorer-innerhtml-quirk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-03-31-firefox-link-prefetching.md": {
  id: "2005-03-31-firefox-link-prefetching.md",
  slug: "2005-03-31-firefox-link-prefetching",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-01-last-day-at-matrixone.md": {
  id: "2005-04-01-last-day-at-matrixone.md",
  slug: "2005-04-01-last-day-at-matrixone",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-05-firefox-javascript-flaw.md": {
  id: "2005-04-05-firefox-javascript-flaw.md",
  slug: "2005-04-05-firefox-javascript-flaw",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-06-latest-site.md": {
  id: "2005-04-06-latest-site.md",
  slug: "2005-04-06-latest-site",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-08-autosuggest-some-more.md": {
  id: "2005-04-08-autosuggest-some-more.md",
  slug: "2005-04-08-autosuggest-some-more",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-12-the-acid2-test.md": {
  id: "2005-04-12-the-acid2-test.md",
  slug: "2005-04-12-the-acid2-test",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-15-first-copy-of-book.md": {
  id: "2005-04-15-first-copy-of-book.md",
  slug: "2005-04-15-first-copy-of-book",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-16-great-html-article.md": {
  id: "2005-04-16-great-html-article.md",
  slug: "2005-04-16-great-html-article",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-16-safari-1-3.md": {
  id: "2005-04-16-safari-1-3.md",
  slug: "2005-04-16-safari-1-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-19-ten-good-practices.md": {
  id: "2005-04-19-ten-good-practices.md",
  slug: "2005-04-19-ten-good-practices",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-20-mozilla-adding-canvas-support.md": {
  id: "2005-04-20-mozilla-adding-canvas-support.md",
  slug: "2005-04-20-mozilla-adding-canvas-support",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-23-ie7-beta-details-announced.md": {
  id: "2005-04-23-ie7-beta-details-announced.md",
  slug: "2005-04-23-ie7-beta-details-announced",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-25-opera-ceo-to-swim-the-atlantic.md": {
  id: "2005-04-25-opera-ceo-to-swim-the-atlantic.md",
  slug: "2005-04-25-opera-ceo-to-swim-the-atlantic",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-25-zcolor-0-1.md": {
  id: "2005-04-25-zcolor-0-1.md",
  slug: "2005-04-25-zcolor-0-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-26-from-the-editor.md": {
  id: "2005-04-26-from-the-editor.md",
  slug: "2005-04-26-from-the-editor",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-26-png-alpha-support-in-ie7.md": {
  id: "2005-04-26-png-alpha-support-in-ie7.md",
  slug: "2005-04-26-png-alpha-support-in-ie7",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-26-web-developer-tools.md": {
  id: "2005-04-26-web-developer-tools.md",
  slug: "2005-04-26-web-developer-tools",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-27-net-impressions.md": {
  id: "2005-04-27-net-impressions.md",
  slug: "2005-04-27-net-impressions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-28-ie7-user-agent-string-revealed.md": {
  id: "2005-04-28-ie7-user-agent-string-revealed.md",
  slug: "2005-04-28-ie7-user-agent-string-revealed",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-28-sites-release-updates.md": {
  id: "2005-04-28-sites-release-updates.md",
  slug: "2005-04-28-sites-release-updates",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-29-firefox-1-1-to-support-svg.md": {
  id: "2005-04-29-firefox-1-1-to-support-svg.md",
  slug: "2005-04-29-firefox-1-1-to-support-svg",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-04-29-safari-passes-acid2-test.md": {
  id: "2005-04-29-safari-passes-acid2-test.md",
  slug: "2005-04-29-safari-passes-acid2-test",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-02-looking-for-some-good-reviewers.md": {
  id: "2005-05-02-looking-for-some-good-reviewers.md",
  slug: "2005-05-02-looking-for-some-good-reviewers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-03-first-negative-review-on-amazon.md": {
  id: "2005-05-03-first-negative-review-on-amazon.md",
  slug: "2005-05-03-first-negative-review-on-amazon",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-03-professional-javascript-forum.md": {
  id: "2005-05-03-professional-javascript-forum.md",
  slug: "2005-05-03-professional-javascript-forum",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-04-working-with-json.md": {
  id: "2005-05-04-working-with-json.md",
  slug: "2005-05-04-working-with-json",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-06-a-stellar-review.md": {
  id: "2005-05-06-a-stellar-review.md",
  slug: "2005-05-06-a-stellar-review",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-08-initial-c-reactions.md": {
  id: "2005-05-08-initial-c-reactions.md",
  slug: "2005-05-08-initial-c-reactions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-09-suggestions-for-new-book.md": {
  id: "2005-05-09-suggestions-for-new-book.md",
  slug: "2005-05-09-suggestions-for-new-book",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-13-another-kind-review.md": {
  id: "2005-05-13-another-kind-review.md",
  slug: "2005-05-13-another-kind-review",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-14-why-typos.md": {
  id: "2005-05-14-why-typos.md",
  slug: "2005-05-14-why-typos",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-16-on-amazon-reviews.md": {
  id: "2005-05-16-on-amazon-reviews.md",
  slug: "2005-05-16-on-amazon-reviews",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-17-ie7-to-have-tabs.md": {
  id: "2005-05-17-ie7-to-have-tabs.md",
  slug: "2005-05-17-ie7-to-have-tabs",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-19-netscape-8.md": {
  id: "2005-05-19-netscape-8.md",
  slug: "2005-05-19-netscape-8",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-20-movin-on-up.md": {
  id: "2005-05-20-movin-on-up.md",
  slug: "2005-05-20-movin-on-up",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-20-new-book-change-ajax.md": {
  id: "2005-05-20-new-book-change-ajax.md",
  slug: "2005-05-20-new-book-change-ajax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-23-anonymous-coward-returns.md": {
  id: "2005-05-23-anonymous-coward-returns.md",
  slug: "2005-05-23-anonymous-coward-returns",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-24-popups-are-evil.md": {
  id: "2005-05-24-popups-are-evil.md",
  slug: "2005-05-24-popups-are-evil",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-25-netscape-8-messes-up-ie.md": {
  id: "2005-05-25-netscape-8-messes-up-ie.md",
  slug: "2005-05-25-netscape-8-messes-up-ie",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-27-announcing-the-first-co-author.md": {
  id: "2005-05-27-announcing-the-first-co-author.md",
  slug: "2005-05-27-announcing-the-first-co-author",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-29-where-s-the-javascript.md": {
  id: "2005-05-29-where-s-the-javascript.md",
  slug: "2005-05-29-where-s-the-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-30-last-autosuggest-article.md": {
  id: "2005-05-30-last-autosuggest-article.md",
  slug: "2005-05-30-last-autosuggest-article",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-05-31-javascript-s-future-cajun.md": {
  id: "2005-05-31-javascript-s-future-cajun.md",
  slug: "2005-05-31-javascript-s-future-cajun",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-05-java-or-javascript.md": {
  id: "2005-06-05-java-or-javascript.md",
  slug: "2005-06-05-java-or-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-06-aim-mail-debuts.md": {
  id: "2005-06-06-aim-mail-debuts.md",
  slug: "2005-06-06-aim-mail-debuts",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-11-open-source-cmss-what-the.md": {
  id: "2005-06-11-open-source-cmss-what-the.md",
  slug: "2005-06-11-open-source-cmss-what-the",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-14-brendan-eich-s-latest.md": {
  id: "2005-06-14-brendan-eich-s-latest.md",
  slug: "2005-06-14-brendan-eich-s-latest",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-16-examples-not-working.md": {
  id: "2005-06-16-examples-not-working.md",
  slug: "2005-06-16-examples-not-working",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-18-updated-book-examples.md": {
  id: "2005-06-18-updated-book-examples.md",
  slug: "2005-06-18-updated-book-examples",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-21-cajun-is-coming.md": {
  id: "2005-06-21-cajun-is-coming.md",
  slug: "2005-06-21-cajun-is-coming",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-22-mozilla-s-new-array-methods.md": {
  id: "2005-06-22-mozilla-s-new-array-methods.md",
  slug: "2005-06-22-mozilla-s-new-array-methods",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-29-the-atlas-project.md": {
  id: "2005-06-29-the-atlas-project.md",
  slug: "2005-06-29-the-atlas-project",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-06-30-google-maps-api.md": {
  id: "2005-06-30-google-maps-api.md",
  slug: "2005-06-30-google-maps-api",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-01-developing-with-google-maps.md": {
  id: "2005-07-01-developing-with-google-maps.md",
  slug: "2005-07-01-developing-with-google-maps",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-07-google-ajaxslt.md": {
  id: "2005-07-07-google-ajaxslt.md",
  slug: "2005-07-07-google-ajaxslt",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-08-google-for-firefox.md": {
  id: "2005-07-08-google-for-firefox.md",
  slug: "2005-07-08-google-for-firefox",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-11-favorable-review.md": {
  id: "2005-07-11-favorable-review.md",
  slug: "2005-07-11-favorable-review",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-17-ajax-book-coming-along.md": {
  id: "2005-07-17-ajax-book-coming-along.md",
  slug: "2005-07-17-ajax-book-coming-along",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-28-another-good-review.md": {
  id: "2005-07-28-another-good-review.md",
  slug: "2005-07-28-another-good-review",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-28-ie7-beta-1-released.md": {
  id: "2005-07-28-ie7-beta-1-released.md",
  slug: "2005-07-28-ie7-beta-1-released",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-07-31-array-extensions.md": {
  id: "2005-07-31-array-extensions.md",
  slug: "2005-07-31-array-extensions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-01-e4x-lives.md": {
  id: "2005-08-01-e4x-lives.md",
  slug: "2005-08-01-e4x-lives",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-05-styled-form-controls.md": {
  id: "2005-08-05-styled-form-controls.md",
  slug: "2005-08-05-styled-form-controls",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-08-top-5-web-design-mistakes.md": {
  id: "2005-08-08-top-5-web-design-mistakes.md",
  slug: "2005-08-08-top-5-web-design-mistakes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-09-does-javascript-suck.md": {
  id: "2005-08-09-does-javascript-suck.md",
  slug: "2005-08-09-does-javascript-suck",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-12-latest-article.md": {
  id: "2005-08-12-latest-article.md",
  slug: "2005-08-12-latest-article",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-16-the-power-of-themes.md": {
  id: "2005-08-16-the-power-of-themes.md",
  slug: "2005-08-16-the-power-of-themes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-18-pre-order-professional-ajax.md": {
  id: "2005-08-18-pre-order-professional-ajax.md",
  slug: "2005-08-18-pre-order-professional-ajax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-19-force-landscape-printing-ie-only.md": {
  id: "2005-08-19-force-landscape-printing-ie-only.md",
  slug: "2005-08-19-force-landscape-printing-ie-only",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-19-zarray-update.md": {
  id: "2005-08-19-zarray-update.md",
  slug: "2005-08-19-zarray-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-24-microsoft-was-right.md": {
  id: "2005-08-24-microsoft-was-right.md",
  slug: "2005-08-24-microsoft-was-right",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-08-28-reviews-wanted.md": {
  id: "2005-08-28-reviews-wanted.md",
  slug: "2005-08-28-reviews-wanted",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-01-web-architecture-2005.md": {
  id: "2005-09-01-web-architecture-2005.md",
  slug: "2005-09-01-web-architecture-2005",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-06-web-developer-extensions-for-firefox-and-what-s-this.md": {
  id: "2005-09-06-web-developer-extensions-for-firefox-and-what-s-this.md",
  slug: "2005-09-06-web-developer-extensions-for-firefox-and-what-s-this",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-08-how-google-keeps-spammers-away.md": {
  id: "2005-09-08-how-google-keeps-spammers-away.md",
  slug: "2005-09-08-how-google-keeps-spammers-away",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-14-ie7-makes-developers-happy.md": {
  id: "2005-09-14-ie7-makes-developers-happy.md",
  slug: "2005-09-14-ie7-makes-developers-happy",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-28-blame-netscape-first.md": {
  id: "2005-09-28-blame-netscape-first.md",
  slug: "2005-09-28-blame-netscape-first",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-29-safari-recreates-proprietary-extensions.md": {
  id: "2005-09-29-safari-recreates-proprietary-extensions.md",
  slug: "2005-09-29-safari-recreates-proprietary-extensions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-30-ajax-using-a-style-sheet.md": {
  id: "2005-09-30-ajax-using-a-style-sheet.md",
  slug: "2005-09-30-ajax-using-a-style-sheet",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-09-30-vistaprint-goes-public.md": {
  id: "2005-09-30-vistaprint-goes-public.md",
  slug: "2005-09-30-vistaprint-goes-public",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-10-13-professional-ajax-outline.md": {
  id: "2005-10-13-professional-ajax-outline.md",
  slug: "2005-10-13-professional-ajax-outline",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-10-17-the-death-of-ie-css-hacks.md": {
  id: "2005-10-17-the-death-of-ie-css-hacks.md",
  slug: "2005-10-17-the-death-of-ie-css-hacks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-10-24-microsoft-invented-ajax.md": {
  id: "2005-10-24-microsoft-invented-ajax.md",
  slug: "2005-10-24-microsoft-invented-ajax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-10-30-updated-zdragdrop-1-1.md": {
  id: "2005-10-30-updated-zdragdrop-1-1.md",
  slug: "2005-10-30-updated-zdragdrop-1-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-11-03-microsoft-doesn-t-innovate.md": {
  id: "2005-11-03-microsoft-doesn-t-innovate.md",
  slug: "2005-11-03-microsoft-doesn-t-innovate",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-11-17-want-to-work-with-me.md": {
  id: "2005-11-17-want-to-work-with-me.md",
  slug: "2005-11-17-want-to-work-with-me",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-11-30-firefox-1-5-released.md": {
  id: "2005-11-30-firefox-1-5-released.md",
  slug: "2005-11-30-firefox-1-5-released",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-12-12-comment-spam.md": {
  id: "2005-12-12-comment-spam.md",
  slug: "2005-12-12-comment-spam",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-12-12-the-website-development-process.md": {
  id: "2005-12-12-the-website-development-process.md",
  slug: "2005-12-12-the-website-development-process",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-12-17-rip-web-trends-of-the-90s.md": {
  id: "2005-12-17-rip-web-trends-of-the-90s.md",
  slug: "2005-12-17-rip-web-trends-of-the-90s",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-12-21-syndication-confusion.md": {
  id: "2005-12-21-syndication-confusion.md",
  slug: "2005-12-21-syndication-confusion",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2005-12-26-someone-else-gets-it-too.md": {
  id: "2005-12-26-someone-else-gets-it-too.md",
  slug: "2005-12-26-someone-else-gets-it-too",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-05-canvas-in-ie.md": {
  id: "2006-01-05-canvas-in-ie.md",
  slug: "2006-01-05-canvas-in-ie",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-10-javascript-1-2-must-die.md": {
  id: "2006-01-10-javascript-1-2-must-die.md",
  slug: "2006-01-10-javascript-1-2-must-die",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-13-colored-bullets.md": {
  id: "2006-01-13-colored-bullets.md",
  slug: "2006-01-13-colored-bullets",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-18-firefox-1-5-keypress-event-changes.md": {
  id: "2006-01-18-firefox-1-5-keypress-event-changes.md",
  slug: "2006-01-18-firefox-1-5-keypress-event-changes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-18-the-ping-attribute.md": {
  id: "2006-01-18-the-ping-attribute.md",
  slug: "2006-01-18-the-ping-attribute",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-26-using-semantics-correctly.md": {
  id: "2006-01-26-using-semantics-correctly.md",
  slug: "2006-01-26-using-semantics-correctly",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-27-now-available-professional-ajax.md": {
  id: "2006-01-27-now-available-professional-ajax.md",
  slug: "2006-01-27-now-available-professional-ajax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-30-upload-from-a-link.md": {
  id: "2006-01-30-upload-from-a-link.md",
  slug: "2006-01-30-upload-from-a-link",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-01-31-ie-7-beta-2-preview-released.md": {
  id: "2006-01-31-ie-7-beta-2-preview-released.md",
  slug: "2006-01-31-ie-7-beta-2-preview-released",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-01-javascript-para-desarrolladores-web.md": {
  id: "2006-02-01-javascript-para-desarrolladores-web.md",
  slug: "2006-02-01-javascript-para-desarrolladores-web",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-10-alternate-ajax-techniques.md": {
  id: "2006-02-10-alternate-ajax-techniques.md",
  slug: "2006-02-10-alternate-ajax-techniques",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-11-first-professional-ajax-reviews-rolling-in.md": {
  id: "2006-02-11-first-professional-ajax-reviews-rolling-in.md",
  slug: "2006-02-11-first-professional-ajax-reviews-rolling-in",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-13-yahoo-user-interface-blog.md": {
  id: "2006-02-13-yahoo-user-interface-blog.md",
  slug: "2006-02-13-yahoo-user-interface-blog",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-17-now-that-s-security.md": {
  id: "2006-02-17-now-that-s-security.md",
  slug: "2006-02-17-now-that-s-security",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-19-respect-javascript.md": {
  id: "2006-02-19-respect-javascript.md",
  slug: "2006-02-19-respect-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-22-ajax-shelflife.md": {
  id: "2006-02-22-ajax-shelflife.md",
  slug: "2006-02-22-ajax-shelflife",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-26-css-is-complicated.md": {
  id: "2006-02-26-css-is-complicated.md",
  slug: "2006-02-26-css-is-complicated",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-02-26-introducing-eureka-v0-1.md": {
  id: "2006-02-26-introducing-eureka-v0-1.md",
  slug: "2006-02-26-introducing-eureka-v0-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-01-firefox-onbeforeunload-fun.md": {
  id: "2006-03-01-firefox-onbeforeunload-fun.md",
  slug: "2006-03-01-firefox-onbeforeunload-fun",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-01-ie-onbeforeunload-fun.md": {
  id: "2006-03-01-ie-onbeforeunload-fun.md",
  slug: "2006-03-01-ie-onbeforeunload-fun",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-05-firebug.md": {
  id: "2006-03-05-firebug.md",
  slug: "2006-03-05-firebug",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-06-aim-sdk.md": {
  id: "2006-03-06-aim-sdk.md",
  slug: "2006-03-06-aim-sdk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-13-adobe-jumps-on-the-ajax-bandwagon.md": {
  id: "2006-03-13-adobe-jumps-on-the-ajax-bandwagon.md",
  slug: "2006-03-13-adobe-jumps-on-the-ajax-bandwagon",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-14-xmlhttp-requests-for-ajax.md": {
  id: "2006-03-14-xmlhttp-requests-for-ajax.md",
  slug: "2006-03-14-xmlhttp-requests-for-ajax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-15-what-do-you-want-to-see-in-pro-js-2nd-edition.md": {
  id: "2006-03-15-what-do-you-want-to-see-in-pro-js-2nd-edition.md",
  slug: "2006-03-15-what-do-you-want-to-see-in-pro-js-2nd-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-17-alternate-ajax-techniques-part-2.md": {
  id: "2006-03-17-alternate-ajax-techniques-part-2.md",
  slug: "2006-03-17-alternate-ajax-techniques-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-17-dom-tree-update.md": {
  id: "2006-03-17-dom-tree-update.md",
  slug: "2006-03-17-dom-tree-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-24-yahoo-connection-manager.md": {
  id: "2006-03-24-yahoo-connection-manager.md",
  slug: "2006-03-24-yahoo-connection-manager",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-27-google-maps-api-no-xhtml-support.md": {
  id: "2006-03-27-google-maps-api-no-xhtml-support.md",
  slug: "2006-03-27-google-maps-api-no-xhtml-support",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-03-29-activex-armageddon.md": {
  id: "2006-03-29-activex-armageddon.md",
  slug: "2006-03-29-activex-armageddon",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-04-05-css-javascript-evil.md": {
  id: "2006-04-05-css-javascript-evil.md",
  slug: "2006-04-05-css-javascript-evil",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-04-08-the-magic-of-unit-testing.md": {
  id: "2006-04-08-the-magic-of-unit-testing.md",
  slug: "2006-04-08-the-magic-of-unit-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-04-22-eureka-v0-2-now-with-leak-detection.md": {
  id: "2006-04-22-eureka-v0-2-now-with-leak-detection.md",
  slug: "2006-04-22-eureka-v0-2-now-with-leak-detection",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-04-25-design-patterns-in-javascript.md": {
  id: "2006-04-25-design-patterns-in-javascript.md",
  slug: "2006-04-25-design-patterns-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-05-13-praise-for-microsoft.md": {
  id: "2006-05-13-praise-for-microsoft.md",
  slug: "2006-05-13-praise-for-microsoft",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-05-17-google-web-toolkit.md": {
  id: "2006-05-17-google-web-toolkit.md",
  slug: "2006-05-17-google-web-toolkit",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-05-25-and-then-there-were-three.md": {
  id: "2006-05-25-and-then-there-were-three.md",
  slug: "2006-05-25-and-then-there-were-three",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-05-31-eureka-suite-the-next-generation.md": {
  id: "2006-05-31-eureka-suite-the-next-generation.md",
  slug: "2006-05-31-eureka-suite-the-next-generation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-06-05-global-variables-are-evil.md": {
  id: "2006-06-05-global-variables-are-evil.md",
  slug: "2006-06-05-global-variables-are-evil",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-06-10-firebug-0-4.md": {
  id: "2006-06-10-firebug-0-4.md",
  slug: "2006-06-10-firebug-0-4",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-06-13-fun-with-null-and-undefined.md": {
  id: "2006-06-13-fun-with-null-and-undefined.md",
  slug: "2006-06-13-fun-with-null-and-undefined",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-06-20-use-null-comparisons-sparingly.md": {
  id: "2006-06-20-use-null-comparisons-sparingly.md",
  slug: "2006-06-20-use-null-comparisons-sparingly",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-06-27-back-button-onload-mess.md": {
  id: "2006-06-27-back-button-onload-mess.md",
  slug: "2006-06-27-back-button-onload-mess",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-06-30-ie7-beta-3.md": {
  id: "2006-06-30-ie7-beta-3.md",
  slug: "2006-06-30-ie7-beta-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-07-10-mainstream-ajax.md": {
  id: "2006-07-10-mainstream-ajax.md",
  slug: "2006-07-10-mainstream-ajax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-07-18-visual-studio-express-rocks.md": {
  id: "2006-07-18-visual-studio-express-rocks.md",
  slug: "2006-07-18-visual-studio-express-rocks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-07-24-yahoo-vs-google.md": {
  id: "2006-07-24-yahoo-vs-google.md",
  slug: "2006-07-24-yahoo-vs-google",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-07-30-the-problem-of-photo-sharing.md": {
  id: "2006-07-30-the-problem-of-photo-sharing.md",
  slug: "2006-07-30-the-problem-of-photo-sharing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-08-08-webkit-on-a-pc.md": {
  id: "2006-08-08-webkit-on-a-pc.md",
  slug: "2006-08-08-webkit-on-a-pc",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-08-20-new-yahoo-photos.md": {
  id: "2006-08-20-new-yahoo-photos.md",
  slug: "2006-08-20-new-yahoo-photos",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-08-26-rss-and-syndication-roadblocks.md": {
  id: "2006-08-26-rss-and-syndication-roadblocks.md",
  slug: "2006-08-26-rss-and-syndication-roadblocks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-08-31-safari-development-tools.md": {
  id: "2006-08-31-safari-development-tools.md",
  slug: "2006-08-31-safari-development-tools",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-09-06-don-t-allow-overriden-methods.md": {
  id: "2006-09-06-don-t-allow-overriden-methods.md",
  slug: "2006-09-06-don-t-allow-overriden-methods",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-09-07-closures-considered-harmful.md": {
  id: "2006-09-07-closures-considered-harmful.md",
  slug: "2006-09-07-closures-considered-harmful",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-09-22-yahoo-hack-day.md": {
  id: "2006-09-22-yahoo-hack-day.md",
  slug: "2006-09-22-yahoo-hack-day",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-09-23-small-zxml-update.md": {
  id: "2006-09-23-small-zxml-update.md",
  slug: "2006-09-23-small-zxml-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-09-30-writing-again.md": {
  id: "2006-09-30-writing-again.md",
  slug: "2006-09-30-writing-again",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-10-12-pain-with-inline-block.md": {
  id: "2006-10-12-pain-with-inline-block.md",
  slug: "2006-10-12-pain-with-inline-block",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-10-14-debunking-object.md": {
  id: "2006-10-14-debunking-object.md",
  slug: "2006-10-14-debunking-object",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-10-21-i-love-my-job.md": {
  id: "2006-10-21-i-love-my-job.md",
  slug: "2006-10-21-i-love-my-job",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-10-27-avoiding-plagiarism.md": {
  id: "2006-10-27-avoiding-plagiarism.md",
  slug: "2006-10-27-avoiding-plagiarism",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-10-29-update-to-zxml.md": {
  id: "2006-10-29-update-to-zxml.md",
  slug: "2006-10-29-update-to-zxml",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-01-the-case-against-hungarian-notation-in-javascript.md": {
  id: "2006-11-01-the-case-against-hungarian-notation-in-javascript.md",
  slug: "2006-11-01-the-case-against-hungarian-notation-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-04-the-absorb-function.md": {
  id: "2006-11-04-the-absorb-function.md",
  slug: "2006-11-04-the-absorb-function",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-08-ie-s-innerhtml-problem.md": {
  id: "2006-11-08-ie-s-innerhtml-problem.md",
  slug: "2006-11-08-ie-s-innerhtml-problem",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-08-the-absorb-method.md": {
  id: "2006-11-08-the-absorb-method.md",
  slug: "2006-11-08-the-absorb-method",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-09-adobe-open-sources-flash-javascript-engine.md": {
  id: "2006-11-09-adobe-open-sources-flash-javascript-engine.md",
  slug: "2006-11-09-adobe-open-sources-flash-javascript-engine",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-13-congratulations-to-yui-team.md": {
  id: "2006-11-13-congratulations-to-yui-team.md",
  slug: "2006-11-13-congratulations-to-yui-team",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-15-minimizing-closure-usage.md": {
  id: "2006-11-15-minimizing-closure-usage.md",
  slug: "2006-11-15-minimizing-closure-usage",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-16-browser-detection-versus-feature-detection.md": {
  id: "2006-11-16-browser-detection-versus-feature-detection.md",
  slug: "2006-11-16-browser-detection-versus-feature-detection",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-11-27-professional-ajax-amazon-s-8-best-tech-book-of-2006.md": {
  id: "2006-11-27-professional-ajax-amazon-s-8-best-tech-book-of-2006.md",
  slug: "2006-11-27-professional-ajax-amazon-s-8-best-tech-book-of-2006",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-12-02-standards-with-sanity.md": {
  id: "2006-12-02-standards-with-sanity.md",
  slug: "2006-12-02-standards-with-sanity",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-12-20-the-javascript-download-gotcha.md": {
  id: "2006-12-20-the-javascript-download-gotcha.md",
  slug: "2006-12-20-the-javascript-download-gotcha",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2006-12-26-interesting-javascript-string-capability.md": {
  id: "2006-12-26-interesting-javascript-string-capability.md",
  slug: "2006-12-26-interesting-javascript-string-capability",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-01-03-opacity-in-ie6-alpha-or-png.md": {
  id: "2007-01-03-opacity-in-ie6-alpha-or-png.md",
  slug: "2007-01-03-opacity-in-ie6-alpha-or-png",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-01-15-feature-detection-browser-detection.md": {
  id: "2007-01-15-feature-detection-browser-detection.md",
  slug: "2007-01-15-feature-detection-browser-detection",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-01-15-spam-insights.md": {
  id: "2007-01-15-spam-insights.md",
  slug: "2007-01-15-spam-insights",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-01-19-security-vs-usability.md": {
  id: "2007-01-19-security-vs-usability.md",
  slug: "2007-01-19-security-vs-usability",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-01-25-what-css-is-missing.md": {
  id: "2007-01-25-what-css-is-missing.md",
  slug: "2007-01-25-what-css-is-missing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-05-ie-vs-png-the-battle-continues.md": {
  id: "2007-02-05-ie-vs-png-the-battle-continues.md",
  slug: "2007-02-05-ie-vs-png-the-battle-continues",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-06-event-order-of-blur-and-change.md": {
  id: "2007-02-06-event-order-of-blur-and-change.md",
  slug: "2007-02-06-event-order-of-blur-and-change",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-08-announcing-professional-ajax-second-edition.md": {
  id: "2007-02-08-announcing-professional-ajax-second-edition.md",
  slug: "2007-02-08-announcing-professional-ajax-second-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-12-what-s-the-deal-with-css-query-engines.md": {
  id: "2007-02-12-what-s-the-deal-with-css-query-engines.md",
  slug: "2007-02-12-what-s-the-deal-with-css-query-engines",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-20-what-s-nicholas-doing-now.md": {
  id: "2007-02-20-what-s-nicholas-doing-now.md",
  slug: "2007-02-20-what-s-nicholas-doing-now",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-22-getelementsmatching.md": {
  id: "2007-02-22-getelementsmatching.md",
  slug: "2007-02-22-getelementsmatching",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-02-28-a-note-on-javascript-performance.md": {
  id: "2007-02-28-a-note-on-javascript-performance.md",
  slug: "2007-02-28-a-note-on-javascript-performance",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-02-free-excerpt-from-professional-ajax-second-edition.md": {
  id: "2007-03-02-free-excerpt-from-professional-ajax-second-edition.md",
  slug: "2007-03-02-free-excerpt-from-professional-ajax-second-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-06-another-pro-ajax-2e-excerpt.md": {
  id: "2007-03-06-another-pro-ajax-2e-excerpt.md",
  slug: "2007-03-06-another-pro-ajax-2e-excerpt",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-08-the-new-my-yahoo-beta-has-launched-and-i-helped.md": {
  id: "2007-03-08-the-new-my-yahoo-beta-has-launched-and-i-helped.md",
  slug: "2007-03-08-the-new-my-yahoo-beta-has-launched-and-i-helped",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-13-net-to-be-more-like-javascript.md": {
  id: "2007-03-13-net-to-be-more-like-javascript.md",
  slug: "2007-03-13-net-to-be-more-like-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-17-what-do-you-love-hate-about-professional-javascript.md": {
  id: "2007-03-17-what-do-you-love-hate-about-professional-javascript.md",
  slug: "2007-03-17-what-do-you-love-hate-about-professional-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-21-pain-with-inline-block-again.md": {
  id: "2007-03-21-pain-with-inline-block-again.md",
  slug: "2007-03-21-pain-with-inline-block-again",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-03-27-surviving-an-interview-with-me.md": {
  id: "2007-03-27-surviving-an-interview-with-me.md",
  slug: "2007-03-27-surviving-an-interview-with-me",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-04-03-observers-shouldn-t-observe-themselves.md": {
  id: "2007-04-03-observers-shouldn-t-observe-themselves.md",
  slug: "2007-04-03-observers-shouldn-t-observe-themselves",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-04-06-google-using-yui-grids.md": {
  id: "2007-04-06-google-using-yui-grids.md",
  slug: "2007-04-06-google-using-yui-grids",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-04-12-taking-a-little-time.md": {
  id: "2007-04-12-taking-a-little-time.md",
  slug: "2007-04-12-taking-a-little-time",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-05-08-safari-lies.md": {
  id: "2007-05-08-safari-lies.md",
  slug: "2007-05-08-safari-lies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-05-15-an-open-letter-to-opera.md": {
  id: "2007-05-15-an-open-letter-to-opera.md",
  slug: "2007-05-15-an-open-letter-to-opera",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-05-18-first-review-for-professional-ajax-2nd-edition.md": {
  id: "2007-05-18-first-review-for-professional-ajax-2nd-edition.md",
  slug: "2007-05-18-first-review-for-professional-ajax-2nd-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-05-18-the-new-my-yahoo-gets-even-better.md": {
  id: "2007-05-18-the-new-my-yahoo-gets-even-better.md",
  slug: "2007-05-18-the-new-my-yahoo-gets-even-better",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-05-25-maintainable-javascript-talk.md": {
  id: "2007-05-25-maintainable-javascript-talk.md",
  slug: "2007-05-25-maintainable-javascript-talk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-03-javascript-variable-names-you-shouldn-t-use.md": {
  id: "2007-06-03-javascript-variable-names-you-shouldn-t-use.md",
  slug: "2007-06-03-javascript-variable-names-you-shouldn-t-use",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-04-what-is-up-with-recruiters.md": {
  id: "2007-06-04-what-is-up-with-recruiters.md",
  slug: "2007-06-04-what-is-up-with-recruiters",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-05-come-see-me-talk.md": {
  id: "2007-06-05-come-see-me-talk.md",
  slug: "2007-06-05-come-see-me-talk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-10-bad-security-decisions.md": {
  id: "2007-06-10-bad-security-decisions.md",
  slug: "2007-06-10-bad-security-decisions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-12-safari-3-on-windows.md": {
  id: "2007-06-12-safari-3-on-windows.md",
  slug: "2007-06-12-safari-3-on-windows",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-28-ie6-fix-frees-you-of-memory-leaks.md": {
  id: "2007-06-28-ie6-fix-frees-you-of-memory-leaks.md",
  slug: "2007-06-28-ie6-fix-frees-you-of-memory-leaks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-06-28-professional-ajax-at-borders.md": {
  id: "2007-06-28-professional-ajax-at-borders.md",
  slug: "2007-06-28-professional-ajax-at-borders",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-02-scriptdoc.md": {
  id: "2007-07-02-scriptdoc.md",
  slug: "2007-07-02-scriptdoc",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-04-yahoo-s-best-kept-secret.md": {
  id: "2007-07-04-yahoo-s-best-kept-secret.md",
  slug: "2007-07-04-yahoo-s-best-kept-secret",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-05-standards-in-context.md": {
  id: "2007-07-05-standards-in-context.md",
  slug: "2007-07-05-standards-in-context",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-08-openoffice-almost-there.md": {
  id: "2007-07-08-openoffice-almost-there.md",
  slug: "2007-07-08-openoffice-almost-there",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-09-some-of-my-writings.md": {
  id: "2007-07-09-some-of-my-writings.md",
  slug: "2007-07-09-some-of-my-writings",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-15-professional-javascript-2nd-edition-feedback-wanted.md": {
  id: "2007-07-15-professional-javascript-2nd-edition-feedback-wanted.md",
  slug: "2007-07-15-professional-javascript-2nd-edition-feedback-wanted",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-31-my-first-yui-release.md": {
  id: "2007-07-31-my-first-yui-release.md",
  slug: "2007-07-31-my-first-yui-release",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-07-31-the-state-of-web-syndication.md": {
  id: "2007-07-31-the-state-of-web-syndication.md",
  slug: "2007-07-31-the-state-of-web-syndication",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-15-what-makes-a-good-front-end-engineer.md": {
  id: "2007-08-15-what-makes-a-good-front-end-engineer.md",
  slug: "2007-08-15-what-makes-a-good-front-end-engineer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-17-my-yahoo-over-igoogle.md": {
  id: "2007-08-17-my-yahoo-over-igoogle.md",
  slug: "2007-08-17-my-yahoo-over-igoogle",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-21-internet-problem-the-dating-site-dilemma.md": {
  id: "2007-08-21-internet-problem-the-dating-site-dilemma.md",
  slug: "2007-08-21-internet-problem-the-dating-site-dilemma",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-24-come-see-me-speak.md": {
  id: "2007-08-24-come-see-me-speak.md",
  slug: "2007-08-24-come-see-me-speak",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-26-are-local-variables-faster.md": {
  id: "2007-08-26-are-local-variables-faster.md",
  slug: "2007-08-26-are-local-variables-faster",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-27-are-local-variables-faster-part-2.md": {
  id: "2007-08-27-are-local-variables-faster-part-2.md",
  slug: "2007-08-27-are-local-variables-faster-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-08-29-rwe-personal-scavenger-hunt.md": {
  id: "2007-08-29-rwe-personal-scavenger-hunt.md",
  slug: "2007-08-29-rwe-personal-scavenger-hunt",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-04-internet-problem-building-a-better-search-engine.md": {
  id: "2007-09-04-internet-problem-building-a-better-search-engine.md",
  slug: "2007-09-04-internet-problem-building-a-better-search-engine",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-07-rwe-2007-day-2.md": {
  id: "2007-09-07-rwe-2007-day-2.md",
  slug: "2007-09-07-rwe-2007-day-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-07-why-i-don-t-like-the-google-web-toolkit.md": {
  id: "2007-09-07-why-i-don-t-like-the-google-web-toolkit.md",
  slug: "2007-09-07-why-i-don-t-like-the-google-web-toolkit",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-08-rwe-2007-all-done.md": {
  id: "2007-09-08-rwe-2007-all-done.md",
  slug: "2007-09-08-rwe-2007-all-done",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-09-inconsistent-array-literals.md": {
  id: "2007-09-09-inconsistent-array-literals.md",
  slug: "2007-09-09-inconsistent-array-literals",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-13-keep-json-out-of-javascript.md": {
  id: "2007-09-13-keep-json-out-of-javascript.md",
  slug: "2007-09-13-keep-json-out-of-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-09-20-internet-problem-generic-social-networking-is-dead.md": {
  id: "2007-09-20-internet-problem-generic-social-networking-is-dead.md",
  slug: "2007-09-20-internet-problem-generic-social-networking-is-dead",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-10-04-good-object-oriented-design-in-javascript.md": {
  id: "2007-10-04-good-object-oriented-design-in-javascript.md",
  slug: "2007-10-04-good-object-oriented-design-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-10-08-css-sucks.md": {
  id: "2007-10-08-css-sucks.md",
  slug: "2007-10-08-css-sucks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-10-20-the-way-javascript-is-handled-a-call-to-action.md": {
  id: "2007-10-20-the-way-javascript-is-handled-a-call-to-action.md",
  slug: "2007-10-20-the-way-javascript-is-handled-a-call-to-action",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-10-23-learning-something-new-about-css-and-ie6.md": {
  id: "2007-10-23-learning-something-new-about-css-and-ie6.md",
  slug: "2007-10-23-learning-something-new-about-css-and-ie6",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-10-28-why-weren-t-you-at-the-ajax-experience.md": {
  id: "2007-10-28-why-weren-t-you-at-the-ajax-experience.md",
  slug: "2007-10-28-why-weren-t-you-at-the-ajax-experience",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-10-31-ecmascript-4-i-hate-it.md": {
  id: "2007-10-31-ecmascript-4-i-hate-it.md",
  slug: "2007-10-31-ecmascript-4-i-hate-it",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-01-my-first-pipe-earthquakes-in-northern-california.md": {
  id: "2007-11-01-my-first-pipe-earthquakes-in-northern-california.md",
  slug: "2007-11-01-my-first-pipe-earthquakes-in-northern-california",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-04-gmail-faster-better.md": {
  id: "2007-11-04-gmail-faster-better.md",
  slug: "2007-11-04-gmail-faster-better",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-05-the-rise-of-bebo-nation.md": {
  id: "2007-11-05-the-rise-of-bebo-nation.md",
  slug: "2007-11-05-the-rise-of-bebo-nation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-14-a-plea-to-browser-vendors.md": {
  id: "2007-11-14-a-plea-to-browser-vendors.md",
  slug: "2007-11-14-a-plea-to-browser-vendors",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-19-javascript-variable-scoping-trickery.md": {
  id: "2007-11-19-javascript-variable-scoping-trickery.md",
  slug: "2007-11-19-javascript-variable-scoping-trickery",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-28-announcing-the-yahoo-juku.md": {
  id: "2007-11-28-announcing-the-yahoo-juku.md",
  slug: "2007-11-28-announcing-the-yahoo-juku",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-28-browsers-too-leniant-with-regular-expressions.md": {
  id: "2007-11-28-browsers-too-leniant-with-regular-expressions.md",
  slug: "2007-11-28-browsers-too-leniant-with-regular-expressions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-11-30-the-throttle-function.md": {
  id: "2007-11-30-the-throttle-function.md",
  slug: "2007-11-30-the-throttle-function",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-04-yui-2-4-0-has-been-released.md": {
  id: "2007-12-04-yui-2-4-0-has-been-released.md",
  slug: "2007-12-04-yui-2-4-0-has-been-released",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-06-what-i-d-like-to-see-in-html-5.md": {
  id: "2007-12-06-what-i-d-like-to-see-in-html-5.md",
  slug: "2007-12-06-what-i-d-like-to-see-in-html-5",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-13-ie-com-reers-its-ugly-head.md": {
  id: "2007-12-13-ie-com-reers-its-ugly-head.md",
  slug: "2007-12-13-ie-com-reers-its-ugly-head",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-17-don-t-forget-navigator-platform.md": {
  id: "2007-12-17-don-t-forget-navigator-platform.md",
  slug: "2007-12-17-don-t-forget-navigator-platform",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-18-internet-explorer-8-user-agent.md": {
  id: "2007-12-18-internet-explorer-8-user-agent.md",
  slug: "2007-12-18-internet-explorer-8-user-agent",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-23-ie8-passes-acid-test-what-does-it-mean.md": {
  id: "2007-12-23-ie8-passes-acid-test-what-does-it-mean.md",
  slug: "2007-12-23-ie8-passes-acid-test-what-does-it-mean",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2007-12-31-site-usability-what-not-to-do.md": {
  id: "2007-12-31-site-usability-what-not-to-do.md",
  slug: "2007-12-31-site-usability-what-not-to-do",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-01-09-is-json-better-than-xml.md": {
  id: "2008-01-09-is-json-better-than-xml.md",
  slug: "2008-01-09-is-json-better-than-xml",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-01-13-getelementsbyclassname-weirdness.md": {
  id: "2008-01-13-getelementsbyclassname-weirdness.md",
  slug: "2008-01-13-getelementsbyclassname-weirdness",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-01-15-introducing-jsonlib.md": {
  id: "2008-01-15-introducing-jsonlib.md",
  slug: "2008-01-15-introducing-jsonlib",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-01-22-the-future-of-ie-and-the-web.md": {
  id: "2008-01-22-the-future-of-ie-and-the-web.md",
  slug: "2008-01-22-the-future-of-ie-and-the-web",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-01-27-book-pre-release-reviewers-wanted.md": {
  id: "2008-01-27-book-pre-release-reviewers-wanted.md",
  slug: "2008-01-27-book-pre-release-reviewers-wanted",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-01-microsoft-to-buy-yahoo.md": {
  id: "2008-02-01-microsoft-to-buy-yahoo.md",
  slug: "2008-02-01-microsoft-to-buy-yahoo",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-03-getting-element-dimensions.md": {
  id: "2008-02-03-getting-element-dimensions.md",
  slug: "2008-02-03-getting-element-dimensions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-04-getting-element-dimensions-a-follow-up.md": {
  id: "2008-02-04-getting-element-dimensions-a-follow-up.md",
  slug: "2008-02-04-getting-element-dimensions-a-follow-up",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-06-torn-between-two-lovers.md": {
  id: "2008-02-06-torn-between-two-lovers.md",
  slug: "2008-02-06-torn-between-two-lovers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-07-how-to-markup-blog-comments.md": {
  id: "2008-02-07-how-to-markup-blog-comments.md",
  slug: "2008-02-07-how-to-markup-blog-comments",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-09-can-text-nodes-receive-events.md": {
  id: "2008-02-09-can-text-nodes-receive-events.md",
  slug: "2008-02-09-can-text-nodes-receive-events",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-09-pc-magazine-my-yahoo-given-4-5.md": {
  id: "2008-02-09-pc-magazine-my-yahoo-given-4-5.md",
  slug: "2008-02-09-pc-magazine-my-yahoo-given-4-5",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-10-new-site-feeds-please-update.md": {
  id: "2008-02-10-new-site-feeds-please-update.md",
  slug: "2008-02-10-new-site-feeds-please-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-12-the-mysterious-wii-remote-javascript-api.md": {
  id: "2008-02-12-the-mysterious-wii-remote-javascript-api.md",
  slug: "2008-02-12-the-mysterious-wii-remote-javascript-api",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-14-learning-to-program.md": {
  id: "2008-02-14-learning-to-program.md",
  slug: "2008-02-14-learning-to-program",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-16-more-opera-weirdness.md": {
  id: "2008-02-16-more-opera-weirdness.md",
  slug: "2008-02-16-more-opera-weirdness",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-20-top-javascript-books-of-all-time.md": {
  id: "2008-02-20-top-javascript-books-of-all-time.md",
  slug: "2008-02-20-top-javascript-books-of-all-time",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-20-yui-2-5-0-yui-test-reaches-ga-and-more.md": {
  id: "2008-02-20-yui-2-5-0-yui-test-reaches-ga-and-more.md",
  slug: "2008-02-20-yui-2-5-0-yui-test-reaches-ga-and-more",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-21-writing-for-how-people-read.md": {
  id: "2008-02-21-writing-for-how-people-read.md",
  slug: "2008-02-21-writing-for-how-people-read",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-24-book-review-pro-javascript-design-patterns.md": {
  id: "2008-02-24-book-review-pro-javascript-design-patterns.md",
  slug: "2008-02-24-book-review-pro-javascript-design-patterns",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-02-28-thoughts-on-html-5.md": {
  id: "2008-02-28-thoughts-on-html-5.md",
  slug: "2008-02-28-thoughts-on-html-5",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-03-big-day-for-the-web.md": {
  id: "2008-03-03-big-day-for-the-web.md",
  slug: "2008-03-03-big-day-for-the-web",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-03-does-safari-s-clipboarddata-actually-work.md": {
  id: "2008-03-03-does-safari-s-clipboarddata-actually-work.md",
  slug: "2008-03-03-does-safari-s-clipboarddata-actually-work",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-09-ie8-goodies-and-baddies.md": {
  id: "2008-03-09-ie8-goodies-and-baddies.md",
  slug: "2008-03-09-ie8-goodies-and-baddies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-17-the-dreaded-operation-aborted-error.md": {
  id: "2008-03-17-the-dreaded-operation-aborted-error.md",
  slug: "2008-03-17-the-dreaded-operation-aborted-error",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-19-yui-2-5-1-released-including-cookie-fix.md": {
  id: "2008-03-19-yui-2-5-1-released-including-cookie-fix.md",
  slug: "2008-03-19-yui-2-5-1-released-including-cookie-fix",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-21-the-great-safari-keypress-debacle.md": {
  id: "2008-03-21-the-great-safari-keypress-debacle.md",
  slug: "2008-03-21-the-great-safari-keypress-debacle",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-22-big-company-or-small-company.md": {
  id: "2008-03-22-big-company-or-small-company.md",
  slug: "2008-03-22-big-company-or-small-company",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-22-changes-in-safari-3-1-for-windows.md": {
  id: "2008-03-22-changes-in-safari-3-1-for-windows.md",
  slug: "2008-03-22-changes-in-safari-3-1-for-windows",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-22-falling-in-love-with-the-ie8-javascript-debugger.md": {
  id: "2008-03-22-falling-in-love-with-the-ie8-javascript-debugger.md",
  slug: "2008-03-22-falling-in-love-with-the-ie8-javascript-debugger",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-03-31-the-web-could-be-heading-for-another-dark-age.md": {
  id: "2008-03-31-the-web-could-be-heading-for-another-dark-age.md",
  slug: "2008-03-31-the-web-could-be-heading-for-another-dark-age",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-04-05-all-sizzle-and-no-substance.md": {
  id: "2008-04-05-all-sizzle-and-no-substance.md",
  slug: "2008-04-05-all-sizzle-and-no-substance",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-04-06-the-story-of-professional-javascript.md": {
  id: "2008-04-06-the-story-of-professional-javascript.md",
  slug: "2008-04-06-the-story-of-professional-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-04-20-get-the-javascript-global.md": {
  id: "2008-04-20-get-the-javascript-global.md",
  slug: "2008-04-20-get-the-javascript-global",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-04-22-wanted-browser-debug-mode.md": {
  id: "2008-04-22-wanted-browser-debug-mode.md",
  slug: "2008-04-22-wanted-browser-debug-mode",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-04-23-compress-context-menu-item-for-windows-xp.md": {
  id: "2008-04-23-compress-context-menu-item-for-windows-xp.md",
  slug: "2008-04-23-compress-context-menu-item-for-windows-xp",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-04-27-cross-domain-xhr-removed-from-firefox-3.md": {
  id: "2008-04-27-cross-domain-xhr-removed-from-firefox-3.md",
  slug: "2008-04-27-cross-domain-xhr-removed-from-firefox-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-05-17-browser-cookie-restrictions.md": {
  id: "2008-05-17-browser-cookie-restrictions.md",
  slug: "2008-05-17-browser-cookie-restrictions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-05-18-and-so-the-html-5-trouble-begins.md": {
  id: "2008-05-18-and-so-the-html-5-trouble-begins.md",
  slug: "2008-05-18-and-so-the-html-5-trouble-begins",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-06-08-congratulations-jackie-and-denis.md": {
  id: "2008-06-08-congratulations-jackie-and-denis.md",
  slug: "2008-06-08-congratulations-jackie-and-denis",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-06-25-teaching-the-children.md": {
  id: "2008-06-25-teaching-the-children.md",
  slug: "2008-06-25-teaching-the-children",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-07-04-what-to-do-with-your-money.md": {
  id: "2008-07-04-what-to-do-with-your-money.md",
  slug: "2008-07-04-what-to-do-with-your-money",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-07-05-mentioned-in-microsoft-whitepaper.md": {
  id: "2008-07-05-mentioned-in-microsoft-whitepaper.md",
  slug: "2008-07-05-mentioned-in-microsoft-whitepaper",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-07-10-naked-javascript-objects.md": {
  id: "2008-07-10-naked-javascript-objects.md",
  slug: "2008-07-10-naked-javascript-objects",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-07-23-speaking-schedule.md": {
  id: "2008-07-23-speaking-schedule.md",
  slug: "2008-07-23-speaking-schedule",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-08-19-ecmascript-is-dead-long-live-ecmascript.md": {
  id: "2008-08-19-ecmascript-is-dead-long-live-ecmascript.md",
  slug: "2008-08-19-ecmascript-is-dead-long-live-ecmascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-03-blog-finally-updated.md": {
  id: "2008-09-03-blog-finally-updated.md",
  slug: "2008-09-03-blog-finally-updated",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-06-chrome-tames-wild-dialogs-and-popups.md": {
  id: "2008-09-06-chrome-tames-wild-dialogs-and-popups.md",
  slug: "2008-09-06-chrome-tames-wild-dialogs-and-popups",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-07-inside-ie-8s-mutable-dom-prototypes.md": {
  id: "2008-09-07-inside-ie-8s-mutable-dom-prototypes.md",
  slug: "2008-09-07-inside-ie-8s-mutable-dom-prototypes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-18-new-yahoo-front-page-goes-into-testing.md": {
  id: "2008-09-18-new-yahoo-front-page-goes-into-testing.md",
  slug: "2008-09-18-new-yahoo-front-page-goes-into-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-29-ajax-experience-day-0.md": {
  id: "2008-09-29-ajax-experience-day-0.md",
  slug: "2008-09-29-ajax-experience-day-0",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-30-ajax-experience-day-1.md": {
  id: "2008-09-30-ajax-experience-day-1.md",
  slug: "2008-09-30-ajax-experience-day-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-09-30-ajax-experience-day-2.md": {
  id: "2008-09-30-ajax-experience-day-2.md",
  slug: "2008-09-30-ajax-experience-day-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-01-ajax-experience-day-3.md": {
  id: "2008-10-01-ajax-experience-day-3.md",
  slug: "2008-10-01-ajax-experience-day-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-02-yui-260-released.md": {
  id: "2008-10-02-yui-260-released.md",
  slug: "2008-10-02-yui-260-released",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-05-ajax-experience-the-aftermath.md": {
  id: "2008-10-05-ajax-experience-the-aftermath.md",
  slug: "2008-10-05-ajax-experience-the-aftermath",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-25-the-ie6-support-problem.md": {
  id: "2008-10-25-the-ie6-support-problem.md",
  slug: "2008-10-25-the-ie6-support-problem",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-27-facebook-the-transparent-society.md": {
  id: "2008-10-27-facebook-the-transparent-society.md",
  slug: "2008-10-27-facebook-the-transparent-society",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-28-why-software-engineers-fail.md": {
  id: "2008-10-28-why-software-engineers-fail.md",
  slug: "2008-10-28-why-software-engineers-fail",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-10-31-book-review-the-world-is-flat.md": {
  id: "2008-10-31-book-review-the-world-is-flat.md",
  slug: "2008-10-31-book-review-the-world-is-flat",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-09-ecmascript-31-static-object-methods-prototype.md": {
  id: "2008-11-09-ecmascript-31-static-object-methods-prototype.md",
  slug: "2008-11-09-ecmascript-31-static-object-methods-prototype",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-09-what-happened-to-firebug.md": {
  id: "2008-11-09-what-happened-to-firebug.md",
  slug: "2008-11-09-what-happened-to-firebug",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-10-the-yui-test-world-tour.md": {
  id: "2008-11-10-the-yui-test-world-tour.md",
  slug: "2008-11-10-the-yui-test-world-tour",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-11-professional-javascript-2nd-edition-available-for-pre-order.md": {
  id: "2008-11-11-professional-javascript-2nd-edition-available-for-pre-order.md",
  slug: "2008-11-11-professional-javascript-2nd-edition-available-for-pre-order",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-12-front-page-and-yui-3-causes-a-stir.md": {
  id: "2008-11-12-front-page-and-yui-3-causes-a-stir.md",
  slug: "2008-11-12-front-page-and-yui-3-causes-a-stir",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-22-speaking-at-sf-javascript-meetup.md": {
  id: "2008-11-22-speaking-at-sf-javascript-meetup.md",
  slug: "2008-11-22-speaking-at-sf-javascript-meetup",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-23-books-about-social-interaction.md": {
  id: "2008-11-23-books-about-social-interaction.md",
  slug: "2008-11-23-books-about-social-interaction",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-26-now-on-twitter.md": {
  id: "2008-11-26-now-on-twitter.md",
  slug: "2008-11-26-now-on-twitter",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-11-28-what-are-web-standards.md": {
  id: "2008-11-28-what-are-web-standards.md",
  slug: "2008-11-28-what-are-web-standards",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-12-03-redesign-my-site-contest.md": {
  id: "2008-12-03-redesign-my-site-contest.md",
  slug: "2008-12-03-redesign-my-site-contest",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-12-04-javascript-block-level-variables.md": {
  id: "2008-12-04-javascript-block-level-variables.md",
  slug: "2008-12-04-javascript-block-level-variables",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-12-19-fireunit-extension-for-yui-test.md": {
  id: "2008-12-19-fireunit-extension-for-yui-test.md",
  slug: "2008-12-19-fireunit-extension-for-yui-test",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2008-12-31-now-available-professional-javascript-second-edition.md": {
  id: "2008-12-31-now-available-professional-javascript-second-edition.md",
  slug: "2008-12-31-now-available-professional-javascript-second-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-01-05-what-determines-that-a-script-is-long-running.md": {
  id: "2009-01-05-what-determines-that-a-script-is-long-running.md",
  slug: "2009-01-05-what-determines-that-a-script-is-long-running",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-01-13-speed-up-your-javascript-part-1.md": {
  id: "2009-01-13-speed-up-your-javascript-part-1.md",
  slug: "2009-01-13-speed-up-your-javascript-part-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-01-16-the-yui-3-revolution.md": {
  id: "2009-01-16-the-yui-3-revolution.md",
  slug: "2009-01-16-the-yui-3-revolution",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-01-18-free-excerpt-for-professional-javascript-second-edition.md": {
  id: "2009-01-18-free-excerpt-for-professional-javascript-second-edition.md",
  slug: "2009-01-18-free-excerpt-for-professional-javascript-second-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-01-20-speed-up-your-javascript-part-2.md": {
  id: "2009-01-20-speed-up-your-javascript-part-2.md",
  slug: "2009-01-20-speed-up-your-javascript-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-01-27-speed-up-your-javascript-part-3.md": {
  id: "2009-01-27-speed-up-your-javascript-part-3.md",
  slug: "2009-01-27-speed-up-your-javascript-part-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-03-speed-up-your-javascript-part-4.md": {
  id: "2009-02-03-speed-up-your-javascript-part-4.md",
  slug: "2009-02-03-speed-up-your-javascript-part-4",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-08-new-site-design.md": {
  id: "2009-02-08-new-site-design.md",
  slug: "2009-02-08-new-site-design",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-10-javascript-variable-performance.md": {
  id: "2009-02-10-javascript-variable-performance.md",
  slug: "2009-02-10-javascript-variable-performance",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-15-book-review-learning-dojo.md": {
  id: "2009-02-15-book-review-learning-dojo.md",
  slug: "2009-02-15-book-review-learning-dojo",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-17-mozilla-javascript-extension-nosuchmethod.md": {
  id: "2009-02-17-mozilla-javascript-extension-nosuchmethod.md",
  slug: "2009-02-17-mozilla-javascript-extension-nosuchmethod",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-22-book-review-learning-ext-js.md": {
  id: "2009-02-22-book-review-learning-ext-js.md",
  slug: "2009-02-22-book-review-learning-ext-js",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-02-24-mozilla-javascript-extension-count.md": {
  id: "2009-02-24-mozilla-javascript-extension-count.md",
  slug: "2009-02-24-mozilla-javascript-extension-count",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-01-book-review-the-art-of-war.md": {
  id: "2009-03-01-book-review-the-art-of-war.md",
  slug: "2009-03-01-book-review-the-art-of-war",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-03-the-art-of-throwing-javascript-errors.md": {
  id: "2009-03-03-the-art-of-throwing-javascript-errors.md",
  slug: "2009-03-03-the-art-of-throwing-javascript-errors",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-07-first-review-of-professional-javascript-2nd-edition.md": {
  id: "2009-03-07-first-review-of-professional-javascript-2nd-edition.md",
  slug: "2009-03-07-first-review-of-professional-javascript-2nd-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-10-the-art-of-throwing-javascript-errors-part-2.md": {
  id: "2009-03-10-the-art-of-throwing-javascript-errors-part-2.md",
  slug: "2009-03-10-the-art-of-throwing-javascript-errors-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-17-xpath-in-javascript-part-1.md": {
  id: "2009-03-17-xpath-in-javascript-part-1.md",
  slug: "2009-03-17-xpath-in-javascript-part-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-24-xpath-in-javascript-part-2.md": {
  id: "2009-03-24-xpath-in-javascript-part-2.md",
  slug: "2009-03-24-xpath-in-javascript-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-28-announcing-even-faster-web-sites.md": {
  id: "2009-03-28-announcing-even-faster-web-sites.md",
  slug: "2009-03-28-announcing-even-faster-web-sites",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-03-31-whos-tweeting-about-you.md": {
  id: "2009-03-31-whos-tweeting-about-you.md",
  slug: "2009-03-31-whos-tweeting-about-you",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-04-04-xpath-in-javascript-part-3.md": {
  id: "2009-04-04-xpath-in-javascript-part-3.md",
  slug: "2009-04-04-xpath-in-javascript-part-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-04-13-computer-science-in-javascript-linked-list.md": {
  id: "2009-04-13-computer-science-in-javascript-linked-list.md",
  slug: "2009-04-13-computer-science-in-javascript-linked-list",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-04-21-computer-science-in-javascript-doubly-linked-lists.md": {
  id: "2009-04-21-computer-science-in-javascript-doubly-linked-lists.md",
  slug: "2009-04-21-computer-science-in-javascript-doubly-linked-lists",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-04-28-javascript-error-handling-anti-pattern.md": {
  id: "2009-04-28-javascript-error-handling-anti-pattern.md",
  slug: "2009-04-28-javascript-error-handling-anti-pattern",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-04-29-book-review-nonviolent-communication.md": {
  id: "2009-04-29-book-review-nonviolent-communication.md",
  slug: "2009-04-29-book-review-nonviolent-communication",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-05-05-http-cookies-explained.md": {
  id: "2009-05-05-http-cookies-explained.md",
  slug: "2009-05-05-http-cookies-explained",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-05-12-cookies-and-security.md": {
  id: "2009-05-12-cookies-and-security.md",
  slug: "2009-05-12-cookies-and-security",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-05-19-javascript-stack-overflow-error.md": {
  id: "2009-05-19-javascript-stack-overflow-error.md",
  slug: "2009-05-19-javascript-stack-overflow-error",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-05-26-computer-science-in-javascript-bubble-sort.md": {
  id: "2009-05-26-computer-science-in-javascript-bubble-sort.md",
  slug: "2009-05-26-computer-science-in-javascript-bubble-sort",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-05-31-book-review-learning-jquery-13.md": {
  id: "2009-05-31-book-review-learning-jquery-13.md",
  slug: "2009-05-31-book-review-learning-jquery-13",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-06-02-detecting-if-the-user-is-idle-with-javascript-and-yui-3.md": {
  id: "2009-06-02-detecting-if-the-user-is-idle-with-javascript-and-yui-3.md",
  slug: "2009-06-02-detecting-if-the-user-is-idle-with-javascript-and-yui-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-06-05-speed-up-your-javascript-the-talk.md": {
  id: "2009-06-05-speed-up-your-javascript-the-talk.md",
  slug: "2009-06-05-speed-up-your-javascript-the-talk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-06-09-computer-science-in-javascript-binary-search-tree-part-1.md": {
  id: "2009-06-09-computer-science-in-javascript-binary-search-tree-part-1.md",
  slug: "2009-06-09-computer-science-in-javascript-binary-search-tree-part-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-06-16-computer-science-in-javascript-binary-search-tree-part-2.md": {
  id: "2009-06-16-computer-science-in-javascript-binary-search-tree-part-2.md",
  slug: "2009-06-16-computer-science-in-javascript-binary-search-tree-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-06-23-loading-javascript-without-blocking.md": {
  id: "2009-06-23-loading-javascript-without-blocking.md",
  slug: "2009-06-23-loading-javascript-without-blocking",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-06-30-event-delegation-in-javascript.md": {
  id: "2009-06-30-event-delegation-in-javascript.md",
  slug: "2009-06-30-event-delegation-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-07-07-javascript-minification-compression-and-performance.md": {
  id: "2009-07-07-javascript-minification-compression-and-performance.md",
  slug: "2009-07-07-javascript-minification-compression-and-performance",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-07-09-firefox-35firebug-xmlhttprequest-and-readystatechange-bug.md": {
  id: "2009-07-09-firefox-35firebug-xmlhttprequest-and-readystatechange-bug.md",
  slug: "2009-07-09-firefox-35firebug-xmlhttprequest-and-readystatechange-bug",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-07-14-common-debugging-mistakes.md": {
  id: "2009-07-14-common-debugging-mistakes.md",
  slug: "2009-07-14-common-debugging-mistakes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-07-21-introduction-to-sessionstorage.md": {
  id: "2009-07-21-introduction-to-sessionstorage.md",
  slug: "2009-07-21-introduction-to-sessionstorage",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-07-23-safari-doesnt-properly-display-one-bit-favicons.md": {
  id: "2009-07-23-safari-doesnt-properly-display-one-bit-favicons.md",
  slug: "2009-07-23-safari-doesnt-properly-display-one-bit-favicons",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-07-28-the-best-way-to-load-external-javascript.md": {
  id: "2009-07-28-the-best-way-to-load-external-javascript.md",
  slug: "2009-07-28-the-best-way-to-load-external-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-08-04-computer-science-in-javascript-credit-card-number-validation.md": {
  id: "2009-08-04-computer-science-in-javascript-credit-card-number-validation.md",
  slug: "2009-08-04-computer-science-in-javascript-credit-card-number-validation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-08-11-timed-array-processing-in-javascript.md": {
  id: "2009-08-11-timed-array-processing-in-javascript.md",
  slug: "2009-08-11-timed-array-processing-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-08-18-experimenting-with-web-workers.md": {
  id: "2009-08-18-experimenting-with-web-workers.md",
  slug: "2009-08-18-experimenting-with-web-workers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-08-21-what-makes-a-great-software-engineer.md": {
  id: "2009-08-21-what-makes-a-great-software-engineer.md",
  slug: "2009-08-21-what-makes-a-great-software-engineer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-08-25-web-workers-errors-and-debugging.md": {
  id: "2009-08-25-web-workers-errors-and-debugging.md",
  slug: "2009-08-25-web-workers-errors-and-debugging",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-09-01-computer-science-in-javascript-binary-search.md": {
  id: "2009-09-01-computer-science-in-javascript-binary-search.md",
  slug: "2009-09-01-computer-science-in-javascript-binary-search",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-09-08-computer-science-in-javascript-selection-sort.md": {
  id: "2009-09-08-computer-science-in-javascript-selection-sort.md",
  slug: "2009-09-08-computer-science-in-javascript-selection-sort",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-09-15-iframes-onload-and-documentdomain.md": {
  id: "2009-09-15-iframes-onload-and-documentdomain.md",
  slug: "2009-09-15-iframes-onload-and-documentdomain",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-09-22-introducing-combiner-a-javascriptcss-concatenation-tool.md": {
  id: "2009-09-22-introducing-combiner-a-javascriptcss-concatenation-tool.md",
  slug: "2009-09-22-introducing-combiner-a-javascriptcss-concatenation-tool",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-09-24-moving-the-web-forward.md": {
  id: "2009-09-24-moving-the-web-forward.md",
  slug: "2009-09-24-moving-the-web-forward",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-09-29-web-definitions-dom-ajax-and-more.md": {
  id: "2009-09-29-web-definitions-dom-ajax-and-more.md",
  slug: "2009-09-29-web-definitions-dom-ajax-and-more",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-10-06-domain-sharding-for-all.md": {
  id: "2009-10-06-domain-sharding-for-all.md",
  slug: "2009-10-06-domain-sharding-for-all",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-10-13-fireunit-now-with-grouping.md": {
  id: "2009-10-13-fireunit-now-with-grouping.md",
  slug: "2009-10-13-fireunit-now-with-grouping",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-10-20-javascript-sleuthing-buggy-native-json.md": {
  id: "2009-10-20-javascript-sleuthing-buggy-native-json.md",
  slug: "2009-10-20-javascript-sleuthing-buggy-native-json",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-10-25-book-review-jquery-ui-16.md": {
  id: "2009-10-25-book-review-jquery-ui-16.md",
  slug: "2009-10-25-book-review-jquery-ui-16",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-10-27-data-uris-explained.md": {
  id: "2009-10-27-data-uris-explained.md",
  slug: "2009-10-27-data-uris-explained",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-10-28-yui-3-idletimer-now-available-on-yui-gallery.md": {
  id: "2009-10-28-yui-3-idletimer-now-available-on-yui-gallery.md",
  slug: "2009-10-28-yui-3-idletimer-now-available-on-yui-gallery",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-11-03-automatic-data-uri-embedding-in-css-files.md": {
  id: "2009-11-03-automatic-data-uri-embedding-in-css-files.md",
  slug: "2009-11-03-automatic-data-uri-embedding-in-css-files",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-11-10-introduction-to-web-accessibility.md": {
  id: "2009-11-10-introduction-to-web-accessibility.md",
  slug: "2009-11-10-introduction-to-web-accessibility",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-11-17-the-curious-case-of-javascript-unit-testing.md": {
  id: "2009-11-17-the-curious-case-of-javascript-unit-testing.md",
  slug: "2009-11-17-the-curious-case-of-javascript-unit-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-11-24-what-makes-a-good-browser-api.md": {
  id: "2009-11-24-what-makes-a-good-browser-api.md",
  slug: "2009-11-24-what-makes-a-good-browser-api",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-11-30-empty-image-src-can-destroy-your-site.md": {
  id: "2009-11-30-empty-image-src-can-destroy-your-site.md",
  slug: "2009-11-30-empty-image-src-can-destroy-your-site",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-12-08-computer-science-in-javascript-base64-encoding.md": {
  id: "2009-12-08-computer-science-in-javascript-base64-encoding.md",
  slug: "2009-12-08-computer-science-in-javascript-base64-encoding",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-12-15-writing-maintainable-code.md": {
  id: "2009-12-15-writing-maintainable-code.md",
  slug: "2009-12-15-writing-maintainable-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-12-22-protect-ie-from-empty-img-src.md": {
  id: "2009-12-22-protect-ie-from-empty-img-src.md",
  slug: "2009-12-22-protect-ie-from-empty-img-src",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2009-12-29-feature-detection-is-not-browser-detection.md": {
  id: "2009-12-29-feature-detection-is-not-browser-detection.md",
  slug: "2009-12-29-feature-detection-is-not-browser-detection",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-01-05-interviewing-the-front-end-engineer.md": {
  id: "2010-01-05-interviewing-the-front-end-engineer.md",
  slug: "2010-01-05-interviewing-the-front-end-engineer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-01-12-history-of-the-user-agent-string.md": {
  id: "2010-01-12-history-of-the-user-agent-string.md",
  slug: "2010-01-12-history-of-the-user-agent-string",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-01-19-internet-explorer-8-document-and-browser-modes.md": {
  id: "2010-01-19-internet-explorer-8-document-and-browser-modes.md",
  slug: "2010-01-19-internet-explorer-8-document-and-browser-modes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-01-26-answering-baranovskiys-javascript-quiz.md": {
  id: "2010-01-26-answering-baranovskiys-javascript-quiz.md",
  slug: "2010-01-26-answering-baranovskiys-javascript-quiz",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-02-02-how-internet-explorer-8-document-mode-affects-javascript.md": {
  id: "2010-02-02-how-internet-explorer-8-document-mode-affects-javascript.md",
  slug: "2010-02-02-how-internet-explorer-8-document-mode-affects-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-02-09-announcing-high-performance-javascript.md": {
  id: "2010-02-09-announcing-high-performance-javascript.md",
  slug: "2010-02-09-announcing-high-performance-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-02-16-my-javascript-quiz.md": {
  id: "2010-02-16-my-javascript-quiz.md",
  slug: "2010-02-16-my-javascript-quiz",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-02-18-my-javascript-quiz-answers.md": {
  id: "2010-02-18-my-javascript-quiz-answers.md",
  slug: "2010-02-18-my-javascript-quiz-answers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-02-23-answering-soshnikovs-quiz.md": {
  id: "2010-02-23-answering-soshnikovs-quiz.md",
  slug: "2010-02-23-answering-soshnikovs-quiz",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-03-02-maintainable-javascript-dont-modify-objects-you-down-own.md": {
  id: "2010-03-02-maintainable-javascript-dont-modify-objects-you-down-own.md",
  slug: "2010-03-02-maintainable-javascript-dont-modify-objects-you-down-own",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-03-09-custom-events-in-javascript.md": {
  id: "2010-03-09-custom-events-in-javascript.md",
  slug: "2010-03-09-custom-events-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-03-16-empty-string-urls-in-html-a-followup.md": {
  id: "2010-03-16-empty-string-urls-in-html-a-followup.md",
  slug: "2010-03-16-empty-string-urls-in-html-a-followup",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-03-30-csun-conference-2010.md": {
  id: "2010-03-30-csun-conference-2010.md",
  slug: "2010-03-30-csun-conference-2010",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-04-06-ipad-web-development-tips.md": {
  id: "2010-04-06-ipad-web-development-tips.md",
  slug: "2010-04-06-ipad-web-development-tips",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-04-13-towards-more-secure-client-side-data-storage.md": {
  id: "2010-04-13-towards-more-secure-client-side-data-storage.md",
  slug: "2010-04-13-towards-more-secure-client-side-data-storage",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-05-11-the-basics-of-web-advertisement-tracking.md": {
  id: "2010-05-11-the-basics-of-web-advertisement-tracking.md",
  slug: "2010-05-11-the-basics-of-web-advertisement-tracking",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-05-17-understanding-ie8s-site-compatibility-view-list.md": {
  id: "2010-05-17-understanding-ie8s-site-compatibility-view-list.md",
  slug: "2010-05-17-understanding-ie8s-site-compatibility-view-list",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-05-25-cross-domain-ajax-with-cross-origin-resource-sharing.md": {
  id: "2010-05-25-cross-domain-ajax-with-cross-origin-resource-sharing.md",
  slug: "2010-05-25-cross-domain-ajax-with-cross-origin-resource-sharing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-07-06-data-uris-make-css-sprites-obsolete.md": {
  id: "2010-07-06-data-uris-make-css-sprites-obsolete.md",
  slug: "2010-07-06-data-uris-make-css-sprites-obsolete",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-07-13-empty-string-urls-browser-update.md": {
  id: "2010-07-13-empty-string-urls-browser-update.md",
  slug: "2010-07-13-empty-string-urls-browser-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-07-27-determining-if-an-object-property-exists.md": {
  id: "2010-07-27-determining-if-an-object-property-exists.md",
  slug: "2010-07-27-determining-if-an-object-property-exists",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-08-03-working-with-bidirectional-bidi-text-and-rtl-languages-on-the-web.md": {
  id: "2010-08-03-working-with-bidirectional-bidi-text-and-rtl-languages-on-the-web.md",
  slug: "2010-08-03-working-with-bidirectional-bidi-text-and-rtl-languages-on-the-web",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-08-10-what-is-a-non-blocking-script.md": {
  id: "2010-08-10-what-is-a-non-blocking-script.md",
  slug: "2010-08-10-what-is-a-non-blocking-script",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-08-17-the-value-of-html-validation.md": {
  id: "2010-08-17-the-value-of-html-validation.md",
  slug: "2010-08-17-the-value-of-html-validation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-09-07-learning-from-xauth-cross-domain-localstorage.md": {
  id: "2010-09-07-learning-from-xauth-cross-domain-localstorage.md",
  slug: "2010-09-07-learning-from-xauth-cross-domain-localstorage",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-09-10-upcoming-talks.md": {
  id: "2010-09-10-upcoming-talks.md",
  slug: "2010-09-10-upcoming-talks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-09-28-why-is-getelementsbytagname-faster-that-queryselectorall.md": {
  id: "2010-09-28-why-is-getelementsbytagname-faster-that-queryselectorall.md",
  slug: "2010-09-28-why-is-getelementsbytagname-faster-that-queryselectorall",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-10-12-whats-a-web-browser.md": {
  id: "2010-10-12-whats-a-web-browser.md",
  slug: "2010-10-12-whats-a-web-browser",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-10-19-introduction-to-server-sent-events.md": {
  id: "2010-10-19-introduction-to-server-sent-events.md",
  slug: "2010-10-19-introduction-to-server-sent-events",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-10-26-wanted-dynamic-execution-contexts-in-javascript.md": {
  id: "2010-10-26-wanted-dynamic-execution-contexts-in-javascript.md",
  slug: "2010-10-26-wanted-dynamic-execution-contexts-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-11-02-mysterious-arguments-object-assignments.md": {
  id: "2010-11-02-mysterious-arguments-object-assignments.md",
  slug: "2010-11-02-mysterious-arguments-object-assignments",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-11-03-response-to-john-resigs-comments-about-yui.md": {
  id: "2010-11-03-response-to-john-resigs-comments-about-yui.md",
  slug: "2010-11-03-response-to-john-resigs-comments-about-yui",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2010-12-21-thoughts-on-script-loaders.md": {
  id: "2010-12-21-thoughts-on-script-loaders.md",
  slug: "2010-12-21-thoughts-on-script-loaders",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-01-11-the-sorry-state-of-the-css3-specifications.md": {
  id: "2011-01-11-the-sorry-state-of-the-css3-specifications.md",
  slug: "2011-01-11-the-sorry-state-of-the-css3-specifications",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-02-08-on-ua-sniffing-browser-detection-and-alexs-post.md": {
  id: "2011-02-08-on-ua-sniffing-browser-detection-and-alexs-post.md",
  slug: "2011-02-08-on-ua-sniffing-browser-detection-and-alexs-post",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-02-14-separating-javascript-download-and-execution.md": {
  id: "2011-02-14-separating-javascript-download-and-execution.md",
  slug: "2011-02-14-separating-javascript-download-and-execution",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-02-22-the-importance-of-being-versioned.md": {
  id: "2011-02-22-the-importance-of-being-versioned.md",
  slug: "2011-02-22-the-importance-of-being-versioned",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-03-22-using-html5-semantic-elements-today.md": {
  id: "2011-03-22-using-html5-semantic-elements-today.md",
  slug: "2011-03-22-using-html5-semantic-elements-today",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-04-05-lessons-on-font-face-from-the-f2e-summit.md": {
  id: "2011-04-05-lessons-on-font-face-from-the-f2e-summit.md",
  slug: "2011-04-05-lessons-on-font-face-from-the-f2e-summit",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-05-03-better-javascript-animations-with-requestanimationframe.md": {
  id: "2011-05-03-better-javascript-animations-with-requestanimationframe.md",
  slug: "2011-05-03-better-javascript-animations-with-requestanimationframe",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-06-03-on-leaving-yahoo-and-whats-next.md": {
  id: "2011-06-03-on-leaving-yahoo-and-whats-next.md",
  slug: "2011-06-03-on-leaving-yahoo-and-whats-next",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-06-15-introducing-css-lint-2.md": {
  id: "2011-06-15-introducing-css-lint-2.md",
  slug: "2011-06-15-introducing-css-lint-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-06-19-book-review-eloquent-javascript.md": {
  id: "2011-06-19-book-review-eloquent-javascript.md",
  slug: "2011-06-19-book-review-eloquent-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-07-21-quick-and-dirty-spinning-up-a-new-ec2-web-server-in-five-minutes.md": {
  id: "2011-07-21-quick-and-dirty-spinning-up-a-new-ec2-web-server-in-five-minutes.md",
  slug: "2011-07-21-quick-and-dirty-spinning-up-a-new-ec2-web-server-in-five-minutes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-08-09-introduction-to-the-page-visibility-api.md": {
  id: "2011-08-09-introduction-to-the-page-visibility-api.md",
  slug: "2011-08-09-introduction-to-the-page-visibility-api",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-08-18-css-lint-updated-to-0-5-0.md": {
  id: "2011-08-18-css-lint-updated-to-0-5-0.md",
  slug: "2011-08-18-css-lint-updated-to-0-5-0",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-09-03-css-lint-v0-6-0-now-available.md": {
  id: "2011-09-03-css-lint-v0-6-0-now-available.md",
  slug: "2011-09-03-css-lint-v0-6-0-now-available",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-09-15-experimenting-with-ecmascript-6-proxies.md": {
  id: "2011-09-15-experimenting-with-ecmascript-6-proxies.md",
  slug: "2011-09-15-experimenting-with-ecmascript-6-proxies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-09-19-script-yielding-with-setimmediate.md": {
  id: "2011-09-19-script-yielding-with-setimmediate.md",
  slug: "2011-09-19-script-yielding-with-setimmediate",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-10-03-when-web-standards-fail-us.md": {
  id: "2011-10-03-when-web-standards-fail-us.md",
  slug: "2011-10-03-when-web-standards-fail-us",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-10-11-simple-maintainable-templating-with-javascript.md": {
  id: "2011-10-11-simple-maintainable-templating-with-javascript.md",
  slug: "2011-10-11-simple-maintainable-templating-with-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-10-14-css-lint-v0-7-0-released.md": {
  id: "2011-10-14-css-lint-v0-7-0-released.md",
  slug: "2011-10-14-css-lint-v0-7-0-released",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-10-20-so-you-want-to-write-javascript-for-a-living-repost.md": {
  id: "2011-10-20-so-you-want-to-write-javascript-for-a-living-repost.md",
  slug: "2011-10-20-so-you-want-to-write-javascript-for-a-living-repost",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-10-24-css-lint-v0-8-0-now-available.md": {
  id: "2011-10-24-css-lint-v0-8-0-now-available.md",
  slug: "2011-10-24-css-lint-v0-8-0-now-available",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-10-25-improving-rhino-cli-utility-performance.md": {
  id: "2011-10-25-improving-rhino-cli-utility-performance.md",
  slug: "2011-10-25-improving-rhino-cli-utility-performance",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-11-04-custom-types-classes-using-object-literals-in-javascript.md": {
  id: "2011-11-04-custom-types-classes-using-object-literals-in-javascript.md",
  slug: "2011-11-04-custom-types-classes-using-object-literals-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-11-18-setting-up-multi-user-apache-on-ec2.md": {
  id: "2011-11-18-setting-up-multi-user-apache-on-ec2.md",
  slug: "2011-11-18-setting-up-multi-user-apache-on-ec2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-11-22-book-review-closure-the-definitive-guide.md": {
  id: "2011-11-22-book-review-closure-the-definitive-guide.md",
  slug: "2011-11-22-book-review-closure-the-definitive-guide",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-11-29-how-content-delivery-networks-cdns-work.md": {
  id: "2011-11-29-how-content-delivery-networks-cdns-work.md",
  slug: "2011-11-29-how-content-delivery-networks-cdns-work",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-12-14-timer-resolution-in-browsers.md": {
  id: "2011-12-14-timer-resolution-in-browsers.md",
  slug: "2011-12-14-timer-resolution-in-browsers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-12-16-book-review-html-css.md": {
  id: "2011-12-16-book-review-html-css.md",
  slug: "2011-12-16-book-review-html-css",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2011-12-20-introducing-props2js.md": {
  id: "2011-12-20-introducing-props2js.md",
  slug: "2011-12-20-introducing-props2js",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-01-03-css-media-queries-in-javascript-part-1.md": {
  id: "2012-01-03-css-media-queries-in-javascript-part-1.md",
  slug: "2012-01-03-css-media-queries-in-javascript-part-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-01-04-proposal-scripting-detection-using-css-media-queries.md": {
  id: "2012-01-04-proposal-scripting-detection-using-css-media-queries.md",
  slug: "2012-01-04-proposal-scripting-detection-using-css-media-queries",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-01-05-css-lint-v0-9-2-now-available.md": {
  id: "2012-01-05-css-lint-v0-9-2-now-available.md",
  slug: "2012-01-05-css-lint-v0-9-2-now-available",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-01-09-now-available-professional-javascript-3rd-edition.md": {
  id: "2012-01-09-now-available-professional-javascript-3rd-edition.md",
  slug: "2012-01-09-now-available-professional-javascript-3rd-edition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-01-17-book-review-the-tangled-web.md": {
  id: "2012-01-17-book-review-the-tangled-web.md",
  slug: "2012-01-17-book-review-the-tangled-web",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-01-19-css-media-queries-in-javascript-part-2.md": {
  id: "2012-01-19-css-media-queries-in-javascript-part-2.md",
  slug: "2012-01-19-css-media-queries-in-javascript-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-02-13-book-review-the-art-of-readable-code.md": {
  id: "2012-02-13-book-review-the-art-of-readable-code.md",
  slug: "2012-02-13-book-review-the-art-of-readable-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-02-22-understanding-technical-debt.md": {
  id: "2012-02-22-understanding-technical-debt.md",
  slug: "2012-02-22-understanding-technical-debt",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-03-07-in-defense-of-localstorage.md": {
  id: "2012-03-07-in-defense-of-localstorage.md",
  slug: "2012-03-07-in-defense-of-localstorage",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-03-13-its-time-to-start-using-javascript-strict-mode.md": {
  id: "2012-03-13-its-time-to-start-using-javascript-strict-mode.md",
  slug: "2012-03-13-its-time-to-start-using-javascript-strict-mode",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-04-12-how-to-install-apache-ant-on-windows.md": {
  id: "2012-04-12-how-to-install-apache-ant-on-windows.md",
  slug: "2012-04-12-how-to-install-apache-ant-on-windows",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-04-25-the-performance-of-localstorage-revisited.md": {
  id: "2012-04-25-the-performance-of-localstorage-revisited.md",
  slug: "2012-04-25-the-performance-of-localstorage-revisited",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-05-01-book-review-the-linux-command-line.md": {
  id: "2012-05-01-book-review-the-linux-command-line.md",
  slug: "2012-05-01-book-review-the-linux-command-line",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-05-08-working-with-files-in-javascript-part-1.md": {
  id: "2012-05-08-working-with-files-in-javascript-part-1.md",
  slug: "2012-05-08-working-with-files-in-javascript-part-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-05-15-working-with-files-in-javascript-part-2.md": {
  id: "2012-05-15-working-with-files-in-javascript-part-2.md",
  slug: "2012-05-15-working-with-files-in-javascript-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-05-22-working-with-files-in-javascript-part-3.md": {
  id: "2012-05-22-working-with-files-in-javascript-part-3.md",
  slug: "2012-05-22-working-with-files-in-javascript-part-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-05-29-now-available-maintainable-javascript.md": {
  id: "2012-05-29-now-available-maintainable-javascript.md",
  slug: "2012-05-29-now-available-maintainable-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-05-31-working-with-files-in-javascript-part-4-object-urls.md": {
  id: "2012-05-31-working-with-files-in-javascript-part-4-object-urls.md",
  slug: "2012-05-31-working-with-files-in-javascript-part-4-object-urls",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-06-05-working-with-files-in-javascript-part-5-blobs.md": {
  id: "2012-06-05-working-with-files-in-javascript-part-5-blobs.md",
  slug: "2012-06-05-working-with-files-in-javascript-part-5-blobs",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-06-12-the-care-and-feeding-of-software-engineers-or-why-engineers-are-grumpy.md": {
  id: "2012-06-12-the-care-and-feeding-of-software-engineers-or-why-engineers-are-grumpy.md",
  slug: "2012-06-12-the-care-and-feeding-of-software-engineers-or-why-engineers-are-grumpy",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-06-19-web-developers-are-software-engineers-too.md": {
  id: "2012-06-19-web-developers-are-software-engineers-too.md",
  slug: "2012-06-19-web-developers-are-software-engineers-too",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-06-28-whats-a-software-engineer-anyway.md": {
  id: "2012-06-28-whats-a-software-engineer-anyway.md",
  slug: "2012-06-28-whats-a-software-engineer-anyway",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-07-03-book-review-adaptive-web-design.md": {
  id: "2012-07-03-book-review-adaptive-web-design.md",
  slug: "2012-07-03-book-review-adaptive-web-design",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-07-05-ios-has-a-hover-problem.md": {
  id: "2012-07-05-ios-has-a-hover-problem.md",
  slug: "2012-07-05-ios-has-a-hover-problem",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-07-11-its-time-to-stop-blaming-internet-explorer.md": {
  id: "2012-07-11-its-time-to-stop-blaming-internet-explorer.md",
  slug: "2012-07-11-its-time-to-stop-blaming-internet-explorer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-07-24-thoughts-on-ecmascript-6-and-new-syntax.md": {
  id: "2012-07-24-thoughts-on-ecmascript-6-and-new-syntax.md",
  slug: "2012-07-24-thoughts-on-ecmascript-6-and-new-syntax",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-08-01-a-critical-review-of-ecmascript-6-quasi-literals.md": {
  id: "2012-08-01-a-critical-review-of-ecmascript-6-quasi-literals.md",
  slug: "2012-08-01-a-critical-review-of-ecmascript-6-quasi-literals",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-08-08-setting-up-apache-as-a-ssl-front-end-for-play.md": {
  id: "2012-08-08-setting-up-apache-as-a-ssl-front-end-for-play.md",
  slug: "2012-08-08-setting-up-apache-as-a-ssl-front-end-for-play",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-08-15-setting-up-ssl-on-an-amazon-elastic-load-balancer.md": {
  id: "2012-08-15-setting-up-ssl-on-an-amazon-elastic-load-balancer.md",
  slug: "2012-08-15-setting-up-ssl-on-an-amazon-elastic-load-balancer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-08-22-the-innovations-of-internet-explorer.md": {
  id: "2012-08-22-the-innovations-of-internet-explorer.md",
  slug: "2012-08-22-the-innovations-of-internet-explorer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-09-12-css-lint-v0-9-9.md": {
  id: "2012-09-12-css-lint-v0-9-9.md",
  slug: "2012-09-12-css-lint-v0-9-9",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-09-14-replacing-apache-with-nginx-on-elastic-beanstalk.md": {
  id: "2012-09-14-replacing-apache-with-nginx-on-elastic-beanstalk.md",
  slug: "2012-09-14-replacing-apache-with-nginx-on-elastic-beanstalk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-09-17-computer-science-in-javascript-insertion-sort.md": {
  id: "2012-09-17-computer-science-in-javascript-insertion-sort.md",
  slug: "2012-09-17-computer-science-in-javascript-insertion-sort",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-09-25-ecmascript-6-collections-part-1-sets.md": {
  id: "2012-09-25-ecmascript-6-collections-part-1-sets.md",
  slug: "2012-09-25-ecmascript-6-collections-part-1-sets",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-10-02-computer-science-and-javascript-merge-sort.md": {
  id: "2012-10-02-computer-science-and-javascript-merge-sort.md",
  slug: "2012-10-02-computer-science-and-javascript-merge-sort",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-10-04-thoughts-on-typescript.md": {
  id: "2012-10-04-thoughts-on-typescript.md",
  slug: "2012-10-04-thoughts-on-typescript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-10-09-ecmascript-6-collections-part-2-maps.md": {
  id: "2012-10-09-ecmascript-6-collections-part-2-maps.md",
  slug: "2012-10-09-ecmascript-6-collections-part-2-maps",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-10-16-does-javascript-need-classes.md": {
  id: "2012-10-16-does-javascript-need-classes.md",
  slug: "2012-10-16-does-javascript-need-classes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-10-19-book-review-think-like-a-programmer.md": {
  id: "2012-10-19-book-review-think-like-a-programmer.md",
  slug: "2012-10-19-book-review-think-like-a-programmer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-10-30-the-thank-you-that-changed-my-life.md": {
  id: "2012-10-30-the-thank-you-that-changed-my-life.md",
  slug: "2012-10-30-the-thank-you-that-changed-my-life",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-11-06-ecmascript-6-collections-part-3-weakmaps.md": {
  id: "2012-11-06-ecmascript-6-collections-part-3-weakmaps.md",
  slug: "2012-11-06-ecmascript-6-collections-part-3-weakmaps",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-11-13-javascript-apis-youve-never-heard-of.md": {
  id: "2012-11-13-javascript-apis-youve-never-heard-of.md",
  slug: "2012-11-13-javascript-apis-youve-never-heard-of",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-11-20-the-front-end-summit-new-speaker-program.md": {
  id: "2012-11-20-the-front-end-summit-new-speaker-program.md",
  slug: "2012-11-20-the-front-end-summit-new-speaker-program",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-11-27-computer-science-in-javascript-quicksort.md": {
  id: "2012-11-27-computer-science-in-javascript-quicksort.md",
  slug: "2012-11-27-computer-science-in-javascript-quicksort",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-12-04-adventures-in-pointerless-computing.md": {
  id: "2012-12-04-adventures-in-pointerless-computing.md",
  slug: "2012-12-04-adventures-in-pointerless-computing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-12-11-are-your-mixins-ecmascript-5-compatible.md": {
  id: "2012-12-11-are-your-mixins-ecmascript-5-compatible.md",
  slug: "2012-12-11-are-your-mixins-ecmascript-5-compatible",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-12-18-now-available-principles-of-object-oriented-programming-in-javascript-beta.md": {
  id: "2012-12-18-now-available-principles-of-object-oriented-programming-in-javascript-beta.md",
  slug: "2012-12-18-now-available-principles-of-object-oriented-programming-in-javascript-beta",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2012-12-31-being-right-doesnt-matter.md": {
  id: "2012-12-31-being-right-doesnt-matter.md",
  slug: "2012-12-31-being-right-doesnt-matter",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-01-10-advice-for-new-and-aspiring-technical-speakers.md": {
  id: "2013-01-10-advice-for-new-and-aspiring-technical-speakers.md",
  slug: "2013-01-10-advice-for-new-and-aspiring-technical-speakers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-01-15-fixing-skip-to-content-links.md": {
  id: "2013-01-15-fixing-skip-to-content-links.md",
  slug: "2013-01-15-fixing-skip-to-content-links",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-01-21-what-the-nfl-can-teach-us-about-diversity-in-technology.md": {
  id: "2013-01-21-what-the-nfl-can-teach-us-about-diversity-in-technology.md",
  slug: "2013-01-21-what-the-nfl-can-teach-us-about-diversity-in-technology",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-01-29-you-cant-create-a-button.md": {
  id: "2013-01-29-you-cant-create-a-button.md",
  slug: "2013-01-29-you-cant-create-a-button",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-02-05-what-technical-recruiters-can-learn-from-online-dating.md": {
  id: "2013-02-05-what-technical-recruiters-can-learn-from-online-dating.md",
  slug: "2013-02-05-what-technical-recruiters-can-learn-from-online-dating",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-02-12-making-an-accessible-dialog-box.md": {
  id: "2013-02-12-making-an-accessible-dialog-box.md",
  slug: "2013-02-12-making-an-accessible-dialog-box",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-02-21-on-joining-box.md": {
  id: "2013-02-21-on-joining-box.md",
  slug: "2013-02-21-on-joining-box",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-02-26-what-kind-of-a-software-engineer-do-you-want-to-be-known-as.md": {
  id: "2013-02-26-what-kind-of-a-software-engineer-do-you-want-to-be-known-as.md",
  slug: "2013-02-26-what-kind-of-a-software-engineer-do-you-want-to-be-known-as",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-03-27-internet-explorer-11s-user-agent-string-what-does-it-mean.md": {
  id: "2013-03-27-internet-explorer-11s-user-agent-string-what-does-it-mean.md",
  slug: "2013-03-27-internet-explorer-11s-user-agent-string-what-does-it-mean",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-04-01-making-accessible-icon-buttons.md": {
  id: "2013-04-01-making-accessible-icon-buttons.md",
  slug: "2013-04-01-making-accessible-icon-buttons",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-04-16-getting-the-url-of-an-iframes-parent.md": {
  id: "2013-04-16-getting-the-url-of-an-iframes-parent.md",
  slug: "2013-04-16-getting-the-url-of-an-iframes-parent",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-04-30-blink-and-the-end-of-vendor-prefixes.md": {
  id: "2013-04-30-blink-and-the-end-of-vendor-prefixes.md",
  slug: "2013-04-30-blink-and-the-end-of-vendor-prefixes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-05-21-github-workflows-inside-of-a-company.md": {
  id: "2013-05-21-github-workflows-inside-of-a-company.md",
  slug: "2013-05-21-github-workflows-inside-of-a-company",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-05-28-on-the-politics-cargo-culting-and-maintainability-of-javascript.md": {
  id: "2013-05-28-on-the-politics-cargo-culting-and-maintainability-of-javascript.md",
  slug: "2013-05-28-on-the-politics-cargo-culting-and-maintainability-of-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-06-25-eval-isnt-evil-just-misunderstood.md": {
  id: "2013-06-25-eval-isnt-evil-just-misunderstood.md",
  slug: "2013-06-25-eval-isnt-evil-just-misunderstood",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-07-02-internet-explorer-11-dont-call-me-ie.md": {
  id: "2013-07-02-internet-explorer-11-dont-call-me-ie.md",
  slug: "2013-07-02-internet-explorer-11-dont-call-me-ie",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-07-09-the-case-for-setimmediate.md": {
  id: "2013-07-09-the-case-for-setimmediate.md",
  slug: "2013-07-09-the-case-for-setimmediate",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-07-16-introducing-eslint.md": {
  id: "2013-07-16-introducing-eslint.md",
  slug: "2013-07-16-introducing-eslint",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-08-06-understanding-how-you-provide-value.md": {
  id: "2013-08-06-understanding-how-you-provide-value.md",
  slug: "2013-08-06-understanding-how-you-provide-value",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-08-21-that-time-the-lights-went-out-at-etsy.md": {
  id: "2013-08-21-that-time-the-lights-went-out-at-etsy.md",
  slug: "2013-08-21-that-time-the-lights-went-out-at-etsy",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-09-10-understanding-ecmascript-6-arrow-functions.md": {
  id: "2013-09-10-understanding-ecmascript-6-arrow-functions.md",
  slug: "2013-09-10-understanding-ecmascript-6-arrow-functions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-10-07-node-js-and-the-new-web-front-end.md": {
  id: "2013-10-07-node-js-and-the-new-web-front-end.md",
  slug: "2013-10-07-node-js-and-the-new-web-front-end",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-10-15-the-best-career-advice-ive-received.md": {
  id: "2013-10-15-the-best-career-advice-ive-received.md",
  slug: "2013-10-15-the-best-career-advice-ive-received",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-10-29-the-problem-with-tech-conference-talks-lately.md": {
  id: "2013-10-29-the-problem-with-tech-conference-talks-lately.md",
  slug: "2013-10-29-the-problem-with-tech-conference-talks-lately",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-11-04-now-available-eslint-v0-1-0.md": {
  id: "2013-11-04-now-available-eslint-v0-1-0.md",
  slug: "2013-11-04-now-available-eslint-v0-1-0",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2013-12-27-on-interviewing-front-end-engineers.md": {
  id: "2013-12-27-on-interviewing-front-end-engineers.md",
  slug: "2013-12-27-on-interviewing-front-end-engineers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-01-07-how-to-be-a-mentor.md": {
  id: "2014-01-07-how-to-be-a-mentor.md",
  slug: "2014-01-07-how-to-be-a-mentor",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-01-21-private-instance-members-with-weakmaps-in-javascript.md": {
  id: "2014-01-21-private-instance-members-with-weakmaps-in-javascript.md",
  slug: "2014-01-21-private-instance-members-with-weakmaps-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-02-04-maintainable-node-js-javascript-avoid-process-exit.md": {
  id: "2014-02-04-maintainable-node-js-javascript-avoid-process-exit.md",
  slug: "2014-02-04-maintainable-node-js-javascript-avoid-process-exit",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-02-25-now-shipping-principles-of-object-oriented-javascript.md": {
  id: "2014-02-25-now-shipping-principles-of-object-oriented-javascript.md",
  slug: "2014-02-25-now-shipping-principles-of-object-oriented-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-03-04-accessing-google-spreadsheets-from-node-js.md": {
  id: "2014-03-04-accessing-google-spreadsheets-from-node-js.md",
  slug: "2014-03-04-accessing-google-spreadsheets-from-node-js",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-03-18-leanpub-one-year-later.md": {
  id: "2014-03-18-leanpub-one-year-later.md",
  slug: "2014-03-18-leanpub-one-year-later",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-03-26-announcing-understanding-ecmascript-6.md": {
  id: "2014-03-26-announcing-understanding-ecmascript-6.md",
  slug: "2014-03-26-announcing-understanding-ecmascript-6",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-04-02-i-have-lyme-disease.md": {
  id: "2014-04-02-i-have-lyme-disease.md",
  slug: "2014-04-02-i-have-lyme-disease",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-04-15-a-framework-for-thinking-about-work.md": {
  id: "2014-04-15-a-framework-for-thinking-about-work.md",
  slug: "2014-04-15-a-framework-for-thinking-about-work",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-04-22-creating-defensive-objects-with-es6-proxies.md": {
  id: "2014-04-22-creating-defensive-objects-with-es6-proxies.md",
  slug: "2014-04-22-creating-defensive-objects-with-es6-proxies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-04-29-creating-type-safe-properties-with-ecmascript-6-proxies.md": {
  id: "2014-04-29-creating-type-safe-properties-with-ecmascript-6-proxies.md",
  slug: "2014-04-29-creating-type-safe-properties-with-ecmascript-6-proxies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-05-06-urls-are-already-dead.md": {
  id: "2014-05-06-urls-are-already-dead.md",
  slug: "2014-05-06-urls-are-already-dead",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-05-27-an-open-letter-to-the-fcc-regarding-net-neutrality.md": {
  id: "2014-05-27-an-open-letter-to-the-fcc-regarding-net-neutrality.md",
  slug: "2014-05-27-an-open-letter-to-the-fcc-regarding-net-neutrality",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-06-03-my-ecmascript-7-wishlist.md": {
  id: "2014-06-03-my-ecmascript-7-wishlist.md",
  slug: "2014-06-03-my-ecmascript-7-wishlist",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2014-07-15-generalists-and-specialists-thoughts-on-hiring.md": {
  id: "2014-07-15-generalists-and-specialists-thoughts-on-hiring.md",
  slug: "2014-07-15-generalists-and-specialists-thoughts-on-hiring",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-04-14-consensus-driven-development.md": {
  id: "2015-04-14-consensus-driven-development.md",
  slug: "2015-04-14-consensus-driven-development",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-05-14-the-bunny-theory-of-code.md": {
  id: "2015-05-14-the-bunny-theory-of-code.md",
  slug: "2015-05-14-the-bunny-theory-of-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-06-23-why-youre-afraid-of-public-speaking.md": {
  id: "2015-06-23-why-youre-afraid-of-public-speaking.md",
  slug: "2015-06-23-why-youre-afraid-of-public-speaking",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-07-16-announcing-the-nczonline-newsletter.md": {
  id: "2015-07-16-announcing-the-nczonline-newsletter.md",
  slug: "2015-07-16-announcing-the-nczonline-newsletter",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-08-26-wordpress-jekyll-my-new-blog-setup.md": {
  id: "2015-08-26-wordpress-jekyll-my-new-blog-setup.md",
  slug: "2015-08-26-wordpress-jekyll-my-new-blog-setup",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-09-08-is-the-web-platform-getting-too-big.md": {
  id: "2015-09-08-is-the-web-platform-getting-too-big.md",
  slug: "2015-09-08-is-the-web-platform-getting-too-big",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-09-22-my-favorite-interview-question.md": {
  id: "2015-09-22-my-favorite-interview-question.md",
  slug: "2015-09-22-my-favorite-interview-question",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-10-06-triggering-jenkins-builds-by-url.md": {
  id: "2015-10-06-triggering-jenkins-builds-by-url.md",
  slug: "2015-10-06-triggering-jenkins-builds-by-url",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-10-20-ecmascript-6-destructuring-gotcha.md": {
  id: "2015-10-20-ecmascript-6-destructuring-gotcha.md",
  slug: "2015-10-20-ecmascript-6-destructuring-gotcha",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-11-17-performance-implication-object-defineproperty.md": {
  id: "2015-11-17-performance-implication-object-defineproperty.md",
  slug: "2015-11-17-performance-implication-object-defineproperty",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-12-15-why-im-not-using-your-open-source-project.md": {
  id: "2015-12-15-why-im-not-using-your-open-source-project.md",
  slug: "2015-12-15-why-im-not-using-your-open-source-project",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-01-26-react-and-the-economics-of-dynamic-web-interfaces.md": {
  id: "2016-01-26-react-and-the-economics-of-dynamic-web-interfaces.md",
  slug: "2016-01-26-react-and-the-economics-of-dynamic-web-interfaces",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-02-09-reflections-on-eslints-success.md": {
  id: "2016-02-09-reflections-on-eslints-success.md",
  slug: "2016-02-09-reflections-on-eslints-success",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-03-08-mimicking-npm-script-in-node-js.md": {
  id: "2016-03-08-mimicking-npm-script-in-node-js.md",
  slug: "2016-03-08-mimicking-npm-script-in-node-js",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-04-05-es6-module-loading-more-complicated-than-you-think.md": {
  id: "2016-04-05-es6-module-loading-more-complicated-than-you-think.md",
  slug: "2016-04-05-es6-module-loading-more-complicated-than-you-think",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-10-18-the-ecmascript-2016-change-you-probably-dont-know.md": {
  id: "2016-10-18-the-ecmascript-2016-change-you-probably-dont-know.md",
  slug: "2016-10-18-the-ecmascript-2016-change-you-probably-dont-know",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-02-27-the-inception-of-eslint.md": {
  id: "2018-02-27-the-inception-of-eslint.md",
  slug: "2018-02-27-the-inception-of-eslint",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-03-27-scheduling-jekyll-posts-netlify.md": {
  id: "2018-03-27-scheduling-jekyll-posts-netlify.md",
  slug: "2018-03-27-scheduling-jekyll-posts-netlify",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-09-04-detecting-new-post-jekyll-netlify.md": {
  id: "2018-09-04-detecting-new-post-jekyll-netlify.md",
  slug: "2018-09-04-detecting-new-post-jekyll-netlify",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-10-02-extracting-command-line-arguments-nodejs.md": {
  id: "2018-10-02-extracting-command-line-arguments-nodejs.md",
  slug: "2018-10-02-extracting-command-line-arguments-nodejs",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-10-30-my-somewhat-complete-salary-history-software-engineer.md": {
  id: "2018-10-30-my-somewhat-complete-salary-history-software-engineer.md",
  slug: "2018-10-30-my-somewhat-complete-salary-history-software-engineer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-01-08-computer-science-in-javascript-linked-list.md": {
  id: "2019-01-08-computer-science-in-javascript-linked-list.md",
  slug: "2019-01-08-computer-science-in-javascript-linked-list",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-01-15-stop-using-default-exports-javascript-module.md": {
  id: "2019-01-15-stop-using-default-exports-javascript-module.md",
  slug: "2019-01-15-stop-using-default-exports-javascript-module",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-02-05-computer-science-in-javascript-doubly-linked-lists.md": {
  id: "2019-02-05-computer-science-in-javascript-doubly-linked-lists.md",
  slug: "2019-02-05-computer-science-in-javascript-doubly-linked-lists",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-03-05-computer-science-in-javascript-circular-doubly-linked-lists.md": {
  id: "2019-03-05-computer-science-in-javascript-circular-doubly-linked-lists.md",
  slug: "2019-03-05-computer-science-in-javascript-circular-doubly-linked-lists",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-04-16-jekyll-hooks-output-markdown.md": {
  id: "2019-04-16-jekyll-hooks-output-markdown.md",
  slug: "2019-04-16-jekyll-hooks-output-markdown",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-09-03-securing-persistent-environment-variables-zeit-now.md": {
  id: "2019-09-03-securing-persistent-environment-variables-zeit-now.md",
  slug: "2019-09-03-securing-persistent-environment-variables-zeit-now",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2019-10-01-scheduling-jekyll-posts-netlify-github-actions.md": {
  id: "2019-10-01-scheduling-jekyll-posts-netlify-github-actions.md",
  slug: "2019-10-01-scheduling-jekyll-posts-netlify-github-actions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-02-18-how-i-think-about-solving-problems.md": {
  id: "2020-02-18-how-i-think-about-solving-problems.md",
  slug: "2020-02-18-how-i-think-about-solving-problems",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-07-21-safely-use-github-actions-in-organizations.md": {
  id: "2020-07-21-safely-use-github-actions-in-organizations.md",
  slug: "2020-07-21-safely-use-github-actions-in-organizations",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-09-22-creating-javascript-promise-from-scratch-constructor.md": {
  id: "2020-09-22-creating-javascript-promise-from-scratch-constructor.md",
  slug: "2020-09-22-creating-javascript-promise-from-scratch-constructor",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-09-29-creating-javascript-promise-from-scratch-resolving-to-a-promise.md": {
  id: "2020-09-29-creating-javascript-promise-from-scratch-resolving-to-a-promise.md",
  slug: "2020-09-29-creating-javascript-promise-from-scratch-resolving-to-a-promise",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-10-06-creating-javascript-promise-from-scratch-then-catch-finally.md": {
  id: "2020-10-06-creating-javascript-promise-from-scratch-then-catch-finally.md",
  slug: "2020-10-06-creating-javascript-promise-from-scratch-then-catch-finally",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-10-13-creating-javascript-promise-from-scratch-promise-resolve-reject.md": {
  id: "2020-10-13-creating-javascript-promise-from-scratch-promise-resolve-reject.md",
  slug: "2020-10-13-creating-javascript-promise-from-scratch-promise-resolve-reject",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-11-24-creating-javascript-promise-from-scratch-promise-race-any.md": {
  id: "2020-11-24-creating-javascript-promise-from-scratch-promise-race-any.md",
  slug: "2020-11-24-creating-javascript-promise-from-scratch-promise-race-any",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-12-16-creating-javascript-promise-from-scratch-promise-all-allsettled.md": {
  id: "2020-12-16-creating-javascript-promise-from-scratch-promise-all-allsettled.md",
  slug: "2020-12-16-creating-javascript-promise-from-scratch-promise-all-allsettled",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-01-19-creating-javascript-promise-from-scratch-unhandled-rejection-tracking.md": {
  id: "2021-01-19-creating-javascript-promise-from-scratch-unhandled-rejection-tracking.md",
  slug: "2021-01-19-creating-javascript-promise-from-scratch-unhandled-rejection-tracking",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-02-16-introducing-env-javascript-environment-variables.md": {
  id: "2021-02-16-introducing-env-javascript-environment-variables.md",
  slug: "2021-02-16-introducing-env-javascript-environment-variables",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-03-16-two-approaches-win-argument-software-engineer.md": {
  id: "2021-03-16-two-approaches-win-argument-software-engineer.md",
  slug: "2021-03-16-two-approaches-win-argument-software-engineer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-04-20-lazy-loading-property-pattern-javascript.md": {
  id: "2021-04-20-lazy-loading-property-pattern-javascript.md",
  slug: "2021-04-20-lazy-loading-property-pattern-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-05-18-talk-to-your-company-sponsoring-open-source.md": {
  id: "2021-05-18-talk-to-your-company-sponsoring-open-source.md",
  slug: "2021-05-18-talk-to-your-company-sponsoring-open-source",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-12-14-making-open-source-project-sponsor-ready-companies-trust.md": {
  id: "2021-12-14-making-open-source-project-sponsor-ready-companies-trust.md",
  slug: "2021-12-14-making-open-source-project-sponsor-ready-companies-trust",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-12-21-making-open-source-project-sponsor-ready-project-hygiene.md": {
  id: "2021-12-21-making-open-source-project-sponsor-ready-project-hygiene.md",
  slug: "2021-12-21-making-open-source-project-sponsor-ready-project-hygiene",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-12-28-making-open-source-project-sponsor-ready-accepting-sponsorships.md": {
  id: "2021-12-28-making-open-source-project-sponsor-ready-accepting-sponsorships.md",
  slug: "2021-12-28-making-open-source-project-sponsor-ready-accepting-sponsorships",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-06-14-sponsoring-dependencies-open-source-sustainability.md": {
  id: "2022-06-14-sponsoring-dependencies-open-source-sustainability.md",
  slug: "2022-06-14-sponsoring-dependencies-open-source-sustainability",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-12-15-rust-development-environment-visual-studio-code.md": {
  id: "2022-12-15-rust-development-environment-visual-studio-code.md",
  slug: "2022-12-15-rust-development-environment-visual-studio-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2023-01-24-return-structures-rust-javascript-webassembly.md": {
  id: "2023-01-24-return-structures-rust-javascript-webassembly.md",
  slug: "2023-01-24-return-structures-rust-javascript-webassembly",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2023-02-14-astro-jekyll-blog-year-archive.md": {
  id: "2023-02-14-astro-jekyll-blog-year-archive.md",
  slug: "2023-02-14-astro-jekyll-blog-year-archive",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
"snippets": {
"2019-01-05-nodejs-medium-api-fetch.md": {
  id: "2019-01-05-nodejs-medium-api-fetch.md",
  slug: "2019-01-05-nodejs-medium-api-fetch",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2019-01-20-special-formatting-svg-images-css.md": {
  id: "2019-01-20-special-formatting-svg-images-css.md",
  slug: "2019-01-20-special-formatting-svg-images-css",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2019-02-09-flatten-array-javascript-generator.md": {
  id: "2019-02-09-flatten-array-javascript-generator.md",
  slug: "2019-02-09-flatten-array-javascript-generator",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2019-05-13-nodejs-read-stream-promise.md": {
  id: "2019-05-13-nodejs-read-stream-promise.md",
  slug: "2019-05-13-nodejs-read-stream-promise",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2019-05-28-jest-globals-intellisense-visual-studio-code.md": {
  id: "2019-05-28-jest-globals-intellisense-visual-studio-code.md",
  slug: "2019-05-28-jest-globals-intellisense-visual-studio-code",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2020-02-22-optionally-await-function-result.md": {
  id: "2020-02-22-optionally-await-function-result.md",
  slug: "2020-02-22-optionally-await-function-result",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2020-07-28-eleventy-heading-ids.md": {
  id: "2020-07-28-eleventy-heading-ids.md",
  slug: "2020-07-28-eleventy-heading-ids",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2020-08-05-validate-github-webhook-signature-nodejs.md": {
  id: "2020-08-05-validate-github-webhook-signature-nodejs.md",
  slug: "2020-08-05-validate-github-webhook-signature-nodejs",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2020-10-09-read-environment-variables-deno.md": {
  id: "2020-10-09-read-environment-variables-deno.md",
  slug: "2020-10-09-read-environment-variables-deno",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2020-10-15-create-typescript-declarations-from-javascript-jsdoc.md": {
  id: "2020-10-15-create-typescript-declarations-from-javascript-jsdoc.md",
  slug: "2020-10-15-create-typescript-declarations-from-javascript-jsdoc",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2021-02-18-how-to-regain-jenkins-web-access-after-lockout.md": {
  id: "2021-02-18-how-to-regain-jenkins-web-access-after-lockout.md",
  slug: "2021-02-18-how-to-regain-jenkins-web-access-after-lockout",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2021-02-25-how-to-setup-deploy-web-application-dokku.md": {
  id: "2021-02-25-how-to-setup-deploy-web-application-dokku.md",
  slug: "2021-02-25-how-to-setup-deploy-web-application-dokku",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2021-03-01-create-user-linux-ssh-key.md": {
  id: "2021-03-01-create-user-linux-ssh-key.md",
  slug: "2021-03-01-create-user-linux-ssh-key",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2022-02-17-eleventy-npm-modules-client.md": {
  id: "2022-02-17-eleventy-npm-modules-client.md",
  slug: "2022-02-17-eleventy-npm-modules-client",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
"2023-01-18-mimicking-dirname-filename-nodejs-esm.md": {
  id: "2023-01-18-mimicking-dirname-filename-nodejs-esm.md",
  slug: "2023-01-18-mimicking-dirname-filename-nodejs-esm",
  body: string,
  collection: "snippets",
  data: InferEntrySchema<"snippets">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
