<script lang="ts">
	import type { Case } from '$generated/graphql';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { Card, Text } from '@csgamble-gg/nebula-ui';
	export let box: Case;
</script>

<div>
	<Card>
		<div class="case">
			<img
				src={box.image}
				alt="case"
				width="165px"
				height="165px"
				class="image"
			/>
			<div class="info">
				<Text tag="span" weight="semibold">{box.name}</Text>
				<Text weight="semibold"
					>${convertPenniesToDollars(box.price, 2)}</Text
				>
			</div>
		</div>
	</Card>
</div>

<style lang="scss">
	@use '../../../styles/breakpoints' as *;
	.case {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 23px 20px 44px;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 5px;
		align-items: center;
	}

	.image {
		width: 165px;
		height: 165px;
		transition: 0.1s ease-in-out;

		&.hovered {
			transform: translate3d(0, -7px, 0);
		}
	}

	@include break-at('mobile') {
		.case {
			padding: 5px;
		}

		.image {
			width: 130px;
			height: 130px;
		}
	}
</style>
