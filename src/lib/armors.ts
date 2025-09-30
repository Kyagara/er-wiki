import armorsData from '@data/Armors.json' with { type: 'json' };

export function getArmorsData() {
	const armors: Record<string, ListPageData[]> = {};

	Object.values(armorsData).forEach((a) => {
		if (!armors[a.type]) armors[a.type] = [];

		armors[a.type].push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { armors };
}

export function getArmor(id: string): Armor {
	return armorsData[id];
}
