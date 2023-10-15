<script lang="ts">
  import { modalStore, toastStore } from '@skeletonlabs/skeleton'
  import { currentGameManifest } from '../stores/manifest'
  import { pathsToTree } from '../utils/vpk-browser'
  import VpkBrowserPath from './VpkBrowserPath.svelte'
  import { extractVpk } from '../api/api'
  import { userStore } from '../stores/user'
  import games from 'shared/games'

  let addonId = $modalStore[0].meta.addonId
  $: addonMetadata = $currentGameManifest.addons.find((addon) => addon.id === addonId)
  $: addonFilesTree = pathsToTree(addonMetadata ? addonMetadata.files : [])

  async function handleExtract() {
    const steamDir = $userStore.steamGamesDir
    const game = games[$userStore.activeGameId]
    const isWorkshop = addonMetadata.fromWorkshop
    const addonVpkPath = `${steamDir}common/${game.rootDirectoryName}/${
      game.gameDirectory
    }/addons/${isWorkshop ? 'workshop/' : ''}${addonId}.vpk`

    alert(addonVpkPath)

    try {
      await extractVpk(addonVpkPath)
      toastStore.trigger({
        background: 'variant-filled-success',
        message: 'Extracted VPK'
      })
    } catch (e) {
      toastStore.trigger({
        background: 'variant-filled-error',
        message: 'Failed to extract VPK'
      })
    }
  }
</script>

{#if addonId}
  <div
    class="sticky top-0 bg-surface-800 max-w-[800px] w-full max-h-[700px] h-full shadow-lg overflow-hidden rounded-lg"
  >
    <div class="flex items-center justify-between bg-surface-900 px-3 py-2 text-xl">
      <span class="flex flex-col">
        <span class="text-md text-surface-200">VPK Browser</span>

        <span class="text-sm">
          {addonMetadata.addonInfo.title}
        </span>
      </span>

      <span>
        <button on:click={handleExtract} class="btn btn-sm variant-filled-surface"
          >Extract entire VPK</button
        >
        <button class="btn btn-sm variant-filled-surface">Extract selected</button>
      </span>
    </div>

    <div class="max-h-[700px] h-full overflow-y-scroll">
      <div class="library-list p-3 pt-0 pb-[200px]">
        {#each addonFilesTree as path}
          <VpkBrowserPath treePath={path} />
        {/each}
      </div>
    </div>
  </div>
{/if}
