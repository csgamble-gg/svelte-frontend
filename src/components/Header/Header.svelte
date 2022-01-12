<script lang="ts">
	import Divider from '../generics/Divider.svelte';
	import UserInfo from './UserInfo.svelte';
	import { spring } from 'svelte/motion';
	import { isOpen, toggleSidebar } from '../Sidebar/Sidebar.context.ts';
	import Caret from "../../icons/svgs/Caret/Caret.svelte";

	const rotation = spring(0);

	function handleClick() {
		toggleSidebar()
		if ($isOpen) {
			$rotation = 0;
		} else {
			$rotation = 180;
		}
	}
</script>

<div>
	<div class="header flex flex-row items-center justify-between pr-6">
		<button
			class="rounded-full w-8 h-8 bg-foreground flex items-center justify-center"
			on:click={handleClick}
			style="transform: rotate({$rotation}deg);"
		>
			<Caret width="8px" height="10px" />
		</button>
		<UserInfo />
	</div>
	<Divider />
</div>

<style>
	.header {
		height: 91px;
	}
</style>
