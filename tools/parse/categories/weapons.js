import details from '../details.js';

function parse(item, weaponMsg, store) {
	const parsed = {
		id: parseInt(item.ID, 10),
		name: item.Name,
		iconID: parseInt(item.iconId, 10),
		rarity: parseInt(item.rarity, 10),
		type: parseInt(item.wepType, 10),
		weight: parseFloat(item.weight),
		attackAttributes: [],
		skill: parseInt(item.swordArtsParamId) || 0,
		caption: [],
		requirements: {},
		loot: { locations: [], drops: [] },
		stamina: parseInt(item.attackBaseStamina, 10) || 0,
		guardAngle: parseInt(item.guardAngle, 10) || 0,
		stats: { 0: stats(item) }
	};

	parsed.stats[0].name = item.Name;

	const types = {
		isNormalAttackType: 'Standard',
		isBlowAttackType: 'Strike',
		isSlashAttackType: 'Slash',
		isThrustAttackType: 'Pierce'
	};
	Object.entries(types).forEach(([key, name]) => {
		const val = item[key];
		if (val == '0') return;
		parsed.attackAttributes.push(name);
	});

	const reqs = {
		Strength: 'strength',
		Agility: 'dexterity',
		Magic: 'intelligence',
		Luck: 'arcane',
		Faith: 'faith'
	};
	Object.entries(reqs).forEach(([key, name]) => {
		const val = parseInt(item['proper' + key], 10) || 0;
		if (val == 0) return;
		parsed.requirements[name] = val;
	});

	if (Object.keys(parsed.requirements).length == 0) delete parsed.requirements;

	Object.values(item.alternates).forEach((altWpn) => {
		const altStats = stats(altWpn);
		altStats.name = altWpn.Name;
		parsed.stats[altWpn.ID] = altStats;
	});

	skill(parsed, store);

	details.lore(parsed, weaponMsg);
	details.loot(parsed, store);

	Object.entries(parsed.stats).forEach(([id, s]) => {
		if (!s.effects) return;

		parsed.stats[id].effects = s.effects
			.map((e) => {
				return weaponMsg.effect[e];
			})
			.flat();

		if (parsed.stats[id].effects.length == 0) delete parsed.stats[id].effects;
	});

	return parsed;
}

function skill(parsedWeapon, parsed) {
	if (parsedWeapon.skill != 0) {
		let skillName = parsed.ashesIDs[parsedWeapon.skill];
		if (parsed.artsIDs[parsedWeapon.skill]) {
			skillName = parsed.artsIDs[parsedWeapon.skill];
		}

		if (skillName) {
			const skill = parsed.skills[skillName];
			if (skill) {
				if (skill.iconID) {
					delete skill.caption;
					delete skill.loot;
				}

				parsedWeapon.skill = skill;
			}
		}
	}

	if (parsedWeapon.skill == 0) delete parsedWeapon.skill;
}

function stats(wpn) {
	const stats = {
		specialAttribute: parseInt(wpn.spAttribute, 10),
		effects: [],
		damage: { base: {} },
		guard: { cut: {} }
	};

	if (!stats.specialAttribute) delete stats.specialAttribute;

	['0', '1', '2'].forEach((idx) => {
		const val = parseInt(wpn['spEffectMsgId' + idx], 10) || 0;
		if (val == 0 || val == -1) return;
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
		if (val == 0) return;
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
		if (val == 0) return;
		stats.guard.cut[name] = val;
	});

	return stats;
}

export default { parse };
