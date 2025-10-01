<script lang="ts">
	import { rarityColor } from '$lib/index.js';

	let { items, category, threshold }: { items: any[]; category: string; threshold: number } =
		$props();
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
	{#each items as item (item.id)}
		<a
			href={`/${category}/${item.id}`}
			class="flex min-h-32 w-full flex-col items-center gap-2 border border-gray-800/50 p-2 hover:bg-gray-900"
		>
			<img
				class="max-h-32 object-contain"
				src={`/icons/${item.ic}.webp`}
				alt="Icon"
				loading={item.ic < threshold ? 'eager' : 'lazy'}
				fetchpriority={item.ic < threshold ? 'high' : 'low'}
			/>

			<div class="text-center text-sm font-semibold" style={`color: ${rarityColor(item.r || '')};`}>
				{item.n}
			</div>
		</a>
	{/each}
</div>
