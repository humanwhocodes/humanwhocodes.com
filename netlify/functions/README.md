# OG Image Generator

This Netlify function generates dynamic SVG open graph images for blog posts that match the visual style of the blog post cards on the site.

## Usage

The function is available at `/.netlify/functions/og-image` and accepts the following query parameters:

### Query Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `title` | Yes | The title of the blog post | `My Blog Post` |
| `teaser` | No | The teaser/description text | `This is a short description` |
| `date` | No | Publication date (ISO format or timestamp) | `2024-01-15` or `2024-01-15T10:00:00Z` |
| `tags` | No | Comma-separated list of tags (max 3 displayed) | `JavaScript,Programming,Web` |
| `readingTime` | No | Reading time in minutes | `8` |

### Examples

**Full example with all parameters:**
```
/.netlify/functions/og-image?title=A%20persona-based%20approach%20to%20AI-assisted%20software%20development&teaser=Discover%20how%20breaking%20AI%20assistance%20into%20specialized%20personas&date=2025-06-11&tags=AI,Claude,GPT&readingTime=8
```

**Minimal example with just title:**
```
/.netlify/functions/og-image?title=Understanding%20JavaScript%20Closures
```

**With title and tags:**
```
/.netlify/functions/og-image?title=Modern%20Web%20Development&tags=JavaScript,Web%20Development,Best%20Practices
```

## Using in HTML Meta Tags

To use the generated image as an open graph image in your blog posts:

```html
<meta property="og:image" content="https://humanwhocodes.com/.netlify/functions/og-image?title=Your%20Post%20Title&teaser=Your%20teaser&date=2024-01-15&tags=Tag1,Tag2&readingTime=5" />
<meta property="og:image:type" content="image/svg+xml" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## Visual Style

The generated SVG matches the blog post card design with:

- **Dimensions:** 1200x630px (standard OG image size)
- **Background:** White card with rounded corners and border
- **Typography:** System fonts matching the site
- **Colors:** Uses the same color palette as the site (orange accent, blue tags, gray text)
- **Layout:** Title, teaser, author info (with "NZ" avatar), date, reading time, and tags

## Technical Details

- Returns SVG with `Content-Type: image/svg+xml`
- Implements caching headers for optimal performance
- Text wrapping for long titles and teasers
- Automatic date formatting
- Limits to first 3 tags when multiple are provided
- Escapes XML special characters for security

## Testing Locally

To test the function locally, you can use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

Then access the function at:
```
http://localhost:8888/.netlify/functions/og-image?title=Test
```

## Implementation Notes

The function is implemented in `netlify/functions/og-image.js` and uses pure JavaScript with no external dependencies. It generates SVG dynamically based on the query parameters, ensuring fast performance and small file sizes.
