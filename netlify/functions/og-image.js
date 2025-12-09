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

        // Colors from the CSS (converted to hex/rgba for SVG)
        const colors = {
            white: '#ffffff',
            darkGray: '#373736',
            lightOrange: 'hsl(27, 91%, 54%)', // #f27935
            mediumBlue: 'hsl(209, 100%, 45%)', // #0066e6
            lightBlue: 'hsl(209, 100%, 55%)',
            lightestBlue: 'hsl(209, 100%, 92%)',
            borderColor: '#e5e7eb',
            textGray: '#6b7280',
        };

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

        // Calculate positions
        let currentY = padding + 80;
        const titleHeight = titleLines.length * 58;
        const teaserY = currentY + titleHeight + 30;
        const teaserHeight = teaserLines.length * 38;
        const metaY = teaserY + teaserHeight + 40;

        // Generate SVG
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="tagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${colors.lightestBlue};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:1" />
        </linearGradient>
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
    
    <!-- Author Avatar Circle -->
    <circle cx="${padding + 30}" cy="${metaY + 30}" r="30" 
            fill="${colors.lightOrange}" 
            stroke="${colors.lightOrange}" 
            stroke-width="3"/>
    <text x="${padding + 30}" y="${metaY + 40}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="28" 
          font-weight="700" 
          fill="${colors.white}" 
          text-anchor="middle">NZ</text>
    
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
    <!-- Tags -->
    <g transform="translate(${padding}, ${metaY + 90})">
        ${tags.map((tag, i) => {
            const tagX = i * 180;
            const tagWidth = tag.length * 14 + 30;
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
                'Cache-Control': 'public, max-age=31536000, immutable',
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
