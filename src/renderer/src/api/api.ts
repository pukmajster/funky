import type { AddonId, CategoryShuffle, ExportVpkOptions, GameManifest, Profile } from 'shared'
import games from 'shared/games'
import { get } from 'svelte/store'
import {
  derviedAddonIdsInEnabledShuffles,
  isUnsubscribeOngoing,
  unsubscribeQueue,
  unsubscribedItemsThisSession
} from '../stores/library'
import { currentGameManifest, requestManifest } from '../stores/manifest'
import { userStore } from '../stores/user'
import SteamWebApi from '../steam-web-api'
import { modalStore, toastStore } from '@skeletonlabs/skeleton'

export async function writeAddonList(): Promise<void> {
  const workingUserStore = get(userStore)
  const allAddonIdsInShuffles = get(derviedAddonIdsInEnabledShuffles)
  const { activeGameId } = workingUserStore

  const workingProfile = workingUserStore.games[workingUserStore.activeGameId]?.profiles.find(
    (profile) =>
      profile.id === workingUserStore.games[workingUserStore.activeGameId]?.activeProfileId
  ) as Profile
  if (!workingProfile) return

  const { steamGamesDir } = workingUserStore
  const manifest: GameManifest = get(currentGameManifest)

  const gameDir = games[activeGameId]
  const profile = workingProfile

  const game = games[activeGameId]

  const addonListDir = `${game.rootDirectoryName}/${game.gameDirectory}`

  let outputVdfString = `"AddonList"\n{\n`

  // Get all the fixed-enabled mods
  let enabledMods = profile.enabledAddonIds

  // Remove any mods from enabledMods if they appear in allAddonIdsInShuffles
  enabledMods = enabledMods.filter((mod) => !allAddonIdsInShuffles.includes(mod))

  // choose a randon mod from each shuffled subcategory
  let randomMods: AddonId[] = []

  Object.keys(profile.shuffles).forEach((category) => {
    const shuffle: CategoryShuffle = profile.shuffles[category]

    if (!shuffle.enabled) return

    const randomIndex = Math.floor(Math.random() * shuffle.shuffledAddonIds.length)
    const randomMod = shuffle.shuffledAddonIds[randomIndex]

    // +1 so it always picks a mod, otherwise there's a chance no mod will be picked at all.
    // TODO: that could be a feature?
    randomMods.push(randomMod)
  })

  // Merge the two arrays
  const mergedEnabledMods = [...enabledMods, ...randomMods]

  // Loop through all the mods in the manifest
  for (const mod in manifest.addons) {
    const modId = manifest.addons[mod].id.replaceAll('/', '\\')
    const enabled = mergedEnabledMods.includes(modId) ? '1' : '0'

    outputVdfString += `\t"${modId}"\t\t\t"${enabled}"\n`
  }

  outputVdfString += '}'

  console.log(steamGamesDir, gameDir)

  await window.api.writeAddonList({
    steamGamesDir,
    gameDir: addonListDir,
    data: outputVdfString
  })
}

export async function extractVpk(params: ExportVpkOptions) {
  // Extract the vpk
  window.api.extractVpk(params)
}

export async function unsubscribeFromMods(addonIds: AddonId[]) {
  isUnsubscribeOngoing.set(true)
  unsubscribeQueue.set(addonIds)

  try {
    await SteamWebApi.unsubscribeFromPublishedItems(addonIds)
    toastStore.trigger({
      background: 'variant-filled-success',
      message: 'Successfully unsubscribed from all selected mods'
    })
    unsubscribedItemsThisSession.set([...get(unsubscribedItemsThisSession), ...addonIds])
  } catch (error) {
    toastStore.trigger({
      background: 'variant-filled-error',
      message: 'Failed to unsubscribe from all selected mods'
    })
  } finally {
    isUnsubscribeOngoing.set(false)
    unsubscribeQueue.set([])
  }
}

export async function uninstallMods(addonIds: AddonId[]) {
  const { activeGameId } = get(userStore)
  const game = games[activeGameId]
  const length = addonIds.length

  try {
    await window.api.uninstallAddons({
      steamGamesDir: get(userStore).steamGamesDir,
      addonIds: addonIds,
      appId: game.appId
    })

    toastStore.trigger({
      background: 'variant-filled-success',
      message: `Successfully uninstalled ${length} mod/s`
    })

    try {
      requestManifest('cached')
    } catch (error) {
      console.error(error)
    }
  } catch {
    toastStore.trigger({
      background: 'variant-filled-error',
      message: `Failed to uninstall ${length} mod/s`
    })
  }
}
