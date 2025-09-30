<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';

	import { getSorceriesData } from '$lib/sorceries.js';

	const { sorceries } = getSorceriesData();

	let search = $state('');
	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = sorceries;

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
	<title>er-wiki - Sorceries</title>
</svelte:head>

<main class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />
	</div>

	<Grid items={filtered} category={'sorceries'} threshold={6022} />
</main>
