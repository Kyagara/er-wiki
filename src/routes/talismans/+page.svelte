<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';

	import { getTalismansData } from '$lib/talismans.js';

	const { talismans } = getTalismansData();

	let search = $state('');
	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = talismans;

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
	<title>er-wiki - Talismans</title>
</svelte:head>

<main class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />
	</div>

	<Grid items={filtered} category={'talismans'} threshold={8319} />
</main>
