<script lang="ts">
	import { slideLeft } from '../../transitions/slideX';
	const sampleChat = [];
</script>

<div
	class="flex flex-col h-screen w-[208px] relative pt-2"
	transition:slideLeft|local={{
		from: 'right',
		duration: 400,
		skip: false
	}}
>
	<div class="h-full mt-9 px-3">
		<h2 class="text-white text-4xl font-bold">test</h2>
	</div>
</div>
