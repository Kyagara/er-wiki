<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';

	import { getAshesData } from '$lib/data.js';

	const ashes: ListPageData[] = [];

	Object.values(getAshesData()).forEach((a) => {
		if (!a.iconID) return;

		ashes.push({
			id: a.id,
			n: a.name,
			r: a.rarity,
			ic: a.iconID
		});
	});

	let search = $state('');

	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = ashes;

		const q = (search ?? '').trim().toLowerCase();
		if (!q) {
			filtered = base;
			return;
		}

		filtered = base.filter((a) => {
			const name = (a.n ?? '').toLowerCase();
			return name.includes(q);
		});
	});
</script>

<svelte:head>
	<title>er-wiki - Ashes of War</title>
</svelte:head>

<main class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />
	</div>

	<Grid items={filtered} category={'ashes'} threshold={8319} />
</main>
