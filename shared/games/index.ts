import type { Game } from '../game'
import { game500 } from './500'
import { game550 } from './550'

const games: Record<number, Game> = {
  550: game550,
  500: game500
}

export default games
