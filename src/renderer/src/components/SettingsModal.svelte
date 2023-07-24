<script lang="ts">
  import { SlideToggle, Tab, TabGroup, modalStore } from '@skeletonlabs/skeleton'
  import { X } from 'lucide-svelte'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
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
  class=" bg-surface-800 max-w-[600px] w-full min-h-[400px] shadow-lg rounded-lg space-y-4 overflow-hidden"
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
          <h4 class="h4">Games Directory</h4>
          <SteamGamesDirectoryManager />
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
            A surprising amount of mod VPKs come with incorrectly formatted or straight up missing
            addoninfo.txt's. Without these files, Sourcebox can't read typical mod metadata, like
            titles and descriptions.
          </p>

          <p>
            By enabling networking, Sourcebox can fetch mod metadata online by contacting the Steam
            workshop directly. This request does not contain any personal data, only a list of mod
            IDs with missing data.
          </p>
        {/if}
      </div>
    </svelte:fragment>

    <button on:click={close} class="btn btn-icon ml-auto btn-sm"> <X size={24} /></button>
  </TabGroup>
</div>
