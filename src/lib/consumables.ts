import consumablesData from '@data/Consumables.json' with { type: 'json' };

export function getConsumablesData() {
	const consumables: ListPageData[] = [];

	Object.values(consumablesData).forEach((a) => {
		if (!a.iconID) return;

		consumables.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { consumables };
}

export function getConsumable(id: String) {
	for (const key in consumablesData) {
		if (consumablesData[key].id == id) {
			return consumablesData[key];
		}
	}

	return null;
}
