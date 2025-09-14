import { writable } from 'svelte/store'

export type FullscreenMenuType = 'playlists-manager' | undefined

export const fullscreenMenuStore = writable<FullscreenMenuType>(undefined)
