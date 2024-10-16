<script lang="ts">
  import { SlideToggle } from '@skeletonlabs/skeleton'
  import { userStore } from '../../../stores/user'

  enum MetadataSolution {
    SteamWorkshop,
    Local,
    Adaptive
  }

  const mapping = [
    {
      label: 'Steam Workshop',
      value: MetadataSolution.SteamWorkshop,
      description:
        'Mod metadata will be downloaded from the Steam Workshop directly. Does not work while offline.'
    },
    {
      label: 'Local',
      value: MetadataSolution.Local,
      description:
        'Mod metadata will be be pulled from the downloaded mod files present on your PC. Works while offline, however may not always work and some mods can potentially crash Funky.'
    }
    // {
    //   label: 'Adaptive',
    //   value: MetadataSolution.Adaptive,
    //   description:
    //     'Funky will try to use the Steam Workshop method if online, otherwise fall back to the Local method.'
    // }
  ]

  let preferredMethod: MetadataSolution | null = null
</script>

<SlideToggle
  name="onlineMetadataFetching"
  active="bg-green-500"
  bind:checked={$userStore.enableNetworking}
  class="flex items-center gap-2"
>
  {#if $userStore.enableNetworking}
    <span class="text-green-500">Enabled</span>
  {:else}
    <span class="text-red-500">Disabled</span>
  {/if}
</SlideToggle>

<p>
  A surprising amount of mod VPKs come with incorrectly formatted or straight up missing
  addoninfo.txt's. Without these files, Funky can't read typical mod metadata, like titles and
  descriptions.
</p>

<p>
  By enabling networking, Funky can fetch mod metadata online by contacting the Steam workshop
  directly. This request does not contain any personal data, only a list of mod IDs with missing
  data.
</p>

<p />

{#each mapping as method}
  {@const preferred = preferredMethod === method.value}
  <button
    data-active={preferred}
    class="bg-surface-600 text-left p-4 grid grid-cols-[1fr_96px] gap-4"
  >
    <div>
      <p class="text-lg font-bold uppercase">{method.label}</p>
      <p class="text-sm">{method.description}</p>
    </div>

    <div class="">
      {#if preferred}
        <span class="text-green-500">Preferred</span>
      {:else}
        <span class="text-red-500">Not Preferred</span>
      {/if}
    </div>
  </button>
{/each}
