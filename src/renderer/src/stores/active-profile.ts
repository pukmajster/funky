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

  async function deleteProfile(id: number) {
    try {
      if (id == 1 || id == 2) {
        // Ensure that user somehow doesn't delete Default/No mod profiles
        return
      } else {
        await db.profiles.delete(id)
        // console.log('Profile id ' + id + ' has been succesfully deleted')
      }
    } catch (error) {
      console.error(error)
    }
  }

  function addonListEnabled(addonIds: string[]) {
    db.profiles.update(get(store).id, {
      enabledAddonIds: addonIds
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

  function batchEnableAddons(addonIdsToEnable: string[]) {
    const _store = get(store)

    db.profiles.update(_store.id, {
      enabledAddonIds: [..._store.enabledAddonIds, ...addonIdsToEnable]
    })
  }

  function batchDisableAddons(addonIdsToDisable: string[]) {
    const _store = get(store)

    const list = _store.enabledAddonIds
    const filteredList = list.filter((addonId) => !addonIdsToDisable.includes(addonId))

    db.profiles.update(_store.id, {
      enabledAddonIds: filteredList
    })
  }

  return {
    set,
    subscribe,

    deleteProfile,
    renameProfile,

    toggleAddonEnabled,
    addonListEnabled,
    batchEnableAddons,
    batchDisableAddons,

    toggleShuffleEnabled
  }
}

export const activeProfileStore = createProfileStore()
