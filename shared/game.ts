export interface Game {
  appId: number
  label: string
  rootDirectoryName: string
  gameDirectory: string
  gameLogo?: string

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
  image?: string

  subCategories: SubCategoryDefinition[]
}

export interface SubCategoryDefinition {
  id: string
  label: string

  hidden?: boolean
  allowSingleAddonRandomization?: boolean

  matches: {
    files: string[]
    references: string[]
  }
}
