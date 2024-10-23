export async function getTranslations(locale: string) {
  const localeFile = (await import(`../../i18n/${locale}.json`)).default
  console.log(localeFile)
  return localeFile
}
