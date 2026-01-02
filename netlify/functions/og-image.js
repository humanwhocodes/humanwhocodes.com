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
