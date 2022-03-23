<script lang="ts" context="module">
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import CaseCard from '$components/generics/CaseCard.svelte';
	import {
		AllCasesDocument,
		AllCasesQuery,
		AllCasesQueryVariables,
		Case,
		CaseGroup
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import { createQuery } from '$libs/urql/urqlClient';
	import type { LoadInput } from '$types/index';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { toUpper } from 'lodash-es';
	import { get, writable } from 'svelte/store';

	export async function load(loadOptions: LoadInput) {
		let urqlClient = createSSRClient(loadOptions);

		const queryClient = createSSRQuery({ client: urqlClient });

		const casesQuery = await queryClient<
			AllCasesQuery,
			AllCasesQueryVariables
		>(AllCasesDocument, {});

		const cases = casesQuery.data?.getCases;

		return {
			props: {
				cases
			}
		};
	}
</script>

<script lang="ts">
	export let cases: Case[];

	// TODO: make this an endpoint for "case-groups"
	const filterOptions = ['New', 'Featured', '10%'];
	const activeFilter = writable<string>('NEW');
	let caseSearch: string | undefined = undefined;

	const { query } = createQuery<AllCasesQuery, AllCasesQueryVariables>(
		AllCasesDocument
	);

	const { data, loading, error, refetch } = query({
		input: {
			// FIX: this type
			group: get(activeFilter) as CaseGroup,
			name: caseSearch
		}
	});

	activeFilter.subscribe((filter) => {
		refetch({
			input: {
				// FIX: this type
				group: get(activeFilter) as CaseGroup,
				name: caseSearch
			}
		});
	});

	data.subscribe((newData) => {
		if (newData) {
			cases = newData.getCases;
		}
	});
</script>

<svelte:head>
	<title>CSGamble | Open Cases</title>
</svelte:head>

<GameContainer title="Unboxing">
	<slot slot="header-content">
		<div class="filter">
			<div class="filters">
				{#each filterOptions as option}
					{@const isActive = toUpper(option) === $activeFilter}
					<div
						class="activeFilter"
						class:active={isActive}
						role="button"
						on:click={() => activeFilter.set(toUpper(option))}
					>
						<Text
							variant={isActive ? 'yellowGradient' : 'subtle'}
							tag="span"
							weight={isActive ? 'semibold' : 'normal'}>{option}</Text
						>
					</div>
				{/each}
			</div>
			<!-- <TextInput /> -->
		</div>
	</slot>
	<div class="cases">
		{#each cases as box}
			<CaseCard {box} />
		{/each}
	</div>
</GameContainer>

<style lang="scss">
	.cases {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		flex-wrap: wrap;
		gap: 1.25rem;
		margin-top: 1.5rem;
	}

	.filter {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 40px;
		cursor: pointer;
	}

	.activeFilter {
		width: 78px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		&.active {
			&::after {
				position: absolute;
				content: '';
				width: 100%;
				height: 100%;
				background: linear-gradient(
					321.77deg,
					#ffeb71 -4.42%,
					#eac76c 50.67%,
					rgba(218, 194, 94, 0.69) 102.42%
				);
				opacity: 0.3;
				border-radius: 6px;
			}
		}
	}

	.filters {
		display: flex;
		flex-direction: row;
		gap: 34px;
	}
</style>
