const validSteamGameDirEndings = [
  // Unix / Darwin
  'Steam/steamapps',
  'Steam/steamapps/',

  // Windows
  'Steam\\steamapps',
  'Steam\\steamapps\\'
]

export function isDirValidSteamGamesDir(dir: string): boolean {
  return validSteamGameDirEndings.some((ending) => dir.endsWith(ending))
}
