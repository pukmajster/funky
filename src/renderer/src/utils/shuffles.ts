import { get } from 'svelte/store'
import { db } from '../db/db'
import { activeProfileStore } from '../stores/active-profile'

export async function toggleAddonIdInShuffle(shuffleId: number, addonId: string) {
  const shuffle = await db.shuffles.get(shuffleId)
  if (shuffle) {
    const shuffledAddonIds = shuffle.shuffledAddonIds
    if (shuffledAddonIds.includes(addonId)) {
      db.shuffles.update(shuffleId, {
        shuffledAddonIds: shuffledAddonIds.filter((id) => id !== addonId)
      })
    } else {
      db.shuffles.update(shuffleId, {
        shuffledAddonIds: [...shuffledAddonIds, addonId]
      })
    }
  }
}

export function toggleShuffleEnabled(shuffleId: number) {
  const activeProfile = get(activeProfileStore)
  if (!activeProfile) return

  const currentlyEnabledShufflesForActiveProfile = activeProfile.enabledShuffleIds
  if (currentlyEnabledShufflesForActiveProfile.includes(shuffleId)) {
    db.profiles.update(activeProfile.id, {
      enabledShuffleIds: currentlyEnabledShufflesForActiveProfile.filter((id) => id !== shuffleId)
    })
  } else {
    db.profiles.update(activeProfile.id, {
      enabledShuffleIds: [...currentlyEnabledShufflesForActiveProfile, shuffleId]
    })
  }
}
