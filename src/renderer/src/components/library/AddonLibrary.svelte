<script lang="ts">
  import { libraryActiveSubCategories, libraryAddonPoolSortedPaginated } from '../../stores/library'
  import { currentGameManifest } from '../../stores/manifest'
  import { view } from '../../stores/view'
  import AddonCard from '../addons/AddonCard.svelte'
  import LibraryFilters from './LibraryFilters.svelte'
  import SubCategoryShuffle from './SubCategoryShuffle.svelte'

  // $: {
  //   console.log('userStore', $userStore)
  //   console.log('libraryAddonPoolSortedPaginated', $libraryAddonPoolSortedPaginated)
  // }
</script>

<div class:hidden={!['mods', 'shuffles'].includes($view)} class="relative h-full flex flex-col">
  <LibraryFilters />

  <div>
    <div class="library-list relative p-3 pb-[200px]">
      {#each $libraryAddonPoolSortedPaginated as addon}
        {@const addonData = $currentGameManifest.addons.find((_addon) => _addon.id === addon)}
        {#if addonData}
          <AddonCard addon={addonData} mode="card" />
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
  }
</style>
