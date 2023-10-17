import { nanoid } from 'nanoid'
import type { AddonId, Profile, User } from 'shared'
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

  function setActiveProfileId(profileId: string) {
    update((user) => {
      const activeGameId = user.activeGameId

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: {
            ...user.games[activeGameId],
            activeProfile: profileId
          }
        }
      }
    })
  }

  function batchEnableAddonIds(addonIds: AddonId[]) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      workingProfile.enabledAddonIds = workingProfile.enabledAddonIds.concat(addonIds)

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function batchDisableAddonIds(addonIds: AddonId[]) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      workingProfile.enabledAddonIds = workingProfile.enabledAddonIds.filter(
        (addonId) => !addonIds.includes(addonId)
      )

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function batchToggleShuffleForSubCategory(subCategoryId: string, addonIds: AddonId[]) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]

      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user
      const workingShuffle = workingProfile.shuffles[subCategoryId]

      if (!workingShuffle) return user

      workingShuffle.shuffledAddonIds = workingShuffle.shuffledAddonIds.concat(addonIds)

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function toggleAddonEnabledState(addonId: string) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      const addonIndex = workingProfile.enabledAddonIds.indexOf(addonId)
      if (addonIndex === -1) {
        workingProfile.enabledAddonIds.push(addonId)
      } else {
        workingProfile.enabledAddonIds.splice(addonIndex, 1)
      }

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function toggleAddonShuffleForSubCategory(subCategoryId: string, addonId: AddonId) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      const workingShuffle = workingProfile.shuffles[subCategoryId]
      if (!workingShuffle) return user

      const addonIndex = workingShuffle.shuffledAddonIds.indexOf(addonId)
      if (addonIndex === -1) {
        workingShuffle.shuffledAddonIds.push(addonId)
      } else {
        workingShuffle.shuffledAddonIds.splice(addonIndex, 1)
      }

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function toggleSubCategoryShuffle(subCategoryId: string) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      const workingShuffle = workingProfile.shuffles[subCategoryId]

      if (!workingShuffle) {
        workingProfile.shuffles[subCategoryId] = {
          subCategoryId: subCategoryId,
          enabled: true,
          shuffledAddonIds: [],
          id: subCategoryId
        }
      } else {
        workingShuffle.enabled = !workingShuffle.enabled
      }

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function toggleShuffleState(shuffleId: string) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      const workingShuffle = workingProfile.shuffles[shuffleId]
      if (!workingShuffle) return user

      workingShuffle.enabled = !workingShuffle.enabled

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function toggleAddonIdInShuffle(shuffleId: string, addonId: AddonId) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      console.log('profile', workingProfile)
      console.log('shuffleId', shuffleId)
      console.log('addonId', addonId)

      const workingShuffle = workingProfile.shuffles[shuffleId]
      if (!workingShuffle) console.log('no working shuffle')

      if (!workingShuffle) return user

      const addonIndex = workingShuffle.shuffledAddonIds.indexOf(addonId)
      if (addonIndex === -1) {
        workingShuffle.shuffledAddonIds.push(addonId)
      } else {
        workingShuffle.shuffledAddonIds.splice(addonIndex, 1)
      }

      console.log('workingShuffle', workingShuffle)

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function addShuffle(label: string) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user
      let id = nanoid()

      workingProfile.shuffles[id] = {
        id,
        label: label,
        enabled: true,
        custom: true,
        shuffledAddonIds: []
      }

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function addProfile(profile: Profile) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: {
            ...workingGamePreferences,
            activeProfileId: profile.id,
            profiles: [...workingGamePreferences.profiles, profile]
          }
        }
      }
    })
  }

  function setupGameWithDefaultProfile(gameId: number) {
    console.log('setupGameWithDefaultProfile')

    update((user) => {
      return {
        ...user,
        games: {
          ...user.games,
          [gameId]: {
            activeProfileId: 'default',
            profiles: [
              {
                id: 'default',
                label: 'Default',
                enabledAddonIds: [],
                shuffles: {}
              }
            ],
            collections: []
          }
        }
      }
    })
  }

  function removeShuffleById(shuffleId: string) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      delete workingProfile.shuffles[shuffleId]

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  function editShuffleNameById(shuffleId: string, newName: string) {
    update((user) => {
      const activeGameId = user.activeGameId
      const workingGamePreferences = user.games[activeGameId]
      const workingProfile = workingGamePreferences.profiles.find(
        (profile) => profile.id === workingGamePreferences.activeProfileId
      )

      if (!workingProfile) return user

      workingProfile.shuffles[shuffleId].label = newName

      return {
        ...user,
        games: {
          ...user.games,
          [activeGameId]: workingGamePreferences
        }
      }
    })
  }

  return {
    set,
    subscribe,
    setActiveGameId,
    setSteamGamesDir,
    setActiveProfileId,
    toggleAddonEnabledState,
    toggleAddonShuffleForSubCategory,
    toggleSubCategoryShuffle,

    addProfile,
    setupGameWithDefaultProfile,

    batchDisableAddonIds,
    batchEnableAddonIds,
    batchToggleShuffleForSubCategory,

    toggleShuffleState,
    toggleAddonIdInShuffle,
    addShuffle,
    removeShuffleById,
    editShuffleNameById
  }
}

export const userStore = createUserStore()
