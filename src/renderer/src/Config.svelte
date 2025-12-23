<script lang="ts">
  import type { User } from 'shared'
  import { onMount } from 'svelte'
  import { requestManifest } from './stores/manifest'
  import { userStore } from './stores/user'

  let defaultConfig: User = {
    steamGamesDir: '',
    enableNetworking: true,
    libraryDisplayMode: 'grid',
    hasFinishedFirstTimeSetup: false,
    activeProfileId: 1,
    hideDescriptions: true,
    enableExperimentalManifestParser: false,
    enableWorkshopMetadataFetching: true,
    thumbnailsPreferredAspectRatio: 'wide',
    thumbnailsWastedSpace: 'stretch',
    libraryGridDensity: 'normal',
    refreshManifestOnStartup: false,
    priorityLoad: [],
    showWorkshopIds: false
  }

  let hasSetupUserProfile = false

  onMount(async () => {
    let userConfig = defaultConfig

    try {
      const savedUser = await window.api.readUserFile()
      userConfig = { ...defaultConfig, ...savedUser }
    } catch (e) {
      console.error('no user confing found')
    }

    $userStore = userConfig
    hasSetupUserProfile = $userStore.hasFinishedFirstTimeSetup
    console.log('userStore', $userStore)

    window.api.writeUserFile(userConfig)
  })

  $: {
    if ($userStore) {
      window.api.writeUserFile($userStore)
    }
  }

  function getManifestOnStartup() {
    if ($userStore.steamGamesDir)
      requestManifest($userStore.refreshManifestOnStartup ? 'quick-refresh' : 'cached')
  }

  // Only execute the manifest fetcher once, on startup
  $: {
    if (hasSetupUserProfile) {
      getManifestOnStartup()
    }
  }
</script>
