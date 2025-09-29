import enums from './enums.js';

function ash(param, ashMsg, parsed) {
	const parsedAsh = {
		id: parseInt(param.ID, 10),
		name: param.Name,
		iconID: parseInt(param.iconId, 10),
		rarity: enums.rarity(param.rarity),
		caption: [],
		loot: { locations: [], drops: [] }
	};

	parsedAsh.caption = lore(parsedAsh, ashMsg);
	if (parsedAsh.caption.length === 0) delete parsedAsh.caption;

	parsedAsh.loot = loot(parsedAsh, parsed);
	if (Object.keys(parsedAsh.loot).length == 0) delete parsedAsh.loot;

	return parsedAsh;
}

function weapon(wpn, weaponMsg, parsed) {
	const parsedWeapon = {
		id: parseInt(wpn.ID, 10),
		name: wpn.Name,
		iconID: parseInt(wpn.iconId, 10),
		rarity: enums.rarity(wpn.rarity),
		type: enums.weaponType(wpn.wepType),
		weight: parseFloat(wpn.weight),
		attackAttributes: [],
		skill: parseInt(wpn.swordArtsParamId) || 0,
		caption: [],
		requirements: {},
		loot: { locations: [], drops: [] },
		stamina: parseInt(wpn.attackBaseStamina, 10) || 0,
		guardAngle: parseInt(wpn.guardAngle, 10) || 0,
		stats: { 0: weaponStats(wpn) }
	};

	parsedWeapon.stats[0].name = wpn.Name;

	const types = {
		isNormalAttackType: 'Standard',
		isBlowAttackType: 'Strike',
		isSlashAttackType: 'Slash',
		isThrustAttackType: 'Pierce'
	};
	Object.entries(types).forEach(([key, name]) => {
		const val = wpn[key];
		if (val == '0') return;
		parsedWeapon.attackAttributes.push(name);
	});

	const reqs = {
		Strength: 'strength',
		Agility: 'dexterity',
		Magic: 'intelligence',
		Luck: 'arcane',
		Faith: 'faith'
	};
	Object.entries(reqs).forEach(([key, name]) => {
		const val = parseInt(wpn['proper' + key], 10) || 0;
		if (val == 0) return;
		parsedWeapon.requirements[name] = val;
	});

	if (Object.keys(parsedWeapon.requirements).length == 0) delete parsedWeapon.requirements;

	Object.values(wpn.alternates).forEach((altWpn) => {
		const stats = weaponStats(altWpn);
		stats.name = altWpn.Name;
		parsedWeapon.stats[altWpn.ID] = stats;
	});

	weaponSkill(parsedWeapon, parsed);

	parsedWeapon.caption = lore(parsedWeapon, weaponMsg);
	if (parsedWeapon.caption.length === 0) delete parsedWeapon.caption;

	parsedWeapon.loot = loot(parsedWeapon, parsed);
	if (Object.keys(parsedWeapon.loot).length == 0) delete parsedWeapon.loot;

	Object.entries(parsedWeapon.stats).forEach(([id, s]) => {
		if (!s.effects) return;

		parsedWeapon.stats[id].effects = s.effects
			.map((e) => {
				return weaponMsg.effect[e];
			})
			.flat();

		if (parsedWeapon.stats[id].effects.length === 0) delete parsedWeapon.stats[id].effects;
	});

	return parsedWeapon;
}

function weaponSkill(parsedWeapon, parsed) {
	if (parsedWeapon.skill != 0) {
		const ashName = parsed.ashesIDs[parsedWeapon.skill];
		if (ashName) {
			const ash = parsed.ashes[ashName];
			if (ash) {
				parsedWeapon.skill = ash;
			}
		}

		if (Number.isFinite(parsedWeapon.skill)) {
			const artName = parsed.artsIDs[parsedWeapon.skill];
			if (artName) {
				const art = parsed.arts[artName];
				if (art) {
					parsedWeapon.skill = art;
				}
			}
		}
	}

	if (parsedWeapon.skill == 0) delete parsedWeapon.skill;
}

