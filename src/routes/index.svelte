<script>
	import { notifications } from '../notifications/index';
</script>

<div>
	<button
		on:click={() => notifications.error.open({ message: 'Error Message' })}
		>Add toast</button
	>
</div>
