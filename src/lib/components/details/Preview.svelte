<script lang="ts">
	let { iconID } = $props();
</script>

<div class="bg-slate-900 p-4">
	<img
		class="object-contain"
		src={`/icons/${iconID}.webp`}
		height="512"
		loading="eager"
		alt="Icon"
	/>
</div>
