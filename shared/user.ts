export interface User {
  steamGamesDir: string
  hasFinishedFirstTimeSetup: boolean
  enableNetworking?: boolean
  activeProfileId?: number
  steamWebApiKey?: string
  hideDescriptions?: boolean
  enableExperimentalManifestParser?: boolean
  enableWorkshopMetadataFetching?: boolean
  refreshManifestOnStartup?: boolean

  // Grid thumbnails
  thumbnailsPreferredAspectRatio?: 'wide' | 'square'
  thumbnailsWastedSpace: 'stretch' | 'fill-black' | 'fill-blur' | 'disabled'

  // Library layouts
  libraryGridDensity: 'low' | 'normal' | 'high'
  libraryDisplayMode?: 'grid' | 'list'

  priorityLoad: string[]

  showWorkshopIds?: boolean
}
