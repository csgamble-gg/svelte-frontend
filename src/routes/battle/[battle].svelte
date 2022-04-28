<script lang="ts" context="module">
	import CaseBattle from '$games/CaseBattle/index.svelte';
	import { currentBattle, playerWins } from '$games/CaseBattle/state/game';
	import {
		GetBattleDocument,
		GetBattleQuery,
		GetBattleQueryVariables
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import type { LoadInput } from '$types/index';

	export async function load(loadOptions: LoadInput): Promise<{}> {
		const { url } = loadOptions;
		const id = url.pathname.split('/').pop();

		// create a query to get the specific case data
		let urqlClient = createSSRClient(loadOptions);

		const queryClient = createSSRQuery({ client: urqlClient });

		const battleQuery = await queryClient<
			GetBattleQuery,
			GetBattleQueryVariables
		>(GetBattleDocument, { getBattleId: id });

		const battleData = battleQuery.data.getBattle;

		currentBattle.set(battleData);

		const defaultPlayerWins = {};
		battleData.rounds.forEach((round) => {
			round.drops.forEach((drop) => {
				if (!drop.winningSkin) {
					defaultPlayerWins[drop.playerId] = [
						...(defaultPlayerWins[drop.playerId] || [])
					];
					return;
				}
				defaultPlayerWins[drop.playerId] = [
					...(defaultPlayerWins[drop.playerId] || []),
					drop.winningSkin
				];
			});
		});
		playerWins.set(defaultPlayerWins);

		return {};
	}
</script>

<script lang="ts">
</script>

<CaseBattle />
