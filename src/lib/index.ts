export function rarityColor(rarity: number) {
	switch (rarity) {
		case 0:
			return '#D3D3D3';
		case 1:
			return '#B2FFB2';
		case 2:
			return '#A3C1E0';
		case 3:
			return '#FFD700';
		default:
			return '#D3D3D3';
	}
}

export function rarity(rarity: number) {
	switch (rarity) {
		case 0:
			return 'Default';
		case 1:
			return 'Common';
		case 2:
			return 'Rare';
		case 3:
			return 'Legendary';
		default:
			return 'UNKNOWN';
	}
}

export function specialAttribute(spAttribute: number) {
	switch (spAttribute) {
		case 0:
			return '';

		case 10:
			return 'Magic';
		case 11:
			return 'Fire';
		case 12:
			return 'Lightning';
		case 13:
			return 'Holy';

		case 20:
			return 'Poison';
		case 21:
			return 'Scarlet Rot';
		case 22:
			return 'Bloodloss';
		case 23:
			return 'Frostbite';
		case 24:
			return 'Sleep';
		case 25:
			return 'Madness';
		case 26:
			return 'Death Blight';
		default:
			return 'UNKNOWN';
	}
}

export function armorType(type: number) {
	switch (type) {
		case 0:
			return 'Head';
		case 1:
			return 'Body';
		case 2:
			return 'Arms';
		case 3:
			return 'Legs';
		default:
			return 'UNKNOWN';
	}
}

export function weaponType(type: number) {
	switch (type) {
		case 0:
			return 'Consumable';
		case 1:
			return 'Dagger';
		case 3:
			return 'Straight Sword';

		case 5:
			return 'Greatsword';

		case 7:
			return 'Colossal Sword';

		case 9:
			return 'Curved Sword';

		case 11:
			return 'Curved Greatsword';
		case 13:
			return 'Katana';
		case 14:
			return 'Twinblade';
		case 15:
			return 'Thrusting Sword';
		case 16:
			return 'Heavy Thrusting Sword';
		case 17:
			return 'Axe';

		case 19:
			return 'Greataxe';

		case 21:
			return 'Hammer';
		case 23:
			return 'Great Hammer';
		case 24:
			return 'Flail';
		case 25:
			return 'Spear';

		case 28:
			return 'Heavy Spear';
		case 29:
			return 'Halberd';

		case 31:
			return 'Scythe';

		case 35:
			return 'Fist';

		case 37:
			return 'Claw';

		case 39:
			return 'Whip';

		case 41:
			return 'Colossal Weapon';

		case 50:
			return 'Light Bow';
		case 51:
			return 'Bow';
		case 53:
			return 'Greatbow';

		case 55:
			return 'Crossbow';
		case 56:
			return 'Ballista';
		case 57:
			return 'Staff';

		case 61:
			return 'Seal';

		case 65:
			return 'Small Shield';

		case 67:
			return 'Medium Shield';

		case 69:
			return 'Greatshield';

		case 81:
			return 'Arrow';

		case 83:
			return 'Greatarrow';

		case 85:
			return 'Bolt';
		case 86:
			return 'Ballista Bolt';
		case 87:
			return 'Torch';
		case 88:
			return 'Hand-to-Hand';
		case 89:
			return 'Perfume Bottle';
		case 90:
			return 'Thrusting Shield';
		case 91:
			return 'Throwing Blade';
		case 92:
			return 'Reverse-hand Blade';
		case 93:
			return 'Light Greatsword';
		case 94:
			return 'Great Katana';
		case 95:
			return 'Beast Claw';
		default:
			return 'UNKNOWN';
	}
}
