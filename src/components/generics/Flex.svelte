<script lang="ts">
	interface FlexProps {
		class?: string;
	}

	$: className = ['flex', $$restProps.class ? $$restProps.class : ''].join(
		' '
	);
</script>

<div {...$$restProps} class={className}>
	<slot />
</div>
