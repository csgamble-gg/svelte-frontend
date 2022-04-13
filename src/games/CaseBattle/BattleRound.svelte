<script lang="ts">
	import { goto } from '$app/navigation';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { mobileView } from '$stores/window';
	import {
		Avatar,
		Button,
		Card,
		CryptoIcon,
		Text
	} from '@csgamble-gg/nebula-ui';
	import { fly } from 'svelte/transition';
	import type { ActiveBattle } from './state/battles';
	export let battle: ActiveBattle;

	const primaryPlayer = battle.players[0];
</script>

{#if $mobileView}
	<button
		class="round-wrapper"
		on:click={() => goto(`/battle/${battle._id}`)}
		transition:fly={{ y: 50, opacity: 0.6, duration: 3000 }}
	>
		<Card variant="gradient" fullWidth>
			<div class="battle">
				<div class="case-items">
					{#each battle.rounds as round}
						<div class="item">
							<img src={round.case.image} alt="case" />
						</div>
					{/each}
				</div>
				<div class="users">
					<div class="user-info left">
						<Avatar image={primaryPlayer.avatar} size="medium" />
						<div class="info">
							<Text weight="semibold" size="lg"
								>{primaryPlayer.displayName}</Text
							>
							<div class="amount">
								<CryptoIcon type="BTC" />
								<Text size="sm">0.00</Text>
							</div>
						</div>
					</div>

					{#if battle.players.length > 1}
						<div class="user-info right">
							<div class="info">
								<Text weight="semibold" size="lg" align="right"
									>Scrapbeak</Text
								>
								<div class="amount left">
									<CryptoIcon type="BTC" />
									<Text size="sm" align="right">0.00</Text>
								</div>
							</div>
							<Avatar
								size="medium"
								image="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg"
							/>
						</div>
					{:else}
						<div class="join-battle">
							<div class="price">
								<Text>{battle.price}</Text>
							</div>
							<Button label="Join" size="large" />
						</div>
					{/if}
				</div>
			</div>
		</Card>
	</button>
{:else}
	<button
		class="round-wrapper"
		on:click={() => goto(`/battle/${battle._id}`)}
		in:fly={{ y: -20, opacity: 0.6, duration: 500 }}
	>
		<Card variant="gradient" fullWidth>
			<div class="battle">
				<div class="user-info left">
					<Avatar image={primaryPlayer.avatar} size="medium" />
					<div class="info">
						<Text weight="semibold" size="lg"
							>{primaryPlayer.displayName}</Text
						>
						<div class="amount">
							<CryptoIcon type="BTC" />
							<Text size="sm">0.00</Text>
						</div>
					</div>
				</div>
				<div class="case-items">
					{#each battle.rounds as round}
						<div class="item">
							<img
								src={round.case.image}
								alt="case"
								width="100%"
								height="100%"
							/>
						</div>
					{/each}
				</div>
				{#if battle.players.length > 1}
					<div class="user-info right">
						<div class="info">
							<Text weight="semibold" size="lg" align="right"
								>Scrapbeak</Text
							>
							<div class="amount left">
								<CryptoIcon type="BTC" />
								<Text size="sm" align="right">122.98</Text>
							</div>
						</div>
						<Avatar
							image="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg"
						/>
					</div>
				{:else}
					<div class="join-battle">
						<div class="price">
							<Text>${convertPenniesToDollars(battle.price)}</Text>
						</div>
						<Button label="Join" size="large" />
					</div>
				{/if}
			</div>
		</Card>
	</button>
{/if}

<style lang="scss">
	@use '../../styles/breakpoints' as *;
	@use 'sass:color' as color;

	$background: #9cbbff;

	.round-wrapper {
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
	}
	.battle {
		align-items: center;
		display: flex;
		padding: 20px 32px;

		@include break-at('mobile') {
			flex-direction: column;
			padding: 20px 3vw;
		}

		.users {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			margin: 15px 0 0;
		}

		.user-info {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 20px;

			.info {
				display: flex;
				flex-direction: column;
			}

			.amount {
				display: flex;
				align-items: center;
				gap: 5px;

				&.left {
					flex-direction: row-reverse;
				}
			}

			&.left {
				margin-right: auto;
			}

			&.right {
				margin-left: auto;
			}
		}

		.case-items {
			display: flex;
			justify-self: center;
			align-items: center;
			gap: 12px;
			overflow-x: hidden;
			max-width: 100%;
			margin: 0 1vw;

			.item {
				min-width: 5.375rem;
				height: 5.375rem;
				background-color: color.adjust($color: $background, $alpha: -0.9);
				border-radius: 8px;
			}
		}
	}

	.join-battle {
		position: relative;
		display: flex;
		margin-left: auto;

		&:before {
			content: '';
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				321.77deg,
				#54cca8 -4.42%,
				#6cdb7d 50.67%,
				rgba(73, 202, 179, 0.69) 102.42%
			);
			box-shadow: inset 0px 1px 0px rgba(64, 255, 140, 0.25);
			border-radius: 6px;
			opacity: 0.12;
		}
		.price {
			padding: 10px 40px;
			@include break-at('mobile') {
				padding: 10px 25px;
			}
		}
	}
</style>
