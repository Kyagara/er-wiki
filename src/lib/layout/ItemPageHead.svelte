<script lang="ts">
	import SvelteSeo from 'svelte-seo';

	let { item, category, type } = $props();
</script>

<SvelteSeo
	title={`er-wiki - ${item.name}`}
	description={item.caption && item.caption[0]
		? item.caption[0]
		: 'A wiki for Elden Ring and its DLC.'}
	canonical="https://er-wiki.pages.dev/{category}/{item.id}"
	keywords={`wiki, elden ring, shadow of the erdtree, ${category}, ${type.toLowerCase()}, ${item.name.toLowerCase()}`}
	openGraph={{
		title: `er-wiki - ${item.name}`,
		description:
			item.caption && item.caption[0] ? item.caption[0] : 'A wiki for Elden Ring and its DLC.',
		image: `https://er-wiki.pages.dev/icons/${item.iconID}.webp`,
		url: `https://er-wiki.pages.dev/${category}/${item.id}`,
		type: 'website',
		images: [
			{
				url: `https://er-wiki.pages.dev/icons/${item.iconID}.webp`
			}
		],
		site_name: 'er-wiki'
	}}
	twitter={{
		card: 'summary',
		title: `er-wiki - ${item.name}`,
		description:
			item.caption && item.caption[0] ? item.caption[0] : 'A wiki for Elden Ring and its DLC.',
		image: `https://er-wiki.pages.dev/icons/${item.iconID}.webp`
	}}
/>
