<script lang="ts">
  import type { Addon } from 'shared'
  import { userStore } from '../stores/user'
  import AddonOverviewStat from './AddonOverviewStat.svelte'

  export let addon: Addon

  $: thumbnail = `file:///${$userStore.steamGamesDir}/Left 4 Dead 2/left4dead2/addons/workshop/${addon.id}.jpg`

  $: fileSizeMb = addon.vpkSizeInBytes / (1024 * 1024)
  $: fileSizeLabel = fileSizeMb > 1 ? `${fileSizeMb.toFixed(1)} MB` : `< 1.0 MB`

  function openModInBrowser() {
    window.api.openLinkInBrowser(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${addon.id}`
    )
  }

  function openModInSteam() {
    window.api.openLinkInBrowser(`steam://url/CommunityFilePage/${addon.id}`)
  }

  const description = addon.addonInfo.description || addon.addonInfo.tagline

  let showFiles = false
</script>

<div class="mod h-full">
  <div class="flex justify-center relative w-full aspect-[16/9]">
    <img
      alt="blurred-bg"
      src={thumbnail}
      class="select-none absolute inset-0 blur-2xl w-full aspect-[16/9] pointer-events-none scale-y-[1.5] opacity-20"
    />

    <img alt="" src={thumbnail} class="select-none m-10 z-20 shadow-lg rounded-md" />
  </div>

  <div class="z-10 relative mx-7 my-5 space-y-5">
    <div class="space-y-1">
      <h3 class="h3">{addon?.addonInfo?.title}</h3>

      {#if description}
        <p class=" text-[11px]">{description}</p>
      {/if}
    </div>

    <div class="inline-flex gap-2">
      <button class=" w-full btn btn-sm variant-filled-surface" on:click={openModInBrowser}
        >Open in Browser</button
      >

      <button class=" w-full btn btn-sm variant-filled-surface" on:click={openModInSteam}
        >Open in Steam</button
      >
    </div>

    <div class="mt-10 grid grid-cols-3 gap-8">
      <AddonOverviewStat title="Author" value={addon.addonInfo.author} />
      <AddonOverviewStat title="Size" value={fileSizeLabel} />
      <AddonOverviewStat title="Version" value={addon.addonInfo.version} />
    </div>

    <div>
      <h5 class="text-sm text-gray-400">Files</h5>

      {#if showFiles}
        {#each addon.files as file}
          <p class="text-[10px]">{file}</p>
        {/each}

        <button class="btn variant-filled-surface mt-2" on:click={() => (showFiles = false)}>
          Hide {addon.files.length} files
        </button>
      {:else}
        <button class="btn variant-filled-surface mt-1" on:click={() => (showFiles = true)}>
          Show {addon.files.length} files
        </button>
      {/if}
    </div>
  </div>

  <div class="pb-10" />
</div>
