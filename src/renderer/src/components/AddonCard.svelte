<script lang="ts">
  import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
  import { AlertTriangle, Check, CheckCircle2, Dices } from 'lucide-svelte'
  import type { Addon, Game } from 'shared'
  import games from 'shared/games'
  import thumbnailFallback from '../assets/addon-thumbnail-fallback.jpg'
  import { conflictGroups } from '../stores/conflicts'
  import {
    addonOverviewId,
    derviedAddonIdsInEnabledShuffles,
    installedAddons,
    isDraggingAddon,
    libraryActiveSubCategories,
    librarySelectedAddonIds,
    unsubscribedItemsThisSession
  } from '../stores/library'
  import { userStore } from '../stores/user'
  import { derivedEnabledAddonIds } from '../stores/user-derivatives'
  const handleMissingThumbnail = (ev) => (ev.target.src = thumbnailFallback)

  export let addon: Addon
  export let asShuffle: boolean = false
  export let mode: 'in-shuffle-list' | 'card'

  // Thumbnail based on the active game id, and if it's from the workshop
  $: activeGameId = $userStore.activeGameId
  $: activeGameDetails = games[activeGameId] as Game
  $: thumbnail = `file:///${$userStore.steamGamesDir}/common/${
    activeGameDetails.rootDirectoryName
  }/${activeGameDetails.gameDirectory}/addons${
    addon.workshop?.publishedFileId ? '/workshop' : ''
  }/${addon.workshop?.publishedFileId}.jpg`
  $: isEnabled = $derivedEnabledAddonIds.includes(addon.id)
  $: isShuffled = $derviedAddonIdsInEnabledShuffles.includes(addon.id)
  $: isConflicting = $conflictGroups.some((group) =>
    group.some((conflictingMod) => conflictingMod.id == addon.id)
  )
  $: wasUnsubscribed = $unsubscribedItemsThisSession.includes(addon.id)
  $: isInstalled = $installedAddons.includes(addon.id)

  $: selected = $librarySelectedAddonIds.includes(addon.id)
  $: otherModsSelectedButNotThisOne = $librarySelectedAddonIds.some((id) => id != addon.id)
  $: userIsSelecting = $librarySelectedAddonIds.length > 0

  function toggleModEnable() {
    if (isShuffled) {
      if ($libraryActiveSubCategories.length == 0) return
      userStore.toggleAddonShuffleForSubCategory($libraryActiveSubCategories[0], addon.id)
      return
    }

    // $derivedIsShuffleEnabledForSubCategory
    //   ? userStore.toggleAddonShuffleForSubCategory(libraryActiveSubCategories[0], addon.id)
    //   : userStore.toggleAddonEnabledState(addon.id)

    userStore.toggleAddonEnabledState(addon.id)
  }

  function dragStart(event) {
    $isDraggingAddon = true
    const data = { addonId: addon.id }
    event.dataTransfer.setData('text/plain', JSON.stringify(data))
  }

  function dragEnd(event) {
    event.preventDefault()
    $isDraggingAddon = false
  }

  function openOverview() {
    $addonOverviewId = addon.id

    const settings: DrawerSettings = {
      id: 'addon-overview',
      width: 'w-[50%] max-w-[600px]',
      rounded: 'rounded-none'
    }

    drawerStore.open(settings)
  }

  function handleClick(e: MouseEvent) {
    if (!e.ctrlKey) {
      if (!userIsSelecting) {
        toggleModEnable()
        return
      }
    }

    librarySelectedAddonIds.update((addons) => {
      if (addons.includes(addon.id)) {
        return addons.filter((id) => id != addon.id)
      } else {
        return [...addons, addon.id]
      }
    })
  }

  // handleShiftMouseEnter
  function handleMouseEnter(e: MouseEvent) {
    //if (uninstalled) return

    if (!e.shiftKey) return
    if (!e.ctrlKey) return

    // toggle mod selection
    librarySelectedAddonIds.update((addons) => {
      if (addons.includes(addon.id)) {
        return addons.filter((id) => id != addon.id)
      } else {
        return [...addons, addon.id]
      }
    })
  }

  const tagStyle =
    'absolute items-center justify-center shadow-md font-bold uppercase -bottom-1 rounded-full backdrop-blur-md w-[60%] py-1 text-[12px] left-[50%] translate-x-[-50%] hidden'
</script>

{#if mode == 'in-shuffle-list'}
  <div
    draggable={true}
    on:dragstart={dragStart}
    on:dragend={dragEnd}
    on:contextmenu={openOverview}
    class="flex items-center gap-2"
    class:unsubscribed={wasUnsubscribed}
  >
    <img
      alt="mod"
      on:error={handleMissingThumbnail}
      class="shadow-md rounded-md w-[64px] aspect-[5/3]"
      src={thumbnail}
    />

    <span class="text-sm">{addon.addonInfo.title}</span>
  </div>
{:else}
  <button
    on:mouseenter={handleMouseEnter}
    draggable={true}
    on:dragstart={dragStart}
    on:dragend={dragEnd}
    on:contextmenu={openOverview}
    class:selected
    class:unselected={otherModsSelectedButNotThisOne && !selected}
    class="relative shadow-md transition-transform"
    class:enabled={isEnabled}
    class:asShuffle
    class:unsubscribed={wasUnsubscribed}
    on:click={handleClick}
  >
    <img
      alt="mod"
      on:error={handleMissingThumbnail}
      class=" rounded-md w-[200px] aspect-[5/3] w-full"
      src={thumbnail}
    />

    {#if selected}
      <div
        class="selected-overlay absolute inset-0 bg w-full h-full right-0 justify-center items-center flex"
      >
        <div class="backdrop-blur-lg rounded-full">
          <CheckCircle2 size={64} />
        </div>
      </div>
    {/if}

    {#if !asShuffle}
      <div class={tagStyle} class:addonEnabled={isEnabled}>
        <Check class="w-4 mr-2" />
        Enabled
      </div>

      <div class={tagStyle} class:addonConflicting={isConflicting}>
        <AlertTriangle class="w-4 mr-2" />
        Conflicting
      </div>

      <div class={tagStyle} class:addonUninstalled={!isInstalled}>
        <AlertTriangle class="w-4 mr-2" />
        Uninstalled
      </div>

      <div class={tagStyle} class:addonShuffled={isShuffled}>
        <Dices class="w-4 mr-2" />
        Shuffle
      </div>
    {/if}
  </button>
{/if}

<style lang="postcss">
  .selected {
    outline: 1px solid #6abcffc0;
    @apply outline-primary-500;
    border-radius: 2px;
    opacity: 0.9;

    box-shadow: 0 0 16px 3px #ffffff23;
  }

  .unsubscribed {
    filter: grayscale(100%);
    opacity: 0.5;
    transform: scale(0.8);
  }

  .unselected {
    opacity: 0.5;
    transform: scale(0.8);
  }

  .addonEnabled {
    @apply bg-green-700/80 flex;
  }

  .addonShuffled {
    @apply bg-blue-800/80 flex;
  }

  .addonConflicting {
    @apply bg-orange-600/60 flex;
  }

  .asShuffle {
    @apply min-w-[120px] max-w-[120px]  aspect-[16/9];
  }

  .addonUninstalled {
    @apply bg-red-600/60 flex;
  }
</style>
