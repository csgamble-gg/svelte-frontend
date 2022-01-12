<script lang="ts">
	type GemColor = 'green' | 'purple' | 'blue';
	export let color: GemColor = 'green';

	const gemColors = {
		green: ['#2A807B', '#1FD86D'],
		purple: ['#FC80FF', '#FC80FF']
	};
</script>

<svg
	width="17"
	height="17"
	viewBox="0 0 17 17"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...$$restProps}
	><slot />
	<path
		d="M10.8906 1.0625H6.10938L0.53125 5.33906L8.5 15.9375L16.4688 5.33906L10.8906 1.0625Z"
		fill={gemColors[color][0]}
	/>
	<path d="M8.5 15.9374L11.8203 5.33897H4.99375L8.5 15.9374Z" fill="url(#paint0_radial_102_243)" />
	<path
		d="M2.52344 2.52344L0.53125 5.33906L4.99375 5.33897L6.10938 1.0625L2.52344 2.52344Z"
		fill="url(#paint1_radial_102_243)"
	/>
	<path
		d="M14.4766 2.52344L10.8906 1.0625L11.8203 5.33897L16.4688 5.33906L14.4766 2.52344Z"
		fill="url(#paint2_radial_102_243)"
	/>
	<defs>
		<radialGradient
			id="paint0_radial_102_243"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(9 6) rotate(90) scale(10 10.7143)"
		>
			<stop stop-color={gemColors[color][1]} />
			<stop offset="1" stop-color={gemColors[color][0]} />
		</radialGradient>
		<radialGradient
			id="paint1_radial_102_243"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(9 6) rotate(90) scale(10 10.7143)"
		>
			<stop stop-color={gemColors[color][1]} />
			<stop offset="1" stop-color={gemColors[color][0]} />
		</radialGradient>
		<radialGradient
			id="paint2_radial_102_243"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(9 6) rotate(90) scale(10 10.7143)"
		>
			<stop stop-color={gemColors[color][1]} />
			<stop offset="1" stop-color={gemColors[color][0]} />
		</radialGradient>
	</defs>
</svg>
