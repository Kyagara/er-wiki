<script lang="ts">
	let { selected = $bindable(), value } = $props();

	const toggle = (option: string) => {
		selected = option;
	};
</script>

<button
	class={`px-4 ${selected === value ? 'bg-indigo-500/70 text-white' : 'cursor-pointer bg-gray-900 text-white hover:bg-gray-700'}`}
	onclick={() => toggle(value)}
>
	{value}
</button>
