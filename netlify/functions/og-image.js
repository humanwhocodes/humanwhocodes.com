/**
 * @fileoverview Netlify function to generate SVG open graph images for blog posts.
 * 
 * Query Parameters:
 * - title (required): The title of the blog post
 * - teaser (optional): The teaser/description of the blog post
 * - date (optional): The publication date (format: YYYY-MM-DD or timestamp)
 * - tags (optional): Comma-separated list of tags
 * - readingTime (optional): Reading time in minutes (defaults to calculated or "5")
 * 
 * Example Usage:
 * /.netlify/functions/og-image?title=My Blog Post&teaser=This is a teaser&date=2024-01-15&tags=JavaScript,Programming&readingTime=8
 * 
 * The generated SVG matches the visual style of the blog post cards (PostBlurb component).
 */

export async function handler(event, context) {
    try {
        // Parse query parameters
        const params = event.queryStringParameters || {};
        const title = params.title || 'Blog Post Title';
        const teaser = params.teaser || '';
        const dateParam = params.date || new Date().toISOString();
        const tagsParam = params.tags || '';
        const readingTime = params.readingTime || '5';

        // Parse tags
        const tags = tagsParam ? tagsParam.split(',').map(t => t.trim()).slice(0, 3) : [];

        // Format date
        let formattedDate;
        try {
            const date = new Date(dateParam);
            formattedDate = date.toLocaleDateString('en-us', {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } catch (e) {
            formattedDate = 'January 1, 2024';
        }

        // Colors from the CSS (matching site's CSS variables exactly)
        const colors = {
            white: '#ffffff',
            darkGray: '#373736', // --dark-gray
            lightOrange: 'hsl(27, 91%, 54%)', // --light-orange
            mediumBlue: 'hsl(209, 100%, 45%)', // --medium-blue (note: CSS uses 'deg' but SVG accepts both)
            lightBlue: 'hsl(209, 100%, 55%)', // --light-blue
            lightestBlue: 'hsl(209, 100%, 92%)', // --lightest-blue
            borderColor: '#ddd', // --content-border-color
            textGray: '#6b7280', // used in post-blurb-teaser
        };

        // Embedded avatar image (base64 encoded)
        const avatarImage = 'data:image/jpeg;base64,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';

        // SVG dimensions (matching typical OG image size)
        const width = 1200;
        const height = 630;
        const padding = 60;
        const contentWidth = width - (padding * 2);

        // Helper function to escape XML special characters
        const escapeXml = (str) => {
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        };

        // Helper function to wrap text
        const wrapText = (text, maxChars) => {
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word;
                if (testLine.length <= maxChars) {
                    currentLine = testLine;
                } else {
                    if (currentLine) lines.push(currentLine);
                    currentLine = word;
                }
            }
            if (currentLine) lines.push(currentLine);
            return lines;
        };

        // Wrap title and teaser
        const titleLines = wrapText(title, 50);
        const teaserLines = teaser ? wrapText(teaser, 80).slice(0, 3) : [];

        // Calculate positions - bottom-align byline and tags
        const metaHeight = 60; // Height for byline area
        const bottomMargin = 40; // Margin from bottom
        const metaY = height - padding - metaHeight - bottomMargin;
        
        // Title and teaser positioned from top
        let currentY = padding + 80;
        const titleHeight = titleLines.length * 58;
        const teaserY = currentY + titleHeight + 30;

        // Calculate tag widths and positions for right alignment
        const tagWidths = tags.map(tag => tag.length * 14 + 30);
        const totalTagWidth = tagWidths.length > 0 
            ? tagWidths.reduce((sum, w) => sum + w, 0) + Math.max(0, tags.length - 1) * 10 
            : 0; // 10px gap between tags
        const tagsStartX = Math.max(padding, width - padding - totalTagWidth);
        
        // Pre-compute tag positions for efficiency
        const tagPositions = tagWidths.reduce((positions, width, i) => {
            const prevPosition = i === 0 ? 0 : positions[i - 1] + tagWidths[i - 1] + 10;
            positions.push(prevPosition);
            return positions;
        }, []);

        // Generate SVG
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="tagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${colors.lightestBlue};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:1" />
        </linearGradient>
        <clipPath id="avatarClip">
            <circle cx="${padding + 30}" cy="${metaY + 30}" r="30"/>
        </clipPath>
    </defs>
    
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="${colors.white}"/>
    
    <!-- Card Container -->
    <rect x="30" y="30" width="${width - 60}" height="${height - 60}" 
          fill="${colors.white}" 
          stroke="${colors.borderColor}" 
          stroke-width="2" 
          rx="12"/>
    
    <!-- Title -->
    <text x="${padding}" y="${currentY}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="52" 
          font-weight="700" 
          fill="${colors.darkGray}">
        ${titleLines.map((line, i) => 
            `<tspan x="${padding}" dy="${i === 0 ? 0 : 58}">${escapeXml(line)}</tspan>`
        ).join('\n        ')}
    </text>
    
    ${teaser ? `
    <!-- Teaser -->
    <text x="${padding}" y="${teaserY}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="32" 
          font-weight="400" 
          fill="${colors.textGray}">
        ${teaserLines.map((line, i) => 
            `<tspan x="${padding}" dy="${i === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`
        ).join('\n        ')}
    </text>
    ` : ''}
    
    <!-- Author Avatar -->
    <circle cx="${padding + 30}" cy="${metaY + 30}" r="30" 
            fill="${colors.lightOrange}" 
            stroke="${colors.lightOrange}" 
            stroke-width="3"/>
    <image x="${padding}" y="${metaY}" width="60" height="60" 
           href="${avatarImage}"
           clip-path="url(#avatarClip)"/>
    
    <!-- Author Name -->
    <text x="${padding + 80}" y="${metaY + 20}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="28" 
          font-weight="600" 
          fill="${colors.darkGray}">Nicholas C. Zakas</text>
    
    <!-- Date and Reading Time -->
    <text x="${padding + 80}" y="${metaY + 52}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="24" 
          font-weight="400" 
          fill="${colors.textGray}">
        ${escapeXml(formattedDate)} • ${escapeXml(readingTime)} min read
    </text>
    
    ${tags.length > 0 ? `
    <!-- Tags (right-aligned on same row as byline, bottom-aligned) -->
    <g transform="translate(${tagsStartX}, ${metaY + 20})">
        ${tags.map((tag, i) => {
            const tagWidth = tagWidths[i];
            const tagX = tagPositions[i];
            return `
        <g transform="translate(${tagX}, 0)">
            <rect width="${tagWidth}" height="40" 
                  fill="url(#tagGradient)" 
                  stroke="rgba(59, 130, 246, 0.2)" 
                  stroke-width="1" 
                  rx="20"/>
            <text x="${tagWidth / 2}" y="27" 
                  font-family="system-ui, -apple-system, sans-serif" 
                  font-size="22" 
                  font-weight="500" 
                  fill="${colors.mediumBlue}" 
                  text-anchor="middle">${escapeXml(tag)}</text>
        </g>`;
        }).join('\n        ')}
    </g>
    ` : ''}
</svg>`;

        // Return SVG with proper headers
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                // Cache for 1 day - allows updates while maintaining good performance
                'Cache-Control': 'public, max-age=86400',
            },
            body: svg,
        };
    } catch (error) {
        console.error('Error generating OG image:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: 'Failed to generate image',
                message: error.message,
            }),
        };
    }
}
