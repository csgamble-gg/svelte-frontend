<script lang="ts">
	import People from '$icons/svgs/People/People.svelte';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import sumArrayNumber from '$utils/sumArrayNumber';
	import { cashedIn, cashedOut } from './state/game';
</script>

<div
	class="w-full p-6 bg-primaryBg flex justify-evenly game-info rounded-large"
>
	<div class="flex items-center gap-x-3 w-1/3 justify-center">
		<People color="lightblue" />
		<span class="text-lightBlue70">Total in:</span>
		<span class="text-white font-semibold"
			>${convertPenniesToDollars(sumArrayNumber($cashedIn), 2)}</span
		>
	</div>
	<div class="flex items-center gap-x-3 w-1/3 justify-center">
		<People color="lightblue" />
		<span class="text-lightBlue70">Players remaining:</span>
		<span class="text-white font-semibold">{$cashedIn.length}</span>
	</div>
	<div class="flex items-center gap-x-3 w-1/3 justify-center">
		<People color="lightblue" />
		<span class="text-lightBlue70">Total out:</span>
		<span class="text-white font-semibold"
			>${convertPenniesToDollars(sumArrayNumber($cashedOut), 2)}</span
		>
	</div>
</div>

<style>
	.game-info {
		background: linear-gradient(
			180deg,
			#181d2d 0%,
			rgba(24, 29, 45, 0.69) 100%
		);
		box-shadow: inset 1px 1px 0px rgba(73, 86, 130, 0.12);
	}
</style>
