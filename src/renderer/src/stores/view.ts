import { writable } from 'svelte/store'

export const view = writable<
  'mods' | 'conflicts' | 'shuffles' | 'autoexec' | 'vocalizer' | 'tools' | 'i18nTest'
>('mods')
