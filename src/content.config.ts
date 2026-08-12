import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

function getDateValue(value) {
    if (!value) {
        return undefined;
    }

    return typeof value === "string" ? new Date(value + " 00:00:00") : value;
}

const dateField = z
    .string()
    .or(z.date())
    .optional()
    .transform(getDateValue);

/*
 * Fields shared by both collections. Jekyll frontmatter keys (`permalink`,
 * `published`, `draft`) are kept alongside the common Astro ones so existing
 * posts validate unchanged.
 *
 * `image` is the filename of a hero image in src/images/heroes/. It stays a
 * plain string here and is resolved to an optimized asset by getHeroImage();
 * see the note in src/lib/images.js for why it doesn't use Astro's `image()`
 * schema helper. An unknown filename throws during the build.
 */
const commonFields = {
    title: z.string(),
    teaser: z.string().optional(),
    date: dateField,
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    permalink: z.string().optional(),
    published: z.boolean().optional(),
    draft: z.boolean().optional(),
    // Common Astro schemas
    pubDate: dateField,
    updatedDate: dateField,
    heroImage: z.string().optional(),
    image: z.string().optional(),
};

const blog = defineCollection({
    loader: glob({
        pattern: "**/[^_]*.md",
        base: "./src/content/blog",
    }),
    schema: z.object({
        ...commonFields,
        updated: dateField,
        promo: z.string().optional(),
        canonical_url: z.string().optional(),
        original: z.object({
            date: z.date(),
            title: z.string().optional(),
            url: z.string(),
            site: z.object({
                name: z.string(),
                url: z.string(),
            }),
        }).optional(),
    }),
});

const snippets = defineCollection({
    loader: glob({
        pattern: "**/[^_]*.md",
        base: "./src/content/snippets",
    }),
    schema: z.object(commonFields),
});

export const collections = { blog, snippets };
