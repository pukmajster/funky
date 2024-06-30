<script lang="ts">
  import { libraryActiveSubCategories, libraryAddonPoolSortedPaginated } from '../../stores/library'
  import { currentGameManifest } from '../../stores/manifest'
  import { userStore } from '../../stores/user'
  import { view } from '../../stores/view'
  import AddonCard from '../addons/AddonCard.svelte'
  import LibraryFilters from './LibraryFilters.svelte'
  import SubCategoryShuffle from './SubCategoryShuffle.svelte'

  // $: {
  //   console.log('userStore', $userStore)
  //   console.log('libraryAddonPoolSortedPaginated', $libraryAddonPoolSortedPaginated)
  // }

  $: libraryDisplayMode = $userStore.libraryDisplayMode
</script>

<div class:hidden={!['mods', 'shuffles'].includes($view)} class="relative h-full flex flex-col">
  <LibraryFilters />

  <div>
    <div
      class="relative p-3 pb-[200px]"
      class:library-list={libraryDisplayMode === 'list'}
      class:library-grid={libraryDisplayMode == 'grid'}
    >
      {#each $libraryAddonPoolSortedPaginated as addon}
        {@const addonData = $currentGameManifest.addons.find((_addon) => _addon.id === addon)}
        {#if addonData}
          <AddonCard addon={addonData} mode={libraryDisplayMode === 'grid' ? 'card' : 'list'} />
        {/if}
      {/each}

      {#if $libraryActiveSubCategories.length == 1}
        <SubCategoryShuffle />
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  .library-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .library-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
  }
</style>
