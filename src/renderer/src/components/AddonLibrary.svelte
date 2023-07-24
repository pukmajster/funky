<script lang="ts">
  import type { Profile } from 'shared'
  import { libraryActiveSubCategories, libraryAddonPoolSortedPaginated } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import { view } from '../stores/view'
  import AddonCard from './AddonCard.svelte'
  import LibraryFilters from './LibraryFilters.svelte'
  import SubCategoryShuffleSettings from './SubCategoryShuffleSettings.svelte'

  export let profile: Profile

  $: {
    console.log('userStore', $userStore)
  }
</script>

<div class:hidden={$view == 'conflicts'} class="relative h-full flex flex-col">
  <LibraryFilters />

  <div>
    <div class="library-list p-3 pt-0 pb-[200px]">
      {#each $libraryAddonPoolSortedPaginated as addon}
        <AddonCard addon={$currentGameManifest.addons.find((_addon) => _addon.id === addon)} />
      {/each}
    </div>

    {#if $libraryActiveSubCategories.length == 1}
      <SubCategoryShuffleSettings />
    {/if}
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
