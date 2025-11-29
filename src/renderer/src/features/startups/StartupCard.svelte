<script lang="ts">
  import type { Startup } from '../../db/db'

  export let startup: Startup
</script>

<article class="p-4 grid grid-cols-2 bg-surface-600/70 hover:bg-surface-600 rounded-lg gap-2">
  <div>
    <div class="flex items-center gap-2">
      <p>Startup</p>
      <p class=" text-sm text-surface-400">{startup.date.toLocaleString()}</p>
    </div>

    <p>{startup.enabledModIds.length} mods enabled</p>
  </div>

  <div class="flex items-center gap-2">
    {#if startup.reportedAsCrash}
      <button class="btn variant-outline-tertiary"> Mark for crashing </button>
    {:else}
      <p>CRASHING</p>
      <button class="btn variant-outline-tertiary"> Mark for crashing </button>
    {/if}
  </div>
</article>

<style lang="postcss">
  .library-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
  }
</style>
