import incantationsData from '@data/Incantations.json' with { type: 'json' };

export function getIncantationsData() {
	const incantations: ListPageData[] = [];

	Object.values(incantationsData).forEach((a) => {
		if (!a.iconID) return;

		incantations.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { incantations };
}

export function getIncantation(id: String) {
	for (const key in incantationsData) {
		if (incantationsData[key].id == id) {
			return incantationsData[key];
		}
	}

	return null;
}
