<script lang="ts">
	export let type: CurrencyEnum | 'usd' = 'usd';
	import type { CurrencyEnum } from '$generated/graphql';
	import Btc from '$icons/svgs/Crypto/Btc.svelte';
	import Eth from '$icons/svgs/Crypto/Eth.svelte';
	import Usd from '$icons/svgs/Crypto/Usd.svelte';

	const currencyOptions = {
		usd: Usd,
		btc: Btc,
		eth: Eth
	};

	$: selected = currencyOptions[type];
</script>

<svelte:component this={selected} />
