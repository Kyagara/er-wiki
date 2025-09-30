import { writeFileSync } from 'fs';

import read from './read.js';

import weapons from './categories/weapons.js';
import skills from './categories/skills.js';
import armors from './categories/armors.js';
import talismans from './categories/talismans.js';
import consumables from './categories/consumables.js';
import sorceries from './categories/sorceries.js';
import incantations from './categories/incantations.js';
import spirits from './categories/spirits.js';

console.log('Reading and storing Params');
const params = read.params();

console.log('Reading and storing FMGs');
const msgs = read.msgs();

const store = {
	weapons: {},
	armors: {},
	talismans: {},
	incantations: {},
	sorceries: {},
	consumables: {},
	spirits: {},
	// Ashes and unique skills
	skills: {},
	ashesIDs: {},
	artsIDs: {},
	loot: { locations: {}, drops: {} }
};

console.log('Parsing:\n');

///
/// LOOT ///
///

console.log('Loot');

Object.entries(params['ItemLotParam_map.csv']).forEach(([id, param]) => {
	if (!param.lotItemId01) return;

	const locData = {
		id: parseInt(id, 10),
		name: param.Name,
		itemID: parseInt(param.lotItemId01, 10)
	};

	store.loot.locations[locData.id] = locData;
});

Object.entries(params['ItemLotParam_enemy.csv']).forEach(([id, param]) => {
	if (!param.lotItemId02) return;

	const locData = {
		id: parseInt(id, 10),
		name: param.Name,
		itemID: parseInt(param.lotItemId02, 10)
	};

	store.loot.drops[locData.id] = locData;
});

///
// ASHES OF WAR ///
///

console.log('Ashes');

const ashMsg = {
	info: msgs['GemInfo'],
	caption: msgs['GemCaption']
};

Object.values(params['EquipParamGem.csv']).forEach((param) => {
	const name = param.Name.replace('Ash of War: ', '');
	if (name.includes('test gem')) return;

	store.ashesIDs[param.ID] = name;

	if (param.ID < parseInt(10000, 10)) return;

	param.Name = name;

	const ash = skills.parse(param, ashMsg, store);
	if (ash.iconID) {
		store.skills[name] = ash;
	}
});

///
// ARTS (skills) ///
///

console.log('Arts (skills)');

const artMsg = {
	info: {},
	caption: msgs['ArtsCaption']
};

Object.values(params['SwordArtsParam.csv']).forEach((param) => {
	if (param.Name.includes('%null%')) return;

	store.artsIDs[param.ID] = param.Name;

	const art = skills.parse(param, artMsg, store);
	delete art.rarity;
	delete art.iconID;

	if (!store.skills[param.Name]) {
		store.skills[param.Name] = art;
	}
});

///
/// WEAPONS ///
///

console.log('Weapons');

const weaponMsg = {
	effect: msgs['WeaponEffect'],
	info: msgs['WeaponInfo'],
	caption: msgs['WeaponCaption']
};

Object.entries(params['EquipParamWeapon.csv']).forEach(([id, wpn]) => {
	if (wpn.iconId == 0) return;
	const weapon = weapons.parse(wpn, weaponMsg, store);
	store.weapons[id] = weapon;
});

///
/// ARMORS ///
///

console.log('Armors');

const armorMsg = {
	effect: msgs['ProtectorEffect'],
	info: msgs['ProtectorInfo'],
	caption: msgs['ProtectorCaption']
};

Object.entries(params['EquipParamProtector.csv']).forEach(([id, param]) => {
	if (param.Name.includes('Type ') || !(param.iconIdM || param.iconIdF)) return;
	if (
		param.Name == 'Head' ||
		param.Name == 'Body' ||
		param.Name == 'Arms' ||
		param.Name == 'Legs' ||
		param.ID == 920000
	)
		return;

	const armor = armors.parse(param, armorMsg, store);
	store.armors[id] = armor;
});

console.log('Talismans');

///
/// TALISMANS ///
///

const talismanMsg = {
	info: msgs['AccessoryInfo'],
	caption: msgs['AccessoryCaption']
};

Object.entries(params['EquipParamAccessory.csv']).forEach(([id, param]) => {
	const talisman = talismans.parse(param, talismanMsg, store);
	store.talismans[id] = talisman;
});

console.log('Goods (sorceries, incantations, consumables, spirit ashes)');

///
/// GOODS (sorceries, incantations, consumables, spirit ashes) ///
///

const goodsMsg = {
	info: msgs['GoodsInfo'],
	info2: msgs['Goods2Info'],
	caption: msgs['GoodsCaption']
};

Object.entries(params['EquipParamGoods.csv']).forEach(([id, param]) => {
	const name = param.Name;
	if (name.includes(' +') || name.includes('NPC ') || !param.iconId) return;

	if (name.startsWith('[Incantation]')) {
		param.Name = name.replace('[Incantation] ', '');
		const incantation = incantations.parse(param, goodsMsg, store);
		store.incantations[id] = incantation;
		return;
	}

	if (name.startsWith('[Sorcery]')) {
		param.Name = name.replace('[Sorcery] ', '');
		const sorcery = sorceries.parse(param, goodsMsg, store);
		store.sorceries[id] = sorcery;
		return;
	}

	if (param.goodsUseAnim == 34) {
		const spirit = spirits.parse(param, goodsMsg, store);
		store.spirits[id] = spirit;
		return;
	}

	if (param.isConsume == 1 && param.goodsType != 2) {
		const consumable = consumables.parse(param, goodsMsg, store);
		store.consumables[id] = consumable;
		return;
	}
});

///
/// DUMP
///

console.log('\nSaving');

writeFileSync('./data/Skills.json', JSON.stringify(store.skills, null, 2));

writeFileSync('./data/Weapons.json', JSON.stringify(store.weapons, null, 2));

writeFileSync('./data/Armors.json', JSON.stringify(store.armors, null, 2));

writeFileSync('./data/Talismans.json', JSON.stringify(store.talismans, null, 2));

writeFileSync('./data/Incantations.json', JSON.stringify(store.incantations, null, 2));
writeFileSync('./data/Sorceries.json', JSON.stringify(store.sorceries, null, 2));
writeFileSync('./data/Spirits.json', JSON.stringify(store.spirits, null, 2));
writeFileSync('./data/Consumables.json', JSON.stringify(store.consumables, null, 2));
