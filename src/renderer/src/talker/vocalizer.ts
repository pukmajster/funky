type RadialMenuPosition =
  | 'North'
  | 'NorthWest'
  | 'West'
  | 'SouthWest'
  | 'South'
  | 'SouthEast'
  | 'East'
  | 'NorthEast'
  | 'Center'

type RadialMenuWheel = {
  [key in RadialMenuPosition]: {
    Command: string
    Text: string
  }
}

interface RadialMenu {
  RadialMenu: {
    [key: string]: RadialMenuWheel
  }
}
