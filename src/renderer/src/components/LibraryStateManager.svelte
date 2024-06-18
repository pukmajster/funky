<script lang="ts">
  import { liveQuery } from 'dexie'
  import { useActiveProfile } from '../db/profile'
  import { userStore } from '../stores/user'
  import { db } from '../db/db'
  import { get } from 'svelte/store'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../stores/library'

  const activeProfile = liveQuery(() => {
    const activeProfileId = get(userStore).activeProfileId
    return db.profiles.get({ id: activeProfileId })
  })

  const listOfActiveShuffleIdsForProfile = $activeProfile?.enabledShuffleIds

  const activeShuffles = liveQuery(() => {
    return db.shuffles.where('id').anyOf(listOfActiveShuffleIdsForProfile).toArray()
  })

  $: console.log(
    $activeProfile?.enabledAddonIds,
    $activeProfile?.label,
    listOfActiveShuffleIdsForProfile,
    $activeShuffles
  )

  $: {
    console.log('activeProfile', $activeProfile)

    if ($activeProfile || $activeProfile?.enabledAddonIds) {
      libraryActiveAddons.set($activeProfile.enabledAddonIds)
      libraryAddonIdsInEnabledShuffles.set([])
    }
  }
</script>

<slot />
