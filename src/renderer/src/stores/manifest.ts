import type { GameManifest } from 'shared'
import { get, writable } from 'svelte/store'
import { userStore } from './user'

export const currentGameManifest = writable<GameManifest | null>(null)
export const isRequestingGameManifest = writable<boolean>(false)

export async function requestCachedManifest() {
  isRequestingGameManifest.set(true)

  const { steamGamesDir, activeGameId } = get(userStore)

  console.log(steamGamesDir, activeGameId)

  try {
    let manifest = await window.api.requestGameManifest({
      appId: activeGameId,
      onlineMetadataFetching: true,
      mode: 'cached',
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
