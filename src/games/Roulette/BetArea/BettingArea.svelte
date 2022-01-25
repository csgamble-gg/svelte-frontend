<script lang="ts">
	import BetBlue from './BetBlue.svelte';
	import BetInput from './BetInput.svelte';
	import BetOrange from './BetOrange.svelte';
	import BetPurple from './BetPurple.svelte';
</script>

<div class="px-4 my-14 z-10">
	<BetInput />
	<div
		class="pt-16 flex flex-row sm:flex-nowrap flex-wrap gap-x-7 gap-y-7 justify-center"
	>
		<BetPurple />
		<BetBlue />
		<BetOrange />
	</div>
</div>
