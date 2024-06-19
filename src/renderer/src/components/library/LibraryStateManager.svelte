<script lang="ts">
  import { liveQuery } from 'dexie'
  import { db } from '../../db/db'
  import { libraryActiveAddons, libraryAddonIdsInEnabledShuffles } from '../../stores/library'
  import { userStore } from '../../stores/user'

  $: activeProfile = liveQuery(
    async () => await db.profiles.get({ id: $userStore.activeProfileId })
  )

  $: {
    console.log('activeProfile', $activeProfile)
    libraryActiveAddons.set($activeProfile?.enabledAddonIds ?? [])
    libraryAddonIdsInEnabledShuffles.set([])
  }
</script>
