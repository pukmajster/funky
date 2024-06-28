export type AddonId = string
export type AddonFile = string
export type AddonFiles = AddonFile[]

export interface Addon {
  id: AddonId
  addonInfo?: AddonInfo

  files?: AddonFiles

  vpkTimeLastModified?: string
  vpkSizeInBytes?: number
  vpkHash?: string

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
