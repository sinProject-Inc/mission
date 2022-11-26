<script lang="ts">
    import { enhance } from '$app/forms'
    import { onMount } from 'svelte';
    import { dialogs } from "svelte-dialogs";
  
    let task_input_element: HTMLInputElement
    let description_input_element: HTMLTextAreaElement
    let price_input_element: HTMLInputElement

    onMount(() => task_input_element.focus())
  
  </script>
  
  <svelte:head>
    <title>タスク登録</title>
  </svelte:head>
  <div>
    <div class="outer">
      <div class="frame glass flex_column">
        <div class="center flex_column_logo">
          <div class="login_text">タスク登録</div>
        </div>
  
        <form
          method="POST"
          class="flex_column"
          use:enhance={() => {
            console.log('post')
            return async ({ result }) => {
              if (result.type == 'success') {
                task_input_element.focus()
                task_input_element.value = ''
                description_input_element.value = ''
                price_input_element.value = ''
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
          <textarea bind:this={description_input_element} placeholder="詳細" rows="5" name="description"></textarea>
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
          <div class="buttons">
            <button type="submit">タスク登録</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
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
  
    .login_text {
      font-size: 26px;
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
      background: rgba(240, 240, 240, 0.5);
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