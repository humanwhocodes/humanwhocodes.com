/**
 * @fileoverview Jekyll permalink compatibility for Astro's Content Layer API.
 * @author Nicholas C. Zakas
 */

/*
 * This replaces `@humanwhocodes/astro-jekyll`, which was written against the
 * legacy content collections API. That API is gone as of Astro 6: entries no
 * longer have a `slug` property (`id` now holds the filename-derived slug) and
 * they are plain, shared objects that must not be mutated in place.
 *
 * The URL derivation below is intentionally identical to the old package so
 * that every previously published permalink resolves to the same path.
 */

const DATETIME = /^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2})(?::(\d{2})(?::(\d{2}))?)?(?:\s*([+-]\d{4}))?)?/;

/**
 * Parses a Jekyll-formatted datetime into a JavaScript Date object.
 * If there is no time specified, then the returned Date object is set
 * to midnight so it respects the local timezone settings.
 * Format: YYYY-MM-DD HH:MM:SS +/-TTTT
 * @param {string} text The Jekyll datetime to parse.
 * @returns {Date|undefined} A date object representing the Jekyll datetime
 *      or undefined if the text isn't a datetime string.
 */
export function parseJekyllDateTime(text) {
    const match = DATETIME.exec(text);

    if (!match) {
        return undefined;
    }

    // remove the overall match
    match.shift();

    let dateString = `${match.shift()}-${match.shift()}-${match.shift()}T`;
    if (match[0]) {

        // hours
        dateString += match.shift();

        // minutes
        if (match[0]) {
            dateString += `:${match.shift()}`;
        } else {
            dateString += ":00";  // Date object requires minutes
        }

        // seconds
        if (match[0]) {
            dateString += `:${match.shift()}`;
        }

        // timezone offset
        if (match[0]) {
            dateString += `${match.shift()}`;
        }

    } else {
        dateString += "00:00";
    }

    return new Date(dateString);
}

/**
 * Fills in a Jekyll permalink template.
 * @param {string} permalink The Jekyll permalink format to fill.
 * @param {Date} date The post date used for the date placeholders.
 * @param {string} title The post title slug used for `:title` and `:slug`.
 * @returns {string} The formatted permalink.
 */
export function formatJekyllPermalink(permalink, date, title) {

    /** @type {Array<[RegExp, string]>} */
    const replacements = [
        [/:year/g, date.getFullYear().toString()],
        [/:short_year/g, date.getFullYear().toString().slice(2, 4)],
        [/:month/g, (date.getMonth() + 1).toString().padStart(2, "0")],
        [/:i_month/g, (date.getMonth() + 1).toString()],
        [/:day/g, date.getDate().toString().padStart(2, "0")],
        [/:i_day/g, date.getDate().toString()],
        [/:hour/g, date.getHours().toString().padStart(2, "0")],
        [/:minute/g, date.getMinutes().toString().padStart(2, "0")],
        [/:second/g, date.getSeconds().toString().padStart(2, "0")],
        [/:title/g, title],
        [/:slug/g, title],
    ];

    return replacements.reduce(
        (result, [pattern, value]) => result.replace(pattern, value),
        permalink
    );
}

/**
 * Formats a content collection entry so it carries the Jekyll-derived date and
 * URL slug the site's templates expect.
 *
 * The returned object is a copy: content layer entries are shared across every
 * page that reads the collection, so mutating them leaks state between routes.
 * @param {Object} options Options for formatting.
 * @param {string} [options.permalink] The permalink format to use.
 * @returns {Function} A mapper that formats a single entry.
 */
export function formatJekyllPost({
    permalink = "/blog/:year/:month/:title/"
} = {}) {

    return entry => {

        /*
         * `id` is the content layer's replacement for the old `slug`: for the
         * glob loader it is the slugified filename, e.g.
         * "2009-05-05-http-cookies-explained".
         */
        let title = entry.id;

        // is there a date in the filename?
        let postDate = parseJekyllDateTime(title);
        if (postDate) {
            title = title.slice(11);
        }

        // date in the data overrides the filename
        if (entry.data.date) {
            postDate = (typeof entry.data.date === "string")
                ? parseJekyllDateTime(entry.data.date)
                : entry.data.date;
        }

        // if there's a permalink we should use that instead
        let url = entry.data.permalink ?? formatJekyllPermalink(permalink, postDate, title);

        if (!url.startsWith("/")) {
            url = "/" + url;
        }

        // format: [ '', 'blog', '2009', '05', '05', 'http-cookies-explained', '' ]
        const urlParts = url.split("/");
        urlParts.shift();   // remove first empty space
        urlParts.shift();   // remove the collection name

        if (url.endsWith("/")) {
            urlParts.pop();     // remove last empty space
        }

        return {
            ...entry,
            data: {
                ...entry.data,
                date: postDate,
                pubDate: postDate,
            },

            /*
             * Not an Astro property anymore -- this is the site's own
             * collection-relative URL slug, e.g. "2009/05/05/http-cookies-explained".
             */
            slug: urlParts.join("/"),
        };
    };
}
