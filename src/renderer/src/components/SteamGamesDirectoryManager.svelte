<script lang="ts">
  import { userStore } from '../stores/user'
  export let lockStep = false
  export let hideSteamStorageButton = false
</script>

<input class="input variant-form-material" bind:value={$userStore.steamGamesDir} type="text" />

{#if !hideSteamStorageButton}
  <div>
    <a class="btn btn-sm variant-filled-surface !border-none" href="steam://settings/storage">
      Open Steam Storage Settings
    </a>
  </div>
{/if}
