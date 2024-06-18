export function arraysShareValues<T>(array1: T[], array2: T[]): boolean {
  return array1.filter((element) => array2.includes(element)).length > 0
}

export function trimString(string: string, length: number): string {
  return string.length > length ? string.substring(0, length) + '...' : string
}

export function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max))
}

export const L4D2_GAME_ID = 550
