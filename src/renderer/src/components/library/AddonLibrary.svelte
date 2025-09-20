<script lang="ts">
  import LibraryFiltersMenu from '../../features/library/filters/LibraryFiltersMenu.svelte'
  import {
    installedAddons,
    libraryActiveSubCategories,
    libraryAddonPoolSortedPaginated
  } from '../../stores/library'
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
  $: thumbnailsSize = $userStore.thumbnailsSize
</script>

<div
  class:hidden={!['mods', 'shuffles', 'load-order'].includes($view)}
  class="relative h-full flex flex-col"
>
  <LibraryFilters />

  <div>
    {#if $installedAddons.length == 0}
      <div class="flex flex-col justify-center items-center gap-3 h-full">
        <p class="text-center text-xl">No mods detected...</p>
        <p class="text-center text-sm opacity-60">
          Try refreshing your library by clicking the refresh button in the top left corner.
        </p>
      </div>
    {/if}

    {#if $installedAddons.length > 0 && $libraryAddonPoolSortedPaginated.length == 0}
      <div class="flex flex-col justify-center items-center gap-3 h-full">
        <p class="text-center text-xl">We've come up empty...</p>
        <p class="text-center text-sm opacity-60">
          Try changing any filters or searching for something else.
        </p>
      </div>
    {/if}

    <div
      class="relative p-3 pb-[200px]"
      class:library-list={libraryDisplayMode === 'list'}
      class:library-grid={libraryDisplayMode == 'grid'}
      class:library-grid-sm={thumbnailsSize == 'sm'}
      class:library-grid-md={thumbnailsSize == 'md'}
      class:library-grid-lg={thumbnailsSize == 'lg'}
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

<LibraryFiltersMenu />

<style lang="postcss">
  .library-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .library-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;

    &.library-grid-sm {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    &.library-grid-md {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    &.library-grid-lg {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
</style>
