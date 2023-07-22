<script lang="ts">
  import { SlideToggle } from '@skeletonlabs/skeleton'
  import games from 'shared/games'
  import { derived } from 'svelte/store'
  import { libraryActiveCategory, libraryActiveSubCategories } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import { derivedIsShuffleEnabledForSubCategory } from '../stores/user-derivatives'
  import AddonCard from './AddonCard.svelte'

  let dropzone = false

  function drop(event: DragEvent) {
    console.log(event)

    const json = event.dataTransfer.getData('text/plain')
    const data = JSON.parse(json)

    if ($libraryActiveSubCategories.length == 0) return

    userStore.toggleAddonShuffleForSubCategory($libraryActiveSubCategories[0], data.addonId)
    console.log(data)

    event.preventDefault()
  }

  const shuffledAddonsInActiveSubCategory = derived(
    [userStore, libraryActiveCategory, libraryActiveSubCategories],
    ([$userStore, $libraryActiveCategory, $libraryActiveSubCategories]) => {
      const { activeGameId } = $userStore
      const workingSubCatId = $libraryActiveSubCategories[0]
      const workingProfileId = $userStore.games[activeGameId].activeProfileId

      const shuffledAddons =
        $userStore.games[activeGameId]?.profiles.find((profile) => profile?.id == workingProfileId)
          .shuffles[workingSubCatId]?.shuffledAddonIds ?? []

      return shuffledAddons
    }
  )
</script>

<div class="z-10 flex-1 fixed left-[300px] bottom-0 right-0 flex items-end w-full">
  <div
    class:inactive={!$derivedIsShuffleEnabledForSubCategory}
    on:dragenter={() => (dropzone = true)}
    on:dragleave={() => (dropzone = false)}
    on:dragover={(ev) => {
      ev.preventDefault()
    }}
    on:drop={(e) => drop(e)}
    class:dropActive={dropzone}
    class="transition-transform min-h-[162px] fixed left-[300px] right-0 left-0 z-10 py-2 after:h-[1px] after:left-[-2px] after:absolute after:top-[-2px] after:w-full after:bg-surface-700 after:content-[''] after:border-white mx-3 bg-surface-900/50 backdrop-blur-md border-2 border-transparent border-dotted min-h-[96px]"
  >
    <div class="">
      {#if $libraryActiveSubCategories.length == 1}
        {@const activeGameData = games[550]}
        {@const activeSubCat = activeGameData.addons.categories
          .find((cat) => cat.id == $libraryActiveCategory)
          ?.subCategories.find((subCat) => subCat.id == $libraryActiveSubCategories[0])}

        {#if activeSubCat.allowSingleAddonRandomization}
          <div class="px-3 py-1">
            <SlideToggle
              active="bg-emerald-500"
              name=""
              checked={$derivedIsShuffleEnabledForSubCategory}
              on:change={() => userStore.toggleSubCategoryShuffle($libraryActiveSubCategories[0])}
              >Shuffle mode</SlideToggle
            >
          </div>

          <div
            class="flex gap-2 p-2 w-full overflow-x-scroll"
            class:grayscale={!$derivedIsShuffleEnabledForSubCategory}
          >
            {#each $shuffledAddonsInActiveSubCategory ?? [] as addonId}
              <AddonCard
                asShuffle
                addon={$currentGameManifest.addons.find((_addon) => _addon.id === addonId)}
              />
            {/each}

            {#if $shuffledAddonsInActiveSubCategory.length == 0}
              <div class="text-center text-gray-400">Drag and drop addons here to shuffle them</div>
            {/if}
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .dropActive {
    @apply border-primary-500;
  }

  .inactive {
    @apply translate-y-[104px];
  }
</style>
