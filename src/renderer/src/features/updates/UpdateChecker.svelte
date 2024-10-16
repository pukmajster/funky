<script lang="ts">
  import { DownloadIcon } from 'lucide-svelte'
  import { getAppMeta } from '../../api/api'
  import { onMount } from 'svelte'

  let newUpdateVersion = ''
  let isUpdateAvailable = false

  function openLatestReleasePage() {
    window.api.openLinkInBrowser('https://github.com/pukmajster/funky/releases/latest')
  }

  // Easy function to check if one version is newer than another
  // Original stolen from https://stackoverflow.com/a/52059759
  export function isVersionNewer(oldVer: string, newVer: string) {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
      const a = ~~newParts[i] // parse int
      const b = ~~oldParts[i] // parse int
      if (a > b) return true
      if (a < b) return false
    }
    return false
  }

  async function checkForUpdates() {
    const appMeta = await getAppMeta()

    try {
      let latestReleaseVersion = await fetch(
        'https://api.github.com/repos/pukmajster/funky/releases/latest'
      )
        .then((res) => res.json())
        .then((data) => data.tag_name.replace('v', ''))

      const isLatestReleaseNewerThanCurrent = isVersionNewer(appMeta.version, latestReleaseVersion)

      if (isLatestReleaseNewerThanCurrent) {
        newUpdateVersion = latestReleaseVersion
        isUpdateAvailable = true
      }
    } catch (err) {
      console.log(err)
    }
  }

  onMount(() => checkForUpdates())
</script>

{#if isUpdateAvailable}
  <button class="btn btn-sm variant-ghost-success flex" on:click={openLatestReleasePage}>
    <DownloadIcon class="w-4 inline" />
    <p class="text-sm">Update available: v{newUpdateVersion}</p>
  </button>
{/if}
