<script lang="ts">
  import type { Addon } from 'shared'
  import { userStore } from '../stores/user'
  import AddonOverviewStat from './AddonOverviewStat.svelte'

  export let addon: Addon

  $: thumbnail = `file:///${$userStore.steamGamesDir}/Left 4 Dead 2/left4dead2/addons/workshop/${addon.id}.jpg`

  $: fileSizeMb = addon.vpkSizeInBytes / (1024 * 1024)
  $: fileSizeLabel = fileSizeMb > 1 ? `${fileSizeMb.toFixed(1)} MB` : `< 1.0 MB`
</script>

<div class="mod h-full">
  <div class="flex justify-center relative w-full aspect-[16/9]">
    <img
      alt="blurred-bg"
      src={thumbnail}
      class="absolute inset-0 blur-2xl w-full aspect-[16/9] pointer-events-none scale-y-[1.5] opacity-80"
    />

    <img alt="" src={thumbnail} class="m-10 z-20 shadow-lg rounded-md" />
  </div>

  <div class="z-10 relative mx-10 my-5 space-y-5">
    <h3 class="h3">{addon?.addonInfo?.title}</h3>

    <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      <AddonOverviewStat title="Description" value={addon.addonInfo.description} />
      <AddonOverviewStat title="Tagline" value={addon.addonInfo.tagline} />
      <AddonOverviewStat title="Author" value={addon.addonInfo.author} />
      <AddonOverviewStat title="Size" value={fileSizeLabel} />
    </div>

    <div>
      <h5 class="text-sm text-gray-400">Files</h5>
      {#each addon.files as file}
        <p class="text-[10px]">{file}</p>
      {/each}
    </div>
  </div>

  <div class="pb-10" />
</div>
