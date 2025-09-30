<script lang="ts">
	import { onMount } from 'svelte';

	const imgs = ['/home.webp', '/home2.webp'];
	let image = $state('');

	onMount(() => {
		image = imgs[Math.floor(Math.random() * imgs.length)];
	});
</script>

<svelte:head>
	<title>er-wiki</title>
</svelte:head>

<main class="h-[calc(100vh-2.5rem)]">
	{#if image}
		<img src={image} loading="eager" alt="important" class="mx-auto h-full w-auto object-cover" />
	{/if}
</main>

<img
	src="/er.gif"
	width="256"
	height="256"
	loading="eager"
	alt="important too"
	class="absolute right-0 bottom-0"
/>
