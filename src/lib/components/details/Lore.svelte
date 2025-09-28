<script lang="ts">
	import { rarityColor } from '$lib/index.js';

	let { item } = $props();
</script>

<h1
	class="text-xl font-bold"
	style={`color: ${rarityColor(item.rarity || '')};`}
	title={item.rarity}
>
	{item.name}
</h1>

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
