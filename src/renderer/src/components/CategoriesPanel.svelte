<script lang="ts">
  import classNames from 'classnames'
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
      <div class="flex flex-col rounded-md bg-surface-700 overflow-hidden">
        <button
          class:variant-filled={'all' == $libraryActiveCategory}
          on:click={() => setActiveCategory('all')}
          class="btn text-sm p-4 rounded-none">all</button
        >

        {#each categories as category}
          {@const catActive = category.id == $libraryActiveCategory}
          <button
            class:variant-filled={catActive}
            on:click={() => setActiveCategory(category.id)}
            class="btn text-sm p-4 rounded-none"
          >
            <img
              src={category.imageUrl}
              alt={category.label}
              class={classNames('w-6 h-6', {
                'scale-125 invert': catActive
              })}
            />
          </button>
        {/each}

        <button
          class:variant-filled={'?' == $libraryActiveCategory}
          on:click={() => setActiveCategory('?')}
          class="btn text-sm p-4 rounded-none">?</button
        >
      </div>
    </div>

    <div class="pt-2">
      {#each categories as category}
        <div class:hidden={$libraryActiveCategory !== category.id}>
          <div class="flex flex-col gap-1 items-start">
            {#each category.subCategories as subCategory}
              <button
                class="w-full text-left bg-surface-800 !rounded-md px-2 py-[2px]"
                class:subCategory_enabled={$libraryActiveSubCategories.includes(subCategory.id)}
                on:click={() => updateCategoriesSelection(subCategory.id)}
              >
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
  .subCategory_enabled {
    @apply bg-white text-black;
  }
</style>
