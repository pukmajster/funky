<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
  import FullscreenMenu from '../../../components/fullscreen-menu/FullscreenMenu.svelte'
  import {
    type SortingType,
    type TypeOfMod,
    type AddonSource,
    libraryActiveSubCategories,
    libraryPage,
    libraryPageCount,
    sortingType,
    typeToShow,
    addonSource
  } from '../../../stores/library'
  import { clamp } from '../../../utils'

  // Limit the active subcategories to 1
  $: {
    $libraryActiveSubCategories.length > 1 &&
      ($libraryActiveSubCategories = [$libraryActiveSubCategories.at(-1)])
  }

  $: {
    $libraryPage = clamp($libraryPage, 1, $libraryPageCount)
    document.querySelector('#page')?.scrollTo({ top: 0, behavior: 'smooth' })
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
</script>

<FullscreenMenu id="library-filters" label="Filters">
  <div class="grid grid-cols-1 gap-3 flex-1 w-[300px]">
    <div>
      <h3 class="text-sm font-semibold mb-2 indent-3">SORT BY</h3>
      <ListBox
        spacing=""
        class="bg-surface-600 rounded-lg divide-y divide-surface-800 overflow-hidden"
        rounded=""
      >
        {#each sortingTypeMap as _st}
          <ListBoxItem
            bind:group={$sortingType}
            active="bg-primary-600 font-semibold !rounded-none mt-0"
            rounded="rounded-none text-sm"
            hover="hover:bg-slate-100/10"
            padding="px-3 py-2"
            name={_st.value}
            value={_st.value}
            >{_st.label}
          </ListBoxItem>
        {/each}
      </ListBox>
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2 indent-3 mt-2">FILTER BY</h3>
      <ListBox
        spacing=""
        class="bg-surface-600 rounded-lg divide-y divide-surface-800 overflow-hidden"
        rounded=""
      >
        {#each typeToShowMap as _tts}
          <ListBoxItem
            bind:group={$typeToShow}
            active="bg-primary-600 font-semibold !rounded-none mt-0"
            rounded="rounded-none text-sm"
            hover="hover:bg-slate-100/10"
            padding="px-3 py-2"
            name={_tts.value}
            value={_tts.value}
            >{_tts.label}
          </ListBoxItem>
        {/each}
      </ListBox>
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2 indent-3 mt-2">SOURCE</h3>
      <ListBox
        spacing=""
        class="bg-surface-600 rounded-lg divide-y divide-surface-800 overflow-hidden"
        rounded=""
      >
        {#each addonSourceMap as _as}
          <ListBoxItem
            bind:group={$addonSource}
            active="bg-primary-600 font-semibold !rounded-none mt-0"
            rounded="rounded-none text-sm"
            hover="hover:bg-slate-100/10"
            padding="px-3 py-2"
            name={_as.value}
            value={_as.value}
            >{_as.label}
          </ListBoxItem>
        {/each}
      </ListBox>
    </div>
  </div>
</FullscreenMenu>
