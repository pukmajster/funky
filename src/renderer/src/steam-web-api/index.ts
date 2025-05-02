import { get } from 'svelte/store'
import { userStore } from '../stores/user'

// Documentation:
// https://steamapi.xpaw.me/#IPublishedFileService/Unsubscribe
//
// Shoutout to https://github.com/Nexus-Mods/NexusMods.App/issues/324

async function unsubscribeFromPublishedItem(publishedFileId: string) {
  const key = get(userStore).steamWebApiKey
  if (!key) throw new Error('No Steam Web API key')

  const fd = new FormData()
  fd.append('key', key)
  fd.append('publishedfileid', publishedFileId)
  fd.append('list_type', '1')
  fd.append('notify_client', '1')

  let url = 'https://api.steampowered.com/IPublishedFileService/Unsubscribe/v1/'
  await fetch(url, {
    method: 'POST',
    body: fd
  })
}

async function unsubscribeFromPublishedItems(publishedFileIds: string[]) {
  const key = get(userStore).steamWebApiKey
  if (!key) throw new Error('No Steam Web API key')

  const promises = publishedFileIds.map((publishedFileId) =>
    unsubscribeFromPublishedItem(publishedFileId)
  )
  await Promise.all(promises)
}
// Subscribe to a single published file (download workshop item)
async function subscribeToPublishedItem(publishedFileId: string) {
  const key = get(userStore).steamWebApiKey
  if (!key) throw new Error('No Steam Web API key')

  const fd = new FormData()
  fd.append('key', key)
  fd.append('publishedfileid', publishedFileId)
  fd.append('list_type', '1')
  fd.append('notify_client', '1')

  const url = 'https://api.steampowered.com/IPublishedFileService/Subscribe/v1/'
  await fetch(url, {
    method: 'POST',
    body: fd
  })
}

// Subscribe to multiple published files
async function subscribeToPublishedItems(publishedFileIds: string[]) {
  const promises = publishedFileIds.map((id) => subscribeToPublishedItem(id))
  await Promise.all(promises)
}

// Get published file IDs from a Steam Workshop Collection
interface ICollectionDetailsResponse {
  response: {
    result: number
    resultcount: number
    collectiondetails: Array<{
      publishedfileid: string
      result: number
      children?: Array<{ publishedfileid: string; sortorder: number }>
    }>
  }
}

async function getCollectionPublishedFileIds(collectionId: string): Promise<string[]> {
  const key = get(userStore).steamWebApiKey
  if (!key) throw new Error('No Steam Web API key')

  const fd = new FormData()
  fd.append('key', key)
  fd.append('collectioncount', '1')
  fd.append('publishedfileids[0]', collectionId)

  const url = 'https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/'
  const res = await fetch(url, {
    method: 'POST',
    body: fd
  })
  const data: ICollectionDetailsResponse = await res.json()
  const details = data.response?.collectiondetails?.[0]
  if (!details || !details.children) {
    return []
  }
  return details.children.map((child) => child.publishedfileid.toString())
}

const SteamWebApi = {
  unsubscribeFromPublishedItem,
  unsubscribeFromPublishedItems,
  subscribeToPublishedItem,
  subscribeToPublishedItems,
  getCollectionPublishedFileIds
}

export default SteamWebApi
