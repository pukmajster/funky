<script lang="ts">
  import ConditionActiveSubCategory from '../conditionals/ConditionActiveSubCategory.svelte'
  import LibraryToolbarFilters from './components/LibraryToolbarFilters.svelte'
  import LibraryToolbarPagination from './components/LibraryToolbarPagination.svelte'
  import LibraryToolbarSubCatShuffleToggle from './components/LibraryToolbarSubCatShuffleToggle.svelte'
  import LibraryToolbarSubCatShuffleZone from './components/LibraryToolbarSubCatShuffleZone.svelte'
</script>

<div id="LibraryToolbar" class="sticky top-0 backdrop-blur-md bg-surface-900/80 z-20">
  <div class="flex flex-col lg:flex-row gap-2 [&>div]:w-full">
    <div class="flex flex-row gap-2 items-center [&>*]:min-h-full p-2">
      <LibraryToolbarPagination />
      <LibraryToolbarFilters />

      <ConditionActiveSubCategory>
        <LibraryToolbarSubCatShuffleToggle />
      </ConditionActiveSubCategory>
    </div>
  </div>

  <ConditionActiveSubCategory>
    <LibraryToolbarSubCatShuffleZone />
  </ConditionActiveSubCategory>
</div>

<style lang="postcss">
  #LibraryToolbar:has(#LibraryToolbarSubCatShuffleZone) {
    @apply bg-gradient-to-b from-surface-900 to-surface-600/80 shadow-2xl;
  }
</style>
