import * as fs from 'fs'
import { WriteAddonlistParams } from 'shared'
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
