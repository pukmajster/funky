<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { X } from 'lucide-svelte'
  import SettingsTab from './SettingsTab.svelte'
  import SettingsPageSteamWebApi from './subpages/SettingsPageSteamWebApi.svelte'
  import SettingsPageDev from './subpages/SettingsPageDev.svelte'
  import SettingsPageAbout from './subpages/SettingsPageAbout.svelte'
  import SettingsPageGamesDirectory from './subpages/SettingsPageGamesDirectory.svelte'

  function close() {
    modalStore.close()
  }

  interface TabDetails {
    label: string
    value: string
    component: any
    seperated?: boolean
  }

  const tabs: TabDetails[] = [
    {
      label: 'Steam Games Directory',
      value: 'gameDir',
      component: SettingsPageGamesDirectory
    },
    {
      label: 'Steam Web API Key',
      value: 'swebapi',
      component: SettingsPageSteamWebApi
    },
    {
      label: 'About',
      value: 'about',
      component: SettingsPageAbout,
      seperated: true
    },
    {
      label: 'Developer',
      value: 'dev',
      component: SettingsPageDev,
      seperated: true
    }
  ] as const

  type Tab = (typeof tabs)[number]['value']
  let activeTab: Tab = 'gameDir'

  $: activeTabData = tabs.find((tab) => tab.value == activeTab)
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
        <SettingsTab bind:activeTab value={tab.value} label={tab.label} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-4 px-4 pt-4">
    <div class="flex justify-between items-center">
      <p class="text-xl font-semibold uppercase">{activeTabData.label}</p>
      <button on:click={close} class="ml-auto btn btn-icon btn-sm"> <X size={24} /></button>
    </div>

    <svelte:component this={activeTabData.component} />
  </div>
</div>
