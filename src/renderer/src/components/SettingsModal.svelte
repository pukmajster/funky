<script lang="ts">
  import { SlideToggle, Tab, TabGroup, modalStore } from '@skeletonlabs/skeleton'
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
          <h3 class="h3">Steam Games Directory</h3>
          <SteamGamesDirectoryManager />

          <p>Not sure where to find your Steam Games directory?</p>
        {:else if tabSet === 'dev'}
          <h3 class="h3">Developer</h3>
          <div class="space-x-2 rounded-lg">
            <button class="btn variant-filled" on:click={openGamesDir}>open game dir</button>
            <button class="btn variant-filled" on:click={openWorkingDir}>open working dir</button>
          </div>
        {:else if tabSet === 'networking'}
          <h3 class="h3">Networking</h3>

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
