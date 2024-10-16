<script lang="ts">
  import { userStore } from '../../../stores/user'
  import { writeAddonList, readAddonList } from '../../../api/api'

  function openGamesDir() {
    window.api.openDirectory($userStore.steamGamesDir)
  }

  function openWorkingDir() {
    window.api.openWorkingDirectory()
  }
</script>

<div class="flex flex-wrap gap-4 rounded-lg">
  <button class="btn variant-filled" on:click={openGamesDir}>open game dir</button>
  <button class="btn variant-filled" on:click={openWorkingDir}>open working dir</button>
  <button class="btn variant-filled" on:click={userStore.resetFirstTimeSetup}
    >reset first time setup</button
  >
  <button class="btn variant-filled" on:click={readAddonList}>read addonlist</button>
  <button class="btn variant-filled" on:click={writeAddonList}>write addonlist</button>
</div>
