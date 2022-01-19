<script lang='ts'>
	import { slide } from 'svelte/transition';
	import { operationStore, query } from '@urql/svelte';
	import { GetRecentGamesDocument, GetRecentGamesQuery } from '../../generated/graphql';
	import BluePlanet from '../../icons/BluePlanet.svg';
	import OrangePlanet from '../../icons/OrangePlanet.svg';
	import PurplePlanet from '../../icons/PurplePlanet.svg';
	import Skeleton from '../generics/Skeleton.svelte';

	const recentRolls = operationStore<GetRecentGamesQuery>(
		GetRecentGamesDocument,
		{
			input: {
				gameType: 'roulette',
				limit: 6
			}
		}
	);

	query(recentRolls);
</script>

<div class='flex flex-col wrapper'>
	<div class='placeholder-roll' />
	{#if $recentRolls.fetching}
		{#each [1, 2, 3, 4, 5, 6] as placeholder}
			<Skeleton loading={true} circle={true}>
				<div class='' style='width: 37.48px; height: 37.48px;' />
			</Skeleton>
		{/each}
	{:else}
		{#each $recentRolls.data.getRecentGames as recentRoll}
			<div transition:slide>
				{#if recentRoll.rollValue === 28}
					<img
						src={OrangePlanet}
						alt=''
						class='bg-cover bg-center border-0'
						width='37.48px'
						height='37.48px'
					/>
				{:else if recentRoll.rollValue % 2 === 0}
					<img
						src={PurplePlanet}
						alt=''
						class='bg-cover bg-center border-0'
						width='37.48px'
						height='37.48px'
					/>
				{:else}
					<img
						alt=''
						src={BluePlanet}
						class='bg-cover bg-center border-0'
						width='37.48px'
						height='37.48px'
					/>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style>
    .placeholder-roll {
        width: 37.48px;
        height: 37.48px;
        opacity: 0.5;
        border: 1px dashed #9cbbff;
        box-sizing: border-box;
        transform: rotate(-172.44deg);
        border-radius: 999px;
    }

    .wrapper {
        width: 37.48px;
        gap: 16.52px;
        -webkit-mask-image: -webkit-linear-gradient(
                272deg,
                #c4c4c4 0%,
                rgba(196, 196, 196, 0.4) 87.54%,
                rgba(196, 196, 196, 0.15) 92.88%,
                rgba(196, 196, 196, 0) 99.03%
        );
    }
</style>
