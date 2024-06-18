<script lang="ts">
  import { ArrowLeft, ArrowRight } from 'lucide-svelte'
  import {
    libraryActiveSubCategories,
    libraryPage,
    libraryPageCount,
    sortingType,
    typeToShow,
    type SortingType,
    type TypeOfMod,
    librarySelectedAddonIds,
    type AddonSource,
    addonSource
  } from '../stores/library'
  import { clamp } from '../utils'
  import {
    ListBox,
    ListBoxItem,
    popup,
    type ModalSettings,
    type PopupSettings,
    modalStore
  } from '@skeletonlabs/skeleton'
  import { userStore } from '../stores/user'
  import { uninstallMods, unsubscribeFromMods } from '../api/api'
  import { currentGameManifest } from '../stores/manifest'

  // Limit the active subcategories to 1
  $: {
    $libraryActiveSubCategories.length > 1 &&
      ($libraryActiveSubCategories = [$libraryActiveSubCategories.at(-1)])
  }

  function prevPage() {
    if ($libraryPage > 1) {
      $libraryPage--
    }
  }

  function nextPage() {
    if ($libraryPage < $libraryPageCount) {
      $libraryPage++
    }
  }

  $: {
    $libraryPage = clamp($libraryPage, 1, $libraryPageCount)
    document.querySelector('#page')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function getSortingLabel(value: SortingType) {
    return {
      name_asc: 'Name (Ascending)',
      name_desc: 'Name (Descending)',
      time_newest: 'Time Modified (Latest)',
      time_oldest: 'Time Modified (Oldest)',
      size_biggest: 'Size (Largest)',
      size_smallest: 'Size (Smallest)'
    }[value]
  }

  function getTypeToShowLabel(value: TypeOfMod) {
    return {
      any: 'Any',
      enabled: 'Enabled',
      shuffled: 'Shuffled',
      'enabled/shuffled': 'Enabled or shuffled',
      disabled: 'Disabled',
      uninstalled: 'Uninstalled'
    }[value]
  }

  function getAddonSourceLabel(value: AddonSource) {
    return {
      local: 'Local',
      workshop: 'Workshop',
      all: 'All'
    }[value]
  }

  type LabeledFilters<T extends string> = {
    value: T
    label: string
  }[]

  const sortingTypeMap: LabeledFilters<SortingType> = [
    { label: 'Name (Ascending)', value: 'name_asc' },
    { label: 'Name (Descending)', value: 'name_desc' },
    { label: 'Time Modified (Latest)', value: 'time_newest' },
    { label: 'Time Modified (Oldest)', value: 'time_oldest' },
    { label: 'Size (Largest)', value: 'size_biggest' },
    { label: 'Size (Smallest)', value: 'size_smallest' }
  ]

  const typeToShowMap: LabeledFilters<TypeOfMod> = [
    { label: 'Any', value: 'any' },
    { label: 'Enabled', value: 'enabled' },
    { label: 'Shuffled', value: 'shuffled' },
    { label: 'Enabled or shuffled', value: 'enabled/shuffled' },
    { label: 'Disabled', value: 'disabled' },
    { label: 'Uninstalled', value: 'uninstalled' }
  ]

  const addonSourceMap: LabeledFilters<AddonSource> = [
    { label: 'All', value: 'all' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Local', value: 'local' }
  ]

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'filtersPopup',
    placement: 'top-start'
  }

  function clearSelection() {
    $librarySelectedAddonIds = []
  }

  // --------------------------------------------------------------
  //
  // Modals
  //
  // --------------------------------------------------------------

  // Enable
  const confirmEnableModal: ModalSettings = {
    type: 'confirm',
    // Data
    title: 'Enable?',
    body: 'Are you sure you wish to enable all selected mods?',
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: (r: boolean) => {
      if (r) {
        //userStore.batchEnableAddonIds($librarySelectedAddonIds)
        clearSelection()
      }
    }
  }

  // Disable
  const confirmDisableModal: ModalSettings = {
    type: 'confirm',
    // Data
    title: 'Disable',
    body: 'Are you sure you wish to disable all selected mods?',
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: (r: boolean) => {
      if (r) {
        //userStore.batchDisableAddonIds($librarySelectedAddonIds)
        clearSelection()
      }
    }
  }

  // Unsubscribe
  const confirmUnsubscribeModal: ModalSettings = {
    type: 'confirm',
    // Data
    title: 'Unsubscribe?',
    body: 'Are you sure you wish to unsubscribe and/or uninstall from all selected mods?',
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: async (r: boolean) => {
      if (r) {
        // userStore.batchUnsubscribeAddonIds($librarySelectedAddonIds)
        const toUnsubscribeFrom: string[] = []
        const toUninstall: string[] = []

        for (const addonId of $librarySelectedAddonIds) {
          const addon = $currentGameManifest.addons.find((a) => a.id == addonId)
          if (addon?.workshop?.publishedFileId ?? false) {
            toUnsubscribeFrom.push(addon.workshop.publishedFileId.toString())
            toUninstall.push(addon.id)
          } else {
            toUninstall.push(addon.id)
          }
        }

        // First unsubscribe from workshop mods
        await unsubscribeFromMods(toUnsubscribeFrom)

        // Then uninstall both local and workshop mods
        console.log('modsToUninstall', toUninstall)
        await uninstallMods(toUninstall)

        // Clear selection!
        clearSelection()
      }
    }
  }

  const alertNoWebApiKey: ModalSettings = {
    type: 'alert',
    // Data
    title: 'No Steam Web API Key provided. ',
    body: 'Check the "Steab Web API Key" tab in settings for more information.'
  }

  function handleUnsubscribe() {
    if (!$userStore.steamWebApiKey) {
      modalStore.trigger(alertNoWebApiKey)
      return
    }

    modalStore.trigger(confirmUnsubscribeModal)
  }
</script>

<div class="sticky top-0 backdrop-blur-md bg-surface-900/80 z-20 pr-2">
  <div class="flex flex-col lg:flex-row gap-2 [&>div]:w-full p-2 pr-0">
    <!-- <input
        class="input variant-form-material"
        type="text"
        bind:value={$librarySearchQueue}
        placeholder="Search"
      /> -->

    <div class="flex flex-row gap-2 items-center">
      <div class="flex items-center bg-surface-700 rounded-full gap-3">
        <button on:click={prevPage} class="btn-icon -btn-icon-sm variant-filled-surface">
          <ArrowLeft class="w-6" />
        </button>

        <span class="min-w-[64px] text-center">{$libraryPage} / {$libraryPageCount}</span>

        <button on:click={nextPage} class="btn-icon -btn-icon-sm variant-filled-surface">
          <ArrowRight class="w-6" />
        </button>
      </div>

      <button use:popup={popupClick} class="btn variant-filled-surface text-left text-sm">
        <span
          >{getSortingLabel($sortingType)}, {getTypeToShowLabel($typeToShow)}
          {$addonSource != 'all' ? ` (${getAddonSourceLabel($addonSource)} only)` : ''}</span
        >
      </button>

      <div
        data-popup="filtersPopup"
        class="rounded-lg overflow-hidden shadow-xl border-2 border-surface-700 z-20"
      >
        <div class="flex flex-col lg:flex-row lg:gap-0 flex-1 bg-surface-900">
          <div>
            <h3 class="text-lg font-semibold pl-9 bg-surface-700 py-2 px-8">SORT BY</h3>
            <ListBox class="p-5">
              {#each sortingTypeMap as _st}
                <ListBoxItem
                  bind:group={$sortingType}
                  active="bg-blue-600"
                  name={_st.value}
                  value={_st.value}
                  >{_st.label}
                </ListBoxItem>
              {/each}
            </ListBox>
          </div>

          <div>
            <h3 class="text-lg font-semibold pl-9 bg-surface-700 py-2 px-8">FILTER BY</h3>
            <ListBox class="p-5">
              {#each typeToShowMap as _tts}
                <ListBoxItem
                  bind:group={$typeToShow}
                  active="bg-blue-600"
                  name={_tts.value}
                  value={_tts.value}
                  >{_tts.label}
                </ListBoxItem>
              {/each}
            </ListBox>
          </div>

          <div>
            <h3 class="text-lg font-semibold pl-9 bg-surface-700 py-2 px-8">SOURCE</h3>
            <ListBox class="p-5">
              {#each addonSourceMap as _as}
                <ListBoxItem
                  bind:group={$addonSource}
                  active="bg-blue-600"
                  name={_as.value}
                  value={_as.value}
                  >{_as.label}
                </ListBoxItem>
              {/each}
            </ListBox>
          </div>
        </div>
      </div>

      <!-- 
      <button
        class:showConflicts={!$showingConflictingAddons && $totalConflictingAddons > 0}
        class:showingConflicts={$showingConflictingAddons}
        class="btn btn-sm"
        on:click={() => ($showingConflictingAddons = !$showingConflictingAddons)}
      >
        {#if !$showingConflictingAddons && $totalConflictingAddons > 0}
          Show {$totalConflictingAddons} conflicting mods
        {:else if !$showingConflictingAddons && $totalConflictingAddons == 0}
          No conflicting mods
        {:else}
          Hide conflicting mods
        {/if}
      </button> -->
    </div>
  </div>

  {#if $librarySelectedAddonIds.length > 0}
    <div class="mx-3 py-3 flex gap-2 items-center border-t border-surface-600/50">
      <span class="mr-4">
        Selected mods:
        <span class="min-w-[23px] inline-block">
          {$librarySelectedAddonIds.length}
        </span>
      </span>

      <div class="btn-group variant-filled-surface [&>*+*]:border-surface-700">
        <button on:click={() => modalStore.trigger(confirmEnableModal)}>Enable</button>
        <button on:click={() => modalStore.trigger(confirmDisableModal)}>Disable</button>
        <button on:click={() => handleUnsubscribe()}>Unsubscribe / Uninstall</button>
      </div>

      <button class="btn variant-filled-surface" on:click={clearSelection}>Clear selection</button>
    </div>
  {/if}
</div>

<style lang="postcss">
  .noConflicts {
    @apply bg-green-500;
  }

  .showConflicts {
    @apply bg-primary-500;
  }

  .showingConflicts {
    @apply bg-blue-600;
  }
</style>
