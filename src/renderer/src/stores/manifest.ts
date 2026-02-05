import type { GameManifest, RequestGameManifestParams } from 'shared'
import { get, writable } from 'svelte/store'
import { userStore } from './user'
import { L4D2_GAME_ID } from '../utils'
import { CStringTable } from '../../../shared/stringTable'

export const currentGameManifest = writable<GameManifest | null>(null)
export const isRequestingGameManifest = writable<boolean>(false)

export const manifestStringTable = new CStringTable()

export async function requestManifest(mode: RequestGameManifestParams['mode']) {
  isRequestingGameManifest.set(true)

  const user = get(userStore)

  if (!user?.steamGamesDir) {
    isRequestingGameManifest.set(false)
    return
  }

  const { steamGamesDir } = user
  console.log(steamGamesDir, L4D2_GAME_ID)

  try {
    let manifest = await window.api.requestGameManifest({
      appId: L4D2_GAME_ID,
      onlineMetadataFetching: get(userStore).enableNetworking,
      mode,
      steamGamesDir: steamGamesDir
    })

    if (manifest) {
      currentGameManifest.set(manifest)
      manifestStringTable.addMany(manifest.stringTable)
      console.log('Loaded manifest string table')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isRequestingGameManifest.set(false)
  }
}

export function getStringFromManifestStringTable(id: number): string | undefined {
  const manifest = get(currentGameManifest)
  if (!manifest) return undefined
  return manifest.stringTable[id] ?? undefined
}
