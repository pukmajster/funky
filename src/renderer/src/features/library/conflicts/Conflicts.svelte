<script>
  import { conflictGroups } from '../../../stores/conflicts'
  import { view } from '../../../stores/view'
  import ConflictGroup from './ConflictGroup.svelte'

  let showFiles = false
  function toggleShowSharedFiles() {
    showFiles = !showFiles
  }
</script>

<div class:hidden={$view != 'conflicts'}>
  <div class="relative">
    <div class=" pb-32 p-4 flex flex-col max-w-[900px] mx-auto gap-4">
      <div
        class="absolute top-0 left-0 right-0 min-h-[260px] -z-20 bg-gradient-to-b from-red-600/20 to-transparent"
      />

      <div class="py-4 px-4">
        <div class="flex justify-between items-center">
          <h5 class="h3">Conflicts</h5>

          <button class="btn variant-filled-surface btn-sm" on:click={toggleShowSharedFiles}>
            {showFiles ? 'Hide' : 'Show'} conflict details
          </button>
        </div>

        <p class="text-sm mt-2 text-surface-300">
          See exactly which mods are conflicting with each other.
          {#if showFiles}
            <br />
            Common files, such as <span class="font-semibold">addoninfo.txt</span> and
            <span class="font-semibold">addonimage.jpg</span>, are excluded from conflicts.
          {/if}
        </p>
      </div>

      {#each $conflictGroups as group, i}
        <ConflictGroup {showFiles} index={i} {group} />
      {/each}
    </div>
  </div>
</div>
