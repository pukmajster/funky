import type { AddonId, CategoryShuffle, GameManifest, Profile } from 'shared'
import games from 'shared/games'
import { get } from 'svelte/store'
import { derviedAddonIdsInEnabledShuffles } from '../stores/library'
import { currentGameManifest } from '../stores/manifest'
import { userStore } from '../stores/user'

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

    const randomIndex = Math.floor(Math.random() * shuffle.shuffledAddonIds.length) + 1
    const randomMod = shuffle.shuffledAddonIds[randomIndex]

    // +1 so it always picks a mod, otherwise there's a chance no mod will be picked at all.
    // TODO: that could be a feature?
    randomMods.push(randomMod)
  })

  // Merge the two arrays
  const mergedEnabledMods = [...enabledMods, ...randomMods]

  // Loop through all the mods in the manifest
  for (const mod in manifest.addons) {
    const modId = manifest.addons[mod].id
    const enabled = mergedEnabledMods.includes(modId) ? '1' : '0'

    if (manifest.addons[mod].fromWorkshop)
      outputVdfString += `\t"workshop\\${modId}.vpk"\t\t\t"${enabled}"\n`
    else outputVdfString += `\t"${modId}.vpk"\t\t\t"${enabled}"\n`
  }

  outputVdfString += '}'

  console.log(steamGamesDir, gameDir)

  await window.api.writeAddonList({
    steamGamesDir,
    gameDir: addonListDir,
    data: outputVdfString
  })
}
