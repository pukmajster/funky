<script lang="ts">
  import { modalStore, toastStore } from '@skeletonlabs/skeleton'
  import { currentGameManifest } from '../../stores/manifest'
  import { pathsToTree } from '../../utils/vpk-browser'
  import VpkBrowserPath from './VpkBrowserPath.svelte'
  import { extractVpk } from '../../api/api'
  import { userStore } from '../../stores/user'
  import games from 'shared/games'
  import classNames from 'classnames'
  import { L4D2_GAME_ID } from '../../utils'

  let addonId = $modalStore[0].meta.addonId
  $: addonMetadata = $currentGameManifest.addons.find((addon) => addon.id === addonId)
  $: addonFilesTree = pathsToTree(addonMetadata ? addonMetadata.files : [])

  const defaultExtractPath = `${$userStore.steamGamesDir}common/${games[L4D2_GAME_ID].rootDirectoryName}/${games[L4D2_GAME_ID].gameDirectory}/`

  async function handleExtract() {
    const steamDir = $userStore.steamGamesDir
    const game = games[L4D2_GAME_ID]
    const addonVpkPath = `${steamDir}/common/${game.rootDirectoryName}/${game.gameDirectory}/addons/${addonId}`

    try {
      await extractVpk({
        vpkPath: addonVpkPath,
        extractPath: extractToDir
      })
      modalStore.clear()
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

  async function getDirectory() {
    try {
      const dir = await window.api.openDirectoryFinder()
      extractToDir = dir
    } catch (e) {
      console.log(e)
    }
  }

  let showExtractionOptions = true
  let extractToDir = defaultExtractPath
</script>

{#if addonId}
  <div
    class="sticky top-0 bg-surface-800 max-w-[800px] w-full shadow-lg overflow-hidden rounded-lg"
  >
    <div class="flex items-center justify-between bg-surface-900 px-3 py-2 text-xl">
      <span class="flex flex-col">
        <span class="text-md text-surface-200">VPK Browser</span>

        <span class="text-sm">
          {addonMetadata.addonInfo.title}
        </span>
      </span>
    </div>

    <div
      class={classNames('hidden px-3 p-3 border-t border-surface-800 bg-surface-900', {
        '!block': showExtractionOptions
      })}
    >
      <div class="flex justify-between gap-10">
        <div class="flex flex-1 items-center gap-2">
          <input
            class="w-full input variant-form-material"
            id="extractToDir"
            placeholder="Extract to..."
            bind:value={extractToDir}
          />
          <button on:click={getDirectory} class="btn variant-filled-surface"> Browse</button>
        </div>

        <!-- <div class="flex items-center gap-2">
          <label for="extractIntoFolder">Extract as folder</label>
          <SlideToggle
            active="bg-green-500"
            bind:checked={extractIntoFolder}
            name="extractIntoFolder"
          />
        </div> -->

        <div class="flex items-center">
          <button
            disabled={!extractToDir}
            on:click={handleExtract}
            class="btn variant-filled-surface ml-auto">Extract entire VPK</button
          >
        </div>
      </div>

      <!-- <div class="flex justify-end">
        <button
          disabled={!extractToDir}
          on:click={handleExtract}
          class="btn btn-sm variant-filled-surface">Extract entire VPK</button
        >
      </div> -->
    </div>

    <div class="h-[600px] max-h-[600px] overflow-y-scroll">
      <div class="library-list pt-0">
        {#each addonFilesTree as path}
          <VpkBrowserPath treePath={path} />
        {/each}
      </div>
    </div>
  </div>
{/if}
