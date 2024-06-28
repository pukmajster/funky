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

const SteamWebApi = {
  unsubscribeFromPublishedItem,
  unsubscribeFromPublishedItems
}

export default SteamWebApi
