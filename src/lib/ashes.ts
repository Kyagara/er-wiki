import ashesData from '@data/Skills.json' with { type: 'json' };

export function getAshesData() {
	const ashes: ListPageData[] = [];

	Object.values(ashesData).forEach((a) => {
		if (!a.iconID) return;

		ashes.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { ashes };
}

export function getAsh(id: String) {
	for (const key in ashesData) {
		if (ashesData[key].id == id) {
			return ashesData[key];
		}
	}

	return null;
}
