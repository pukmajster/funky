import type { Addon, AddonId } from 'shared'
import { derived, get, writable } from 'svelte/store'
import { L4D2_GAME_ID, arraysShareValues } from '../utils'
import { currentGameManifest } from './manifest'
import { userStore } from './user'
import { liveQuery } from 'dexie'
import { db } from '../db/db'

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

// Library pagination
export const libraryPage = writable<number>(1)
export const libraryPageSize = writable<number>(50)
export const libraryPageSizes = [20, 50, 100, 200, 500, 1000, 9999] as const

// Library filters
export type SortingType =
  | 'name_asc'
  | 'name_desc'
  | 'time_oldest'
  | 'time_newest'
  | 'size_smallest'
  | 'size_biggest'

export type TypeOfMod =
  | 'any'
  | 'enabled'
  | 'disabled'
  | 'shuffled'
  | 'enabled/shuffled'
  | 'hidden'
  | 'uninstalled'
export type AddonSource = 'workshop' | 'local' | 'all'
export const typeToShow = writable<TypeOfMod>('any')
export const sortingType = writable<SortingType>('time_newest')
export const addonSource = writable<AddonSource>('all')

// Addon selection
export const librarySelectedAddonIds = writable<AddonId[]>([])

// Unsubscribing from Steam Workshop mods
export const isUnsubscribeOngoing = writable(false)
export const unsubscribeQueue = writable<AddonId[]>([])
export const unsubscribedItemsThisSession = writable<AddonId[]>([])

// Pull the list of installed addons from the current game manifest
export const installedAddons = derived([currentGameManifest], ([$currentGameManifest]) => {
  return $currentGameManifest?.installedAddons ?? []
})

const activeProfileId = get(userStore)?.activeProfileId
const activeProfileObservable = liveQuery(() => db.profiles.get({ id: activeProfileId }))

const sub = activeProfileObservable.subscribe({
  next: (profile) => {
    console.log('Profile changed', profile)
    libraryActiveAddons.set(profile.enabledAddonIds)
    libraryAddonIdsInEnabledShuffles.set([])
  },
  error: (error) => {
    console.error('Error', error)
  }
})

export const libraryActiveAddons = writable<AddonId[]>([])
export const libraryAddonIdsInEnabledShuffles = writable<AddonId[]>([])

// Derive active addons from the current active profiile for the current game
// export const libraryActiveAddons = derived([userStore], ([$userStore]) => {
//   const activeAddons: AddonId[] = []

//   const activeProfileId = $userStore.activeProfileId
//   if (!activeProfileId) return activeAddons

//   // const profile: Profile = games[activeGameId]?.profiles.find(
//   //   (profile) => profile.id === activeProfileId
//   // ) as Profile
//   // if (!profile) return activeAddons

//   // profile.enabledAddonIds.forEach((addonId) => {
//   //   activeAddons.push(addonId)
//   // })

//   // return activeAddons
// })

// Derive list of all addons that are in active shuffles
// export const libraryAddonIdsInEnabledShuffles = derived([userStore], ([$userStore]) => {
//   const activeGameId = L4D2_GAME_ID
//   const activeProfileId = $userStore?.activeProfileId

//   const shuffles = []
//   //   $userStore?.games[activeGameId]?.profiles.find(
//   //   (profile) => profile.id === activeProfileId
//   // )?.shuffles

//   const shuffledAddonIds: string[] = []

//   if (!shuffles) return []

//   Object.keys(shuffles).forEach((subCategoryId) => {
//     const shuffle = shuffles[subCategoryId]
//     if (!shuffle.enabled) return
//     console.log(shuffle)
//     shuffle.shuffledAddonIds.forEach((addonId) => {
//       shuffledAddonIds.push(addonId)
//     })
//   })

//   return shuffledAddonIds
// })

export const isDraggingAddon = writable(false)

