<script lang="ts">
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import { dialogs } from 'svelte-dialogs'
	import { format_yyyy_mm_dd } from '$lib/date_formatter'

	import '../../assets/css/common.css'
	import type { PageData } from './$types'

	export let data: PageData

	const deadline = data.task?.deadline
	let formattedDeadline = format_yyyy_mm_dd(deadline)

	let tittle: HTMLInputElement

	onMount(() => tittle.focus())
</script>

<svelte:head>
	<title>ミッション編集</title>
</svelte:head>
<div>
	<div class="outer">
		<div class="frame glass flex_column">
			<div class="center flex_column_logo">
				<div class="title">ミッション編集</div>
			</div>

			<form
				method="POST"
				class="flex_column"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type == 'success') {
							dialogs.alert(result.data?.message)
						}
					}
				}}
			>
				<input type="hidden" value={data.task?.id} name="id" />
				<input
					bind:this={tittle}
					value={data.task?.name}
					type="text"
					name="task"
					placeholder="タスク"
					required
				/>
				<textarea value={data.task?.description} placeholder="詳細" rows="5" name="description" />
				<div>
					<input
						value={data.task?.price}
						type="number"
						name="price"
						placeholder="単価"
						class="price"
					/>
					<span>円</span>
				</div>
				<div>
					<input
						value={formattedDeadline}
						type="date"
						name="deadline"
						placeholder="納期"
						required
					/>
				</div>
				<div class="buttons">
					<button type="submit" class="button">更新</button>
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
