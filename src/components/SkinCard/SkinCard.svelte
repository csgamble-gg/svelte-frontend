<script lang="ts">
	import { formatPennies } from '$utils/currency';
	import { Card, Text } from '@csgamble-gg/nebula-ui';
	import type { InventorySkin, Skin } from '../../generated/graphql';
	export let skin: Pick<
		InventorySkin,
		| '_id'
		| 'price'
		| 'rarity'
		| 'wear'
		| 'iconUrl'
		| 'skinName'
		| 'gunType'
		| 'knifeType'
		| 'name'
	>;
	export let onClick: () => void | null = null;

	const QualityEnum = {
		'Factory New': 'FN',
		'Minimal Wear': 'MW',
		'Field-Tested': 'FT',
		'Well-Worn': 'WW',
		'Battle-Scarred': 'BS'
	};

	// FIX: this will need to be fixed on the data side probably?
	let rarity = skin.rarity;
	rarity = rarity.split(' ').join('');
</script>

<div style="width: 100%;">
	<Card fullWidth>
		<div class="content" on:click={onClick}>
			<div class="header">
				<div class="price">
					<Text size="sm" weight="medium"
						>${formatPennies(skin.price)}</Text
					>
				</div>
				<div class="skin-info">
					{#if false}
						<Text size="sm" weight="medium" variant="yellowGradient"
							>ST</Text
						>
					{/if}
					<Text size="sm" weight="medium" variant="subtle"
						>{QualityEnum[skin.wear]}</Text
					>
				</div>
			</div>
			<div class="image-wrapper">
				<img
					src={skin.iconUrl}
					loading="lazy"
					alt={skin.skinName}
					width="auto"
					height="auto"
				/>
			</div>
			<div class="bottom-section rarity-{rarity}">
				<div class="info">
					<span class="type rarity-{rarity}"
						>{skin.gunType || skin.knifeType || 'Unknown Type'}</span
					>
					<span class="name">{skin.skinName || skin.name}</span>
				</div>
			</div>
		</div>
	</Card>
</div>

<style lang="scss">
	@use 'sass:color';
	@use 'sass:map';

	$rarity-colors: (
		'ConsumerGrade': #e7dbd0,
		'IndustrialGrade': #9ccafc,
		'Mil-SpecGrade': #48a7ff,
		'Restricted': #be38f3,
		'Classified': #ef6698,
		'Covert': #fe6250,
		'Extraordinary': #fecb3e
	);

	@function getRarityGradient($color) {
		@return radial-gradient(
			105.37% 111.43% at 50% 120%,
			rgba($color, 80%),
			rgba(20, 24, 38, 0) 85%
		);
	}

	.skin-info {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	.content {
		height: auto;
		position: relative;
	}

	.header {
		padding: 11px 12px 0 12px;
		height: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.price {
			display: flex;
			align-items: center;
			flex: 1;
		}
	}

	.image-wrapper {
		width: 100%;
		height: 119px;
		position: relative;

		img {
			// position: absolute;
			inset: 0;
			// left: -19px;
			// top: 5px;
			width: 100%;
			height: 100%;
			object-fit: contain;
			z-index: 2;
		}
	}

	.bottom-section {
		height: 80px;
		position: relative;
		.info {
			padding: 12px 12px;
		}
		&:before {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			inset: 0;
			background: linear-gradient(
				180deg,
				#000000 0%,
				rgba(0, 0, 0, 0) 100%
			);
			border-radius: 0px 0px 10px 10px;
			opacity: 0.15;
		}
		@each $rarity, $color in $rarity-colors {
			&.rarity-#{$rarity} {
				&:after {
					position: absolute;
					content: '';
					inset: 0;
					background: getRarityGradient($color);
					filter: drop-shadow(0px 1px 0px $color);
					opacity: 0.6;
					border-radius: 10px;
					z-index: -1;
				}
			}
		}
	}

	.type {
		font-family: Poppins;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		display: flex;
		align-items: center;
		text-align: center;

		@each $rarity, $color in $rarity-colors {
			&.rarity-#{$rarity} {
				color: #{$color};
			}
		}
	}

	.wear {
		padding-right: 5px;
		color: white;
	}
	.odds {
		color: white;
	}
	.hover-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--variant-alt-grey-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		border-radius: 10px;
		z-index: 5;

		table {
			width: 100%;
			text-align: center;
		}

		th {
			font-size: 14px;
			font-weight: 500;
			line-height: 24px;
			@each $rarity, $color in $rarity-colors {
				&.rarity-#{$rarity} {
					color: #{$color};
				}
			}
		}

		td {
			font-size: 13px;
			font-weight: 600;
			line-height: 24px;
		}

		.header {
			padding: 11px 15px 0 15px;
			height: 25px;
		}
	}
	.price {
		font-family: Poppins;
		font-size: 13px;
		font-weight: 600;
		color: white;
		line-height: 24px;
	}

	.quality {
		font-family: Poppins;
		font-style: normal;
		font-weight: 600;
		font-size: 13px;
		line-height: 24px;
		color: #9cbbff;
		opacity: 0.5;
	}

	.image {
		display: flex;
		width: 50%;
		height: 50%;
		align-items: center;
		justify-content: center;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}

	.bottom-content {
		border-radius: 0px 0px 10px 10px;
		display: flex;
		flex-direction: column;
		padding: 14px;
		position: relative;
	}

	.name {
		font-family: Poppins;
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		color: #ffffff;
	}
</style>
