<script lang="ts">
	import { rarityColor } from '$lib/index.js';

	let { item, title = true } = $props();
</script>

{#if title}
	<h1
		class="text-xl font-bold"
		style={`color: ${rarityColor(item.rarity || '')};`}
		title={item.rarity}
	>
		{item.name}
	</h1>
{/if}

<p>
	{#if item.caption}
		{#each item.caption as caption}
			{#each caption.split('\n') as c}
				{c}
				<br />
			{/each}
			<br />
		{/each}
	{/if}
</p>
