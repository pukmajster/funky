import type { Addon } from 'shared'
import { derived, writable } from 'svelte/store'
import { arraysShareValues } from '../../../utils'
import { libraryActiveAddons } from '../../../stores/library'
import { currentGameManifest } from '../../../stores/manifest'

export const showingConflictingAddons = writable(false)

// These vscript files don't actually override eachother, but instead all get loaded
// alongside eachother, so we just don't consider them as conflicting
// https://developer.valvesoftware.com/wiki/Left_4_Dead_2/Scripting
const vscriptNonConflictingFiles = [
  'scripts/vscripts/mapspawn_addon.nut',
  'scripts/vscripts/response_testbed_addon.nut',
  'scripts/vscripts/scriptedmode_addon.nut',
  'scripts/vscripts/director_base_addon.nut'
]

export function filterNotConflictingFiles(files: string[]) {
  // This filters out all root level files, which are unrelated to the mod itself
  // Then it filters out non-conflicting vscript files
  return files.filter((file) => file.includes('/') && !vscriptNonConflictingFiles.includes(file))
}

// Group enabled mods that share indentical files
export const conflictGroups = derived(
  [libraryActiveAddons, currentGameManifest],
  ([$libraryActiveAddons, $currentGameManifest]) => {
    let tempStorage: Addon[][] = []

    $libraryActiveAddons.map((addonId) => {
      const thisMod = $currentGameManifest?.addons.find((addon) => addon.id === addonId) as Addon
      let foundGroup = false

      tempStorage.map((group) => {
        let files = thisMod?.files ?? []

        // Remove common files from the list
        const groupFiles = filterNotConflictingFiles(group[0]?.files ?? [])
        const addonFiles = filterNotConflictingFiles(files)

        if (arraysShareValues(groupFiles, addonFiles)) {
          group.push(thisMod)
          foundGroup = true
        }
      })

      if (!foundGroup) {
        tempStorage.push([thisMod])
      }
    })

    tempStorage = tempStorage.filter((group) => group.length > 1)

    return tempStorage
  }
)

export const totalConflictingAddons = derived([conflictGroups], ([$conflictGroups]) => {
  let tempStorage = 0

  $conflictGroups.map((group) => {
    tempStorage += group.length
  })

  return tempStorage
})
