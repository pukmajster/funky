/********************************************************************+
 *
 * Store for accessing the active user profile.
 *
 ********************************************************************/
import { get, writable } from 'svelte/store'
import { db, type Profile } from '../db/db'
import { toastStore } from '@skeletonlabs/skeleton'
import { writeAddonList } from '../api/api'
import { userStore } from './user'

// Types pour l'API Steam
interface SteamCollectionChild { publishedfileid: string }
interface SteamCollectionDetails { title: string; children: SteamCollectionChild[] }

const STEAM_COLLECTION_DETAILS_URL = 'https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/'
const STEAM_PUBLISHED_FILE_URL = 'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/'

async function fetchPublishedFileTitle(fileId: string): Promise<string> {
  const params = new URLSearchParams({ itemcount: '1', 'publishedfileids[0]': fileId })
  const res = await fetch(STEAM_PUBLISHED_FILE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })
  const data = await res.json()
  const details = data.response.publishedfiledetails?.[0]
  return details?.title || ''
}

async function fetchCollectionDetails(collectionId: string): Promise<SteamCollectionDetails> {
  const params = new URLSearchParams({ collectioncount: '1', 'publishedfileids[0]': collectionId })
  const res = await fetch(STEAM_COLLECTION_DETAILS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })
  const data = await res.json()
  const raw = data.response.collectiondetails?.[0]
  const children = Array.isArray(raw.children)
    ? raw.children.map((c: any) => ({ publishedfileid: c.publishedfileid.toString() }))
    : []
  const title = await fetchPublishedFileTitle(collectionId)
  return { title, children }
}

function createProfileStore() {
  const store = writable<Profile | undefined>(undefined)
  const { subscribe, set, update } = store

  function renameProfile(newLabel: string) {
    update(profile => profile ? { ...profile, label: newLabel } : undefined)
    if (get(store)) db.profiles.update(get(store)!.id, { label: newLabel })
  }

  async function deleteProfile(id: number) {
    if (id === 1 || id === 2) return
    await db.profiles.delete(id)
    if (get(store)?.id === id) set(undefined)
  }

  function setAddonList(addonIds: string[]) {
    update(profile => profile ? { ...profile, enabledAddonIds: addonIds } : undefined)
    db.profiles.update(get(store)!.id, { enabledAddonIds: addonIds })
  }

  function addonListEnabled(addonIds: string[]) {
    setAddonList(addonIds)
  }

  function toggleAddonEnabled(addonEntry: string) {
    update(profile => {
      if (!profile) return undefined
      const list = profile.enabledAddonIds
      const updated = list.includes(addonEntry)
        ? list.filter(id => id !== addonEntry)
        : [...list, addonEntry]
      db.profiles.update(profile.id, { enabledAddonIds: updated })
      return { ...profile, enabledAddonIds: updated }
    })
  }

  function toggleShuffleEnabled(shuffleId: number) {
    update(profile => {
      if (!profile) return undefined
      const list = profile.enabledShuffleIds
      const updated = list.includes(shuffleId)
        ? list.filter(id => id !== shuffleId)
        : [...list, shuffleId]
      db.profiles.update(profile.id, { enabledShuffleIds: updated })
      return { ...profile, enabledShuffleIds: updated }
    })
  }

  async function createProfileFromCollection(collectionInput: string) {
    const matches = collectionInput.match(/(\d+)/g)
    if (!matches) {
      toastStore.trigger({ background: 'variant-filled-error', message: 'ID de collection invalide' })
      return
    }
    const collectionId = matches.pop()!

    toastStore.trigger({ background: 'variant-filled-surface', message: `Récupération collection ${collectionId}…` })
    const { title, children } = await fetchCollectionDetails(collectionId)

    const addonEntries = children.map(c => `workshop/${c.publishedfileid}.vpk`)
    if (!addonEntries.length) {
      toastStore.trigger({ background: 'variant-filled-warning', message: 'Aucun addon dans cette collection' })
      return
    }

    toastStore.trigger({ background: 'variant-filled-surface', message: `Création profil « ${title} »…` })
    const newId = await db.profiles.add({ label: title, enabledAddonIds: [], enabledShuffleIds: [] })
    userStore.setActiveProfileId(newId)
    const newProfile = await db.profiles.get(newId)
    set(newProfile)

    addonEntries.forEach(entry => toggleAddonEnabled(entry))
    await writeAddonList()
    toastStore.trigger({
      background: 'variant-filled-success',
      message: `Profil '${title}' créé avec ${addonEntries.length} addons activés !`
    })
  }

  // Sync store on active profile change
  userStore.subscribe(user => {
    const pid = user?.activeProfileId
    if (pid) {
      db.profiles.get(pid).then(profile => set(profile))
    }
  })

  return {
    set,
    subscribe,
    deleteProfile,
    renameProfile,
    toggleAddonEnabled,
    toggleShuffleEnabled,
    setAddonList,
    addonListEnabled,
    createProfileFromCollection
  }
}

export const activeProfileStore = createProfileStore()
