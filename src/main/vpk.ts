import { VPK } from 'vpk'
import { AddonId, ExportVpkOptions, Game, UninstallAddonsParams } from 'shared'
import games from 'shared/games'
import path from 'path'
import * as fs from 'fs'
import { manifestMarkUninstalledAddons } from './manifest'

export async function extractVpk({ vpkPath, extractPath }: ExportVpkOptions) {
  try {
    console.log(`Extracting ${vpkPath} to ${extractPath}`)

    const targetVpk = new VPK(vpkPath)
    targetVpk.load()
    await targetVpk.extract(extractPath)
  } catch (err) {
    console.error(err)
    throw new Error("Couldn't extract vpk")
  }
}

export async function uninstallAddons({ steamGamesDir, addonIds, appId }: UninstallAddonsParams) {
  // TODO: delete addonimages?
  const game = games[appId]

  // Keep track of all successfully deleted addons so we can appropriately update the manifest
  const succesfullyDeletedAddons: AddonId[] = []

  function makeDirForAddon(addonId: AddonId) {
    return path.join(steamGamesDir, game.rootDirectoryName, game.gameDirectory, 'addons', addonId)
  }

  for (const addonId of addonIds) {
    const addonDir = makeDirForAddon(addonId)

    // Validate we're deleting a .vpk from the steamapps directory
    if (!(addonDir.includes('steamapps/common') && addonDir.endsWith('.vpk'))) {
      console.error('only deleting vpk files from steamapps/common is allowed')
    }

    // Delete the addon
    try {
      // Attempt to delete the addon
      await fs.promises.rm(addonDir)

      // If successful, add the addon to the list of successfully deleted addons
      succesfullyDeletedAddons.push(addonId)
    } catch (err) {
      console.error(err)
    }
  }

  // Update the manifest to get rid of the addons we just deleted
  // Just hope this doesn't fail
  await manifestMarkUninstalledAddons({ addonIds: succesfullyDeletedAddons, appId })

  return succesfullyDeletedAddons
}
