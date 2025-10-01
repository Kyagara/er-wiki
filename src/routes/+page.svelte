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
	<meta name="description" content="A wiki for Elden Ring and its DLC." />
	<link rel="canonical" href="https://er-wiki.pages.dev" />
	<meta name="keywords" content="wiki, elden ring, shadow of the erdtree" />

	<meta name="robots" content="index,follow" />
	<meta name="googlebot" content="index,follow" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="er-wiki" />
	<meta name="twitter:description" content="A wiki for Elden Ring and its DLC." />
	<meta name="twitter:image" content="https://er-wiki.pages.dev/icons/er.gif" />

	<meta property="og:title" content="er-wiki" />
	<meta property="og:description" content="A wiki for Elden Ring and its DLC." />
	<meta property="og:image" content="https://er-wiki.pages.dev/er.gif" />
	<meta property="og:url" content="https://er-wiki.pages.dev" />
	<meta property="og:type" content="website" />
	<meta property="og:image:url" content="https://er-wiki.pages.dev/er.gif" />
	<meta property="og:site_name" content="er-wiki" />
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
