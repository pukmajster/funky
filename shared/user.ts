import { type AddonId } from './addon'

export interface User {
  steamGamesDir: string
  hasFinishedFirstTimeSetup: boolean
  enableNetworking: boolean
  activeGameId: number
  games: UserGamePreferences
}

export interface UserGamePreferences {
  [gameId: string]: GamePreferences
}

export interface GamePreferences {
  collections: Collection[]
  profiles: Profile[]
  activeProfileId: string
}

export interface Profile {
  id: string
  label: string

  enabledAddonIds: AddonId[]
  shuffles: Record<string, CategoryShuffle>
}

export interface CategoryShuffle {
  subCategoryId: string
  enabled: boolean
  shuffledAddonIds: AddonId[]
}

export interface Collection {
  id: string
  label: string
  addonIds: AddonId[]
}
