import ashesData from '@data/Skills.json' with { type: 'json' };
import armorsData from '@data/Armors.json' with { type: 'json' };
import weaponsData from '@data/Weapons.json' with { type: 'json' };

export const getAshesData = () => ashesData;
export const getArmorsData = () => armorsData;
export const getWeaponsData = () => weaponsData;
