import type { Addon, AddonId, Profile } from 'shared'
import { derived, writable } from 'svelte/store'
import { arraysShareValues } from '../utils'
import { currentGameManifest } from './manifest'
import { userStore } from './user'

export const librarySearchQueue = writable('')
export const libraryActiveCategory = writable<string>('all')
export const libraryActiveSubCategories = writable<string[]>([])

export const derivedSingleActiveSubCategory = derived(
  libraryActiveSubCategories,
  ($libraryActiveSubCategories) => {
    if ($libraryActiveSubCategories.length == 1) return $libraryActiveSubCategories[0]
    return ''
  }
)

export const addonOverviewId = writable<AddonId | null>(null)

export const libraryPage = writable<number>(1)
export const libraryPageSize = writable<number>(50)

export const libraryPageSizes = [20, 50, 100, 200, 500, 1000, 9999] as const

type SortingType =
  | 'name_asc'
  | 'name_desc'
  | 'time_oldest'
  | 'time_newest'
  | 'size_smallest'
  | 'size_biggest'
type TypeOfMod = 'any' | 'enabled' | 'disabled' | 'hidden' | 'uninstalled'

export const typeToShow = writable<TypeOfMod>('any')
export const sortingType = writable<SortingType>('time_newest')

// Derive active addons from the current active profiile for the current game
export const libraryActiveAddons = derived([userStore], ([$userStore]) => {
  const activeAddons: AddonId[] = []

  const { games, activeGameId } = $userStore
  const activeProfileId = games[activeGameId]?.activeProfileId

  if (!games) return activeAddons
  if (!activeProfileId) return activeAddons

  console.log('profilee')

  const profile: Profile = games[activeGameId]?.profiles.find(
    (profile) => profile.id === activeProfileId
  ) as Profile
  if (!profile) return activeAddons

  profile.enabledAddonIds.forEach((addonId) => {
    activeAddons.push(addonId)
  })

  console.log(activeAddons)

  return activeAddons
})

export const libraryAddonPool = derived(
  [
    currentGameManifest,
    librarySearchQueue,
    libraryActiveSubCategories,
    libraryActiveCategory,
    typeToShow,
    libraryActiveAddons
  ],
  ([
    $currentGameManifest,
    $librarySearchQueue,
    $libraryActiveSubCategories,
    $libraryActiveCategory,
    $typeToShow,
    $libraryActiveAddons
  ]) => {
    const addonIds: string[] = []
    const allFilters = $libraryActiveSubCategories.filter((filter) => filter != '')

    // WTF was i doing here
    Object.keys($currentGameManifest?.addons ?? []).map((addonIndex) => {
      const thisAddon = $currentGameManifest.addons[addonIndex]

      if (!thisAddon) return
      const addonId = thisAddon.id

      const addonName = thisAddon.addonInfo?.title ?? thisAddon.id

      // Make sure the mod's title fits the search term
      if ($librarySearchQueue) {
        if (!addonName) return
        if (!addonName.toLowerCase().includes($librarySearchQueue.toLowerCase())) return
      }

      const thisModCategories = $currentGameManifest.addonCategories.categories[addonId] ?? []

      // Check for mod type
      switch ($typeToShow) {
        case 'any':
          break
        case 'enabled':
          if (!$libraryActiveAddons.includes(addonId)) return
          break
        case 'disabled':
          if ($libraryActiveAddons.includes(addonId)) return
          break
        default:
          break
      }

      if (
        $libraryActiveCategory != 'all' &&
        $libraryActiveCategory != '?' &&
        !thisModCategories.includes($libraryActiveCategory)
      )
        return

      if ($libraryActiveCategory == '?' && thisModCategories.length > 0) return

      if ($libraryActiveSubCategories.length > 0) {
        if (thisModCategories == undefined) return
        const sharedCats = arraysShareValues(allFilters, thisModCategories)
        if (!sharedCats) return
      }

      addonIds.push(addonId)
    })

    return addonIds
  }
)

export const libraryAddonPoolSorted = derived(
  [currentGameManifest, libraryAddonPool, sortingType],
  ([$currentGameManifest, $libraryAddonPool, $sortingType]) => {
    let tempStorage: AddonId[] = $libraryAddonPool

    function getAddonDetails(addonId: AddonId): Addon {
      return $currentGameManifest.addons[addonId]
    }

    if ($sortingType == ('name_asc' as SortingType)) {
      tempStorage = tempStorage.sort((a: AddonId, b: AddonId) =>
        (getAddonDetails(a)?.addonInfo?.title ?? a).localeCompare(
          getAddonDetails(b)?.addonInfo?.title ?? b
        )
      )
    }

    if ($sortingType == 'name_desc') {
      tempStorage = tempStorage.sort((a: AddonId, b: AddonId) =>
        (getAddonDetails(b)?.addonInfo?.title ?? b).localeCompare(
          getAddonDetails(a)?.addonInfo?.title ?? a
        )
      )
    }

    // if ($sortingType == 'time_oldest') {
    //   tempStorage = tempStorage.sort(
    //     (a: AddonId, b: AddonId) =>
    //       Date.parse(getAddonDetails(a)?.vpkTimeLastModified.toDateString()) -
    //       Date.parse(getAddonDetails(b)?.vpkTimeLastModified.toDateString())
    //   )
    // }

    // if ($sortingType == 'time_newest') {
    //   tempStorage = tempStorage.sort(
    //     (a: AddonId, b: AddonId) =>
    //       Date.parse(getAddonDetails(b)?.vpkTimeLastModified.toDateString()) -
    //       Date.parse(getAddonDetails(a)?.vpkTimeLastModified.toDateString())
    //   )
    // }

    // if ($sortingType == 'size_smallest') {
    //   tempStorage = tempStorage.sort(
    //     (a: AddonId, b: AddonId) =>
    //       getAddonDetails(a).vpkSizeInBytes - getAddonDetails(b).vpkSizeInBytes
    //   )
    // }

    // if ($sortingType == 'size_biggest') {
    //   tempStorage = tempStorage.sort(
    //     (a: AddonId, b: AddonId) =>
    //       getAddonDetails(b).vpkSizeInBytes - getAddonDetails(a).vpkSizeInBytes
    //   )
    // }

    return tempStorage
  }
)

export const libraryAddonPoolSortedPaginated = derived(
  [libraryAddonPoolSorted, libraryPage, libraryPageSize],
  ([$libraryAddonPoolSorted, $libraryPage, $libraryPageSize]) => {
    const tempStorage: AddonId[] = []

    const start = ($libraryPage - 1) * $libraryPageSize
    const end = start + $libraryPageSize

    for (let i = start; i < end; i++) {
      if ($libraryAddonPoolSorted[i]) tempStorage.push($libraryAddonPoolSorted[i])
    }

    return tempStorage
  }
)

export const libraryPageCount = derived(
  [libraryAddonPoolSorted, libraryPageSize],
  ([$libraryAddonPoolSorted, $libraryPageSize]) => {
    return Math.ceil($libraryAddonPoolSorted.length / $libraryPageSize)
  }
)
