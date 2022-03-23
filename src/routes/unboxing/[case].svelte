<script lang="ts" context="module">
	import UnboxingGame from '$games/Unboxing/index.svelte';
	import { currentCaseId, reelSlots } from '$games/Unboxing/state/game';
	import {
		Case,
		SingleCaseDocument,
		SingleCaseQuery,
		SingleCaseQueryVariables
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import type { LoadInput } from '$types/index';

	export async function load(loadOptions: LoadInput) {
		const { url } = loadOptions;
		const slug = url.pathname.split('/').pop();

		// create a query to get the specific case data
		let urqlClient = createSSRClient(loadOptions);

		const queryClient = createSSRQuery({ client: urqlClient });

		const caseQuery = await queryClient<
			SingleCaseQuery,
			SingleCaseQueryVariables
		>(SingleCaseDocument, { slug });

		const caseData = caseQuery.data?.getCase;

		const slots = caseData.slots;

		return {
			props: {
				caseData,
				slots
			}
		};
	}
</script>

<script lang="ts">
	export let caseData: Case;
	export let slots: any[];

	currentCaseId.set(caseData._id);
	reelSlots.setRaw(slots);
</script>

<UnboxingGame {caseData} />
