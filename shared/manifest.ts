import type { StringTableStrings } from '../src/shared/stringTable'
import { type Addon, type AddonId } from './addon'

export interface GameManifest {
  manifestMetadata: {
    version: number
    createdAt: string
    updatedAt: string
  }
  stringTable: StringTableStrings
  appId: number
  addons: Addon[]
  installedAddons: AddonId[]
  addonCategories: {
    version: number
    categories: Record<AddonId, string[]>
  }
}

export interface RequestGameManifestParams {
  steamGamesDir: string
  appId: number
  mode: 'cached' | 'quick-refresh' | 'full-update'
  onlineMetadataFetching: boolean
}

export interface UninstallAddonsParams {
  steamGamesDir: string
  appId: number
  addonIds: AddonId[]
}
