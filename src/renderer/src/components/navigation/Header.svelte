<script lang="ts">
  import {
    Tab,
    TabGroup,
    modalStore,
    type ModalComponent,
    type ModalSettings,
    type PopupSettings,
    ProgressRadial
  } from '@skeletonlabs/skeleton'
  import { HelpCircleIcon, LucideListTodo, Settings } from 'lucide-svelte'
  import games from 'shared/games'
  import { writeAddonList } from '../../api/api'
  import { userStore } from '../../stores/user'
  import { view } from '../../stores/view'
  import GameManager from './GameManager.svelte'
  import HelpModal from './HelpModal.svelte'
  import { isUnsubscribeOngoing } from '../../stores/library'
  import { L4D2_GAME_ID } from '../../utils'
  import { liveQuery } from 'dexie'
  import { db } from '../../db/db'
  import { totalConflictingAddons } from '../../features/library/conflicts/conflicts'
  import LibraryDisplayMode from '../library/LibraryDisplayMode.svelte'
  import SettingsModal from '../../features/settings/SettingsModal.svelte'
  import UpdateChecker from '../../features/updates/UpdateChecker.svelte'
  import RefreshManifestButton from '../../features/nav/RefreshManifestButton.svelte'
  import PlaylistsManager from '../../features/nav/PlaylistsManager.svelte'
  import { funkyDrawerStore } from '../funky-drawer/store'

  async function launchGame() {
    await writeAddonList()
    //window.api.openLinkInBrowser(`steam://rungameid/550//${$launchParameters}`)
    window.api.openLinkInBrowser(`steam://rungameid/550/`)
  }

  function openHelpModal() {
    const modalComponent: ModalComponent = {
      ref: HelpModal,
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      component: modalComponent
    }

    modalStore.trigger(modal)
  }

  function openSettingsModal() {
    const modalComponent: ModalComponent = {
      ref: SettingsModal,
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
  }

  function openPlaylistManager() {
    funkyDrawerStore.set('playlists-manager')
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

      <RefreshManifestButton />
    </div>

    <div class="place-self-center flex items-stretch overflow-hidden rounded-full">
      <button
        on:click={openPlaylistManager}
        class="bg-primary-700/50 hover:bg-primary-700/70 flex items-center px-4 py-1 flex-1 h-full"
      >
        <LucideListTodo size={21} />
        <!-- <img src={games[L4D2_GAME_ID]?.gameLogo} class="w-5 mr-1" alt="" /> -->

        <div class="flex pl-2 gap-[2px] flex-col justify-evenly items-start [&>*]:leading-none">
          <span class="text-[12px]">Selected Playlist</span>
          <span
            class="text-sm font-semibold max-w-[128px] text-ellipsis whitespace-nowrap overflow-hidden"
            >{$activeProfile?.label}</span
          >
        </div>
      </button>

      <button
        class="flex items-center pr-4 pl-3 bg-primary-500 hover:bg-primary-500/80"
        on:click={launchGame}
      >
        <!-- <LucidePlay class="mr-2" size={16} /> -->
        <img src={games[L4D2_GAME_ID]?.gameLogo} class="w-5 mr-2" alt="" />
        Play
      </button>
    </div>

    <GameManager />
    <PlaylistsManager />

    <div class="place-self-end flex gap-2">
      <UpdateChecker />

      <button class="btn btn-sm variant-filled-surface" on:click={openHelpModal}>
        <HelpCircleIcon class="w-4 mr-2 inline" />
        Help
      </button>
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

        <!-- <Tab bind:group={$view} name="load-order" value={'load-order'}>Priority Load</Tab> -->

        <!-- <Tab bind:group={$view} name="vocalizer" value={'vocalizer'}>Vocalizer</Tab> -->

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

      <LibraryDisplayMode />
    </div>
  </div>
</div>
