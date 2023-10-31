<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    SlideToggle,
    modalStore,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import classNames from 'classnames'
  import { Dices } from 'lucide-svelte'
  import { isDraggingAddon } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import AddonCard from './AddonCard.svelte'

  $: shuffles = $userStore.games[$userStore.activeGameId].profiles.find(
    (profile) => profile.id == $userStore.games[$userStore.activeGameId].activeProfileId
  )?.shuffles

  function drop(event: DragEvent, shuffleId: string) {
    const json = event.dataTransfer.getData('text/plain')
    const data = JSON.parse(json)

    userStore.toggleAddonIdInShuffle(shuffleId, data.addonId)
    event.preventDefault()
  }

  let whichShufflesToShow: 'custom' | 'generated' = 'custom'

  const modal: ModalSettings = {
    type: 'prompt',
    title: 'Enter new shuffle name',
    body: 'Enter the name of the new shuffle',
    value: '',
    valueAttr: { type: 'text', minlength: 1, maxlength: 64, required: true },
    response: (r: string) => {
      if (!r) return
      userStore.addShuffle(r)
    }
  }

  function openNewShuffleModal() {
    modalStore.trigger(modal)
  }

  function promptShuffleDelete(shuffleId: string, label: string) {
    modalStore.trigger({
      type: 'confirm',
      title: 'Delete shuffle ' + label + '?',
      body: 'Are you sure you want to delete this shuffle?',
      response: (r: boolean) => {
        if (r) userStore.removeShuffleById(shuffleId)
      }
    })
  }

  function promptShuffleRename(shuffleId: string, currentLabel: string) {
    modalStore.trigger({
      type: 'prompt',
      title: 'Rename shuffle: ' + currentLabel,
      body: 'Enter the new name for the shuffle',
      value: currentLabel,
      valueAttr: { type: 'text', minlength: 1, maxlength: 64, required: true },
      response: (r: string) => {
        if (r) userStore.editShuffleNameById(shuffleId, r)
      }
    })
  }
</script>

<div class="h-full border-l border-solid border-surface-800 w-[320px] p-3">
  <div class="flex justify-between mb-3">
    <h3 class="h3">Shuffles</h3>

    <button class="btn btn-sm variant-filled-surface" on:click={openNewShuffleModal}>
      New Shuffle
    </button>
  </div>

  <!-- <TabGroup>
    <Tab bind:group={whichShufflesToShow} name="custom" value={'custom'}>Custom</Tab>
    <Tab bind:group={whichShufflesToShow} name="generated" value={'generated'}>From category</Tab>
  </TabGroup> -->
  <!-- 
  {#if whichShufflesToShow == 'custom'}
    <div class="my-2 flex items-center justify-between gap-2">
      <button class="btn variant-filled-surface" on:click={openNewShuffleModal}>
        New Shuffle
      </button>
    </div>
  {:else}
    <div class="mb-2" />
  {/if} -->

  <Accordion>
    {#each Object.keys(shuffles) as shuffleId}
      {@const shuffle = shuffles[shuffleId]}

      {#if (whichShufflesToShow == 'custom' && (shuffle?.custom ?? false)) || (whichShufflesToShow == 'generated' && !(shuffle?.custom ?? false))}
        <AccordionItem>
          <svelte:fragment slot="lead">
            <Dices
              size={16}
              class={classNames({
                'text-emerald-600': shuffle.enabled,
                'text-red-600': !shuffle.enabled
              })}
            />
          </svelte:fragment>
          <svelte:fragment slot="summary"
            >{shuffle?.label ?? shuffle?.id ?? shuffle.subCategoryId}</svelte:fragment
          >
          <svelte:fragment slot="content">
            <div class="flex justify-between items-center gap-2">
              <SlideToggle
                size="sm"
                active="bg-emerald-500"
                name=""
                checked={shuffle.enabled}
                on:change={() => userStore.toggleShuffleState(shuffleId)}
              >
                <!-- <span class="text-sm"> {shuffle.enabled ? 'Enabled' : 'Disabled'}</span> -->
              </SlideToggle>

              <div class="flex items-center gap-2">
                <button
                  on:click={() => promptShuffleRename(shuffle.id, shuffle.label)}
                  class="btn btn-sm variant-filled-surface"
                >
                  Rename
                </button>

                <button
                  on:click={() => promptShuffleDelete(shuffle.id, shuffle.label)}
                  class="btn btn-sm variant-filled-surface"
                >
                  Delete
                </button>
              </div>
            </div>

            <div
              class="flex flex-col rounded-md bg-surface-600 p-2 gap-2"
              on:dragover={(ev) => {
                ev.preventDefault()
              }}
              on:drop={(e) => drop(e, shuffle.id)}
              class:dropActive={$isDraggingAddon}
            >
              {#if shuffle.shuffledAddonIds.length == 0}
                <div class="text-left text-sm text-gray-400">
                  Drag and drop addons here to shuffle them
                </div>
              {/if}

              {#each shuffle.shuffledAddonIds as addonId}
                <AddonCard
                  mode="in-shuffle-list"
                  addon={$currentGameManifest.addons.find((addon) => addon.id == addonId)}
                />
              {/each}
            </div>
          </svelte:fragment>
        </AccordionItem>
      {/if}
    {/each}
  </Accordion>
</div>

<style lang="postcss">
  .dropActive {
    @apply outline-1  outline-dashed outline-primary-500;
  }
</style>
