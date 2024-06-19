<script lang="ts">
  import { liveQuery } from 'dexie'
  import { userStore } from '../stores/user'
  import { db } from '../db/db'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../stores/library'

  $: activeProfile = liveQuery(
    async () => await db.profiles.get({ id: $userStore.activeProfileId })
  )

  $: {
    console.log('activeProfile', $activeProfile)
    libraryActiveAddons.set($activeProfile?.enabledAddonIds ?? [])
    libraryAddonIdsInEnabledShuffles.set([])
  }
</script>
