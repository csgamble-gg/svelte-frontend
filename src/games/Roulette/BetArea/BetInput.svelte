<script lang="ts">
	import { getGeneralContext } from '$games/state/setup';
	import { Card, Text } from '@csgamble-gg/nebula-ui';

	const { amount } = getGeneralContext();
</script>

<div class="bet-input">
	<Card fullWidth>
		<div class="content">
			<div class="bet-amount">
				<Text variant="subtle" size="sm">Bet Amount</Text>
				<span class="">
					<div class="w-5 h-5 mr-2">
						<!-- <Currency /> -->
					</div>
					<input bind:value={$amount} placeholder="0.00" type="number" />
				</span>
			</div>
			<div class="bet-buttons">
				<button
					class="bet-amount-button mobile-visible"
					on:click={() => amount.add(1)}
					type="button"
				>
					+1
				</button>
				<button
					class="bet-amount-button mobile-visible"
					on:click={() => amount.add(10)}
					type="button"
				>
					+10
				</button>
				<button
					class="bet-amount-button"
					on:click={() => amount.add(100)}
					type="button"
				>
					+100
				</button>
				<button
					class="bet-amount-button mobile-visible"
					on:click={() => amount.double()}
					type="button"
					value="x2"
				>
					x2
				</button>
				<button
					class="bet-amount-button"
					on:click={() => amount.max()}
					type="button"
					value="MAX"
				>
					MAX
				</button>
			</div>
		</div>
	</Card>
</div>

<style lang="scss">
	@use '../../../styles/_breakpoints' as *;

	.bet-input {
		width: 100%;
		display: flex;
		flex-direction: row;

		.content {
			display: flex;
			flex-direction: row;
			padding: 25px;

			.bet-amount {
				display: flex;
				flex-direction: column;

				input {
					outline: none;
					background-color: transparent;
					color: white;
					font-weight: semibold;
					font-size: 24px;
					border: none;
				}
			}
		}

		.bet-buttons {
			position: absolute;
			right: 0;
			padding: 0 0.75vw;
		}
	}

	.bet-amount-button {
		background: rgba(58, 87, 132, 0.15);
		box-shadow: rgba(0, 0, 0, 0.07) 0 14px 21px,
			rgba(58, 113, 194, 0.15) 1px 1px 0 inset;
		border-radius: 6px;
		border: none;
		height: 48px;
		width: 78px;
		margin: 0 5px 0 0;
		color: white;
		font-weight: 700;
		font-family: Poppins;
		cursor: pointer;
		font-size: 13.33px;

		&:not(.mobile-visible) {
			@include break-at('mobile') {
				display: none;
			}
		}
	}
</style>
