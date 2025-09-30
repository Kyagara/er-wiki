<script lang="ts">
	import Navbar from '$lib/layout/Navbar.svelte';

	import '../app.css';

	let { children } = $props();
</script>

<Navbar />

<div class="pt-10">
	{@render children()}
</div>

<style>
	:global(body) {
		background-color: #030712;
		color: #e5e7eb;
	}
</style>
