import { fullscreenMenuStore } from '../../../components/fullscreen-menu/store'
import type { SortingType, TypeOfMod, AddonSource } from '../../../stores/library'

export function getSortingLabel(value: SortingType) {
  return {
    name_asc: 'Name (Ascending)',
    name_desc: 'Name (Descending)',
    time_newest: 'Time Modified (Latest)',
    time_oldest: 'Time Modified (Oldest)',
    size_biggest: 'Size (Largest)',
    size_smallest: 'Size (Smallest)'
  }[value]
}

export function getTypeToShowLabel(value: TypeOfMod) {
  return {
    any: 'Any',
    enabled: 'Enabled',
    shuffled: 'Shuffled',
    'enabled/shuffled': 'Enabled or shuffled',
    disabled: 'Disabled',
    uninstalled: 'Uninstalled'
  }[value]
}

export function getAddonSourceLabel(value: AddonSource) {
  return {
    local: 'Local',
    workshop: 'Workshop',
    all: 'All'
  }[value]
}

export function openFiltersMenu() {
  fullscreenMenuStore.set('library-filters')
}
