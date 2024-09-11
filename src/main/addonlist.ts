import * as fs from 'fs'
import { WriteAddonlistParams, ReadAddonlistParams } from 'shared'
import { libraryActiveAddons } from '../renderer/src/stores/library'
import type { Addon, AddonId } from 'shared'
import { get } from 'svelte/store'
// Example usage

const path = require('path')

export async function writeAddonList(params: WriteAddonlistParams): Promise<boolean> {
  console.log('Writing addonlist.txt to disk...')

  const dir = path.join(params.steamGamesDir, 'common', params.gameDir, '/addonlist.txt')
  console.log(dir)

  try {
    fs.promises.writeFile(dir, params.data)
    console.log('File succesfully saved to disk.')

    return true
  } catch {
    return false
  }
}
export async function readAddonList(params: ReadAddonlistParams): Promise<any | string> {
  console.log('Reading addonlist.txt')

  const dir = path.join(params.steamGamesDir, 'common', params.gameDir, '/addonlist.txt')
  console.log(dir)

  try {
    const addonlist = await fs.promises.readFile(dir, 'utf-8')
    console.log('File succesfully read')

    // Regex to match workshop IDs and their enabled status
    const regex = /workshop\\(\d+)\.vpk"\s+"(\d)"/g

    let match
    const result: { txtAddonID: string; txtEnabled: boolean }[] = []
    const resultActive: AddonId[] = []
    // Loop through all matches
    while ((match = regex.exec(addonlist)) !== null) {
      const txtFoundAddonID: string = match[1]
      const txtFoundEnabled: boolean = parseInt(match[2], 2) === 1

      result.push({
        txtAddonID: txtFoundAddonID,
        txtEnabled: txtFoundEnabled
      })
      if (txtFoundEnabled) {
        resultActive.push(txtFoundAddonID)
      }
    }

    return resultActive
  } catch {
    return 'An error happened'
  }
}
