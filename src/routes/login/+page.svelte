<script lang="ts">
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import { dialogs } from 'svelte-dialogs'
	import '../../assets/css/common.css'

	let username_input_element: HTMLInputElement
	let password_input_element: HTMLInputElement
	let error_message = ''

	onMount(() => username_input_element.focus())
</script>

<svelte:head>
	<title>Login to Mission</title>
</svelte:head>
<div>
	<div class="outer">
		<div class="center title inner">
			<div class="title_text left">Login to Mission</div>
		</div>
		<div class="center inner">
			<form
				method="POST"
				class="flex_column"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type == 'success') {
							password_input_element.value = ''
							username_input_element.value = ''
						}
					}
				}}
			>
				<input
					bind:this={username_input_element}
					type="text"
					name="username"
					placeholder="ユーザー名"
					required
				/>
				<input
					bind:this={password_input_element}
					type="password"
					name="password"
					placeholder="パスワード"
					required
				/>
				{error_message}
				<button type="submit" class="button half">ログイン</button>
			</form>
		</div>
	</div>
</div>

<style>
	button {
		white-space: nowrap;
	}

	.half {
		width: 50%;
		margin-left: auto;
		margin-right: auto;
	}

	.error {
		color: red;
	}

	.title {
		font-size: 26px;
		color: #fff;
	}

	.outer {
		height: 100vh;
		width: 100vw;
		padding: 0 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 50px;
	}

	.inner {
		width: 500px;
	}

	.frame {
		padding: 30px;
		background: #d93025;
		width: 100%;
		max-width: 500px;
	}

	.glass {
		background: rgba(240, 240, 240, 0.2);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-radius: 8px;
		border: 1px solid rgba(128, 128, 128, 0.25);
		color: black;
	}

	.center {
		text-align: center;
	}

	.buttons {
		display: flex;
		flex-flow: row;
		gap: 8px;
		align-items: start;
		justify-content: flex-end;
		font-size: 11pt;
		min-height: 45px;
	}

	button:disabled {
		color: rgb(200, 200, 200);
	}

	.flex_column_logo {
		display: flex;
		flex-flow: column;
		gap: 0px;
		margin: 6px 0;
	}

	.flex_column {
		display: flex;
		flex-flow: column;
		gap: 8px;
	}

	.logo {
		width: 70%;
	}
</style>