function armor(armor, armorMsg, parsed) {
	if (armor.iconIdM == 0 || armor.iconIdF == 0) return;

	const parsedArmor = {
		id: parseInt(armor.ID, 10),
		name: armor.Name,
		iconID: parseInt(armor.iconIdM || armor.iconIdF, 10),
		rarity: enums.rarity(armor.rarity),
		type: '',
		weight: parseFloat(armor.weight),
		caption: [],
		loot: { locations: [], drops: [] }
	};

	if (armor.headEquip == 1) parsedArmor.type = 'Head';
	if (armor.bodyEquip == 1) parsedArmor.type = 'Body';
	if (armor.armEquip == 1) parsedArmor.type = 'Arms';
	if (armor.legEquip == 1) parsedArmor.type = 'Legs';

	parsedArmor.caption = lore(parsedArmor, armorMsg);
	if (parsedArmor.caption.length === 0) delete parsedArmor.caption;

	parsedArmor.loot = loot(parsedArmor, parsed);
	if (Object.keys(parsedArmor.loot).length == 0) delete parsedArmor.loot;

	return parsedArmor;
}

function weaponStats(wpn) {
	const stats = {
		specialAttribute: enums.spAttribute(wpn.spAttribute),
		effects: [],
		damage: { base: {} },
		guard: { cut: {} }
	};

	if (!stats.specialAttribute) delete stats.specialAttribute;

	['0', '1', '2'].forEach((idx) => {
		const val = parseInt(wpn['spEffectMsgId' + idx], 10) || 0;
		if (val === 0 || val === -1) return;
		stats.effects.push(val);
	});

	if (stats.effects.length == 0) delete stats.effects;

	const attackBase = {
		Physics: 'physical',
		Magic: 'magic',
		Fire: 'fire',
		Thunder: 'lightning',
		Dark: 'holy'
	};
	Object.entries(attackBase).forEach(([key, name]) => {
		const val = parseInt(wpn['attackBase' + key], 10) || 0;
		if (val === 0) return;
		stats.damage.base[name] = val;
	});

	const guardCutRate = {
		phys: 'physical',
		mag: 'magic',
		fire: 'fire',
		thun: 'lightning',
		dark: 'holy'
	};
	Object.entries(guardCutRate).forEach(([key, name]) => {
		const val = parseInt(wpn[key + 'GuardCutRate'], 10) || 0;
		if (val === 0) return;
		stats.guard.cut[name] = val;
	});

	return stats;
}

function lore(item, msg) {
	let caption = [];

	if (msg.info[item.id]) {
		msg.info[item.id].forEach((e) => {
			caption.push(e.split('\n\n'));
		});
	}

	if (msg.caption[item.id]) {
		msg.caption[item.id].forEach((e) => {
			caption.push(e.split('\n\n'));
		});
	}

	caption = caption.flat();
	return caption;
}

function loot(item, parsed) {
	const loot = { locations: [], drops: [] };

	Object.values(parsed.loot.locations).forEach((loc) => {
		if (!isValidLocData(item, loc)) return;
		loot.locations.push(loc);
	});

	loot.locations = loot.locations.filter(
		(obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
	);

	Object.values(parsed.loot.drops).forEach((loc) => {
		if (!isValidLocData(item, loc)) return;
		loot.drops.push(loc);
	});

	loot.drops = loot.drops.filter(
		(obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
	);

	if (loot.locations.length == 0) delete loot.locations;
	if (loot.drops.length == 0) delete loot.drops;

	return loot;
}

function isValidLocData(item, loc) {
	if (loc.itemID != item.id) return false;

	if (!(loc.name.includes('[') && loc.name.includes(']')) || !loc.name.includes(item.name))
		return false;

	return true;
}

export default { weapon, armor, ash };
