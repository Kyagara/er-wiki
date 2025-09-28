<script lang="ts">
	const menus = [
		{
			label: 'EQUIPMENT',
			items: [
				{ label: 'ASHES OF WAR', href: '/ashes' },
				{ label: 'ARMORS', href: '/armors' },
				{ label: 'WEAPONS', href: '/weapons' }
			]
		}
	];
</script>

<nav class="fixed inset-x-0 top-0 z-[1000]">
	<div class="flex items-center border-b border-gray-800 bg-gray-900">
		<a
			href="/"
			class="flex h-10 items-center px-3 text-sm font-bold hover:bg-gray-800 hover:text-white"
		>
			HOME
		</a>

		<div class="mx-auto max-w-5xl">
			<!-- center container -->
			<div class="flex h-10 items-center justify-center">
				<!-- menu list -->
				<ul class="flex h-full gap-6">
					{#each menus as menu}
						<li class="group relative">
							<!-- main label -->
							<button
								class="flex h-full items-center px-3 text-sm font-bold hover:bg-gray-700 hover:text-white"
							>
								{menu.label}
							</button>

							<!-- dropdown -->
							<div
								class="pointer-events-none absolute w-48 transform opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
							>
								<div class="overflow-hidden border border-gray-800 bg-gray-900 shadow-lg">
									{#each menu.items as item}
										<a
											href={item.href}
											class="block px-3 py-2 text-sm font-bold hover:bg-gray-700 hover:text-white"
										>
											{item.label}
										</a>
									{/each}
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</nav>
