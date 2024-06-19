<script lang="ts">
  import { liveQuery } from 'dexie'
  import { userStore } from '../stores/user'
  import { db } from '../db/db'
  import { get } from 'svelte/store'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../stores/library'

  $: activeProfile = liveQuery(() => db.profiles.get({ id: $userStore.activeProfileId ?? -1 }))

  //const listOfActiveShuffleIdsForProfile = $activeProfile?.enabledShuffleIds

  // const activeShuffles = liveQuery(() => {
  //   return db.shuffles.where('id').anyOf(listOfActiveShuffleIdsForProfile).toArray()
  // })

  $: {
    console.log('activeProfile', $activeProfile)

    if ($activeProfile || $activeProfile?.enabledAddonIds) {
      libraryActiveAddons.set($activeProfile.enabledAddonIds)
      libraryAddonIdsInEnabledShuffles.set([])
    }
  }
</script>

<slot />
