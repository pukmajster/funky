<script lang="ts">
  import { liveQuery } from 'dexie'
  import { db } from '../../db/db'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../../stores/library'
  import { userStore } from '../../stores/user'

  $: activeProfile = liveQuery(
    async () => await db.profiles.get({ id: $userStore.activeProfileId })
  )

  $: enabledShuffles = liveQuery(
    async () => await db.shuffles.where('id').anyOf($activeProfile.enabledShuffleIds).toArray()
  )

  $: {
    libraryAddonIdsInEnabledShuffles.set(
      $enabledShuffles?.flatMap((shuffle) => shuffle.shuffledAddonIds) ?? []
    )
  }

  $: {
    console.log('activeProfile', $activeProfile)
    libraryActiveAddons.set($activeProfile?.enabledAddonIds ?? [])
  }
</script>
