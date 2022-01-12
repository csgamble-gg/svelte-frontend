<script lang="ts">
	type GemColor = 'green' | 'purple' | 'blue';
	export let color: GemColor = 'green';

	const gemColors = {
		green: '#1FD86D',
		purple: '#FC80FF',
		blue: '#86FFE8',
		orange: "#F5A255"
	};
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g opacity="0.5">
		<path
			opacity="0.3"
			d="M15.375 1.5H8.625L0.75 7.5375L12 22.5L23.25 7.5375L15.375 1.5Z"
			fill={gemColors[color]}
		/>
		<path d="M12 22.4999L16.6875 7.53737H7.05L12 22.4999Z" fill={gemColors[color]} />
		<path
			d="M3.5625 3.5625L0.75 7.5375L7.05 7.53737L8.625 1.5L3.5625 3.5625Z"
			fill={gemColors[color]}
		/>
		<path
			d="M20.4375 3.5625L15.375 1.5L16.6875 7.53737L23.25 7.5375L20.4375 3.5625Z"
			fill={gemColors[color]}
		/>
	</g>
</svg>
