<script lang="ts">
	import LootLocations from '$lib/components/details/LootLocations.svelte';
	import Lore from '$lib/components/details/Lore.svelte';
	import Preview from '$lib/components/details/Preview.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';

	import { getWeapon } from '$lib/weapons.js';
	import { rarityColor } from '$lib/index.js';

	const { params } = $props();
	const weapon = getWeapon(params.id);

	let current = $state(weapon.stats[0]);
	let statID = $state('0');

	$effect(() => {
		if (statID == weapon.id.toString(10) || Object.keys(weapon.stats).length == 1) return;

		current = weapon.stats[statID];
	});

	function formatReq() {
		let str: string[] = [];

		if (weapon.requirements?.strength) str.push('STR ' + weapon.requirements.strength);
		if (weapon.requirements?.dexterity) str.push('DEX ' + weapon.requirements.dexterity);
		if (weapon.requirements?.intelligence) str.push('INT ' + weapon.requirements.intelligence);
		if (weapon.requirements?.faith) str.push('FTH ' + weapon.requirements.faith);
		if (weapon.requirements?.arcane) str.push('ARC ' + weapon.requirements.arcane);

		return str.join(' | ');
	}
</script>

<svelte:head>
	<title>er-wiki - {weapon.name}</title>
</svelte:head>

<main class="mx-auto max-w-6xl px-4 py-2">
	<a class="italic underline opacity-90 hover:text-white" href="/weapons"> Go back </a>

	<div class="grid grid-cols-1 items-start gap-8 pt-4 lg:grid-cols-3">
		<div class="flex flex-col gap-2 lg:col-span-2">
			<Lore item={weapon} />

			<hr class="mb-4 opacity-20" />

			<div class="flex justify-between">
				<h1 class="flex items-center gap-2 text-xl font-bold text-white">
					STATS

					<span class="text-sm font-normal italic opacity-90"
						>{weapon.type} - {weapon.attackAttributes?.join(', ')}</span
					>
				</h1>

				{#if Object.keys(weapon.stats).length > 1}
					<Dropdown
						bind:selected={statID}
						items={Object.fromEntries(Object.entries(weapon.stats).map(([id, s]) => [s.name, id]))}
					/>
				{/if}
			</div>

			<div class="mb-4 flex flex-col gap-4">
				<div class="flex justify-between">
					<div>
						{#if weapon.requirements}
							<div>
								<span class="font-bold">Requirements:</span>
								{formatReq()}
							</div>
						{/if}

						{#if weapon.stamina}
							<div>
								<span class="font-bold">Stamina:</span>
								{weapon.stamina}
							</div>
						{/if}

						{#if weapon.weight}
							<div>
								<span class="font-bold">Weight:</span>
								{weapon.weight}
							</div>
						{/if}

						{#if current.specialAttribute}
							<div>
								<span class="font-bold">Attribute:</span>
								{current.specialAttribute}
							</div>
						{/if}
					</div>

					{#if current.effects}
						<div>
							<div class="font-bold">Effects:</div>
							<div class="flex flex-col">
								{#each current.effects as effect}
									<span>{effect}</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				{#if current}
					{@const baseDmg = current.damage.base}
					{@const baseGuardCut = current.guard.cut}

					<table>
						<thead>
							<tr>
								<th class="px-4 py-1 text-left"></th>
								<th class="px-4 py-1 text-left">Physical</th>
								<th class="px-4 py-1 text-left">Magic</th>
								<th class="px-4 py-1 text-left">Fire</th>
								<th class="px-4 py-1 text-left">Lightning</th>
								<th class="px-4 py-1 text-left">Holy</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<th scope="row" class="text-left">Base Damage</th>
								<td class="border border-gray-300 px-4 py-2">{baseDmg.physical || 0}</td>
								<td class="border border-gray-300 px-4 py-2">{baseDmg.magic || 0}</td>
								<td class="border border-gray-300 px-4 py-2">{baseDmg.fire || 0}</td>
								<td class="border border-gray-300 px-4 py-2">{baseDmg.lightning || 0}</td>
								<td class="border border-gray-300 px-4 py-2">{baseDmg.holy || 0}</td>
							</tr>

							{#if weapon.guardAngle}
								<tr>
									<th scope="row" class="text-left">Guard Cut</th>
									<td class="border border-gray-300 px-4 py-2">{baseGuardCut.physical || 0}</td>
									<td class="border border-gray-300 px-4 py-2">{baseGuardCut.magic || 0}</td>
									<td class="border border-gray-300 px-4 py-2">{baseGuardCut.fire || 0}</td>
									<td class="border border-gray-300 px-4 py-2">{baseGuardCut.lightning || 0}</td>
									<td class="border border-gray-300 px-4 py-2">{baseGuardCut.holy || 0}</td>
								</tr>
							{/if}
						</tbody>
					</table>
				{/if}
			</div>

			<hr class="my-4 opacity-20" />

			<div class="flex justify-between">
				<h1 class="flex items-center gap-2 text-xl font-bold text-white">ACQUISITION</h1>
			</div>

			<LootLocations item={weapon} />
		</div>

		<div
			class="flex flex-col items-center gap-2 border border-slate-700 bg-slate-900/70 p-2 lg:col-span-1"
		>
			<Preview iconID={weapon.iconID} />

			{#if weapon.skill}
				{#if weapon.skill.iconID}
					<img
						class="max-h-3/5 max-w-3/5 object-contain"
						src={`/icons/${weapon.skill.iconID}.webp`}
						alt="Icon"
						loading="lazy"
					/>
				{/if}

				{#if weapon.skill.iconID}
					<a
						href={`/ashes/${weapon.skill.id}`}
						class="py-2 underline"
						style={`color: ${rarityColor(weapon.rarity)};`}>{weapon.skill.name}</a
					>
				{:else}
					<Lore item={weapon.skill} title={false} />
				{/if}
			{/if}
		</div>
	</div>
</main>
