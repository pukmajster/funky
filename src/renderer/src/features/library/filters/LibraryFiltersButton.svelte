<script lang="ts">
  import { sortingType, typeToShow, addonSource } from '../../../stores/library'
  import {
    openFiltersMenu,
    getSortingLabel,
    getTypeToShowLabel,
    getAddonSourceLabel
  } from './utils'
</script>

<button on:click={openFiltersMenu} class="btn variant-filled-surface text-left text-sm">
  <span
    >{getSortingLabel($sortingType)}, {getTypeToShowLabel($typeToShow)}
    {$addonSource != 'all' ? ` (${getAddonSourceLabel($addonSource)} only)` : ''}</span
  >
</button>
