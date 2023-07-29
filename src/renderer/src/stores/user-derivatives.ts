import { derived } from 'svelte/store'
import { libraryActiveSubCategories } from './library'
import { userStore } from './user'

export const derivedActiveProfileId = derived(userStore, ($userStore) => {
  const activeGameId = $userStore?.activeGameId
  const activeProfileId = $userStore?.games[activeGameId]?.activeProfileId
  return activeProfileId
})

export const derivedEnabledAddonIds = derived(userStore, ($userStore) => {
  const activeGameId = $userStore?.activeGameId
  const activeProfileId = $userStore?.games[activeGameId]?.activeProfileId
  const enabledAddonIds = $userStore?.games[activeGameId]?.profiles.find(
    (profile) => profile.id === activeProfileId
  )?.enabledAddonIds
  return enabledAddonIds
})

export const derivedIsShuffleEnabledForSubCategory = derived(
  [userStore, libraryActiveSubCategories],
  ([$userStore, $libraryActiveSubCategories]) => {
    if ($libraryActiveSubCategories.length === 0) return false

    const activeGameId = $userStore?.activeGameId
    const activeProfileId = $userStore?.games[activeGameId]?.activeProfileId
    const activeSubCategory = $libraryActiveSubCategories[0]

    const enabled = $userStore?.games[activeGameId]?.profiles.find(
      (profile) => profile.id === activeProfileId
    )?.shuffles[activeSubCategory]?.enabled

    return enabled
  }
)
