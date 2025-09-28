// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type ListPageData = {
		id: number;
		r: string;
		n: string;
		ic: number;
	};

	type AshOfWar = {
		id: number;
		name: string;
		iconID: number;
		rarity: string;
		caption: string[];
		loot: {
			locations: ItemLocation[];
			drops: ItemLocation[];
		};
	};

	type Armor = {
		id: number;
		name: string;
		iconID: number;
		rarity: string;
		type: string;
		weight: number;
		caption: string[];
		loot?: {
			locations?: ItemLocation[];
			drops?: ItemLocation[];
		};
	};

	type ArmorStats = {
		effects?: number[];
		guard: {
			cut: {
				physical: string;
				magic: string;
				fire: string;
				lightning: string;
				holy: string;
			};
		};
	};

	type Weapon = {
		id: number;
		name: string;
		iconID: number;
		rarity: string;
		type: string;
		weight: number;
		attackAttributes: string[];
		ash: WeaponAsh;
		caption: string[];
		requirements?: {
			strength?: number;
			dexterity?: number;
			intelligence?: number;
			arcane?: number;
			faith?: number;
		};
		stamina: number;
		guardAngle: number;
		loot?: {
			locations?: ItemLocation[];
			drops?: ItemLocation[];
		};
		stats: Record<number, WeaponStats>;
	};

	type WeaponAsh = {
		id: number;
		name: string;
		iconID: number;
	};

	type ItemLocation = {
		id: number;
		name: string;
	};

	type WeaponStats = {
		name: string;
		specialAttribute?: string;
		effects?: string[];
		damage: {
			base: {
				physical?: number;
				magic?: number;
				fire?: number;
				lightning?: number;
				holy?: number;
			};
		};
		guard: {
			cut: {
				physical?: number;
				magic?: number;
				fire?: number;
				lightning?: number;
				holy?: number;
			};
		};
	};
}

export {};
