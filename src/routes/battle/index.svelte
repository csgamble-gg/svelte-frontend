<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import { modals } from '$components/Modals/utils';
	import BattleRound from '$games/CaseBattle/BattleRound.svelte';
	import { activeBattles } from '$games/CaseBattle/state/battles';
	// import { battlesSubscription } from '$games/CaseBattle/subscriptionHandler';
	import {
		Battle,
		BattleCreatedDocument,
		BattleCreatedSubscription,
		GetBattlesDocument,
		GetBattlesQuery
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import { subscriptionClient } from '$libs/urql/urqlClient';
	import { getStores } from '$stores/user';
	import type { LoadInput } from '$types/index';
	import { Button } from '@csgamble-gg/nebula-ui';
	import { print } from 'graphql';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export async function load(loadOptions: LoadInput) {
		let urqlClient = createSSRClient(loadOptions);

		const queryClient = createSSRQuery({ client: urqlClient });

		const battlesQuery = await queryClient<GetBattlesQuery>(
			GetBattlesDocument,
			{}
		);

		const battles = battlesQuery.data.getBattles;

		return {
			props: {
				battles
			}
		};
	}
</script>

<script lang="ts">
	const { userStore } = getStores();
	export const battlesSubscription = () => {
		const unsubscribe =
			subscriptionClient.subscribe<BattleCreatedSubscription>(
				{
					query: print(BattleCreatedDocument)
				},
				{
					next: (value) => {
						const battle = value.data.battleCreated;

						if (battle) {
							activeBattles.addBattle(battle);
						}

						// if we created the battle, direct us to that battle
						if (battle.createdBy === get(userStore)._id) {
							goto(`/battle/${battle._id}`);
						}
					},
					complete: () => {},
					error: (error) => console.error(error)
				}
			);

		return {
			unsubscribe: () => {
				if (unsubscribe) {
					unsubscribe();
				}
			}
		};
	};
	export let battles: Battle[];

	onMount(() => {
		const { unsubscribe } = battlesSubscription();

		return () => unsubscribe();
	});

	activeBattles.set(battles);
</script>

<svelte:head>
	<title>CSGamble | Case Battle</title>
</svelte:head>

<GameContainer title="Case Battle">
	<div slot="header-content">
		<Button
			variant="secondary"
			label="Create Battle"
			on:click={() => modals.createBattle.open({})}
		/>
	</div>
	<div class="battles">
		{#each $activeBattles as battle}
			<BattleRound {battle} />
		{/each}
	</div>
</GameContainer>

<style>
	.create-battle {
		background: linear-gradient(
			321.77deg,
			#ffeb71 -4.42%,
			#eac76c 50.67%,
			rgba(218, 194, 94, 0.69) 102.42%
		);
		box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.25);
		border-radius: 6px;
		color: white;
		padding: 5px;
		font-size: 16px;
		line-height: 26px;
		font-weight: 600;
		height: 45px;
		width: 125px;
		margin-left: 24px;
	}

	.battles {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 16px;
		margin-top: 37px;
	}
</style>
