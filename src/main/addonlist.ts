import * as fs from 'fs'
import { WriteAddonlistParams, ReadAddonlistParams } from 'shared'
import type {  AddonId } from 'shared'
import path from 'path'

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
export async function readAddonList(params: ReadAddonlistParams): Promise<string[] | string> {

  console.log('Reading addonlist.txt')
  const dir = path.join(params.steamGamesDir, 'common', params.gameDir, '/addonlist.txt')
  console.log(dir)

  try {
    const addonlist = await fs.promises.readFile(dir, 'utf-8')
    console.log('File succesfully read')

    // Regex to match .vpk files installed from addonlist.txt 
    const regex = /"([^"]+\.vpk)"\s+"(\d)"/g

    //rebundant variable that might be useful for future use
    // const result: { txtAddonID: string; txtEnabled: boolean }[] = []

    //Store AddonIds that are active in the addonlist
    const txtActiveAddon: AddonId[] = []

    // Loop through all matches with regex sorcery
    let match
    while ((match = regex.exec(addonlist)) !== null) {
      // Workshop files have a double backward slash replace them to single forward slash
      // This is needed to be done because by some reason regex returns double backward slashes

      const txtFoundAddonID: string = match[1].replace(/\\/g, '/')
      const txtFoundEnabled: boolean = parseInt(match[2], 2) === 1

      if (txtFoundEnabled) {
        // Add to enabled addons array that were found in the text file
        txtActiveAddon.push(txtFoundAddonID);
      }
    }

    return txtActiveAddon
  } catch (error){
    console.error(error);
    // Send empty array, to avoid getting softlocked in case of an error
    return []
  }
}
