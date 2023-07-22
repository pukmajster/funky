export function arraysShareValues<T>(array1: T[], array2: T[]): boolean {
  return array1.filter((element) => array2.includes(element)).length > 0
}

export function trimString(string: string, length: number): string {
  return string.length > length ? string.substring(0, length) + '...' : string
}
