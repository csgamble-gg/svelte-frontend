<script lang="ts">
	export let caseData: Case;

	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import SkinCard from '$components/SkinCard/SkinCardVariant.svelte';
	import { getGeneralContext, setup } from '$games/state/setup';
	import type { Case } from '$generated/graphql';
	import { mobileView } from '$stores/window';
	import { Button, Card, Text } from '@csgamble-gg/nebula-ui';
	import { onMount } from 'svelte';
	import { service } from './machine';
	import Reel from './Reel/Reel.svelte';
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

	const { send, fetching, machineState } = getGeneralContext();

	const caseAmountOptions = [1, 2, 3, 4, 5];

	let caseAmounts = 1;
</script>

<GameContainer title={`Open Case`}>
	<div class="header">
		<div class="content" class:mobile={$mobileView}>
			<Card>
				<div class="case-card">
					<img src={caseData.image} alt="case" />
					<div class="info">
						<Text weight="semibold">{caseData.name}</Text>
						<Text>{caseData.price}</Text>
					</div>
				</div>
			</Card>
			<div class="info-wrapper">
				{#if !$mobileView}
					<Text variant="yellowGradient" tag="h2" size="3xl"
						>{caseData.name}</Text
					>
				{/if}
				<div class="buy-section">
					<!-- <Text variant="subtle" size="lg">Cases to buy</Text>
					<div class="options">
						{#each caseAmountOptions as option}
							{@const isActive = option === caseAmounts}
							<button
								class="option"
								class:active={isActive}
								on:click={() => (caseAmounts = option)}
							>
								<Text tag="span" weight="bold">{option}</Text>
							</button>
						{/each}
					</div> -->
					<div class="buttons" class:mobile={$mobileView}>
						<Button
							label="Buy Case"
							on:click={() => send({ type: 'OPEN_CASE', mode: 'LIVE' })}
						/>
						<Button
							label="Demo Open"
							variant="secondary"
							on:click={() => send({ type: 'OPEN_CASE', mode: 'DEMO' })}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="holder">
		<Card fullWidth>
			<Reel />
		</Card>
	</div>
	<Card fullWidth>
		<div class="contents">
			<Text tag="h4" weight="semibold" size="xl" align="center"
				>Case Contains</Text
			>
			<div class="skins">
				{#each caseData.items as skin}
					<SkinCard {skin} />
				{/each}
			</div>
		</div>
	</Card>
</GameContainer>

<style lang="scss">
	.reels {
		margin: 15px 0;
	}
	.placeholder {
		width: 100px;
		height: 100px;
		background-color: red;
		position: absolute;
		left: 45%;
	}
	.header {
		display: flex;
		flex-direction: row;
		margin: 100px 0 80px 0;
		align-content: center;
		justify-content: center;

		.info-wrapper {
			width: 100%;
		}

		.content {
			display: flex;
			justify-self: center;
			gap: 10vw;

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
		padding: 0 60px;
		height: 220px;
		position: relative;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;

		.info {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10px 0;
			gap: 2.5px;
		}

		img {
			position: absolute;
			left: -50px;
			top: -120px;
			width: 150%;
		}
	}

	.contents {
		display: flex;
		flex-direction: column;
		padding: 37.5px;

		.skins {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			flex-wrap: wrap;
			padding: 40px 0;
			// display: flex;
			// flex-direction: row;
			// flex-wrap: wrap;
			gap: 23px;
		}
	}

	.main {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #181d2d;
		border-radius: 16px;
		width: 100%;
		gap: 15px;
		margin-top: 15px;
		padding: 15px 20px;
	}

	.button {
		background: linear-gradient(
			321.77deg,
			#54cca8 -4.42%,
			#6cdb7d 50.67%,
			rgba(73, 202, 179, 0.69) 102.42%
		);
		box-shadow: inset 0 1px 0 rgba(64, 255, 140, 0.25);
		height: 48px;
		min-width: 94px;
		border-radius: 8px;
		margin-top: 12px;
		margin-right: 12px;
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

	.winning-item {
		animation: float 6.66s ease-in-out infinite;
	}

	.container {
		width: 100%;
		height: 100%;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		background: #181d2d;
		border-radius: 16px;
		padding: 15px;
	}

	.case-contents {
		padding-top: 15px;
		row-gap: 5px;
		column-gap: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
	}

	.holder {
		overflow: hidden;
		background: #181d2d;
		margin: 0 0 25px 0;
		// padding: 5px 35px;
		border-radius: 8px;
	}
</style>
