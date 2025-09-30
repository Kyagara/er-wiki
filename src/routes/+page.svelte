<script lang="ts">
	import { onMount } from 'svelte';

	import SvelteSeo from 'svelte-seo';

	const imgs = ['/home.webp', '/home2.webp'];
	let image = $state('');

	onMount(() => {
		image = imgs[Math.floor(Math.random() * imgs.length)];
	});
</script>

<SvelteSeo
	title={`er-wiki`}
	description={`A wiki for Elden Ring and its DLC.`}
	canonical="https://er-wiki.pages.dev"
	keywords={`wiki, elden ring, shadow of the erdtree`}
	openGraph={{
		title: `er-wiki`,
		description: `A wiki Elden Ring and its DLC.`,
		image: `https://er-wiki.pages.dev/er.gif`,
		url: `https://er-wiki.pages.dev`,
		type: 'website',
		images: [
			{
				url: `https://er-wiki.pages.dev/er.gif`
			}
		],
		site_name: 'er-wiki'
	}}
	twitter={{
		card: 'summary',
		title: `er-wiki`,
		description: `A wiki for Elden Ring and its DLC.`,
		image: `https://er-wiki.pages.dev/icons/er.gif`
	}}
/>

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
