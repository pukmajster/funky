<script lang="ts">
  import { liveQuery } from 'dexie'
  import { userStore } from '../stores/user'
  import { db } from '../db/db'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../stores/library'

  $: activeProfile = liveQuery(
    async () => await db.profiles.get({ id: $userStore.activeProfileId })
  )

  //const listOfActiveShuffleIdsForProfile = $activeProfile?.enabledShuffleIds

  // const activeShuffles = liveQuery(() => {
  //   return db.shuffles.where('id').anyOf(listOfActiveShuffleIdsForProfile).toArray()
  // })

  $: {
    console.log('activeProfile', $activeProfile)
    libraryActiveAddons.set($activeProfile?.enabledAddonIds ?? [])
    libraryAddonIdsInEnabledShuffles.set([])
  }
</script>
