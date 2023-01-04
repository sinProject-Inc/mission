<script lang="ts">
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import { Api } from '$lib/api'
	import { dialogs } from 'svelte-dialogs'
	import '../../assets/css/common.css'

	onMount(() => console.log('登録完了'))
</script>

<svelte:head>
	<title>登録完了</title>
</svelte:head>
<div>
	<div class="outer">
		<div class="center title inner">
			<div class="title_text left">ユーザー登録が完了しました</div>
		</div>
		<div class="center inner">
			<form
				method="POST"
				class="flex_column"
				use:enhance={() => {
					return async ({ result }) => {
						// if (result.type == 'success') {
						// 	email_input_element.value = ''
						// 	password_input_element.value = ''
						// 	username_input_element.value = ''
						// 	display_name_input_element.value = ''
						// 	dialogs.alert(result.data.message)
						// }
					}
				}}
			/>
		</div>
	</div>
</div>

<style>
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

	.center {
		text-align: center;
	}

	.flex_column {
		display: flex;
		flex-flow: column;
		gap: 8px;
	}
</style>
