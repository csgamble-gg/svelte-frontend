<script lang="ts">
	import Caret from '$icons/svgs/Caret/Caret.svelte';
	import Btc from '$icons/svgs/Crypto/Btc.svelte';
	import Eth from '$icons/svgs/Crypto/Eth.svelte';
	import Csgo from '$icons/svgs/CSGO/Csgo.svelte';
	import Coinbase from '$icons/svgs/Providers/Coinbase.svelte';
	import Moonpay from '$icons/svgs/Providers/Moonpay.svelte';
	import {
		Button,
		Copy,
		Radio,
		Text,
		TextInput
	} from '@csgamble-gg/nebula-ui';

	let depositTypes = [
		{
			name: 'Bitcoin',
			min: 5,
			icon: Btc,
			color: '#f7931a'
		},
		{
			name: 'Ethereum',
			min: 5,
			icon: Eth,
			color: '#627eea'
		},
		{
			name: 'CS:GO Skins',
			min: null,
			icon: Csgo,
			color: '#6795DD',
			disabled: true
		}
	];

	let purchaseProviders = [
		{
			name: 'Coinbase',
			icon: Coinbase,
			disabled: false,
			color: '#0052ff',
			url: 'https://coinbase.com'
		},
		{
			name: 'Moonpay',
			icon: Moonpay,
			disabled: false,
			color: '#ffffff',
			url: 'https://moonpay.com/buy'
		}
	];

	let selectedDepositType = depositTypes[0];
	$: step = 0;
</script>

