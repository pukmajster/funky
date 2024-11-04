<script lang="ts">
  import type { Addon } from 'shared'
  import AddonCard from '../../../components/addons/AddonCard.svelte'
  import { findRepeatedValues } from '../../../utils'

  export let group: Addon[]
  export let index: number

  $: sharedFiles = findRepeatedValues(...group.map((addon) => addon.files)).filter(
    (file) => file !== 'addoninfo.txt' && file !== 'addonimage.jpg'
  )

  export let showFiles: boolean
</script>

<div class="p-4 bg-surface-700/70 rounded-lg gap-2">
  <p class=" mb-3 text-sm text-surface-400">Conflict #{index + 1}</p>

  <div class="library-list">
    {#each group as addon}
      <AddonCard mode="card" {addon} />
    {/each}
  </div>

  {#if showFiles}
    <div class="p-3 bg-surface-900 mt-5 rounded-lg max-h-80 overflow-y-auto">
      <p class=" text-xs text-surface-400">
        {sharedFiles.length} file(s) conflicting between {group.length} mods
      </p>
      <div class="mt-2">
        {#each sharedFiles as file}
          <div class="text-xs text-red-400">
            {file}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .library-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
  }
</style>
