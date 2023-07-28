<script lang="ts">
  import { Accordion, AccordionItem, SlideToggle } from '@skeletonlabs/skeleton'
  import classNames from 'classnames'
  import { Dices } from 'lucide-svelte'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import AddonCard from './AddonCard.svelte'

  $: shuffles = $userStore.games[$userStore.activeGameId].profiles.find(
    (profile) => profile.id == $userStore.games[$userStore.activeGameId].activeProfileId
  )?.shuffles

  let dropzone = false

  function drop(event: DragEvent, shuffleId: string) {
    console.log(event)

    const json = event.dataTransfer.getData('text/plain')
    const data = JSON.parse(json)

    userStore.toggleAddonIdInShuffle(shuffleId, data.addonId)
    event.preventDefault()
  }

  let whichShufflesToShow: 'custom' | 'generated' = 'custom'

  let newShuffleName = ''

  function handleNewShuffle() {
    userStore.addShuffle(newShuffleName)
    newShuffleName = ''
  }
</script>

<div class="w-[360px] p-3">
  <h3 class="h3">Shuffles</h3>

  <!-- <TabGroup>
    <Tab bind:group={whichShufflesToShow} name="custom" value={'custom'}>Custom</Tab>
    <Tab bind:group={whichShufflesToShow} name="generated" value={'generated'}>From category</Tab>
  </TabGroup> -->

  {#if whichShufflesToShow == 'custom'}
    <div class="my-2 flex items-center justify-between gap-2">
      <input bind:value={newShuffleName} class="input" placeholder="Enter new shuffle..." />
      <button
        disabled={!newShuffleName}
        class="btn variant-filled-surface"
        on:click={handleNewShuffle}
      >
        Add
      </button>
    </div>
  {:else}
    <div class="mb-2" />
  {/if}

  <Accordion autocollapse>
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
                {shuffle.enabled ? 'Enabled' : 'Disabled'}
              </SlideToggle>

              <div class="flex items-center gap-2">
                <button class="btn btn-sm variant-filled-surface"> edit </button>
                <button class="btn btn-sm variant-filled-surface"> delete </button>
              </div>
            </div>

            <div
              class="flex flex-col rounded-md bg-surface-900 p-2 gap-2"
              on:dragenter={() => (dropzone = true)}
              on:dragleave={() => (dropzone = false)}
              on:dragover={(ev) => {
                ev.preventDefault()
              }}
              on:drop={(e) => drop(e, shuffle.id)}
              class:dropActive={dropzone}
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
    @apply border-primary-500 border border-solid;
  }
</style>
