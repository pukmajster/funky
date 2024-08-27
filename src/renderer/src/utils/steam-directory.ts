const validSteamGameDirEndings = [
  // Unix / Darwin
  '/steamapps',
  '/steamapps/',

  // Windows
  '\\steamapps',
  '\\steamapps\\'
]

export function isDirValidSteamGamesDir(dir: string): boolean {
  return validSteamGameDirEndings.some((ending) => dir.toLowerCase().endsWith(ending))
}
