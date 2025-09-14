import { writable } from 'svelte/store'

export type FullscreenMenuType = 'playlists-manager' | 'library-filters' | undefined

export const fullscreenMenuStore = writable<FullscreenMenuType>(undefined)
