import type { Addon } from 'shared'
import { derived, writable } from 'svelte/store'
import { arraysShareValues } from '../utils'
import { libraryActiveAddons } from './library'
import { currentGameManifest } from './manifest'

export const showingConflictingAddons = writable(false)

export function filterTopLevelFiles(files: string[]) {
  return files.filter((file) => file.includes('/'))
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
        // Remove common files from the list
        const groupFiles = filterTopLevelFiles(group[0]?.files ?? [])
        const addonFiles = filterTopLevelFiles(files)

        //const groupFiles = group[0]?.files.filter((file) => !commonFiles.includes(file)) ?? []
        //const addonFiles = files.filter((file) => !commonFiles.includes(file))

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
