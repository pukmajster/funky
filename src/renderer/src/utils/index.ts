export function arraysShareValues<T>(array1: T[], array2: T[]): boolean {
  return array1.filter((element) => array2.includes(element)).length > 0
}

export function findRepeatedValues<T>(...arrays: T[][]): T[] {
  const elementCount: Map<T, number> = new Map()

  // Count occurrences of each element across all arrays
  arrays.forEach((array) => {
    array.forEach((item) => {
      elementCount.set(item, (elementCount.get(item) || 0) + 1)
    })
  })

  // Filter elements that appear more than once
  return Array.from(elementCount)
    .filter(([, count]) => count > 1)
    .map(([item]) => item)
}

export function trimString(string: string, length: number): string {
  return string.length > length ? string.substring(0, length) + '...' : string
}

export function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max))
}

export const L4D2_GAME_ID = 550
