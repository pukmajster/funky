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

  // Generic function to set a value in the User store
  function setValue<T extends keyof User>(key: T, value: User[T]) {
    update((user) => {
      return {
        ...user,
        [key]: value
      }
    })
  }

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
    resetFirstTimeSetup,

    setValue
  }
}

export const userStore = createUserStore()
