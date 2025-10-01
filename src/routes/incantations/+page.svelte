<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';

	import CategoryPageHead from '$lib/layout/CategoryPageHead.svelte';

	import { getIncantationsData } from '$lib/incantations.js';

	const { incantations } = getIncantationsData();

	let search = $state('');
	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = incantations;

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

<CategoryPageHead category={'Incantations'} />

<div class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />
	</div>

	<Grid items={filtered} category={'incantations'} threshold={6254} />
</div>
