<script lang="ts">
  import { writeAddonList } from '../api/api'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import GamePicker from './GamePicker.svelte'
  import ProfilesManager from './ProfilesManager.svelte'

  function openGamesDir() {
    window.api.openDirectory($userStore.steamGamesDir)
  }

  function openWorkingDir() {
    window.api.openWorkingDirectory()
  }

  let buildingManifest = false

  async function handleRequestManifest() {
    if (buildingManifest) return

    buildingManifest = true

    try {
      let req = await window.api.requestGameManifest({
        appId: $userStore.activeGameId,
        onlineMetadataFetching: true,
        mode: 'full-update',
        steamGamesDir: $userStore.steamGamesDir
      })

      if (req) {
        $currentGameManifest = req
      }
    } catch (e) {
      console.error(e)
    } finally {
      buildingManifest = false
    }
  }

  async function launchGame() {
    await writeAddonList()
    //window.api.openLinkInBrowser(`steam://rungameid/550//${$launchParameters}`)
    window.api.openLinkInBrowser(`steam://rungameid/550/`)
  }
</script>

<div class="space-y-4 p-6">
  <h3 class="h3">General settings</h3>
  <div class="space-y-4 rounded-lg">
    <label class="label">
      <span>Steam games folder</span>
      <input
        bind:value={$userStore.steamGamesDir}
        class="input variant-form-material"
        type="text"
        placeholder="Input"
      />
    </label>

    <button class="btn variant-filled">search</button>
  </div>

  <h3 class="h3">Game</h3>
  <div class="space-y-4 rounded-lg">
    <GamePicker />

    <button
      class="btn variant-filled mt-2"
      on:click={handleRequestManifest}
      disabled={buildingManifest}>build manifest</button
    >

    <button class="btn variant-filled ml-2" on:click={writeAddonList}>Write addonslist</button>

    <button class="btn variant-filled ml-2" on:click={launchGame}>Launch game</button>

    {#if buildingManifest}
      <p>Building manifest...</p>
    {/if}

    <div class="space-y-4 pl-8">
      <hr />

      <h4 class="h4">Profile</h4>

      <ProfilesManager />
    </div>
  </div>

  <h3 class="h3">Developer</h3>
  <div class="space-x-2 rounded-lg">
    <button class="btn variant-filled" on:click={openGamesDir}>open game dir</button>
    <button class="btn variant-filled" on:click={openWorkingDir}>open working dir</button>
  </div>
</div>
