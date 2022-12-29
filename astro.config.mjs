import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
	site: 'https://money.humanwhocodes.com',
	vite: {
		plugins: [yaml()]
	},
	integrations: [mdx(), sitemap()],
});
