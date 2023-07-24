<script lang="ts">
  import { SlideToggle, Tab, TabGroup, modalStore } from '@skeletonlabs/skeleton'
  import { writeAddonList } from '../api/api'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import GamePicker from './GamePicker.svelte'
  import ProfilesManager from './ProfilesManager.svelte'
  import SteamGamesDirectoryManager from './SteamGamesDirectoryManager.svelte'

  function close() {
    modalStore.close()
  }

  function openGamesDir() {
    window.api.openDirectory($userStore.steamGamesDir)
  }

  function openWorkingDir() {
    window.api.openWorkingDirectory()
  }

  let tabSet: 'game dir' | 'dev' | 'networking' = 'game dir'

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
</script>

<div
  class=" bg-surface-800 max-w-[600px] w-full min-h-[600px] shadow-lg rounded-lg space-y-4 overflow-hidden"
>
  <TabGroup active="variant-filled-primary" hover="hover:variant-soft-primary" rounded="">
    <Tab bind:group={tabSet} name="tab1" value={'game dir'}>
      <span>Games Directory</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab2" value={'networking'}>Networking</Tab>
    <Tab bind:group={tabSet} name="tab3" value={'dev'}>Dev</Tab>

    <svelte:fragment slot="panel">
      <div class="space-y-2 p-4 pt-0">
        {#if tabSet === 'game dir'}
          <h4 class="h4">General</h4>
          <SteamGamesDirectoryManager />

          <p>Not sure where to find your Steam Games directory?</p>

          <hr />

          <div class="space-y-4 rounded-lg">
            <GamePicker />

            <div class="flex gap-2">
              <button
                class="btn variant-filled"
                on:click={handleRequestManifest}
                disabled={buildingManifest}>build manifest</button
              >

              <button class="btn variant-filled" on:click={writeAddonList}>Write addonslist</button>
            </div>

            {#if buildingManifest}
              <p>Building manifest...</p>
            {/if}

            <div class="space-y-4 pl-8">
              <hr />

              <h4 class="h4">Profile</h4>

              <ProfilesManager />
            </div>
          </div>
        {:else if tabSet === 'dev'}
          <h4 class="h4">Developer</h4>
          <div class="space-x-2 rounded-lg">
            <button class="btn variant-filled" on:click={openGamesDir}>open game dir</button>
            <button class="btn variant-filled" on:click={openWorkingDir}>open working dir</button>
          </div>
        {:else if tabSet === 'networking'}
          <h4 class="h4">Networking</h4>

          <SlideToggle
            name="onlineMetadataFetching"
            active="bg-green-500"
            bind:checked={$userStore.enableNetworking}
            class="flex items-center gap-2"
          >
            {#if $userStore.enableNetworking}
              <span class="text-green-500">Enabled</span>
            {:else}
              <span class="text-red-500">Disabled</span>
            {/if}
          </SlideToggle>

          <p>
            A surprising amout of mod VPKs come with incorrectly syntaxed or straight up missing
            addoninfo.txt's. Without these files, Sourcebox can't read typical mod metadata, like
            titles and descriptions. By enabling networking, Sourcebox can fetch mod metadata online
            by contacting the Steam workshop directly.
          </p>
        {/if}
      </div>
    </svelte:fragment>

    <button on:click={close} class="btn ml-auto btn-sm">Close</button>
  </TabGroup>
</div>
