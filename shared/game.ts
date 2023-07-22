export interface Game {
  appId: number
  label: string
  rootDirectoryName: string
  gameDirectory: string

  addons: {
    addonFoldes: string[]
    supportsWorkshop: boolean
    categories: CategoryDefinition[]
  }
}

export interface CategoryDefinition {
  id: string
  label: string
  imageUrl?: string

  subCategories: SubCategoryDefinition[]
}

export interface SubCategoryDefinition {
  id: string
  label: string

  allowSingleAddonRandomization?: boolean

  matches: {
    files: string[]
    references: string[]
  }
}
