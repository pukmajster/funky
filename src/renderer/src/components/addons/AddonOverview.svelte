<script lang="ts">
  import type { Addon, Game } from 'shared'
  import games from 'shared/games'
  import thumbnailFallback from '../../assets/addon-thumbnail-fallback.jpg'
  import { currentGameManifest } from '../../stores/manifest'
  import { userStore } from '../../stores/user'
  import AddonCategoryChip from './AddonCategoryChip.svelte'
  import AddonOverviewStat from './AddonOverviewStat.svelte'
  import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton'
  import { L4D2_GAME_ID } from '../../utils'
  import VpkBrowser from '../vpk/VpkBrowser.svelte'

  const handleMissingThumbnail = (ev) => (ev.target.src = thumbnailFallback)

  export let addon: Addon

  console.log('addon', addon)

  // Thumbnail based on the active game id, and if it's from the workshop
  $: activeGameId = L4D2_GAME_ID
  $: activeGameDetails = games[activeGameId] as Game
  $: thumbnail =
    `file:///${$userStore.steamGamesDir}/common/${activeGameDetails.rootDirectoryName}/${activeGameDetails.gameDirectory}/addons/${addon.id}`.replace(
      'vpk',
      'jpg'
    )
  $: fileSizeMb = addon.vpkSizeInBytes / (1024 * 1024)
  $: fileSizeLabel = fileSizeMb > 1 ? `${fileSizeMb.toFixed(1)} MB` : `< 1.0 MB`

  function openModInBrowser() {
    window.api.openLinkInBrowser(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${addon.workshop?.publishedFileId}`
    )
  }

  function openInFileManager() {
    window.api.openFileInFileManager(
      `${$userStore.steamGamesDir}/common/Left 4 Dead 2/left4dead2/addons/${addon.id}`
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

<div class="mod h-full relative">
  <div class="absolute top-0 left-0 right-0 h-[440px] overflow-hidden">
    <img
      on:error={handleMissingThumbnail}
      alt="blurred-bg"
      src={thumbnail}
      class="select-none blur-xl top-0 left-0 right-0 w-full h-[440px] pointer-events-none opacity-40 arotate-180"
    />
  </div>

  <div
    class="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-transparent via-surface-800/50 to-surface-800 h-[440px]"
  />

  <div class="flex justify-center relative w-full aspect-[16/9]">
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

      {#if $userStore.showWorkshopIds && addon.workshop?.publishedFileId}
        <h6 class="h6 text-neutral-500">Workshop ID: {addon.workshop.publishedFileId}</h6>
      {/if}

      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
          {#each $currentGameManifest.addonCategories.categories[addon.id] as cat}
            <AddonCategoryChip categoryId={cat} />
          {/each}
        </div>

        {#if description && !$userStore.hideDescriptions}
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

    {#if addon.vpkAddonInfoMissing}
      <div class="text-xs alert variant-ghost-secondary rounded-xl">
        <div class="space-y-2">
          <p>This mod did not provide any metadata.</p>
          {#if addon.workshop?.publishedFileId}
            <p>Replacement metadata for this mod should be provided by the Steam Workshop.</p>
          {/if}
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

        <button class="btn btn-sm variant-filled-surface" on:click={openInFileManager}>
          Open in File Manager
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
