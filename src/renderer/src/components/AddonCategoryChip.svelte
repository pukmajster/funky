<script lang="ts">
  import { drawerStore } from '@skeletonlabs/skeleton'
  import type { Game } from 'shared'
  import games from 'shared/games'
  import { libraryActiveCategory, libraryActiveSubCategories } from '../stores/library'
  import { userStore } from '../stores/user'

  export let categoryId: string

  let upperCategory = {
    id: undefined,
    label: undefined
  }

  let subCategory = {
    id: undefined,
    label: undefined
  }

  $: {
    const game: Game = games[$userStore?.activeGameId]
    const cats = game.addons.categories
    for (let cat of cats) {
      if (cat.id === categoryId) {
        upperCategory = {
          id: cat.id,
          label: cat.label
        }
        break
      }

      for (let subCat of cat.subCategories) {
        if (subCat.id === categoryId) {
          upperCategory = {
            id: cat.id,
            label: cat.label
          }

          subCategory = {
            id: subCat.id,
            label: subCat.label
          }
          break
        }
      }
    }
  }

  function navigateToCat() {
    if (upperCategory.id) libraryActiveCategory.set(upperCategory.id)
    if (subCategory.id) libraryActiveSubCategories.set([subCategory.id])
    drawerStore.close()
  }
</script>

<button on:click={navigateToCat} class="chip variant-filled-surface rounded-full">
  {subCategory.label || upperCategory.label || categoryId}
</button>
