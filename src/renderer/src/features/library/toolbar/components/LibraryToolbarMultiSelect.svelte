<script lang="ts">
  import { type ModalSettings, modalStore } from '@skeletonlabs/skeleton'
  import { unsubscribeFromMods, uninstallMods } from '../../../../api/api'
  import {
    libraryActiveSubCategories,
    libraryPage,
    libraryPageCount,
    librarySelectedAddonIds
  } from '../../../../stores/library'
  import { currentGameManifest } from '../../../../stores/manifest'
  import { userStore } from '../../../../stores/user'
  import { clamp } from '../../../../utils'
  import { X } from 'lucide-svelte'
  import { activeProfileStore } from '../../../../stores/active-profile'

  // Limit the active subcategories to 1
  $: {
    $libraryActiveSubCategories.length > 1 &&
      ($libraryActiveSubCategories = [$libraryActiveSubCategories.at(-1)])
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
    title: 'Enable?',
    body: 'Are you sure you wish to enable all selected mods?',
    response: (r: boolean) => {
      if (r) {
        activeProfileStore.batchEnableAddons($librarySelectedAddonIds)
        clearSelection()
      }
    }
  }

  // Disable
  const confirmDisableModal: ModalSettings = {
    type: 'confirm',
    title: 'Disable',
    body: 'Are you sure you wish to disable all selected mods?',
    response: (r: boolean) => {
      if (r) {
        activeProfileStore.batchDisableAddons($librarySelectedAddonIds)
        clearSelection()
      }
    }
  }

  // Unsubscribe
  const confirmUnsubscribeModal: ModalSettings = {
    type: 'confirm',
    title: 'Unsubscribe?',
    body: 'Are you sure you wish to unsubscribe and/or uninstall from all selected mods?',
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

<div class="InnerLibraryToolbarMenu">
  {#if $librarySelectedAddonIds.length > 0}
    <div class="px-3 py-3 flex gap-2 items-center border-t border-surface-600">
      <button class="btn variant-filled-surface" on:click={clearSelection}>
        <X class="w-5 h-5" />
        <span>
          <span class="font-semibold">{$librarySelectedAddonIds.length} </span>
          Mods selected
        </span>
      </button>

      <div class="btn-group variant-filled-surface [&>*+*]:border-surface-700">
        <button on:click={() => modalStore.trigger(confirmEnableModal)}>Enable</button>
        <button on:click={() => modalStore.trigger(confirmDisableModal)}>Disable</button>
        <button on:click={() => handleUnsubscribe()}>Unsubscribe</button>
      </div>
    </div>
  {/if}
</div>
