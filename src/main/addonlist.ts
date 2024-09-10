import * as fs from 'fs'
import { WriteAddonlistParams, ReadAddonlistParams } from 'shared'
import { libraryActiveAddons } from '../renderer/src/stores/library'
import type { Addon, AddonId } from 'shared'
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
export async function readAddonList(params: ReadAddonlistParams): Promise<JSON> {
  console.log('Reading addonlist.txt')

  const dir = path.join(params.steamGamesDir, 'common', params.gameDir, '/addonlist.txt')
  console.log(dir)

  try {
    const addonlist = await fs.promises.readFile(dir, 'utf-8')
    console.log('File succesfully read')
    console.log(addonlist)

    // Regex to match workshop IDs and their enabled status
    const regex = /workshop\\(\d+)\.vpk"\s+"(\d)"/g

    let match
    const result: { AddonID: string; Enabled: boolean }[] = [];
    const resultActive: AddonId[] = [];
    // Loop through all matches
    while ((match = regex.exec(addonlist)) !== null) {
      const addonID:string = match[1]
      const enabled:boolean = parseInt(match[2], 2) === 1

      // resultActive.push({
      //   id: addonID
      // });
      result.push({
        AddonID: addonID,
        Enabled: enabled
      })

    }

    return JSON.parse(JSON.stringify(result, null, 2));
  } catch {
    console.log("An error happened");
    return JSON.parse("An error happened");
  }
}
