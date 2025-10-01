<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';
	import Toggle from '$lib/components/Toggle.svelte';

	import CategoryPageHead from '$lib/layout/CategoryPageHead.svelte';

	import { getArmorsData } from '$lib/armors.js';

	const { armors } = getArmorsData();

	let selected = $state('Body');
	let search = $state('');
	let filtered: ListPageData[] = $state([]);

	$effect(() => {
		let base = selected == 'All' ? Object.values(armors).flat() : (armors[selected] ?? []);

		const q = (search ?? '').trim().toLowerCase();
		if (!q) {
			filtered = base;
			return;
		}

		selected = 'All';

		filtered = base.filter((a) => {
			const name = (a.n ?? '').toLowerCase();
			return name.includes(q);
		});
	});
</script>

<CategoryPageHead category={'Armors'} />

<div class="mx-auto w-full max-w-5xl p-4">
	<div class="mb-4 flex min-h-12 items-center gap-3">
		<Search bind:search />

		<div class="flex min-h-9">
			<Toggle bind:selected value={'All'} />
			<Toggle bind:selected value={'Head'} />
			<Toggle bind:selected value={'Body'} />
			<Toggle bind:selected value={'Arms'} />
			<Toggle bind:selected value={'Legs'} />
		</div>
	</div>

	<Grid items={filtered} category={'armors'} threshold={13181} />
</div>
