<script lang="ts">
	let { item } = $props();
</script>

{#if item.loot}
	<ul>
		{#each item.loot.locations as loc}
			<li>
				<a class="underline" href="#">{loc.name}</a>
			</li>
		{/each}

		{#each item.loot.drops as drop}
			<li>
				From <a class="underline" href="#"> {drop.name}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No location or enemy drop found.</p>
{/if}
