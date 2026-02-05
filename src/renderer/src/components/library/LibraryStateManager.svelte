<script lang="ts">
  import { liveQuery } from 'dexie'
  import { db } from '../../db/db'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../../stores/library'
  import { userStore } from '../../stores/user'

  // Set active profile writable
  $: activeProfile = liveQuery(
    async () => await db.profiles.get({ id: $userStore.activeProfileId })
  )

  // Set enabled shuffles writable
  $: enabledShuffles = liveQuery(
    async () => await db.shuffles.where('id').anyOf($activeProfile.enabledShuffleIds).toArray()
  )

  // Map out all addons in enabled shuffles
  $: {
    libraryAddonIdsInEnabledShuffles.set(
      $enabledShuffles?.flatMap((shuffle) => shuffle.shuffledAddonIds) ?? []
    )
  }

  // Set active addons writable
  $: {
    libraryActiveAddons.set($activeProfile?.enabledAddonIds ?? [])
  }
</script>
