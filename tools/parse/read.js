import { readFileSync, readdirSync } from 'fs';

import Papa from 'papaparse';

const ENGLISH_MSG_PATH = './data/msg/engus/item';
const PARAMS_PATH = './data/params';

function params() {
	const params = {};
	const dir = readdirSync(PARAMS_PATH).filter(
		(f) =>
			f.includes('Weapon') ||
			f.includes('Gem') ||
			f.includes('LotParam') ||
			f.includes('Equip') ||
			f.includes('SwordArts')
	);

	dir.forEach((filename) => {
		const filepath = `${PARAMS_PATH}/${filename}`;
		const strContent = readFileSync(filepath, 'utf8');

		const parsedFile = {};

		Papa.parse(strContent, {
			header: true,
			delimiter: ',',
			quoteChar: '',
			step: ({ data }) => {
				if (!data.ID || data.ID == '-1' || !data.Name || data.Name.includes('[NPC]')) return;

				if (filename.includes('Weapon')) {
					data.alternates = [];
					if (data.originEquipWep != data.ID && parsedFile[data.originEquipWep]) {
						parsedFile[data.originEquipWep].alternates.push(data);
						return;
					}
				}

				parsedFile[data.ID] = data;
			}
		});

		params[filename] = parsedFile;
	});

	return params;
}

function msgs() {
	const msgs = {};

	const dir = readdirSync(ENGLISH_MSG_PATH).filter(
		(f) => !f.includes('_dlc02') && !f.includes('Name')
	);

	dir.forEach((filename) => {
		const filepath = `${ENGLISH_MSG_PATH}/${filename}`;
		const content = readFileSync(filepath, 'utf8');

		const param = filename
			.replace('_dlc01', '')
			.replace('.fmg.txt', '')
			.replace(/^\d+ - /, '');

		if (!msgs[param]) msgs[param] = {};

		const fmgs = parseFMG(content);

		msgs[param] = { ...msgs[param], ...fmgs };
	});

	return msgs;
}

function parseFMG(content) {
	const sections = content.split(/(\d+;)/);
	const entries = {};

	for (let i = 1; i < sections.length; i += 2) {
		const id = sections[i].replace(';', '');
		const text = sections[i + 1] ? sections[i + 1].trim() : null;

		if (!text) continue;

		if (!entries[id]) entries[id] = [];

		entries[id].push(text);
	}

	return entries;
}

export default { params, msgs };
