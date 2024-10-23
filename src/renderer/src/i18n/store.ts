import { writable } from 'svelte/store'

export const selectedLocale = writable('en')
export const translations = writable<Record<string, string>>({})

export async function selectLanguage(locale: string) {
  const fetchedTranslations = await window.api.getTranslations(locale)
  selectedLocale.set(locale)
  translations.set(fetchedTranslations)
}
