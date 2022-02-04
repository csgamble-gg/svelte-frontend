<script lang="ts">
	import Divider from '$components/generics/Divider.svelte';
	const recentCrashes = new Array(32).fill('3.45');
</script>

<div class="flex items-center flex-nowrap overflow-hidden">
	<Divider vertical />
	<span class="text-lightblue mr-4" style="white-space: nowrap">
		Recent Crashes:
	</span>
	<div class="flex gap-x-3 overflow-hidden">
		{#each recentCrashes as crashNumber, index}
			<button class="recent-crash-block flex items-center justify-center">
				<span class="font-semibold text-yellowGold text-sm">
					x{crashNumber}
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.recent-crash-block {
		min-width: 61px;
		min-height: 32px;
		border: 1px solid #ffeb71;
		border-radius: 5px;
	}
</style>
