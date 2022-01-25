<script>
	import { toast } from '@zerodevx/svelte-toast';
</script>

<div>
	<button on:click={() => toast.push('this is a message')}>Success</button>
</div>
