import details from '../details.js';

function parse(item, armorMsg, store) {
	if (item.iconIdM == 0 || item.iconIdF == 0) return;

	const parsed = {
		id: parseInt(item.ID, 10),
		name: item.Name,
		iconID: parseInt(item.iconIdM || item.iconIdF, 10),
		rarity: parseInt(item.rarity, 10),
		type: '',
		weight: parseFloat(item.weight),
		caption: [],
		loot: { locations: [], drops: [] }
	};

	if (item.headEquip == 1) parsed.type = 0;
	if (item.bodyEquip == 1) parsed.type = 1;
	if (item.armEquip == 1) parsed.type = 2;
	if (item.legEquip == 1) parsed.type = 3;

	details.lore(parsed, armorMsg);
	details.loot(parsed, store);

	return parsed;
}

export default { parse };
