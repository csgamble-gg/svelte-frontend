<script lang="ts" context="module">
	import CaseBattle from '$games/CaseBattle/index.svelte';
	import {
		Battle,
		GetBattleDocument,
		GetBattleQuery,
		GetBattleQueryVariables
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import type { LoadInput } from '$types/index';

	export async function load(loadOptions: LoadInput) {
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

		return {
			props: {
				battle: battleData
			}
		};
	}
</script>

<script lang="ts">
	export let battle: Battle;
</script>

<CaseBattle {battle} />
