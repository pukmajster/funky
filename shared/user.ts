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

  priorityLoad: string[]

  showWorkshopIds?: boolean

  libraryHideThumbnails?: boolean

  experimentalLoadOrderEnable?: boolean

  // Library layouts
  libraryDisplayMode?: 'grid' | 'list'
  libraryGridDensity: 'sm' | 'md' | 'lg'

  // General thumbnail settings
  libraryThumbnailAspectRatio: 'wide' | 'square'
  libraryThumbnailWastedSpace: 'stretch' | 'fill-black' | 'fill-blur' | 'disabled'
}
