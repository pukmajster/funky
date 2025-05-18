<script lang="ts">
  import type { AddonId } from 'shared'
  import AddonCard from '../../../components/addons/AddonCard.svelte'
  import { currentGameManifest } from '../../../stores/manifest'
  import { HelpCircle } from 'lucide-svelte'
  import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton'
  import LoadOrderDialog from './LoadOrderDialog.svelte'
  import { userStore } from '../../../stores/user'
  import { dndzone } from 'svelte-dnd-action'

  let items: Item[] = $userStore.priorityLoad.map((id) => ({ id }))

  type Item = { id: AddonId }

  function handleConsider(e: CustomEvent<DndEvent<Item>>) {
    console.log('consider', e)
    items = e.detail.items
  }

  function handleFinalize(e: CustomEvent<DndEvent<Item>>) {
    console.log('finalize', e)
    items = e.detail.items
  }

  //function drop(event: DragEvent) {
  //  const json = event.dataTransfer.getData('text/plain')
  //  const data = JSON.parse(json)

  //  toggleAddonIdInPriority(data.addonId)
  //  event.preventDefault()
  //}

  // function toggleAddonIdInPriority(addonId: AddonId) {
  //   //if ($userStore.priorityLoad.includes(addonId)) {
  //   //  $userStore.priorityLoad = $userStore.priorityLoad.filter((id) => id !== addonId)
  //   //} else {
  //   //  $userStore.priorityLoad = [...$userStore.priorityLoad, addonId]
  //   //}
  // }

  function openHelpModal() {
    const modalComponent: ModalComponent = {
      ref: LoadOrderDialog
    }

    const modal: ModalSettings = {
      type: 'component',
      component: modalComponent
    }

    modalStore.trigger(modal)
  }
</script>

<div class="w-[30vw] max-w-[600px] min-h-[100%] flex flex-col bg-surface-800">
  <div
    class="flex sticky top-0 gap-2 items-center px-4 py-3 bg-surface-800/80 backdrop-blur-lg z-10"
  >
    <h1 class="text-xl">Priority Load</h1>
    <button class="btn btn-sm variant-filled-surface ml-auto hidden">Clear</button>
    <button on:click={openHelpModal} class="btn btn-icon btn-icon-sm ml-auto">
      <HelpCircle />
    </button>
  </div>

  <div class="flex flex-col gap-2 px-3 pb-3 min-h-[200px] mt-4">
    {#if $userStore.priorityLoad.length == 0}
      <div class="text-left text-sm text-gray-400 p-2">
        Drag and drop mods here for priority load.
      </div>
    {/if}

    <section
      class="flex flex-col gap-2 px-3 pb-3 min-h-[200px] mt-4"
      use:dndzone={{
        items
      }}
      on:finalize={handleFinalize}
      on:consider={handleConsider}
    >
      {#each items as item (item.id)}
        <div>
          <AddonCard
            addon={$currentGameManifest.addons.find(
              (addon) => addon.id == 'workshop/3420714162.vpk'
            )}
            mode="in-shuffle-list"
          />

          <div class="p-4 bg-red-300">
            {item.id}
          </div>
        </div>
      {/each}
    </section>
  </div>
</div>

<style lang="postcss">
  .dropActive {
    @apply outline-1  outline-dashed outline-primary-500;
  }
</style>
