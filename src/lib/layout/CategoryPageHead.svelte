<script lang="ts">
	import SvelteSeo from 'svelte-seo';

	let { category } = $props();
</script>

<SvelteSeo
	title={`er-wiki - ${category}`}
	description={`${category == 'Ashes' ? 'Ashes of War' : category} from Elden Ring and its DLC.`}
	canonical="https://er-wiki.pages.dev/{category.toLowerCase()}"
	keywords={`wiki, elden ring, shadow of the erdtree, ${category == 'Ashes' ? 'ashes of war, ashes' : category.toLowerCase()}`}
	openGraph={{
		title: `er-wiki - ${category == 'Ashes' ? 'Ashes of War' : category}`,
		description: `${category == 'Ashes' ? 'Ashes of War' : category} from Elden Ring and its DLC.`,
		image: `https://er-wiki.pages.dev/er.gif`,
		url: `https://er-wiki.pages.dev/${category.toLowerCase()}`,
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
		title: `er-wiki - ${category == 'Ashes' ? 'Ashes of War' : category}`,
		description: `${category == 'Ashes' ? 'Ashes of War' : category} from Elden Ring and its DLC.`,
		image: `https://er-wiki.pages.dev/icons/er.gif`
	}}
/>
