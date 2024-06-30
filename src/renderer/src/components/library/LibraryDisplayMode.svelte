<script lang="ts">
  import { Grid, List } from 'lucide-svelte'
  import { userStore } from '../../stores/user'
  import type { User } from 'shared'

  $: activeMode = $userStore.libraryDisplayMode
  const modes: User['libraryDisplayMode'][] = ['grid', 'list']
</script>

<div class="flex items-center gap-2">
  {#each modes as mode}
    <button
      class="btn btn-xl btn-icon max-w-[32px] max-h-[32px]"
      class:variant-filled-primary={activeMode === mode}
      on:click={() => userStore.setValue('libraryDisplayMode', mode)}
    >
      {#if mode === 'grid'}
        <Grid size="18" />
      {:else}
        <List size="18" />
      {/if}
    </button>
  {/each}
</div>
