function lore(item, msg) {
	if (msg.info[item.id]) {
		msg.info[item.id].forEach((e) => {
			item.caption.push(e.split('\n\n'));
		});
	}

	if (msg.caption[item.id]) {
		msg.caption[item.id].forEach((e) => {
			item.caption.push(e.split('\n\n'));
		});
	}

	item.caption = item.caption.flat();

	if (item.caption.length == 0) delete item.caption;
}

function loot(item, parsed) {
	Object.values(parsed.loot.locations).forEach((loc) => {
		if (!isValidLocData(item, loc)) return;
		item.loot.locations.push(loc);
	});

	item.loot.locations = item.loot.locations.filter(
		(obj, index, self) => index == self.findIndex((t) => t.name == obj.name)
	);

	Object.values(parsed.loot.drops).forEach((loc) => {
		if (!isValidLocData(item, loc)) return;
		item.loot.drops.push(loc);
	});

	item.loot.drops = item.loot.drops.filter(
		(obj, index, self) => index == self.findIndex((t) => t.name == obj.name)
	);

	if (item.loot.locations.length == 0) delete item.loot.locations;
	if (item.loot.drops.length == 0) delete item.loot.drops;

	if (Object.keys(item.loot).length == 0) delete item.loot;
}

function isValidLocData(item, loc) {
	if (loc.itemID != item.id) return false;

	if (!(loc.name.includes('[') && loc.name.includes(']')) || !loc.name.includes(item.name))
		return false;

	return true;
}

export default { loot, lore };
