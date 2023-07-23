<script lang="ts">
  import type { User } from 'shared'
  import { onMount } from 'svelte'
  import { requestCachedManifest } from './stores/manifest'
  import { userStore } from './stores/user'

  let defaultConfig: User = {
    steamGamesDir: '',
    games: {},
    activeGameId: 550,
    hasFinishedFirstTimeSetup: false
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
    if (hasSetupUserProfile) {
      requestCachedManifest()
    }
  }
</script>
