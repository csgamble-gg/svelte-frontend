<script lang="ts">
	let serverSeed: string;
	let clientSeed: string;
	let nonce: number;
	let rollValue: number = null;

	const calculateHashes = () => {
		// createHmac(serverSeed, clientSeed);
	};
</script>

<div class="game-wrapper">
	<div class="game-content p-8">
		<input bind:value={serverSeed} type="text" placeholder="Server Seed" />
		<input bind:value={clientSeed} type="text" placeholder="Client Seed" />
		<input bind:value={nonce} type="number" placeholder="Nonce" />
		<button on:click={calculateHashes}>calc</button>
		<span>roll value: {rollValue}</span>
	</div>
</div>
