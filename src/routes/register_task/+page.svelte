<script lang="ts">
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import { dialogs } from 'svelte-dialogs'
	import '../../assets/css/common.css'

	let task_input_element: HTMLInputElement
	let description_input_element: HTMLTextAreaElement
	let price_input_element: HTMLInputElement
	let deadline_input_element: HTMLInputElement

	onMount(() => task_input_element.focus())
</script>

<svelte:head>
	<title>ミッション登録</title>
</svelte:head>
<div>
	<div class="outer">
		<div class="frame glass flex_column">
			<div class="center flex_column_logo">
				<div class="title">ミッション登録</div>
			</div>

			<form
				method="POST"
				class="flex_column"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type == 'success') {
							task_input_element.focus()
							task_input_element.value = ''
							description_input_element.value = ''
							price_input_element.value = ''
							deadline_input_element.value = ''
							dialogs.alert(result.data.message)
						}
					}
				}}
			>
				<input
					bind:this={task_input_element}
					type="text"
					name="task"
					placeholder="タスク"
					required
				/>
				<textarea
					bind:this={description_input_element}
					placeholder="詳細"
					rows="5"
					name="description"
				/>
				<div>
					<input
						bind:this={price_input_element}
						type="number"
						name="price"
						placeholder="単価"
						class="price"
					/>
					<span>円</span>
				</div>
				<input
					type="date"
					bind:this={deadline_input_element}
					name="deadline"
					placeholder="期限"
					required
				/>
				<div class="buttons">
					<button type="submit" class="button">ミッション登録</button>
				</div>
				<div>
					<a href="task_list">ミッション一覧</a>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	form div {
		color: #fff;
	}
	input textarea {
		width: calc(100% - 18px);
	}

	input.price {
		width: 100px;
		text-align: right;
	}

	button {
		white-space: nowrap;
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
		padding: 0 30px;
		display: flex;
		justify-content: center;
		align-items: center;
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
