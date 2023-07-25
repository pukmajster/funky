<script>
  import { conflictGroups } from '../stores/conflicts'
  import { view } from '../stores/view'
  import AddonCard from './AddonCard.svelte'
</script>

<div>
  <div class:hidden={$view != 'conflicts'}>
    {#each $conflictGroups as group, i}
      <div class="p-3">
        <h4 class="h5 mb-1">Conflicting mods #{i + 1}</h4>
        <div class="library-list">
          {#each group as addon}
            <AddonCard mode="card" {addon} />
          {/each}
        </div>
      </div>
    {/each}
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
