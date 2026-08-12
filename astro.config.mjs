import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
	site: 'https://humanwhocodes.com',
	image: {
		/*
		 * Sharp is the default, but naming it explicitly means the build fails
		 * loudly if sharp ever goes missing instead of quietly shipping
		 * unoptimized images.
		 */
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
	},
	vite: {
		plugins: [yaml()]
	},
	integrations: [mdx(), sitemap()],
});
