<script lang="ts">
  import classNames from 'classnames'
  import { FileQuestionIcon, InfinityIcon } from 'lucide-svelte'
  import type { Profile } from 'shared'
  import games from 'shared/games'
  import { game550 } from 'shared/games/550'
  import {
    derviedAddonIdsInEnabledShuffles,
    installedAddons,
    libraryActiveCategory,
    libraryActiveSubCategories,
    librarySearchQueue
  } from '../stores/library'
  import { userStore } from '../stores/user'
  import { derivedEnabledAddonIds } from '../stores/user-derivatives'
  import { view } from '../stores/view'
  let categories = game550.addons.categories

  $: activeGameId = $userStore.activeGameId
  $: categories = games[activeGameId].addons.categories

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
    'flex flex-col w-14 h-14 btn text-[11px] p-2 justify-center items-center rounded-none'

  const fixedIconStyles = 'min-w-[17px] min-h-[17px]'
</script>

<div
  class="flex flex-col justify-between h-full flex-1 transition-transform"
  class:disable-categories={!['mods', 'shuffles'].includes($view)}
>
  <div class="w-[250px] p-2 space-y-2 box-border">
    <input
      class="input variant-form-material"
      type="text"
      bind:value={$librarySearchQueue}
      placeholder="Search"
    />

    <div class="flex gap-2 justify-between flex-grow-0">
      <div class="flex flex-col">
        <div class="flex flex-col rounded-md bg-surface-800 overflow-hidden">
          <button
            class:bg-primary-500={'all' == $libraryActiveCategory}
            on:click={() => setActiveCategory('all')}
            class={categoryStyles}
          >
            <InfinityIcon className={fixedIconStyles} />
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
                    'w-full text-left text-[14px] bg-surface-800 p-[3px] px-2 flex items-center gap-2 text-ellipsis overflow-hidden ...',
                    {
                      '!bg-primary-500 font-bold': subCatActive,
                      'hover:bg-surface-500': !subCatActive
                    }
                  )}
                  on:click={() => updateCategoriesSelection(subCategory.id)}
                >
                  <span class="min-w[24px]">
                    <!-- {#if subCatActive}
                      <CheckCircle size={14} />
                    {:else}
                      <CircleIcon size={14} />
                    {/if}
                  </span> -->

                    {subCategory.label}
                  </span></button
                >
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class=" flex p-2 flex-col gap-2 text-left text-sm">
    <div class=" self-start px-2 py-1 rounded-lg bg-surface-700">
      <span class="font-bold">{$installedAddons?.length}</span> installed mods
    </div>
    <div class=" self-start px-2 py-1 rounded-lg bg-surface-700">
      <span class="font-bold">{$derivedEnabledAddonIds.length} </span> enabled
      <span class="font-bold">{$derviedAddonIdsInEnabledShuffles.length} </span> shuffled
    </div>
  </div>
</div>

<style lang="postcss">
  .disable-categories {
    @apply opacity-40 pointer-events-none -translate-x-80;
  }
</style>
