<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'
  import "../../assets/css/common.css";

	/** @type {import('./$types').PageData} */
	export let data: PageData
</script>

<svelte:head>
	<title>ミッション一覧</title>
</svelte:head>
<div>
	<div class="outer">
		<div class="center title">
			<div class="title_text left">ミッション一覧</div>
      <div><a class="button" href="register_task">New Mission</a></div>
		</div>
		<div class="left task-list">
			<form method="POST" class="flex_column" use:enhance={() => {}}>
				<ul class="task-outer">
					{#each data.tasks as task}
						<li>
							<ul class="task-inner">
								<li class="task-title">{task.name}</li>
								<li>{task.description}</li>
								<li>{task.price}</li>
							</ul>
						</li>
					{/each}
				</ul>
			</form>
		</div>
	</div>
</div>

<style>
	.title_text {
		font-size: 26px;
	}

	.outer {
		height: 100vh;
		padding: 0 30px;
		display: flex;
		justify-content: center;
		align-items: center;
    flex-direction: column;
	}

	.center {
		text-align: center;
	}

  .left {
    text-align: left;
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

	.title {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
    align-items: center;
	}

  .task-list {
    width: 100%;
    height: 100%;
  }

  .task-outer {
    width: 95%;
  }

  ul.task-outer {
    padding-left: 0;
    margin-left: 0;
  }

  .task-outer li {
    list-style: none;
  }

  .task-inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border: 0.5px solid gray;
    padding: 10px;
  }

  .task-title {
    font-size: 1.2rem;
    font-weight: bold;
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
