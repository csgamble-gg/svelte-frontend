<script lang="ts" context="module">
	import UnboxingGame from '$games/Unboxing/index.svelte';
	import { currentCase, currentCaseId } from '$games/Unboxing/state/game';
	import {
		SingleCaseDocument,
		SingleCaseQuery,
		SingleCaseQueryVariables
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import type { LoadInput } from '$types/index';

	export async function load(loadOptions: LoadInput): Promise<{}> {
		const { url } = loadOptions;
		const slug = url.pathname.split('/').pop();

		// create a query to get the specific case data
		let urqlClient = createSSRClient(loadOptions);

		const queryClient = createSSRQuery({ client: urqlClient });

		const caseQuery = await queryClient<
			SingleCaseQuery,
			SingleCaseQueryVariables
		>(SingleCaseDocument, { input: { slug } });

		const caseData = caseQuery.data?.getCase;

		currentCase.set(caseData);
		currentCaseId.set(caseData._id);

		return {};
	}
</script>

<UnboxingGame />
