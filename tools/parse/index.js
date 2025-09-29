import { writeFileSync } from 'fs';

import read from './read.js';
import format from './format.js';

console.log('Reading Params csvs');
const params = read.params();
console.log('Reading FMGs');
const msgs = read.msgs();

const parsed = {
	weapons: {},
	armors: {},
	// Ashes and unique skills
	skills: {},
	ashesIDs: {},
	artsIDs: {},
	loot: { locations: {}, drops: {} }
};

// Loot

console.log('Parsing loot');

Object.entries(params['ItemLotParam_map.csv']).forEach(([id, param]) => {
	if (id == '0' || param.lotItemId01 == '0' || !param.Name) return;

	const locData = {
		id: parseInt(id, 10),
		name: param.Name,
		itemID: parseInt(param.lotItemId01, 10)
	};

	parsed.loot.locations[locData.id] = locData;
});

Object.entries(params['ItemLotParam_enemy.csv']).forEach(([id, param]) => {
	if (id == '0' || param.lotItemId02 == '0' || !param.Name) return;

	const locData = {
		id: parseInt(id, 10),
		name: param.Name,
		itemID: parseInt(param.lotItemId02, 10)
	};

	parsed.loot.drops[locData.id] = locData;
});

// Ashes of War

console.log('Parsing Ashes');

const ashMsg = {
	info: msgs['GemInfo'],
	caption: msgs['GemCaption']
};

Object.values(params['EquipParamGem.csv']).forEach((param) => {
	const name = param.Name.replace('Ash of War: ', '');
	if (!name || name.includes('test gem')) return;

	parsed.ashesIDs[param.ID] = name;

	if (param.ID < parseInt(10000, 10)) return;

	param.Name = name;

	const ash = format.skill(param, ashMsg, parsed);
	if (!ash) return;

	if (ash.iconID) {
		parsed.skills[name] = ash;
	}
});

// Arts (skills)

console.log('Parsing Arts (skills)');

const artMsg = {
	info: {},
	caption: msgs['ArtsCaption']
};

Object.values(params['SwordArtsParam.csv']).forEach((param) => {
	if (!param.Name || param.Name.includes('%null%')) return;

	parsed.artsIDs[param.ID] = param.Name;

	const art = format.skill(param, artMsg, parsed);
	if (!art) return;

	delete art.rarity;
	delete art.iconID;

	if (!parsed.skills[param.Name]) {
		parsed.skills[param.Name] = art;
	}
});

writeFileSync('./data/Skills.json', JSON.stringify(parsed.skills, null, 2));

// Weapons

console.log('Parsing Weapons');

const weaponMsg = {
	effect: msgs['WeaponEffect'],
	info: msgs['WeaponInfo'],
	caption: msgs['WeaponCaption']
};

Object.entries(params['EquipParamWeapon.csv']).forEach(([id, wpn]) => {
	if (wpn.iconId == '0') return;

	const weapon = format.weapon(wpn, weaponMsg, parsed);
	if (!weapon) return;

	parsed.weapons[id] = weapon;
});

writeFileSync('./data/Weapons.json', JSON.stringify(parsed.weapons, null, 2));

// Armor

console.log('Parsing Armors');

const armorMsg = {
	effect: msgs['ProtectorEffect'],
	info: msgs['ProtectorInfo'],
	caption: msgs['ProtectorCaption']
};

Object.entries(params['EquipParamProtector.csv']).forEach(([id, param]) => {
	if (!param.Name || param.Name.includes('Type ') || !(param.iconIdM || param.iconIdF)) return;
	if (
		param.Name == 'Head' ||
		param.Name == 'Body' ||
		param.Name == 'Arms' ||
		param.Name == 'Legs' ||
		param.ID == 920000
	)
		return;

	const armor = format.armor(param, armorMsg, parsed);
	if (!armor) return;

	parsed.armors[id] = armor;
});

writeFileSync('./data/Armors.json', JSON.stringify(parsed.armors, null, 2));
