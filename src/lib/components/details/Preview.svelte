<script lang="ts">
	let { iconID } = $props();
</script>

<div class="overflow-hidden shadow-sm">
	<div class="flex w-full items-center justify-center bg-slate-900 p-4">
		<div class="flex flex-col items-center justify-center gap-4">
			<img
				class="max-h-full max-w-full object-contain"
				src={`/icons/${iconID}.webp`}
				alt="Icon"
				loading="lazy"
			/>
		</div>
	</div>
</div>
