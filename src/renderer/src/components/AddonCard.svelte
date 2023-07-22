<script lang="ts">
  import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
  import type { Addon } from 'shared'
  import { conflictGroups } from '../stores/conflicts'
  import { addonOverviewId, libraryActiveSubCategories } from '../stores/library'
  import { userStore } from '../stores/user'
  import {
    derivedEnabledAddonIds,
    derviedAddonIdsInEnabledShuffles
  } from '../stores/user-derivatives'

  export let addon: Addon
  export let asShuffle: boolean = false

  $: thumbnail = `file:///${$userStore.steamGamesDir}/Left 4 Dead 2/left4dead2/addons/workshop/${addon.id}.jpg`
  $: isEnabled = $derivedEnabledAddonIds.includes(addon.id)
  $: isShuffled = $derviedAddonIdsInEnabledShuffles.includes(addon.id)
  $: isConflicting = $conflictGroups.some((group) =>
    group.some((conflictingMod) => conflictingMod.id == addon.id)
  )

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
    const data = { addonId: addon.id }
    event.dataTransfer.setData('text/plain', JSON.stringify(data))
  }

  function openOverview() {
    $addonOverviewId = addon.id

    const settings: DrawerSettings = {
      id: 'addon-overview',
      width: 'w-[70%] max-w-[900px]',
      rounded: 'rounded-none'
    }

    drawerStore.open(settings)
  }
</script>

<button
  draggable={true}
  on:dragstart={dragStart}
  on:contextmenu={openOverview}
  class="relative"
  class:enabled={isEnabled}
  class:asShuffle
  on:click={toggleModEnable}
>
  <img alt="mod" class="  w-[200px] aspect-[5/3] w-full" src={thumbnail} />

  {#if !asShuffle}
    <div
      class="absolute justify-center bottom-0 right-0 left-0 hidden"
      class:addonEnabled={isEnabled}
    >
      Enabled
    </div>

    <div
      class="absolute justify-center bottom-0 right-0 left-0 hidden"
      class:addonConflicting={isConflicting}
    >
      Conflicting
    </div>

    <div
      class="absolute justify-center bottom-0 right-0 left-0 hidden"
      class:addonShuffled={isShuffled}
    >
      Shuffled
    </div>
  {/if}
</button>

<style>
  .addonEnabled {
    @apply bg-green-600 flex;
  }

  .addonShuffled {
    @apply bg-blue-800 flex;
  }

  .addonConflicting {
    @apply bg-orange-600 flex;
  }

  .asShuffle {
    @apply min-w-[120px] max-w-[120px]  aspect-[16/9];
  }
</style>
