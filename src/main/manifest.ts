const VPK = require('vpk')
import { app } from 'electron'
import * as fs from 'fs'
const path = require('path')
const fsp = fs.promises
const vdf = require('node-vdf')

import { Addon, AddonFiles, AddonInfo, Game, GameManifest, RequestGameManifestParams } from 'shared'
import games from 'shared/games'

// interface BuildGameManifestParams {
//   appId: number
//   gamesDir: string
//   mode: 'fresh' | 'cached' | 'quick-update' | 'full-update'
//   onlineMetadataFetching: boolean
//   existingManifest?: GameManifest
// }

async function buildGameManifest(params: RequestGameManifestParams): Promise<GameManifest | void> {
  const addons: Addon[] = []
  const game = games[params.appId]
  const addonCategories: GameManifest['addonCategories'] = {
    version: 1,
    categories: {}
  }

  if (!game) {
    console.log('game not found')
    return
  }

  const baseGameDirectory = path.join(params.steamGamesDir, 'common', game.rootDirectoryName)

  const fullAddonDirectories = game.addons.addonFoldes.map((addonFolder) =>
    path.join(baseGameDirectory, addonFolder)
  )

  const manifestFileName = path.join(app.getPath('userData'), `${params.appId}_manifest.json`)

  try {
    const modDirs: string[] = []
    let files = await fsp.readdir(fullAddonDirectories[2])
    files = files.filter((file) => file.endsWith('.vpk'))

    const workshopAddonIdsWithMissingAddonInfo: string[] = []

    for (const file of files) {
      const vpkId = file.split('.')[0]
      const vpkFiles: AddonFiles = []
      const vpkPath = path.join(fullAddonDirectories[2], file)
      const vpkStats = await fsp.stat(vpkPath)
      const vpkAddonInfo: AddonInfo = {}

      modDirs.push(vpkPath)
      //console.log('vpkPath', vpkPath)

      // Load vpk
      const vpk = new VPK(vpkPath)
      vpk.load()

      // Get all files
      for (const includedFile of vpk.files) {
        if (includedFile.includes('addoninfo.txt')) continue
        if (includedFile.includes('addonimage.jpg')) continue
        vpkFiles.push(includedFile)
      }

      // Get addon info
      try {
        const addoninfoFile = vpk.getFile('addoninfo.txt')
        if (!addoninfoFile) {
          throw new Error('Missing addoninfo.txt')
        }

        const addoninfo = addoninfoFile.toString('utf-8')
        const cleanedUpAddonInfo = addoninfo.replace(/^\/\/.*$/gm, '')

        // Read the file buffer and turn it into a string our VDF parser can read
        const addoninfoData = vdf.parse(cleanedUpAddonInfo)?.AddonInfo

        if (!addoninfoData) {
          throw new Error('Missing AddonInfo object in addoninfo.txt')
        }

        // Take a look at the addoninfo.txt file and see what useful information we can snatch
        vpkAddonInfo.title = addoninfoData.addontitle || ''
        vpkAddonInfo.description = addoninfoData.addondescription || ''
        vpkAddonInfo.version = addoninfoData.addonversion || ''
        vpkAddonInfo.author = addoninfoData.addonauthor || ''
        vpkAddonInfo.tagline = addoninfoData.addontagline || ''
        vpkAddonInfo.url = addoninfoData.addonurl0 || ''
      } catch (e) {
        workshopAddonIdsWithMissingAddonInfo.push(vpkId)
        console.log('failed to read vpk addoninfo.txt')
      }

      const addonData: Addon = {
        id: vpkId,
        addonInfo: vpkAddonInfo,
        files: vpkFiles,
        vpkTimeLastModified: vpkStats.mtime,
        vpkSizeInBytes: vpkStats.size,
        vpkHash: '',
        fromWorkshop: true,
        workshopId: 0
      }

      addonCategories.categories[vpkId] = categorizeVpk(game, vpkFiles)

      addons.push(addonData)
    }

    console.log(`${workshopAddonIdsWithMissingAddonInfo.length} addons missing addoninfo.txt`)
    console.log(workshopAddonIdsWithMissingAddonInfo)

    // Fetch addon info from Steam API
    if (params.onlineMetadataFetching) {
      const fd = new FormData()
      let i = 0
      fd.append('itemcount', `${workshopAddonIdsWithMissingAddonInfo.length}`)
      for (const id of workshopAddonIdsWithMissingAddonInfo) {
        fd.append(`publishedfileids[${i}]`, id)
        i++
      }

      console.log('Fetching mod titles from Steam Workshop...')

      try {
        const res = await fetch(
          'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1',
          {
            body: fd,
            method: 'POST'
          }
        )
        const data: IOnlineAddoninfoResponse = await res.json()

        console.log(JSON.stringify(data, null, 2))

        for (const publishedFile of data.response.publishedfiledetails) {
          const id = publishedFile.publishedfileid.toString()
          if (workshopAddonIdsWithMissingAddonInfo.includes(id)) {
            let addonToModify = addons.find((addon) => addon.id === id)
            if (!addonToModify) continue
            addonToModify.addonInfo = {
              title: publishedFile.title,
              description: publishedFile.description,
              onlineThumbnail: publishedFile.preview_url
            }
          }
        }

        console.log('Successfully retrieved online mod info')
      } catch (e) {
        console.log(e as Error)
        console.log('failed to retrieve online mod info')
      }
    } else {
      console.log('No missing mod titles to fetch')
    }

    const manifest: GameManifest = {
      manifestMetadata: {
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      appId: params.appId,
      addons,

      addonCategories
    }

    await fs.promises.writeFile(manifestFileName, JSON.stringify(manifest, null, 2))

    return manifest
  } catch (err) {
    console.log('error reading mods from dir')
  }
}

export async function requestGameManifest(
  params: RequestGameManifestParams
): Promise<GameManifest | undefined> {
  console.log('requestGameManifest', params)

  if (params.mode === 'cached') {
    console.log('reading cached manifest')

    const manifestFileName = path.join(app.getPath('userData'), `${params.appId}_manifest.json`)

    try {
      const manifest = await fs.promises.readFile(manifestFileName, 'utf-8')
      return JSON.parse(manifest)
    } catch (err) {
      console.log('error reading cached manifest')
    }
  }

  if (params.mode === 'full-update') {
    let manifest = await buildGameManifest(params)
    return manifest ?? undefined
  }

  return undefined
}

// Categorize a VPK file based on its contents and return the categories it belongs as defined in the Game to as an array
function categorizeVpk(game: Game, vpkFiles: AddonFiles): string[] {
  const categories: string[] = []

  for (const category of game.addons.categories) {
    for (const subCategory of category.subCategories) {
      for (const file of vpkFiles) {
        if (subCategory.matches.files.includes(file)) {
          categories.push(subCategory.id)
          categories.push(category.id)
        }
      }

      for (const reference of subCategory.matches.references) {
        for (const file of vpkFiles) {
          if (file.includes(reference)) {
            categories.push(subCategory.id)
            categories.push(category.id)
          }
        }
      }
    }
  }

  // Remove duplicates
  return [...new Set(categories)]
}

// -----------------------------------------------
// Online addon data fetching
// -----------------------------------------------

export interface IPublishedFileDetails {
  publishedfileid: string
  creator?: string
  filename?: string
  file_size?: string
  title: string
  description?: string
  tags?: IPublishedFileDetailsTag[]
  preview_url?: string
}

export interface IPublishedFileDetailsTag {
  tag: string
}

export interface IOnlineAddoninfoResponse {
  response: {
    result: number
    resultcount: number
    publishedfiledetails: IPublishedFileDetails[]
  }
}
