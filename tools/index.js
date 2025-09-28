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
	ashes: {},
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
	if (
		!name ||
		!param.iconId ||
		param.iconId == '0' ||
		parseInt(param.ID, 10) < 10000 ||
		name.includes('test gem') ||
		name.includes('Ash of War:')
	)
		return;

	param.Name = name;

	const ash = format.ash(param, ashMsg, parsed);
	if (!ash) return;

	parsed.ashes[name] = ash;
});

writeFileSync('./data/Ashes.json', JSON.stringify(parsed.ashes, null, 2));

// Weapons

console.log('Parsing Weapons');

const weaponMsg = {
	effect: msgs['WeaponEffect'],
	info: msgs['WeaponInfo'],
	caption: msgs['WeaponCaption']
};

Object.entries(params['EquipParamWeapon.csv']).forEach(([id, wpn]) => {
	if (wpn.iconId === '0') return;

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