<div class="deposit-modal">
	<div class="header">
		{#if step !== 0}
			<button class="caret" on:click={() => (step = 0)}>
				<Caret />
			</button>
		{/if}
	</div>
	{#if step === 0}
		<div class="content">
			<div class="deposit-types">
				{#each depositTypes as type}
					<button
						class="type"
						class:active={selectedDepositType.name === type.name}
						on:click={() => {
							selectedDepositType = type;
						}}
						disabled={type.disabled}
					>
						<div
							class="icon"
							style:background-color={type.color || 'transparent'}
						>
							<svelte:component this={type.icon} />
						</div>
						<div class="info">
							<Text size="md">{type.name}</Text>
							{#if type.min}
								<Text size="sm" variant="subtle">Min ${type.min}</Text>
							{/if}
						</div>
						<div class="radio">
							<Radio
								checked={selectedDepositType.name == type.name}
								disabled={type.disabled}
							/>
						</div>
					</button>
				{/each}
			</div>
		</div>
		<div class="providers">
			<Text tag="h3">Purchase Crypto</Text>
			<div class="deposit-types">
				{#each purchaseProviders as provider}
					<a href={provider.url} target="_blank">
						<button class="type" disabled={provider.disabled}>
							<div
								class="icon"
								style:background-color={provider.color || 'transparent'}
							>
								<svelte:component this={provider.icon} />
							</div>
							<Text size="md">{provider.name}</Text>
						</button>
					</a>
				{/each}
			</div>
		</div>
		<Button on:click={() => (step += 1)} label="Continue" fullWidth />
	{/if}
	{#if step === 1}
		<div class="confirm">
			<div class="wrapper">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAADV5JREFUeF7tndt2szoMhJv9/s/8Zy9yaMDInk+DSEiaXjZGlkajg42B08/Pz/mn83ca/di7CPz/Lvd87k79K+V0mkYv/9rr2jGR3GlM1h5Hv97ccwvIGABjyZAsJiWT3oU4AE/XugTIKu/o114zUfy/hsRVBKhwXoWMLK6/4y9ATAitg3yXDJBVtIIA05w0Q2X1qxg/5cVzvwhUTNGX4QAcZoD/TotCVhVhjn5k7t8xM/JHpW5f9K/Sn5wBltM5AO9RAnogOPqlCDDz8MsJMAeBGO6wk6TCVq4DzF3/eXVx5BAbCVbEbjKG6KPGtPOcfn5Ot0L8uJQYpSaKfneMdBxHotDRP7qGYKXspo1ihc4BAdYdADHKUUYBQUhD5n03AshGcdEoi65ZAPQHCHD6OZ//rVYXTiZxyabKGCHos4Jw0f/0Nmhc8CrW6wQIR79nOoFkPjXGsZE0zGED/O98XizN95q8ygmOflVzkyyhnCtLQLCXQNdwKghDAqiL6OJRySHd+jcD3NbrwZY4IZ/yQbgRpC4iE5P0UxWFfzYDAEcoX3oZoDdxI01NfhQC3PtqkqoB5qshRK4a45CcBGEtARrT9yKAAos4iQA6JugVOqdEOcQn+pJ9ioucmdeHBOhFBgGYsM8BgjRMRD8CqKtfbxk4ug2uSB3qCzbyVRB+QAa4rfuJ12djXkGA+/QOsX71BU5/mLnGhm8EFdypUuxzgHjnDFBCgCTRlQ+6GaDiRoqavIoALSakLkc4kqzwe10nEqtsUthRHig5zykBNzapOkejWznqKQToeOCDCZAqPhd4FPuqwHpJBtiLADeYFXbvlQFu2n5SBsgcIontXt7VU9iorNcjhCLSRywDPyoD3IxRjntqBqCTqXGK5a/uAZT+VL/ePsCWVQDRjYwJloHHOhHkkKQqAzgAkoZzZdO/8+okNLGb6KfG8H0AJSn1+7XeESOdMW9HgOCBGGJ3CvLO4BcR4KoNMXI+ZmpQprMJKqV+CcCpMSDAsh+Uiz45QCtVtQwkDdNzxsTb0lnia+TqRhS40Vfm8wiw3vtwMp+PaP7KKwH2oMFIZmezow9Wb80c35KN1szPyQAbCNA83XTBovdwbqG/CkXl2ffNAA/M3I2ePOrLK05nso7ZOkvi+lMQCeryrgmDI/QsS/y3ikGSSWhTuu2Ev0KF/X48AhiHHx0OMwIsT89MkGICzHKrox9z3/ZRAwK8hp9OKnQAxgRoMO4RYFRLHf24a7f5ycwAj0m3Tb82810JMHLYvgTgVIlGmgTYNuno6i8B9sM2JEC00hjXubqFA4kMN1XTRqwW7vPP6TQ1jss/105Ht9Y7au5dTwQpA5Ryl7Vw5iVRA26SuZS+5HeibxiJRvNL9FF2H5YAyyPpSzX7GWptzv0/CggCJhnzxgR4gIeXOgSRwZihUzrnCFNLsdncH00AmvmCjt3OAEOSDLZ653wg0eI0hRt5+Xu5QxpXXyfoKvQrJ8BcoFLwXQiQWeqmCWAeAu3dKlfkt84DuI46DAHMhYvSv7KZ+5gMMAelB+DomcMuEKYTw4iAso5FgLXSFfptKwHi8TGloJtZVJqr+l3p/xEZYHg3sO3E1Q2O5GtfMwCPRKfr7gaGqFRNbCLEJyqGJ40yDcu0z0JuB++qMLFUjPkS4AoQIV8L5ZcASQIePgMk7fmzBIB94ArOTyDA4snv/M2gmGJR+iGnYVcpCeyJt3O1ZY+UBCddkuByy6XW+WCrgBaMVxKggkTEuWTMfgRYz+6QuGwjiBOgf4/BXUYpw3U0eQ3TlwADBP5aBriUnejmCrh97RKfBJ0iqZUBlNDpdxJ1RE7fyP4Cl8ytmrf5vJkGUWUjx+ZKPJXd8U5g8PTq3JDIFcQJDxkcYgIwmVsB4TpK65fcmbkpQmwiOiu70VYwmahKYSfNkbkVEMTGaMxCrufrcOqxTb0A0iuF55UAHuRD7HWEsfLzFAK4LAquI6Qm0ym7vxmAoJhsfjeKvFyuCcAiLEmAWKgbheQ6BdYKiEBFZeQ0R6zLOGeTNf19zOjsIblpox2ukGIPprZSEI2IIwlY2oTliMk97Vc3ZR2GJ4mJLsSm6zHwx0ss3OVwLQEexFZyD00AlgrZ83qExKvoAGt6st3tjCEEJQ3zMQmQ6JaVAVF6J5FLACZyHOeSLEH0KyFA1XkA4iiiMDFcgU4cF80Ty02wFQ519AuvEfs1CMttBOC1htRuonBUFuwmsHGYIhbVrz/uOmEZAYIXaGV0vG5nX9Cr64ZTCpgGKEc5ABNiZWwbjXX0a1cb/ZVNTsuyAyF+CYB5c2bXuPPOPqDZz2JO40jg30KAufysfuEWvlUCpq+1T/Vn4ZRpQZH7yxpwl/6XM8AWAoR9j3siiNTdiqZPRstURsApolYXKTfH5d/Rntx8FuyppyS1+qGtYGKUKgHDR5l6N9cLN3WOTQCTbcZlLyOA27QQ8hk4WJ04mWcvfZdzqzjva/o0AkSpxan5ewH6bnIJ+cgYRABSu1UjNslQZYEQQskgRtPs49hEeiFiJylR1NbfZrnzsu1F8957G6nqNh2wCLH2AOJBgNx+B9myPTIBCPHtm0HPIUC8ps9GAgEiylgRAaa7k/MF8JcAN2+QaNk1AwgqkzTskHpPAqDoFNGg7EZzEOeSMbsSYCMQNAMoklQ1l8/qfdA+gJNyCaAELHeMozOJZkcuuWblCBCav/oOWhtJWLITSAyIxsjJjQMXUT3fK1qq5Lr4qetUekdB+MkEAEG0+CiDzgBZicqF235fEQA8qbSy8ZMJkIVXEyArMTueEOwh81AZAKXLxj7HAFICnIaUukqRxJ1bySX6hXiKXeOyJhARoLFiFwIEt6qjWkgAjcYoRx2OAMLQDQRYUmtXAojMoZrN1xNg/emZh1+uxiliEcKSgGrlbCDAUtTkhKswXseIws4y0I1CDnLuFNHSBvbwzV4BZRGAKEOcuZocHOR4plzHTpJ9CLGUHKbbv9vH5vozoruBTjqaPvGaPRQmjbrV8+zdbym386iYc51yHHE+Wq8ngmWE124EeGakKlAdR9I+QQWHg0M1AUJ8bqz4EuCGjtsnIAJkUxb4sLZLalV2UROYmjxhfHtrlSy7VPTfo0m1orsSgCjZjFGlBPtArfubUmITwEl1ysgIt6pVgIqESvIZ/u9eoog8v5CQGmwFrz+BTpxAjM4SoPd4OErDK4Xy+xYVJCe4VI0pIsDzHrcmABPyZYnlNnzEUSRVEznNLgs5uRe+BOOizyyNgAzwGgL0SteXAJwuq4CanpmZPsY9+1sRgDwaxlXIjly7nUQQyRxZTar6DzKvo38VLqtl4GsJsIarylDiCDVmnH36j3pf5A66ty8BBsi/DwGuRhB9W3MPQ4CpPThfHvPNbuKq2PF/J4A6ADoaof5jqrHLB6XlVI7+VbhMcubJCb0fQFpUOKDK0AqVEAHUHn1QCl5DgPPlTm371rXMPkMFpsOOlE6gSOIA7KZzkt7JMrWNzLsN9zaZkHEJ7rUPUXN/CTBDTRGLEPTiOOPdQ9JR4AS1XMlEL/ZAOwzEcmPMXpG6l1xiorMbF2Wf83l5bz+dAW7KSmJ9CfBwa1kGaJiinBATQL+ChxBdzY1uBhHmkzFKGQIEHaP0cZ2tQCdylQyZyjvGTXLbrTWlz8sJoBR2U+odo8wWsyLN9LtyngKcyHAJEJ3KUvqUEYAcAzhGBhA7eIIFRyYACZbWvDEBiFdJ2DQNyX1SwlhpVOc5AKWWioze9a8gwOW2ONhwklgFRqEMUAVWVQZYsbhZIi2ASJDYtXOuj+MERVaXjKRfShEgu2mwuvU4chRctpD6qKK0B+iXADdkQsdlvR80TOr1KoSxLgFIIvgSYEQAI0/1MsCdSyRdkmgmX+0g6n8+AYLjfuTxcA2M97hTHQHGp16I86PsQ6/7Mz1AFpDNPQAsO2oeqjfLNhvIRurQhl6IlMf5mMmSVBNIgbyPU44hGSCec6m2mofqvTsBqCLgQREqKsrei/MAsgQEBwvp5MoxPgGWGqh5svpmnq0jpKHzL6ITrJiIXFW+3zQD7EuAEbBkL4M4Ro2pmuftCUAibAVWcMqtXSkoB0y/O3NHckmGImOIzmEfMEvzq3lkCTAPPkYAElaTMa2R5BoVCZdVQAPGFgI8ZHlPWhF9Q0KIxnlpU+d1HlVsjOU8NIx7AP0lzu0EYMuLLQQYLQ3J4Q6bACJNfDNAIo9+NgFud0WPUQJy79wZZoDCt4QdiQAsZ2l2L2y6PRCwOtVODNdTrUeQWu3IVSUhkkleafPMVP10zO9vDCEZoMIplyaraG2r9CH1kwBeS4BxDBN9lN3hCqDFvFkhoX0AZ2KkzO3LoXSHlI4LCdBYSgCvJIBK4UQfxw8q6DYQgLrjobZSxjGQEC1em+dfqUaWtq4NhyKAa0T2OrIVvBcwWV3v4ytITEqUq197ncJPZaYqPUI5hydAkOQqCTCVZ/P72dgvQwL0VgFY+saB7dMvlY0iK1Bs1CX133YKKwmwEb7xSwhuwt80A4x3Czlw3MFUZpcAianSJWBDnn4Q4KHgXNX/AXxbIwhzcbGMAAAAAElFTkSuQmCC"
					alt="qr code"
					width="100%"
					height="100%"
				/>
			</div>
			<!-- <span class="mt-4">Minimum deposit: ${selectedDepositType.min}</span> -->
			<!-- <span>Deposits under this amount will not be credited.</span> -->
			<div class="address">
				<Text
					>Your personal {selectedDepositType.name} deposit address</Text
				>
				<TextInput
					value="1231jgblkjhbalkfdb"
					variant="filled"
					readOnly
					fullWidth
					endAdornment={Copy}
					clickableAdornment
				/>
			</div>
			<Text weight="medium">
				{`Send any amount of ${selectedDepositType.name} of your choice to the following address to credit your account with the amount.`}
			</Text>
		</div>
	{/if}
</div>

<style lang="scss">
	.deposit-modal {
		max-width: 496px;
		width: 90vw;
	}
	.header {
		display: flex;
		align-items: center;
		gap: 15px;
		.caret {
			background: rgba(58, 87, 132, 0.15);
			box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.07),
				inset 1px 1px 0px rgba(58, 113, 194, 0.15);
			border-radius: 6px;
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
		}
	}
	.content {
		padding: 25px 0px;
	}

	.deposit-types {
		display: flex;
		flex-direction: column;

		.type {
			cursor: pointer;
			border: 1px solid transparent;
			border-radius: 8px;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 12px;
			padding: 12px;
			background-color: transparent;

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			&.active {
				// TODO: migrate to its own variable
				background-color: #131621;
				border: 1px solid #21273a;
			}

			.icon {
				width: 80px;
				height: 54px;
				border-radius: 8px;
			}

			.info {
				display: flex;
				flex-direction: column;
			}

			.radio {
				margin-left: auto;
			}
		}
	}

	.providers {
		margin: 0 0 30px;
		a {
			text-decoration: none;
		}
	}

	.confirm {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
		.wrapper {
			background-color: #1d263a;
			padding: 20px;
			border-radius: 11px;
			width: 50%;
			height: 50%;
			img {
				border-radius: 11px;
			}
		}

		.address {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
