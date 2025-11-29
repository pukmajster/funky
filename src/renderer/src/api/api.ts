import type { AddonId, ExportVpkOptions, GameManifest } from 'shared'
import { get } from 'svelte/store'
import {
  isUnsubscribeOngoing,
  unsubscribeQueue,
  unsubscribedItemsThisSession
} from '../stores/library'
import { currentGameManifest, requestManifest } from '../stores/manifest'
import { userStore } from '../stores/user'
import SteamWebApi from '../steam-web-api'
import { toastStore } from '@skeletonlabs/skeleton'
import { L4D2_GAME_ID } from '../utils'
import { activeProfileStore } from '../stores/active-profile'
import games from 'shared/games'
import { db } from '../db/db'
import { createStartup } from '../features/startups/actions'

export async function writeAddonList(): Promise<void> {
  // Collect meta-data
  const { steamGamesDir, priorityLoad } = get(userStore)
  const manifest: GameManifest = get(currentGameManifest)
  const game = games[L4D2_GAME_ID]
  const addonListDir = `${game.rootDirectoryName}/${game.gameDirectory}`

  // Collect the enabled and shuffled mods we'll be working with
  const activeProfile = get(activeProfileStore)
  const { enabledAddonIds, enabledShuffleIds } = activeProfile
  const enabledShuffles = await db.shuffles.where('id').anyOf(enabledShuffleIds).toArray()

  // TODO: ignore enabled mods if they appear in shuffles?
  //enabledMods = enabledMods.filter((mod) => !allAddonIdsInShuffles.includes(mod))

  const randomlyShuffledMods: string[] = []

  // Choose a random mod from each shuffled subcategory
  enabledShuffles.forEach((shuffle) => {
    const randomIndex = Math.floor(Math.random() * shuffle.shuffledAddonIds.length)
    const randomMod = shuffle.shuffledAddonIds[randomIndex]
    randomlyShuffledMods.push(randomMod)
  })

  // Merge the two arrays
  const mergedEnabledMods = [...enabledAddonIds, ...randomlyShuffledMods]
  console.log('mergedEnabledMods', mergedEnabledMods)

  // Write the addonlist.txt file by looping through all the mods in the manifest
  let outputVdfString = `"AddonList"\n{\n`

  // First write mods that are listed in priority load, in the order they appear in the list
  for (const priorityModId of priorityLoad) {
    const enabled = mergedEnabledMods.includes(priorityModId) ? '1' : '0'
    const modIdForAddonlist = priorityModId.replaceAll('/', '\\')
    outputVdfString += `\t"${modIdForAddonlist}"\t\t\t"${enabled}"\n`
  }

  // Then write the rest of the non-priority mods
  for (const mod in manifest.addons) {
    const modId = manifest.addons[mod].id

    // Skip any mods that are already in the priority list
    if (priorityLoad.includes(modId)) {
      continue
    }

    const enabled = mergedEnabledMods.includes(modId) ? '1' : '0'
    const modIdForAddonlist = modId.replaceAll('/', '\\')
    outputVdfString += `\t"${modIdForAddonlist}"\t\t\t"${enabled}"\n`
  }

  // Finalise the output and close the KeyValue block
  outputVdfString += '}'

  // Update the actual file
  await window.api.writeAddonList({
    steamGamesDir,
    gameDir: addonListDir,
    data: outputVdfString
  })

  createStartup({
    enabledModIds: mergedEnabledMods,
    playlistId: activeProfile.id
  })
}

export async function readAddonList() {
  const user = get(userStore)

  const enabledAddonIds = await window.api.readAddonList({
    steamGamesDir: user.steamGamesDir,
    gameDir: `${games[550].rootDirectoryName}/${games[550].gameDirectory}`
  })
  try {
    // Update DB with the addonlist
    activeProfileStore.addonListEnabled(enabledAddonIds)

    toastStore.trigger({
      background: 'variant-filled-success',
      message: 'Mods successfully imported!'
    })
  } catch (error) {
    console.error('Failed to read addon list:', error)

    toastStore.trigger({
      background: 'variant-filled-error',
      message: 'Failed to import mods...'
    })
  }
}
export async function extractVpk(params: ExportVpkOptions) {
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
  const length = addonIds.length

  try {
    await window.api.uninstallAddons({
      steamGamesDir: get(userStore).steamGamesDir,
      addonIds: addonIds,
      appId: L4D2_GAME_ID
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

export async function deleteProfile(id: number) {
  activeProfileStore.deleteProfile(id)
  // After a succesful delete, change to default profile
  userStore.setActiveProfileId(1)
}

export function getAppMeta() {
  return window.api.appMeta()
}
