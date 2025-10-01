<script lang="ts">
	import LootLocations from '$lib/components/details/LootLocations.svelte';
	import Lore from '$lib/components/details/Lore.svelte';
	import Preview from '$lib/components/details/Preview.svelte';

	import ItemPageHead from '$lib/layout/ItemPageHead.svelte';

	import { getArmor } from '$lib/armors.js';

	const { params } = $props();
	const armor = getArmor(params.id);
</script>

<ItemPageHead item={armor} category="armors" type={'armor'} />

<main class="mx-auto max-w-6xl px-4 py-2">
	<a class="italic underline opacity-90 hover:text-white" href="/armors"> Go back </a>

	<div class="grid grid-cols-1 items-start gap-8 pt-4 lg:grid-cols-3">
		<div class="flex flex-col gap-2 lg:col-span-2">
			<Lore item={armor} />

			<hr class="mb-4 opacity-20" />

			<h1 class="flex items-center gap-2 text-xl font-bold text-white">STATS</h1>

			<div class="flex flex-col gap-4">
				<div class="flex justify-between">
					<div>
						{#if armor.weight}
							<div>
								<span class="font-bold">Weight:</span>
								{armor.weight}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<hr class="my-4 opacity-20" />

			<div class="flex justify-between">
				<h1 class="flex items-center gap-2 text-xl font-bold text-white">ACQUISITION</h1>
			</div>

			<LootLocations item={armor} />
		</div>

		<div class="lg:col-span-1">
			<Preview iconID={armor.iconID} />
		</div>
	</div>
</main>
