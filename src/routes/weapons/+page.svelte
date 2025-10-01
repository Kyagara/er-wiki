<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';

	import CategoryPageHead from '$lib/layout/CategoryPageHead.svelte';

	import { getWeaponsData } from '$lib/weapons.js';

	const { weapons, types } = getWeaponsData();

	let selected = $state(999);
	let search = $state('');
	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = selected == 999 ? Object.values(weapons).flat() : (weapons[selected] ?? []);

		const q = (search ?? '').trim().toLowerCase();
		if (!q) {
			filtered = base;
			return;
		}

		selected = 999;

		filtered = base.filter((w) => {
			const name = (w.n ?? '').toLowerCase();
			return name.includes(q);
		});
	});
</script>

<CategoryPageHead category={'Weapons'} />

<div class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />

		<Dropdown bind:selected name={'Type'} items={types} />
	</div>

	<Grid items={filtered} category={'weapons'} threshold={10050} />
</div>
