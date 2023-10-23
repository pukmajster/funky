<script lang="ts">
  import type { Addon, Game } from 'shared'
  import games from 'shared/games'
  import thumbnailFallback from '../assets/addon-thumbnail-fallback.jpg'
  import { currentGameManifest } from '../stores/manifest'
  import { userStore } from '../stores/user'
  import AddonCategoryChip from './AddonCategoryChip.svelte'
  import AddonOverviewStat from './AddonOverviewStat.svelte'
  import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton'
  import VpkBrowser from './VpkBrowser.svelte'

  const handleMissingThumbnail = (ev) => (ev.target.src = thumbnailFallback)

  export let addon: Addon

  console.log('addon', addon)

  // Thumbnail based on the active game id, and if it's from the workshop
  $: activeGameId = $userStore.activeGameId
  $: activeGameDetails = games[activeGameId] as Game
  $: thumbnail = `file:///${$userStore.steamGamesDir}/common/${
    activeGameDetails.rootDirectoryName
  }/${activeGameDetails.gameDirectory}/addons${
    addon.workshop?.publishedFileId ? '/workshop' : ''
  }/${addon.workshop?.publishedFileId}.jpg`

  $: fileSizeMb = addon.vpkSizeInBytes / (1024 * 1024)
  $: fileSizeLabel = fileSizeMb > 1 ? `${fileSizeMb.toFixed(1)} MB` : `< 1.0 MB`

  function openModInBrowser() {
    window.api.openLinkInBrowser(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${addon.workshop?.publishedFileId}`
    )
  }

  function openModInSteam() {
    window.api.openLinkInBrowser(`steam://url/CommunityFilePage/${addon.workshop?.publishedFileId}`)
  }

  function openVpkBrowserModal() {
    const modalComponent: ModalComponent = {
      ref: VpkBrowser,
      props: { background: 'bg-primary-500' },
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      component: modalComponent,
      meta: {
        addonId: addon.id
      }
    }

    modalStore.trigger(modal)
  }

  const description = addon.addonInfo.description || addon.addonInfo.tagline

  let showFiles = false
</script>

<div class="mod h-full">
  <div class="flex justify-center relative w-full aspect-[16/9]">
    <img
      on:error={handleMissingThumbnail}
      alt="blurred-bg"
      src={thumbnail}
      class="select-none absolute inset-0 blur-2xl w-full aspect-[16/9] pointer-events-none scale-y-[1.5] opacity-20"
    />

    <img
      alt=""
      src={thumbnail}
      on:error={handleMissingThumbnail}
      class="select-none m-10 z-20 shadow-lg rounded-md"
    />
  </div>

  <div class="z-10 relative mx-7 my-5 space-y-5">
    <div class="space-y-1">
      {#if addon?.addonInfo.title}
        <h3 class="h3">{addon?.addonInfo?.title}</h3>
      {/if}

      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
          {#each $currentGameManifest.addonCategories.categories[addon.id] as cat}
            <AddonCategoryChip categoryId={cat} />
          {/each}
        </div>

        {#if description}
          <p class=" text-[11px]">{description}</p>
        {/if}
      </div>
    </div>

    {#if addon.workshop?.publishedFileId}
      <div>
        <div class="text-sm mb-1 text-gray-400">Workshop</div>
        <div class="inline-flex gap-2">
          <button class=" w-full btn btn-sm variant-filled-surface" on:click={openModInBrowser}
            >Open in Browser</button
          >

          <button class=" w-full btn btn-sm variant-filled-surface" on:click={openModInSteam}
            >Open in Steam</button
          >
        </div>
      </div>
    {/if}

    <div class="mt-10 grid grid-cols-3 gap-8">
      <AddonOverviewStat title="Author" value={addon.addonInfo.author} />
      <AddonOverviewStat title="Version" value={addon.addonInfo.version} />
      <AddonOverviewStat title="Size" value={fileSizeLabel} />
    </div>

    <div>
      <h5 class="text-sm text-gray-400 mb-1">Files</h5>

      <div class="flex gap-2">
        <button class="btn btn-sm variant-filled-surface" on:click={openVpkBrowserModal}>
          Browse VPK
        </button>

        {#if showFiles}
          <button class="btn btn-sm variant-filled-surface" on:click={() => (showFiles = false)}>
            Hide {addon.files.length} files
          </button>
        {:else}
          <button class="btn btn-sm variant-filled-surface" on:click={() => (showFiles = true)}>
            Show {addon.files.length} files
          </button>
        {/if}
      </div>
    </div>

    {#if showFiles}
      <div class="p-2 bg-surface-700 max-h-[186px] overflow-y-scroll rounded-md">
        {#each addon.files as file}
          <p class="text-[10px] leading-normal">{file}</p>
        {/each}
      </div>
    {/if}
  </div>

  <div class="pb-10" />
</div>
