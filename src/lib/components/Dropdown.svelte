<script lang="ts">
	let { name = '', items, selected = $bindable() } = $props();
</script>

<div class="flex items-center gap-1">
	{#if name}
		<span class="text-sm font-medium text-gray-200"> {name}: </span>
	{/if}

	<select
		bind:value={selected}
		class="appearance-none border border-gray-700 bg-gray-900 py-1.5 pr-8 pl-3 text-sm text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
	>
		{#each Object.entries(items) as [name, id]}
			<option value={id}>{name}</option>
		{/each}
	</select>
</div>
