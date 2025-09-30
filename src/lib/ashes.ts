import skillsData from '@data/Skills.json' with { type: 'json' };

export function getAshesData() {
	const ashes: ListPageData[] = [];

	Object.values(skillsData).forEach((a) => {
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
	for (const key in skillsData) {
		if (skillsData[key].id == id) {
			return skillsData[key];
		}
	}

	return null;
}
