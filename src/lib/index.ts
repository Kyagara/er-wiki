export function rarityColor(rarity: string) {
	switch (rarity) {
		case 'Default':
			return '#D3D3D3';
		case 'Common':
			return '#B2FFB2';
		case 'Rare':
			return '#A3C1E0';
		case 'Legendary':
			return '#FFD700';
		default:
			return '#D3D3D3';
	}
}
