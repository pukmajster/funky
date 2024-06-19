<script lang="ts">
  import {
    Tab,
    TabGroup,
    modalStore,
    popup,
    type ModalComponent,
    type ModalSettings,
    type PopupSettings,
    ProgressRadial
  } from '@skeletonlabs/skeleton'
  import { HelpCircleIcon, InfoIcon, LucidePlay, RefreshCw, Settings } from 'lucide-svelte'
  import games from 'shared/games'
  import { writeAddonList } from '../api/api'
  import { isRequestingGameManifest, requestManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import { view } from '../stores/view'
  import AboutModal from './AboutModal.svelte'
  import GameManager from './GameManager.svelte'
  import HelpModal from './HelpModal.svelte'
  import SettingsModal from './SettingsModal.svelte'
  import { isUnsubscribeOngoing } from '../stores/library'
  import { L4D2_GAME_ID } from '../utils'
  import { liveQuery } from 'dexie'
  import { db } from '../db/db'
  import { totalConflictingAddons } from '../stores/conflicts'

  async function launchGame() {
    await writeAddonList()
    //window.api.openLinkInBrowser(`steam://rungameid/550//${$launchParameters}`)
    window.api.openLinkInBrowser(`steam://rungameid/550/`)
  }

  function openAboutModal() {
    const modalComponent: ModalComponent = {
      // Pass a reference to your custom component
      ref: AboutModal,
      // Add the component properties as key/value pairs
      props: { background: 'bg-primary-500' },
      // Provide a template literal for the default component slot
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
  }

  function openHelpModal() {
    const modalComponent: ModalComponent = {
      // Pass a reference to your custom component
      ref: HelpModal,
      // Add the component properties as key/value pairs
      // Provide a template literal for the default component slot
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
  }

  function openSettingsModal() {
    const modalComponent: ModalComponent = {
      // Pass a reference to your custom component
      ref: SettingsModal,
      // Add the component properties as key/value pairs
      // Provide a template literal for the default component slot
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
  }

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'gameManagerPopup',
    placement: 'top'
  }

  $: activeProfile = liveQuery(async () => await db.profiles.get($userStore.activeProfileId))
</script>

<div class=" bg-surface-800">
  <div class="grid grid-cols-3 gap-4 p-2">
    <div class="flex gap-2">
      <button class="btn btn-sm variant-filled-surface" on:click={openSettingsModal}>
        <Settings size={16} class="mr-2" />
        Settings
      </button>

      <button
        class="btn btn-sm variant-filled-surface"
        on:click={() => requestManifest('quick-refresh')}
        on:contextmenu={() => requestManifest('full-update')}
        disabled={$isRequestingGameManifest}
      >
        {#if $isRequestingGameManifest}
          <RefreshCw size={16} class="animate-spin" />
          <span class="ml-2">Refreshing...</span>
        {:else}
          <RefreshCw size={16} />
          <span class="ml-2">Refresh</span>
        {/if}
      </button>

      <!-- <button class="btn btn-sm bg-primary-500" on:click={launchGame}>
          <img src={games[$userStore?.activeGameId]?.gameLogo} class="w-5 mr-1" alt="" />Launch game</button
        > -->
    </div>

    <!-- <div
      class="z-50 relative btn-group variant-filled-primary [&>*+*]:border-black/50 [&>*]:!text-sm"
    >
      <button use:popup={popupClick} class="h-full">
        <img src={games[$userStore?.activeGameId]?.gameLogo} class="w-5 mr-1" alt="" />
        {games[$userStore?.activeGameId]?.rootDirectoryName}
      </button>
  
      <button class="" on:click={launchGame}> <LucidePlay class="mr-2" size={16} /> Play</button>
    </div> -->

    <div class="place-self-center flex items-stretch overflow-hidden rounded-full">
      <button
        use:popup={popupClick}
        class="bg-primary-700/50 hover:bg-primary-700/70 flex items-center px-4 py-1 flex-1 h-full"
      >
        <img src={games[L4D2_GAME_ID]?.gameLogo} class="w-5 mr-1" alt="" />

        <div class="flex pl-2 gap-1 flex-col justify-evenly items-start [&>*]:leading-none">
          <span class="text-sm">Left 4 Dead 2</span>
          <span class="text-[12px]">{$activeProfile?.label}</span>
        </div>
      </button>

      <button
        class="flex items-center px-4 bg-primary-500 hover:bg-primary-500/60"
        on:click={launchGame}
      >
        <LucidePlay class="mr-2" size={16} /> Play</button
      >
    </div>

    <GameManager />

    <div class="place-self-end flex gap-2">
      <button class="btn btn-sm variant-filled-surface" on:click={openAboutModal}>
        <InfoIcon class="w-4 mr-2 inline" /> About</button
      >

      <button class="btn btn-sm variant-filled-surface" on:click={openHelpModal}>
        <HelpCircleIcon class="w-4 mr-2 inline" />
        Help</button
      >
    </div>
  </div>

  <div
    class="flex justify-between border-t border-solid border-surface-600 bg-surface-800 shadow-xl"
  >
    <div>
      <TabGroup
        active="border-b-2 !text-white border-solid"
        justify="justify-center"
        rounded="text-white/50 uppercase font-bold border-primary-500"
        border=""
        hover="hover:text-white/70"
      >
        <Tab bind:group={$view} name="mods" value={'mods'}>
          <span>Mods</span>
        </Tab>

        <Tab bind:group={$view} name="shuffles" value={'shuffles'}>Shuffles</Tab>

        <Tab bind:group={$view} name="conflicts" value={'conflicts'}
          >{$totalConflictingAddons} Conflicts</Tab
        >

        <!-- <Tab bind:group={$view} name="vocalizer" value={'vocalizer'}>Vocalizer</Tab>

        <Tab bind:group={$view} name="tools" value={'tools'}>Tools</Tab> -->
      </TabGroup>
    </div>

    <div class="flex justify-end pr-4">
      {#if $isUnsubscribeOngoing}
        <span class="flex gap-2 items-center">
          Unsubscribing...
          <ProgressRadial width="w-[21px]" value={undefined} />
        </span>
      {/if}
    </div>
  </div>
</div>
