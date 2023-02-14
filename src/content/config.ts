import { defineCollection, z } from 'astro:content';

function getDateValue(value) {
    if (!value) {
        return undefined;
    }

    return typeof value === "string" ? new Date(value + " 00:00:00") : undefined;
}

const blog = defineCollection({
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
            .or(z.date())
            .optional()
            .transform(getDateValue),
        heroImage: z.string().optional(),
    }),
});

const snippets = defineCollection({
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
