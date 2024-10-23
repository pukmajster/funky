<script lang="ts">
  import type { User } from 'shared'
  import { onMount } from 'svelte'
  import { requestManifest } from './stores/manifest'
  import { userStore } from './stores/user'
  import { selectLanguage } from './i18n/store'

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
    locale: 'en'
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

  $: {
    const _locale = $userStore?.locale ?? 'en'
    selectLanguage(_locale)
  }

  $: {
    if (hasSetupUserProfile) {
      requestManifest('cached')
    }
  }
</script>
