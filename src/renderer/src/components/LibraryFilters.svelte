<script lang="ts">
  import { showingConflictingAddons, totalConflictingAddons } from '../stores/conflicts'
  import {
    libraryActiveSubCategories,
    librarySearchQueue,
    sortingType,
    typeToShow
  } from '../stores/library'

  // Limit the active subcategories to 1
  $: {
    $libraryActiveSubCategories.length > 1 &&
      ($libraryActiveSubCategories = [$libraryActiveSubCategories.at(-1)])
  }
</script>

<div class="sticky top-0 backdrop-blur-md bg-surface-900/80 z-20 pb-3">
  <div>
    <div class="flex flex-col lg:flex-row gap-2 max-w-[800px] [&>div]:w-full p-3">
      <input
        class="input variant-form-material"
        type="text"
        bind:value={$librarySearchQueue}
        placeholder="Search"
      />

      <div class="flex flex-row gap-2 flex-2">
        <select class="select variant-form-material" bind:value={$sortingType}>
          <option value="name_asc">Name (Ascending)</option>
          <option value="name_desc">Name (Descending)</option>
          <option value="time_newest">Time Modified (Latest)</option>
          <option value="time_oldest">Time Modified (Oldest)</option>
          <option value="size_biggest">Size (Largest)</option>
          <option value="size_smallest">Size (Smallest)</option>
        </select>

        <select class="select variant-form-material" bind:value={$typeToShow}>
          <option value="any">Any</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
          <option value="hidden">Hidden</option>
          <option value="uninstalled">Uninstalled</option>
        </select>
      </div>
    </div>
  </div>

  <div class="px-3">
    <button
      class:showConflicts={!$showingConflictingAddons && $totalConflictingAddons > 0}
      class:showingConflicts={$showingConflictingAddons}
      class="btn btn-sm"
      on:click={() => ($showingConflictingAddons = !$showingConflictingAddons)}
    >
      {#if !$showingConflictingAddons && $totalConflictingAddons > 0}
        Show {$totalConflictingAddons} conflicting mods
      {:else if !$showingConflictingAddons && $totalConflictingAddons == 0}
        No conflicting mods
      {:else}
        Hide conflicting mods
      {/if}
    </button>
  </div>
</div>

<style>
  .noConflicts {
    @apply bg-green-500;
  }

  .showConflicts {
    @apply bg-red-500;
  }

  .showingConflicts {
    @apply bg-blue-600;
  }
</style>
