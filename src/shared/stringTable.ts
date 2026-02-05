/**
 * Mutable string table
 */
export class CStringTable {
  private strToId = new Map<string, number>()
  private idToStr: string[] = []

  constructor(initial?: string[]) {
    if (initial) {
      for (const str of initial) {
        this.add(str)
      }
    }
  }

  /** Add a string if not present, return its ID */
  add(str: string): number {
    let id = this.strToId.get(str)
    if (id !== undefined) return id

    id = this.idToStr.length
    this.idToStr.push(str)
    this.strToId.set(str, id)
    return id
  }

  /** Add multiple strings if not present, return their IDs */
  addMany(strings: string[]): number[] {
    const ids: number[] = []
    for (const str of strings) {
      ids.push(this.add(str))
    }
    return ids
  }

  /** Get ID of a string */
  getId(str: string): number | undefined {
    return this.strToId.get(str)
  }

  /** Get IDs of multiple strings */
  getIds(strings: string[]): number[] {
    const ids: number[] = []
    for (const str of strings) {
      const id = this.getId(str)
      if (id !== undefined) ids.push(id)
    }
    return ids
  }

  /** Get string by ID */
  getString(id: number): string {
    const str = this.idToStr[id]
    if (str === undefined) {
      throw new Error(`Invalid string ID: ${id}`)
    }
    return str
  }

  /** Get strings by IDs */
  getStrings(ids: number[]): string[] {
    const strings: string[] = []
    for (const id of ids) {
      const str = this.getString(id)
      strings.push(str)
    }
    return strings
  }

  /** Number of unique strings */
  get size(): number {
    return this.idToStr.length
  }

  /** Export for JSON serialization */
  toJSON(): string[] {
    return this.idToStr
  }

  /** Build from serialized JSON */
  static fromJSON(data: string[]): CStringTable {
    return new CStringTable(data)
  }
}

export type StringTableId = number
export type StringTableString = string
export type StringTableIds = number[]
export type StringTableStrings = string[]
