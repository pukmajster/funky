<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { X } from 'lucide-svelte'
  import SteamGamesDirectoryManager from '../../components/SteamGamesDirectoryManager.svelte'
  import SettingsTab from './SettingsTab.svelte'
  import SettingsPageSteamWebApi from './subpages/SettingsPageSteamWebApi.svelte'
  import SettingsPageNetworking from './subpages/SettingsPageNetworking.svelte'
  import SettingsPageDev from './subpages/SettingsPageDev.svelte'
  import SettingsPageAbout from './subpages/SettingsPageAbout.svelte'

  function close() {
    modalStore.close()
  }

  let activeTab: 'GameDir' | 'Dev' | 'Networking' | 'SteamWebApi' | 'About' = 'GameDir'
</script>

<div
  class=" bg-surface-800 m-6 w-[80%] h-[90%] max-w-[1100px] max-h-[800px] grid grid-cols-[256px_1fr] shadow-lg rounded-lg overflow-hidden"
>
  <div class="bg-surface-700 w-full">
    <div class="w-full flex flex-col">
      <h3 class="px-5 pt-6 pb-4 font-semibold text-xl uppercase">Funky Settings</h3>

      <SettingsTab bind:activeTab value={'GameDir'} label="Games Directory" />
      <!-- <SettingsTab bind:activeTab value={'Networking'} label="Networking" /> -->
      <SettingsTab bind:activeTab value={'SteamWebApi'} label="Steam Web API Key" />
      <SettingsTab bind:activeTab value={'About'} label="About" />
      <SettingsTab bind:activeTab value={'Dev'} label="Dev" />
    </div>
  </div>

  <div class="flex flex-col gap-4 p-4">
    <button on:click={close} class="ml-auto btn btn-icon btn-sm"> <X size={24} /></button>

    {#if activeTab === 'GameDir'}
      <SteamGamesDirectoryManager />
    {:else if activeTab === 'Dev'}
      <SettingsPageDev />
    {:else if activeTab === 'Networking'}
      <SettingsPageNetworking />
    {:else if activeTab === 'About'}
      <SettingsPageAbout />
    {:else if activeTab === 'SteamWebApi'}
      <SettingsPageSteamWebApi />
    {/if}
  </div>
</div>
