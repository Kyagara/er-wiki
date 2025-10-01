<script lang="ts">
	import Navbar from '$lib/layout/Navbar.svelte';

	import '../app.css';

	let { children } = $props();
</script>

<Navbar />

<main class="pt-10">
	{@render children()}
</main>

<style>
	:global(body) {
		background-color: #030712;
		color: #e5e7eb;
	}
</style>
