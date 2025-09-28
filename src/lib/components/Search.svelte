<script lang="ts">
	let { search = $bindable() } = $props();
</script>

<input
	class="appearance-none border border-gray-700 bg-gray-900 py-1.5 pr-8 pl-3 text-sm text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
	type="search"
	placeholder="Search..."
	bind:value={search}
/>
