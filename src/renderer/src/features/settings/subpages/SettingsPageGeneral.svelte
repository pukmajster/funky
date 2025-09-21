<script lang="ts">
  import { userStore } from '../../../stores/user'
  import SettingsDropdown from '../components/SettingsDropdown.svelte'
  import SettingsHeader from '../components/SettingsHeader.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'
</script>

<SettingsHeader label="Startup" />

<SettingsSwitch
  label="Refresh manifest on startup"
  description="Automatically scan for any newly installed mods on startup."
  bind:value={$userStore.refreshManifestOnStartup}
/>

<SettingsHeader label="Mods" />

<SettingsSwitch
  label="Hide descriptions"
  description="Mod descriptions are usually formatted in Markdown, which Funky does not support. If disabled, you're likely to see walls of barely-readable text."
  bind:value={$userStore.hideDescriptions}
/>

<SettingsSwitch
  label="Show Workshop mod IDs"
  description="Displays the mod's Workshop ID in the mod overview."
  bind:value={$userStore.showWorkshopIds}
/>

<SettingsHeader label="Library" />

<SettingsDropdown
  label="Grid density"
  description="Choose the density of mods to show within the grid."
  bind:value={$userStore.libraryGridDensity}
  options={[
    {
      label: 'Low',
      value: 'low'
    },
    {
      label: 'Normal',
      value: 'normal'
    },
    {
      label: 'High',
      value: 'high'
    }
  ]}
/>

<SettingsDropdown
  label="Preferred thumbnail aspect ratio"
  description="Sadly thumbnails come in a variety of aspect ratios, so you can choose which one you prefer. Wide is 16:9 and square is 1:1."
  bind:value={$userStore.libraryThumbnailAspectRatio}
  options={[
    {
      label: 'Wide',
      value: 'wide'
    },
    {
      label: 'Square',
      value: 'square'
    }
  ]}
/>

<SettingsDropdown
  label="Thumbnail wasted space"
  description="Choose how to fill the wasted space around thumbnails that don't fit your preferred aspect
      ratio."
  bind:value={$userStore.libraryThumbnailWastedSpace}
  options={[
    {
      label: 'Stretch',
      value: 'stretch'
    },
    {
      label: 'Blur',
      value: 'fill-blur'
    },
    {
      label: 'Black',
      value: 'fill-black'
    },
    {
      label: 'None',
      value: 'none'
    }
  ]}
/>
