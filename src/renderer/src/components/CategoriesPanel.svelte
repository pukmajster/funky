<script lang="ts">
  import classNames from 'classnames'
  import { CheckCircle, CircleIcon, FileQuestionIcon, InfinityIcon } from 'lucide-svelte'
  import type { Profile } from 'shared'
  import { game550 } from 'shared/games/550'
  import {
    libraryActiveCategory,
    libraryActiveSubCategories,
    librarySearchQueue
  } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import {
    derivedEnabledAddonIds,
    derviedAddonIdsInEnabledShuffles
  } from '../stores/user-derivatives'
  let categories = game550.addons.categories

  export let profile: Profile

  function setActiveCategory(categoryId: string) {
    $libraryActiveCategory = categoryId
    $libraryActiveSubCategories = []
  }

  // Limit the active subcategories to 1
  $: {
    $libraryActiveSubCategories.length > 1 &&
      ($libraryActiveSubCategories = [$libraryActiveSubCategories.at(-1)])
  }

  function updateCategoriesSelection(subCategoryId: string) {
    if ($libraryActiveSubCategories.includes(subCategoryId)) {
      $libraryActiveSubCategories = $libraryActiveSubCategories.filter((id) => id !== subCategoryId)
    } else {
      $libraryActiveSubCategories = [...$libraryActiveSubCategories, subCategoryId]
    }
  }

  const categoryStyles =
    'flex flex-col w-16 h-16 btn text-[11px] p-2 pt-4 justify-center rounded-none'
</script>

<div class="flex flex-col justify-between h-full flex-1">
  <div class="w-[300px] p-2 space-y-2 box-border">
    <input
      class="input variant-form-material"
      type="text"
      bind:value={$librarySearchQueue}
      placeholder="Search"
    />

    <div class="flex gap-2 justify-between flex-grow-0">
      <div class="flexflex-col box-border min-w-[64px] box-border">
        <div class="flex flex-col rounded-md bg-surface-700 overflow-hidden min-w-[64px]">
          <button
            class:bg-primary-500={'all' == $libraryActiveCategory}
            on:click={() => setActiveCategory('all')}
            class={categoryStyles}
          >
            <InfinityIcon />
            All
          </button>

          {#each categories as category}
            {@const catActive = category.id == $libraryActiveCategory}
            <button
              class:bg-primary-500={catActive}
              on:click={() => setActiveCategory(category.id)}
              class={categoryStyles}
            >
              <img src={category.image} alt={category.label} class={classNames('w-6 h-6')} />

              {category.label}
            </button>
          {/each}

          <button
            class:bg-primary-500={'?' == $libraryActiveCategory}
            on:click={() => setActiveCategory('?')}
            class={categoryStyles}
          >
            <FileQuestionIcon />
            Unknown</button
          >
        </div>
      </div>

      <div class="flex-1">
        {#each categories as category}
          <div class:hidden={$libraryActiveCategory !== category.id}>
            <div class="flex flex-col items-start rounded-md overflow-hidden">
              {#each category.subCategories as subCategory}
                {@const subCatActive = $libraryActiveSubCategories.includes(subCategory.id)}

                <button
                  class={classNames(
                    'w-full text-left bg-surface-800 p-1 px-2 flex items-center gap-2 text-ellipsis overflow-hidden ...',
                    {
                      '!bg-primary-500': subCatActive,
                      'hover:bg-surface-500': !subCatActive
                    }
                  )}
                  on:click={() => updateCategoriesSelection(subCategory.id)}
                >
                  <span class="min-w[24px]">
                    {#if subCatActive}
                      <CheckCircle size={14} />
                    {:else}
                      <CircleIcon size={14} />
                    {/if}
                  </span>

                  {subCategory.label}
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class=" flex p-2 flex-col gap-2 text-left text-sm">
    <div class=" self-start px-2 py-1 rounded-lg bg-surface-700">
      <span class="font-bold">{$currentGameManifest?.addons.length}</span> total mods
    </div>
    <div class=" self-start px-2 py-1 rounded-lg bg-surface-700">
      <span class="font-bold"
        >{$derivedEnabledAddonIds.length + $derviedAddonIdsInEnabledShuffles.length}
      </span> enabled / shuffled
    </div>
  </div>
</div>

<style lang="postcss">
</style>