export const libraryAddonPool = derived(
  [
    currentGameManifest,
    librarySearchQueue,
    libraryActiveSubCategories,
    libraryActiveCategory,
    typeToShow,
    libraryActiveAddons,
    libraryAddonIdsInEnabledShuffles,
    installedAddons,
    addonSource
  ],
  ([
    $currentGameManifest,
    $librarySearchQueue,
    $libraryActiveSubCategories,
    $libraryActiveCategory,
    $typeToShow,
    $libraryActiveAddons,
    $libraryAddonIdsInEnabledShuffles,
    $installedAddons,
    $addonSource
  ]) => {
    const addonIds: string[] = []
    const allFilters = $libraryActiveSubCategories.filter((filter) => filter != '')

    // WTF was i doing here
    Object.keys($currentGameManifest?.addons ?? []).map((addonIndex) => {
      const thisAddon: Addon = $currentGameManifest.addons[addonIndex]

      if (!thisAddon) return
      const addonId = thisAddon.id

      const addonName = thisAddon.addonInfo?.title ?? thisAddon.id
      const addonDescription =
        (thisAddon.addonInfo?.description || thisAddon?.addonInfo?.tagline) ?? ''

      // Make sure the mod's title fits the search term
      if ($librarySearchQueue) {
        const doesNameInclude = addonName.toLowerCase().includes($librarySearchQueue.toLowerCase())
        const doesDescriptionInclude = addonDescription
          .toLowerCase()
          .includes($librarySearchQueue.toLowerCase())

        if (!doesNameInclude && !doesDescriptionInclude) return
      }

      const thisModCategories = $currentGameManifest.addonCategories.categories[addonId] ?? []

      // Filter out uninstalled mods if the filter isn't enabled
      if ($typeToShow !== 'uninstalled') {
        if (!$installedAddons.includes(addonId)) return
      }

      switch ($addonSource) {
        case 'workshop':
          if (!thisAddon.workshop?.publishedFileId) return
          break
        case 'local':
          if (thisAddon.workshop?.publishedFileId) return
          break
        default:
          break
      }

      // Check for mod type
      switch ($typeToShow) {
        case 'any':
          break
        case 'enabled':
          if (!$libraryActiveAddons.includes(addonId)) return
          break
        case 'shuffled':
          if (!$libraryAddonIdsInEnabledShuffles.includes(addonId)) return
          break
        case 'enabled/shuffled':
          if (
            !$libraryActiveAddons.includes(addonId) &&
            !$libraryAddonIdsInEnabledShuffles.includes(addonId)
          )
            return
          break
        case 'disabled':
          if (
            $libraryActiveAddons.includes(addonId) ||
            $libraryAddonIdsInEnabledShuffles.includes(addonId)
          )
            return
          break
        case 'uninstalled':
          if ($installedAddons.includes(addonId)) return
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
      const addon = $currentGameManifest.addons.find((addon) => addon.id == addonId)
      return addon
    }

    if ($sortingType == ('name_asc' as SortingType)) {
      tempStorage = tempStorage.sort((a: AddonId, b: AddonId) => {
        let aTitle = getAddonDetails(a)?.addonInfo?.title ?? '-'
        let bTitle = getAddonDetails(b)?.addonInfo?.title ?? '-'

        return aTitle.localeCompare(bTitle)
      })
    }

    if ($sortingType == ('name_desc' as SortingType)) {
      tempStorage = tempStorage.sort((a: AddonId, b: AddonId) => {
        let aTitle = getAddonDetails(a)?.addonInfo?.title ?? '-'
        let bTitle = getAddonDetails(b)?.addonInfo?.title ?? '-'

        return bTitle.localeCompare(aTitle)
      })
    }

    if ($sortingType == 'time_oldest') {
      tempStorage = tempStorage.sort(
        (a: AddonId, b: AddonId) =>
          Date.parse(getAddonDetails(a)?.vpkTimeLastModified) -
          Date.parse(getAddonDetails(b)?.vpkTimeLastModified)
      )
    }

    if ($sortingType == 'time_newest') {
      tempStorage = tempStorage.sort(
        (a: AddonId, b: AddonId) =>
          Date.parse(getAddonDetails(b)?.vpkTimeLastModified) -
          Date.parse(getAddonDetails(a)?.vpkTimeLastModified)
      )
    }

    if ($sortingType == 'size_smallest') {
      tempStorage = tempStorage.sort(
        (a: AddonId, b: AddonId) =>
          (getAddonDetails(a).vpkSizeInBytes ?? 0) - (getAddonDetails(b).vpkSizeInBytes ?? 0)
      )
    }

    if ($sortingType == 'size_biggest') {
      tempStorage = tempStorage.sort(
        (a: AddonId, b: AddonId) =>
          (getAddonDetails(b).vpkSizeInBytes ?? 0) - (getAddonDetails(a).vpkSizeInBytes ?? 0)
      )
    }

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
