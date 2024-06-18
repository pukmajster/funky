import Dexie, { type EntityTable } from 'dexie'

interface Profile {
  id: number
  label: string
  enabledAddonIds: string[]
  enabledShuffleIds: string[]
}

interface Shuffle {
  id: number
  label: string
  addonIds: string[]
}

interface GeneralPreferences {
  id: number
  steamGamesDir: string
  activeProfileId: string
  enableNetworking: boolean
  hasFinishedFirstTimeSetup: boolean
  steamWebApiKey: string
}

const db = new Dexie('FunkyDatabase-v3') as Dexie & {
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
  profiles: '++id, *enabledAddonIds, *enabledShuffleIds',
  shuffles: '++id, *shuffledAddonIds',
  generalPreferences: '++id'
})

// Populate the database with default, empty profiles
db.on('populate', async () => {
  db.profiles.add({
    id: 0,
    label: 'Default',
    enabledAddonIds: [],
    enabledShuffleIds: []
  })

  db.profiles.add({
    id: 1,
    label: 'No Mods',
    enabledAddonIds: [],
    enabledShuffleIds: []
  })
})

export type { Profile, Shuffle, GeneralPreferences }
export { db }
