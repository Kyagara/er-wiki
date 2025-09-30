<script lang="ts">
	import LootLocations from '$lib/components/details/LootLocations.svelte';
	import Lore from '$lib/components/details/Lore.svelte';
	import Preview from '$lib/components/details/Preview.svelte';

	import { getTalisman } from '$lib/talismans.js';

	const { params } = $props();
	const talisman = getTalisman(params.id);
</script>

<svelte:head>
	<title>er-wiki - {talisman.name}</title>
</svelte:head>

<main class="mx-auto max-w-6xl px-4 py-2">
	<a class="italic underline opacity-90 hover:text-white" href="/talismans"> Go back </a>

	<div class="grid grid-cols-1 items-start gap-8 pt-4 lg:grid-cols-3">
		<div class="flex flex-col gap-2 lg:col-span-2">
			<Lore item={talisman} />

			<hr class="mb-4 opacity-20" />

			<div class="flex justify-between">
				<h1 class="flex items-center gap-2 text-xl font-bold text-white">ACQUISITION</h1>
			</div>

			<LootLocations item={talisman} />
		</div>

		<div class="lg:col-span-1">
			<Preview iconID={talisman.iconID} />
		</div>
	</div>
</main>
