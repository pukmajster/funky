import type { GameManifest, RequestGameManifestParams } from 'shared'
import { get, writable } from 'svelte/store'
import { userStore } from './user'

export const currentGameManifest = writable<GameManifest | null>(null)
export const isRequestingGameManifest = writable<boolean>(false)

export async function requestManifest(mode: RequestGameManifestParams['mode']) {
  isRequestingGameManifest.set(true)

  const { steamGamesDir, activeGameId } = get(userStore)

  console.log(steamGamesDir, activeGameId)

  try {
    let manifest = await window.api.requestGameManifest({
      appId: activeGameId,
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
