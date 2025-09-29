<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';

	import { getWeaponsData } from '$lib/data.js';

	const weapons: Record<string, ListPageData[]> = {};
	const unsortedTypes: Record<string, string> = { All: 'All' };

	Object.values(getWeaponsData()).forEach((w) => {
		if (!unsortedTypes[w.type]) unsortedTypes[w.type] = w.type;
		if (!weapons[w.type]) weapons[w.type] = [];

		weapons[w.type].push({
			id: w.id,
			n: w.name,
			r: w.rarity,
			ic: w.iconID
		});
	});

	const sortedEntries = Object.entries(unsortedTypes).sort(([a], [b]) => a.localeCompare(b));
	const types = Object.fromEntries(sortedEntries);

	let selected = $state('All');
	let search = $state('');

	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = selected == 'All' ? Object.values(weapons).flat() : (weapons[selected] ?? []);

		const q = (search ?? '').trim().toLowerCase();
		if (!q) {
			filtered = base;
			return;
		}

		selected = 'All';

		filtered = base.filter((w) => {
			const name = (w.n ?? '').toLowerCase();
			return name.includes(q);
		});
	});
</script>

<svelte:head>
	<title>er-wiki - Weapons</title>
</svelte:head>

<main class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />

		<Dropdown bind:selected name={'Type'} items={types} />
	</div>

	<Grid items={filtered} category={'weapons'} threshold={10050} />
</main>
