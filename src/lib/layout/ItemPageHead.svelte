<script lang="ts">
	let { item, category, type } = $props();

	let title = $state(`er-wiki - ${item.name}`);

	let description = $state(
		item.caption && item.caption[0] ? item.caption[0] : 'A wiki for Elden Ring and its DLC.'
	);

	let keywords = $state(
		`wiki, elden ring, shadow of the erdtree, ${category}, ${type.toLowerCase()}, ${item.name.toLowerCase()}`
	);

	let page = $state(`https://er-wiki.pages.dev/${category}/${item.id}`);
	let image = $state(`https://er-wiki.pages.dev/icons/${item.iconID}.webp`);
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />
	<link rel="canonical" href={page} />
	<meta name="keywords" content={keywords} />

	<meta name="robots" content="index,follow" />
	<meta name="googlebot" content="index,follow" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={page} />
	<meta property="og:type" content="website" />
	<meta property="og:image:url" content={image} />
	<meta property="og:site_name" content="er-wiki" />
</svelte:head>
