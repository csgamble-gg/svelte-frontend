<script>
	import { notifications } from '../notifications/index';
</script>

<div>
	<button
		on:click={() =>
			notifications.error.open({ message: 'Oh no, you broke it' })}
		>Add Error Toast</button
	>

	<button
		on:click={() =>
			notifications.info.open({
				message: 'Wow, this is some neat info',
				title: 'Custom title!'
			})}>Add Info Toast</button
	>
	<button
		on:click={() =>
			notifications.success.open({ message: 'Oh no, you broke it' })}
		>Add Success Toast</button
	>
</div>
