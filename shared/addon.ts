import type { StringTableIds } from './stringTable'

export type AddonId = string
export type AddonFile = string
export type AddonFiles = StringTableIds

export interface Addon {
  id: AddonId
  addonInfo?: AddonInfo

  files?: AddonFiles

  vpkTimeLastModified?: string
  vpkSizeInBytes?: number
  vpkHash?: string
  vpkAddonInfoMissing?: boolean

  workshop?: {
    publishedFileId: number
  }
}

export interface AddonInfo {
  title?: string
  description?: string
  version?: string
  author?: string
  tagline?: string
  url?: string
  onlineThumbnail?: string
}

export interface AddonInfoOnline {
  title?: string
}

export type AddonInfoTxt = {
  addoninfo: {
    addontitle: string
    addondescription: string
    addonversion: string
    addonauthor: string
    addontagline: string
    addonurl0: string
  }
}
