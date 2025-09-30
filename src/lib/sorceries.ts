import sorceriesData from '@data/Sorceries.json' with { type: 'json' };

export function getSorceriesData() {
	const sorceries: ListPageData[] = [];

	Object.values(sorceriesData).forEach((a) => {
		if (!a.iconID) return;

		sorceries.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { sorceries };
}

export function getSorcery(id: String) {
	for (const key in sorceriesData) {
		if (sorceriesData[key].id == id) {
			return sorceriesData[key];
		}
	}

	return null;
}
