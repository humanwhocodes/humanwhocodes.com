# Example: Using the OG Image Function in a Blog Post

This example shows how to integrate the dynamic OG image function into an Astro blog post.

## In the blog post frontmatter or layout:

```astro
---
// Example: src/pages/blog/[...slug].astro
import { getEntry } from 'astro:content';

const { slug } = Astro.params;
const post = await getEntry('blog', slug);

const { title, teaser, date, tags } = post.data;
const readingTime = Math.ceil(post.body.split(/\s+/).length / 200);

// Build OG image URL
const ogImageParams = new URLSearchParams({
    title,
    ...(teaser && { teaser }),
    ...(date && { date: date.toISOString().split('T')[0] }),
    ...(tags && tags.length > 0 && { tags: tags.join(',') }),
    ...(readingTime && { readingTime: readingTime.toString() })
});

const ogImageUrl = `${Astro.site}.netlify/functions/og-image?${ogImageParams}`;
---

<head>
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content={title} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:image" content={ogImageUrl} />
</head>
```

## Example URLs Generated:

For a blog post with:
- Title: "Understanding JavaScript Closures"
- Teaser: "A comprehensive guide to closures in JavaScript"
- Date: 2024-01-15
- Tags: JavaScript, Programming
- Reading Time: 8 minutes

The function URL would be:
```
https://humanwhocodes.com/.netlify/functions/og-image?title=Understanding%20JavaScript%20Closures&teaser=A%20comprehensive%20guide%20to%20closures%20in%20JavaScript&date=2024-01-15&tags=JavaScript,Programming&readingTime=8
```

## Testing

You can test the OG image URLs using:

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Simply paste your blog post URL and these tools will show how the OG image appears.

## Notes

- The SVG format is supported by most social media platforms
- The images are lightweight (typically 2-4KB)
- Cached for 24 hours for performance
- Automatically matches the blog's visual style
