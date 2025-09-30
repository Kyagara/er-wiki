<script lang="ts">
	let { item } = $props();
</script>

{#if item.loot}
	<ul>
		{#each item.loot.locations as loc}
			<li>
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a class="underline" href="#">{loc.name}</a>
			</li>
		{/each}

		{#each item.loot.drops as drop}
			<!-- svelte-ignore a11y_invalid_attribute -->
			<li>
				From <a class="underline" href="#"> {drop.name}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No location or enemy drop found.</p>
{/if}
