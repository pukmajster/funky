<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { X } from 'lucide-svelte'
  import SettingsPageSteamWebApi from './subpages/SettingsPageSteamWebApi.svelte'
  import SettingsPageDev from './subpages/SettingsPageDev.svelte'
  import SettingsPageAbout from './subpages/SettingsPageAbout.svelte'
  import SettingsPageGamesDirectory from './subpages/SettingsPageGamesDirectory.svelte'
  import SettingsPageGeneral from './subpages/SettingsPageGeneral.svelte'
  import SettingsTab from './SettingsTab.svelte'

  function close() {
    modalStore.close()
  }

  interface TabDetails {
    readonly label: string
    readonly id: string
    readonly component: any
    readonly seperated?: boolean
  }

  const tabs: TabDetails[] = [
    {
      label: 'General',
      id: 'general',
      component: SettingsPageGeneral
    },

    {
      label: 'Steam Games Directory',
      id: 'gameDir',
      component: SettingsPageGamesDirectory,
      seperated: true
    },
    {
      label: 'Steam Web API Key',
      id: 'swebapi',
      component: SettingsPageSteamWebApi
    },
    {
      label: 'About',
      id: 'about',
      component: SettingsPageAbout,
      seperated: true
    },
    {
      label: 'Developer',
      id: 'dev',
      component: SettingsPageDev,
      seperated: true
    }
  ]

  type Tab = (typeof tabs)[number]['id']
  let activeTab: Tab = 'general'

  $: activeTabData = tabs.find((tab) => tab.id == activeTab)
</script>

<div
  class=" bg-surface-800 m-6 w-[80%] h-[90%] max-w-[1100px] max-h-[800px] grid grid-cols-[256px_1fr] shadow-lg rounded-lg overflow-hidden"
>
  <div class="bg-surface-700 w-full">
    <div class="w-full flex flex-col">
      <h3 class="px-5 pt-6 pb-4 font-semibold text-xl uppercase">Funky Settings</h3>

      {#each tabs as tab}
        {#if tab?.seperated}
          <hr class="!border-surface-500 my-2" />
        {/if}
        <SettingsTab bind:activeTab value={tab.id} label={tab.label} />
      {/each}
    </div>
  </div>

  <div class="overflow-y-auto">
    <div
      class="flex justify-between items-center sticky top-0 backdrop-blur-xl p-4 z-10 bg-surface-800/80"
    >
      <p class="text-xl font-semibold uppercase">{activeTabData.label}</p>
      <button on:click={close} class="ml-auto btn btn-icon btn-sm"> <X size={24} /></button>
    </div>

    <div class="px-4 pb-4 flex flex-col gap-3">
      <svelte:component this={activeTabData.component} />
    </div>
  </div>
</div>
