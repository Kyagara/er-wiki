<script lang="ts">
	let { category } = $props();

	let title = $state(`er-wiki - ${category}`);

	let description = $state(
		`${category == 'Ashes' ? 'Ashes of War' : category || category == 'Spirits' ? 'Spirit ashes' : category} from Elden Ring and its DLC.`
	);

	let keywords = $state(
		`wiki, elden ring, shadow of the erdtree, ${category == 'Ashes' ? 'ashes of war, ashes' : category.toLowerCase() || category == 'Spirits' ? 'spirit, spirit ashes' : category.toLowerCase()}`
	);

	let page = $state(`https://er-wiki.pages.dev/${category}`);
	let image = 'https://er-wiki.pages.dev/er.gif';
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
