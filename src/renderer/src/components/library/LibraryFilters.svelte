<script lang="ts">
  import { ArrowLeft, ArrowRight } from 'lucide-svelte'
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  import { unsubscribeFromMods, uninstallMods } from '../../api/api'
  import {
    libraryActiveSubCategories,
    libraryPage,
    libraryPageCount,
    librarySelectedAddonIds
  } from '../../stores/library'
  import { currentGameManifest } from '../../stores/manifest'
  import { userStore } from '../../stores/user'
  import { clamp } from '../../utils'
  import LibraryFiltersButton from '../../features/library/filters/LibraryFiltersButton.svelte'

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

      <LibraryFiltersButton />
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
