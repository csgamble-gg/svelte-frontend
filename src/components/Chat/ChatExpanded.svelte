<script lang="ts">
	import { Avatar } from '@csgamble-gg/nebula-ui';

	import { slideLeft } from '../../transitions/slideX';
	const sampleChat = [
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: 'Hey guys, this is cool!'
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},

		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},

		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		},
		{
			avatar:
				'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac292f8791d0ea5888172186853d2d144031ee7d_full.jpg',
			name: 'Scrapbeak',
			message: "Don't you think this is cool?"
		}
	];
</script>

<div
	class="wrapper"
	transition:slideLeft={{
		from: 'right',
		duration: 400,
		skip: false
	}}
>
	<div class="chats">
		{#each sampleChat as chat, i}
			{#if i !== 1}
				<div class="chat">
					<div class="avatar">
						<Avatar image={chat.avatar} />
					</div>
					<div class="bubble">
						<span class="name">{chat.name}</span>
						<div class="message">{chat.message}</div>
					</div>
				</div>
			{/if}
			<div class="chat">
				<div class="bubble">
					<span class="name">{chat.name}</span>
					<div class="message">{chat.message}</div>
				</div>
				<div class="avatar">
					<Avatar image={chat.avatar} />
				</div>
			</div>
		{/each}
	</div>
	<div class="input-wrapper">
		<input class="input" placeholder="Type a message..." />
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 322px;
		// background: linear-gradient(
		// 		180deg,
		// 		rgba(0, 0, 0, 0) 19.26%,
		// 		rgba(0, 0, 0, 0.2) 100%
		// 	),
		// 	#141826;
		// box-shadow: 0px 0px 100px #0e0f17;
		flex: 1;
		height: 100%;
		padding: 0px 0px 0px 25px;
	}

	.chats {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 18px;
		padding: 25px;
		overflow-y: scroll;
	}

	.chat {
		display: flex;
		flex-direction: row;
		gap: 13px;
		.bubble {
			.name {
				font-weight: 500;
				font-size: 11px;
				line-height: 16px;
				color: rgba(190, 210, 255, 0.7);
			}
			.message {
				font-weight: 500;
				font-size: 14px;
				line-height: 21px;
				color: #ffffff;
			}
			width: 100%;
			background: linear-gradient(
				270deg,
				rgba(64, 76, 117, 0.3) 0%,
				rgba(64, 76, 117, 0.12) 100%
			);
			border-radius: 8px;
			padding: 10px 12px;
		}
	}

	.input-wrapper {
		align-self: flex-end;
		background-color: rgba(0, 0, 0, 0.3);
		height: 57px;
		width: 100%;
		display: flex;
		flex-direction: column;

		.input {
			padding: 20px;
			background-color: transparent;
			border: none;
			caret-color: var(--variant-yellow-color);

			&:focus {
				outline: none;
			}
		}

		// padding: 20px 25px;
	}
</style>
