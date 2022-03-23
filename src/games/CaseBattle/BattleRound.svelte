<script lang="ts">
	import Currency from '$components/Currency/Currency.svelte';
	import Card from '$components/generics/Card.svelte';
</script>

<Card>
	<div class="flex flex-row w-full ">
		<div class="flex p-10">
			<img
				src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg"
				width="51px"
				height="51px"
				alt=""
				class="rounded-md"
			/>
			<div class="ml-5">
				<span class="font-semibold text-white">Steam Name</span>
				<div class="flex flex-row gap-2 items-center">
					<div class="w-[20px] h-[20px]">
						<Currency type={'usd'} />
					</div>
					<span class="text-white">122.98</span>
				</div>
			</div>
		</div>
		<div class="flex flex-row justify-self-center items-center gap-3">
			{#each [0, 1, 2, 3, 4, 5] as i}
				<div class="bg-lightBlue10 w-24 h-24 rounded-lg" />
			{/each}
		</div>
		<div class="flex p-10">
			<div class="mr-5">
				<span class="font-semibold text-white">Steam Name</span>
				<div class="flex flex-row gap-2 items-center">
					<div class="w-[20px] h-[20px]">
						<Currency type={'usd'} />
					</div>
					<span class="text-white">122.98</span>
				</div>
			</div>
			<img
				src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg"
				width="51px"
				height="51px"
				alt=""
				class="rounded-md"
			/>
		</div>
	</div>
</Card>
