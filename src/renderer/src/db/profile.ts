import { db } from './db'
import { liveQuery } from 'dexie'

export function createProfile(label: string) {
  return db.profiles.add({ label, enabledAddonIds: [], enabledShuffleIds: [] })
}

export function getProfiles() {
  return db.profiles.toArray()
}

export function renameProfile(id: number, label: string) {
  return db.profiles.update(id, { label })
}

export function deleteProfile(id: number) {
  return db.profiles.delete(id)
}

export function getProfile(id: number) {
  return db.profiles.get(id)
}
