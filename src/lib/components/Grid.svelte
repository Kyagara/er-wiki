<script lang="ts">
	import { rarityColor } from '$lib/index.js';

	let { items, category, threshold }: { items: any[]; category: string; threshold: number } =
		$props();
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
	{#each items as item (item.id)}
		<a
			href={`/${category}/${item.id}`}
			class="flex w-full flex-col items-center gap-2 border border-gray-800/50 p-2 hover:bg-gray-900"
			aria-label={item.n}
		>
			<img
				class="max-h-32 w-full rounded-md object-contain"
				src={`/icons/${item.ic}.webp`}
				alt="Icon"
				loading={item.ic < threshold ? 'eager' : 'lazy'}
				fetchpriority={item.ic < threshold ? 'high' : 'low'}
				height="128"
			/>

			<div
				class="w-full truncate text-center text-sm font-semibold text-gray-200"
				style={`color: ${rarityColor(item.r || '')};`}
			>
				{item.n}
			</div>
		</a>
	{/each}
</div>
