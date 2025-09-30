import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { readFileSync } from 'fs';

const data = {
	weapons: JSON.parse(readFileSync('./data/Weapons.json', 'utf8')),
	armors: JSON.parse(readFileSync('./data/Armors.json', 'utf8')),
	ashes: JSON.parse(readFileSync('./data/Skills.json', 'utf8')),
	talismans: JSON.parse(readFileSync('./data/Talismans.json', 'utf8')),
	consumables: JSON.parse(readFileSync('./data/Consumables.json', 'utf8')),
	sorceries: JSON.parse(readFileSync('./data/Sorceries.json', 'utf8')),
	incantations: JSON.parse(readFileSync('./data/Incantations.json', 'utf8')),
	spirits: JSON.parse(readFileSync('./data/Spirits.json', 'utf8'))
};

const wpnPages = Object.keys(data.weapons).map((item) => `/weapons/${item}`);
const armPages = Object.keys(data.armors).map((item) => `/armors/${item}`);
const ashesPages = Object.values(data.ashes)
	.filter((item) => item.iconID)
	.map((item) => `/ashes/${item.id}`);
const talismansPages = Object.values(data.talismans).map((item) => `/talismans/${item.id}`);
const consumablesPages = Object.values(data.consumables).map((item) => `/consumables/${item.id}`);
const sorceriesPages = Object.values(data.sorceries).map((item) => `/sorceries/${item.id}`);
const incantationsPages = Object.values(data.incantations).map(
	(item) => `/incantations/${item.id}`
);
const spiritsPages = Object.values(data.spirits).map((item) => `/spirits/${item.id}`);

const ids = [
	...wpnPages,
	...armPages,
	...ashesPages,
	...talismansPages,
	...consumablesPages,
	...sorceriesPages,
	...incantationsPages,
	...spiritsPages
];

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
