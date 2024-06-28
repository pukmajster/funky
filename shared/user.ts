export interface User {
  steamGamesDir: string
  hasFinishedFirstTimeSetup: boolean
  enableNetworking: boolean
  activeProfileId?: number
  steamWebApiKey?: string
}
