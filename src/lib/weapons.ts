import { weaponType } from './index.js';
import weaponsData from '@data/Weapons.json' with { type: 'json' };

export function getWeaponsData() {
	const weapons: Record<string, ListPageData[]> = {};
	const unsortedTypes: Record<string, number> = { All: 999 };

	Object.values(weaponsData).forEach((w) => {
		const type = weaponType(w.type);
		if (!unsortedTypes[type]) unsortedTypes[type] = w.type;
		if (!weapons[w.type]) weapons[w.type] = [];

		weapons[w.type].push({
			id: w.id,
			n: w.name,
			r: w.rarity,
			ic: w.iconID
		});
	});

	const sortedEntries = Object.entries(unsortedTypes).sort(([a], [b]) => a.localeCompare(b));
	const types = Object.fromEntries(sortedEntries);

	return { weapons, types };
}

export function getWeapon(id: string): Weapon {
	return weaponsData[id];
}
