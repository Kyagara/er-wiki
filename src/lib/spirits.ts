import spiritsData from '@data/Spirits.json' with { type: 'json' };

export function getSpiritsData() {
	const spirits: ListPageData[] = [];

	Object.values(spiritsData).forEach((a) => {
		if (!a.iconID) return;

		spirits.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { spirits };
}

export function getSpirit(id: String) {
	for (const key in spiritsData) {
		if (spiritsData[key].id == id) {
			return spiritsData[key];
		}
	}

	return null;
}
