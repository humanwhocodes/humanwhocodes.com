import { defineCollection, z } from 'astro:content';

function getDateValue(value) {
    if (!value) {
        return undefined;
    }

    return typeof value === "string" ? new Date(value + " 00:00:00") : value;
}

const blog = defineCollection({
    type: "content",
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        teaser: z.string().optional(),
        date: z
            .string()
            .or(z.date())
            .optional()
            .transform(getDateValue),
        tags: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        permalink: z.string().optional(),
        published: z.boolean().optional(),
        updated: z
            .string()
            .or(z.date())
            .optional()
            .transform(getDateValue),
        draft: z.boolean().optional(),
        promo: z.string().optional(),
        // Common Astro schemas
        pubDate: z
            .string()
            .or(z.date())
            .optional()
            .transform(getDateValue),
        updatedDate: z
            .string()
            .or(z.date())
            .optional()
            .transform(getDateValue),
        heroImage: z.string().optional(),
        original: z.object({
            date: z.date(),
            title: z.string().optional(),
            url: z.string(),
            site: z.object({
                name: z.string(),
                url: z.string(),
            }),
        }).optional(),
        image: z.string().optional(),
    }),
});

const snippets = defineCollection({
    type: "content",
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        teaser: z.string().optional(),
        date: z
            .string()
            .or(z.date())
            .optional()
            .transform(getDateValue),
        tags: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        permalink: z.string().optional(),
        published: z.boolean().optional(),
        draft: z.boolean().optional(),
        // Common Astro schemas
        pubDate: z
            .string()
            .or(z.date())
            .optional()
            .transform(getDateValue),
        updatedDate: z
            .string()
            .optional()
            .transform(getDateValue),
        heroImage: z.string().optional(),
    }),
});

export const collections = { blog, snippets };
