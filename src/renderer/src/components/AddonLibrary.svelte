<script lang="ts">
  import type { Profile } from 'shared'
  import { conflictGroups, showingConflictingAddons } from '../stores/conflicts'
  import { libraryActiveSubCategories, libraryAddonPoolSorted } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import AddonCard from './AddonCard.svelte'
  import LibraryFilters from './LibraryFilters.svelte'
  import SubCategoryShuffleSettings from './SubCategoryShuffleSettings.svelte'

  export let profile: Profile

  const { activeGameId, games } = $userStore
  $: {
    activeGameId && !games[activeGameId] && userStore.setupGameWithDefaultProfile(activeGameId)
  }

  $: {
    console.log('userStore', $userStore)
  }
</script>

<div class="relative h-full flex flex-col">
  <LibraryFilters />

  {#if !$showingConflictingAddons}
    <div class="library-list p-3 pb-[200px]">
      {#each $libraryAddonPoolSorted as addon}
        <AddonCard addon={$currentGameManifest.addons.find((_addon) => _addon.id === addon)} />
      {/each}
    </div>

    {#if $libraryActiveSubCategories.length == 1}
      <SubCategoryShuffleSettings />
    {/if}
  {/if}

  {#if $showingConflictingAddons}
    {#each $conflictGroups as group, i}
      <div class="p-3">
        <h3>Conflicting mods #{i + 1}</h3>
        <div class="library-list">
          {#each group as addon}
            <AddonCard {addon} />
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .library-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
  }
</style>
