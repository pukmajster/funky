/********************************************************************+
 *
 * Simple API for managing the user store
 *
 ********************************************************************/

import type { User } from 'shared'
import { writable } from 'svelte/store'

function createUserStore() {
  const store = writable<User | undefined>(undefined)
  const { subscribe, set, update } = store

  function setActiveGameId(gameId: number) {
    update((user) => {
      return {
        ...user,
        currentGame: gameId
      }
    })
  }

  function setSteamGamesDir(steamGamesDir: string) {
    update((user) => {
      return {
        ...user,
        steamGamesDir: steamGamesDir
      }
    })
  }

  function setActiveProfileId(profileId: number) {
    update((user) => {
      return {
        ...user,
        activeProfileId: profileId
      }
    })
  }

  function resetFirstTimeSetup() {
    update((user) => {
      return {
        ...user,
        hasFinishedFirstTimeSetup: false
      }
    })
  }

  return {
    set,
    subscribe,
    setActiveGameId,
    setSteamGamesDir,
    setActiveProfileId,
    resetFirstTimeSetup
  }
}

export const userStore = createUserStore()
