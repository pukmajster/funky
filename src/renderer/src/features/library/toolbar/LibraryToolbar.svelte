<script lang="ts">
  import LibraryToolbarFilters from './components/LibraryToolbarFilters.svelte'
  import LibraryToolbarPagination from './components/LibraryToolbarPagination.svelte'
</script>

<div class="sticky top-0 backdrop-blur-md bg-surface-900/80 z-20 pr-2">
  <div class="flex flex-col lg:flex-row gap-2 [&>div]:w-full p-2 pr-0">
    <div class="flex flex-row gap-2 items-center [&>*]:min-h-full">
      <LibraryToolbarPagination />
      <LibraryToolbarFilters />
    </div>
  </div>
</div>
