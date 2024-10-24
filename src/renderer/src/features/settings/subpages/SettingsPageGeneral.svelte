<script lang="ts">
  import { userStore } from '../../../stores/user'
  import SettingsHeader from '../components/SettingsHeader.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'
  import SettingsDropdown from '../components/SettingsDropdown.svelte'
</script>

<SettingsHeader label="Addons" />

<SettingsSwitch
  label="Refresh manifest on startup"
  bind:value={$userStore.refreshManifestsOnStartup}
/>

<SettingsSwitch
  label="Hide descriptions"
  description="Mod descriptions are usually formatted in Markdown, which Funky does not support. If disabled, you're likely to see walls of barely-readable text."
  bind:value={$userStore.hideDescriptions}
/>

<SettingsHeader label="Thumbnails" />

<SettingsDropdown
  label="Preferred thumbnail aspect ratio"
  description="Sadly thumbnails come in a variety of aspect ratios, so you can choose which one you prefer. Wide is 16:9 and square is 1:1."
  bind:value={$userStore.thumbnailsPreferredAspectRatio}
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
  label="Wasted space"
  description="Choose how to fill the wasted space around thumbnails that don't fit your preferred aspect
      ratio."
  bind:value={$userStore.thumbnailsWastedSpace}
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

<SettingsHeader label="Experimental" />

<SettingsSwitch
  label="Enable experimental manifest parser"
  description="This new parser should do a much better job at parsing vpk metadata and only relying on the workshop API for mods with missing addoninfo.txt's. You can try it by right-clicking the refresh button to see if it works."
  bind:value={$userStore.enableExperimentalManifestParser}
/>
