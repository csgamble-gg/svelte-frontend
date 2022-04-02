<script lang="ts">
	import ModalCaseCard from '$components/CaseCard/ModalCaseCard.svelte';
	import { errorEventEmitter } from '$emitters/error';
	import {
		AllCasesDocument,
		AllCasesQuery,
		AllCasesQueryVariables,
		Case,
		CaseGroup,
		CreateBattleDocument,
		CreateBattleMutation,
		CreateBattleMutationVariables
	} from '$generated/graphql';
	import { createMutation, createQuery } from '$libs/urql/urqlClient';
	import { currency } from '$stores/currency/currency';
	import {
		Button,
		Card,
		SelectInput,
		Text,
		TextInput
	} from '@csgamble-gg/nebula-ui';
	import Big from 'big.js';
	import { includes } from 'lodash-es';

	// query for the cases based on filters

	const { query } = createQuery<AllCasesQuery, AllCasesQueryVariables>(
		AllCasesDocument
	);

	const createBattleMutation = createMutation<
		CreateBattleMutation,
		CreateBattleMutationVariables
	>(CreateBattleDocument);

	const { data, loading } = query({
		input: {
			group: CaseGroup.New
		}
	});

	let selectedCases = [];

	$: sum = selectedCases.reduce((acc, cur) => {
		return acc + cur.price;
	}, 0);

	$: totalValue = new Big(sum).toFixed(2);

	function addCase(box: Case) {
		if (includes(selectedCases, box)) {
			selectedCases = selectedCases.filter((c) => c._id !== box._id);
		} else {
			selectedCases.push(box);
		}

		selectedCases = selectedCases;
	}

	async function handleCreateBattle() {
		createBattleMutation.mutate({
			input: {
				cases: selectedCases.map((c) => c._id),
				currency: $currency
			}
		});
	}

	createBattleMutation.subscribe((data) => {
		// console.log(data);
		if (data.error) {
			errorEventEmitter.next(data.error);
		}
		if (data.data?.createBattle?.battle._id) {
			// goto('/battle/' + data.createBattle.battle._id);
		}
	});

	$: creatingBattle =
		$createBattleMutation.loading && !$createBattleMutation.error;
</script>

<div class="battle-modal">
	<div class="filters">
		<TextInput />
		<div class="selects">
			<SelectInput
				options={[
					{
						label: 'All',
						value: 'All'
					}
				]}
				value="All"
			/>
			<SelectInput
				options={[
					{
						label: 'All',
						value: 'All'
					}
				]}
				value="All"
			/>
			<SelectInput
				options={[
					{
						label: 'All',
						value: 'All'
					}
				]}
				value="All"
			/>
		</div>
	</div>
	<div class="cases">
		{#if $loading}
			{#each new Array(24).fill(0) as placeholder}
				<div />
			{/each}
		{:else}
			{#each $data.getCases as box}
				{@const selected = includes(selectedCases, box)}
				<ModalCaseCard {box} {selected} on:click={() => addCase(box)} />
			{/each}
		{/if}
	</div>
	<div class="footer">
		<div class="info-wrapper">
			<Card fullWidth>
				<div class="info">
					<div class="value">
						<Text>{selectedCases.length}</Text>
						<Text variant="subtle">Boxes Added</Text>
					</div>
					<div class="value">
						<Text>Total Value:</Text>
						<Text>${totalValue}</Text>
					</div>
				</div>
			</Card>
		</div>
		<div class="button">
			<Button
				label="Start Battle"
				fullWidth
				loading={creatingBattle}
				disabled={creatingBattle}
				on:click={handleCreateBattle}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.battle-modal {
		max-width: 778px;
		max-height: 870px;
		width: 90vw;
		overflow: hidden;
		position: relative;
	}

	.header {
		display: flex;
		width: auto;
		align-items: center;
	}

	.filters {
		display: flex;
		gap: 15px;
		justify-content: space-evenly;

		.selects {
			display: flex;
			flex: 1;
			gap: 12px;
		}
	}

	.cases {
		margin: 48px 0 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
		flex-wrap: wrap;
		gap: 1rem;
		max-height: 600px;
		overflow-y: scroll;
		padding: 0 0 100px 0;
	}

	.footer {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		display: flex;
		background: linear-gradient(
			180deg,
			rgba(24, 29, 45, 0) 0%,
			#181d2d 46.22%
		);
		// padding: 48px 33px 25px 0;
		gap: 15px;

		.info-wrapper {
			flex: 1;
		}
		.info {
			padding: 0.8125rem 1.3125rem;
			display: flex;
			align-items: center;
			gap: 32px;

			.value {
				display: flex;
				align-items: center;
				gap: 15px;
			}
		}

		.button {
			display: flex;
			align-items: center;
			width: 50%;
			flex: 1;
		}
	}
</style>
