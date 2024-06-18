import type { GameManifest, RequestGameManifestParams } from 'shared'
import { get, writable } from 'svelte/store'
import { userStore } from './user'
import { L4D2_GAME_ID } from '../utils'

export const currentGameManifest = writable<GameManifest | null>(null)
export const isRequestingGameManifest = writable<boolean>(false)

export async function requestManifest(mode: RequestGameManifestParams['mode']) {
  isRequestingGameManifest.set(true)

  const { steamGamesDir } = get(userStore)

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
    }
  } catch (error) {
    console.error(error)
  } finally {
    isRequestingGameManifest.set(false)
  }
}
