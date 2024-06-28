import path from 'path'
import { Game } from 'shared'
import games from 'shared/games'

export function makeAddonsDir(steamGamesDir: string, appId: number) {
  const game: Game = games[appId]
  return path.join(steamGamesDir, 'common', game.rootDirectoryName)
}
