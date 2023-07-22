<script lang="ts">
  import classNames from 'classnames'
  import { CheckCircle, CircleIcon, FileQuestionIcon, InfinityIcon } from 'lucide-svelte'
  import type { Profile } from 'shared'
  import { game550 } from 'shared/games/550'
  import { libraryActiveCategory, libraryActiveSubCategories } from '../stores/library'
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
</script>

<div class="w-[300px]">
  <div class="flex flex-col gap-2 [&>div]:w-full" />

  <div class="flex">
    <div class="flex flex-col min-w-[73px] p-2">
      <div class="flex flex-col rounded-md bg-surface-700 overflow-hidden min-w-[64px]">
        <button
          class:variant-filled={'all' == $libraryActiveCategory}
          on:click={() => setActiveCategory('all')}
          class="categoryButton"
        >
          <InfinityIcon />
          All
        </button>

        {#each categories as category}
          {@const catActive = category.id == $libraryActiveCategory}
          <button
            class:variant-filled={catActive}
            on:click={() => setActiveCategory(category.id)}
            class="categoryButton"
          >
            <img
              src={category.imageUrl}
              alt={category.label}
              class={classNames('w-6 h-6', {
                'scale-125 invert': catActive
              })}
            />

            {category.label}
          </button>
        {/each}

        <button
          class:variant-filled={'?' == $libraryActiveCategory}
          on:click={() => setActiveCategory('?')}
          class="categoryButton"
        >
          <FileQuestionIcon />
          Unknown</button
        >
      </div>
    </div>

    <div class="pt-2">
      {#each categories as category}
        <div class:hidden={$libraryActiveCategory !== category.id}>
          <div class="flex flex-col items-start rounded-md overflow-hidden">
            {#each category.subCategories as subCategory}
              {@const subCatActive = $libraryActiveSubCategories.includes(subCategory.id)}

              <button
                class={classNames(
                  'w-full text-left bg-surface-800 p-1 px-2 flex items-center gap-2',
                  {
                    '!bg-primary-500': subCatActive,
                    'hover:bg-surface-500': !subCatActive
                  }
                )}
                on:click={() => updateCategoriesSelection(subCategory.id)}
              >
                {#if subCatActive}
                  <CheckCircle size={14} />
                {:else}
                  <CircleIcon size={14} />
                {/if}

                {subCategory.label}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .categoryButton {
    @apply flex flex-col w-16 h-16 btn text-[11px] p-2 pt-4 justify-center rounded-none;
  }
</style>
