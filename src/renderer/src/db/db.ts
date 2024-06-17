// db.ts
import Dexie, { type EntityTable } from 'dexie'

interface Profile {
  id: string
  label: string
  enabledAddonIds: string[]
  enabledShuffleIds: string[]
}

interface Shuffle {
  id: string
  label: string
  addonIds: string[]
}

interface GeneralPreferences {
  id: string
  steamGamesDir: string
  activeProfileId: string
  enableNetworking: boolean
  hasFinishedFirstTimeSetup: boolean
  steamWebApiKey: string
}

const db = new Dexie('FriendsDatabase') as Dexie & {
  profiles: EntityTable<
    Profile,
    'id' // primary key "id" (for the typings only)
  >
  shuffles: EntityTable<
    Shuffle,
    'id' // primary key "id" (for the typings only)
  >
  generalPreferences: EntityTable<
    GeneralPreferences,
    'steamGamesDir' // primary key "steamGamesDir" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  profiles: '++id, label, enabledADdonIds, enabledShuffleIds',
  shuffles: '++id, label, addonIds',
  generalPreferences:
    '++id, steamGamesDir, activeProfileId, enableNetworking, hasFinishedFirstTimeSetup, steamWebApiKey'
})

export type { Profile, Shuffle, GeneralPreferences }
export { db }
