import details from '../details.js';

function parse(item, talismanMsg, store) {
	const parsed = {
		id: parseInt(item.ID, 10),
		name: item.Name,
		iconID: parseInt(item.iconId, 10),
		rarity: parseInt(item.rarity, 10),
		weight: parseFloat(item.weight),
		caption: [],
		loot: { locations: [], drops: [] }
	};

	details.lore(parsed, talismanMsg);
	details.loot(parsed, store);

	return parsed;
}

export default { parse };
