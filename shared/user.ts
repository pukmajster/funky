export interface User {
  steamGamesDir: string
  hasFinishedFirstTimeSetup: boolean
  enableNetworking?: boolean
  activeProfileId?: number
  steamWebApiKey?: string
  libraryDisplayMode?: 'grid' | 'list'
  hideDescriptions?: boolean
  enableExperimentalManifestParser?: boolean
  enableWorkshopMetadataFetching?: boolean
  locale?: string

  thumbnailsPreferredAspectRatio?: 'wide' | 'square'
  thumbnailsWastedSpace: 'stretch' | 'fill-black' | 'fill-blur' | 'disabled'
}
