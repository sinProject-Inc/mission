<script lang="ts">
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import { Api } from '$lib/api'
	import { dialogs } from 'svelte-dialogs'
	import { Email } from '$lib/general/email'
	import { Password } from '$lib/general/password'
	import { EmptyError, IllegalValueError } from '$lib/general/errors'
	import '../../assets/css/common.css'

	let email_input_element: HTMLInputElement
	let password_input_element: HTMLInputElement
	let username_input_element: HTMLInputElement
	let display_name_input_element: HTMLInputElement
	let error_email = ''
	let error_password = ''
	let error_username = ''

	onMount(() => email_input_element.focus())

	const onBlurEmail = async () => {
		let email: Email
		error_email = ''

		try {
			email = new Email(email_input_element.value)
		} catch (error: Error | unknown) {
			if (error instanceof EmptyError) {
				error_email = 'メールアドレスを入力してください'
			}
			if (error instanceof IllegalValueError) {
				error_email = '正しいメールアドレスを入力してください'
			}
			email_input_element.focus()
			return
		}

		email_input_element.value = email.email
	}

	const onBlurPassword = async () => {
		error_password = ''
		let password: Password

		try {
			password = new Password(password_input_element.value)
		} catch (error: Error | unknown) {
			if (error instanceof EmptyError) {
				error_password = 'パスワードを入力してください'
			}
			if (error instanceof IllegalValueError) {
				error_password =
					'パスワードは半角小文字、半角大文字、数字をすべて含む8文字以上で入力してください'
			}
			password_input_element.focus()
			return
		}

		password_input_element.value = password.password
	}

	const onBlurUsername = async () => {
		error_username = ''
		const username = username_input_element.value.trim()

		if (username === '') return

		//@ts-ignore
		const isExist = await new Api().username_exists(username)
		if (isExist) {
			error_username = 'ユーザー名が既に存在します'
			username_input_element.focus()
		}
		username_input_element.value = username
	}
</script>

<svelte:head>
	<title>Welcome to Mission!</title>
</svelte:head>
<div>
	<div class="outer">
		<div class="center title inner">
			<div class="title_text left">Welcome to Mission!</div>
		</div>
		<div class="center inner">
			<form
				method="POST"
				class="flex_column"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type == 'success') {
							email_input_element.value = ''
							password_input_element.value = ''
							username_input_element.value = ''
							display_name_input_element.value = ''
							dialogs.alert(result.data.message)
						}
					}
				}}
			>
				<input
					bind:this={email_input_element}
					type="text"
					name="email"
					placeholder="メールアドレス"
					required
					on:blur={onBlurEmail}
				/>
				<span>
					{error_email}
				</span>
				<input
					bind:this={password_input_element}
					type="password"
					name="password"
					placeholder="パスワード"
					required
					on:blur={onBlurPassword}
				/>
				{error_password}
				<input
					bind:this={username_input_element}
					type="text"
					name="username"
					placeholder="ユーザー名"
					required
					on:blur={onBlurUsername}
				/>
				<span>
					{error_username}
				</span>
				<input
					bind:this={display_name_input_element}
					type="text"
					name="displayname"
					placeholder="表示名"
				/>
				<button type="submit" class="button half">登録</button>
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
