<script lang="ts">
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import SkinCard from '$components/SkinCard/SkinCardVariant.svelte';
	import { getGeneralContext, setup } from '$games/state/setup';
	import { mobileView } from '$stores/window';
	import { formatPennies } from '$utils/currency';
	import { Button, Card, Text } from '@csgamble-gg/nebula-ui';
	import { onMount } from 'svelte';
	import { service } from './machine';
	import Reel from './Reel/Reel.svelte';
	import VerticalReel from './Reel/VerticalReel.svelte';
	import { currentCase, isLoading, isRolling } from './state/game';
	import * as general from './state/general';
	import { initialize } from './subscriptionHandler';

	onMount(() => {
		initialize();
	});

	setup({
		generalContext: {
			...general,
			send: service.send
		}
	});

	const { send } = getGeneralContext();

	const caseAmountOptions = [1, 2, 3, 4];

	let caseAmounts = 4;

	$: openingPrice = formatPennies($currentCase.price * caseAmounts);
</script>

<GameContainer title={`Open Case`}>
	<div class="unboxing">
		<div class="header">
			<div class="content" class:mobile={$mobileView}>
				<div class="case-card">
					<img src={$currentCase.image} alt="case" />
				</div>
				<div class="info-wrapper">
					{#if !$mobileView}
						<Text variant="yellowGradient" tag="h2" size="3xl"
							>{$currentCase.name}</Text
						>
					{/if}
					<div class="buy-section">
						<Text variant="subtle" size="lg">Cases to buy</Text>
						<div class="options">
							{#each caseAmountOptions as option}
								{@const isActive = option === caseAmounts}
								<button
									class="option"
									class:active={isActive}
									on:click={() => (caseAmounts = option)}
									disabled={$isRolling || $isLoading}
								>
									<Text tag="span" weight="bold">{option}</Text>
								</button>
							{/each}
						</div>
						<div class="buttons" class:mobile={$mobileView}>
							<Button
								loading={$isLoading}
								label={`Buy Case ${openingPrice}`}
								on:click={() =>
									send({
										type: 'OPEN_CASE',
										mode: 'LIVE',
										amount: caseAmounts
									})}
								disabled={$isRolling || $isLoading}
							/>
							<Button
								loading={$isLoading}
								label="Demo Open"
								variant="secondary"
								on:click={() =>
									send({
										type: 'OPEN_CASE',
										mode: 'DEMO',
										amount: caseAmounts
									})}
								disabled={$isRolling || $isLoading}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Card fullWidth>
			<div class="reels">
				{#if caseAmounts > 1}
					<div class="vertical-reels">
						{#each new Array(caseAmounts) as _, reelIndex}
							<VerticalReel {reelIndex} />
						{/each}
					</div>
				{:else if caseAmounts === 1}
					<Reel />
				{/if}
			</div>
		</Card>
		<Card fullWidth>
			<div class="contents">
				<Text tag="h4" weight="semibold" size="xl" align="center"
					>Case Contains</Text
				>
				<div class="skins">
					{#each $currentCase.items as skin}
						<SkinCard {skin} />
					{/each}
				</div>
			</div>
		</Card>
	</div>
</GameContainer>

<style lang="scss">
	@use '../../styles/_breakpoints' as *;

	.unboxing {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 15px;
	}

	.header {
		display: flex;
		flex-direction: row;
		margin: 50px 0 50px 0;
		align-content: center;
		justify-content: center;

		.info-wrapper {
			width: 100%;
		}

		.content {
			display: flex;
			justify-self: center;
			gap: 5vw;

			&.mobile {
				flex-wrap: wrap;
				justify-content: center;
			}
		}

		.buy-section {
			margin: 20px 0 0;
			display: flex;
			flex-direction: column;
			gap: 20px;

			@include break-at('mobile') {
				align-items: center;
			}

			.options {
				display: flex;
				gap: 15px;
				.option {
					cursor: pointer;
					width: 51px;
					height: 48px;
					border: none;
					background: rgba(58, 87, 132, 0.15);
					box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.07),
						inset 1px 1px 0px rgba(58, 113, 194, 0.15);
					border-radius: 6px;
					&.active {
						background: rgba(58, 87, 132, 0.75);
						box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.07),
							inset 1px 1px 0px rgba(116, 171, 255, 0.15);
					}
				}
			}

			.buttons {
				display: flex;
				gap: 20px;
				&.mobile {
					width: 100%;
					flex-direction: column;
				}
			}
		}
	}

	.case-card {
		width: 201px;
		height: 220px;
		position: relative;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
	}

	.contents {
		display: flex;
		flex-direction: column;
		padding: 37.5px;
		gap: 25px;

		.skins {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
			flex-wrap: wrap;
			padding: 40px 0;
			gap: 23px;
		}
	}

	@keyframes float {
		0% {
			transform: translatey(0px);
		}
		50% {
			transform: translatey(-10px);
		}
		100% {
			transform: translatey(3px);
		}
	}

	.reels {
		padding: 15px;
		display: flex;
		align-items: center;
		height: 250px;
	}

	.vertical-reels {
		display: flex;
		height: 100%;
		width: 100%;
		gap: 0.75vw;
	}
</style>
