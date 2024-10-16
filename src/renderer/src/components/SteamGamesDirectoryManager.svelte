<script lang="ts">
  import { userStore } from '../stores/user'
  //import { isDirValidSteamGamesDir } from '../utils/steam-directory'

  // async function browseGameDir() {
  //   let result = await window.api.selectFolder()
  //   if (result) {
  //     state = result
  //   }
  // }

  export let lockStep = false

  //$: isValid = isDirValidSteamGamesDir($userStore.steamGamesDir)

  $: {
    // lockStep = !isValid
  }
</script>

<input class="input variant-form-material" bind:value={$userStore.steamGamesDir} type="text" />

<div>
  <a class="btn btn-sm variant-filled-surface !border-none" href="steam://settings/storage"
    >Open Steam Storage Settings</a
  >
</div>
<!-- 
{#if !isValid && $userStore.steamGamesDir}
  <span class="text-red-500 pl-4 text-xs"> Invalid game diretory. Look again... </span>
{/if}

{#if isValid && $userStore.steamGamesDir}
  <span class="text-green-500 pl-4 text-xs"> Good directory! </span>
{/if} -->
