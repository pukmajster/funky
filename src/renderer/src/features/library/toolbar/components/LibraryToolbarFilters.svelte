<script lang="ts">
  import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton'
  import {
    type SortingType,
    type TypeOfMod,
    type AddonSource,
    sortingType,
    typeToShow,
    addonSource
  } from '../../../../stores/library'

  function getSortingLabel(value: SortingType) {
    return {
      name_asc: 'Name (Ascending)',
      name_desc: 'Name (Descending)',
      time_newest: 'Time Modified (Latest)',
      time_oldest: 'Time Modified (Oldest)',
      size_biggest: 'Size (Largest)',
      size_smallest: 'Size (Smallest)'
    }[value]
  }

  function getTypeToShowLabel(value: TypeOfMod) {
    return {
      any: 'Any',
      enabled: 'Enabled',
      shuffled: 'Shuffled',
      'enabled/shuffled': 'Enabled or shuffled',
      disabled: 'Disabled',
      uninstalled: 'Uninstalled'
    }[value]
  }

  function getAddonSourceLabel(value: AddonSource) {
    return {
      local: 'Local',
      workshop: 'Workshop',
      all: 'All'
    }[value]
  }

  type LabeledFilters<T extends string> = {
    value: T
    label: string
  }[]

  const sortingTypeMap: LabeledFilters<SortingType> = [
    { label: 'Name (Ascending)', value: 'name_asc' },
    { label: 'Name (Descending)', value: 'name_desc' },
    { label: 'Time Modified (Latest)', value: 'time_newest' },
    { label: 'Time Modified (Oldest)', value: 'time_oldest' },
    { label: 'Size (Largest)', value: 'size_biggest' },
    { label: 'Size (Smallest)', value: 'size_smallest' }
  ]

  const typeToShowMap: LabeledFilters<TypeOfMod> = [
    { label: 'Any', value: 'any' },
    { label: 'Enabled', value: 'enabled' },
    { label: 'Shuffled', value: 'shuffled' },
    { label: 'Enabled or shuffled', value: 'enabled/shuffled' },
    { label: 'Disabled', value: 'disabled' },
    { label: 'Uninstalled', value: 'uninstalled' }
  ]

  const addonSourceMap: LabeledFilters<AddonSource> = [
    { label: 'All', value: 'all' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Local', value: 'local' }
  ]

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'filtersPopup',
    placement: 'top-start'
  }
</script>

<div class="flex flex-row gap-2 items-center">
  <button use:popup={popupClick} class="btn variant-filled-surface text-left text-sm">
    <span
      >{getSortingLabel($sortingType)}, {getTypeToShowLabel($typeToShow)}
      {$addonSource != 'all' ? ` (${getAddonSourceLabel($addonSource)} only)` : ''}</span
    >
  </button>

  <div
    data-popup="filtersPopup"
    class="rounded-lg overflow-hidden shadow-xl border-2 border-surface-700 z-20"
  >
    <div class="flex flex-col lg:flex-row lg:gap-0 flex-1 bg-surface-900">
      <div>
        <h3 class="text-lg font-semibold pl-9 bg-surface-700 py-2 px-8">SORT BY</h3>
        <ListBox class="p-5">
          {#each sortingTypeMap as _st}
            <ListBoxItem
              bind:group={$sortingType}
              active="bg-blue-600"
              name={_st.value}
              value={_st.value}
              >{_st.label}
            </ListBoxItem>
          {/each}
        </ListBox>
      </div>

      <div>
        <h3 class="text-lg font-semibold pl-9 bg-surface-700 py-2 px-8">FILTER BY</h3>
        <ListBox class="p-5">
          {#each typeToShowMap as _tts}
            <ListBoxItem
              bind:group={$typeToShow}
              active="bg-blue-600"
              name={_tts.value}
              value={_tts.value}
              >{_tts.label}
            </ListBoxItem>
          {/each}
        </ListBox>
      </div>

      <div>
        <h3 class="text-lg font-semibold pl-9 bg-surface-700 py-2 px-8">SOURCE</h3>
        <ListBox class="p-5">
          {#each addonSourceMap as _as}
            <ListBoxItem
              bind:group={$addonSource}
              active="bg-blue-600"
              name={_as.value}
              value={_as.value}
              >{_as.label}
            </ListBoxItem>
          {/each}
        </ListBox>
      </div>
    </div>
  </div>
</div>
