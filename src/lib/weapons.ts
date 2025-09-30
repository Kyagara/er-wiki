import weaponsData from '@data/Weapons.json' with { type: 'json' };

export function getWeaponsData() {
	const weapons: Record<string, ListPageData[]> = {};
	const unsortedTypes: Record<string, string> = { All: 'All' };

	Object.values(weaponsData).forEach((w) => {
		if (!unsortedTypes[w.type]) unsortedTypes[w.type] = w.type;
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
