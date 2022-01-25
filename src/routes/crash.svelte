<script lang="ts">
	import CrashGame from '../games/Crash/CrashGame.svelte';
	import BetInput from '../games/Crash/BetInput.svelte';
</script>

<div class="game-wrapper">
	<div class='game-content px-11 flex flex-row gap-9'>
		<div class='absolute left-0 pt-9 pl-11 z-10'>
			<div class='mb-4 flex flex-row items-center'>
				<h1 class='text-white text-4xl font-bold mb-3'>Crash</h1>
			</div>
		</div>
		<div class='mt-28'>
			<div class='round-stats pt-8'>
				<div class='flex items-center justify-between pb-6 px-6'>
					<h2 class='text-white text-xl font-bold'>Round Stats</h2>
					<div class='flex'>
						<span class='text-lightblue opacity-70 pr-1'>Total Bets:</span>
						<span class='text-lightblue'>$256,78</span>
					</div>
				</div>
				{#each new Array(9).fill(0) as bet, i}
					<div class='flex px-6 py-4 items-center relative' style:background='{i % 2 ? "#21283F" : "transparent"}'>
						<img class='rounded mr-4'
								 width='40px'
								 height='40px'
								 alt='user profile avatar'
								 src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg' />
						<div class='flex bg-cover bg-center w-14 h-10 border-2 border-lightblue/10 rounded-md mr-3'
								 style:background-image='url("https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWdY781lxLuW8Njw31Dn8xc_YTqmJ4DDJFM2ZwqE_ATtx-u7g8C5vpjOzHM263E8pSGKJ1XuG9M")' />
						<div class='flex flex-col gap-y-0.5 mr-4'>
							<span class='text-lightblue text-xs opacity-70'>Deposit</span>
							<span class='text-white text-xs font-bold'>$33.66</span>
						</div>
						<div class='flex bg-cover bg-center w-14 h-10 border-2 border-lightblue/10 rounded-md mr-3'
								 style:background-image='url("https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWdY781lxLuW8Njw31Dn8xc_YTqmJ4DDJFM2ZwqE_ATtx-u7g8C5vpjOzHM263E8pSGKJ1XuG9M")' />
						<div class='flex flex-col gap-y-0.5 mr-4'>
							<span class='text-lightblue text-xs opacity-70'>Won</span>
							<span class='text-white text-xs font-bold'>$33.66</span>
						</div>
						<span class='multiplier-box text-brown font-bold flex items-center justify-center text-xs'>
	x3.45
						</span>
						<div class='border-block' />
					</div>
				{/each}
			</div>
		</div> 
	<div class='game-area flex flex-col mt-28'>
	<div class='w-100 round-info h-24  flex flex-col p-5 justify-center gap-x-12 relative overflow-hidden'>
				<span class='text-lightblue absolute top-2'>Recent Crashes</span>
				<div class='absolute'>
					<div class='flex flex-row gap-3'>
						{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as recentCrash}
							<div class='recent-crash flex items-center justify-center'>
								<span class='recent-crash-text'>x3.45</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
	<CrashGame />
	<BetInput />
	</div>
	</div>
</div>

<style>
	.round-stats {
		height: 750px;
		width: 420px;
		background: linear-gradient(
			180deg,
			#181d2d 0%,
			rgba(24, 29, 45, 0.69) 100%
		);
		box-shadow: inset 1px 1px 0 rgba(73, 86, 130, 0.12);
		border-radius: 16px;
	}

	.round-info {
		background: linear-gradient(
			180deg,
			#181d2d 0%,
			rgba(24, 29, 45, 0.69) 100%
		);
		box-shadow: inset 1px 1px 0 rgba(73, 86, 130, 0.12);
		border-radius: 16px;
	}

	.multiplier-box {
		width: 51px;
		height: 28px;
		background: linear-gradient(
			321.77deg,
			#ffeb71 -4.42%,
			#eac76c 50.67%,
			rgba(218, 194, 94, 0.69) 102.42%
		);
		border-radius: 6px;
	}

	.border-block {
		height: 28px;
		width: 2px;
		background: linear-gradient(
			0deg,
			#ffeb71 0%,
			#eac76c 51.56%,
			rgba(218, 194, 94, 0.69) 100%
		);
		position: absolute;
		right: 0;
	}

	.game-area {
		height: auto;
		width: 100%;
	}

	.recent-crash {
		border: 1px solid #ffeb71;
		height: 32px;
		width: 61px;
		border-radius: 6px;
	}

	.recent-crash-text {
		color: #ffeb71;
		font-weight: 600;
		font-size: 13px;
	}
</style>
