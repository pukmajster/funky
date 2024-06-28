/********************************************************************+
 *
 * Store for accessing the active user profile.
 *
 ********************************************************************/
import { get, writable } from 'svelte/store'
import { db, type Profile } from '../db/db'

function createProfileStore() {
  const store = writable<Profile | undefined>(undefined)
  const { subscribe, set, update } = store

  function renameProfile(newLabel: string) {
    update((profile) => {
      return {
        ...profile,
        label: newLabel
      }
    })
  }

  function toggleAddonEnabled(addonId: string) {
    const list = get(store).enabledAddonIds
    if (list.includes(addonId)) {
      db.profiles.update(get(store).id, {
        enabledAddonIds: list.filter((id) => id !== addonId)
      })
    } else {
      db.profiles.update(get(store).id, {
        enabledAddonIds: [...list, addonId]
      })
    }
  }

  function toggleShuffleEnabled(shuffleId: number) {
    const list = get(store).enabledShuffleIds
    if (list.includes(shuffleId)) {
      db.profiles.update(get(store).id, {
        enabledShuffleIds: list.filter((id) => id !== shuffleId)
      })
    } else {
      db.profiles.update(get(store).id, {
        enabledShuffleIds: [...list, shuffleId]
      })
    }
  }

  return {
    set,
    subscribe,

    renameProfile,
    toggleAddonEnabled,
    toggleShuffleEnabled
  }
}

export const activeProfileStore = createProfileStore()
