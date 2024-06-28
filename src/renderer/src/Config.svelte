<script lang="ts">
  import type { User } from 'shared'
  import { onMount } from 'svelte'
  import { requestManifest } from './stores/manifest'
  import { userStore } from './stores/user'

  let defaultConfig: User = {
    steamGamesDir: '',
    enableNetworking: true,
    hasFinishedFirstTimeSetup: false,
    activeProfileId: 1
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
      requestManifest('cached')
    }
  }
</script>
