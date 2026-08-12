/**
 * @fileoverview Lookups for images whose paths come from data files.
 * @author Nicholas C. Zakas
 */

/*
 * `<Image>` needs an ImageMetadata object, which only comes from an actual
 * import -- a runtime string like `/images/books/foo.png` can't be optimized.
 * Book and reading-list covers are named in YAML, so `import.meta.glob` is used
 * to eagerly import the whole directory and build a filename -> metadata map.
 * This is Astro's documented approach for data-driven image paths.
 */

const bookImages = import.meta.glob(
    "../images/books/*.{png,jpg,jpeg,gif,webp,svg}",
    { eager: true }
);

const readingImages = import.meta.glob(
    "../images/reading/*.{png,jpg,jpeg,gif,webp,svg}",
    { eager: true }
);

/*
 * Post hero images are resolved here rather than through the collection schema's
 * `image()` helper on purpose. `image()` stores the full ImageMetadata in the
 * content data store, which makes Astro emit the untouched original alongside
 * the optimized variants -- roughly 12MB of files that no page ever references.
 * Nothing here needs the original's URL, only the derivatives, so the
 * frontmatter keeps a plain filename and the import happens in this module.
 *
 * This directory holds only hero images: every file in it is rendered, so no
 * unused original gets emitted.
 */
const heroImages = import.meta.glob(
    "../images/heroes/*.{png,jpg,jpeg,gif,webp,svg}",
    { eager: true }
);

/**
 * Builds a lookup keyed by bare filename.
 * @param {Object} modules The result of an `import.meta.glob()` call.
 * @returns {Map<string, ImageMetadata>} Filename to image metadata.
 */
function toLookup(modules) {
    return new Map(
        Object.entries(modules).map(([filePath, module]) => [
            filePath.slice(filePath.lastIndexOf("/") + 1),
            module.default
        ])
    );
}

const books = toLookup(bookImages);
const reading = toLookup(readingImages);
const heroes = toLookup(heroImages);

/**
 * Resolves an image referenced by filename in a data file.
 * @param {Map<string, ImageMetadata>} lookup The lookup to search.
 * @param {string} label The lookup name, used in error messages.
 * @param {string} filename The filename from the data file.
 * @returns {ImageMetadata} The imported image.
 * @throws {Error} If the file doesn't exist.
 */
function resolve(lookup, label, filename) {
    const image = lookup.get(filename);

    if (!image) {
        /*
         * Fail the build rather than emit a broken <img>. A typo in the YAML
         * used to 404 silently at runtime; now it's caught before deploy.
         */
        throw new Error(
            `Unknown ${label} image "${filename}". Expected a file in src/images/${label}/.`
        );
    }

    return image;
}

/**
 * Gets the cover image for a book listed in books.yml.
 * @param {string} filename The `image` value from the data file.
 * @returns {ImageMetadata} The imported image.
 */
export function getBookImage(filename) {
    return resolve(books, "books", filename);
}

/**
 * Gets the cover image for an entry in reading.yml.
 * @param {string} filename The `image` value from the data file.
 * @returns {ImageMetadata} The imported image.
 */
export function getReadingImage(filename) {
    return resolve(reading, "reading", filename);
}

/**
 * Gets the hero/Open Graph image named in a post's `image` frontmatter.
 * @param {string} filename The `image` value from the frontmatter.
 * @returns {ImageMetadata} The imported image.
 */
export function getHeroImage(filename) {
    return resolve(heroes, "heroes", filename);
}
