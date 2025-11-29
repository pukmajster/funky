<script lang="ts">
  import { liveQuery } from 'dexie'
  import { view } from '../../stores/view'
  import { db } from '../../db/db'
  import StartupCard from './StartupCard.svelte'

  const MAX_STARTUPS = 15

  $: startups = liveQuery(async () => await db.startups.limit(MAX_STARTUPS).toArray())
</script>

<div class:hidden={$view != 'startups'}>
  <div class="relative">
    <div class=" pb-32 p-4 flex flex-col max-w-[900px] mx-auto gap-4">
      <div
        class="absolute top-0 left-0 right-0 min-h-[260px] -z-20 .bg-gradient-to-b from-blue-600/20 transition-all to-transparent"
      />

      <h3 class="h3">Startups</h3>

      {#if !$startups}
        <div class="text-center text-gray-500">No startups found</div>
      {:else}
        {#each $startups as startup}
          <StartupCard {startup} />
        {/each}
      {/if}
    </div>
  </div>
</div>
