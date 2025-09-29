import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { readFileSync } from 'fs';

const data = {
	weapons: JSON.parse(readFileSync('./data/Weapons.json', 'utf8')),
	armors: JSON.parse(readFileSync('./data/Armors.json', 'utf8')),
	ashes: JSON.parse(readFileSync('./data/Skills.json', 'utf8'))
};

const wpnPages = Object.keys(data.weapons).map((item) => `/weapons/${item}`);
const armPages = Object.keys(data.armors).map((item) => `/armors/${item}`);
const ashesPages = Object.values(data.ashes)
	.filter((item) => item.iconID)
	.map((item) => `/ashes/${item.id}`);

const ids = [...wpnPages, ...armPages, ...ashesPages];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// https://svelte.dev/docs/kit/integrations
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['/', ...ids]
		},
		alias: {
			'@data/*': './data/*'
		}
	}
};

export default config;
