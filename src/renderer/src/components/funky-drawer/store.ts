import { writable } from 'svelte/store'

export type FunkyDrawerType = 'playlists-manager' | 'library-filters' | undefined
export const funkyDrawerStore = writable<FunkyDrawerType>(undefined)
