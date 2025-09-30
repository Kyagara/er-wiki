import talismansData from '@data/Talismans.json' with { type: 'json' };

export function getTalismansData() {
	const talismans: ListPageData[] = [];

	Object.values(talismansData).forEach((a) => {
		if (!a.iconID) return;

		talismans.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	return { talismans };
}

export function getTalisman(id: String) {
	for (const key in talismansData) {
		if (talismansData[key].id == id) {
			return talismansData[key];
		}
	}

	return null;
}
